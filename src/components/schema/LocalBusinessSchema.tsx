import Head from 'next/head';

export const LocalBusinessSchema = () => (
  <Head>
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Narkin's Builders and Developers",
        "url": "https://narkinsbuilders.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Karachi",
          "addressRegion": "Sindh",
          "addressCountry": "Pakistan"
        },
        "telephone": "+92-320-324-3970",
        "foundingDate": "1994",
        "priceRange": "PKR 2,000,000 - PKR 5,000,000",
        "areaServed": "Bahria Town Karachi"
      })
    }} />
  </Head>
);
