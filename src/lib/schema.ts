// schema.org structured data helpers
const SITE = 'https://wellgen-health.com';

export const breadcrumbLd = (items: { label: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Home', href: '/' }, ...items].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    item: SITE + item.href,
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const medicalPageLd = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name,
  description,
  url: SITE + path,
  about: { '@type': 'MedicalSpecialty', name },
  publisher: { '@type': 'MedicalOrganization', name: 'WellGen Health', url: SITE },
});

/** A clinic, as a MedicalClinic with address, map position and contact details */
export const clinicLd = (l: import('../data/site').Location) => {
  const [locality, rest] = l.city.split(', ');
  const [region, postalCode] = rest.split(' ');
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${SITE}/locations/${l.slug}/#clinic`,
    name: `WellGen Health ${l.name}`,
    url: `${SITE}/locations/${l.slug}/`,
    telephone: `+1${l.phone.replace(/\D/g, '')}`,
    faxNumber: `+1${l.fax.replace(/\D/g, '')}`,
    email: l.email,
    address: { '@type': 'PostalAddress', streetAddress: l.street, addressLocality: locality, addressRegion: region, postalCode, addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng },
    parentOrganization: { '@type': 'MedicalOrganization', name: 'WellGen Health', url: SITE },
  };
};
