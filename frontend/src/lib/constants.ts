export const siteConfig = {
  name: 'NayePankh Foundation',
  tagline: 'Empowering Communities, Transforming Lives',
  description: 'NayePankh Foundation is a non-profit organization dedicated to education, healthcare, women empowerment, and rural development across India.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  contact: {
    email: 'info@nayepankh.org',
    phone: '+91 98765 43210',
    address: '123 Hope Street, Connaught Place, New Delhi - 110001, India',
  },
  social: {
    facebook: 'https://facebook.com/nayepankh',
    twitter: 'https://twitter.com/nayepankh',
    instagram: 'https://instagram.com/nayepankh',
    linkedin: 'https://linkedin.com/company/nayepankh',
    youtube: 'https://youtube.com/nayepankh',
  },
  registration: {
    number: 'NGO-DEL-2020-1234',
    date: '15th March 2020',
    type: 'Section 8 Company',
  },
};

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
];

export const coreValues = [
  { title: 'Compassion', description: 'We lead with empathy and care for every individual we serve.', icon: 'Heart' },
  { title: 'Integrity', description: 'Transparency and honesty guide every decision we make.', icon: 'Shield' },
  { title: 'Innovation', description: 'We embrace creative solutions to address social challenges.', icon: 'Lightbulb' },
  { title: 'Collaboration', description: 'Together we achieve more than we ever could alone.', icon: 'Users' },
  { title: 'Sustainability', description: 'Building lasting change that empowers communities forever.', icon: 'Leaf' },
  { title: 'Inclusion', description: 'Every voice matters, every person deserves opportunity.', icon: 'Globe' },
];

export const volunteerBenefits = [
  { title: 'Make Real Impact', description: 'See the direct results of your efforts in communities.' },
  { title: 'Skill Development', description: 'Gain valuable experience and learn new skills.' },
  { title: 'Network & Connect', description: 'Meet like-minded individuals and build lasting relationships.' },
  { title: 'Certificates & Recognition', description: 'Earn certificates and awards for your contributions.' },
  { title: 'Flexible Schedule', description: 'Volunteer on your own time with flexible opportunities.' },
  { title: 'Personal Growth', description: 'Develop leadership, empathy, and cultural awareness.' },
];

export const volunteerFAQ = [
  { q: 'Who can become a volunteer?', a: 'Anyone above 18 years with a passion for social service can join us. Students, professionals, and retirees are all welcome.' },
  { q: 'How much time do I need to commit?', a: 'We offer flexible opportunities ranging from one-day events to ongoing programs. You choose what fits your schedule.' },
  { q: 'Is there any fee to volunteer?', a: 'No, volunteering with NayePankh is completely free. We may cover travel expenses for certain programs.' },
  { q: 'How do I get started?', a: 'Fill out the registration form, complete verification, and once approved, access your dashboard to browse opportunities.' },
  { q: 'Can I volunteer remotely?', a: 'Yes! We have virtual volunteering options including content creation, mentoring, and administrative support.' },
];
