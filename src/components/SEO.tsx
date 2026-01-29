import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = "Kalrav '26 - Tamaḥkṣayaḥ", 
  description = "Kalrav '26: The Annual Cultural Fest of Deen Dayal Upadhyaya College. Join us for an electrifying celebration of music, dance, and art. Experience the Tamaḥkṣayaḥ!",
  keywords = "Kalrav, Kalrav 26, DDUC, Delhi University, Cultural Fest, College Fest,Tamaḥkṣayaḥ, Music, Dance",
  image = "/og-image.jpg", // Ensure this exists or use a default
  url = "https://kalrav-26.vercel.app/"
}: SEOProps) => {
    const siteTitle = title === "Kalrav '26 - Tamaḥkṣayaḥ" ? title : `${title} | Kalrav '26`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;