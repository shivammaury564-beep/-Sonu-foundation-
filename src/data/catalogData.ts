export type CompleteServiceCategory =
  | 'Beauty, Waxing & Skin Services'
  | 'Hair Services'
  | 'Makeup Services'
  | 'Hairstyle Services'
  | 'Nail Services';

export interface ServiceItem {
  id: string;
  name: string;
  category: CompleteServiceCategory;
  shortSubtitle: string;
  description: string;
  priceLabel: string;
  image: string;
  iconName: 'leaf' | 'scissors' | 'star' | 'sparkles' | 'feather' | 'droplet';
  isPopular: boolean;
  whatsIncluded: string[];
  serviceProcess: string[];
  clientNote?: string;
}

export type CourseCategoryName =
  | 'Beauty Academy — Professional Courses'
  | 'Beauty Training Classes'
  | 'Stitching & Tailoring Classes'
  | 'Computer Classes';

export interface TrainingCourse {
  id: string;
  title: string;
  division: 'academy' | 'foundation';
  category: CourseCategoryName;
  description: string;
  image: string;
  duration: string;
  fees: string;
  eligibility: string;
  batchTimings: string;
  certificateInfo: string;
  practicalTraining: string;
  whatStudentsWillLearn: string[];
  modules: string[];
}

export interface StudioLocation {
  id: string;
  location_name: string;
  branch_label: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  email: string;
  google_maps_url: string;
  latitude: number | null;
  longitude: number | null;
  opening_time: string; // HH:mm (24h), e.g., "10:00"
  closing_time: string; // HH:mm (24h), e.g., "20:00"
  active: boolean;
  available_services: string[];
  image_url: string;
  exterior_image_url: string;
  interior_image_url: string;
  created_at: string;
  updated_at: string;
}

export type GalleryCategoryName =
  | 'Beauty Studio'
  | 'Makeup Work'
  | 'Hair Styling'
  | 'Nail Art'
  | 'Academy Training'
  | 'Beauty Students'
  | 'Stitching Classes'
  | 'Computer Classes'
  | 'Student Certificates'
  | 'Foundation Activities'
  | 'Branch Photographs';

export interface GalleryMediaItem {
  id: string;
  title: string;
  category: GalleryCategoryName;
  image: string;
  aspect: 'landscape' | 'portrait' | 'square';
  fitMode: 'cover' | 'contain';
  caption: string;
  isVideo?: boolean;
  videoDuration?: string;
}

export const BRAND_CONTACT = {
  businessName: "Sonu's Beauty Studio & Academy",
  foundationName: 'Sonu Foundation and Charitable Trust',
  primaryPhone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  email: 'sonusbeautystudio@gmail.com',
  hours: 'Mon – Sun: 10:00 AM - 8:00 PM',
  city: 'Vadodara, Gujarat',
};

// 6 Featured Homepage Service Cards (Preserving Exact Reference Homepage Design)
export const HOMEPAGE_POPULAR_SERVICES: ServiceItem[] = [
  {
    id: 'facial-skin-care',
    name: 'Facial & Skin Care',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Glow your skin with professional facials.',
    description:
      'Customized skin analysis, deep cleansing, hydrating facials, shiner/bleach care, and radiance treatments using skin-friendly salon products.',
    priceLabel: 'From ₹699',
    image: '/assets/sonu/service-facial.png',
    iconName: 'leaf',
    isPopular: true,
    whatsIncluded: [
      'Skin type consultation & gentle cleansing',
      'Exfoliation, steam & blackhead/whitehead care',
      'Relaxing facial massage with hydrating cream/serum',
      'Target mask application & protective finish',
    ],
    serviceProcess: [
      '01. Personal skin evaluation by trained aesthetician',
      '02. Deep pore cleansing & gentle exfoliation',
      '03. Nourishing massage & calming mask therapy',
      '04. Post-care guidance for lasting glow',
    ],
  },
  {
    id: 'hair-care-styling',
    name: 'Hair Care & Styling',
    category: 'Hair Services',
    shortSubtitle: 'Haircuts, styling, smoothening & more.',
    description:
      'Precision haircuts, blow-dry styling, festive updos, braids, and texture smoothening tailored to your face shape and hair health.',
    priceLabel: 'From ₹499',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: true,
    whatsIncluded: [
      'Hair & scalp consultation',
      'Refreshing hair wash & conditioning',
      'Custom haircut or event heat styling',
      'Finishing serum & volume setting',
    ],
    serviceProcess: [
      '01. Face-shape & texture assessment',
      '02. Gentle shampoo & conditioning prep',
      '03. Precision cut or thermal styling',
      '04. Shine finish & maintenance tips',
    ],
  },
  {
    id: 'makeup-bridal-party',
    name: 'Makeup (Bridal & Party)',
    category: 'Makeup Services',
    shortSubtitle: 'Bridal, engagement & party makeup.',
    description:
      'Flawless traditional bridal makeovers, reception looks, Haldi looks, society look makeup, and party wear makeup with skin-true shade matching.',
    priceLabel: 'From ₹2,999',
    image: '/assets/sonu/service-makeup.png',
    iconName: 'star',
    isPopular: true,
    whatsIncluded: [
      'Skin prep & long-wear primer base',
      'Full face bridal, reception or party makeup',
      'Eye styling, lashes & lip definition',
      'Hairstyling & dupatta/saree setting assistance',
    ],
    serviceProcess: [
      '01. Outfit, jewellery & undertone consultation',
      '02. Hydrating skin prep & colour correction',
      '03. Layered crease-resistant makeup artistry',
      '04. Final setting spray & jewellery alignment',
    ],
  },
  {
    id: 'nail-art-care',
    name: 'Nail Art & Care',
    category: 'Nail Services',
    shortSubtitle: 'Manicure, pedicure & trendy nail art.',
    description:
      'Hygienic manicure and pedicure rituals, temporary, acrylic, and gel nail extensions, and custom nail art designs.',
    priceLabel: 'From ₹399',
    image: '/assets/sonu/service-nails.png',
    iconName: 'sparkles',
    isPopular: true,
    whatsIncluded: [
      'Nail shaping, buffing & cuticle care',
      'Extension prep or soothing soak & scrub',
      'Gel polish or custom nail art design',
      'Cuticle oil nourishment & top-coat seal',
    ],
    serviceProcess: [
      '01. Sanitized tool prep & nail assessment',
      '02. Shaping, cuticle care & gentle buffing',
      '03. Base coat, extension/art layers & curing',
      '04. High-gloss protective finish',
    ],
  },
  {
    id: 'threading-waxing',
    name: 'Threading & Waxing',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Precise threading & painless waxing.',
    description:
      'Gentle eyebrow, upper lips, and forehead threading, plus hygienic hand and leg waxing with soothing post-wax care.',
    priceLabel: 'From ₹99',
    image: '/assets/sonu/service-threading.png',
    iconName: 'feather',
    isPopular: true,
    whatsIncluded: [
      'Pre-wax skin cleansing & powder prep',
      'Disposable strips & temperature-checked wax',
      'Precision eyebrow, upper lips & forehead threading',
      'Calming post-wax lotion or cooling gel',
    ],
    serviceProcess: [
      '01. Skin sensitivity check & cleansing',
      '02. Gentle hair removal with hygienic disposables',
      '03. Precision brow symmetry shaping',
      '04. Soothing lotion application',
    ],
  },
  {
    id: 'hair-treatments',
    name: 'Hair Treatments',
    category: 'Hair Services',
    shortSubtitle: 'Keratin, spa, hair fall & damage repair.',
    description:
      'Deep-conditioning hair spa, smoothing, keratin treatment, KeraSmooth, protein treatment, nanoplasty, and permanent hair spa rituals.',
    priceLabel: 'From ₹1,499',
    image: '/assets/sonu/service-treatments.png',
    iconName: 'droplet',
    isPopular: true,
    whatsIncluded: [
      'Scalp & strand damage diagnosis',
      'Deep clarifying wash & treatment application',
      'Steam infusion or thermal treatment seal',
      'Protective blow-dry & home-care guidance',
    ],
    serviceProcess: [
      '01. Strand elasticity & scalp check',
      '02. Section-by-section nutrient infusion',
      '03. Controlled steam / thermal sealing',
      '04. Post-treatment care consultation',
    ],
  },
];

