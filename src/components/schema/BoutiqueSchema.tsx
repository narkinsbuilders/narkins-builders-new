// src/components/schema/BoutiqueSchema.tsx
import Head from 'next/head';

export const BoutiqueSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Narkin's Boutique Residency - Ultra-Luxury Apartments",
    "url": "https://narkinsbuilders.com/narkins-boutique-residency",
    "description": "Ultra-luxury 2-3 bedroom apartments in Heritage Commercial Area, Bahria Town Karachi with premium finishes and modern amenities.",
    "numberOfBedrooms": "2-3",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Heritage Commercial Area, Bahria Town",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75340",
      "addressCountry": "PK"
    },
    "offers": {
      "@type": "Offer",
      "price": "32000000",
      "priceCurrency": "PKR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Narkin's Builders and Developers",
        "telephone": "+92-320-324-3970"
      }
    }
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