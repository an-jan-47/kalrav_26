import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Kalrav'26 - Tamaḥkṣayaḥ",
    "startDate": "2026-03-20T10:00:00+05:30", // Placeholder date, user should update
    "endDate": "2026-03-22T22:00:00+05:30",   // Placeholder date
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Deen Dayal Upadhyaya College",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Azad Hind Fauj Marg, Dwarka Sector-3",
        "addressLocality": "New Delhi",
        "postalCode": "110078",
        "addressCountry": "IN"
      }
    },
    "image": [
      "https://kalravdduc.in/og-image.jpg"
    ],
    "description": "Kalrav '26 is the annual cultural festival of Deen Dayal Upadhyaya College, University of Delhi. Theme: Tamaḥkṣayaḥ - The End of Darkness.",
    "organizer": {
      "@type": "Organization",
      "name": "Kalrav DDUC Team",
      "url": "https://kalravdduc.in"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