// Complete Client-Supplied Beauty Service Catalog (All 36 Services Across 5 Categories)
export const COMPLETE_BEAUTY_SERVICES: ServiceItem[] = [
  // A. BEAUTY, WAXING AND SKIN SERVICES (11 Services)
  {
    id: 'srv-eyebrow',
    name: 'Eyebrow',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Precision eyebrow threading and arch shaping tailored to your facial features.',
    description:
      'Hygienic cotton-thread eyebrow shaping to define clean, symmetrical arches with soothing post-threading gel.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-threading.png',
    iconName: 'feather',
    isPopular: false,
    whatsIncluded: [
      'Brow arch & symmetry consultation',
      'Sanitized skin prep & gentle talcum dusting',
      'Precision cotton-thread eyebrow shaping',
      'Cooling aloe / soothing lotion finish',
    ],
    serviceProcess: [
      '01. Natural brow shape assessment',
      '02. Gentle skin hold & clean hair removal',
      '03. Symmetry check & stray hair cleanup',
      '04. Calming gel application',
    ],
  },
  {
    id: 'srv-upper-lips',
    name: 'Upper Lips',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Gentle and hygienic upper lip hair removal for smooth skin.',
    description:
      'Quick, gentle upper lip threading performed with skin-safe hygiene and soothing post-care.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-threading.png',
    iconName: 'feather',
    isPopular: false,
    whatsIncluded: [
      'Pre-threading skin cleansing',
      'Gentle fine-thread hair removal',
      'Corner & philtrum detail cleanup',
      'Soothing cooling gel application',
    ],
    serviceProcess: [
      '01. Skin prep',
      '02. Gentle directional threading',
      '03. Inspection for fine hairs',
      '04. Soothing post-threading care',
    ],
  },
  {
    id: 'srv-forehead',
    name: 'Forehead',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Clean forehead threading for a smooth hairline and bright complexion.',
    description:
      'Removes fine vellus hair across the forehead and temples gently without irritating sensitive skin.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-threading.png',
    iconName: 'feather',
    isPopular: false,
    whatsIncluded: [
      'Forehead & temple area prep',
      'Hygienic thread hair removal',
      'Natural hairline preservation',
      'Calming toner / cooling gel finish',
    ],
    serviceProcess: [
      '01. Hairline boundary check',
      '02. Smooth section-by-section threading',
      '03. Brow-top blending',
      '04. Refreshing skin calm application',
    ],
  },
  {
    id: 'srv-hand-wax',
    name: 'Hand Wax',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Hygienic full-arm and hand waxing for soft, smooth skin.',
    description:
      'Complete hand and arm waxing using temperature-checked wax and single-use disposable strips for smooth, even skin.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-threading.png',
    iconName: 'feather',
    isPopular: false,
    whatsIncluded: [
      'Pre-wax cleansing & moisture control prep',
      'Full arm, forearm & hand hair removal',
      'Single-use hygienic waxing strips',
      'Post-wax cleansing & soothing lotion',
    ],
    serviceProcess: [
      '01. Skin sensitivity & temperature check',
      '02. Even directional wax application',
      '03. Swift removal with disposable strips',
      '04. Residue cleanup & calming moisturizer',
    ],
  },
  {
    id: 'srv-leg-wax',
    name: 'Leg Wax',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Gentle half-leg or full-leg waxing with soothing post-wax nourishment.',
    description:
      'Thorough, hygienic leg waxing designed to remove stubborn hair smoothly while leaving skin hydrated and comfortable.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-threading.png',
    iconName: 'feather',
    isPopular: false,
    whatsIncluded: [
      'Pre-wax antiseptic cleansing',
      'Hygienic leg & foot hair removal',
      'Knee & ankle gentle detail waxing',
      'Soothing post-wax lotion massage',
    ],
    serviceProcess: [
      '01. Skin prep & powdering',
      '02. Sectioned warm wax application',
      '03. Clean strip removal',
      '04. Calming lotion finish',
    ],
  },
  {
    id: 'srv-manicure',
    name: 'Manicure',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Relaxing hand soak, cuticle grooming, nail shaping, and hand massage.',
    description:
      'Complete hand and nail care ritual featuring warm soak, cuticle care, exfoliation, relaxing hand massage, and neat nail finish.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-nails.png',
    iconName: 'sparkles',
    isPopular: false,
    whatsIncluded: [
      'Nail trimming, filing & buffing',
      'Warm aromatic hand soak & cuticle care',
      'Gentle hand & forearm scrub',
      'Nourishing hand massage & base/polish finish',
    ],
    serviceProcess: [
      '01. Sanitized tool preparation',
      '02. Nail shaping & warm soak',
      '03. Cuticle tidying & exfoliation',
      '04. Relaxing massage & neat polish',
    ],
  },
  {
    id: 'srv-pedicure',
    name: 'Pedicure',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Soothing foot spa, heel scrubbing, cuticle care, and relaxing foot massage.',
    description:
      'Hygienic foot care treatment that softens rough heels, tidies nails and cuticles, and relieves tired feet with a soothing massage.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-nails.png',
    iconName: 'sparkles',
    isPopular: false,
    whatsIncluded: [
      'Warm foot soak & antiseptic cleansing',
      'Toenail clipping, shaping & cuticle care',
      'Heel & sole dead-skin exfoliation',
      'Relaxing foot/calf massage & clean nail finish',
    ],
    serviceProcess: [
      '01. Foot hygiene soak',
      '02. Nail & cuticle grooming',
      '03. Heel smoothing & scrub',
      '04. Moisturizing massage & finish',
    ],
  },
  {
    id: 'srv-shiner-bleach',
    name: 'Shiner / Bleach',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Gentle skin shiner and facial bleach for instant brightness and even tone.',
    description:
      'Carefully patch-tested skin shiner or bleach application to lighten facial hair appearance and refresh dull, sun-exposed skin.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-facial.png',
    iconName: 'leaf',
    isPopular: false,
    whatsIncluded: [
      'Skin sensitivity patch check',
      'Pre-bleach cleansing & protective barrier',
      'Timed shiner / bleach application',
      'Cool water rinse & soothing pack finish',
    ],
    serviceProcess: [
      '01. Skin type & sensitivity check',
      '02. Fresh preparation & even application',
      '03. Monitored processing time',
      '04. Gentle removal & hydrating calm',
    ],
  },
  {
    id: 'srv-facial',
    name: 'Facial',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Multi-step salon facial customized for hydration, glow, and deep pore care.',
    description:
      'Complete facial ritual combining deep cleansing, gentle exfoliation, steam, massage strokes, and a targeted mask for healthy radiance.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-facial.png',
    iconName: 'leaf',
    isPopular: false,
    whatsIncluded: [
      'Skin analysis & deep pore cleansing',
      'Gentle scrub, steam & comedone care',
      'Relaxing pressure-point facial massage',
      'Customized face mask & protective moisturizer',
    ],
    serviceProcess: [
      '01. Consultation & skin cleansing',
      '02. Exfoliation & gentle steam',
      '03. Nourishing massage therapy',
      '04. Mask application & SPF finish',
    ],
  },
  {
    id: 'srv-back-massage',
    name: 'Back Massage',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Relaxing back and shoulder massage to ease tension and refresh skin.',
    description:
      'Soothing back massage using rhythmic salon strokes and nourishing cream or oil to relieve everyday posture tension.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-facial.png',
    iconName: 'leaf',
    isPopular: false,
    whatsIncluded: [
      'Back cleansing & warm towel prep',
      'Nourishing massage cream / oil application',
      'Upper back, shoulder & spine-side relaxation strokes',
      'Warm towel wipe & refreshing finish',
    ],
    serviceProcess: [
      '01. Comfort setup & skin prep',
      '02. Gentle warming effleurage strokes',
      '03. Targeted shoulder & back relaxation',
      '04. Warm towel finish',
    ],
  },
  {
    id: 'srv-head-massage',
    name: 'Head Massage',
    category: 'Beauty, Waxing & Skin Services',
    shortSubtitle: 'Traditional scalp and head massage for stress relief and hair nourishment.',
    description:
      'Calming scalp and head massage focusing on crown, temple, and neck pressure points to boost circulation and relaxation.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-treatments.png',
    iconName: 'droplet',
    isPopular: false,
    whatsIncluded: [
      'Scalp sectioning & oil/serum choice',
      'Crown, temple & nape pressure-point massage',
      'Gentle hair root stimulation',
      'Relaxing neck & shoulder release',
    ],
    serviceProcess: [
      '01. Scalp consultation',
      '02. Sectioned oil/tonic application',
      '03. Rhythmic pressure-point massage',
      '04. Relaxation finish',
    ],
  },

  // B. HAIR SERVICES (11 Services)
  {
    id: 'srv-hair-spa',
    name: 'Hair Spa',
    category: 'Hair Services',
    shortSubtitle: 'Deep-conditioning hair spa with scalp massage and steam infusion.',
    description:
      'Restores moisture, softness, and shine to dry or frizzy hair through a nourishing masque, scalp massage, and gentle steam.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-treatments.png',
    iconName: 'droplet',
    isPopular: false,
    whatsIncluded: [
      'Purifying shampoo wash',
      'Section-by-section hair spa cream infusion',
      'Relaxing scalp massage & steam hydration',
      'Cool rinse & smooth blow-dry finish',
    ],
    serviceProcess: [
      '01. Hair texture & scalp check',
      '02. Cleansing & spa cream application',
      '03. Massage & controlled steam',
      '04. Rinse & protective styling',
    ],
  },
  {
    id: 'srv-hair-cuts',
    name: 'Hair Cuts',
    category: 'Hair Services',
    shortSubtitle: 'Customized haircuts from classic trims to layers, U-cut, V-cut, and bangs.',
    description:
      'Precision hair cutting tailored to your face shape, hair density, and everyday styling preference.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    whatsIncluded: [
      'Style & length consultation',
      'Sectioned precision haircut',
      'Split-end & perimeter check',
      'Blow-dry setting finish',
    ],
    serviceProcess: [
      '01. Face shape & hair movement check',
      '02. Clean sectioning & precision cut',
      '03. Balance & texturizing refinement',
      '04. Styled blow-dry finish',
    ],
  },
  {
    id: 'srv-smoothing',
    name: 'Smoothing',
    category: 'Hair Services',
    shortSubtitle: 'Professional hair smoothing treatment for sleek, manageable, frizz-free hair.',
    description:
      'Softens unruly waves and frizz to deliver silky, smooth, and easy-to-manage hair with salon-grade care.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    whatsIncluded: [
      'Strand test & hair health evaluation',
      'Deep cleansing & smoothing cream application',
      'Precision thermal alignment & neutralizing seal',
      'Conditioning rinse & sleek finish',
    ],
    serviceProcess: [
      '01. Hair elasticity & porosity check',
      '02. Controlled smoothing application',
      '03. Thermal alignment & neutralizing lock',
      '04. Post-smoothing care instructions',
    ],
  },
  {
    id: 'srv-keratin-treatment',
    name: 'Keratin Treatment',
    category: 'Hair Services',
    shortSubtitle: 'Protein-rich keratin infusion to tame frizz and restore smooth shine.',
    description:
      'Infuses keratin protein into porous cuticles to reduce frizz, improve manageability, and add healthy shine.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-treatments.png',
    iconName: 'droplet',
    isPopular: false,
    whatsIncluded: [
      'Clarifying pre-treatment wash',
      'Sectioned keratin formula application',
      'Blow-dry & controlled flat-iron sealing',
      'Aftercare maintenance guidance',
    ],
    serviceProcess: [
      '01. Hair diagnosis & clarifying wash',
      '02. Even keratin saturation',
      '03. Heat activation & cuticle sealing',
      '04. Home-care routine briefing',
    ],
  },
  {
    id: 'srv-kerasmooth',
    name: 'KeraSmooth',
    category: 'Hair Services',
    shortSubtitle: 'Combined smoothing and keratin nourishment for sleek, soft, resilient hair.',
    description:
      'Dual-benefit salon ritual that pairs structural smoothing with keratin conditioning for sleek yet natural-feeling hair.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-treatments.png',
    iconName: 'droplet',
    isPopular: false,
    whatsIncluded: [
      'Detailed hair & scalp consultation',
      'Smoothing & keratin infusion steps',
      'Controlled thermal sealing',
      'Finishing serum & care tips',
    ],
    serviceProcess: [
      '01. Strand assessment',
      '02. Smoothing base & keratin step',
      '03. Precision heat lock',
      '04. Final polish & care guide',
    ],
  },
  {
    id: 'srv-protein-treatment',
    name: 'Protein Treatment',
    category: 'Hair Services',
    shortSubtitle: 'Strengthening protein therapy for weak, brittle, or chemically treated hair.',
    description:
      'Replenishes lost amino proteins in damaged hair shafts to reduce breakage and improve elasticity.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-treatments.png',
    iconName: 'droplet',
    isPopular: false,
    whatsIncluded: [
      'Gentle cleansing & towel blot',
      'Concentrated protein masque application',
      'Gentle heat/steam penetration',
      'Moisture-balancing rinse & blow-dry',
    ],
    serviceProcess: [
      '01. Damage & breakage evaluation',
      '02. Root-to-tip protein application',
      '03. Absorption & moisture lock',
      '04. Protective styling finish',
    ],
  },
  {
    id: 'srv-nanoplasty',
    name: 'Nanoplasty',
    category: 'Hair Services',
    shortSubtitle: 'Advanced hair restoration and smoothing treatment for glossy, frizz-free strands.',
    description:
      'Modern smoothing and nourishment procedure designed to smooth texture while maintaining softness and high shine.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-treatments.png',
    iconName: 'droplet',
    isPopular: false,
    whatsIncluded: [
      'Pre-treatment hair assessment & wash',
      'Fine-section nanoplasty treatment application',
      'Thermal sealing & rinse',
      'Glossy blow-dry finish',
    ],
    serviceProcess: [
      '01. Consultation & strand check',
      '02. Uniform product application',
      '03. Controlled thermal sealing',
      '04. Final rinse & smooth finish',
    ],
  },
  {
    id: 'srv-root-touchup',
    name: 'Root Touchup',
    category: 'Hair Services',
    shortSubtitle: 'Seamless root colour coverage blended naturally with your existing hair shade.',
    description:
      'Targets new root growth and grey coverage with precise shade matching and scalp-conscious application.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    whatsIncluded: [
      'Shade matching & patch test guidance',
      'Barrier cream & neat root sectioning',
      'Timed colour processing & emulsifying rinse',
      'Colour-safe conditioning & blow-dry',
    ],
    serviceProcess: [
      '01. Shade match assessment',
      '02. Precision root application',
      '03. Timed processing & gentle wash',
      '04. Conditioning & blow-dry',
    ],
  },
  {
    id: 'srv-global-hair-colour',
    name: 'Global Hair Colour',
    category: 'Hair Services',
    shortSubtitle: 'Full root-to-tip hair colouring for rich, uniform, luminous tone.',
    description:
      'Complete all-over hair colour transformation or tone refresh tailored to your complexion and style.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    whatsIncluded: [
      'Undertone & shade chart consultation',
      'Full-length sectioned colour application',
      'Post-colour lock wash & conditioning mask',
      'Styled blow-dry finish',
    ],
    serviceProcess: [
      '01. Shade & hair history check',
      '02. Root & length colour application',
      '03. Processing & colour-protect rinse',
      '04. Shine blow-dry',
    ],
  },
  {
    id: 'srv-highlights',
    name: 'Highlights',
    category: 'Hair Services',
    shortSubtitle: 'Dimensional foil highlights, streaks, or balayage accents for vibrant depth.',
    description:
      'Custom-placed highlights to brighten facial contours and add multi-tonal movement to your hair.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    whatsIncluded: [
      'Placement & tone consultation',
      'Precision foil weaving / sectioning',
      'Toning & nourishing post-lightening mask',
      'Styled finish',
    ],
    serviceProcess: [
      '01. Pattern & shade selection',
      '02. Foil placement & lift monitoring',
      '03. Toner gloss & deep conditioning',
      '04. Styled blow-dry',
    ],
  },
  {
    id: 'srv-permanent-hair-spa',
    name: 'Permanent Hair Spa',
    category: 'Hair Services',
    shortSubtitle: 'Long-lasting smoothing and deep conditioning ritual for soft, manageable hair.',
    description:
      'Intensive salon spa ritual designed to provide extended smoothness, frizz control, and deep nourishment.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-treatments.png',
    iconName: 'droplet',
    isPopular: false,
    whatsIncluded: [
      'Hair texture & porosity diagnosis',
      'Multi-step permanent spa infusion',
      'Thermal lock & conditioning seal',
      'Post-care guidance',
    ],
    serviceProcess: [
      '01. Strand evaluation',
      '02. Deep spa treatment application',
      '03. Controlled sealing step',
      '04. Smooth finish & care briefing',
    ],
  },

  // C. MAKEUP SERVICES (6 Services)
  {
    id: 'srv-self-makeup',
    name: 'Self Makeup',
    category: 'Makeup Services',
    shortSubtitle: 'Natural, polished everyday or personal event makeup styling.',
    description:
      'Clean, skin-flattering makeup look suitable for personal gatherings, office events, or intimate celebrations.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-makeup.png',
    iconName: 'star',
    isPopular: false,
    whatsIncluded: [
      'Skin cleansing & hydrating primer',
      'Lightweight natural base & concealer',
      'Soft eye definition, blush & lip colour',
      'Setting mist finish',
    ],
    serviceProcess: [
      '01. Skin prep & shade match',
      '02. Breathable base blending',
      '03. Eye & lip enhancement',
      '04. Long-wear setting mist',
    ],
  },
  {
    id: 'srv-society-look-makeup',
    name: 'Society Look Makeup',
    category: 'Makeup Services',
    shortSubtitle: 'Elegant festive and community function makeup with graceful hair and draping.',
    description:
      'Refined traditional or contemporary makeup look ideal for society functions, garba/festive evenings, and family ceremonies.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-makeup.png',
    iconName: 'star',
    isPopular: false,
    whatsIncluded: [
      'Skin prep & sweat-resistant base',
      'Festive eye makeup & lash styling',
      'Balanced contour, highlighter & lip shade',
      'Basic hair setting & saree/dupatta pinning',
    ],
    serviceProcess: [
      '01. Outfit colour coordination',
      '02. Long-wear base application',
      '03. Festive eye & lip artistry',
      '04. Finishing spray & outfit check',
    ],
  },
  {
    id: 'srv-haldi-look-makeup',
    name: 'Haldi Look Makeup',
    category: 'Makeup Services',
    shortSubtitle: 'Fresh, dewy, daytime-friendly makeup crafted for Haldi and pre-wedding rituals.',
    description:
      'Radiant, lightweight, and photo-ready daytime makeup designed to look fresh in natural sunlight and complement floral jewellery.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-makeup.png',
    iconName: 'star',
    isPopular: false,
    whatsIncluded: [
      'Water-resistant dewy skin prep',
      'Soft daytime eye & warm blush glow',
      'Floral jewellery & hair coordination',
      'Long-stay setting finish',
    ],
    serviceProcess: [
      '01. Daytime lighting & outfit check',
      '02. Fresh dewy base & colour correction',
      '03. Warm eye & lip styling',
      '04. Floral accessory placement',
    ],
  },
  {
    id: 'srv-bridal-makeup',
    name: 'Bridal Makeup',
    category: 'Makeup Services',
    shortSubtitle: 'Signature wedding-day bridal makeover with bridal hairstyling and draping.',
    description:
      'Bespoke traditional or modern HD bridal makeup engineered for long ceremony hours, photography lighting, and timeless elegance.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-makeup.png',
    iconName: 'star',
    isPopular: false,
    whatsIncluded: [
      'In-depth bridal look & skin prep ritual',
      'Full HD / long-wear bridal base & contouring',
      'Intricate bridal eye artistry, lashes & lip definition',
      'Bridal hairstyling, floral/jewellery setting & draping',
    ],
    serviceProcess: [
      '01. Bridal attire & jewellery consultation',
      '02. Multi-layer skin hydration & priming',
      '03. Precision bridal makeup & eye artistry',
      '04. Bridal bun/hair, jewellery & dupatta draping',
    ],
  },
  {
    id: 'srv-reception-makeup',
    name: 'Reception Makeup',
    category: 'Makeup Services',
    shortSubtitle: 'Glamorous evening reception makeover tailored for stage lighting and photography.',
    description:
      'Sophisticated evening glamour with luminous highlights, defined eyes, and modern hairstyling for wedding receptions and engagements.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-makeup.png',
    iconName: 'star',
    isPopular: false,
    whatsIncluded: [
      'Evening glow skin preparation',
      'Camera-ready luminous base & sculpting',
      'Smokey, shimmer, or cut-crease eye styling',
      'Reception hairstyle & gown/saree styling',
    ],
    serviceProcess: [
      '01. Evening look & neckline consultation',
      '02. Flawless full-coverage base',
      '03. Statement eye & lip artistry',
      '04. Hairstyling & final touch-up',
    ],
  },
  {
    id: 'srv-party-wear-makeup',
    name: 'Party Wear Makeup',
    category: 'Makeup Services',
    shortSubtitle: 'Polished party makeup for wedding guests, birthdays, and special occasions.',
    description:
      'Versatile party makeup customized from subtle elegance to bold evening glamour to match your outfit and occasion.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-makeup.png',
    iconName: 'star',
    isPopular: false,
    whatsIncluded: [
      'Skin prep & smooth foundation base',
      'Coordinated eye shadow, liner & mascara',
      'Blush, highlighter & lip colour',
      'Long-wear setting spray',
    ],
    serviceProcess: [
      '01. Occasion & outfit discussion',
      '02. Base & concealer blending',
      '03. Eye & lip styling',
      '04. Setting finish',
    ],
  },

  // D. HAIRSTYLE SERVICES (4 Services)
  {
    id: 'srv-low-bun-loban',
    name: 'Low Bun / Loban',
    category: 'Hairstyle Services',
    shortSubtitle: 'Classic sculpted low bun hairstyle for bridal, festive, and traditional attire.',
    description:
      'Elegant low bun styled at the nape with smooth crown volume, secure pinning, and optional Gajra or accessory placement.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    clientNote: 'Exact service label (Low Bun / Loban) subject to client confirmation.',
    whatsIncluded: [
      'Heat protection & texture prep',
      'Crown volume backcombing & smoothing',
      'Secure sculpted low bun construction',
      'Holding spray & hair accessory / floral pinning',
    ],
    serviceProcess: [
      '01. Neckline & accessory check',
      '02. Sectioning & crown volume prep',
      '03. Low bun sculpting & pinning',
      '04. Finishing hold & accessory placement',
    ],
  },
  {
    id: 'srv-messy-Bun',
    name: 'Messy Bun',
    category: 'Hairstyle Services',
    shortSubtitle: 'Textured, effortless-looking messy bun with face-framing tendrils.',
    description:
      'Modern textured updo combining soft curls and airy volume—ideal for engagements, sangeet, cocktail events, and Indo-western outfits.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    whatsIncluded: [
      'Curl / wave texture preparation',
      'Soft face-framing flicks',
      'Artful pinned textured bun',
      'Long-hold flexible finishing spray',
    ],
    serviceProcess: [
      '01. Texture & curl prep',
      '02. Crown & side twisting',
      '03. Airy bun pinning',
      '04. Face-framing curl refinement',
    ],
  },
  {
    id: 'srv-braids',
    name: 'Braids',
    category: 'Hairstyle Services',
    shortSubtitle: 'Traditional bridal braids, fishtail, French, Dutch, and floral-adorned braids.',
    description:
      'Intricate braided hairstyles crafted for Haldi, Mehendi, traditional weddings, and festive occasions.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    whatsIncluded: [
      'Detangling & volume prep',
      'Custom braid weaving (traditional / modern)',
      'Paranda, floral, or jewel embellishment pinning',
      'Frizz-control finishing spray',
    ],
    serviceProcess: [
      '01. Braid style selection',
      '02. Clean sectioning & volume prep',
      '03. Precision braiding & pulling for fullness',
      '04. Accessory fastening & hold spray',
    ],
  },
  {
    id: 'srv-open-hair-hairstyle',
    name: 'Open Hair Hairstyle',
    category: 'Hairstyle Services',
    shortSubtitle: 'Soft Hollywood waves, voluminous curls, or half-up open hair styling.',
    description:
      'Flowing open hair styling with structured curls, waves, or crown twists that stay bouncy and polished throughout your event.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-hair.png',
    iconName: 'scissors',
    isPopular: false,
    whatsIncluded: [
      'Thermal heat protectant prep',
      'Blow-dry volume & curl/wave setting',
      'Crown puff or side-pinned detailing',
      'Shine serum & long-hold setting spray',
    ],
    serviceProcess: [
      '01. Hair length & hold assessment',
      '02. Sectioned thermal curling / waving',
      '03. Cooling & brush-out shaping',
      '04. Final setting & shine finish',
    ],
  },

  // E. NAIL SERVICES (4 Services)
  {
    id: 'srv-temporary-nail-extension',
    name: 'Temporary Nail Extension',
    category: 'Nail Services',
    shortSubtitle: 'Quick, event-ready temporary nail extensions customized to your outfit.',
    description:
      'Ideal for weddings, parties, and short events when you want instant nail length and glamour without long-term commitment.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-nails.png',
    iconName: 'sparkles',
    isPopular: false,
    whatsIncluded: [
      'Natural nail cleansing & buffing',
      'Custom tip sizing & secure application',
      'Shaping (almond, coffin, square, oval)',
      'Gel polish colour & glossy top coat',
    ],
    serviceProcess: [
      '01. Nail prep & tip size matching',
      '02. Tip attachment & length trimming',
      '03. Smooth blending & colour application',
      '04. Top coat seal & cuticle oil',
    ],
  },
  {
    id: 'srv-acrylic-nail-extension',
    name: 'Acrylic Nail Extension',
    category: 'Nail Services',
    shortSubtitle: 'Durable, sculpted acrylic nail extensions for strong length and structure.',
    description:
      'Long-wearing acrylic extensions built for strength, clean apex structure, and flawless colour or nail art application.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-nails.png',
    iconName: 'sparkles',
    isPopular: false,
    whatsIncluded: [
      'Cuticle prep & nail plate dehydrator/primer',
      'Tip/form extension & acrylic bead sculpting',
      'Precision filing, shaping & buffing',
      'Gel colour coat & high-shine UV/LED top coat',
    ],
    serviceProcess: [
      '01. Hygienic cuticle & nail prep',
      '02. Acrylic sculpting & apex building',
      '03. Precision shaping & surface refinement',
      '04. Colour/art application & curing',
    ],
  },
  {
    id: 'srv-gel-nail-extension',
    name: 'Gel Nail Extension',
    category: 'Nail Services',
    shortSubtitle: 'Lightweight, natural-feeling builder gel nail extensions with glossy finish.',
    description:
      'Flexible, lightweight gel extensions cured under UV/LED light for a natural look and comfortable wear.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-nails.png',
    iconName: 'sparkles',
    isPopular: false,
    whatsIncluded: [
      'Nail plate prep & base coat curing',
      'Builder gel extension sculpting',
      'Custom shape filing & refining',
      'Gel polish shade & protective top seal',
    ],
    serviceProcess: [
      '01. Sanitized prep & base coat',
      '02. Gel building & UV/LED curing',
      '03. Shaping & smooth buffing',
      '04. Colour coat & cuticle nourishment',
    ],
  },
  {
    id: 'srv-nail-art-any-designs',
    name: 'Nail Art / Any Designs',
    category: 'Nail Services',
    shortSubtitle: 'Custom nail art including French tips, chrome, ombre, glitter, 3D, and bridal motifs.',
    description:
      'Bespoke nail art designs hand-crafted to match your bridal lehenga, festive attire, or personal everyday style.',
    priceLabel: 'Price on Enquiry',
    image: '/assets/sonu/service-nails.png',
    iconName: 'sparkles',
    isPopular: false,
    whatsIncluded: [
      'Design & colour palette consultation',
      'Base gel polish preparation',
      'Custom hand-painted, chrome, glitter, or 3D art',
      'Long-lasting protective top coat cure',
    ],
    serviceProcess: [
      '01. Reference design & shade selection',
      '02. Base colour application & cure',
      '03. Detailed nail art execution',
      '04. Protective top coat & cuticle care',
    ],
  },
];

