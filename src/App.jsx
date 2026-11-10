import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Search, ArrowRight, CheckCircle2, 
  Send, ExternalLink, ShieldCheck, Truck, Award,
  X, MessageSquare, Layers, Building2, ShoppingCart, Menu as MenuIcon,
  Plus, Minus, Trash2, ShoppingBag, Eye, ArrowLeft, Check,
  LayoutGrid, Sparkles, ChevronDown, Package, Star, Globe, ArrowUpRight
} from 'lucide-react';
import { categories, products } from './data/products';
import { siteConfig } from './data/siteConfig';
import logoImg from './images/eve-earth-logo.svg';
import heroEarthBg from './images/hero-earth-ring.jpg';
import eveShowcaseGroup from './images/eve-showcase-group.jpg';
import eveShowcaseJar from './images/eve-showcase-jar.jpg';
import eveHandCapsules from './images/eve-hand-capsules.jpg';
import eveTrioJars from './images/eve-trio-jars.jpg';
import eveContactPortrait from './images/eve-contact-portrait.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [modalType, setModalType] = useState(null); // 'partner', 'quote', 'supplier', 'checkout', null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cart & Product Detail state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('eve_earth_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState('description');
  const [toastMessage, setToastMessage] = useState(null);
  const [activePillar, setActivePillar] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);

  const formulationPillars = [
    {
      num: '01',
      title: 'Cold-Extracted Botanicals',
      desc: 'Unheated, solvent-free extraction preserves live plant chlorophyll, enzymes, and delicate polyphenols from harvest to capsule.',
      badge: 'RAW PHYTONUTRIENT GRADE',
      metricValue: '99.4%',
      metricLabel: 'Verified Active Purity',
      image: eveHandCapsules
    },
    {
      num: '02',
      title: 'Delayed-Release Delivery',
      desc: 'Precision acid-resistant botanical capsules protect sensitive probiotic strains and micronutrients safely through gastric transit.',
      badge: 'TARGETED BIOAVAILABILITY',
      metricValue: '24B+',
      metricLabel: 'Live Active Cultures',
      image: eveShowcaseGroup
    },
    {
      num: '03',
      title: 'UV-Shielded Glass & Origin Proof',
      desc: 'Every batch is sealed in refillable UV-protective forest glass, third-party lab assayed, and dispatched globally within 24–48 hours.',
      badge: 'GMP & ISO TRACEABILITY',
      metricValue: '24–48h',
      metricLabel: 'Express Global Dispatch',
      image: eveShowcaseJar
    }
  ];

  const partnerQuotes = [
    {
      quote: 'Switching our wellness shelves to EVE EARTH Daily Reserve and Probiotic doubled our repeat monthly customer orders.',
      author: 'Adil Al-Ghamdi',
      role: 'Wellness Retail Group • Riyadh'
    },
    {
      quote: 'The matte forest glass vessels and clean batch traceability make EVE EARTH stand out effortlessly on every apothecary counter.',
      author: 'Amina Tariq',
      role: 'Botanical Apothecary • Lahore'
    },
    {
      quote: siteConfig.testimonial.quote,
      author: 'Kamran Malik',
      role: siteConfig.testimonial.author
    }
  ];

  // Apply theme & document title & browser favicon from siteConfig
  useEffect(() => {
    if (siteConfig.theme) {
      const root = document.documentElement;
      if (siteConfig.theme.primaryNavy) root.style.setProperty('--primary-navy', siteConfig.theme.primaryNavy);
      if (siteConfig.theme.secondaryTeal) root.style.setProperty('--secondary-teal', siteConfig.theme.secondaryTeal);
      const accent = siteConfig.theme.accentTeal || siteConfig.theme.accentGold;
      if (accent) {
        root.style.setProperty('--accent-teal', accent);
        root.style.setProperty('--accent-brown', accent);
      }
      if (siteConfig.theme.accentHover) {
        root.style.setProperty('--accent-teal-hover', siteConfig.theme.accentHover);
        root.style.setProperty('--accent-brown-hover', siteConfig.theme.accentHover);
      }
      if (siteConfig.theme.bgLight) {
        root.style.setProperty('--bg-light', siteConfig.theme.bgLight);
      }
    }
    if (siteConfig.companyName) {
      document.title = siteConfig.companyName + (siteConfig.tagline ? ' | ' + siteConfig.tagline : '');
    }
    const faviconLink = document.querySelector("link[rel*='icon']");
    if (faviconLink && siteConfig.logo) {
      faviconLink.href = siteConfig.logo;
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eve_earth_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Filter & sort products
  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
    if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'latest') return b.id - a.id;
    return 0;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, qty = 1, openDrawer = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added ${qty}x ${product.name} to cart!`);
    if (openDrawer) {
      setCartOpen(true);
    }
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.priceNumeric * item.quantity), 0);

  const viewProductDetail = (product) => {
    setActiveProduct(product);
    setDetailQuantity(1);
    setActiveDetailTab('description');
    setActiveTab('product-detail');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (product) => {
    setSelectedProduct(product);
    setModalType('quote');
    setFormSubmitted(false);
  };

  const handleOpenPartner = (type = 'partner') => {
    setModalType(type);
    setFormSubmitted(false);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
    setFormSubmitted(false);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const navigateTo = (tabName, categoryId = null) => {
    if (tabName === 'contact') {
      setActiveTab('home');
      setMobileMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById('contact-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }
    setActiveTab(tabName);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('featured-products-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen eve-app-shell">
      {/* CLEAN ARCHITECTURAL HEADER MATCHING HERO CANVAS */}
      <header className={`site-header eve-minimal-header ${activeTab === 'home' ? 'eve-header-over-hero' : ''}`}>
        <div className="main-nav">
          <div className="nav-brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <img src={siteConfig.logo || logoImg} alt={`${siteConfig.companyName} Logo`} className="brand-logo-img" />
            <div>
              <div className="brand-title">{siteConfig.companyName}</div>
              <div className="brand-subtitle">{siteConfig.tagline}</div>
            </div>
          </div>

          {/* Center Clean Uppercase Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <button 
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  HOME
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'shop' ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
                >
                  COLLECTION
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => navigateTo('about')}
                >
                  ABOUT
                </button>
              </li>
              <li className="nav-dropdown-wrapper">
                <button 
                  className={`nav-link ${(activeTab === 'partnerships' || activeTab === 'business' || activeTab === 'supplier') ? 'active' : ''}`}
                  onClick={() => navigateTo('partnerships')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>WHOLESALE</span>
                  <ChevronDown size={13} style={{ opacity: 0.7 }} />
                </button>
                <div className="nav-dropdown-menu">
                  <button 
                    className={`nav-dropdown-item ${activeTab === 'partnerships' ? 'active' : ''}`}
                    onClick={() => navigateTo('partnerships')}
                  >
                    Wholesale Partnerships
                  </button>
                  <button 
                    className={`nav-dropdown-item ${activeTab === 'business' ? 'active' : ''}`}
                    onClick={() => navigateTo('business')}
                  >
                    Our Commercial Services
                  </button>
                  <button 
                    className={`nav-dropdown-item ${activeTab === 'supplier' ? 'active' : ''}`}
                    onClick={() => navigateTo('supplier')}
                  >
                    Supplier Inquiries
                  </button>
                </div>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => navigateTo('contact')}
                >
                  CONTACT
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="nav-actions">
            <button 
              className="btn-nav-cart"
              onClick={() => setCartOpen(true)}
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart size={17} />
              <span className="nav-cart-text">CART</span>
              {totalCartItems > 0 && (
                <span className="nav-cart-badge">{totalCartItems}</span>
              )}
            </button>

            <button 
              className="btn-nav-partner"
              onClick={() => handleOpenPartner('partner')}
            >
              <span>GET STARTED</span>
            </button>

            <button 
              className={`mobile-toggle-btn ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU ACCORDION / DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <img src={siteConfig.logo || logoImg} alt="Logo" className="mobile-drawer-logo" />
                <div>
                  <div className="mobile-drawer-title">{siteConfig.companyName}</div>
                  <div className="mobile-drawer-subtitle">{siteConfig.tagline}</div>
                </div>
              </div>
              <button 
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-section">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCartOpen(true);
                }}
                className="mobile-cart-btn"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingCart size={18} />
                  <span>Shopping Cart</span>
                </span>
                <span className="nav-cart-badge">{totalCartItems}</span>
              </button>
            </div>

            <div className="mobile-drawer-section">
              <div className="mobile-section-label">Navigation</div>
              {[
                { key: 'home', label: 'Home' },
                { key: 'about', label: 'About Us' },
                { key: 'business', label: 'Our Services' },
                { key: 'partnerships', label: 'Wholesale Partnerships' },
                { key: 'supplier', label: 'Supplier Inquiries' },
                { key: 'contact', label: 'Contact Us' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => navigateTo(item.key)}
                  className={`mobile-nav-link ${activeTab === item.key ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mobile-drawer-section">
              <div className="mobile-section-label">Product Categories</div>
              <button
                onClick={() => handleCategoryClick('all')}
                className={`mobile-nav-link ${selectedCategory === 'all' && activeTab === 'home' ? 'active' : ''}`}
              >
                <LayoutGrid size={16} />
                <span>All Products ({products.length})</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`mobile-nav-link ${selectedCategory === cat.id && activeTab === 'home' ? 'active' : ''}`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            <div className="mobile-drawer-footer">
              <button 
                className="btn-hero-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenPartner('partner');
                }}
              >
                Partner Today
              </button>
              <div className="mobile-drawer-contact">
                <a href={`tel:${siteConfig.phonePrimaryTel}`} className="mobile-contact-link">
                  <Phone size={14} />
                  <span>{siteConfig.phonePrimary}</span>
                </a>
                <a href={`mailto:${siteConfig.email}`} className="mobile-contact-link">
                  <Mail size={14} />
                  <span>{siteConfig.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: HOME PAGE */}
      {activeTab === 'home' && (
        <main>
          {/* FIRST SECTION: ARCHITECTURAL BOTANICAL HERO MATCHING REFERENCE UI */}
          <section
            className="hero-section eve-hero-canvas"
            style={{ backgroundImage: `url(${heroEarthBg})` }}
          >
            <div className="eve-hero-scrim" aria-hidden="true"></div>
            <div className="eve-hero-inner">
              {/* Top Row: Bold 3-Line Display Headline (Left) + Editorial Note (Right) */}
              <div className="eve-hero-top-row">
                <h1 className="eve-hero-display">
                  CURATED FUTURE<br />
                  OF GLOBAL<br />
                  ESSENTIALS
                </h1>
                <p className="eve-hero-side-copy">
                  Direct Origin Sourcing, Verified Wholesale Supply, And Elevated Everyday Essentials Curated Worldwide.
                </p>
              </div>

              {/* Bottom Row: Square Deep-Green Tile + Floating White Editorial Card + Moss Stat */}
              <div className="eve-hero-bottom-row">
                <button
                  type="button"
                  className="eve-hero-square-cta"
                  onClick={() => {
                    const el = document.getElementById('featured-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ArrowUpRight size={20} className="eve-square-arrow" />
                  <span className="eve-square-label">
                    EXPLORE<br />CATALOG
                  </span>
                </button>

                <div
                  className="eve-hero-white-card"
                  onClick={() => {
                    setSelectedCategory('all');
                    navigateTo('shop');
                  }}
                >
                  <div className="eve-white-card-copy">
                    <h3>EVE EARTH ESSENTIALS</h3>
                    <p>
                      Discover Direct-From-Origin Smart Tech, Botanical Care, Home &amp; Gourmet Reserves.
                    </p>
                    <span className="eve-white-card-cta">
                      Browse Collection <ArrowRight size={13} />
                    </span>
                  </div>
                  <div className="eve-white-card-media">
                    <img
                      src={products[4]?.image || products[0].image}
                      alt="EVE EARTH Smart & Botanical Line"
                      loading="eager"
                    />
                  </div>
                </div>

                <div className="eve-hero-stat-block">
                  <div className="eve-hero-stat-num">100%</div>
                  <div className="eve-hero-stat-sub">
                    VERIFIED ORIGIN &amp;<br />
                    GLOBAL QUALITY
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECOND SECTION: BOTANICAL PRODUCT BENTO SHOWCASE */}
          <section className="eve-botanical-bento-section">
            <div className="eve-bento-container">
              {/* Top Full-Width Product Group Banner */}
              <div className="eve-bento-top-card">
                <img
                  src={eveShowcaseGroup}
                  alt="EVE EARTH Botanical Formulation Lineup"
                  className="eve-bento-top-img"
                  loading="lazy"
                />
                <button
                  type="button"
                  className="eve-bento-see-btn"
                  onClick={() => {
                    const el = document.getElementById('featured-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See products
                </button>
              </div>

              {/* Middle Centered Editorial Statement Strip */}
              <div className="eve-bento-mid-banner">
                <h2 className="eve-bento-mid-title">Healthy Living, Naturally Curated</h2>
                <p className="eve-bento-mid-sub">Explore Our Innovations</p>
              </div>

              {/* Bottom 2-Column Split Grid: Bestseller Jar Card + Hand Capsules Photo */}
              <div className="eve-bento-bottom-grid">
                {/* Left Card: Bestseller Jar */}
                <div className="eve-bento-jar-card">
                  <span className="eve-bento-bestseller-pill">Bestseller</span>
                  <img
                    src={eveShowcaseJar}
                    alt="EVE-01 Botanical Daily Reserve"
                    className="eve-bento-jar-img"
                    loading="lazy"
                  />
                  <div className="eve-bento-jar-scrim" aria-hidden="true"></div>
                  <div className="eve-bento-jar-content">
                    <div className="eve-bento-jar-title-row">
                      <span className="eve-bento-sku-pill">EVE-01</span>
                      <h3>Daily Botanical Reserve</h3>
                    </div>
                    <p>
                      Pure origin formulations crafted for daily vitality, cellular support, and dependable wholesale availability.
                    </p>
                    <div className="eve-bento-jar-actions">
                      <button
                        type="button"
                        className="eve-bento-shop-btn"
                        onClick={() => {
                          setSelectedCategory('all');
                          navigateTo('shop');
                        }}
                      >
                        Shop Now
                      </button>
                      <button
                        type="button"
                        className="eve-bento-learn-btn"
                        onClick={() => navigateTo('about')}
                      >
                        <ExternalLink size={13} />
                        <span>Learn more</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Card: Hand Holding Botanical Capsules */}
                <div className="eve-bento-hand-card">
                  <img
                    src={eveHandCapsules}
                    alt="Botanical capsules held in open hand"
                    className="eve-bento-hand-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* THIRD SECTION: NEW FROM EVE EARTH (3-JAR EDITORIAL SHOWCASE) */}
          <section className="eve-new-from-section">
            <div className="eve-new-from-card">
              <div className="eve-new-from-left">
                <h2>New From EVE EARTH</h2>
              </div>
              <div className="eve-new-from-center">
                <img
                  src={eveTrioJars}
                  alt="New From EVE EARTH Botanical Trio"
                  className="eve-new-from-img"
                  loading="lazy"
                />
              </div>
              <div className="eve-new-from-right">
                <p>
                  Targeted nutrition, energy, and daily balance designed for your body and modern living.
                </p>
              </div>
            </div>
          </section>

          {/* FOURTH SECTION: DARK FOREST BOTANICAL PRODUCT LINEUP */}
          <section id="featured-products-section" className="eve-dark-products-section">
            <div className="eve-dark-products-inner">
              {/* Top Header Row: Left Headline + Right Copy & Shop All Link */}
              <div className="eve-dark-products-header">
                <h2 className="eve-dark-products-heading">
                  Whole body health starts<br />
                  with EVE EARTH.
                </h2>
                <div className="eve-dark-products-subwrap">
                  <p className="eve-dark-products-sub">
                    Formulations that provide fast-acting and sustained support using scientifically and clinically studied ingredients.
                  </p>
                  <button
                    type="button"
                    className="eve-dark-shop-all-link"
                    onClick={() => {
                      setSelectedCategory('all');
                      navigateTo('shop');
                    }}
                  >
                    <span>Shop All</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* 4-Card Staggered Botanical Product Grid */}
              <div className="eve-dark-products-grid">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className={`eve-dark-prod-card ${prod.isFeaturedHighlight ? 'is-elevated' : ''}`}
                    onClick={() => viewProductDetail(prod)}
                  >
                    <span className={`eve-dark-prod-badge ${prod.badge === 'Bestseller' ? 'is-bestseller' : 'is-new'}`}>
                      {prod.badge || 'New'}
                    </span>

                    <div className="eve-dark-prod-top">
                      <span className="eve-dark-sku-pill">{prod.sku}</span>
                      <h3 className="eve-dark-prod-title">{prod.name}</h3>
                    </div>

                    <div className="eve-dark-prod-img-wrap">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="eve-dark-prod-img"
                        loading="lazy"
                      />
                    </div>

                    <div className="eve-dark-prod-footer">
                      <button
                        type="button"
                        className={`eve-dark-shop-btn ${prod.isFeaturedHighlight ? 'is-white' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod, 1, true);
                        }}
                      >
                        <span>Shop Now</span>
                        {prod.isFeaturedHighlight && <ArrowRight size={14} />}
                      </button>
                      <div className="eve-dark-price-sub">
                        {prod.priceSubtext || `Starting at ${prod.price} per month`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FIFTH SECTION: LIVING BOTANICAL SCIENCE & PARTNER PROOF */}
          <section className="eve-living-science-section">
            <div className="eve-science-container">
              {/* Interactive Formulation Pillars Grid */}
              <div className="eve-science-grid">
                <div className="eve-science-left">
                  <span className="eve-science-kicker">PRECISION BOTANICALS</span>
                  <h2 className="eve-science-heading">
                    Formulated to survive,<br />
                    <em>built to restore.</em>
                  </h2>
                  <p className="eve-science-lead">
                    Every capsule and softgel is crafted around measurable bioavailability, clean origin provenance, and glass-sealed freshness.
                  </p>

                  <div className="eve-pillars-list">
                    {formulationPillars.map((pillar, idx) => {
                      const isActive = activePillar === idx;
                      return (
                        <button
                          key={pillar.num}
                          type="button"
                          className={`eve-pillar-item ${isActive ? 'is-active' : ''}`}
                          onClick={() => setActivePillar(idx)}
                        >
                          <div className="eve-pillar-head">
                            <span className="eve-pillar-num">{pillar.num}</span>
                            <span className="eve-pillar-title">{pillar.title}</span>
                            <ArrowUpRight size={16} className="eve-pillar-arrow" />
                          </div>
                          <p className="eve-pillar-desc">{pillar.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Dynamic Visual Spotlight */}
                <div className="eve-science-right">
                  <div className="eve-science-visual-card">
                    <img
                      src={formulationPillars[activePillar].image}
                      alt={formulationPillars[activePillar].title}
                      className="eve-science-visual-img"
                    />
                    <div className="eve-science-visual-scrim" aria-hidden="true"></div>
                    <div className="eve-science-live-pill">
                      <span className="eve-live-pulse"></span>
                      <span>{formulationPillars[activePillar].badge}</span>
                    </div>

                    <div className="eve-science-bottom-bar">
                      <div className="eve-science-metric">
                        <strong>{formulationPillars[activePillar].metricValue}</strong>
                        <span>{formulationPillars[activePillar].metricLabel}</span>
                      </div>
                      <button
                        type="button"
                        className="eve-science-cta-btn"
                        onClick={() => {
                          setSelectedCategory('all');
                          navigateTo('shop');
                        }}
                      >
                        <span>Explore Formulas</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Partner Spotlight & Direct Trade Desk */}
              <div className="eve-proof-split">
                <div className="eve-quote-spotlight">
                  <div className="eve-quote-top-bar">
                    <span className="eve-quote-kicker">VERIFIED PARTNERS</span>
                    <div className="eve-quote-switcher">
                      {partnerQuotes.map((q, idx) => (
                        <button
                          key={q.author}
                          type="button"
                          className={`eve-quote-dot-btn ${activeQuote === idx ? 'is-active' : ''}`}
                          onClick={() => setActiveQuote(idx)}
                          aria-label={`View quote from ${q.author}`}
                        >
                          0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <blockquote className="eve-quote-text">
                    “{partnerQuotes[activeQuote].quote}”
                  </blockquote>

                  <div className="eve-quote-meta">
                    <div>
                      <strong>{partnerQuotes[activeQuote].author}</strong>
                      <span>{partnerQuotes[activeQuote].role}</span>
                    </div>
                    <div className="eve-quote-stars" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#165227" color="#165227" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="eve-trade-desk-card">
                  <span className="eve-trade-kicker">WHOLESALE &amp; CUSTOM ORDERS</span>
                  <h3>Ready to stock EVE EARTH in your stores?</h3>
                  <p>
                    Flexible retail MOQs, volume tier pricing, and tracked international dispatch directly from our trade desk.
                  </p>
                  <div className="eve-trade-actions">
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello ${siteConfig.companyName}, I would like wholesale pricing and catalog details.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="eve-trade-wa-btn"
                    >
                      <MessageSquare size={15} />
                      <span>WhatsApp {siteConfig.phoneDirect}</span>
                    </a>
                    <button
                      type="button"
                      className="eve-trade-partner-btn"
                      onClick={() => handleOpenPartner('partner')}
                    >
                      <span>Apply as Partner</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: CONTACT EVE EARTH (SPLIT BOTANICAL EDITORIAL) */}
          <section id="contact-section" className="eve-contact-split-section">
            <div className="eve-contact-split-grid">
              {/* LEFT PANEL: LUMINOUS SAGE ATMOSPHERIC CONTACT DESK */}
              <div className="eve-contact-split-left">
                <div className="eve-contact-glass-nav">
                  <div className="eve-contact-glass-brand">
                    <img src={siteConfig.logo || logoImg} alt={siteConfig.companyName} />
                    <span>{siteConfig.companyName}</span>
                  </div>
                  <a href={`tel:${siteConfig.phoneDirectTel}`} className="eve-contact-glass-phone">
                    <Phone size={14} />
                    <span>{siteConfig.phoneDirect}</span>
                  </a>
                </div>

                <div className="eve-contact-left-body">
                  <h2 className="eve-contact-serif-title">
                    Always here when<br />
                    you need us.
                  </h2>
                  <p className="eve-contact-lead">
                    {siteConfig.companyName} is your 24/7 trade &amp; wellness desk. Connect directly for wholesale catalogs, custom orders, or product inquiries.
                  </p>

                  <form onSubmit={handleFormSubmit} className="eve-contact-pill-form">
                    <div className="eve-contact-pill-row">
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        className="eve-contact-pill-input"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className="eve-contact-pill-input"
                      />
                    </div>
                    <div className="eve-contact-pill-bar">
                      <input
                        type="text"
                        required
                        placeholder="Write your message or wholesale inquiry..."
                        className="eve-contact-bar-input"
                      />
                      <button type="submit" className="eve-contact-pill-submit">
                        Send Message
                      </button>
                    </div>
                  </form>

                  {formSubmitted && (
                    <div className="eve-contact-success-pill">
                      ✓ Thank you! Received by {siteConfig.companyName}. We will reply within 24 hours.
                    </div>
                  )}

                  <div className="eve-contact-direct-meta">
                    <a href={`mailto:${siteConfig.email}`}>
                      <Mail size={14} />
                      <span>{siteConfig.email}</span>
                    </a>
                    <span>•</span>
                    <a href={`tel:${siteConfig.phoneDirectTel}`}>
                      <Phone size={14} />
                      <span>{siteConfig.phoneDirect}</span>
                    </a>
                    <span>•</span>
                    <a
                      href={`https://${siteConfig.website.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Globe size={14} />
                      <span>{siteConfig.website}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL: EDITORIAL BOTANICAL PORTRAIT + FLOATING GLASS CARDS */}
              <div className="eve-contact-split-right">
                <img
                  src={eveContactPortrait}
                  alt="EVE EARTH Natural Botanical Wellness"
                  className="eve-contact-portrait-img"
                  loading="lazy"
                />
                <div className="eve-contact-portrait-scrim" aria-hidden="true"></div>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello ${siteConfig.companyName}, I would like to connect with your trade desk.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="eve-contact-top-cta"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Desk</span>
                </a>

                <div className="eve-contact-quote-glass">
                  <p>"{siteConfig.testimonial.quote}"</p>
                  <div className="eve-contact-quote-author">
                    <span className="eve-quote-dot"></span>
                    <span>{siteConfig.testimonial.author}</span>
                  </div>
                </div>

                <div className="eve-contact-pills-stack">
                  <span className="eve-contact-feature-pill">Direct Origin Sourcing</span>
                  <span className="eve-contact-feature-pill">Wholesale &amp; Retail Tiers</span>
                  <span className="eve-contact-feature-pill">24/7 Partner Support</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW: SHOP ALL PRODUCTS CATALOG */}
      {activeTab === 'shop' && (
        <div className="section-wrapper" style={{ padding: '40px 24px 80px' }}>
          {/* Breadcrumb & Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#64748b', marginBottom: '14px' }}>
              <button 
                onClick={() => navigateTo('home')} 
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
              >
                Home
              </button>
              <span>/</span>
              <span style={{ color: 'var(--primary-navy)', fontWeight: '600' }}>Shop All Products</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 className="section-title" style={{ margin: '0 0 8px' }}>
                  All Products & Wholesale Catalog
                </h1>
                <p style={{ color: '#64748b', margin: 0, fontSize: '0.98rem' }}>
                  Explore verified consumer essentials, direct-from-source wholesale stock, and flexible commercial tiers.
                </p>
              </div>
              <div style={{ background: '#f1f5f9', padding: '6px 14px', borderRadius: '20px', fontSize: '0.88rem', fontWeight: '600', color: '#334155' }}>
                Showing {filteredProducts.length} of {products.length} Products
              </div>
            </div>
          </div>

          {/* Filtering & Search Toolbar */}
          <div style={{ 
            background: '#fff', 
            padding: '20px', 
            borderRadius: '16px', 
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)', 
            border: '1px solid #e2e8f0',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button
                className={`blue-cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Products ({products.length})
              </button>
              {categories.map((cat) => {
                const count = products.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    className={`blue-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '260px', maxWidth: '420px' }}>
                <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search products by title, SKU, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '500' }}>Sort By:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    background: '#fff',
                    color: '#1e293b',
                    cursor: 'pointer'
                  }}
                >
                  <option value="default">Featured / Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                  <option value="latest">Latest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Package size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '8px' }}>No products match your search</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Try searching with different keywords or clear your active category filters.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="btn-hero-primary"
                style={{ padding: '10px 24px', fontSize: '0.9rem' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="featured-grid-four">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="clean-product-card">
                  <div 
                    className="clean-product-img-wrap"
                    onClick={() => viewProductDetail(prod)}
                  >
                    <img src={prod.image} alt={prod.name} className="clean-product-img" loading="lazy" />
                    <span className="card-badge-stock">{prod.availability ? 'In Stock' : 'Ready'}</span>
                    <span className="card-badge-sku">{prod.sku}</span>
                    <span className="card-quick-view-pill">
                      <Eye size={13} />
                      <span>Quick View</span>
                    </span>
                  </div>
                  <div className="clean-product-body">
                    <div className="card-category-pill">{prod.categoryName}</div>
                    <h3 className="clean-product-title" onClick={() => viewProductDetail(prod)}>
                      {prod.name}
                    </h3>
                    <div className="card-rating-row">
                      <div className="card-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill="var(--accent-gold)" color="var(--accent-gold)" />
                        ))}
                      </div>
                      <span className="card-rating-num">{prod.rating.toFixed(1)}</span>
                      <span className="card-reviews-num">({prod.reviewCount})</span>
                    </div>
                    <div className="card-price-row">
                      <span className="clean-product-price">{prod.price}</span>
                      <span className="card-price-tier">Wholesale tier</span>
                    </div>
                    <div className="card-action-row">
                      <button 
                        className="btn-clean-add-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod, 1, true);
                        }}
                      >
                        <ShoppingBag size={16} />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        className="btn-card-quote-icon"
                        title="Request Wholesale Quote"
                        aria-label={`Request quote for ${prod.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenQuote(prod);
                        }}
                      >
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW: PRODUCT DETAIL PAGE */}
      {activeTab === 'product-detail' && activeProduct && (
        <div className="product-detail-page">
          <div className="detail-container">
            
            {/* Top Breadcrumbs & Back Button */}
            <div className="detail-top-nav">
              <button 
                className="btn-back-catalog" 
                onClick={() => navigateTo('home')}
              >
                <ArrowLeft size={16} />
                <span>Back to Wholesale Catalog</span>
              </button>
              <div className="detail-breadcrumbs">
                <span onClick={() => navigateTo('home')} className="crumb-link">Home</span>
                <span className="crumb-sep">/</span>
                <span 
                  onClick={() => { setSelectedCategory(activeProduct.category); navigateTo('home'); }} 
                  className="crumb-link"
                >
                  {activeProduct.categoryName}
                </span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{activeProduct.name}</span>
              </div>
            </div>

            {/* Main Product Showcase Grid */}
            <div className="detail-showcase-grid">
              
              {/* Left Column: Visual Showcase & Quality Badges */}
              <div className="detail-gallery-col">
                <div className="detail-img-card">
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name} 
                    className="detail-hero-img" 
                  />
                  <div className="detail-badge-float">{activeProduct.categoryName}</div>
                  <div className="detail-verified-badge">
                    <ShieldCheck size={16} />
                    <span>100% Genuine Wholesale Batch</span>
                  </div>
                </div>

                {/* Quality & Assurance Badges */}
                <div className="detail-assurance-strip">
                  <div className="assurance-item">
                    <Truck size={18} className="assurance-icon" />
                    <div>
                      <strong>Fast B2B Dispatch</strong>
                      <span>{siteConfig.hubs.originText}</span>
                    </div>
                  </div>
                  <div className="assurance-item">
                    <Award size={18} className="assurance-icon" />
                    <div>
                      <strong>Quality Inspected</strong>
                      <span>Verified under {siteConfig.companyName} management</span>
                    </div>
                  </div>
                  <div className="assurance-item">
                    <Building2 size={18} className="assurance-icon" />
                    <div>
                      <strong>{siteConfig.address.jurisdiction}</strong>
                      <span>Verified Corporate Wholesale Partner — {siteConfig.legalName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Commercial Product Information & Add to Cart */}
              <div className="detail-info-col">
                <div className="detail-meta-row">
                  <span className="detail-sku-badge">SKU: {activeProduct.sku}</span>
                  <span className="detail-stock-badge">
                    <span className="stock-pulsing-dot"></span>
                    {activeProduct.availability} ({activeProduct.stockUnits?.toLocaleString() || '1,000+'} units available)
                  </span>
                </div>

                <h1 className="detail-product-title">{activeProduct.name}</h1>

                <div className="detail-reviews-row">
                  <div className="star-rating">★★★★★</div>
                  <span className="rating-score">{activeProduct.rating}</span>
                  <span className="review-count">({activeProduct.reviewCount || 35} verified B2B partner reviews)</span>
                </div>

                <div className="detail-price-panel">
                  <div className="detail-price-row">
                    <div className="detail-unit-price">
                      <span className="price-currency">{activeProduct.price}</span>
                      <span className="price-per">/ unit</span>
                    </div>
                    <div className="detail-price-note">
                      <span className="tax-tag">Wholesale Net</span>
                      <span>{activeProduct.priceNote}</span>
                    </div>
                  </div>
                  <div className="detail-moq-row">
                    <span>Minimum Wholesale Order (MOQ):</span>
                    <strong>{activeProduct.minOrder}</strong>
                  </div>
                </div>

                {/* Wholesale Volume Tier Table */}
                {activeProduct.tiers && activeProduct.tiers.length > 0 && (
                  <div className="wholesale-tiers-box">
                    <div className="tiers-title">Wholesale Volume Pricing Tiers:</div>
                    <div className="tiers-grid">
                      {activeProduct.tiers.map((tier, idx) => (
                        <div key={idx} className="tier-card">
                          <div className="tier-qty">{tier.range}</div>
                          <div className="tier-price">{tier.price} <small>/ unit</small></div>
                          <div className="tier-discount">{tier.discount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="detail-lead-summary">{activeProduct.description}</p>

                {/* Key Features Bullet Points */}
                {activeProduct.features && (
                  <div className="detail-features-box">
                    <h3 className="features-title">Product Highlights:</h3>
                    <ul className="features-list">
                      {activeProduct.features.map((feat, idx) => (
                        <li key={idx}>
                          <Check size={16} className="feature-check" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Purchase & Cart Actions */}
                <div className="detail-purchase-panel">
                  <div className="qty-row">
                    <label className="qty-label">Wholesale Quantity:</label>
                    <div className="qty-stepper">
                      <button 
                        type="button" 
                        className="stepper-btn"
                        onClick={() => setDetailQuantity(q => Math.max(1, q - 1))}
                      >
                        <Minus size={16} />
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={detailQuantity} 
                        onChange={(e) => setDetailQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="stepper-input"
                      />
                      <button 
                        type="button" 
                        className="stepper-btn"
                        onClick={() => setDetailQuantity(q => q + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="subtotal-preview">
                      Subtotal: <strong>{siteConfig.currencySymbol || "$"} {(activeProduct.priceNumeric * detailQuantity).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="detail-actions-grid">
                    <button 
                      className="btn-detail-add-cart"
                      onClick={() => addToCart(activeProduct, detailQuantity, true)}
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart ({detailQuantity} Units)</span>
                    </button>

                    <a 
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello ${siteConfig.companyName}, I want to order ${detailQuantity}x ${activeProduct.name} (SKU: ${activeProduct.sku}, Total: ${siteConfig.currencySymbol || "$"}${(activeProduct.priceNumeric * detailQuantity).toLocaleString()}).`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-detail-whatsapp"
                    >
                      <MessageSquare size={18} />
                      <span>WhatsApp Direct Order</span>
                    </a>
                  </div>

                  <div className="detail-secondary-actions">
                    <button 
                      className="btn-detail-rfq"
                      onClick={() => handleOpenQuote(activeProduct)}
                    >
                      <span>Request Formal Wholesale Quote / Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Contact Help Strip */}
                <div className="detail-help-strip">
                  <span>Questions about bulk orders?</span>
                  <a href={`tel:${siteConfig.phonePrimaryTel}`} className="help-link">
                    <Phone size={14} /> {siteConfig.phonePrimary}
                  </a>
                  <span className="sep">•</span>
                  <a href={`mailto:${siteConfig.email}`} className="help-link">
                    <Mail size={14} /> {siteConfig.email}
                  </a>
                </div>

              </div>
            </div>

            {/* Tabbed Detailed Specifications */}
            <div className="detail-tabs-section">
              <div className="detail-tabs-header">
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('description')}
                >
                  Product Details & Overview
                </button>
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('specs')}
                >
                  Technical Specifications & Packaging
                </button>
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('shipping')}
                >
                  Wholesale Logistics & Terms
                </button>
              </div>

              <div className="detail-tab-content">
                {activeDetailTab === 'description' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Product Description</h3>
                    <p className="tab-lead-text">{activeProduct.longDescription || activeProduct.description}</p>
                    <div className="tab-features-grid">
                      <div className="tab-feature-card">
                        <h4>Commercial Quality Standard</h4>
                        <p>Specially manufactured and selected for sustained commercial and retail performance, offering high durability and verified consumer satisfaction.</p>
                      </div>
                      <div className="tab-feature-card">
                        <h4>Packaging & Presentation</h4>
                        <p>All units come in shelf-ready retail packaging with standard barcoding, regulatory ingredient/material markings, and protective outer wrap.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'specs' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Technical Specifications & Dimensions</h3>
                    {activeProduct.specs && activeProduct.specs.length > 0 ? (
                      <table className="specs-table">
                        <tbody>
                          {activeProduct.specs.map((item, idx) => (
                            <tr key={idx}>
                              <td className="spec-label">{item.label}</td>
                              <td className="spec-value">{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Standard export specifications apply. Contact our desk for complete COA / spec sheets.</p>
                    )}
                  </div>
                )}

                {activeDetailTab === 'shipping' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Wholesale Logistics & Dispatch Terms</h3>
                    <div className="shipping-info-grid">
                      <div className="ship-card">
                        <h4>Order Processing & Lead Time</h4>
                        <p>Orders are dispatched within 24 to 48 business hours upon confirmation. Tracking numbers and freight waybills are provided immediately.</p>
                      </div>
                      <div className="ship-card">
                        <h4>Shipping Hubs & Carriers</h4>
                        <p>{siteConfig.hubs.dispatchNote}</p>
                      </div>
                      <div className="ship-card">
                        <h4>Pallet & Container Loads</h4>
                        <p>Full Container Load (FCL) and Less than Container Load (LCL) consolidation available for cross-border wholesale buyers.</p>
                      </div>
                      <div className="ship-card">
                        <h4>Payment Methods</h4>
                        <p>We accept Wire Transfer (T/T), Commercial ACH, Letter of Credit (LC for qualifying volumes), and verified bank deposits.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products Strip */}
            <div className="detail-related-section">
              <div className="related-header">
                <span className="section-tag">CATALOG ASSORTMENT</span>
                <h2 className="related-title">Other Products from {siteConfig.shortName}</h2>
              </div>

              <div className="products-grid">
                {products.filter(p => p.id !== activeProduct.id).map(prod => (
                  <div 
                    key={prod.id} 
                    className="product-card" 
                    onClick={() => viewProductDetail(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-img-wrap">
                      <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                      <span className="product-badge">{prod.categoryName}</span>
                    </div>
                    <div className="product-body">
                      <div className="product-header-row">
                        <span className="product-sku">SKU: {prod.sku}</span>
                        <span className="stock-tag">● {prod.availability}</span>
                      </div>
                      <h3 className="product-title">
                        <button 
                          onClick={(e) => { e.stopPropagation(); viewProductDetail(prod); }}
                          className="product-title-btn"
                        >
                          {prod.name}
                        </button>
                      </h3>
                      <div className="product-price-box">
                        <span className="product-price-val">{prod.price}</span>
                        <span className="product-price-sub">Wholesale Tiered</span>
                      </div>
                      <p className="product-excerpt">{prod.description}</p>
                      <div className="product-actions-row">
                        <button 
                          className="btn-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1, true);
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>Add to cart</span>
                        </button>
                        <button 
                          className="btn-view-details"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewProductDetail(prod);
                          }}
                        >
                          <Eye size={15} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW: ABOUT US */}
      {activeTab === 'about' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto', background: '#fff', padding: '48px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <span className="section-tag">COMPANY OVERVIEW</span>
            <h1 className="section-title" style={{ marginBottom: '20px' }}>About {siteConfig.companyName}</h1>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong>{siteConfig.legalName}</strong> is dedicated to delivering excellence in global wholesale distribution and consumer essentials. {siteConfig.about.mission}
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
              We pride ourselves on thoughtful sourcing — choosing products that deliver genuine performance, high customer satisfaction, and dependable quality for retail and wholesale partners worldwide.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '36px 0' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: 'var(--primary-navy)', fontSize: '1.1rem', marginBottom: '8px' }}>Integrity First</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Transparent pricing, transparent communication, and verified product authenticity.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: 'var(--primary-navy)', fontSize: '1.1rem', marginBottom: '8px' }}>Logistics Agility</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Fast customs turnaround, reliable carrier contracts, and multi-hub fulfillment.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: 'var(--primary-navy)', fontSize: '1.1rem', marginBottom: '8px' }}>Partner Centric</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Dedicated trade managers ready to accommodate customer requirements and custom schedules.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button className="btn-hero-primary" onClick={() => navigateTo('contact')}>
                Contact Management Desk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: OUR BUSINESS */}
      {activeTab === 'business' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="section-header-center">
              <span className="section-tag">CAPABILITIES & OPERATIONS</span>
              <h1 className="section-title">Our Business Model</h1>
              <p style={{ color: '#64748b', maxWidth: '650px', margin: '12px auto 0' }}>
                Supplying verified retail and commercial sectors through streamlined supply chains and B2B excellence.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: 'var(--accent-teal)', marginBottom: '14px' }}><Layers size={36} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Wholesale Distribution</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Direct supply of Everyday Essentials, Personal Care, and Household products to retail chains, convenience stores, and e-commerce merchants.
                </p>
              </div>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: 'var(--accent-teal)', marginBottom: '14px' }}><Truck size={36} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Import & Export</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  International trade routes connecting high-demand markets with premier suppliers across North America, the Middle East, and Asia.
                </p>
              </div>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: 'var(--accent-teal)', marginBottom: '14px' }}><Building2 size={36} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Commercial Procurement</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Specialized contracts for offices, hotels, cleaning service companies, and institutional facilities requiring continuous recurring supplies.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '40px', background: 'var(--primary-navy)', color: '#fff', padding: '36px', borderRadius: '20px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '12px' }}>Ready to Scale Your Inventory?</h2>
              <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 24px' }}>
                Let us build a customized supply plan tailored to your volume requirements and distribution schedule.
              </p>
              <button className="btn-hero-primary" onClick={() => handleOpenPartner('partner')}>
                Inquire For Wholesale Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: PRODUCT CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div className="section-header-center">
            <span className="section-tag">CATALOG OVERVIEW</span>
            <h1 className="section-title">All Product Categories</h1>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '10px auto 0' }}>
              Explore our core catalog sectors thoughtfully curated for reliable turnover and high quality.
            </p>
          </div>

          <div className="categories-grid" style={{ marginBottom: '50px' }}>
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  navigateTo('home');
                  setTimeout(() => {
                    const el = document.getElementById('featured-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <img src={cat.image} alt={cat.name} className="category-card-img" />
                <div className="category-card-overlay">
                  <h3 className="category-title">{cat.name}</h3>
                  <p className="category-desc">{cat.description}</p>
                  <button className="btn-category-pill">
                    {cat.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: WHOLESALE PARTNERSHIPS */}
      {activeTab === 'partnerships' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <span className="section-tag">EXPAND WITH US</span>
            <h1 className="section-title" style={{ marginBottom: '16px' }}>Wholesale Partnerships</h1>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Whether you are an independent supermarket, a chain retailer, or an online merchant, {siteConfig.legalName} provides flexible minimums, volume price tiers, and dependable fulfillment.
            </p>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Contact Name *</label>
                  <input type="text" required placeholder="Your full name" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Business Name *</label>
                  <input type="text" required placeholder="Business entity name" className="form-input" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" required placeholder="business@example.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" required placeholder="(+92) / (+1) Phone" className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Business Type</label>
                <select className="form-select">
                  <option>Brick & Mortar Retailer</option>
                  <option>E-commerce / Marketplace Seller</option>
                  <option>Regional Distributor</option>
                  <option>Institutional / Facility Buyer</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Monthly Purchase Volume</label>
                <select className="form-select">
                  <option>$5,000 - $25,000</option>
                  <option>$25,000 - $100,000</option>
                  <option>$100,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message & Products of Interest</label>
                <textarea rows={4} placeholder="Tell us which products and categories you are looking to purchase..." className="form-textarea" required></textarea>
              </div>
              <button type="submit" className="btn-submit-modal">
                Submit Wholesale Application
              </button>
            </form>

            {formSubmitted && (
              <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color="var(--accent-teal)" />
                <div>
                  <strong>Application Submitted Successfully!</strong>
                  <p style={{ fontSize: '0.88rem' }}>Our wholesale accounts director from {siteConfig.companyName} will review your details and contact you shortly.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW: SUPPLIER INQUIRIES (WITH EXACT TEXT PROVIDED BY USER) */}
      {activeTab === 'supplier' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="section-header-center">
              <span className="section-tag">SUPPLIER INQUIRIES</span>
              <h1 className="section-title">Supplier Inquiries</h1>
              <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '680px', margin: '14px auto 0' }}>
                Tell us about your products and wholesale inquiry; our team will review your message.
              </p>
            </div>

            {/* Quick Contact Info Strip with exact address and phone */}
            <div style={{
              background: 'var(--primary-navy)',
              color: '#ffffff',
              padding: '24px 30px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} color="var(--accent-gold)" />
                <a href={`mailto:${siteConfig.email}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                  {siteConfig.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={20} color="var(--accent-gold)" />
                <a href={`tel:${siteConfig.phonePrimaryTel}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                  {siteConfig.phonePrimary}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={20} color="var(--accent-gold)" />
                <span>{siteConfig.address.full}</span>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e6dfd4' }}>
              <div style={{ marginBottom: '24px', borderLeft: '4px solid var(--accent-teal)', paddingLeft: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Supplier Inquiries</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Tell us about your business and the products you're looking to source. Share product details, brand information, and your preferred order quantities. Our team will review your inquiry and follow up about potential next steps.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="modal-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Company / Factory Name *</label>
                    <input type="text" required placeholder="Manufacturing or trading entity" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Representative Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Direct Email *</label>
                    <input type="email" required placeholder="rep@brand.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Direct Phone / WhatsApp *</label>
                    <input type="tel" required placeholder="{siteConfig.phonePrimary} or US phone" className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Order Quantities / MOQs</label>
                  <input type="text" placeholder="e.g. LCL, FCL, Pallets, Master Cartons" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Share Product Details & Brand Information *</label>
                  <textarea rows={4} placeholder="Describe your product lines, certifications (FDA, ISO, GMP), brand catalog link, and manufacturing location..." className="form-textarea" required></textarea>
                </div>
                <button type="submit" className="btn-submit-modal">
                  Submit Supplier Inquiry
                </button>
              </form>

              {formSubmitted && (
                <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={24} color="var(--accent-teal)" />
                  <div>
                    <strong>Supplier Inquiry Received!</strong>
                    <p style={{ fontSize: '0.88rem' }}>Our team will review your inquiry and follow up about potential next steps.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: CONTACT US */}
      {activeTab === 'contact' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="section-header-center">
              <span className="section-tag">GET IN TOUCH</span>
              <h1 className="section-title">Contact {siteConfig.companyName}</h1>
              <p style={{ color: '#64748b', maxWidth: '600px', margin: '10px auto 0' }}>
                We are at your service for catalog requests, partnership discussions, or general inquiries.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', marginTop: '40px' }}>
              <div style={{ background: 'var(--primary-navy)', color: '#fff', padding: '36px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '16px', color: '#f8fafc' }}>Direct Coordinates</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Mail size={20} color="var(--accent-teal)" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</div>
                      <a href={`mailto:${siteConfig.email}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Globe size={20} color="var(--accent-teal)" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Official Website</div>
                      <a href={`https://${(siteConfig.website || 'www.evearthllc.com').replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                        {siteConfig.website || 'www.evearthllc.com'}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Phone size={20} color="var(--accent-teal)" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Phone Number</div>
                      <div>Direct: <a href={`tel:${siteConfig.phoneDirectTel}`} style={{ color: '#fff' }}>{siteConfig.phoneDirect}</a></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <MapPin size={20} color="var(--accent-teal)" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Operating Trade Hub</div>
                      <div style={{ color: '#fff', fontWeight: '600' }}>Global Distribution Trade Desk</div>
                      <div style={{ color: '#cbd5e1' }}>Middle East & North America Logistics</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <MessageSquare size={20} color="#25d366" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>WhatsApp Chat</div>
                      <a 
                        href={`https://wa.me/${siteConfig.whatsappNumber}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ color: '#25d366', fontWeight: '600', textDecoration: 'none' }}
                      >
                        {siteConfig.phoneDirect} (Instant)
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Building2 size={20} color="var(--accent-teal)" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Management</div>
                      <div style={{ color: '#fff' }}>{siteConfig.companyName}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Management & Operations</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '36px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>Send Us a Message</h3>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" required placeholder="your.email@example.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input type="text" placeholder="Wholesale Inquiry / Catalog" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea rows={4} placeholder="How can we assist you today?" required className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Send Message
                  </button>
                </form>

                {formSubmitted && (
                  <div style={{ marginTop: '16px', padding: '12px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', fontSize: '0.9rem' }}>
                    ✓ Thank you! Your message has been received by {siteConfig.companyName}. We will reply within 24 hours.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src={siteConfig.logo || logoImg} alt={`${siteConfig.companyName} Logo`} className="footer-logo-img" />
            <h3>{siteConfig.companyName}</h3>
            <p>
              {siteConfig.footer.description}
            </p>
            <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#d6cfc7' }}>
              <div><strong>Management:</strong> {siteConfig.companyName}</div>
              <div><strong>Operations:</strong> {siteConfig.footer.operationsLabel}</div>
              <div><strong>Trade Desk Hotline:</strong> {siteConfig.phoneDirect} • {siteConfig.email}</div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Menu</h4>
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a></li>
              <li><a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('home'); const el = document.getElementById('featured-products-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Shop</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacts</h4>
            <ul style={{ marginBottom: '20px' }}>
              <li>
                <a href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneDirectTel}`}>
                  {siteConfig.phoneDirect}
                </a>
              </li>
              {siteConfig.website && (
                <li>
                  <a href={`https://${siteConfig.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">
                    {siteConfig.website}
                  </a>
                </li>
              )}
            </ul>

            <h4 style={{ marginTop: '16px' }}>Socials</h4>
            <ul className="footer-social-links">
              {siteConfig.footer.socials.map((soc) => (
                <li key={soc.label}><a href={soc.url} target="_blank" rel="noreferrer">{soc.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Subscribe to our newsletter</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px', color: '#d6cfc7' }}>
              {siteConfig.footer.newsletterTagline}
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', color: '#a89f96' }}>EMAIL *</label>
              <input 
                type="email" 
                required 
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  padding: '11px 14px',
                  borderRadius: '8px',
                  border: '1px solid #3d342d',
                  background: '#241e19',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                style={{
                  background: 'linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-gold) 100%)',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '6px',
                  letterSpacing: '0.02em',
                  boxShadow: '0 4px 14px rgba(194, 89, 43, 0.3)'
                }}
              >
                Subscribe
              </button>
            </form>

            {newsletterSuccess && (
              <div style={{ marginTop: '10px', color: '#e2aa63', fontSize: '0.82rem' }}>
                {siteConfig.footer.newsletterSuccess}
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} <strong>{siteConfig.legalName}</strong>. {siteConfig.footer.copyrightSuffix}
          </div>
          <div style={{ color: '#a89f96' }}>
            Managed by {siteConfig.companyName} &bull; {siteConfig.footer.managedByLabel}
          </div>
        </div>
      </footer>

      {/* CART DRAWER SLIDE-OVER */}
      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-header-title">
                <ShoppingBag size={20} color="var(--accent-teal)" />
                <h3>Your Wholesale Cart</h3>
                <span className="cart-count-pill">{totalCartItems} units</span>
              </div>
              <button className="cart-close-btn" onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cart-drawer-body">
              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-cart-icon">
                    <ShoppingCart size={48} strokeWidth={1.5} color="#94a3b8" />
                  </div>
                  <h4>Your Cart is Empty</h4>
                  <p>Browse our catalog and add wholesale products to calculate tiered totals or place direct orders.</p>
                  <button 
                    className="btn-hero-primary" 
                    style={{ marginTop: '16px' }}
                    onClick={() => {
                      setCartOpen(false);
                      navigateTo('home');
                    }}
                  >
                    Explore Wholesale Catalog
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item-card">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="cart-item-thumb"
                        onClick={() => {
                          viewProductDetail(item.product);
                          setCartOpen(false);
                        }}
                      />
                      <div className="cart-item-details">
                        <div className="cart-item-meta">
                          <span className="cart-item-sku">SKU: {item.product.sku}</span>
                          <button 
                            className="btn-remove-item"
                            onClick={() => removeFromCart(item.product.id)}
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <h4 
                          className="cart-item-title"
                          onClick={() => {
                            viewProductDetail(item.product);
                            setCartOpen(false);
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <div className="cart-item-price-row">
                          <span className="cart-unit-price">{item.product.price} / unit</span>
                          <span className="cart-line-total">{siteConfig.currencySymbol || "$"} {(item.product.priceNumeric * item.quantity).toLocaleString()}</span>
                        </div>
                        <div className="cart-stepper-row">
                          <div className="cart-qty-stepper">
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, -1)}
                              className="cart-step-btn"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="cart-step-val">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, 1)}
                              className="cart-step-btn"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            className="cart-view-link"
                            onClick={() => {
                              viewProductDetail(item.product);
                              setCartOpen(false);
                            }}
                          >
                            View details →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-summary-box">
                  <div className="summary-row">
                    <span>Total Quantity:</span>
                    <strong>{totalCartItems} units</strong>
                  </div>
                  <div className="summary-row subtotal">
                    <span>Estimated Subtotal:</span>
                    <strong className="summary-amount">{siteConfig.currencySymbol || "$"} {cartSubtotal.toLocaleString()}</strong>
                  </div>
                  <p className="summary-note">Wholesale tiered rates and freight confirmed upon order dispatch.</p>
                </div>

                <div className="cart-footer-actions">
                  <a 
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      `Hello ${siteConfig.companyName}, I want to place an order:\n\n` +
                      cart.map(i => `• ${i.product.name} (SKU: ${i.product.sku}) - Qty: ${i.quantity} x ${i.product.price} = ${siteConfig.currencySymbol || "$"}${(i.product.priceNumeric * i.quantity).toLocaleString()}`).join('\n') +
                      `\n\nTotal Estimated: ${siteConfig.currencySymbol || "$"}${cartSubtotal.toLocaleString()}\nTotal Units: ${totalCartItems}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-cart-whatsapp"
                  >
                    <MessageSquare size={18} />
                    <span>Instant Checkout via WhatsApp</span>
                  </a>

                  <button 
                    className="btn-cart-checkout"
                    onClick={() => {
                      setCartOpen(false);
                      handleOpenPartner('checkout');
                    }}
                  >
                    <span>Proceed to Wholesale Checkout</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="cart-clear-row">
                  <button onClick={clearCart} className="btn-clear-cart">
                    Clear Entire Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="cart-toast">
          <CheckCircle2 size={18} color="var(--accent-gold)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL: QUOTE REQUEST, PARTNER INQUIRY, OR CHECKOUT */}
      {modalType && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={18} />
            </button>

            {modalType === 'quote' && selectedProduct && (
              <>
                <h3 className="modal-title">Request Wholesale Quote</h3>
                <p className="modal-subtitle">
                  Inquiring for: <strong>{selectedProduct.name}</strong> (SKU: {selectedProduct.sku})
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Email *</label>
                    <input type="email" required placeholder="buyer@company.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number / WhatsApp *</label>
                    <input type="tel" required placeholder="(+92) / (+1) Phone" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Requested Quantity (Minimum: {selectedProduct.minOrder})</label>
                    <input type="text" placeholder={`e.g. 20 Cases / 1 Pallet`} className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination Port / Delivery Zip Code</label>
                    <input type="text" placeholder="City, State / Country" className="form-input" required />
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Submit Quote Request
                  </button>
                </form>
              </>
            )}

            {modalType === 'partner' && (
              <>
                <h3 className="modal-title">Wholesale Partnership Today</h3>
                <p className="modal-subtitle">
                  Connect with {siteConfig.companyName} executive desk.
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business / Company Name *</label>
                    <input type="text" required placeholder="Company LLC" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" required placeholder="contact@company.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input type="tel" required placeholder="{siteConfig.phoneDirect} or US line" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Categories of Interest</label>
                    <select className="form-select">
                      <option>All Product Categories</option>
                      {categories.map((c) => (
                        <option key={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Notes / Expected Order Size</label>
                    <textarea rows={3} placeholder="Tell us about your distribution needs..." className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Connect With {siteConfig.shortName}
                  </button>
                </form>
              </>
            )}

            {modalType === 'checkout' && (
              <>
                <h3 className="modal-title">Wholesale Checkout / Purchase Order</h3>
                <p className="modal-subtitle">
                  Submitting order for: <strong>{totalCartItems} units • Total: {siteConfig.currencySymbol || "$"} {cartSubtotal.toLocaleString()}</strong>
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Buyer / Contact Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company / Business Name *</label>
                    <input type="text" required placeholder="Company / Organization" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Email *</label>
                    <input type="email" required placeholder="procurement@company.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp / Phone Number *</label>
                    <input type="tel" required placeholder="(+92) / (+1) Phone" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Delivery / Destination Address *</label>
                    <input type="text" required placeholder="Warehouse address, City, Country" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order Notes / Custom Pallet Instructions</label>
                    <textarea rows={2} placeholder="Optional delivery instructions, dock requirements..." className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Confirm & Place Purchase Order ({siteConfig.currencySymbol || "$"} {cartSubtotal.toLocaleString()})
                  </button>
                </form>
              </>
            )}

            {formSubmitted && (
              <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color="var(--accent-teal)" />
                <div>
                  <strong>Order / Inquiry Dispatched!</strong>
                  <p style={{ fontSize: '0.85rem' }}>{siteConfig.companyName} and our logistics desk will confirm your order and send invoice details via WhatsApp and email promptly.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


