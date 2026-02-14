-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    user_id TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (anyone can submit contact form)
CREATE POLICY "Allow public INSERT on contact_submissions" ON contact_submissions FOR
INSERT
WITH
    CHECK (true);

-- Allow public SELECT (admin check is done in frontend)
CREATE POLICY "Allow public SELECT on contact_submissions" ON contact_submissions FOR
SELECT USING (true);

-- Allow public UPDATE (admin check is done in frontend)
CREATE POLICY "Allow public UPDATE on contact_submissions" ON contact_submissions FOR
UPDATE USING (true);

-- Allow public DELETE (admin check is done in frontend)
CREATE POLICY "Allow public DELETE on contact_submissions" ON contact_submissions FOR DELETE USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions (email);