// Combined service list so both the 6 homepage featured cards and all 36 catalog services can be booked
export const POPULAR_SERVICES: ServiceItem[] = [
  ...HOMEPAGE_POPULAR_SERVICES,
  ...COMPLETE_BEAUTY_SERVICES,
];

export const ALL_SERVICE_IDS = POPULAR_SERVICES.map((s) => s.id);

export const INITIAL_LOCATIONS: StudioLocation[] = [
  {
    id: 'location-1',
    location_name: 'Sonu’s Beauty Studio & Academy — Location 1',
    branch_label: 'Branch 1 — Main Studio & Academy',
    address: "Sonu's Beauty Studio and Academy, Vadodara, Gujarat",
    city: 'Vadodara',
    state: 'Gujarat',
    pincode: 'Contact for PIN',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'sonusbeautystudio@gmail.com',
    google_maps_url:
      'https://www.google.com/maps/search/?api=1&query=Sonu%27s+Beauty+Studio+and+Academy+Vadodara+Gujarat',
    latitude: null,
    longitude: null,
    opening_time: '10:00',
    closing_time: '20:00',
    active: true,
    available_services: [...ALL_SERVICE_IDS],
    image_url: '/assets/sonu/salon-interior.png',
    exterior_image_url: '/assets/sonu/hero-reception.png',
    interior_image_url: '/assets/sonu/salon-interior.png',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-11-12T00:00:00.000Z',
  },
  {
    id: 'location-2',
    location_name: 'Sonu’s Beauty Studio & Academy — Location 2',
    branch_label: 'Branch 2 — Second Studio & Training Branch',
    address: 'Vadodara, Gujarat',
    city: 'Vadodara',
    state: 'Gujarat',
    pincode: 'Contact for PIN',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'sonusbeautystudio@gmail.com',
    google_maps_url: 'https://www.google.com/maps?q=22.305021,73.210297',
    latitude: 22.305021,
    longitude: 73.210297,
    opening_time: '10:00',
    closing_time: '20:00',
    active: true,
    available_services: [...ALL_SERVICE_IDS],
    image_url: '/assets/sonu/hero-reception.png',
    exterior_image_url: '/assets/sonu/hero-reception.png',
    interior_image_url: '/assets/sonu/salon-interior.png',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-11-12T00:00:00.000Z',
  },
];

