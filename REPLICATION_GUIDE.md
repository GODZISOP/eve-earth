# 🚀 10 Websites Fast Clone Guide (Only 2 Files to Edit!)

Ab aapko `App.jsx` mein 2000 lines dhoondhne ki zaroorat nahi hai. Humne website ko **Centralized Config System** par shift kar diya hai.

Har nayi website ke liye aapko **sirf yeh 2 files** edit karni hain:
1. `src/data/siteConfig.js` — (Company Name, Phone, Email, Address, Theme Colors, Logo)
2. `src/data/products.js` — (Products, Images, Prices, Categories)

---

## ⚡ 5-Minute Quick Workflow (Har Nayi Website Ke Liye)

### Step 1: Naya Project Folder Banayein
1. Is pure project folder ko copy karein aur naye naam se paste karein (e.g. `website-2`, `website-3` ya client ka naam).
2. Naye folder ko VS Code mein open karein.

---

### Step 2: `src/data/siteConfig.js` Mein Data Badlein (2 Minutes)
File: `src/data/siteConfig.js`

Is file ko open karein aur naye client ki details enter karein:

```javascript
export const siteConfig = {
  // 🏢 Company Details
  companyName: "Nayi Company Ka Naam LLC",
  shortName: "Nayi Company",
  legalName: "NAYI COMPANY KA NAAM LLC",
  tagline: "Wholesale, Electronics & Global Trade",
  heroSubtitle: "Quality products, fast international delivery, and trusted service.",
  eyebrowStandard: "THE NAYI COMPANY STANDARD",

  // 📞 Phone, WhatsApp & Email
  phonePrimary: "(+966) 50 123 4567",
  phonePrimaryTel: "+966501234567",
  phoneDirect: "(+966) 59 123 4567",
  phoneDirectTel: "+966591234567",
  whatsappNumber: "966591234567",         // Sirf numbers, no '+' or spaces
  whatsappDisplay: "(+966) 59 123 4567",
  email: "info@nayicompany.com",

  // 📍 Address
  address: {
    line1: "123 Business Boulevard, Suite 400",
    line2: "Sheridan, WY 82801",
    full: "123 Business Boulevard, Suite 400, Sheridan, WY 82801",
    cityStateZip: "Sheridan, WY 82801",
    jurisdiction: "Wyoming LLC Registered"
  },

  // 🚚 Warehousing & Hubs
  hubs: {
    originText: "Dispatched via US & Global Trade Hubs",
    dispatchNote: "Dispatched from our primary US distribution center and Middle East trade hubs."
  },

  // 🎨 Website Theme Colors (Har website ka color alag rakhein!)
  // Option A (Royal Blue):
  // theme: { primaryNavy: "#0f172a", secondaryTeal: "#1e3a8a", accentTeal: "#2563eb", accentHover: "#1d4ed8" }
  // Option B (Emerald Green):
  // theme: { primaryNavy: "#062c26", secondaryTeal: "#0d5c4d", accentTeal: "#059669", accentHover: "#047857" }
  // Option C (Luxury Gold):
  // theme: { primaryNavy: "#18181b", secondaryTeal: "#27272a", accentTeal: "#d97706", accentHover: "#b45309" }
  theme: {
    primaryNavy: "#0c1a2e",
    secondaryTeal: "#134e5e",
    accentTeal: "#0d9488",
    accentHover: "#0f766e"
  }
};
```

---

### Step 3: `src/data/products.js` Mein Products Aur Images Badlein (2 Minutes)
File: `src/data/products.js`

1. **Categories Badlein**:
```javascript
export const categories = [
  {
    id: 'beverages',
    name: 'Beverages & Juices',
    description: 'Bulk wholesale organic juices and drinks.',
    buttonText: 'Shop Beverages',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    itemCount: 1
  }
];
```

2. **Products Badlein**:
```javascript
export const products = [
  {
    id: 1,
    name: 'Naye Product Ka Naam',
    category: 'beverages',
    categoryName: 'Beverages & Juices',
    sku: 'PRD-001',
    price: '₨ 25',
    priceNumeric: 25,
    packSize: 'Master Carton (24 units)',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    description: 'Short summary here.',
    longDescription: 'Detailed commercial description here.',
    features: ['100% Certified', 'Export Grade Packaging']
  }
];
```

> 💡 **Image Tip**: Unsplash.com se koi bhi high-quality product image link copy kar ke direct `image: '...'` mein paste kar sakte hain!

---

### Step 4: Logo Change Karein (Optional)
- Naye client ka logo `src/images/` folder mein paste karein.
- `src/data/siteConfig.js` ke top par import update karein:
  ```javascript
  import defaultLogo from '../images/naya-logo.png';
  ```

---

### Step 5: Test Karein Aur Deploy Karein

```bash
# 1. Local test karein
npm run dev

# 2. Production build check karein
npm run build
```

**Deploy to Vercel/Netlify:**
1. Naya GitHub repository banayein aur code push karein:
   ```bash
   git init
   git add .
   git commit -m "Launch new website"
   git branch -M main
   git remote add origin https://github.com/APNA_USERNAME/NAYA_REPO.git
   git push -u origin main
   ```
2. [Vercel](https://vercel.com) par **"Add New Project"** click karein aur apna GitHub repo select karein.
3. **Deploy** button click karein — Website 30 seconds mein live ho jayegi!
