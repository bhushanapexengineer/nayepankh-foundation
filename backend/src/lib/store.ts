import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'VOLUNTEER' | 'VISITOR';
export type VolunteerStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
  otp?: string | null;
  otpExpiry?: string | null;
  resetToken?: string | null;
  resetExpiry?: string | null;
  createdAt: string;
}

export interface Volunteer {
  id: string;
  userId: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  education: string;
  occupation?: string;
  skills: string[];
  interests: string[];
  experience?: string;
  availability: string;
  emergencyContact: string;
  emergencyPhone: string;
  profilePhoto?: string;
  status: VolunteerStatus;
  totalHours: number;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string;
  category: string;
  status: string;
  impactMetrics?: Record<string, number>;
  images: string[];
  featured: boolean;
  location?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  maxAttendees?: number;
  status: string;
  images: string[];
  featured: boolean;
  createdAt: string;
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  currency: string;
  type: string;
  status: string;
  campaignId?: string;
  transactionId?: string;
  message?: string;
  isAnonymous: boolean;
  userId?: string;
  createdAt: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  image?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  photo?: string;
  rating: number;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  isBoard: boolean;
  order: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: string;
  featured: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  hours?: number;
  volunteerId: string;
  createdAt: string;
}

export interface Certificate {
  id: string;
  volunteerId: string;
  title: string;
  description?: string;
  url?: string;
  issuedAt: string;
}

