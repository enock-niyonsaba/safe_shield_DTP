-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'analyst', 'observer')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT,
  department TEXT,
  phone TEXT
);

-- Incidents Table
CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reported_by UUID NOT NULL REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  category TEXT NOT NULL,
  ip_address TEXT,
  affected_systems TEXT[] DEFAULT '{}',
  resolution TEXT
);

-- Evidence Table
CREATE TABLE IF NOT EXISTS evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  type TEXT NOT NULL CHECK (type IN ('incident', 'approval', 'system', 'security', 'training')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  unread BOOLEAN DEFAULT TRUE,
  related_link TEXT,
  sender TEXT NOT NULL
);

-- Training Modules Table
CREATE TABLE IF NOT EXISTS training_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  content_path TEXT NOT NULL
);

-- Training Progress Table
CREATE TABLE IF NOT EXISTS training_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  module_id UUID NOT NULL REFERENCES training_modules(id),
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  score INTEGER,
  UNIQUE(user_id, module_id)
);

-- Incident Comments Table
CREATE TABLE IF NOT EXISTS incident_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incident Assignments Table
CREATE TABLE IF NOT EXISTS incident_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  assigned_to UUID NOT NULL REFERENCES users(id),
  assigned_by UUID NOT NULL REFERENCES users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  notes TEXT
);

-- User Settings Table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) UNIQUE,
  notification_preferences JSONB NOT NULL DEFAULT '{
    "email": true,
    "in_app": true,
    "incident_alerts": true,
    "system_updates": true,
    "training_reminders": true
  }'::jsonb,
  theme TEXT NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_incidents_reported_by ON incidents(reported_by);
CREATE INDEX IF NOT EXISTS idx_incidents_assigned_to ON incidents(assigned_to);
CREATE INDEX IF NOT EXISTS idx_evidence_incident_id ON evidence(incident_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(unread);
CREATE INDEX IF NOT EXISTS idx_training_progress_user_id ON training_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_incident_comments_incident_id ON incident_comments(incident_id);

-- Create function to get user workload
CREATE OR REPLACE FUNCTION get_user_workload(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  workload INTEGER;
BEGIN
  SELECT COUNT(*) INTO workload
  FROM incidents
  WHERE assigned_to = user_id AND status IN ('open', 'investigating');
  
  RETURN workload;
END;
$$ LANGUAGE plpgsql;

-- Create function to assign incident to user with lowest workload
CREATE OR REPLACE FUNCTION assign_incident_to_user(incident_id UUID)
RETURNS UUID AS $$
DECLARE
  selected_user_id UUID;
BEGIN
  -- Find analyst with lowest workload
  SELECT u.id INTO selected_user_id
  FROM users u
  WHERE u.role = 'analyst' AND u.status = 'active'
  ORDER BY get_user_workload(u.id), RANDOM()
  LIMIT 1;
  
  -- Update the incident
  UPDATE incidents
  SET assigned_to = selected_user_id,
      updated_at = NOW()
  WHERE id = incident_id;
  
  -- Create assignment record
  INSERT INTO incident_assignments (incident_id, assigned_to, assigned_by)
  VALUES (incident_id, selected_user_id, '00000000-0000-0000-0000-000000000000');
  
  RETURN selected_user_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger function for logging activities
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
DECLARE
  action_type TEXT;
  entity TEXT;
  details JSONB;
  user_id UUID;
BEGIN
  -- Determine action type
  IF TG_OP = 'INSERT' THEN
    action_type := 'create';
  ELSIF TG_OP = 'UPDATE' THEN
    action_type := 'update';
  ELSIF TG_OP = 'DELETE' THEN
    action_type := 'delete';
  END IF;
  
  -- Determine entity type
  entity := TG_TABLE_NAME;
  
  -- Get user ID based on context
  IF entity = 'users' THEN
    user_id := NEW.id;
  ELSIF entity = 'incidents' THEN
    user_id := NEW.reported_by;
  ELSIF entity = 'evidence' THEN
    user_id := NEW.uploaded_by;
  ELSIF entity = 'incident_comments' THEN
    user_id := NEW.user_id;
  ELSIF entity = 'incident_assignments' THEN
    user_id := NEW.assigned_by;
  ELSE
    user_id := '00000000-0000-0000-0000-000000000000'; -- System user
  END IF;
  
  -- Create details JSON
  IF TG_OP = 'INSERT' THEN
    details := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    details := jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW),
      'changes', (SELECT jsonb_object_agg(key, value)
                 FROM jsonb_each(to_jsonb(NEW))
                 WHERE to_jsonb(NEW) -> key <> to_jsonb(OLD) -> key)
    );
  ELSIF TG_OP = 'DELETE' THEN
    details := to_jsonb(OLD);
  END IF;
  
  -- Insert activity log
  INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details)
  VALUES (user_id, action_type, entity, CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END, details);
  
  -- Return appropriate record
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for activity logging
CREATE TRIGGER log_user_activity
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_incident_activity
AFTER INSERT OR UPDATE OR DELETE ON incidents
FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_evidence_activity
AFTER INSERT OR UPDATE OR DELETE ON evidence
FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_incident_comment_activity
AFTER INSERT OR UPDATE OR DELETE ON incident_comments
FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_incident_assignment_activity
AFTER INSERT OR UPDATE OR DELETE ON incident_assignments
FOR EACH ROW EXECUTE FUNCTION log_activity();

