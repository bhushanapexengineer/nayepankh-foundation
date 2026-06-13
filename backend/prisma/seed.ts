import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  VOLUNTEER: 'VOLUNTEER',
  VISITOR: 'VISITOR',
} as const;

const ProjectCategory = {
  EDUCATION: 'EDUCATION',
  ENVIRONMENT: 'ENVIRONMENT',
  WOMEN_EMPOWERMENT: 'WOMEN_EMPOWERMENT',
  RURAL_DEVELOPMENT: 'RURAL_DEVELOPMENT',
  HEALTH: 'HEALTH',
  SKILL_DEVELOPMENT: 'SKILL_DEVELOPMENT',
} as const;

const ProjectStatus = {
  PLANNING: 'PLANNING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ON_HOLD: 'ON_HOLD',
} as const;

const EventStatus = {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const hashedPassword = await bcrypt.hash('Admin@123', 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@nayepankh.org' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@nayepankh.org',
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      isVerified: true,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'manager@nayepankh.org' },
    update: {},
    create: {
      name: 'Admin Manager',
      email: 'manager@nayepankh.org',
      password: hashedPassword,
      role: Role.ADMIN,
      isVerified: true,
    },
  });

  const projects = [
    {
      title: 'Rural Education Initiative',
      slug: 'rural-education-initiative',
      description: 'Providing quality education to children in remote villages through mobile learning centers and digital classrooms.',
      shortDesc: 'Bringing education to rural children',
      category: ProjectCategory.EDUCATION,
      status: ProjectStatus.ACTIVE,
      featured: true,
      location: 'Rajasthan, India',
      impactMetrics: { students: 2500, schools: 15, teachers: 45 },
      images: ['https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800'],
    },
    {
      title: 'Green Earth Campaign',
      slug: 'green-earth-campaign',
      description: 'Planting trees and promoting sustainable practices in urban and rural communities.',
      shortDesc: 'Environmental conservation drive',
      category: ProjectCategory.ENVIRONMENT,
      status: ProjectStatus.ACTIVE,
      featured: true,
      location: 'Pan India',
      impactMetrics: { treesPlanted: 50000, communities: 30 },
      images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'],
    },
    {
      title: 'Women Skill Development',
      slug: 'women-skill-development',
      description: 'Empowering women through vocational training in tailoring, handicrafts, and digital skills.',
      shortDesc: 'Empowering women through skills',
      category: ProjectCategory.WOMEN_EMPOWERMENT,
      status: ProjectStatus.ACTIVE,
      featured: true,
      location: 'Uttar Pradesh, India',
      impactMetrics: { womenTrained: 1200, businesses: 85 },
      images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800'],
    },
    {
      title: 'Village Health Camps',
      slug: 'village-health-camps',
      description: 'Free health checkups and medical camps in underserved rural areas.',
      shortDesc: 'Healthcare for rural communities',
      category: ProjectCategory.HEALTH,
      status: ProjectStatus.COMPLETED,
      location: 'Bihar, India',
      impactMetrics: { patients: 8000, camps: 25 },
      images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'],
    },
    {
      title: 'Digital Literacy Program',
      slug: 'digital-literacy-program',
      description: 'Teaching computer skills and internet literacy to youth in rural areas.',
      shortDesc: 'Digital skills for youth',
      category: ProjectCategory.SKILL_DEVELOPMENT,
      status: ProjectStatus.ACTIVE,
      location: 'Madhya Pradesh, India',
      impactMetrics: { youthTrained: 3000, centers: 10 },
      images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'],
    },
    {
      title: 'Clean Water Project',
      slug: 'clean-water-project',
      description: 'Installing water purification systems and bore wells in water-scarce villages.',
      shortDesc: 'Clean water for villages',
      category: ProjectCategory.RURAL_DEVELOPMENT,
      status: ProjectStatus.ACTIVE,
      location: 'Odisha, India',
      impactMetrics: { villages: 20, people: 15000 },
      images: ['https://images.unsplash.com/photo-1548839140-5a7f32a9be4a?w=800'],
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  const events = [
    {
      title: 'Annual Volunteer Meet 2026',
      slug: 'annual-volunteer-meet-2026',
      description: 'Join us for our annual volunteer gathering with workshops, networking, and celebration.',
      date: new Date('2026-07-15'),
      location: 'New Delhi Convention Center',
      status: EventStatus.UPCOMING,
      featured: true,
      maxAttendees: 500,
      images: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'],
    },
    {
      title: 'Tree Plantation Drive',
      slug: 'tree-plantation-drive-2026',
      description: 'Plant 1000 trees in one day! Join our mega plantation drive.',
      date: new Date('2026-08-05'),
      location: 'Lodhi Gardens, Delhi',
      status: EventStatus.UPCOMING,
      featured: true,
      maxAttendees: 200,
      images: ['https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800'],
    },
    {
      title: 'Health Camp - Village Outreach',
      slug: 'health-camp-village-outreach',
      description: 'Free health checkups, medicines, and awareness sessions for rural communities.',
      date: new Date('2026-04-20'),
      location: 'Village Rampur, Rajasthan',
      status: EventStatus.COMPLETED,
      images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'],
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event,
    });
  }

  const testimonials = [
    { name: 'Priya Sharma', role: 'Volunteer', content: 'NayePankh changed my perspective on giving back. The team is incredibly supportive and the impact is real.', rating: 5, featured: true },
    { name: 'Rajesh Kumar', role: 'Beneficiary', content: 'Thanks to their education program, my daughter is now the first in our family to attend college.', rating: 5, featured: true },
    { name: 'Dr. Ananya Patel', role: 'Partner Doctor', content: 'Partnering with NayePankh for health camps has been rewarding. They reach communities that need help the most.', rating: 5, featured: true },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  const team = [
    { name: 'Dr. Rajesh Mehta', role: 'Founder & Chairman', bio: 'Visionary leader with 20+ years in social work', isBoard: true, order: 1 },
    { name: 'Sunita Devi', role: 'Executive Director', bio: 'Passionate about education and women empowerment', isBoard: true, order: 2 },
    { name: 'Amit Singh', role: 'Program Manager', bio: 'Expert in rural development programs', isBoard: false, order: 3 },
    { name: 'Kavita Rao', role: 'Communications Head', bio: 'Building bridges between communities and donors', isBoard: false, order: 4 },
  ];

  for (const member of team) {
    await prisma.teamMember.create({ data: member });
  }

  await prisma.donationCampaign.create({
    data: {
      title: 'Education for Every Child',
      description: 'Help us provide books, uniforms, and digital learning tools to 1000 children.',
      goal: 500000,
      raised: 325000,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
      isActive: true,
    },
  });

  await prisma.newsArticle.create({
    data: {
      title: 'NayePankh Reaches 5000 Volunteers Milestone',
      slug: '5000-volunteers-milestone',
      excerpt: 'A celebration of our growing volunteer community making real change.',
      content: 'We are thrilled to announce that NayePankh Foundation has reached 5000 registered volunteers across India...',
      featured: true,
      author: 'Admin',
    },
  });

  console.log('✅ Seed completed!');
  console.log(`   Super Admin: admin@nayepankh.org / Admin@123`);
  console.log(`   Admin: manager@nayepankh.org / Admin@123`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
