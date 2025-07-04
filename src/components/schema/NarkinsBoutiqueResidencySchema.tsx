// src/components/schema/NarkinsBoutiqueResidencySchema.tsx - NEW FILE
import Head from 'next/head';

export const NarkinsBoutiqueResidencySchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Narkin's Boutique Residency - Premium Apartments in Bahria Town Karachi",
    "description": "Premium 2 and 3-bedroom apartments in Bahria Town Karachi with luxury amenities and modern design by Narkin's Builders.",
    "brand": {
      "@type": "Brand",
      "name": "Narkin's Builders and Developers"
    },
    "category": "Premium Apartments",
    "url": "https://narkinsbuilders.com/narkins-boutique-residency",
    "image": [
      "https://narkinsbuilders.com/images/narkins-boutique-residency-luxury-apartments-bahria-town.webp",
      "https://narkinsbuilders.com/images/narkins-boutique-residency-apartment-interior-modern-design.webp"
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
          "streetAddress": "Bahria Town",
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
          "name": "Umair Iqrar"
        },
        "reviewBody": "I decided to invest during the initial launch phase, and after just two years, I've seen substantial returns. It's been a fantastic investment opportunity!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "datePublished": "2024-09-10"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Ahmed Hassan"
        },
        "reviewBody": "Excellent quality construction and timely delivery. Very professional team.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "datePublished": "2024-10-25"
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Number of Bedrooms",
        "value": "2-3"
      },
      {
        "@type": "PropertyValue",
        "name": "Property Type", 
        "value": "Premium Apartment"
      },
      {
        "@type": "PropertyValue",
        "name": "Location",
        "value": "Bahria Town Karachi"
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