/**
 * Central brand + contact configuration for the Earth Bullies site.
 * Edit here to update business-wide details that aren't stored in the database.
 */
export const Brand = {
  name: 'Earth Bullies',
  legalName: 'Earth Bullies',
  tagline: 'The Real XL American Bully',
  standards: 'Champion Bloodline · Structure · Presence',
  since: 2020,
  registry: 'ABKC',
  location: 'Kuwait',
  ships: 'Worldwide',
  // TODO: confirm Fawaz's WhatsApp number — placeholder until provided.
  phone: '+965 0000 0000',
  // Digits only, for tel: and WhatsApp links. TODO: real digits for wa.me / tel:.
  phoneDigits: '9650000000',
  email: 'info@earthbullies.com', // TODO: confirm
  instagram: 'https://www.instagram.com/earth.bullies/',
  instagramHandle: 'earth.bullies',
  facebook: '',
  youtube: 'https://youtu.be/Pa1VL_ErCSI',
  followers: '4.8K',
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${Brand.phoneDigits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/** Primary public navigation, used by the site header and footer. */
export const navLinks = [
  { href: '/studs', label: 'Studs' },
  { href: '/females', label: 'Dams' },
  { href: '/litters', label: 'Litters' },
  { href: '/puppies', label: 'Available Puppies' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/contact', label: 'Contact' },
] as const;