// SECTION 7: SONU'S BEAUTY ACADEMY — COMPLETE 9-COURSE CATALOG
export const ACADEMY_COURSES: TrainingCourse[] = [
  {
    id: 'academy-basic-course',
    title: 'Basic Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Foundational beauty parlour and salon course designed for beginners starting their journey in professional grooming, threading, waxing, basic skin care, and hair care.',
    image: '/assets/sonu/service-threading.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Supervised daily studio practice covering client setup, hygiene discipline, threading, waxing, basic clean-ups, and foundational hair care.',
    whatStudentsWillLearn: [
      'Eyebrow, upper lip & forehead threading techniques',
      'Hygienic hand & leg waxing procedures',
      'Basic manicure, pedicure & shiner/bleach application',
      'Foundational facial steps, head massage & basic haircuts',
    ],
    modules: [
      'Module 1: Salon Hygiene, Tool Sanitization & Client Consultation',
      'Module 2: Precision Threading (Eyebrow, Upper Lips, Forehead)',
      'Module 3: Hand & Leg Waxing Techniques',
      'Module 4: Basic Clean-up, Shiner/Bleach, Facial & Massage',
      'Module 5: Basic Manicure, Pedicure & Hair Wash/Trimming',
    ],
  },
  {
    id: 'academy-advanced-course',
    title: 'Advanced Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Comprehensive advanced salon mastery program covering specialized facials, advanced hair cuts, chemical treatments, bridal makeup coordination, and salon management.',
    image: '/assets/sonu/salon-interior.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Intensive hands-on demonstrations and live practice on advanced skin treatments, multi-layer haircuts, chemical smoothing/keratin, and bridal readiness.',
    whatStudentsWillLearn: [
      'Advanced skin analysis & customized facial therapies',
      'Layered, feathered, and modern precision haircuts',
      'Hair spa, keratin, smoothing & colour application workflows',
      'Complete client consultation & studio service management',
    ],
    modules: [
      'Module 1: Advanced Skin Diagnostics & Custom Facial Protocols',
      'Module 2: Advanced Hair Cutting & Thermal Styling',
      'Module 3: Hair Treatments (Keratin, Smoothing, Protein, Nanoplasty)',
      'Module 4: Party & Bridal Makeover Coordination',
      'Module 5: Salon Workflow & Professional Client Handling',
    ],
  },
  {
    id: 'academy-mehendi-course',
    title: 'Mehendi Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Structured artistic training in traditional Indian, Arabic, Indo-Arabic, festive, and full-hand bridal Mehendi cone control and pattern composition.',
    image: '/assets/sonu/service-nails.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Step-by-step practice on practice sheets and hands covering cone preparation, pressure control, fine lines, shading, and bridal palm/foot layouts.',
    whatStudentsWillLearn: [
      'Mehendi paste preparation, filtering & cone rolling',
      'Basic lines, dots, leaves, vines, paisleys & mandalas',
      'Arabic, contemporary festive & full bridal Mehendi designs',
      'Bridal figures, portrait motifs & symmetrical hand/foot layouts',
    ],
    modules: [
      'Module 1: Cone Making, Grip & Pressure Control',
      'Module 2: Foundational Elements, Borders & Fillers',
      'Module 3: Arabic, Floral & Festive Pattern Flow',
      'Module 4: Intricate Bridal Palm, Back-Hand & Foot Composition',
    ],
  },
  {
    id: 'academy-nails-course',
    title: 'Nails Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Specialized nail technician course covering nail anatomy, dry/wet manicure prep, temporary, acrylic, and gel nail extensions, and creative nail art.',
    image: '/assets/sonu/service-nails.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Hands-on practice on practice hands and live nail models for tip sizing, builder gel, acrylic sculpting, e-file safety, and nail art designs.',
    whatStudentsWillLearn: [
      'Nail anatomy, cuticle prep & tool sterilization',
      'Temporary, Acrylic & Gel Nail Extension application',
      'Filing shapes: square, oval, almond, coffin &iletto',
      'French tips, ombre, chrome, glitter, 3D & custom nail art',
    ],
    modules: [
      'Module 1: Nail Anatomy, Hygiene & Natural Nail Preparation',
      'Module 2: Temporary & Gel Nail Extensions + UV/LED Curing',
      'Module 3: Acrylic Nail Extensions, Refills & Safe Removal',
      'Module 4: Brush Work, Chrome, Ombre & Bridal Nail Art Designs',
    ],
  },
  {
    id: 'academy-chemical-course',
    title: 'Chemical Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Dedicated hair chemical training covering hair structure, smoothing, keratin treatment, KeraSmooth, protein treatment, nanoplasty, root touchup, global colour, and highlights.',
    image: '/assets/sonu/service-treatments.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Guided salon floor training on strand testing, chemical mixing ratios, sectioning, heat sealing temperatures, colour wheel theory, and foil placement.',
    whatStudentsWillLearn: [
      'Hair porosity, elasticity & strand test diagnostics',
      'Smoothing, Keratin, KeraSmooth, Protein & Nanoplasty procedures',
      'Colour theory, developer volumes, Root Touchup & Global Hair Colour',
      'Foil Highlights, toning & post-chemical hair care',
    ],
    modules: [
      'Module 1: Hair Science, Porosity & Chemical Safety Protocols',
      'Module 2: Smoothing, Keratin, KeraSmooth & Nanoplasty Workflows',
      'Module 3: Colour Wheel, Root Touchup & Global Hair Colouring',
      'Module 4: Highlights, Pre-Lightening & Post-Treatment Care',
    ],
  },
  {
    id: 'academy-makeup-course',
    title: 'Makeup Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Complete makeup artistry curriculum covering skin prep, colour correction, Self Makeup, Society Look, Haldi Look, Party Wear, Reception, and Bridal Makeup.',
    image: '/assets/sonu/service-makeup.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Live model demonstrations and supervised practice across diverse skin tones, eye shapes, lighting conditions, jewellery setting, and saree/dupatta draping.',
    whatStudentsWillLearn: [
      'Skin type analysis, priming & undertone colour matching',
      'Self Makeup, Society Look & daytime Haldi Look techniques',
      'Bridal Makeup, Reception Makeup & Party Wear Makeup artistry',
      'Eye shadow blending, lash application, contouring & draping',
    ],
    modules: [
      'Module 1: Skin Preparation, Undertones, Brushes & Hygiene',
      'Module 2: Base Blending, Colour Correction, Contour & Highlight',
      'Module 3: Haldi, Society Look & Party Wear Makeup',
      'Module 4: Traditional & HD Bridal + Reception Look Mastery',
    ],
  },
  {
    id: 'academy-hairstyles-course',
    title: 'Hairstyles Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Focused hairstyling mastery covering sectioning, backcombing, thermal curling, Low Bun / Loban, Messy Bun, traditional & modern Braids, and Open Hair Hairstyles.',
    image: '/assets/sonu/service-hair.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Hands-on mannequin and live-hair practice on crimping, padding, pin concealment, floral Gajra setting, and long-lasting bridal and party hairstyles.',
    whatStudentsWillLearn: [
      'Hair prep, blow-dry volume, crimping & thermal tool control',
      'Sculpted Low Bun / Loban & traditional bridal buns',
      'Textured Messy Bun & Indo-western updos',
      'Bridal Braids, Open Hair waves/curls & floral/accessory setting',
    ],
    modules: [
      'Module 1: Sectioning, Backcombing, Padding & Pinning Techniques',
      'Module 2: Low Bun / Loban & Traditional Bridal Updos',
      'Module 3: Messy Bun & Contemporary Reception Hairstyles',
      'Module 4: Braids, Open Hair Curls/Waves & Accessory Placement',
    ],
  },
  {
    id: 'academy-pmu-course',
    title: 'PMU / Permanent Makeup Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Specialized introductory and advanced orientation in PMU (Permanent Makeup) brow mapping, pigment theory, hygiene standards, and precision practice.',
    image: '/assets/sonu/academy-instructor.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Structured practice on brow symmetry mapping, skin depth awareness, latex practice pads, strict sanitation protocols, and client consultation.',
    whatStudentsWillLearn: [
      'Facial morphology & golden-ratio brow mapping',
      'PMU hygiene, sterilization & safety compliance',
      'Pigment undertones, needle/tool handling on practice skins',
      'Pre-care and post-procedure client instructions',
    ],
    modules: [
      'Module 1: PMU Safety, Sanitation & Contraindication Screening',
      'Module 2: Brow Mapping, Symmetry & Facial Proportions',
      'Module 3: Pigment Selection & Latex Pad Technique Practice',
      'Module 4: Client Consultation & Post-Care Protocols',
    ],
  },
  {
    id: 'academy-eyelashes-course',
    title: 'Eyelashes Course',
    division: 'academy',
    category: 'Beauty Academy — Professional Courses',
    description:
      'Focused training in eyelash styling, eye-shape mapping, classic and volume lash extension application, lash lifting, and safe removal techniques.',
    image: '/assets/sonu/service-makeup.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Precision tweezer isolation, lash mapping, adhesive control, under-eye pad placement, and safe refill/removal practice.',
    whatStudentsWillLearn: [
      'Natural lash cycle, eye-shape analysis & lash mapping',
      'Tweezer control, lash isolation & adhesive safety',
      'Classic, hybrid & volume lash application techniques',
      'Safe lash removal, hygiene & client aftercare guidance',
    ],
    modules: [
      'Module 1: Eye Anatomy, Safety, Patch Testing & Workstation Setup',
      'Module 2: Lash Curl, Length, Thickness & Eye-Shape Mapping',
      'Module 3: Isolation, Placement & Bonding Practice',
      'Module 4: Infills, Safe Removal & Aftercare Instructions',
    ],
  },
];

