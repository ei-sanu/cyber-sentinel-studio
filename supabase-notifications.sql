-- Create notifications table for admin messages
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (
        type IN (
            'info',
            'success',
            'warning',
            'error'
        )
    ),
    created_by TEXT NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        expires_at TIMESTAMP
    WITH
        TIME ZONE
);

-- Create user_notifications table to track read status
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    notification_id UUID REFERENCES notifications (id) ON DELETE CASCADE,
    user_email TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (notification_id, user_email)
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

-- Notifications policies
-- Allow public SELECT (anyone can read notifications)
CREATE POLICY "Allow public SELECT on notifications" ON notifications FOR
SELECT USING (
        expires_at IS NULL
        OR expires_at > NOW()
    );

-- Allow INSERT notifications (admin check is done in frontend)
CREATE POLICY "Allow public INSERT on notifications" ON notifications FOR
INSERT
WITH
    CHECK (true);

-- Allow UPDATE (admin check is done in frontend)
CREATE POLICY "Allow public UPDATE on notifications" ON notifications FOR
UPDATE USING (true);

-- Allow DELETE (admin check is done in frontend)
CREATE POLICY "Allow public DELETE on notifications" ON notifications FOR DELETE USING (true);

-- User notifications policies
-- Users can read their own notification status
CREATE POLICY "Allow users to read their notifications" ON user_notifications FOR
SELECT USING (true);

-- Users can insert their read status
CREATE POLICY "Allow users to insert read status" ON user_notifications FOR
INSERT
WITH
    CHECK (true);

-- Users can update their read status
CREATE POLICY "Allow users to update read status" ON user_notifications FOR
UPDATE USING (true);

-- Delete when parent notification is deleted (cascade handles this)

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_expires_at ON notifications (expires_at);

CREATE INDEX IF NOT EXISTS idx_user_notifications_user_email ON user_notifications (user_email);

CREATE INDEX IF NOT EXISTS idx_user_notifications_notification_id ON user_notifications (notification_id);

CREATE INDEX IF NOT EXISTS idx_user_notifications_is_read ON user_notifications (is_read);
