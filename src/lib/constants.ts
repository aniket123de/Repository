export const siteURL = process.env.NEXT_PUBLIC_SITE_URL 
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('https://repositoryweb.com');

export const siteOrigin = siteURL.origin;
