import type { dogsSchema, gallerySchema, LitterPick, littersSchema, puppiesSchema } from '@/models/Schema';

/**
 * Seed fixtures for Earth Bullies. These are the first-run defaults written by
 * `scripts/seed.ts`. The owner edits/replaces everything (including photos)
 * from the admin dashboard, so images intentionally start empty — the public
 * components fall back to a branded placeholder until real photos are uploaded.
 */
export const isDemoMode = process.env.DEMO_MODE === 'true';

type Dog = typeof dogsSchema.$inferSelect;
type Litter = typeof littersSchema.$inferSelect;
type Puppy = typeof puppiesSchema.$inferSelect;
type GalleryItem = typeof gallerySchema.$inferSelect;

const now = new Date('2026-06-01T00:00:00Z');

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

/** Build a Male/Female pick-of-the-litter pricing table (picks 1–6 each). */
const picksFor = (
  male: number[],
  female: number[],
  opts: { maleReserved?: number; femaleReserved?: number } = {},
): LitterPick[] => [
  ...male.map((price, i) => ({
    sex: 'Male',
    pick: i + 1,
    price: money(price),
    status: i < (opts.maleReserved ?? 0) ? 'reserved' : 'available',
  })),
  ...female.map((price, i) => ({
    sex: 'Female',
    pick: i + 1,
    price: money(price),
    status: i < (opts.femaleReserved ?? 0) ? 'reserved' : 'available',
  })),
];

const dogDefaults = {
  dob: '',
  height: 'XL',
  weight: '',
  abkcReg: '',
  pedigree: '',
  studFee: '',
  status: 'active',
  videoUrl: '',
  heroImage: '',
  gallery: [] as string[],
  updatedAt: now,
  createdAt: now,
};

export const demoDogs: Dog[] = [
  {
    ...dogDefaults,
    id: 1,
    slug: 'kimbo',
    type: 'stud',
    name: 'Kimbo',
    color: 'XL American Bully',
    bio: 'THE REAL XL American Bully. Our foundation stud — 4 years old, champion bloodline, and the standard every Earth Bullies breeding is measured against. Heavy bone, a massive head and unmistakable presence.',
    studFee: 'Inquire',
    featured: true,
    sortOrder: 1,
  },
  {
    ...dogDefaults,
    id: 2,
    slug: 'drago',
    type: 'stud',
    name: 'Drago',
    color: 'XL American Bully',
    bio: '“King Drago” — Barbie Brother and one of our most-followed males. Big-dawg structure with the confident, street-luxury presence the line is known for.',
    studFee: 'Inquire',
    featured: true,
    sortOrder: 2,
  },
  {
    ...dogDefaults,
    id: 3,
    slug: 'regal',
    type: 'stud',
    name: 'Regal',
    color: 'XL American Bully',
    bio: 'Stud behind the Truffle × Regal breeding. Chosen for structure and balance — quality over quantity, every time.',
    studFee: 'Inquire',
    featured: false,
    sortOrder: 3,
  },
  {
    ...dogDefaults,
    id: 4,
    slug: 'barbie',
    type: 'female',
    name: 'Barbie',
    color: 'XL American Bully',
    bio: 'Our foundation dam — the heart of the Barbie Family and the line Earth Bullies is built around. Structure, temperament and that look that makes people stop and stare.',
    featured: true,
    sortOrder: 4,
  },
  {
    ...dogDefaults,
    id: 5,
    slug: 'shelby',
    type: 'female',
    name: 'Shelby',
    color: 'XL American Bully',
    bio: 'Dam paired with Kimbo for our newest litter. A deliberate pairing built for extreme structure and champion presence.',
    featured: false,
    sortOrder: 5,
  },
  {
    ...dogDefaults,
    id: 6,
    slug: 'truffle',
    type: 'female',
    name: 'Truffle',
    color: 'XL American Bully',
    bio: 'Dam of the Truffle × Regal litter. Two completely different expressions, both powerful — proof that choosing your breedings wisely is everything.',
    featured: false,
    sortOrder: 6,
  },
  {
    ...dogDefaults,
    id: 7,
    slug: 'machette',
    type: 'female',
    name: 'Machette',
    color: 'Merle',
    bio: 'My little queen. That merle coat isn\'t just a color, it\'s a whole personality — and she\'s already breaking necks. The up-and-coming future of the dam line.',
    featured: true,
    sortOrder: 7,
  },
];

export const demoLitters: Litter[] = [
  {
    id: 1,
    slug: 'kimbo-x-shelby',
    name: 'Kimbo × Shelby',
    sireName: 'Kimbo',
    damName: 'Shelby',
    status: 'current',
    date: 'Available now — limited',
    expectedColors: 'XL American Bully',
    description: 'Our newest litter — limited quantity, prices are fire. Co-bred with @bossykennelsfamily and @mvp_bullies. Champion blood, real XL structure. When they\'re gone, they\'re gone — reserve yours before the next drop.',
    heroImage: '',
    gallery: [],
    picks: picksFor(
      [8000, 7000, 6500, 6000, 5500, 5000],
      [9000, 8000, 7500, 7000, 6500, 6000],
    ),
    liveStreamUrl: '',
    sortOrder: 1,
    updatedAt: now,
    createdAt: now,
  },
  {
    id: 2,
    slug: 'truffle-x-regal',
    name: 'Truffle × Regal',
    sireName: 'Regal',
    damName: 'Truffle',
    status: 'current',
    date: 'On the ground — ~6 weeks',
    expectedColors: 'XL American Bully',
    description: 'Two pups, two completely different expressions — both powerful. One male, one female, around 6 weeks old. It\'s not about producing numbers; it\'s about producing something that makes people stop and look twice.',
    heroImage: '',
    gallery: [],
    picks: picksFor([6500], [7500]),
    liveStreamUrl: '',
    sortOrder: 2,
    updatedAt: now,
    createdAt: now,
  },
];

export const demoPuppies: Puppy[] = [
  {
    id: 1,
    litterId: 2,
    name: 'Truffle × Regal — Male',
    sex: 'Male',
    color: 'XL American Bully',
    price: 'Inquire',
    status: 'available',
    description: 'Powerful male from the Truffle × Regal litter, ~6 weeks. Champion blood, real XL structure.',
    heroImage: '',
    gallery: [],
    videoUrl: '',
    sortOrder: 1,
    updatedAt: now,
    createdAt: now,
  },
  {
    id: 2,
    litterId: 2,
    name: 'Truffle × Regal — Female',
    sex: 'Female',
    color: 'XL American Bully',
    price: 'Inquire',
    status: 'available',
    description: 'Striking female from the Truffle × Regal litter, ~6 weeks. A completely different expression — equally powerful.',
    heroImage: '',
    gallery: [],
    videoUrl: '',
    sortOrder: 2,
    updatedAt: now,
    createdAt: now,
  },
];

export const demoGallery: GalleryItem[] = [];
