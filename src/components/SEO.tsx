import Head from "next/head";
import { Fragment } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEOElements({
  title = "Apex | The Intelligent Fishing Co-Pilot",
  description = "Transform raw fishing data into angler wisdom. Precision forecasting, AI-powered catch logging, and tactical intelligence for serious anglers.",
  image = "/og-image.png",
  url = "https://apex.fishing",
}: SEOProps) {
  return (
    <Fragment>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="theme-color" content="#002B1B" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <link rel="icon" href="/favicon.ico" />
    </Fragment>
  );
}

export function SEO({
  title = "Apex | The Intelligent Fishing Co-Pilot",
  description = "Transform raw fishing data into angler wisdom. Precision forecasting, AI-powered catch logging, and tactical intelligence for serious anglers.",
  image = "/og-image.png",
  url = "https://apex.fishing",
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="theme-color" content="#002B1B" />
    </Head>
  );
}