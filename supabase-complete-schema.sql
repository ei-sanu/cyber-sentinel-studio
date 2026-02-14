-- =====================================================
-- CYBER SENTINEL STUDIO - COMPLETE DATABASE SCHEMA
-- =====================================================
-- Complete database schema for Cyber Sentinel Studio
-- Author: Somesh Ranjan Biswal (someshranjanbiswal13678@gmail.com)
--
-- INSTRUCTIONS:
-- 1. Open your Supabase project dashboard
-- 2. Go to SQL Editor
-- 3. Create a new query
-- 4. Copy and paste this ENTIRE file
-- 5. Click "Run" to execute
-- 6. Verify all tables are created successfully
--
-- This will create:
-- - comments table (user comments on the website)
-- - newsletter table (email subscriptions)
-- - notifications table (admin notifications system)
-- - user_notifications table (track read status per user)
-- - contact_submissions table (contact form submissions)
--
-- All tables include Row Level Security (RLS) policies
-- Admin email is hard-coded in frontend: someshranjanbiswal13678@gmail.com
-- =====================================================

-- =====================================================
-- 1. ENABLE EXTENSIONS
-- =====================================================

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 2. CREATE TABLES
-- =====================================================

-- -----------------------------------------------------
-- 2.1 COMMENTS TABLE
-- -----------------------------------------------------
-- Stores user comments posted on the website
-- User authentication via Firebase, stored as user_id (text)

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    text TEXT NOT NULL CHECK (char_length(text) <= 300),
    user_id TEXT,
    user_name TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------
-- 2.2 NEWSLETTER TABLE
-- -----------------------------------------------------
-- Stores email addresses for newsletter subscriptions
-- Email validation via CHECK constraint

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

-- -----------------------------------------------------
-- 2.3 NOTIFICATIONS TABLE
-- -----------------------------------------------------
-- Stores admin-created notifications for all users
-- Supports different types: info, success, warning, error
-- Optional expiration date for auto-hiding old notifications

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

-- -----------------------------------------------------
-- 2.4 USER_NOTIFICATIONS TABLE
-- -----------------------------------------------------
-- Tracks which users have read which notifications
-- One record per user per notification

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

-- -----------------------------------------------------
-- 2.5 CONTACT_SUBMISSIONS TABLE
-- -----------------------------------------------------
-- Stores contact form submissions from users
-- Accessible by admin for review

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

-- =====================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. CREATE RLS POLICIES
-- =====================================================

-- -----------------------------------------------------
-- 4.1 COMMENTS POLICIES
-- -----------------------------------------------------

-- Allow anyone to read comments
CREATE POLICY "Allow public SELECT on comments" ON comments FOR
SELECT USING (true);

-- Allow anyone to post comments
CREATE POLICY "Allow public INSERT on comments" ON comments FOR
INSERT
WITH
    CHECK (true);

-- Prevent updating comments (immutable once posted)
CREATE POLICY "Prevent UPDATE on comments" ON comments FOR
UPDATE USING (false);

-- Prevent deleting comments (only admin can delete via frontend)
CREATE POLICY "Prevent DELETE on comments" ON comments FOR DELETE USING (false);

-- -----------------------------------------------------
-- 4.2 NEWSLETTER POLICIES
-- -----------------------------------------------------

-- Prevent reading newsletter list (privacy protection)
CREATE POLICY "Prevent SELECT on newsletter" ON newsletter FOR
SELECT USING (false);

-- Allow anyone to subscribe
CREATE POLICY "Allow public INSERT on newsletter" ON newsletter FOR
INSERT
WITH
    CHECK (true);

-- Prevent updating subscriptions
CREATE POLICY "Prevent UPDATE on newsletter" ON newsletter FOR
UPDATE USING (false);

-- Prevent deleting subscriptions (admin manages via frontend)
CREATE POLICY "Prevent DELETE on newsletter" ON newsletter FOR DELETE USING (false);

-- -----------------------------------------------------
-- 4.3 NOTIFICATIONS POLICIES
-- -----------------------------------------------------

-- Allow reading active notifications (not expired)
CREATE POLICY "Allow public SELECT on notifications" ON notifications FOR
SELECT USING (
        expires_at IS NULL
        OR expires_at > NOW()
    );

-- Allow creating notifications (admin check in frontend)
CREATE POLICY "Allow public INSERT on notifications" ON notifications FOR
INSERT
WITH
    CHECK (true);

-- Allow updating notifications (admin check in frontend)
CREATE POLICY "Allow public UPDATE on notifications" ON notifications FOR
UPDATE USING (true);

-- Allow deleting notifications (admin check in frontend)
CREATE POLICY "Allow public DELETE on notifications" ON notifications FOR DELETE USING (true);

