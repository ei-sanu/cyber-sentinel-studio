-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    text TEXT NOT NULL CHECK (char_length(text) <= 300),
    user_id TEXT,
    user_name TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create newsletter table
CREATE TABLE IF NOT EXISTS newsletter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        CONSTRAINT valid_email CHECK (
            email ~ * '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
        )
);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Comments policies
-- Allow public SELECT (anyone can read comments)
CREATE POLICY "Allow public SELECT on comments" ON comments FOR
SELECT USING (true);

-- Allow public INSERT (anyone can create comments)
CREATE POLICY "Allow public INSERT on comments" ON comments FOR
INSERT
WITH
    CHECK (true);

-- Prevent UPDATE (no one can update comments)
CREATE POLICY "Prevent UPDATE on comments" ON comments FOR
UPDATE USING (false);

-- Prevent DELETE (no one can delete comments)
CREATE POLICY "Prevent DELETE on comments" ON comments FOR DELETE USING (false);

-- Newsletter policies
-- Prevent SELECT (no one can read newsletter list for privacy)
CREATE POLICY "Prevent SELECT on newsletter" ON newsletter FOR
SELECT USING (false);

-- Allow public INSERT (anyone can subscribe)
CREATE POLICY "Allow public INSERT on newsletter" ON newsletter FOR
INSERT
WITH
    CHECK (true);

-- Prevent UPDATE (no one can update newsletter subscriptions)
CREATE POLICY "Prevent UPDATE on newsletter" ON newsletter FOR
UPDATE USING (false);

-- Prevent DELETE (no one can delete newsletter subscriptions)
CREATE POLICY "Prevent DELETE on newsletter" ON newsletter FOR DELETE USING (false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter (email);
