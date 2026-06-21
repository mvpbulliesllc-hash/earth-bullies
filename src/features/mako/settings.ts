/**
 * Editable site settings. Each key is exposed in the admin → Settings page and
 * rendered on the public site. Defaults seed the first-run experience.
 */
export const SETTINGS_FIELDS = [
  {
    key: 'hero_headline',
    label: 'Home hero headline',
    type: 'text',
    default: 'The Real XL American Bully',
  },
  {
    key: 'hero_subhead',
    label: 'Home hero subheadline',
    type: 'textarea',
    default:
      'Champion bloodlines, raised in Kuwait, shipped worldwide. ABKC registered. We don\'t chase dreams — we lead them.',
  },
  {
    key: 'hero_image',
    label: 'Home hero — main photo',
    type: 'image',
    hint: 'The big photo behind the EARTH wordmark. Leave empty to use your first featured dog.',
    default: '',
  },
  {
    key: 'about_body',
    label: 'About paragraph',
    type: 'textarea',
    default:
      'Earth Bullies isn\'t about producing numbers. It\'s about producing something that makes people stop and look twice. Every breeding is chosen with intention — structure, bloodline, and that unmistakable presence. ABKC registered, raised in Kuwait, and shipped to approved homes worldwide.',
  },
  {
    key: 'shipping_body',
    label: 'Shipping & import information',
    type: 'textarea',
    default:
      'From Kuwait to your door — anywhere in the world. ABKC registered, health guaranteed, delivered right.\n\nEvery puppy travels with full ABKC paperwork, up-to-date vaccinations, microchip and a veterinary health certificate. We coordinate flight-nanny or cargo transport with trusted, IATA-compliant partners and handle all export documentation.\n\nTypical process:\n1. Reserve your puppy with a deposit.\n2. We arrange health checks, vaccinations and travel paperwork.\n3. We book the safest available transport to your nearest major airport.\n4. Your puppy arrives with a full document pack and our ongoing support.\n\nContact us on WhatsApp for a personalized shipping quote to your country.',
  },
  {
    key: 'contact_intro',
    label: 'Contact page intro',
    type: 'textarea',
    default:
      'Interested in a puppy, a stud service or shipping to your country? Send us a message and we\'ll get back to you personally. For the fastest reply, reach us on WhatsApp.',
  },
  {
    key: 'philosophy_left_image',
    label: 'Home — “Champion bloodline” photo',
    type: 'image',
    hint: 'Left photo in the “Champion Bloodline. Structure. Presence.” section.',
    default: '',
  },
  {
    key: 'philosophy_right_image',
    label: 'Home — “Structure & presence” photo',
    type: 'image',
    hint: 'Right photo in the “Champion Bloodline. Structure. Presence.” section. Leave empty to use a gallery photo.',
    default: '',
  },
  {
    key: 'home_video_url',
    label: 'Home video — direct file URL (overrides MUX Playback ID)',
    type: 'text',
    default: '',
  },
  {
    key: 'home_video_playback_id',
    label: 'Home video — MUX Playback ID',
    type: 'text',
    default: '',
  },
] as const;

export const settingDefaults: Record<string, string> = Object.fromEntries(
  SETTINGS_FIELDS.map(field => [field.key, field.default]),
);