-- -----------------------------------------------------
-- 4.4 USER_NOTIFICATIONS POLICIES
-- -----------------------------------------------------

-- Allow users to read their notification status
CREATE POLICY "Allow users to read their notifications" ON user_notifications FOR
SELECT USING (true);

-- Allow users to create read status entries
CREATE POLICY "Allow users to insert read status" ON user_notifications FOR
INSERT
WITH
    CHECK (true);

-- Allow users to update their read status
CREATE POLICY "Allow users to update read status" ON user_notifications FOR
UPDATE USING (true);

-- Delete cascades automatically when parent notification deleted

-- -----------------------------------------------------
-- 4.5 CONTACT_SUBMISSIONS POLICIES
-- -----------------------------------------------------

-- Allow public to submit contact forms
CREATE POLICY "Allow public INSERT on contact_submissions" ON contact_submissions FOR
INSERT
WITH
    CHECK (true);

-- Allow reading contact submissions (admin check in frontend)
CREATE POLICY "Allow public SELECT on contact_submissions" ON contact_submissions FOR
SELECT USING (true);

-- Allow updating contact submissions (admin operations)
CREATE POLICY "Allow public UPDATE on contact_submissions" ON contact_submissions FOR
UPDATE USING (true);

-- Allow deleting contact submissions (admin operations)
CREATE POLICY "Allow public DELETE on contact_submissions" ON contact_submissions FOR DELETE USING (true);

-- =====================================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments (created_at DESC);

-- Newsletter indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter (email);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_expires_at ON notifications (expires_at);

-- User notifications indexes
CREATE INDEX IF NOT EXISTS idx_user_notifications_user_email ON user_notifications (user_email);

CREATE INDEX IF NOT EXISTS idx_user_notifications_notification_id ON user_notifications (notification_id);

CREATE INDEX IF NOT EXISTS idx_user_notifications_is_read ON user_notifications (is_read);

-- Contact submissions indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions (email);

-- =====================================================
-- 6. VERIFICATION QUERIES
-- =====================================================
-- Run these queries to verify everything was created successfully

-- Check all tables exist
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public'
-- ORDER BY table_name;

-- Check all policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;

-- Check all indexes
-- SELECT indexname, tablename
-- FROM pg_indexes
-- WHERE schemaname = 'public'
-- ORDER BY tablename, indexname;

-- Count records in each table (should be 0 for new setup)
-- SELECT 'comments' as table_name, COUNT(*) as count FROM comments
-- UNION ALL SELECT 'newsletter', COUNT(*) FROM newsletter
-- UNION ALL SELECT 'notifications', COUNT(*) FROM notifications
-- UNION ALL SELECT 'user_notifications', COUNT(*) FROM user_notifications
-- UNION ALL SELECT 'contact_submissions', COUNT(*) FROM contact_submissions;

-- =====================================================
-- 7. NOTES & IMPORTANT INFORMATION
-- =====================================================

-- ADMIN ACCESS:
-- The admin panel is restricted to: someshranjanbiswal13678@gmail.com
-- This is hard-coded in: src/lib/supabase.ts (ADMIN_EMAIL constant)
-- Admin authentication is handled by Firebase (Google/Facebook/GitHub)
-- Admin checks are done in the frontend before any admin operations

-- AUTHENTICATION:
-- User authentication is handled by Firebase Auth
-- User IDs are stored as TEXT (Firebase UID)
-- No Supabase Auth is used - only Supabase Database

-- SECURITY:
-- Row Level Security (RLS) is enabled on all tables
-- Frontend admin checks provide security layer
-- Database policies allow operations (frontend validates admin)
-- Never expose Supabase keys in public repositories

-- ROW LEVEL SECURITY PHILOSOPHY:
-- RLS policies are permissive (allow operations)
-- Admin validation happens in frontend before operations
-- This approach works because Firebase Auth handles user identity
-- Supabase can't distinguish Firebase users, so frontend must validate

-- MIGRATION:
-- If you already have these tables, you may need to drop them first
-- To drop all tables: DROP TABLE IF EXISTS comments, newsletter,
--   notifications, user_notifications, contact_submissions CASCADE;
-- WARNING: This will delete all data!

-- BACKUPS:
-- Always backup your data before running migrations
-- Supabase dashboard: Settings > Database > Backups

-- SUPPORT:
-- For issues, check the ADMIN_FIX_GUIDE.md file
-- Or review individual SQL files for specific table details

-- =====================================================
-- END OF SCHEMA
-- =====================================================
-- Schema creation complete!
-- Check the verification queries above to confirm success.
-- =====================================================
