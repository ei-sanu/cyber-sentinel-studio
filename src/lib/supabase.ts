import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Comment {
    id: string;
    text: string;
    user_id: string | null;
    user_name: string | null;
    created_at: string;
}

export interface Newsletter {
    id: string;
    email: string;
    created_at: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    created_by: string;
    created_at: string;
    expires_at: string | null;
}

export interface UserNotification {
    id: string;
    notification_id: string;
    user_email: string;
    is_read: boolean;
    read_at: string | null;
    created_at: string;
}

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    message: string;
    user_id: string | null;
    created_at: string;
}

// Admin email constant
export const ADMIN_EMAIL = 'someshranjanbiswal13678@gmail.com';

// Check if user is admin
export const isAdmin = (email: string | null | undefined): boolean => {
    return email === ADMIN_EMAIL;
};
