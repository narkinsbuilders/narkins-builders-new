import Head from 'next/head';
export const LocalBusinessSchema = () => (
  <Head>
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({"name":"Narkin's Builders and Developers","@type":"RealEstateAgent","url":"https://narkinsbuilders.com","address":{"addressCountry":"Pakistan","addressLocality":"Karachi","@type":"PostalAddress","addressRegion":"Sindh"},"telephone":"+92-320-324-3970","@context":"https://schema.org","foundingDate":"1994","priceRange":"PKR 2,000,000 - PKR 5,000,000","areaServed":"Bahria Town Karachi"})
    }} />
  </Head>
);
