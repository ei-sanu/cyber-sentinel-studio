-- Fix existing comments table to work with Firebase auth
-- Run this if you already created the table with the old schema

-- Option 1: Drop and recreate (recommended if no data to preserve)
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    text TEXT NOT NULL CHECK (char_length(text) <= 300),
    user_id TEXT,
    user_name TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Re-enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Allow public SELECT on comments" ON comments FOR
SELECT USING (true);

CREATE POLICY "Allow public INSERT on comments" ON comments FOR
INSERT
WITH
    CHECK (true);

CREATE POLICY "Prevent UPDATE on comments" ON comments FOR
UPDATE USING (false);

CREATE POLICY "Prevent DELETE on comments" ON comments FOR DELETE USING (false);

-- Recreate index
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments (created_at DESC);
