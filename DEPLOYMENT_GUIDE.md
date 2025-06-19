# Repository Web Deployment Guide

## Environment Setup for repositoryweb.com

### 1. Create Production Environment File

Create `.env.local` (DO NOT commit this file):

```bash
# Production Environment
NEXT_PUBLIC_SITE_URL=https://repositoryweb.com

# Google Services (Add your actual values)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code

# Social Media
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/repository-main
NEXT_PUBLIC_GITHUB_URL=https://github.com/repository-team

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Auth
NEXTAUTH_SECRET=your-secure-secret-key
NEXTAUTH_URL=https://repositoryweb.com
```

### 2. Vercel Deployment

If deploying to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# Or use CLI:
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add NEXT_PUBLIC_GA_ID
```

### 3. Domain Configuration

In your hosting provider (Vercel/Netlify/etc):

1. **Add Custom Domain:** repositoryweb.com
2. **DNS Settings:**
   - A record: @ → your-host-ip
   - CNAME record: www → repositoryweb.com
3. **SSL Certificate:** Auto-enabled
4. **Redirects:** www.repositoryweb.com → repositoryweb.com

### 4. Post-Deployment Checklist

After deployment, verify:

- [ ] https://repositoryweb.com loads correctly
- [ ] https://www.repositoryweb.com redirects to main domain
- [ ] https://repositoryweb.com/sitemap.xml works
- [ ] https://repositoryweb.com/robots.txt works
- [ ] All images and assets load properly
- [ ] Page metadata appears correctly in browser tabs
- [ ] Social media sharing works (test with Facebook/Twitter debugger)

### 5. Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: repositoryweb.com
3. Verify ownership using HTML meta tag
4. Submit sitemap: https://repositoryweb.com/sitemap.xml
5. Request indexing for main pages

### 6. Analytics Setup

1. Create [Google Analytics 4](https://analytics.google.com) property
2. Get tracking ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Verify tracking is working

### 7. Performance Optimization

After deployment, test:

- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)
- [WebPageTest](https://webpagetest.org)

Target scores:
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95

### 8. Content Delivery Network (CDN)

Recommended setup with Cloudflare:

1. Sign up for Cloudflare
2. Add repositoryweb.com
3. Update nameservers
4. Enable:
   - Auto Minify (CSS, JS, HTML)
   - Brotli compression
   - Always Use HTTPS
   - Browser Cache TTL: 4 hours

### 9. Monitoring Setup

Set up monitoring for:

- **Uptime:** UptimeRobot (free)
- **Performance:** Google PageSpeed Insights
- **SEO:** Google Search Console
- **Analytics:** Google Analytics 4
- **Errors:** Vercel Analytics or Sentry

### 10. Backup Strategy

- **Code:** GitHub repository
- **Database:** Supabase automatic backups
- **Media:** Cloud storage with versioning
- **Environment:** Document all environment variables

---

## Quick Deploy Commands

```bash
# Build and test locally
npm run build
npm run start

# Deploy to production
vercel --prod

# Or if using other platforms
npm run build
# Upload dist folder to your hosting
```

## Troubleshooting

### Common Issues:

1. **Domain not working:** Check DNS propagation (24-48 hours)
2. **Images not loading:** Verify domains in next.config.js
3. **Environment variables not working:** Check case sensitivity
4. **SEO meta tags not showing:** Clear browser cache, check view source

### Support Resources:

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Domain Setup](https://vercel.com/docs/concepts/projects/domains)
- [Google Search Console Help](https://support.google.com/webmasters)

---

**Ready to launch repositoryweb.com! 🚀**
