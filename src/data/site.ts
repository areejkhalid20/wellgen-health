// Site-wide contact details, locations and links.
// Phase 4 moves locations into Sanity; until then they live here.

export const site = {
  name: 'WellGen Health',
  tagline: 'Comprehensive care for your health',
  phone: { label: '(844) 886-7362', href: 'tel:+18448867362' },
  smsPhone: { label: '(214) 238-3074', href: 'tel:+12142383074' },
  email: 'info@wellgen-health.com',
  address: '8220 Walnut Hill Ln, Ste 600, Dallas, TX 75231',
  bookingUrl: '/book-an-appointment/',
  // Show the "Related searches" keyword box (from src/data/seo.json) at the end of every page
  showKeywordBox: true,
  // Fill in the profile URLs; empty ones are not shown.
  social: {
    facebook: '',
    linkedin: '',
    youtube: '',
  },
};

// Which providers work at each clinic is set in src/data/providers.ts
export type Location = {
  slug: string;
  name: string;          // short name for cards and menus
  street: string;
  city: string;          // "Dallas, TX 75231"
  phone: string;         // also takes texts
  fax: string;
  email: string;
  region: 'Dallas–Fort Worth' | 'East Texas';
  lat: number;
  lng: number;
  /** Opening hours, e.g. [['Mon–Fri', '8:00 am – 5:00 pm']]. Leave empty to hide. */
  hours: [string, string][];
  /** Address of the old WordPress page, for the 301 redirect at launch */
  oldPath: string;
};

export const locations: Location[] = [
  { slug: 'thr-dallas', name: 'THR Dallas', street: '8220 Walnut Hill Ln, Ste 600', city: 'Dallas, TX 75231', phone: '(214) 238-3074', fax: '(214) 238-3608', email: 'THR@wellgen-health.com', region: 'Dallas–Fort Worth', lat: 32.882126, lng: -96.761073, hours: [], oldPath: '/locations/wellgen-health-at-thr-dallas/' },
  { slug: 'care-express', name: 'Care Express', street: '6909 Lake June Rd', city: 'Dallas, TX 75217', phone: '(214) 391-1900', fax: '(903) 596-6244', email: 'CareExpress@wellgen-health.com', region: 'Dallas–Fort Worth', lat: 32.734975, lng: -96.702561, hours: [], oldPath: '/locations/wellgen-health-at-care-express/' },
  { slug: 'mesquite', name: 'Mesquite', street: '1010 N Bryan-Belt Line Rd', city: 'Mesquite, TX 75149', phone: '(469) 445-0802', fax: '(469) 640-4944', email: 'Mesquite@wellgen-health.com', region: 'Dallas–Fort Worth', lat: 32.777372, lng: -96.597413, hours: [], oldPath: '/locations/wellgen-health-at-mesquite/' },
  { slug: 'arlington', name: 'Arlington', street: '701 Highlander Blvd, Suite 260', city: 'Arlington, TX 76015', phone: '(682) 284-0961', fax: '(682) 323-2013', email: 'Arlington@wellgen-health.com', region: 'Dallas–Fort Worth', lat: 32.683425, lng: -97.115818, hours: [], oldPath: '/locations/wellgen-health-at-arlington/' },
  { slug: 'greenville', name: 'Greenville', street: '3900 Joe Ramsey Blvd E, Bldg 7', city: 'Greenville, TX 75401', phone: '(903) 259-6074', fax: '(903) 405-4886', email: 'Greenville@wellgen-health.com', region: 'East Texas', lat: 33.12369, lng: -96.121422, hours: [], oldPath: '/locations/wellgen-health-at-greenville/' },
  { slug: 'canton', name: 'Canton', street: '400 E State Hwy 243, Ste 21', city: 'Canton, TX 75103', phone: '(903) 213-2957', fax: '(903) 470-7323', email: 'Canton@wellgen-health.com', region: 'East Texas', lat: 32.546061, lng: -95.859382, hours: [], oldPath: '/locations/wellgen-health-at-canton/' },
];

export const locationUrl = (l: Location) => `/locations/${l.slug}/`;
export const fullAddress = (l: Location) => `${l.street}, ${l.city}`;
export const directionsUrl = (l: Location) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`WellGen Health, ${fullAddress(l)}`)}`;
export const smsHref = (phone: string) => `sms:+1${phone.replace(/\D/g, '')}`;

/** Turns "(214) 238-3074" into "tel:+12142383074". One source, so shown and dialled numbers always match. */
export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, '')}`;

export const companyLinks = [
  { label: 'About Us', href: '/company/about-us/' },
  { label: 'Events', href: '/company/events/' },
  { label: 'Careers', href: '/company/careers/' },
  { label: 'Partner with us', href: '/company/partner-with-us/' },
  { label: 'Newsletter', href: '/company/newsletter/' },
  { label: 'Contact', href: '/company/contact/' },
];

export const moreLinks = [
  { label: 'Care Navigation', href: '/care-navigation/' },
  { label: 'Wellgen Charge Capture', href: '/charge-capture/' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/legal/privacy-policy/' },
  { label: 'SMS Terms & Conditions', href: '/legal/sms-terms-conditions/' },
  { label: 'Elevated Clinical Comfort', href: '/legal/elevated-clinical-comfort/' },
];
