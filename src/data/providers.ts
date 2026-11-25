// WellGen Health providers. One line per person: change a clinic, title or order here.
// Their biographies live in src/content/providers/<slug>.md
// Headshots: src/assets/images/providers/<slug>.png (or .jpg)

export type Role = 'Physician' | 'Nurse practitioner' | 'Physician assistant';

export type Provider = {
  slug: string;
  name: string;         // as shown, without credentials
  credentials: string;  // "MD", "MSN, APRN, FNP-C"
  role: Role;
  specialty: string;    // one line under the name
  location: string;     // clinic slug from src/data/site.ts, or '' if not at one of our clinics
  hasProfile: boolean;  // false: card only, no profile page yet
};

export const providers: Provider[] = [
  { slug: 'dr-jamal-lone-md', name: 'Dr. Jamal Lone', credentials: 'MD', role: 'Physician', specialty: 'Internal Medicine', location: 'thr-dallas', hasProfile: true },
  { slug: 'imran-a-memon-md', name: 'Dr. Imran A. Memon', credentials: 'MD', role: 'Physician', specialty: 'Board-Certified Nephrologist & Internist', location: 'thr-dallas', hasProfile: true },
  { slug: 'dr-mohammad-humayun-kabir-md', name: 'Dr. Mohammad Humayun Kabir', credentials: 'MD', role: 'Physician', specialty: 'Board-Certified Nephrologist & Internal Medicine Specialist', location: 'thr-dallas', hasProfile: true },
  { slug: 'dr-shamail-mahmood-md', name: 'Dr. Shamail Mahmood', credentials: 'MD', role: 'Physician', specialty: 'Board-Certified Internal Medicine Specialist', location: 'thr-dallas', hasProfile: true },
  { slug: 'lilian-mabiru-np', name: 'Lilian Mabiru', credentials: 'NP', role: 'Nurse practitioner', specialty: 'Advanced Practice Registered Nurse & Family Medicine', location: 'mesquite', hasProfile: true },
  { slug: 'calandra-wheeler-msn-aprn-agnp-c', name: 'Calandra Wheeler', credentials: 'MSN, APRN, AGNP-C', role: 'Nurse practitioner', specialty: 'Adult-Gerontology Primary Care', location: 'mesquite', hasProfile: true },
  { slug: 'lauren-finney-np', name: 'Lauren Finney', credentials: 'NP', role: 'Nurse practitioner', specialty: 'Family Medicine, with oncology experience', location: 'greenville', hasProfile: true },
  { slug: 'arianna-pacheco-msn-aprn-fnp-c', name: 'Arianna Pacheco', credentials: 'MSN, APRN, FNP-C', role: 'Nurse practitioner', specialty: 'Family Practice, with emergency experience', location: 'greenville', hasProfile: true },
  { slug: 'erica-denyse-duncan-aprn-agacnp-bc', name: 'Erica Denyse Duncan', credentials: 'APRN, AGACNP-BC', role: 'Nurse practitioner', specialty: 'Acute Care Nurse Practitioner', location: 'arlington', hasProfile: true },
  { slug: 'funmi-oyetola-msn-aprn-fnp-c', name: 'Funmi Oyetola', credentials: 'MSN, APRN, FNP-C', role: 'Nurse practitioner', specialty: 'Family Medicine, with internal medicine experience', location: 'arlington', hasProfile: true },
  { slug: 'juan-narvaez-gonzalez-aprn', name: 'Juan Narvaez Gonzalez', credentials: 'APRN', role: 'Nurse practitioner', specialty: 'Family Medicine', location: 'care-express', hasProfile: true },
  { slug: 'carrie-sue-pedersen-msn-fnp-c', name: 'Carrie Sue Pedersen', credentials: 'MSN, FNP-C', role: 'Nurse practitioner', specialty: 'Family Medicine, with emergency experience', location: 'canton', hasProfile: true },
  { slug: 'abigail-a-buliga-pa-c', name: 'Abigail A. Buliga', credentials: 'PA-C', role: 'Physician assistant', specialty: 'Multi-Specialty Primary Care', location: 'thr-dallas', hasProfile: true },
  { slug: 'elizabeth-golden-pa-c', name: 'Elizabeth Golden', credentials: 'PA-C', role: 'Physician assistant', specialty: 'Integrated Care', location: 'thr-dallas', hasProfile: true },
  { slug: 'lizzie-wert-agacnp-bc', name: 'Lizzie Wert', credentials: 'AGACNP-BC', role: 'Nurse practitioner', specialty: 'Adult-Gerontology Acute Care', location: 'thr-dallas', hasProfile: true },
  { slug: 'kendra-knatt-aprn-fnp-c', name: 'Kendra Knatt', credentials: 'APRN, FNP-C', role: 'Nurse practitioner', specialty: 'Family Medicine & Holistic Wellness', location: 'thr-dallas', hasProfile: true },
  { slug: 'keshia-sanders-fnp-c', name: 'Keshia Sanders', credentials: 'FNP-C', role: 'Nurse practitioner', specialty: 'Board-Certified Family Nurse Practitioner', location: 'thr-dallas', hasProfile: true },
  { slug: 'metasebiya-dewele-fnp-bc', name: 'Metasebiya Dewele', credentials: 'FNP-BC', role: 'Nurse practitioner', specialty: 'Board-Certified Family Nurse Practitioner', location: 'thr-dallas', hasProfile: true },
  { slug: 'rekha-venkataiah-fnp-bc', name: 'Rekha Venkataiah', credentials: 'FNP-BC', role: 'Nurse practitioner', specialty: 'Family Nurse Practitioner & Primary Care', location: 'thr-dallas', hasProfile: true },
  // WordPress lists her at 1143 S Buckner Blvd #133, Dallas, which is not one of the six clinics, and has no profile page
  { slug: 'veronica-daniels-np', name: 'Veronica Daniels', credentials: 'NP', role: 'Nurse practitioner', specialty: 'Family Nurse Practitioner', location: '', hasProfile: false },
];

export const providerBySlug = (slug: string) => providers.find((p) => p.slug === slug);
export const providersAt = (locationSlug: string) => providers.filter((p) => p.location === locationSlug);
export const providerUrl = (p: Provider) => `/providers/${p.slug}/`;
export const roles: Role[] = ['Physician', 'Nurse practitioner', 'Physician assistant'];
