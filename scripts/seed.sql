-- Seed data for Safe Shield platform

-- Insert admin user
INSERT INTO users (id, email, name, role, status)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'system@safeshield.com', 'System', 'admin', 'active'),
  ('11111111-1111-1111-1111-111111111111', 'admin@company.com', 'Admin User', 'admin', 'active');

-- Insert sample users
INSERT INTO users (id, email, name, role, status, department, position)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@company.com', 'Admin User', 'Admin', 'Active', 'IT Security', 'Security Administrator'),
  ('00000000-0000-0000-0000-000000000002', 'john.anderson@company.com', 'John Anderson', 'Analyst', 'Active', 'IT Security', 'Security Analyst'),
  ('00000000-0000-0000-0000-000000000003', 'sarah.johnson@company.com', 'Sarah Johnson', 'Analyst', 'Active', 'IT Security', 'Security Analyst'),
  ('00000000-0000-0000-0000-000000000004', 'mike.chen@company.com', 'Mike Chen', 'Analyst', 'Active', 'Network Operations', 'Network Security Specialist'),
  ('00000000-0000-0000-0000-000000000005', 'lisa.wang@company.com', 'Lisa Wang', 'Observer', 'Active', 'HR', 'HR Manager'),
  ('00000000-0000-0000-0000-000000000006', 'david.rodriguez@company.com', 'David Rodriguez', 'Observer', 'Active', 'Finance', 'Financial Analyst'),
  ('00000000-0000-0000-0000-000000000007', 'emily.carter@company.com', 'Emily Carter', 'Observer', 'Pending', 'Marketing', 'Marketing Specialist');

-- Insert sample tools
INSERT INTO tools (id, name, description, category, documentation_url)
VALUES
  ('00000000-0000-0000-0000-000000000101', 'Nmap', 'Network scanning and host discovery tool', 'Network Analysis', 'https://nmap.org/docs.html'),
  ('00000000-0000-0000-0000-000000000102', 'Wireshark', 'Network protocol analyzer', 'Network Analysis', 'https://www.wireshark.org/docs/'),
  ('00000000-0000-0000-0000-000000000103', 'Burp Suite', 'Web vulnerability scanner and proxy', 'Web Security', 'https://portswigger.net/burp/documentation'),
  ('00000000-0000-0000-0000-000000000104', 'Metasploit', 'Penetration testing framework', 'Penetration Testing', 'https://docs.metasploit.com/'),
  ('00000000-0000-0000-0000-000000000105', 'Volatility', 'Memory forensics framework', 'Digital Forensics', 'https://github.com/volatilityfoundation/volatility/wiki'),
  ('00000000-0000-0000-0000-000000000106', 'OSSEC', 'Host-based intrusion detection system', 'Intrusion Detection', 'https://www.ossec.net/docs/');

-- Insert training modules
INSERT INTO training_modules (id, title, description, duration, difficulty, category, content_path)
VALUES
  ('10000000-0000-0000-0000-000000000000', 'Incident Response', 'Learn the fundamentals of incident response and handling security breaches.', 60, 'beginner', 'security', '/training/incident-response'),
  ('20000000-0000-0000-0000-000000000000', 'Threat Hunting', 'Advanced techniques for proactively searching for security threats.', 90, 'advanced', 'security', '/training/threat-hunting'),
  ('30000000-0000-0000-0000-000000000000', 'Network Security Monitoring', 'Learn how to monitor network traffic for security threats.', 75, 'intermediate', 'network', '/training/network-monitoring'),
  ('40000000-0000-0000-0000-000000000000', 'Malware Analysis', 'Techniques for analyzing and understanding malicious software.', 120, 'advanced', 'malware', '/training/malware-analysis'),
  ('50000000-0000-0000-0000-000000000000', 'Digital Forensics', 'Introduction to digital forensics and evidence collection.', 90, 'intermediate', 'forensics', '/training/digital-forensics'),
  ('60000000-0000-0000-0000-000000000000', 'Security Awareness', 'Basic security awareness training for all employees.', 45, 'beginner', 'awareness', '/training/security-awareness');

