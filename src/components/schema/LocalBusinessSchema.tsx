// src/components/schema/LocalBusinessSchema.tsx
import Head from 'next/head';

export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Narkin's Builders and Developers",
    "url": "https://narkinsbuilders.com",
    "image": "https://narkinsbuilders.com/images/narkins-builders-logo.webp",
    "logo": "https://narkinsbuilders.com/images/narkins-builders-logo.webp",
    "description": "Leading real estate developer in Karachi specializing in luxury apartments and residential projects in Bahria Town since 1994.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bahria Town Karachi",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75340",
      "addressCountry": "PK"
    },
    "telephone": "+92-320-324-3970",
    "foundingDate": "1994",
    "priceRange": "PKR 25,000,000 - PKR 35,000,000",
    "areaServed": "Bahria Town Karachi",
    "serviceType": "Real Estate Development",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-320-324-3970",
      "contactType": "customer service",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.facebook.com/narkinsbuilders",
      "https://www.instagram.com/narkinsbuilders"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};