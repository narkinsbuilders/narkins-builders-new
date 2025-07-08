import { Html, Head, Main, NextScript } from 'next/document'

// Use environment variable (your real GA ID)
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-JBMXQDSW7T';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname
              });
              console.log('🟢 Google Analytics initialized:', '${GA_TRACKING_ID}');
            `,
          }}
        />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="6r3wQXNZVGZ59xXsuU_8z_Z4oGpeIaiEPvmNuf78Mzk" />
        
        {/* Schema.org Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Narkin's Builders",
              "url": "https://narkinsbuilders.com",
              "logo": "https://narkinsbuilders.com/images/narkins_logo.webp",
              "description": "Leading real estate developers in Bahria Town Karachi with over 30 years of experience in luxury residential projects.",
              "foundingDate": "1994",
              "sameAs": [
                "https://www.facebook.com/narkinsbuilders",
                "https://www.instagram.com/narkinsbuilders",
                "https://www.linkedin.com/company/narkins-builders-and-developers",
                "https://youtu.be/tT7kkMM0pz0"
              ],
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
              "areaServed": {
                "@type": "Place",
                "name": "Bahria Town Karachi, Pakistan"
              }
            })  
          }}
        />

        {/* Additional Meta Tags for SEO */}
        <meta data-rh="true" name="theme-color" content="#FFFFFF" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://narkinsbuilders.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}