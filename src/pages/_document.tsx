import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Mahmoud Plumbing | 24/7 Emergency Plumber Mississauga | (437) 218-6580</title>
        <meta name="description" content="5-star rated emergency plumber in Mississauga. Licensed & insured. Faucet, toilet, pipe, water heater, leak detection & more. Same-day service. Call (437) 218-6580." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mahmoud Plumbing | 24/7 Emergency Plumber Mississauga" />
        <meta property="og:description" content="5-star rated emergency plumber in Mississauga. Licensed & insured. Same-day service. Call (437) 218-6580." />
        <meta property="og:site_name" content="Mahmoud Plumbing" />
        <meta property="og:locale" content="en_CA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mahmoud Plumbing | 24/7 Emergency Plumber Mississauga" />
        <meta name="twitter:description" content="5-star rated emergency plumber in Mississauga. Licensed & insured. Same-day service. Call (437) 218-6580." />
        <meta name="theme-color" content="#e8602c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Mississauga" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          CRITICAL: DO NOT REMOVE THIS SCRIPT
          The Softgen AI monitoring script is essential for core app functionality.
        */}
        <script
          src="https://cdn.softgen.ai/script.js"
          async
          data-softgen-monitoring="true"
        />
      </Head>
      <body style={{ backgroundColor: '#0a1628', color: '#f9f6f0', overflowX: 'hidden' }}>
        <Main />
        <NextScript />
        {process.env.NODE_ENV === "development" && (
          <script
            src="https://cdn.softgen.dev/visual-editor.min.js"
            async
            data-softgen-visual-editor="true"
          />
        )}
      </body>
    </Html>
  );
}
