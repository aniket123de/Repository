export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://repositoryweb.com';

export const siteURL = (() => {
  try {
    return new URL(siteOrigin);
  } catch (error) {
    // Fallback for build time
    return new URL('https://repositoryweb.com');
  }
})();
