// The services structure: one hub, three categories, each service nested under its category.
// This one file feeds the header menu, the mobile menu, the footer and (from phase 2) the service pages.
// `oldPaths` are the WordPress URLs that will 301 to the new URL at launch.

export type Service = {
  slug: string;
  name: string;
  oldPaths: string[];
};

export type Category = {
  slug: string;
  name: string;
  summary: string;
  services: Service[];
};

export const categories: Category[] = [
  {
    slug: 'primary-preventive-care',
    name: 'Primary Medical & Preventive Care',
    summary: 'Everyday and long-term care for chronic conditions.',
    services: [
      { slug: 'diabetes-and-endocrinology', name: 'Diabetes and Endocrinology', oldPaths: ['/diabetes-and-endocrinology/', '/services/diabetes-and-endocrinology/'] },
      { slug: 'geriatric-care', name: 'Geriatric Care', oldPaths: ['/geriatric-care/'] },
      { slug: 'arthritis-and-musculoskeletal-disorders', name: 'Arthritis and Musculoskeletal Disorders', oldPaths: ['/arthritis-and-musculoskeletal-disorders/'] },
      { slug: 'mental-health', name: 'Mental Health', oldPaths: ['/mental-wellness/'] },
      { slug: 'cardio-pulmonary-care', name: 'Cardio-Pulmonary Care', oldPaths: ['/cardio-pulmonary-care/'] },
      { slug: 'chronic-pain-management', name: 'Chronic Pain Management', oldPaths: ['/chronic-pain-management/'] },
      { slug: 'hypertension', name: 'Hypertension', oldPaths: ['/hypertension/', '/services/hypertension/'] },
      { slug: 'chronic-care-management', name: 'Chronic Care Management', oldPaths: ['/chronic-care-management/'] },
    ],
  },
  {
    slug: 'specialized-medical-services',
    name: 'Specialized Medical Services',
    summary: 'Focused programs, physicals and assessments.',
    services: [
      { slug: 'weight-loss-management', name: 'Weight Loss Management', oldPaths: ['/weight-loss-management/'] },
      { slug: 'personal-injury', name: 'Personal Injury', oldPaths: ['/personal-injury/'] },
      { slug: 'dot-physicals', name: 'Pre-employment and DOT Physicals', oldPaths: ['/specialized-medical-services/pre-employment-and-dot-physicals/'] },
      { slug: 'sleep-disorder-management', name: 'Sleep Disorder Management', oldPaths: ['/sleep-disorder-management/'] },
      { slug: 'surgical-clearance', name: 'Surgical Clearance and Risk Assessment', oldPaths: ['/surgical-clearance-risk-assessment-preoperative-health/'] },
      { slug: 'nutrition-wellness-counselling', name: 'Nutrition & Wellness Counselling', oldPaths: ['/nutrition-wellness-counselling/'] },
      { slug: 'hormone-replacement-therapy', name: 'Hormone Replacement Therapy', oldPaths: ['/hormone-replacement-therapy/', '/services/hormone-replacement-therapy-hrt/'] },
      { slug: 'telemedicine', name: 'Telemedicine', oldPaths: ['/telemedicine-services/'] },
    ],
  },
  {
    slug: 'diagnostic-testing',
    name: 'Diagnostic Testing Services',
    summary: 'Lab work, screenings and testing on site.',
    services: [
      { slug: 'womens-health', name: "Women's Health", oldPaths: ['/womens-health-services/'] },
      { slug: 'allergy-testing', name: 'Allergy Testing and Treatment', oldPaths: ['/allergy-testing-and-treatment/'] },
    ],
  },
];

export const servicesHubUrl = '/services/';
export const categoryUrl = (c: Category) => `/services/${c.slug}/`;
export const serviceUrl = (c: Category, s: Service) => `/services/${c.slug}/${s.slug}/`;
