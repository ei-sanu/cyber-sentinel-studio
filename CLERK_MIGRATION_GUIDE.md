# Clerk Authentication Migration Guide

This guide walks you through completing the migration from Firebase to Clerk authentication while maintaining the existing theme and UI.

## ✅ Changes Made

The following changes have been automatically applied:

### 1. **Dependencies Updated**
- ❌ Removed: `firebase` (^12.9.0)
- ✅ Added: `@clerk/clerk-react` (^5.0.0)

### 2. **Configuration Files**
- ✅ `src/lib/firebase.ts` - Converted to Clerk config
- ✅ `.env` - Updated with Clerk configuration placeholder
- ✅ `src/main.tsx` - Added ClerkProvider wrapper

### 3. **Authentication Context**
- ✅ `src/contexts/AuthContext.tsx` - Updated to use Clerk SDK
  - Uses `useAuth()` and `useUser()` from @clerk/clerk-react
  - Maintains backward compatibility with email property
  - Supports Google and GitHub OAuth

### 4. **Components Updated**
- ✅ `src/components/AuthModal.tsx` - Clerk OAuth integration
  - Uses `useSignIn()` for redirect-based authentication
  - Maintains existing neo-brutalist UI
  - Shows Google and GitHub auth buttons only

- ✅ `src/components/ProfileDropdown.tsx` - Clerk user data mapping
  - Maps Clerk user properties to display format
  - Handles fullName, imageUrl, createdAt

- ✅ `src/components/ContactSection.tsx` - Updated user ID reference
  - Changed from `user?.uid` to `user?.id`

- ✅ `src/components/UserReportsSection.tsx` - Updated user properties
  - Changed from `user?.uid` to `user?.id`
  - Changed from `user?.displayName` to `user?.fullName`

## 🔧 Next Steps

### 1. Install Dependencies
```bash
bun install
# or
npm install
# or
yarn install
```

### 2. Set Up Clerk Project
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Go to **API Keys** section
4. Copy your **Publishable Key**

### 3. Update Environment Variables
Edit `.env` file and replace:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

Replace `your_clerk_publishable_key_here` with your actual Clerk publishable key.

### 4. Configure OAuth Providers (Google & GitHub)

#### For Google OAuth:
1. In Clerk Dashboard, go to **Authenticators**
2. Enable **Google**
3. Add your application URLs in Google Cloud Console:
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`

#### For GitHub OAuth:
1. In Clerk Dashboard, go to **Authenticators**
2. Enable **GitHub**
3. Add your application URLs in GitHub OAuth settings:
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`

### 5. Configure Redirect URLs
In Clerk Dashboard, go to **Settings** → **URLs**:
- **Allowed redirect URLs:**
  - `http://localhost:5173/`
  - `https://yourdomain.com/`

### 6. Verify Theme Compatibility
The authentication UI maintains the existing neo-brutalist theme:
- ✅ Bold borders and shadows
- ✅ Monospace fonts
- ✅ Color-coded buttons (green, blue, cyan, red)
- ✅ Retro-futuristic styling

## 📋 Features Maintained

- ✅ Google authentication
- ✅ GitHub authentication
- ✅ User profile dropdown with session info
- ✅ Admin panel access via email verification
- ✅ User comments and reports system
- ✅ Notification system with user tracking
- ✅ Contact form with user ID logging
- ✅ Existing neo-brutalist UI theme
- ✅ All styling and color schemes

## 🚀 Development

```bash
# Start development server
bun dev
# or
npm run dev

# Build for production
bun build
# or
npm run build
```

## ⚠️ Important Notes

1. **Admin Access**: The admin panel checks user email against a whitelist. Ensure your admin email is configured in the `isAdmin()` function in `src/lib/supabase.ts`.

2. **User Data Mapping**: Clerk user data is automatically mapped with an `email` property for backward compatibility with existing code.

3. **Email Extraction**:
   - Primary email: `user.primaryEmailAddress?.emailAddress`
   - Backup: `user.emailAddresses?.[0]?.emailAddress`

4. **OAuth Behavior**: Clerk uses redirect-based authentication by default. This is more reliable than popup-based authentication and provides better security.

## 🔍 Troubleshooting

### Issue: "Missing Publishable Key" error
**Solution**: Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set in `.env` and the dev server is restarted.

### Issue: OAuth fails with redirect errors
**Solution**:
1. Verify redirect URLs are correctly configured in Clerk Dashboard
2. Ensure OAuth apps are enabled for Google/GitHub
3. Check that client credentials are set up correctly

### Issue: Admin panel shows "Access Denied"
**Solution**: Verify the user's email is in the admin whitelist in `src/lib/supabase.ts`.

## 📚 Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- [OAuth Setup Guide](https://clerk.com/docs/authentication/social-connections/overview)

## ✨ Next Phase Enhancements

Consider adding these features in future updates:
- Clerk's built-in user management UI
- Multi-factor authentication (MFA)
- Social profiles management
- Custom claims and metadata
- Webhooks for user events