export interface Database {
  users: User[];
  volunteers: Volunteer[];
  projects: Project[];
  events: Event[];
  donations: Donation[];
  campaigns: DonationCampaign[];
  testimonials: Testimonial[];
  team: TeamMember[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  tasks: Task[];
  certificates: Certificate[];
  eventRegistrations: { id: string; eventId: string; volunteerId: string; registeredAt: string }[];
  newsletters: { id: string; email: string; createdAt: string }[];
}

const DATA_DIR = process.env.NODE_ENV === 'production'
  ? path.join('/tmp', 'nayepankh-data')
  : path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

async function hash(pw: string) {
  return bcrypt.hash(pw, 12);
}

async function createSeed(): Promise<Database> {
  const adminPass = await hash('Admin@123');
  const now = new Date().toISOString();

  return {
    users: [
      { id: uuidv4(), name: 'Super Admin', email: 'admin@nayepankh.org', password: adminPass, role: 'SUPER_ADMIN', isVerified: true, createdAt: now },
      { id: uuidv4(), name: 'Admin Manager', email: 'manager@nayepankh.org', password: adminPass, role: 'ADMIN', isVerified: true, createdAt: now },
    ],
    volunteers: [],
    projects: [
      { id: uuidv4(), title: 'Rural Education Initiative', slug: 'rural-education-initiative', description: 'Providing quality education to children in remote villages through mobile learning centers and digital classrooms.', shortDesc: 'Bringing education to rural children', category: 'EDUCATION', status: 'ACTIVE', featured: true, location: 'Rajasthan, India', impactMetrics: { students: 2500, schools: 15, teachers: 45 }, images: ['https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800'], createdAt: now },
      { id: uuidv4(), title: 'Green Earth Campaign', slug: 'green-earth-campaign', description: 'Planting trees and promoting sustainable practices in urban and rural communities.', shortDesc: 'Environmental conservation drive', category: 'ENVIRONMENT', status: 'ACTIVE', featured: true, location: 'Pan India', impactMetrics: { treesPlanted: 50000, communities: 30 }, images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'], createdAt: now },
      { id: uuidv4(), title: 'Women Skill Development', slug: 'women-skill-development', description: 'Empowering women through vocational training in tailoring, handicrafts, and digital skills.', shortDesc: 'Empowering women through skills', category: 'WOMEN_EMPOWERMENT', status: 'ACTIVE', featured: true, location: 'Uttar Pradesh, India', impactMetrics: { womenTrained: 1200, businesses: 85 }, images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800'], createdAt: now },
      { id: uuidv4(), title: 'Village Health Camps', slug: 'village-health-camps', description: 'Free health checkups and medical camps in underserved rural areas.', shortDesc: 'Healthcare for rural communities', category: 'HEALTH', status: 'COMPLETED', location: 'Bihar, India', impactMetrics: { patients: 8000, camps: 25 }, images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'], featured: false, createdAt: now },
      { id: uuidv4(), title: 'Digital Literacy Program', slug: 'digital-literacy-program', description: 'Teaching computer skills and internet literacy to youth in rural areas.', shortDesc: 'Digital skills for youth', category: 'SKILL_DEVELOPMENT', status: 'ACTIVE', location: 'Madhya Pradesh, India', impactMetrics: { youthTrained: 3000, centers: 10 }, images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'], featured: false, createdAt: now },
      { id: uuidv4(), title: 'Clean Water Project', slug: 'clean-water-project', description: 'Installing water purification systems and bore wells in water-scarce villages.', shortDesc: 'Clean water for villages', category: 'RURAL_DEVELOPMENT', status: 'ACTIVE', location: 'Odisha, India', impactMetrics: { villages: 20, people: 15000 }, images: ['https://images.unsplash.com/photo-1548839140-5a7f32a9be4a?w=800'], featured: false, createdAt: now },
    ],
    events: [
      { id: uuidv4(), title: 'Annual Volunteer Meet 2026', slug: 'annual-volunteer-meet-2026', description: 'Join us for our annual volunteer gathering with workshops, networking, and celebration.', date: '2026-07-15T09:00:00.000Z', location: 'New Delhi Convention Center', status: 'UPCOMING', featured: true, maxAttendees: 500, images: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'], createdAt: now },
      { id: uuidv4(), title: 'Tree Plantation Drive', slug: 'tree-plantation-drive-2026', description: 'Plant 1000 trees in one day! Join our mega plantation drive.', date: '2026-08-05T07:00:00.000Z', location: 'Lodhi Gardens, Delhi', status: 'UPCOMING', featured: true, maxAttendees: 200, images: ['https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800'], createdAt: now },
      { id: uuidv4(), title: 'Health Camp - Village Outreach', slug: 'health-camp-village-outreach', description: 'Free health checkups, medicines, and awareness sessions for rural communities.', date: '2026-04-20T08:00:00.000Z', location: 'Village Rampur, Rajasthan', status: 'COMPLETED', images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'], featured: false, createdAt: now },
    ],
    donations: [
      { id: uuidv4(), donorName: 'Priya Sharma', donorEmail: 'priya@email.com', amount: 10000, currency: 'INR', type: 'ONE_TIME', status: 'COMPLETED', isAnonymous: false, createdAt: now },
      { id: uuidv4(), donorName: 'Anonymous', donorEmail: 'anon@email.com', amount: 5000, currency: 'INR', type: 'ONE_TIME', status: 'COMPLETED', isAnonymous: true, createdAt: now },
    ],
    campaigns: [
      { id: uuidv4(), title: 'Education for Every Child', description: 'Help us provide books, uniforms, and digital learning tools to 1000 children.', goal: 500000, raised: 325000, startDate: '2026-01-01', endDate: '2026-12-31', isActive: true },
    ],
    testimonials: [
      { id: uuidv4(), name: 'Priya Sharma', role: 'Volunteer', content: 'NayePankh changed my perspective on giving back. The team is incredibly supportive and the impact is real.', rating: 5, featured: true },
      { id: uuidv4(), name: 'Rajesh Kumar', role: 'Beneficiary', content: 'Thanks to their education program, my daughter is now the first in our family to attend college.', rating: 5, featured: true },
      { id: uuidv4(), name: 'Dr. Ananya Patel', role: 'Partner Doctor', content: 'Partnering with NayePankh for health camps has been rewarding. They reach communities that need help the most.', rating: 5, featured: true },
    ],
    team: [
      { id: uuidv4(), name: 'Dr. Rajesh Mehta', role: 'Founder & Chairman', bio: 'Visionary leader with 20+ years in social work', isBoard: true, order: 1 },
      { id: uuidv4(), name: 'Sunita Devi', role: 'Executive Director', bio: 'Passionate about education and women empowerment', isBoard: true, order: 2 },
      { id: uuidv4(), name: 'Amit Singh', role: 'Program Manager', bio: 'Expert in rural development programs', isBoard: false, order: 3 },
      { id: uuidv4(), name: 'Kavita Rao', role: 'Communications Head', bio: 'Building bridges between communities and donors', isBoard: false, order: 4 },
    ],
    news: [
      { id: uuidv4(), title: 'NayePankh Reaches 5000 Volunteers Milestone', slug: '5000-volunteers-milestone', excerpt: 'A celebration of our growing volunteer community making real change.', content: 'We are thrilled to announce that NayePankh Foundation has reached 5000 registered volunteers across India.', author: 'Admin', featured: true, published: true, createdAt: now },
    ],
    gallery: [
      { id: uuidv4(), title: 'Education Program', url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600', type: 'IMAGE', featured: true, createdAt: now },
      { id: uuidv4(), title: 'Tree Plantation', url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600', type: 'IMAGE', featured: true, createdAt: now },
      { id: uuidv4(), title: 'Health Camp', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', type: 'IMAGE', featured: false, createdAt: now },
    ],
    tasks: [],
    certificates: [],
    eventRegistrations: [],
    newsletters: [],
  };
}

let db: Database | null = null;
let initPromise: Promise<void> | null = null;

function saveDB() {
  if (!db) return;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

export async function initStore() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    if (fs.existsSync(DATA_FILE)) {
      db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Database;
    } else {
      db = await createSeed();
      saveDB();
    }
  })();
  return initPromise;
}

export function getDB(): Database {
  if (!db) throw new Error('Store not initialized. Call initStore() first.');
  return db;
}

export function updateDB(mutator: (database: Database) => void) {
  const database = getDB();
  mutator(database);
  saveDB();
}

export { uuidv4 };
