import { siteOrigin } from '~/lib/constants'

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Repository",
    "url": siteOrigin,
    "logo": `${siteOrigin}/circle.png`,
    "description": "Join Repository's thriving developer community. Build innovative projects, collaborate with talented developers, and grow your skills.",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/repository-main",
      "https://github.com/repository-team"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Repository",
    "url": siteOrigin,
    "description": "Build More, Grow More - Developer Community Platform",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteOrigin}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Repository - Build More, Grow More",
    "description": "Join Repository's thriving developer community. Build innovative projects, collaborate with talented developers, and grow your skills.",
    "url": siteOrigin,
    "mainEntity": {
      "@type": "Organization",
      "name": "Repository"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    </>
  )
}
