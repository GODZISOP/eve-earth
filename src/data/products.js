import jarDailyReserve from '../images/eve-jar-daily-reserve.png';
import jarDailyGreens from '../images/eve-jar-daily-greens.png';
import jarOmega3 from '../images/eve-jar-omega3.png';
import jarProbiotic from '../images/eve-jar-probiotic.png';

export const categories = [
  {
    id: 'daily-synbiotics',
    name: 'Daily Reserve',
    description: 'Clinically studied foundational botanical reserve for whole-body daily vitality.',
    buttonText: 'Shop Daily Reserve',
    link: '#',
    image: jarDailyReserve,
    itemCount: 1
  },
  {
    id: 'superfood-greens',
    name: 'Daily Greens',
    description: 'Concentrated superfood greens blend engineered for clean energy, immunity, and focus.',
    buttonText: 'Shop Daily Greens',
    link: '#',
    image: jarDailyGreens,
    itemCount: 1
  },
  {
    id: 'omega-vitality',
    name: 'Omega-3 Vitality',
    description: 'High-purity golden Omega-3 softgels supporting heart, brain, and joint mobility.',
    buttonText: 'Shop Omega-3',
    link: '#',
    image: jarOmega3,
    itemCount: 1
  },
  {
    id: 'probiotic-care',
    name: 'Probiotic Gut Care',
    description: 'Targeted multi-strain probiotic formulation for digestion, immunity, and microbiome balance.',
    buttonText: 'Shop Probiotic',
    link: '#',
    image: jarProbiotic,
    itemCount: 1
  }
];