// SECTION 9: SONU FOUNDATION AND CHARITABLE TRUST — 3 TRAINING PROGRAM CATEGORIES
export const FOUNDATION_COURSES: TrainingCourse[] = [
  {
    id: 'foundation-beauty-training',
    title: 'Beauty Training Classes',
    division: 'foundation',
    category: 'Beauty Training Classes',
    description:
      'Skill-development beauty training conducted under Sonu Foundation and Charitable Trust covering basic beauty training, professional makeup, hair styling, skin care, nail art, and practical salon skills.',
    image: '/assets/sonu/service-threading.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Classroom and studio practice sessions designed to build hands-on confidence in everyday salon services and client care.',
    whatStudentsWillLearn: [
      'Basic beauty training: threading, waxing & bleach/shiner',
      'Skin care: clean-ups, facials & hygienic massage techniques',
      'Hair styling & professional makeup fundamentals',
      'Nail art basics, salon skills & practical beauty training',
    ],
    modules: [
      'Basic beauty training & salon hygiene discipline',
      'Professional makeup & festive styling basics',
      'Hair styling, braids, buns & basic hair care',
      'Skin care, facials, manicure, pedicure & nail art',
      'Practical salon skills & client etiquette',
    ],
  },
  {
    id: 'foundation-stitching-tailoring',
    title: 'Stitching and Tailoring Classes',
    division: 'foundation',
    category: 'Stitching & Tailoring Classes',
    description:
      'Practical vocational tailoring program under Sonu Foundation and Charitable Trust covering basic stitching, sewing machine training, basic tailoring, dress designing, and garment-making skills.',
    image: '/assets/sonu/salon-interior.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Guided classroom practice on measurement taking, paper drafting, fabric layout, sewing machine control, and complete garment construction.',
    whatStudentsWillLearn: [
      'Basic stitching: hand hems, buttons, hooks, seams & darts',
      'Sewing machine training: threading, bobbin control & maintenance',
      'Basic tailoring: accurate body measurements & pattern drafting',
      'Dress designing, practical stitching & garment-making skills',
    ],
    modules: [
      'Basic stitching & fabric handling fundamentals',
      'Sewing machine training & seam accuracy',
      'Basic tailoring, measurements & paper pattern drafting',
      'Dress designing & everyday garment-making skills',
      'Practical stitching & neat garment finishing',
    ],
  },
  {
    id: 'foundation-computer-classes',
    title: 'Computer Classes',
    division: 'foundation',
    category: 'Computer Classes',
    description:
      'Essential digital literacy and office productivity classes under Sonu Foundation and Charitable Trust covering computer fundamentals, MS Word, MS Excel, MS PowerPoint, internet basics, and digital skills.',
    image: '/assets/sonu/hero-reception.png',
    duration: 'Contact for Details',
    fees: 'Contact for Details',
    eligibility: 'Contact for Details',
    batchTimings: 'Contact for Details',
    certificateInfo: 'Contact for Details',
    practicalTraining:
      'Hands-on computer lab exercises in typing, folder organization, document formatting, spreadsheet formulas, slide creation, and safe internet usage.',
    whatStudentsWillLearn: [
      'Computer fundamentals & basic computer operations',
      'MS Word: document creation, formatting, tables & page layout',
      'MS Excel: spreadsheets, data entry, tables & basic formulas',
      'MS PowerPoint, internet basics & everyday digital skills',
    ],
    modules: [
      'Computer fundamentals & basic desktop/file operations',
      'MS Word: letters, resumes, formatting & printing',
      'MS Excel: data tables, billing sheets & basic formulas',
      'MS PowerPoint: creating clean slide presentations',
      'Internet basics, email communication & safe digital skills',
    ],
  },
];

