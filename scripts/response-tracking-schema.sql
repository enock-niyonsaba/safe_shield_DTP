-- Incident Response Tracking Tables

-- Main response tracking table
CREATE TABLE IF NOT EXISTS incident_response_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    step_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
    assigned_to UUID REFERENCES users(id),
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(incident_id, step_id)
);

-- Response actions for each step
CREATE TABLE IF NOT EXISTS response_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    step_id VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    completed_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Response logs for tracking activities
CREATE TABLE IF NOT EXISTS response_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    step_id VARCHAR(50),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Evidence and file uploads
CREATE TABLE IF NOT EXISTS response_evidence (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    step_id VARCHAR(50),
    filename VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(100),
    file_size INTEGER,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages for incident communication
CREATE TABLE IF NOT EXISTS incident_chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_response_tracking_incident ON incident_response_tracking(incident_id);
CREATE INDEX IF NOT EXISTS idx_response_actions_incident_step ON response_actions(incident_id, step_id);
CREATE INDEX IF NOT EXISTS idx_response_logs_incident ON response_logs(incident_id);
CREATE INDEX IF NOT EXISTS idx_response_evidence_incident ON response_evidence(incident_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_incident ON incident_chat_messages(incident_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON incident_chat_messages(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE incident_response_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view response tracking for incidents they have access to" ON incident_response_tracking
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM incidents i 
            WHERE i.id = incident_id 
            AND (i.reported_by = auth.uid() OR i.assigned_to = auth.uid() OR 
                 EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst')))
        )
    );

CREATE POLICY "Analysts and Admins can modify response tracking" ON incident_response_tracking
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst'))
    );

CREATE POLICY "Users can view response actions for accessible incidents" ON response_actions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM incidents i 
            WHERE i.id = incident_id 
            AND (i.reported_by = auth.uid() OR i.assigned_to = auth.uid() OR 
                 EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst')))
        )
    );

CREATE POLICY "Analysts and Admins can modify response actions" ON response_actions
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst'))
    );

CREATE POLICY "Users can view response logs for accessible incidents" ON response_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM incidents i 
            WHERE i.id = incident_id 
            AND (i.reported_by = auth.uid() OR i.assigned_to = auth.uid() OR 
                 EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst')))
        )
    );

CREATE POLICY "Analysts and Admins can create response logs" ON response_logs
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst'))
    );

CREATE POLICY "Users can view evidence for accessible incidents" ON response_evidence
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM incidents i 
            WHERE i.id = incident_id 
            AND (i.reported_by = auth.uid() OR i.assigned_to = auth.uid() OR 
                 EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst')))
        )
    );

CREATE POLICY "Analysts and Admins can manage evidence" ON response_evidence
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst'))
    );

CREATE POLICY "Users can view chat messages for accessible incidents" ON incident_chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM incidents i 
            WHERE i.id = incident_id 
            AND (i.reported_by = auth.uid() OR i.assigned_to = auth.uid() OR 
                 EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst')))
        )
    );

CREATE POLICY "Users can send chat messages for accessible incidents" ON incident_chat_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM incidents i 
            WHERE i.id = incident_id 
            AND (i.reported_by = auth.uid() OR i.assigned_to = auth.uid() OR 
                 EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst')))
        )
    );

-- Create storage bucket for evidence files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('incident-evidence', 'incident-evidence', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload evidence files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'incident-evidence' AND
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Analyst'))
    );

CREATE POLICY "Users can view evidence files" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'incident-evidence'
    );
