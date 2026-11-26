// Company events, newest first. Photos: src/assets/images/events/<slug>/1.jpg, 2.jpg, …
// To add an event: copy one block, give it a new slug, and put its photos in a folder with that name.

export type CompanyEvent = { slug: string; title: string; date: string; host?: string; body: string[] };

export const events: CompanyEvent[] = [
  {
    slug: 'greenville-clinic-opening',
    title: 'WellGen Health opens in Greenville, Texas',
    date: '2024-11-19',
    body: [
      'We’re thrilled to announce the opening of WellGen Health Clinics in Greenville, Texas! Our newly renovated facility underscores our commitment to bringing state-of-the-art healthcare services to this vibrant city and its surrounding suburbs.',
      'At WellGen Health Clinics, we are dedicated to delivering comprehensive primary care and specialty services focused on improving the health and well-being of every patient we serve. We believe in empowering our patients through education and support to ensure the best care possible.',
      'Beyond healthcare, we are deeply committed to contributing to Greenville’s growth. By creating local jobs and building partnerships with area organizations, we aim to strengthen the fabric of this community while fostering opportunities for economic expansion. It is truly an honor and a privilege to serve the people of Greenville.',
    ],
  },
  {
    slug: 'halloween-luncheon-2024',
    title: 'Annual Halloween Luncheon for our Perioperative Medicine Team',
    date: '2024-10-31',
    body: [
      'What a spooktacular day! Our employees, staff and practitioners gathered for a Halloween Luncheon filled with costumes, laughter and prizes for the best-dressed!',
      'Our crew brought their A-game with a variety of creative costumes, including a “monster-ous” nurse who won 1st place!',
    ],
  },
  {
    slug: 'presbyterian-village-north-clinic',
    title: 'New clinic at Presbyterian Village North',
    date: '2024-09-16',
    body: [
      'We’re thrilled to announce the opening of a new clinic by Dr. Lone and WellGen Health dedicated to serving the residents of Presbyterian Village North (PVN) in Dallas!',
      'PVN is renowned as a stunning community that provides a serene and comfortable environment, offering exceptional care options including residential and assisted living, skilled nursing, inpatient and outpatient rehab, hospice, and certified Alzheimer’s care. This community is known for its warm and welcoming atmosphere, which embraces the promise of each new day.',
      'With this convenient new clinic location, we are proud to deliver personalized healthcare services specifically tailored to meet the unique needs of all PVN residents. We are excited and honored to be a part of the wonderful community at Presbyterian Village North!',
    ],
  },
  {
    slug: 'each-moment-matters-luncheon',
    title: 'Each Moment Matters Luncheon',
    host: 'Hosted by Forefront Living Foundation',
    date: '2024-09-13',
    body: [
      'Dr. and Mrs. Lone had the pleasure of attending the Each Moment Matters Luncheon as guests of Presbyterian Village North.',
      'In its 15th year, the Each Moment Matters Luncheon marks a significant milestone in providing dignified and compassionate end-of-life care. With over $3 million raised since its inception, the luncheon’s proceeds have helped Faith Presbyterian Hospice serve over 3,000 individuals across a 50-mile radius and 13 counties from the T. Boone Pickens Hospice Center. Every contribution plays a crucial role in ensuring that each moment matters for those facing end-of-life challenges.',
      'Dr. Lone is pictured with Douglas Hawthorne, Founder & CEO of Texas Health Resources, and Joni Watson, Director of Business Development for Forefront Living.',
    ],
  },
  {
    slug: 'taste-of-triumph-gala',
    title: 'Taste of Triumph Gala',
    host: 'Hosted by Adaptive Training Foundation',
    date: '2024-04-24',
    body: [
      'Dr. and Mrs. Lone recently had the honor of being guests at the Taste of Triumph Gala, a beautiful event held at the Dallas Arboretum. The gala’s highlight was the presence of retired NFL linebacker and Adaptive Training Foundation (ATF) founder David Vobora, along with his wife and partner, Sarah.',
      'The core mission of the ATF is to provide access and inclusion to individuals living with physical and traumatic impairments by empowering them through exercise and community, referring to these participants as “Athletes.” To enhance this mission, the ATF has launched the Campus Legacy Project, which aims to build and own an exclusively designed 30,000 sq ft performance facility.',
      'This state-of-the-art center will include on-site housing and a training facility intended to foster better cohesion among the Athletes and staff, maximizing the overall program impact. The space is designed to use cutting-edge technology in a multi-sensory landscape to optimize the transformational experience that helps Athletes redefine their injuries and their lives.',
    ],
  },
];

export const eventDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