export const TRAINING_COURSES: TrainingCourse[] = [
  ...ACADEMY_COURSES,
  ...FOUNDATION_COURSES,
];

// SECTION 11: ALL 11 GALLERY CATEGORIES
export const GALLERY_CATEGORIES: GalleryCategoryName[] = [
  'Beauty Studio',
  'Makeup Work',
  'Hair Styling',
  'Nail Art',
  'Academy Training',
  'Beauty Students',
  'Stitching Classes',
  'Computer Classes',
  'Student Certificates',
  'Foundation Activities',
  'Branch Photographs',
];

export const GALLERY_MEDIA: GalleryMediaItem[] = [
  {
    id: 'gal-beauty-studio-1',
    title: "Sonu's Beauty Studio — Main Styling Floor",
    category: 'Beauty Studio',
    image: '/assets/sonu/salon-interior.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Warm illuminated mirrors, floral accents, and hygienic styling stations at our Vadodara studio.',
  },
  {
    id: 'gal-makeup-work-1',
    title: 'Traditional Bridal Makeup & Jewellery Styling',
    category: 'Makeup Work',
    image: '/assets/sonu/service-makeup.png',
    aspect: 'portrait',
    fitMode: 'cover',
    caption: 'Bridal makeover with custom eye artistry, flawless base, and traditional jewellery styling.',
  },
  {
    id: 'gal-makeup-work-2',
    title: 'Bridal, Haldi & Reception Makeover Showcase',
    category: 'Makeup Work',
    image: '/assets/sonu/service-makeup.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Customized bridal, reception, and party makeup looks executed at our studio.',
  },
  {
    id: 'gal-hair-styling-1',
    title: 'Precision Hair Styling, Buns & Smoothing',
    category: 'Hair Styling',
    image: '/assets/sonu/service-hair.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Professional haircuts, open hair waves, low buns, and festive hairstyling.',
  },
  {
    id: 'gal-hair-styling-2',
    title: 'Keratin, Smoothing & Nourishing Hair Spa',
    category: 'Hair Styling',
    image: '/assets/sonu/service-treatments.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Hair spa, keratin, KeraSmooth, protein, and nanoplasty treatment care.',
  },
  {
    id: 'gal-nail-art-1',
    title: 'Temporary, Acrylic & Gel Nail Extensions + Art',
    category: 'Nail Art',
    image: '/assets/sonu/service-nails.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Precision nail extensions, burgundy gel polish, and custom nail art designs.',
  },
  {
    id: 'gal-academy-training-1',
    title: 'Beauty Academy Hands-On Makeup Mentorship',
    category: 'Academy Training',
    image: '/assets/sonu/academy-instructor.png',
    aspect: 'portrait',
    fitMode: 'contain',
    caption: 'Practical brush technique and course mentorship at Sonu’s Beauty Academy.',
  },
  {
    id: 'gal-beauty-students-1',
    title: 'Skin Care, Facial & Threading Practical Session',
    category: 'Beauty Students',
    image: '/assets/sonu/service-facial.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Practical skin care, facial, and threading training for Beauty Academy students.',
  },
  {
    id: 'gal-stitching-classes-1',
    title: 'Sonu Foundation — Stitching & Tailoring Classroom',
    category: 'Stitching Classes',
    image: '/assets/sonu/salon-interior.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Practical training in basic stitching, sewing machine control, pattern drafting, and garment making.',
  },
  {
    id: 'gal-computer-classes-1',
    title: 'Sonu Foundation — Computer Education & Digital Skills',
    category: 'Computer Classes',
    image: '/assets/sonu/hero-reception.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Foundational computer operations, MS Word, MS Excel, MS PowerPoint, and internet skills training.',
  },
  {
    id: 'gal-student-certificates-1',
    title: "Sonu's Beauty Studio & Academy Complete Overview",
    category: 'Student Certificates',
    image: '/assets/aistudio/ChatGPT_Image_Nov_1__2026__07_00_46_PM_2e4a7db9.png',
    aspect: 'landscape',
    fitMode: 'contain',
    caption: 'Full view of our signature services, studio interior, and academy training showcase (un-cropped contain view).',
  },
  {
    id: 'gal-foundation-activities-1',
    title: 'Sonu Foundation — Skill Development Walkthrough',
    category: 'Foundation Activities',
    image: '/assets/sonu/hero-banner.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: 'Overview of community skill-building batches across Beauty, Stitching & Tailoring, and Computer Classes.',
    isVideo: true,
    videoDuration: '02:15',
  },
  {
    id: 'gal-branch-photographs-1',
    title: 'Signature Reception & Consultation Lounge — Vadodara',
    category: 'Branch Photographs',
    image: '/assets/sonu/hero-reception.png',
    aspect: 'landscape',
    fitMode: 'cover',
    caption: "Reception and consultation area at Sonu's Beauty Studio & Academy in Vadodara, Gujarat.",
    isVideo: true,
    videoDuration: '01:45',
  },
];

