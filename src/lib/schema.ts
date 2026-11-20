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