-- Insert sample incidents
INSERT INTO incidents (id, title, description, severity, status, reported_by, category, ip_address, affected_systems)
VALUES
  ('a1000000-0000-0000-0000-000000000000', 'Suspicious Login Attempt', 'Multiple failed login attempts detected from IP 192.168.1.100', 'medium', 'open', '11111111-1111-1111-1111-111111111111', 'Authentication', '192.168.1.100', ARRAY['Authentication Server']),
  ('a2000000-0000-0000-0000-000000000000', 'Potential Data Exfiltration', 'Unusual outbound traffic detected to unknown IP address', 'high', 'investigating', '11111111-1111-1111-1111-111111111111', 'Data Loss', '10.0.0.25', ARRAY['File Server', 'Database Server']),
  ('a3000000-0000-0000-0000-000000000000', 'Malware Detection', 'Antivirus detected potential malware on workstation WS-001', 'medium', 'resolved', '11111111-1111-1111-1111-111111111111', 'Malware', '10.0.0.15', ARRAY['Workstation WS-001']),
  ('a4000000-0000-0000-0000-000000000000', 'DDoS Attack', 'Potential DDoS attack detected on public web server', 'critical', 'open', '11111111-1111-1111-1111-111111111111', 'Availability', '203.0.113.0/24', ARRAY['Web Server', 'Load Balancer']),
  ('a5000000-0000-0000-0000-000000000000', 'Phishing Campaign', 'Users reporting suspicious emails with malicious attachments', 'high', 'investigating', '11111111-1111-1111-1111-111111111111', 'Social Engineering', 'N/A', ARRAY['Email Server']);

-- Insert timeline events for incidents
INSERT INTO timeline_events (incident_id, timestamp, action, description, user_id)
VALUES
  ('00000000-0000-0000-0000-000000000201', NOW() - INTERVAL '2 hours', 'Incident Reported', 'Initial report submitted by Lisa Wang', '00000000-0000-0000-0000-000000000005'),
  ('00000000-0000-0000-0000-000000000201', NOW() - INTERVAL '1 hour 45 minutes', 'Investigation Started', 'Assigned to John Anderson for investigation', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000201', NOW() - INTERVAL '1 hour 30 minutes', 'Evidence Collected', 'Network logs and SQL queries captured', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000201', NOW() - INTERVAL '1 hour', 'Containment Measures', 'Temporary firewall rules implemented to block suspicious IPs', '00000000-0000-0000-0000-000000000002'),
  
  ('00000000-0000-0000-0000-000000000202', NOW() - INTERVAL '4 hours', 'Incident Reported', 'Initial report submitted by David Rodriguez', '00000000-0000-0000-0000-000000000006'),
  ('00000000-0000-0000-0000-000000000202', NOW() - INTERVAL '3 hours 45 minutes', 'Initial Assessment', 'Preliminary analysis of phishing emails', '00000000-0000-0000-0000-000000000001'),
  
  ('00000000-0000-0000-0000-000000000203', NOW() - INTERVAL '1 day', 'Incident Reported', 'Initial report submitted by Lisa Wang', '00000000-0000-0000-0000-000000000005'),
  ('00000000-0000-0000-0000-000000000203', NOW() - INTERVAL '23 hours', 'Investigation Started', 'Assigned to Sarah Johnson for investigation', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000203', NOW() - INTERVAL '20 hours', 'Malware Analysis', 'Initial analysis of quarantined file', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000203', NOW() - INTERVAL '12 hours', 'System Cleaned', 'Affected system cleaned and verified', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000203', NOW() - INTERVAL '6 hours', 'Incident Resolved', 'All affected systems verified clean, incident closed', '00000000-0000-0000-0000-000000000003');

-- Insert tools used in incidents
INSERT INTO tools_used (incident_id, tool_id, notes, used_by)
VALUES
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000103', 'Used to analyze and replay suspicious HTTP requests', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000102', 'Used to capture and analyze network traffic', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000105', 'Used for memory analysis of affected system', '00000000-0000-0000-0000-000000000003');

-- Insert system logs
INSERT INTO system_logs (severity, source, source_ip, action, description, user_id)
VALUES
  ('Warning', 'Firewall', '192.168.1.1', 'Connection Blocked', 'Blocked suspicious connection attempt from external IP', NULL),
  ('Info', 'Authentication Service', '10.0.0.15', 'User Login', 'Successful login', '00000000-0000-0000-0000-000000000002'),
  ('Error', 'Database Server', '10.0.0.5', 'Query Error', 'Failed SQL query with potential injection attempt', NULL),
  ('Critical', 'Web Server', '10.0.0.8', 'Service Down', 'Web server service crashed unexpectedly', NULL),
  ('Info', 'Authentication Service', '10.0.0.22', 'User Login', 'Successful login', '00000000-0000-0000-0000-000000000003'),
  ('Warning', 'File Server', '10.0.0.30', 'Unusual Access', 'Unusual file access pattern detected', '00000000-0000-0000-0000-000000000006');

-- Insert notifications
INSERT INTO notifications (user_id, type, title, message, priority, unread, related_link, sender)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'incident', 'Critical Incident Reported', 'A new critical incident has been reported: DDoS Attack', 'high', true, '/incidents/a4000000-0000-0000-0000-000000000000', 'System'),
  ('11111111-1111-1111-1111-111111111111', 'system', 'System Update', 'Safe Shield platform has been updated to version 2.0', 'low', true, '/admin/updates', 'System'),
  ('11111111-1111-1111-1111-111111111111', 'training', 'New Training Module', 'A new training module on Threat Hunting is now available', 'medium', true, '/training/threat-hunting', 'Training System');

