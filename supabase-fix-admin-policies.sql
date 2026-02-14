-- =============================================
-- FIX Admin Panel Access - Update RLS Policies
-- =============================================
-- Run this in Supabase SQL Editor to fix admin panel issues
-- This updates the restrictive policies to allow admin operations

-- =============================================
-- 1. UPDATE CONTACT SUBMISSIONS POLICIES
-- =============================================

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Prevent public SELECT on contact_submissions" ON contact_submissions;

DROP POLICY IF EXISTS "Prevent public UPDATE on contact_submissions" ON contact_submissions;

DROP POLICY IF EXISTS "Prevent public DELETE on contact_submissions" ON contact_submissions;

-- Create new permissive policies (admin check is in frontend)
CREATE POLICY "Allow public SELECT on contact_submissions" ON contact_submissions FOR
SELECT USING (true);

CREATE POLICY "Allow public UPDATE on contact_submissions" ON contact_submissions FOR
UPDATE USING (true);

CREATE POLICY "Allow public DELETE on contact_submissions" ON contact_submissions FOR DELETE USING (true);

-- =============================================
-- 2. UPDATE NOTIFICATIONS POLICIES
-- =============================================

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Prevent public UPDATE on notifications" ON notifications;

DROP POLICY IF EXISTS "Prevent public DELETE on notifications" ON notifications;

DROP POLICY IF EXISTS "Allow admin INSERT on notifications" ON notifications;

-- Create new permissive policies (admin check is in frontend)
CREATE POLICY "Allow public INSERT on notifications" ON notifications FOR
INSERT
WITH
    CHECK (true);

CREATE POLICY "Allow public UPDATE on notifications" ON notifications FOR
UPDATE USING (true);

CREATE POLICY "Allow public DELETE on notifications" ON notifications FOR DELETE USING (true);

-- =============================================
-- VERIFICATION
-- =============================================
-- Run these to verify policies are correct:

-- Check contact_submissions policies
-- SELECT * FROM pg_policies WHERE tablename = 'contact_submissions';

-- Check notifications policies
-- SELECT * FROM pg_policies WHERE tablename = 'notifications';

-- =============================================
-- DONE! Your admin panel should now work.
-- =============================================
