/**
 * JSON-LD Structured Data for MercyLife Church Dominion Temple
 * Includes: Church, Organization, WebSite, BreadcrumbList
 *
 * @see https://schema.org/Church
 * @see https://schema.org/Organization
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

const SITE_URL = "https://mlcdallas.net";

const churchSchema = {
  "@context": "https://schema.org",
  "@type": ["Church", "PlaceOfWorship", "LocalBusiness"],
  "@id": `${SITE_URL}/#church`,
  name: "MercyLife Church Dominion Temple",
  alternateName: "MercyLife Church",
  description:
    "MercyLife Church Dominion Temple is a welcoming Christian church in Dallas, Texas offering powerful Friday night and Sunday morning worship services. Experience God's presence and join a vibrant faith community in the DFW metroplex.",
  url: SITE_URL,
  telephone: "+1-817-677-1407",
  email: undefined,
  priceRange: "Free",
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "3100 Pleasant Valley Ln",
    addressLocality: "Arlington",
    addressRegion: "TX",
    postalCode: "76015",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.6937,
    longitude: -97.1199,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "19:30",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "12:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/mercylife_dallas",
    "https://www.youtube.com/@brianamoatengtv",
  ],
  hasMap:
    "https://www.google.com/maps?q=MercyLife+Church+Dominion+Temple+3100+Pleasant+Valley+Ln,+Arlington,+TX+76015",
  isAccessibleForFree: true,
  publicAccess: true,
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 32.7767,
      longitude: -96.7970,
    },
    geoRadius: "50000",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "MercyLife Church Dominion Temple",
  alternateName: "MercyLife Church",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.jpg`,
  telephone: "+1-817-677-1407",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3100 Pleasant Valley Ln",
    addressLocality: "Arlington",
    addressRegion: "TX",
    postalCode: "76015",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-817-677-1407",
    contactType: "customer service",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.7767,
        longitude: -96.7970,
      },
      geoRadius: "50000",
    },
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.instagram.com/mercylife_dallas",
    "https://www.youtube.com/@brianamoatengtv",
    "https://mlcdallas.org",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "MercyLife Church Dominion Temple",
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-US",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

/**
 * Returns all JSON-LD schemas as a single serialized string
 * for injection into a <script type="application/ld+json"> tag.
 */
export function getStructuredData(): string {
  const schemas = [churchSchema, organizationSchema, websiteSchema, breadcrumbSchema];
  return JSON.stringify(schemas);
}

/**
 * Returns individual schemas for fine-grained injection if needed.
 */
export const schemas = {
  church: churchSchema,
  organization: organizationSchema,
  website: websiteSchema,
  breadcrumb: breadcrumbSchema,
} as const;
