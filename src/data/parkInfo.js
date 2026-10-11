// Single source of truth for park facts shared by the visit guide, menus,
// footer, and page sections. Facts come from AboutQetsiyah.md and the booking
// section; update them here and every section follows.
export const parkInfo = {
  name: 'Qetsiyah Eco Park',
  address: 'Barangay Calean, Tacurong City, Sultan Kudarat',
  established: 'October 20, 2023',
  coordinates: { lat: 6.6564972, lng: 124.6816161, label: '6.6565° N, 124.6816° E' },
  phoneDisplay: '0962 407 4220',
  phoneHref: 'tel:09624074220',
  email: 'qetsiyahecopark@gmail.com',
  emailHref: 'mailto:qetsiyahecopark@gmail.com',
  mapsHref: 'https://www.google.com/maps/place/Qetsiyah+Ecopark/@6.6567268,124.6805906,433m/data=!3m1!1e3!4m14!1m7!3m6!1s0x32f80d3f87f6d6e5:0xd47b9e3e2d0f4b2a!2sQetsiyah+Ecopark!8m2!3d6.6564972!4d124.6816161!16s%2Fg%2F11khxzgt7r!3m5!1s0x32f80d3f87f6d6e5:0xd47b9e3e2d0f4b2a!8m2!3d6.6564972!4d124.6816161!16s%2Fg%2F11khxzgt7r?entry=ttu',
  hours: {
    label: 'Daily, 8:00 AM – 10:00 PM',
    days: 'Monday to Sunday',
    openHour: 8,
    closeHour: 22,
    openLabel: '8:00 AM',
    closeLabel: '10:00 PM',
    timeZone: 'Asia/Manila'
  },
  entrance: {
    label: 'Around ₱100',
    // Spelled out for headlines: the display font has no peso sign.
    display: 'Around PHP 100',
    note: 'Separate fees apply for individual rides.'
  }
};

// Real park photographs live in /public/Activities; the optimized copies keep
// phones fast. `id` doubles as the in-page anchor used by the mega menu.
export const parkActivities = [
  {
    id: 'zip-lining',
    name: 'Zip Lining',
    kicker: 'Aerial thrill',
    blurb: 'Clip in at the launch deck and glide out over the park with the whole landscape below you.',
    image: '/optimized/activities/zip-lining',
    alt: 'A guest launching from the zip line deck at Qetsiyah Eco Park',
    orientation: 'portrait'
  },
  {
    id: 'sky-biking',
    name: 'Sky Biking',
    kicker: 'High-wire ride',
    blurb: 'Pedal a bicycle along a cable strung above the gardens. Arms out, wide sky, big grins.',
    image: '/optimized/activities/sky-biking',
    alt: 'Two guests sky biking on cables above the gardens',
    orientation: 'portrait'
  },
  {
    id: 'paddle-boats',
    name: 'Paddle Boats',
    kicker: 'On the water',
    blurb: 'Slow things down with an easy pedal around the lagoon. A favorite for kids and couples.',
    image: '/optimized/activities/paddle-boats',
    alt: 'Children riding colorful paddle boats on the park lagoon',
    orientation: 'landscape'
  },
  {
    id: 'horse-riding',
    name: 'Horse Riding',
    kicker: 'Guided ride',
    blurb: 'Saddle up for a gentle ride around the grounds with a park handler walking beside you.',
    image: '/optimized/activities/horse-riding',
    alt: 'A guest on horseback beside a park handler',
    orientation: 'portrait'
  },
  {
    id: 'playground-for-kids',
    name: 'Playground for Kids',
    kicker: 'Little explorers',
    blurb: 'Slides, climbing domes, and open grass where the little ones can run free.',
    image: '/optimized/activities/playground',
    alt: 'Children climbing the colorful playground dome',
    orientation: 'portrait'
  },
  {
    id: 'kiddy-pool',
    name: 'Kiddy Pool',
    kicker: 'Splash time',
    blurb: 'A shaded pool made for cooling off, easy to watch from the poolside.',
    image: '/optimized/activities/kiddy-pool',
    alt: 'Families swimming in the shaded kiddy pool',
    orientation: 'landscape'
  }
];

export const parkCourts = {
  id: 'tennis',
  secondaryId: 'basketball',
  name: 'Tennis & Basketball',
  kicker: 'Open-air courts',
  blurb: 'Bring your crew for a friendly game on the park’s open-air courts.',
  image: '/optimized/activities/courts',
  alt: 'Open-air sports courts at Qetsiyah Eco Park'
};

