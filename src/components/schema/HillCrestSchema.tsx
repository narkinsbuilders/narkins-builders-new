// src/components/schema/HillCrestSchema.tsx
import Head from 'next/head';

export const HillCrestSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Hill Crest Residency - Luxury Apartments in Bahria Town Karachi",
    "url": "https://narkinsbuilders.com/hill-crest-residency",
    "description": "Luxurious 2, 3, and 4-bedroom apartments in Bahria Town Karachi with panoramic views and premium amenities.",
    "numberOfBedrooms": "2-4",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "29-30A Jinnah Avenue, Bahria Town",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75340",
      "addressCountry": "PK"
    },
    "offers": {
      "@type": "Offer",
      "price": "28000000",
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