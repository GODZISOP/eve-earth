import defaultLogo from '../images/eve-earth-logo.svg';

/**
 * =========================================================================
 * EVE EARTH — GLOBAL SITE CONFIGURATION (CENTRAL CONTROL PANEL)
 * =========================================================================
 */

export const siteConfig = {
  // ─────────────────────────────────────────────
  // COMPANY IDENTITY
  // ─────────────────────────────────────────────
  companyName:     "EVE EARTH",
  shortName:       "EVE EARTH",
  legalName:       "EVE EARTH LLC",
  tagline:         "Curated Global Essentials & Wholesale Trade",
  heroSubtitle:    "Direct origin sourcing, dependable global supply chains, and elevated everyday essentials curated by EVE EARTH.",
  eyebrowStandard: "THE EVE EARTH STANDARD OF EXCELLENCE",

  // ─────────────────────────────────────────────
  // PHONE, WHATSAPP & EMAIL
  // ─────────────────────────────────────────────
  phonePrimary:    "+92 321 8754939",
  phonePrimaryTel: "+923218754939",
  phoneDirect:     "+92 321 8754939",
  phoneDirectTel:  "+923218754939",
  whatsappNumber:  "923218754939",
  whatsappDisplay: "+92 321 8754939",
  email:           "info@evearthllc.com",
  website:         "www.evearthllc.com",

  // ─────────────────────────────────────────────
  // ADDRESS & HUBS
  // ─────────────────────────────────────────────
  address: {
    line1:        "Global Distribution & Trade Desk",
    line2:        "North America & International Logistics",
    full:         "EVE EARTH Global Distribution Hub",
    cityStateZip: "Global Trade & Fulfillment Desk",
    jurisdiction: "Commercial LLC Registered"
  },
  hubs: {
    originText:   "Dispatched via Global Logistics & Origin Hubs",
    dispatchNote: "Dispatched from our primary fulfillment centers and international trade hubs."
  },

  // ─────────────────────────────────────────────
  // ABOUT US PAGE
  // ─────────────────────────────────────────────
  about: {
    mission:      "At EVE EARTH, our mission is to deliver thoughtfully sourced everyday essentials, connecting ethical international manufacturers with retailers, commercial distributors, and discerning households worldwide. Built on transparency, craft, and trade excellence, we bridge global origins and modern living.",
    b2bNote:      "Whether you operate boutique retail spaces, supermarket chains, or e-commerce storefronts, EVE EARTH provides flexible minimums, tiered wholesale pricing, and dependable fulfillment.",
    sourcingNote: "We pride ourselves on intentional sourcing — selecting products with authentic materials, enduring utility, and verifiable quality for retail and wholesale partners worldwide.",
    cards: [
      {
        title:       "Origin Transparency",
        description: "Clear pricing, verified factory provenance, and certified product authenticity."
      },
      {
        title:       "Logistics Agility",
        description: "Streamlined customs clearance, reliable freight carriers, and multi-hub dispatch."
      },
      {
        title:       "Partner Centric",
        description: "Dedicated account managers ready to accommodate custom order volumes and schedules."
      }
    ],
    ctaButton: "Contact Trade Desk"
  },

  // ─────────────────────────────────────────────
  // CONTACT US PAGE
  // ─────────────────────────────────────────────
  contact: {
    sectionTag:   "GET IN TOUCH",
    tagline:      "We are at your service for catalog requests, partnership discussions, or general inquiries.",
    cardTitle:    "Direct Coordinates",
    formTitle:    "Send Us a Message",
    formSuccess:  "Thank you! Your message has been received by EVE EARTH. We will reply within 24 hours.",
    labels: {
      email:      "Email",
      phone:      "Phone Number",
      hub:        "Operating Trade Hub",
      whatsapp:   "WhatsApp Chat",
      management: "Management"
    }
  },

  // ─────────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────────
  footer: {
    description:        "Thoughtfully curated everyday essentials. Direct origin sourcing and global distribution with transparent logistics.",
    operationsLabel:    "Global Distribution & Wholesale Trade Hub",
    newsletterTagline:  "Receive exclusive seasonal drops, wholesale price updates, and catalog releases.",
    newsletterSuccess:  "✓ Thank you for subscribing to the EVE EARTH bulletin!",
    copyrightSuffix:    "All rights reserved.",
    managedByLabel:     "Global Logistics & Distribution Hub",
    websiteUrl:         "https://www.evearthllc.com",
    domain:             "evearthllc.com",
    socials: [
      { label: "Facebook",  url: "https://facebook.com/" },
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "TikTok",    url: "https://tiktok.com/" }
    ],
    menu: [
      { label: "Home",    tab: "home" },
      { label: "Shop",    tab: "home", scrollTo: "featured-products-section" },
      { label: "About",   tab: "about" },
      { label: "Contact", tab: "contact" }
    ]
  },

  // ─────────────────────────────────────────────
  // TESTIMONIAL
  // ─────────────────────────────────────────────
  testimonial: {
    quote:  "Partnering with EVE EARTH transformed our retail inventory turnover. Authentic craftsmanship, fast fulfillment, and seamless communication.",
    author: "Verified Commercial Trade Partner"
  },

  // ─────────────────────────────────────────────
  // CURRENCY & LOGO
  // ─────────────────────────────────────────────
  currencySymbol: "$",
  logo: defaultLogo,

  // ─────────────────────────────────────────────
  // COLOR THEME (Botanical Forest Pine & Sage)
  // ─────────────────────────────────────────────
  theme: {
    primaryNavy:   "#132417",
    secondaryTeal: "#1d3824",
    accentTeal:    "#165227",
    accentHover:   "#0f3c1c",
    accentGold:    "#4f874a",
    bgLight:       "#f6f9f4"
  }
};
