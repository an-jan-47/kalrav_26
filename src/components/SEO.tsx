import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = "Kalrav '26", 
  description = "Kalrav '26: The Annual Cultural Fest of Deen Dayal Upadhyaya College (DDUC). Experience the Tamaḥkṣayaḥ - The End of Darkness. Join us for music, dance, and creativity.",
  keywords = "Kalrav,kalrav dduc,kalrav website, Kalrav '26, Kalrav 26, DDUC Fest, Deen Dayal Upadhyaya College, Delhi University Fest, Cultural Fest, Tamaḥkṣayaḥ, College Fest Delhi",
  image = "https://kalravdduc.in/og-image.jpg", // Absolute URL is better for OG
  url = "https://kalravdduc.in"
}: SEOProps) => {
    const siteTitle = title === "Kalrav '26" ? "Kalrav '26 - Tamaḥkṣayaḥ" : `${title} | Kalrav '26`;
    const fullUrl = url.startsWith('http') ? url : `https://kalravdduc.in${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kalrav '26" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;