-- Insert training courses
INSERT INTO training_courses (id, title, description, category, difficulty, duration_minutes, modules)
VALUES
  ('00000000-0000-0000-0000-000000000301', 'Incident Response Fundamentals', 'Learn the basics of incident response and handling security incidents', 'Incident Response', 'Beginner', 120, '[
    {"id": "module1", "title": "Introduction to Incident Response", "duration": 15, "content_type": "video"},
    {"id": "module2", "title": "Incident Classification", "duration": 20, "content_type": "text"},
    {"id": "module3", "title": "Initial Response Steps", "duration": 25, "content_type": "interactive"},
    {"id": "module4", "title": "Documentation Best Practices", "duration": 15, "content_type": "text"},
    {"id": "module5", "title": "Communication During Incidents", "duration": 20, "content_type": "video"},
    {"id": "module6", "title": "Practical Exercise", "duration": 25, "content_type": "exercise"}
  ]'),
  ('00000000-0000-0000-0000-000000000302', 'Advanced Threat Hunting', 'Advanced techniques for proactive threat hunting in enterprise environments', 'Threat Hunting', 'Advanced', 180, '[
    {"id": "module1", "title": "Threat Hunting Methodology", "duration": 30, "content_type": "video"},
    {"id": "module2", "title": "IOC Development", "duration": 25, "content_type": "text"},
    {"id": "module3", "title": "SIEM Query Optimization", "duration": 35, "content_type": "interactive"},
    {"id": "module4", "title": "Behavioral Analysis", "duration": 30, "content_type": "video"},
    {"id": "module5", "title": "Threat Intelligence Integration", "duration": 25, "content_type": "text"},
    {"id": "module6", "title": "Case Study: APT Detection", "duration": 35, "content_type": "case_study"}
  ]'),
  ('00000000-0000-0000-0000-000000000303', 'Network Security Monitoring', 'Learn how to monitor network traffic for security threats', 'Network Security', 'Intermediate', 150, '[
    {"id": "module1", "title": "Network Monitoring Fundamentals", "duration": 20, "content_type": "video"},
    {"id": "module2", "title": "Traffic Analysis Techniques", "duration": 25, "content_type": "text"},
    {"id": "module3", "title": "IDS/IPS Configuration", "duration": 30, "content_type": "interactive"},
    {"id": "module4", "title": "Wireshark Deep Dive", "duration": 35, "content_type": "video"},
    {"id": "module5", "title": "Network Forensics", "duration": 25, "content_type": "text"},
    {"id": "module6", "title": "Practical Exercise", "duration": 15, "content_type": "exercise"}
  ]'),
  ('00000000-0000-0000-0000-000000000304', 'Malware Analysis & Reverse Engineering', 'Techniques for analyzing and understanding malicious software', 'Malware Analysis', 'Advanced', 210, '[
    {"id": "module1", "title": "Malware Analysis Fundamentals", "duration": 30, "content_type": "video"},
    {"id": "module2", "title": "Static Analysis Techniques", "duration": 35, "content_type": "text"},
    {"id": "module3", "title": "Dynamic Analysis in Sandboxes", "duration": 40, "content_type": "interactive"},
    {"id": "module4", "title": "Disassembly and Debugging", "duration": 45, "content_type": "video"},
    {"id": "module5", "title": "Obfuscation Techniques", "duration": 30, "content_type": "text"},
    {"id": "module6", "title": "Malware Family Analysis", "duration": 30, "content_type": "case_study"}
  ]'),
  ('00000000-0000-0000-0000-000000000305', 'Digital Forensics Essentials', 'Core principles and techniques of digital forensics', 'Digital Forensics', 'Intermediate', 180, '[
    {"id": "module1", "title": "Forensic Methodology", "duration": 25, "content_type": "video"},
    {"id": "module2", "title": "Evidence Collection", "duration": 30, "content_type": "text"},
    {"id": "module3", "title": "Disk Forensics", "duration": 35, "content_type": "interactive"},
    {"id": "module4", "title": "Memory Forensics", "duration": 30, "content_type": "video"},
    {"id": "module5", "title": "Timeline Analysis", "duration": 25, "content_type": "text"},
    {"id": "module6", "title": "Case Study: Data Breach Investigation", "duration": 35, "content_type": "case_study"}
  ]'),
  ('00000000-0000-0000-0000-000000000306', 'Security Awareness & Phishing Defense', 'Training for all employees on security awareness and phishing prevention', 'Security Awareness', 'Beginner', 90, '[
    {"id": "module1", "title": "Security Fundamentals for Everyone", "duration": 15, "content_type": "video"},
    {"id": "module2", "title": "Recognizing Phishing Attempts", "duration": 20, "content_type": "interactive"},
    {"id": "module3", "title": "Password Security", "duration": 15, "content_type": "text"},
    {"id": "module4", "title": "Social Engineering Defense", "duration": 20, "content_type": "video"},
    {"id": "module5", "title": "Physical Security Awareness", "duration": 10, "content_type": "text"},
    {"id": "module6", "title": "Phishing Simulation Exercise", "duration": 10, "content_type": "exercise"}
  ]');

