import Head from 'next/head';

export const OrganizationSchema = () => (
  <Head>
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Narkin's Builders and Developers",
        "url": "https://narkinsbuilders.com",
        "logo": "https://narkinsbuilders.com/images/narkins-builders-logo.webp",
        "description": "Leading real estate developer in Karachi specializing in luxury apartments and residential projects in Bahria Town since 1994.",
        "foundingDate": "1994",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Karachi",
          "addressRegion": "Sindh", 
          "addressCountry": "Pakistan"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+92-320-324-3970",
          "contactType": "customer service",
          "availableLanguage": ["English", "Urdu"]
        },
        "sameAs": [
          "https://www.facebook.com/narkinsbuilders",
          "https://www.instagram.com/narkinsbuilders"
        ],
        "areaServed": "Bahria Town Karachi",
        "serviceType": "Real Estate Development",
        "knowsAbout": [
          "Luxury Apartments",
          "Residential Construction", 
          "Property Development",
          "Bahria Town Projects"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Property Portfolio",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Hill Crest Residency",
                "description": "Luxury 2-4 bedroom apartments in Bahria Town Karachi"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Product",
                "name": "Narkin's Boutique Residency",
                "description": "Ultra-luxury 2-4 bedroom apartments in Heritage Commercial area"
              }
            }
          ]
        }
      })
    }} />
  </Head>
);