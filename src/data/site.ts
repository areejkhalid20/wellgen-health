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
  // Fill in the profile URLs; empty ones are not shown.
  social: {
    facebook: '',
    linkedin: '',
    youtube: '',
  },
};

export type Location = {
  slug: string;
  name: string;
  street: string;
  city: string;
  phone: string;
};

export const locations: Location[] = [
  { slug: 'thr-dallas', name: 'THR Dallas', street: '8220 Walnut Hill Ln, Ste 600', city: 'Dallas, TX 75231', phone: '(214) 238-3074' },
  { slug: 'care-express', name: 'Care Express', street: '6909 Lake June Rd', city: 'Dallas, TX 75217', phone: '(214) 391-1900' },
  { slug: 'mesquite', name: 'Mesquite', street: '1010 N Bryan-Belt Line Rd', city: 'Mesquite, TX 75149', phone: '(469) 445-0802' },
  { slug: 'arlington', name: 'Arlington', street: '701 Highlander Blvd, Suite 260', city: 'Arlington, TX 76015', phone: '(682) 284-0961' },
  { slug: 'greenville', name: 'Greenville', street: '3900 Joe Ramsey Blvd E, Bldg 7', city: 'Greenville, TX 75401', phone: '(903) 259-6074' },
  { slug: 'canton', name: 'Canton', street: '400 E State Hwy 243, Ste 21', city: 'Canton, TX 75103', phone: '(903) 213-2957' },
];

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