-- Insert training progress for some users
INSERT INTO training_progress (user_id, course_id, progress_percentage, completed, last_activity)
VALUES
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000301', 100, true, NOW() - INTERVAL '5 days'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000302', 75, false, NOW() - INTERVAL '2 days'),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000301', 100, true, NOW() - INTERVAL '10 days'),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000303', 50, false, NOW() - INTERVAL '1 day'),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000301', 30, false, NOW() - INTERVAL '3 days'),
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000306', 100, true, NOW() - INTERVAL '7 days'),
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000306', 60, false, NOW() - INTERVAL '2 days');

-- Insert user settings
INSERT INTO user_settings (user_id, notification_preferences, theme)
VALUES
  ('00000000-0000-0000-0000-000000000000', '{"email": true, "push": true, "browser": true}', 'dark'),
  ('00000000-0000-0000-0000-000000000001', '{"email": true, "push": true, "browser": true}', 'dark'),
  ('00000000-0000-0000-0000-000000000002', '{"email": true, "push": true, "browser": true}', 'dark'),
  ('00000000-0000-0000-0000-000000000003', '{"email": true, "push": false, "browser": true}', 'dark'),
  ('00000000-0000-0000-0000-000000000004', '{"email": true, "push": true, "browser": false}', 'light'),
  ('00000000-0000-0000-0000-000000000005', '{"email": true, "push": false, "browser": false}', 'system'),
  ('00000000-0000-0000-0000-000000000006', '{"email": true, "push": false, "browser": true}', 'dark'),
  ('11111111-1111-1111-1111-111111111111', '{
  "email": true,
  "in_app": true,
  "incident_alerts": true,
  "system_updates": true,
  "training_reminders": true
}'::jsonb, 'dark');

-- Insert sample evidence
INSERT INTO evidence (incident_id, file_name, file_path, file_type, file_size, uploaded_by, description)
VALUES
  ('a1000000-0000-0000-0000-000000000000', 'auth_log.txt', 'evidence/a1000000/auth_log.txt', 'text/plain', 1024, '11111111-1111-1111-1111-111111111111', 'Authentication server logs showing failed attempts'),
  ('a2000000-0000-0000-0000-000000000000', 'network_capture.pcap', 'evidence/a2000000/network_capture.pcap', 'application/vnd.tcpdump.pcap', 5242880, '11111111-1111-1111-1111-111111111111', 'Network traffic capture showing suspicious outbound connections'),
  ('a3000000-0000-0000-0000-000000000000', 'malware_sample.bin', 'evidence/a3000000/malware_sample.bin', 'application/octet-stream', 2097152, '11111111-1111-1111-1111-111111111111', 'Quarantined malware sample'),
  ('a4000000-0000-0000-0000-000000000000', 'traffic_analysis.pdf', 'evidence/a4000000/traffic_analysis.pdf', 'application/pdf', 3145728, '11111111-1111-1111-1111-111111111111', 'Analysis report of the DDoS attack traffic patterns'),
  ('a5000000-0000-0000-0000-000000000000', 'phishing_email.eml', 'evidence/a5000000/phishing_email.eml', 'message/rfc822', 512000, '11111111-1111-1111-1111-111111111111', 'Sample of the phishing email received by users');

-- Insert sample incident comments
INSERT INTO incident_comments (incident_id, user_id, content)
VALUES
  ('a1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Initial investigation shows these attempts are coming from a known malicious IP range.'),
  ('a2000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'I''ve isolated the affected systems and am analyzing the traffic patterns.'),
  ('a3000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Malware has been successfully quarantined and removed. System has been cleaned.'),
  ('a4000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Implementing rate limiting and additional WAF rules to mitigate the attack.'),
  ('a5000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Analyzing email headers to determine the source. Will prepare user advisory.');

-- Insert incident assignments
INSERT INTO incident_assignments (incident_id, assigned_to, assigned_by, status)
VALUES
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Accepted'),
  ('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Completed');
