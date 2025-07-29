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

        {/* Google Fonts - Optimized for Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
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

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Narkin's Builders" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Narkin's Builders" />
        <meta name="description" content="Premium real estate developer in Bahria Town Karachi specializing in luxury apartments and residential projects" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Additional Meta Tags for SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://narkinsbuilders.com" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Narkin's Builders Blog" href="https://narkinsbuilders.com/api/rss.xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}