-- Create trigger function for creating notifications
CREATE OR REPLACE FUNCTION create_notification()
RETURNS TRIGGER AS $$
DECLARE
  notification_title TEXT;
  notification_message TEXT;
  notification_type TEXT;
  notification_priority TEXT;
  related_link TEXT;
  recipient_id UUID;
  sender TEXT;
BEGIN
  -- Default sender
  sender := 'System';
  
  -- Handle different entity types
  IF TG_TABLE_NAME = 'incidents' THEN
    -- New incident created
    IF TG_OP = 'INSERT' THEN
      notification_title := 'New Incident Reported';
      notification_message := 'Incident "' || NEW.title || '" has been reported with ' || NEW.severity || ' severity.';
      notification_type := 'incident';
      related_link := '/incidents/' || NEW.id;
      
      -- Set priority based on incident severity
      IF NEW.severity = 'critical' THEN
        notification_priority := 'high';
      ELSIF NEW.severity = 'high' THEN
        notification_priority := 'high';
      ELSIF NEW.severity = 'medium' THEN
        notification_priority := 'medium';
      ELSE
        notification_priority := 'low';
      END IF;
      
      -- Notify all admins and analysts
      FOR recipient_id IN SELECT id FROM users WHERE role IN ('admin', 'analyst') AND status = 'active' LOOP
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (recipient_id, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
      END LOOP;
      
    -- Incident updated
    ELSIF TG_OP = 'UPDATE' THEN
      -- Status changed
      IF NEW.status <> OLD.status THEN
        notification_title := 'Incident Status Updated';
        notification_message := 'Incident "' || NEW.title || '" status changed from ' || OLD.status || ' to ' || NEW.status || '.';
        notification_type := 'incident';
        related_link := '/incidents/' || NEW.id;
        
        -- Set priority
        IF NEW.status = 'resolved' OR NEW.status = 'closed' THEN
          notification_priority := 'medium';
        ELSE
          notification_priority := 'low';
        END IF;
        
        -- Notify reporter and assigned user
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (NEW.reported_by, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
        
        IF NEW.assigned_to IS NOT NULL THEN
          INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
          VALUES (NEW.assigned_to, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
        END IF;
      END IF;
      
      -- Assignment changed
      IF NEW.assigned_to IS DISTINCT FROM OLD.assigned_to AND NEW.assigned_to IS NOT NULL THEN
        notification_title := 'Incident Assigned';
        notification_message := 'You have been assigned to incident "' || NEW.title || '".';
        notification_type := 'incident';
        notification_priority := 'high';
        related_link := '/incidents/' || NEW.id;
        
        -- Notify newly assigned user
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (NEW.assigned_to, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
      END IF;
    END IF;
    
  ELSIF TG_TABLE_NAME = 'users' THEN
    -- New user registration
    IF TG_OP = 'INSERT' THEN
      notification_title := 'New User Registration';
      notification_message := NEW.name || ' has registered as a ' || NEW.role || ' and is awaiting approval.';
      notification_type := 'approval';
      notification_priority := 'medium';
      related_link := '/admin/account-approvals';
      
      -- Notify all admins
      FOR recipient_id IN SELECT id FROM users WHERE role = 'admin' AND status = 'active' LOOP
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (recipient_id, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
      END LOOP;
      
    -- User status changed
    ELSIF TG_OP = 'UPDATE' AND NEW.status <> OLD.status THEN
      IF NEW.status = 'active' AND OLD.status = 'pending' THEN
        notification_title := 'Account Approved';
        notification_message := 'Your account has been approved. You now have full access to the platform.';
        notification_type := 'approval';
        notification_priority := 'high';
        related_link := '/dashboard';
        
        -- Notify the user
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (NEW.id, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
      END IF;
    END IF;
    
  ELSIF TG_TABLE_NAME = 'evidence' THEN
    -- New evidence uploaded
    IF TG_OP = 'INSERT' THEN
      -- Get incident details
      SELECT title, reported_by, assigned_to 
      INTO notification_title, recipient_id, recipient_id
      FROM incidents 
      WHERE id = NEW.incident_id;
      
      notification_title := 'New Evidence Added';
      notification_message := 'New evidence "' || NEW.file_name || '" has been added to incident "' || notification_title || '".';
      notification_type := 'incident';
      notification_priority := 'medium';
      related_link := '/incidents/' || NEW.incident_id;
      
      -- Get incident reporter and assigned user
      SELECT reported_by, assigned_to 
      INTO recipient_id, recipient_id
      FROM incidents 
      WHERE id = NEW.incident_id;
      
      -- Notify reporter if not the uploader
      IF recipient_id <> NEW.uploaded_by THEN
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (recipient_id, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
      END IF;
      
      -- Notify assigned user if exists and not the uploader
      SELECT assigned_to INTO recipient_id
      FROM incidents 
      WHERE id = NEW.incident_id;
      
      IF recipient_id IS NOT NULL AND recipient_id <> NEW.uploaded_by THEN
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (recipient_id, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
      END IF;
    END IF;
    
  ELSIF TG_TABLE_NAME = 'incident_comments' THEN
    -- New comment added
    IF TG_OP = 'INSERT' THEN
      -- Get incident details
      SELECT title, reported_by, assigned_to 
      INTO notification_title, recipient_id, recipient_id
      FROM incidents 
      WHERE id = NEW.incident_id;
      
      notification_title := 'New Comment on Incident';
      notification_message := 'A new comment has been added to incident "' || notification_title || '".';
      notification_type := 'incident';
      notification_priority := 'low';
      related_link := '/incidents/' || NEW.incident_id;
      
      -- Get comment author name
      SELECT name INTO sender
      FROM users
      WHERE id = NEW.user_id;
      
      -- Get incident reporter and assigned user
      SELECT reported_by, assigned_to 
      INTO recipient_id, recipient_id
      FROM incidents 
      WHERE id = NEW.incident_id;
      
      -- Notify reporter if not the commenter
      IF recipient_id <> NEW.user_id THEN
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (recipient_id, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
      END IF;
      
      -- Notify assigned user if exists and not the commenter
      SELECT assigned_to INTO recipient_id
      FROM incidents 
      WHERE id = NEW.incident_id;
      
      IF recipient_id IS NOT NULL AND recipient_id <> NEW.user_id THEN
        INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
        VALUES (recipient_id, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
      END IF;
    END IF;
    
  ELSIF TG_TABLE_NAME = 'training_progress' THEN
    -- Training completed
    IF TG_OP = 'UPDATE' AND NEW.completed = TRUE AND OLD.completed = FALSE THEN
      -- Get module details
      SELECT title INTO notification_title
      FROM training_modules
      WHERE id = NEW.module_id;
      
      notification_title := 'Training Module Completed';
      notification_message := 'You have successfully completed the "' || notification_title || '" training module.';
      notification_type := 'training';
      notification_priority := 'medium';
      related_link := '/training';
      
      -- Notify the user
      INSERT INTO notifications (user_id, type, title, message, priority, related_link, sender)
      VALUES (NEW.user_id, notification_type, notification_title, notification_message, notification_priority, related_link, sender);
    END IF;
  END IF;
  
  -- Return appropriate record
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for notifications
CREATE TRIGGER create_incident_notification
AFTER INSERT OR UPDATE ON incidents
FOR EACH ROW EXECUTE FUNCTION create_notification();

CREATE TRIGGER create_user_notification
AFTER INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION create_notification();

CREATE TRIGGER create_evidence_notification
AFTER INSERT ON evidence
FOR EACH ROW EXECUTE FUNCTION create_notification();

CREATE TRIGGER create_comment_notification
AFTER INSERT ON incident_comments
FOR EACH ROW EXECUTE FUNCTION create_notification();

CREATE TRIGGER create_training_notification
AFTER UPDATE ON training_progress
FOR EACH ROW EXECUTE FUNCTION create_notification();

-- Set up Row Level Security (RLS)
-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users table policies
CREATE POLICY users_admin_all ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY users_self_read ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Incidents table policies
CREATE POLICY incidents_admin_all ON incidents
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY incidents_analyst_crud ON incidents
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'analyst'));

CREATE POLICY incidents_observer_read ON incidents
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'observer'));

CREATE POLICY incidents_self_read ON incidents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = reported_by OR auth.uid() = assigned_to);

-- Evidence table policies
CREATE POLICY evidence_admin_all ON evidence
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY evidence_analyst_crud ON evidence
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'analyst'));

CREATE POLICY evidence_observer_read ON evidence
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'observer'));

CREATE POLICY evidence_self_read ON evidence
  FOR SELECT
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Activity logs policies
CREATE POLICY activity_logs_admin_all ON activity_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY activity_logs_self_read ON activity_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY notifications_self_all ON notifications
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Training progress policies
CREATE POLICY training_progress_admin_all ON training_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY training_progress_self_all ON training_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Incident comments policies
CREATE POLICY incident_comments_admin_all ON incident_comments
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY incident_comments_analyst_crud ON incident_comments
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'analyst'));

CREATE POLICY incident_comments_observer_read ON incident_comments
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'observer'));

CREATE POLICY incident_comments_self_crud ON incident_comments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Incident assignments policies
CREATE POLICY incident_assignments_admin_all ON incident_assignments
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY incident_assignments_analyst_update ON incident_assignments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'analyst') AND auth.uid() = assigned_to);

CREATE POLICY incident_assignments_analyst_read ON incident_assignments
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'analyst'));

CREATE POLICY incident_assignments_observer_read ON incident_assignments
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'observer'));

-- User settings policies
CREATE POLICY user_settings_admin_all ON user_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY user_settings_self_all ON user_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);
