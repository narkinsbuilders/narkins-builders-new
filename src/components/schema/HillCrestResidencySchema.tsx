// src/components/schema/HillCrestResidencySchema.tsx - FIXED VERSION
import Head from 'next/head';

export const HillCrestResidencySchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Hill Crest Residency - Luxury Apartments in Bahria Town Karachi",
    "description": "Luxurious 2, 3, and 4-bedroom apartments in Bahria Town Karachi with panoramic views and premium amenities by Narkin's Builders.",
    "brand": {
      "@type": "Brand",
      "name": "Narkin's Builders and Developers"
    },
    "category": "Luxury Apartments",
    "url": "https://narkinsbuilders.com/hill-crest-residency",
    "image": [
      "https://narkinsbuilders.com/images/hill-crest-residency-exterior-view-bahria-town-karachi.webp",
      "https://narkinsbuilders.com/images/hill-crest-residency-apartment-interior-living-room-luxury.webp"
    ],
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "Contact for pricing",
        "priceCurrency": "PKR"
      },
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01",
      "seller": {
        "@type": "Organization",
        "name": "Narkin's Builders and Developers",
        "telephone": "+92-320-324-3970",
        "url": "https://narkinsbuilders.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "29-30A Jinnah Avenue, Bahria Town",
          "addressLocality": "Karachi",
          "addressRegion": "Sindh",
          "postalCode": "75340",
          "addressCountry": "PK"
        }
      },
      "businessFunction": "http://purl.org/goodrelations/v1#Sell"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Saad Arshad"
        },
        "reviewBody": "Highly committed to delivering in timelines, I wholeheartedly recommend considering investment in projects by Narkin's Builders.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "datePublished": "2024-12-15"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Arsalan"
        },
        "reviewBody": "Smooth booking experience, very transparent throughout the process.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "datePublished": "2024-11-20"
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Number of Bedrooms",
        "value": "2-4"
      },
      {
        "@type": "PropertyValue", 
        "name": "Floor Area",
        "value": "697-1996 sq ft"
      },
      {
        "@type": "PropertyValue",
        "name": "Property Type",
        "value": "Luxury Apartment"
      }
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