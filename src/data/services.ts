// The services structure: one hub, three categories, each service nested under its category.
// This one file feeds the header menu, the mobile menu, the footer and (from phase 2) the service pages.
// `oldPaths` are the WordPress URLs that will 301 to the new URL at launch.

export type Service = {
  slug: string;
  name: string;
  /** One line shown on service cards */
  summary: string;
  oldPaths: string[];
};

export type Category = {
  slug: string;
  name: string;
  summary: string;
  /** Short paragraph at the top of the category page */
  intro: string;
  oldPaths?: string[];
  services: Service[];
};

export const categories: Category[] = [
  {
    slug: 'primary-preventive-care',
    name: 'Primary Medical & Preventive Care',
    summary: 'Everyday and long-term care for chronic conditions.',
    intro: 'Primary and preventive care that looks after your whole health: regular checkups, screenings, and long-term care for conditions like diabetes, high blood pressure and arthritis. One team keeps track of everything, so nothing falls through the cracks.',
    services: [
      { slug: 'diabetes-and-endocrinology', name: 'Diabetes and Endocrinology', summary: 'Testing, treatment plans and glucose monitoring for diabetes and hormone conditions.', oldPaths: ['/diabetes-and-endocrinology/', '/services/diabetes-and-endocrinology/'] },
      { slug: 'geriatric-care', name: 'Geriatric Care', summary: 'Care built around the health, safety and independence of older adults.', oldPaths: ['/geriatric-care/'] },
      { slug: 'arthritis-and-musculoskeletal-disorders', name: 'Arthritis and Musculoskeletal Disorders', summary: 'Diagnosis and treatment for joint pain, stiffness and arthritis.', oldPaths: ['/arthritis-and-musculoskeletal-disorders/'] },
      { slug: 'mental-health', name: 'Mental Health', summary: 'Support for anxiety, depression and mood alongside your physical care.', oldPaths: ['/mental-wellness/'] },
      { slug: 'cardio-pulmonary-care', name: 'Cardio-Pulmonary Care', summary: 'Checks and ongoing care for heart and lung conditions.', oldPaths: ['/cardio-pulmonary-care/'] },
      { slug: 'chronic-pain-management', name: 'Chronic Pain Management', summary: 'Plans to reduce long-term pain and help you stay active.', oldPaths: ['/chronic-pain-management/'] },
      { slug: 'hypertension', name: 'Hypertension', summary: 'Blood pressure checks, treatment and regular follow-up.', oldPaths: ['/hypertension/', '/services/hypertension/'] },
      { slug: 'chronic-care-management', name: 'Chronic Care Management', summary: 'Ongoing coordination between visits for people with two or more long-term conditions.', oldPaths: ['/chronic-care-management/'] },
    ],
  },
  {
    slug: 'specialized-medical-services',
    name: 'Specialized Medical Services',
    summary: 'Focused programs, physicals and assessments.',
    intro: 'Programs for specific goals and needs, from weight loss and sleep problems to work physicals and getting cleared for surgery.',
    services: [
      { slug: 'weight-loss-management', name: 'Weight Loss Management', summary: 'Medically supervised weight loss with a plan made for you.', oldPaths: ['/weight-loss-management/'] },
      { slug: 'personal-injury', name: 'Personal Injury', summary: 'Evaluation and treatment after an accident or injury.', oldPaths: ['/personal-injury/'] },
      { slug: 'dot-physicals', name: 'Pre-employment and DOT Physicals', summary: 'Pre-employment and DOT physical exams.', oldPaths: ['/specialized-medical-services/pre-employment-and-dot-physicals/'] },
      { slug: 'sleep-disorder-management', name: 'Sleep Disorder Management', summary: 'Help with insomnia, sleep apnea and poor sleep.', oldPaths: ['/sleep-disorder-management/'] },
      { slug: 'surgical-clearance', name: 'Surgical Clearance and Risk Assessment', summary: 'Health checks and risk assessment before your surgery.', oldPaths: ['/surgical-clearance-risk-assessment-preoperative-health/'] },
      { slug: 'nutrition-wellness-counselling', name: 'Nutrition & Wellness Counselling', summary: 'Eating plans and guidance that fit your health goals.', oldPaths: ['/nutrition-wellness-counselling/'] },
      { slug: 'hormone-replacement-therapy', name: 'Hormone Replacement Therapy', summary: 'Hormone testing and therapy for symptoms of imbalance.', oldPaths: ['/hormone-replacement-therapy/', '/services/hormone-replacement-therapy-hrt/'] },
      { slug: 'telemedicine', name: 'Telemedicine', summary: 'Video visits with your provider from home.', oldPaths: ['/telemedicine-services/'] },
    ],
  },
  {
    slug: 'diagnostic-testing',
    name: 'Diagnostic Testing Services',
    summary: 'Lab work, screenings and testing on site.',
    intro: 'Testing and screenings that help your provider find the cause of symptoms and catch problems early.',
    oldPaths: ['/diagnostic-testing-services/'],
    services: [
      { slug: 'womens-health', name: "Women's Health", summary: 'Screenings and care through every stage of life.', oldPaths: ['/womens-health-services/'] },
      { slug: 'allergy-testing', name: 'Allergy Testing and Treatment', summary: 'Find out what triggers your allergies and how to treat them.', oldPaths: ['/allergy-testing-and-treatment/'] },
    ],
  },
];

export const servicesHubUrl = '/services/';
export const categoryUrl = (c: Category) => `/services/${c.slug}/`;
export const serviceUrl = (c: Category, s: Service) => `/services/${c.slug}/${s.slug}/`;
