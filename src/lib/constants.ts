// Use environment variable or fallback to production domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://repositoryweb.com';

// Only create URL object when needed to avoid build issues
export const siteOrigin = siteUrl;
export const siteURL = siteUrl;
