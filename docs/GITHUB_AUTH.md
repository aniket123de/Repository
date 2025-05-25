# GitHub Authentication Setup

The Repository application includes GitHub authentication for the Find Your Tribe (FYT) feature. This allows users to log in with their GitHub accounts and connect with other developers.

## Setup Instructions

1. **Create a GitHub OAuth App:**
   - Go to your [GitHub Developer Settings](https://github.com/settings/developers)
   - Click on "OAuth Apps" and then "New OAuth App"
   - Fill in the following details:
     - Application name: `Repository Local` (or any name you prefer)
     - Homepage URL: `http://localhost:3000`
     - Application description: (Optional) A description of your application
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Click "Register application"
   - After registration, you'll be provided with a Client ID
   - Generate a Client Secret by clicking the "Generate a new client secret" button

2. **Configure Environment Variables:**
   - Copy the `.env.local.example` file to `.env.local`
   - Update the following values in your `.env.local` file:
     ```
     GITHUB_ID=your_github_client_id
     GITHUB_SECRET=your_github_client_secret
     NEXTAUTH_SECRET=generate_a_random_secret_key
     NEXTAUTH_URL=http://localhost:3000
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     ```
   - You can generate a random secret key with: `openssl rand -base64 32`

3. **Start the Development Server:**
   ```
   npm run dev
   ```

4. **Test the Authentication:**
   - Visit the FYT page at `http://localhost:3000/fyt`
   - Click the "Login with GitHub" button
   - You should be redirected to GitHub for authentication
   - After successful authentication, you'll be redirected back to your application

## Features

- Modern UI for GitHub login
- Modal dialog for authentication
- User profile display after login
- Session management with NextAuth.js
- Secure handling of authentication credentials

## Customization

You can customize the appearance of the GitHub login modal by modifying the following files:
- `src/app/components/github-login-modal/github-login-modal.module.scss` - Styling for the modal
- `src/app/components/github-login-modal/index.tsx` - Modal component structure

## Production Deployment

For production deployment, make sure to:
1. Create a separate GitHub OAuth App with your production URL
2. Set secure environment variables on your hosting platform
3. Generate a strong, unique `NEXTAUTH_SECRET` value
