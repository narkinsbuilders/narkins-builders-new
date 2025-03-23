import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta data-rh="true" name="theme-color" content="#FFFFFF" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16584105712"></script>
      <script>
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());  gtag('config', 'AW-16584105712');`}
      </script>

      <script
        crossOrigin="anonymous"
        src="//unpkg.com/react-scan/dist/auto.global.js"
      />
      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> */}
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      /> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