// Client & Student Stories (Truthful, non-fabricated qualitative stories)
export const CLIENT_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Bridal & Reception Makeup Client',
    role: 'Beauty Studio Client · Vadodara',
    service: 'Bridal & Reception Makeup',
    rating: 5,
    comment:
      'Booked engagement and bridal makeup at Sonu’s Beauty Studio. The skin prep and base stayed natural and comfortable throughout the ceremony, with attentive hygiene and draping support.',
  },
  {
    id: 'rev-2',
    name: 'Regular Salon Client',
    role: 'Beauty Studio Client · Vadodara',
    service: 'Facial, Waxing & Hair Spa',
    rating: 5,
    comment:
      'Clean studio environment and polite staff. Their facial, threading, and nourishing hair spa treatments are relaxing and performed with great care.',
  },
  {
    id: 'rev-3',
    name: 'Beauty Academy Trainee',
    role: 'Sonu’s Beauty Academy · Vadodara',
    service: 'Basic, Makeup & Hairstyles Course',
    rating: 5,
    comment:
      'Every module from threading and waxing to bridal makeup and hairstyling is taught with step-by-step practical supervision rather than just theory.',
  },
  {
    id: 'rev-4',
    name: 'Foundation Skill Program Learner',
    role: 'Sonu Foundation and Charitable Trust',
    service: 'Stitching, Tailoring & Computer Classes',
    rating: 5,
    comment:
      'The supportive classroom environment under Sonu Foundation helps learners practice sewing machine control, garment cutting, and basic computer operations with confidence.',
  },
];