export const products = [
  {
    id: 1,
    name: 'Daily Botanical Reserve',
    category: 'daily-synbiotics',
    categoryName: 'Daily Reserve',
    sku: 'EE-01™',
    badge: 'Bestseller',
    isFeaturedHighlight: false,
    price: '$ 49.99',
    priceNumeric: 49.99,
    priceSubtext: 'Starting at $49.99 per month',
    packSize: '30-Day Matte Glass Refillable Jar (60 Capsules)',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 4200,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 284,
    priceNote: 'Direct Origin & Wholesale Tiers Available',
    image: jarDailyReserve,
    link: '#',
    description: 'Foundational daily botanical reserve formulated with precision-sourced plant actives for sustained cellular balance and digestive resilience.',
    longDescription: 'Crafted by EVE EARTH using verified botanical extracts and precision encapsulation. Designed for daily whole-body support, transparent origin traceability, and reliable global retail & wholesale fulfillment.',
    features: [
      'Dual-action botanical & prebiotic formulation engineered for optimal bioavailability',
      'Refillable UV-shielded matte forest-green glass vessel preserves potency',
      '100% vegan, non-GMO, and free from artificial fillers or synthetic binders',
      'Third-party laboratory batch tested for purity and active concentration',
      'Available in single retail units and commercial wholesale cartons'
    ],
    tiers: [
      { range: '1 - 19 Units', price: '$ 49.99', discount: 'Retail Base' },
      { range: '20 - 99 Units', price: '$ 39.00', discount: '22% Wholesale' },
      { range: '100+ Units', price: '$ 31.00', discount: '38% Commercial Pallet' }
    ],
    specs: [
      { label: 'SKU Code', value: 'EE-01™' },
      { label: 'Serving Supply', value: '30-Day Supply (60 Capsules)' },
      { label: 'Vessel', value: 'UV-Protective Matte Green Glass' },
      { label: 'Certifications', value: 'GMP, Non-GMO, Vegan Certified' }
    ]
  },
  {
    id: 2,
    name: 'Daily Greens',
    category: 'superfood-greens',
    categoryName: 'Daily Greens',
    sku: 'DG-02™',
    badge: 'New',
    isFeaturedHighlight: false,
    price: '$ 39.99',
    priceNumeric: 39.99,
    priceSubtext: 'Starting at $39.99 per month',
    packSize: '30 Capsules • Superfood Blend Dietary Supplement',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 3800,
    minOrder: '1 Unit',
    rating: 4.9,
    reviewCount: 162,
    priceNote: 'Direct Origin & Wholesale Tiers Available',
    image: jarDailyGreens,
    link: '#',
    description: 'Concentrated superfood greens blend combining organic spirulina, chlorella, and adaptogenic botanicals for clean daily energy, immunity, and focus.',
    longDescription: 'Formulated by EVE EARTH to deliver dense phytonutrients without gritty powders. Each green capsule delivers cold-processed leaf extracts and trace minerals for steady energy and mental clarity.',
    features: [
      'Supports natural daily energy, immune defense, and cognitive focus',
      'Cold-processed superfood leaf concentrates preserve heat-sensitive chlorophyll',
      'Convenient 30-capsule glass jar eliminates messy green powders',
      'Zero added sugars, caffeine-free sustained daytime vitality',
      'Batch-verified for heavy-metal and potency compliance'
    ],
    tiers: [
      { range: '1 - 19 Units', price: '$ 39.99', discount: 'Retail Base' },
      { range: '20 - 99 Units', price: '$ 31.50', discount: '21% Wholesale' },
      { range: '100+ Units', price: '$ 24.50', discount: '39% Commercial Pallet' }
    ],
    specs: [
      { label: 'SKU Code', value: 'DG-02™' },
      { label: 'Net Quantity', value: '30 Capsules' },
      { label: 'Core Benefits', value: 'Energy • Immunity • Focus' },
      { label: 'Storage', value: 'Cool, dry place (no refrigeration)' }
    ]
  },
  {
    id: 3,
    name: 'Omega-3',
    category: 'omega-vitality',
    categoryName: 'Omega-3 Vitality',
    sku: 'OM-03™',
    badge: 'New',
    isFeaturedHighlight: true,
    price: '$ 34.99',
    priceNumeric: 34.99,
    priceSubtext: 'Starting at $34.99 per month',
    packSize: '30 Golden Softgels • Heart & Brain Health',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 4500,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 219,
    priceNote: 'Direct Origin & Wholesale Tiers Available',
    image: jarOmega3,
    link: '#',
    description: 'High-potency golden Omega-3 softgels supporting cardiovascular endurance, sharp cognitive function, and smooth joint mobility.',
    longDescription: 'Molecularly purified Omega-3 reserve by EVE EARTH engineered for zero fishy aftertaste and superior EPA/DHA absorption. Bottled in crystal-clear UV-filtered glass with airtight forest-green sealing.',
    features: [
      'Targeted support for Heart, Brain, and Joint health in easy-swallow softgels',
      'Molecularly distilled for ultra-high purity and rapid cellular absorption',
      'Clean lemon-botanical finish with zero unpleasant aftertaste',
      'Independently assayed for oxidation freshness and potency',
      'Ready for direct retail shelves and bulk partner orders'
    ],
    tiers: [
      { range: '1 - 19 Units', price: '$ 34.99', discount: 'Retail Base' },
      { range: '20 - 99 Units', price: '$ 27.50', discount: '21% Wholesale' },
      { range: '100+ Units', price: '$ 21.50', discount: '39% Commercial Pallet' }
    ],
    specs: [
      { label: 'SKU Code', value: 'OM-03™' },
      { label: 'Net Quantity', value: '30 Softgels' },
      { label: 'Core Benefits', value: 'Heart • Brain • Joint' },
      { label: 'Formulation', value: 'Ultra-Pure Golden Softgel' }
    ]
  },
  {
    id: 4,
    name: 'Probiotic',
    category: 'probiotic-care',
    categoryName: 'Probiotic Gut Care',
    sku: 'PR-04™',
    badge: 'New',
    isFeaturedHighlight: false,
    price: '$ 34.99',
    priceNumeric: 34.99,
    priceSubtext: 'Starting at $34.99 per month',
    packSize: '30 Capsules • Gut Health Support',
    availability: 'In Stock (Ready to Dispatch)',
    stockUnits: 4100,
    minOrder: '1 Unit',
    rating: 4.9,
    reviewCount: 194,
    priceNote: 'Direct Origin & Wholesale Tiers Available',
    image: jarProbiotic,
    link: '#',
    description: 'Delayed-release probiotic capsules engineered for digestion comfort, immune resilience, and daily microbiome balance.',
    longDescription: 'EVE EARTH Probiotic delivers clinically studied active strains protected inside moisture-locked botanical capsules so live cultures reach the digestive tract intact without refrigeration.',
    features: [
      'Formulated for Digestion Support, Immunity Support, and Daily Microbiome Balance',
      'Acid-resistant outer capsule shields live cultures through stomach transit',
      'Shelf-stable glass jar engineered for effortless travel and retail storage',
      'Free from dairy, gluten, soy, and artificial preservatives',
      'Full batch traceability and commercial wholesale tier support'
    ],
    tiers: [
      { range: '1 - 19 Units', price: '$ 34.99', discount: 'Retail Base' },
      { range: '20 - 99 Units', price: '$ 27.50', discount: '21% Wholesale' },
      { range: '100+ Units', price: '$ 21.50', discount: '39% Commercial Pallet' }
    ],
    specs: [
      { label: 'SKU Code', value: 'PR-04™' },
      { label: 'Net Quantity', value: '30 Capsules' },
      { label: 'Core Benefits', value: 'Digestion • Immunity • Balance' },
      { label: 'Shelf Stability', value: '24 Months Room Temp' }
    ]
  }
];