export const parkStays = [
  { id: 'verde-villa-retreat', name: 'Verde Villa Retreat', note: 'The park’s villa for a private, unhurried stay.' },
  { id: 'cottage-stay', name: 'Cottage Stay', note: 'A home base for your group’s day at the park.' },
  { id: 'qetsiyah-cafe', name: 'Qetsiyah Café', note: 'Local comfort food, snacks, and halo-halo.' },
  { id: 'dine-in-restaurant', name: 'Dine-in Restaurant', note: 'Sit-down meals from the full park menu.' },
  { id: 'lakeside-gazebos', name: 'Lakeside Gazebos', note: 'Shaded seating beside the water.' }
];

export const parkServices = [
  {
    id: 'food-catering',
    name: 'Food Catering',
    note: 'Buffet spreads prepared for private events, gatherings, and milestones.',
    image: '/optimized/moments/buffet-spread',
    alt: 'A catered buffet spread at Qetsiyah Eco Park'
  },
  {
    id: 'weddings',
    name: 'Weddings',
    note: 'An aisle, a reception, and a garden setting for the day you have been planning.',
    image: '/optimized/moments/garden-aisle',
    alt: 'A red-carpet wedding aisle dressed with flowers and chandeliers'
  },
  {
    id: 'family-events',
    name: 'Family Events',
    note: 'Reunions and get-togethers with room for every generation at the table.',
    image: '/optimized/moments/family-table',
    alt: 'A family sharing a meal at a round table in the hall'
  },
  {
    id: 'birthday-event',
    name: 'Birthday Event',
    note: 'Styled stages and party set-ups for birthdays and debuts.',
    image: '/optimized/moments/celebration-stage',
    alt: 'A flower-covered celebration stage inside the function hall'
  },
  {
    id: 'office-event',
    name: 'Office Event',
    note: 'Company outings, programs, and team gatherings in one venue.',
    image: '/optimized/moments/group-gathering',
    alt: 'A large group gathered for a program in the function hall'
  },
  {
    id: 'event-hall',
    name: 'Event Hall',
    note: 'The function hall, available for private events of every kind.',
    image: '/optimized/moments/event-hall',
    alt: 'Guests seated at dressed tables in the event hall'
  }
];

// A short visitor guide. Answers stay within what the park has published.
export const visitFaqs = [
  {
    id: 'hours',
    question: 'When is the park open?',
    answer: 'Every day, Monday to Sunday, from around 8:00 AM until 10:00 PM.'
  },
  {
    id: 'entrance',
    question: 'How much is the entrance fee?',
    answer: 'The entrance fee is around ₱100 per person. Rides such as zip lining, sky biking, paddle boats, and horse riding have their own separate fees.'
  },
  {
    id: 'events',
    question: 'Can we hold an event at the park?',
    answer: 'Yes. The function hall and food catering are available for private events, family gatherings, parties, and milestones. Send a reservation inquiry and the team will check your date.'
  },
  {
    id: 'food',
    question: 'Is there food inside the park?',
    answer: 'Qetsiyah Café and Restaurant serves local comfort food, full meals, and snacks like halo-halo. You can browse the whole menu with prices on the Dining page.'
  },
  {
    id: 'stays',
    question: 'Are there cottages or places to stay?',
    answer: 'The park offers cottage stays and Verde Villa. Mention your preferred venue in the booking form and the team will confirm availability.'
  }
];

export const momentsTeaser = [
  { image: '/optimized/moments/sunset-tower', alt: 'Sunset behind the viewing tower', label: 'Golden hour', wide: true },
  { image: '/optimized/moments/flower-fields', alt: 'Flower fields at sunset', label: 'Flower fields' },
  { image: '/optimized/moments/garden-path', alt: 'A garden path under a bright blue sky', label: 'Garden paths' },
  { image: '/optimized/moments/riders-arch', alt: 'Cyclists posing beneath a woven arch', label: 'Weekend rides', wide: true },
  { image: '/optimized/moments/lights-walk', alt: 'A walkway strung with lights at night', label: 'After dark' },
  { image: '/optimized/moments/garden-aisle', alt: 'A decorated celebration aisle', label: 'Celebrations' }
];
