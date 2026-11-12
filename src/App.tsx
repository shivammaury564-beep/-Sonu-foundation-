import React, { useState, useEffect } from 'react';
import {
  Calendar,
  ArrowRight,
  Menu,
  X,
  Crown,
  Leaf,
  ShieldCheck,
  GraduationCap,
  Scissors,
  Star,
  Sparkles,
  Feather,
  Droplet,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Info,
  ChevronDown,
  HeartHandshake,
} from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';
import { FoundationAndCoursesSection } from './components/FoundationAndCoursesSection';
import { GalleryAndBranchesSection } from './components/GalleryAndBranchesSection';
import { BookingAndContactSection } from './components/BookingAndContactSection';
import {
  HOMEPAGE_POPULAR_SERVICES,
  COMPLETE_BEAUTY_SERVICES,
  POPULAR_SERVICES,
  CompleteServiceCategory,
  ServiceItem,
  INITIAL_LOCATIONS,
  StudioLocation,
  BRAND_CONTACT,
  TRAINING_COURSES,
} from './data/catalogData';
import {
  STANDARD_TIME_SLOTS,
  getKolkataNow,
  buildWhatsAppUrl,
} from './utils/validation';

type ServiceCategoryFilter = 'All Services' | CompleteServiceCategory;

const SERVICE_CATEGORY_TABS: ServiceCategoryFilter[] = [
  'All Services',
  'Beauty, Waxing & Skin Services',
  'Hair Services',
  'Makeup Services',
  'Hairstyle Services',
  'Nail Services',
];

function getTomorrowKolkata(): string {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return getKolkataNow(tomorrow).dateStr;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Two-Branch State (Branch 1 & Branch 2)
  const [allLocations, setAllLocations] = useState<StudioLocation[]>(INITIAL_LOCATIONS);

  const activeLocations = React.useMemo(() => {
    const active = allLocations.filter((l) => l.active);
    return active.length > 0 ? active : allLocations;
  }, [allLocations]);

  // Quick Booking Bar & Main Booking Shared State
  const [selectedLocationId, setSelectedLocationId] = useState<string>('location-1');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(POPULAR_SERVICES[0].id);
  const [quickDate, setQuickDate] = useState<string>(getTomorrowKolkata());
  const [quickTime, setQuickTime] = useState<string>('11:00 AM');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(TRAINING_COURSES[0].id);

  // Full 36-Service Catalog Filter + Detail Modal
  const [serviceFilter, setServiceFilter] = useState<ServiceCategoryFilter>('All Services');
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);

  // Footer Newsletter / Offers Subscription State
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/locations')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.locations) && data.locations.length > 0) {
          setAllLocations(data.locations);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (
      activeLocations.length > 0 &&
      !activeLocations.some((l) => l.id === selectedLocationId)
    ) {
      setSelectedLocationId(activeLocations[0].id);
    }
  }, [activeLocations, selectedLocationId]);

  const filteredCatalogServices =
    serviceFilter === 'All Services'
      ? COMPLETE_BEAUTY_SERVICES
      : COMPLETE_BEAUTY_SERVICES.filter((s) => s.category === serviceFilter);

  const renderServiceIcon = (iconName: ServiceItem['iconName']) => {
    switch (iconName) {
      case 'leaf':
        return <Leaf className="w-4 h-4 text-[#f7e7ce]" />;
      case 'scissors':
        return <Scissors className="w-4 h-4 text-[#f7e7ce]" />;
      case 'star':
        return <Star className="w-4 h-4 text-[#f7e7ce]" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-[#f7e7ce]" />;
      case 'feather':
        return <Feather className="w-4 h-4 text-[#f7e7ce]" />;
      case 'droplet':
        return <Droplet className="w-4 h-4 text-[#f7e7ce]" />;
    }
  };

  const handleBookService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const el = document.getElementById('appointment-booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickBarContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('appointment-booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscriberEmail.trim())) {
      setSubscribedMessage('Please enter a valid email address.');
      return;
    }
    setSubscribedMessage('Thank you for subscribing to seasonal salon offers & batch updates!');
    setSubscriberEmail('');
  };

  return (
    <div id="home" className="min-h-screen flex flex-col bg-[#faf3ec] text-[#2b1820]">
      {/* TOP PROMOTIONAL ANNOUNCEMENT BAR */}
      <div className="bg-[#52142b] text-[#f7e7ce] text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-[#d4af6a]/25">
        <span>
          Book Your Appointment Today &amp; Get 10% OFF on Your First Service!
        </span>
      </div>

      {/* MAIN NAVIGATION HEADER (3-Zone Contract: Brand — Nav Links with Dropdowns — Primary CTA) */}
      <header className="sticky top-0 z-40 bg-[#faf3ec]/95 backdrop-blur-md border-b border-[#e5d3c0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <BrandLogo
            variant="dark-text"
            label="Sonu Foundation and Charitable Trust"
            logoSrc="/assets/aistudio/ChatGPT_Image_Nov_4__2026__09_51_48_PM_d8847b86.png"
          />

          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#3f0e21]"
          >
            <a
              href="#home"
              className="text-[#5e1933] font-semibold border-b-2 border-[#5e1933] pb-1 whitespace-nowrap shrink-0"
            >
              Home
            </a>

            <a
              href="#about"
              className="hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
            >
              About Us
            </a>

            {/* Services Dropdown */}
            <div className="relative group py-2">
              <a
                href="#services"
                className="inline-flex items-center gap-1 hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c2344]" />
              </a>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 top-full w-60 rounded-xl bg-[#faf3ec] border border-[#dec5ac] shadow-lg p-2 z-50">
                <a
                  href="#services"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Featured Beauty Services
                </a>
                <a
                  href="#services-pricing"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Services &amp; Pricing Catalog (36 Services)
                </a>
              </div>
            </div>

            {/* Academy Dropdown */}
            <div className="relative group py-2">
              <a
                href="#academy"
                className="inline-flex items-center gap-1 hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Academy</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c2344]" />
              </a>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 top-full w-64 rounded-xl bg-[#faf3ec] border border-[#dec5ac] shadow-lg p-2 z-50">
                <a
                  href="#academy"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Beauty Academy Overview
                </a>
                <a
                  href="#professional-courses"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Professional Courses (9 Confirmed)
                </a>
                <a
                  href="#certificates"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Certificates &amp; Recognition
                </a>
                <a
                  href="#course-enquiry"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Course Enquiry Form
                </a>
              </div>
            </div>

            {/* Foundation Dropdown */}
            <div className="relative group py-2">
              <a
                href="#foundation"
                className="inline-flex items-center gap-1 hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Foundation</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c2344]" />
              </a>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 top-full w-64 rounded-xl bg-[#faf3ec] border border-[#dec5ac] shadow-lg p-2 z-50">
                <a
                  href="#foundation"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Sonu Foundation &amp; Charitable Trust
                </a>
                <a
                  href="#our-programs"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Our Programs
                </a>
                <a
                  href="#beauty-classes"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Beauty Classes
                </a>
                <a
                  href="#stitching-classes"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Stitching &amp; Tailoring Classes
                </a>
                <a
                  href="#computer-classes"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Computer Classes
                </a>
                <a
                  href="#student-stories"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Student Success Stories
                </a>
              </div>
            </div>

            {/* Gallery Dropdown */}
            <div className="relative group py-2">
              <a
                href="#gallery"
                className="inline-flex items-center gap-1 hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Gallery</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c2344]" />
              </a>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 top-full w-56 rounded-xl bg-[#faf3ec] border border-[#dec5ac] shadow-lg p-2 z-50">
                <a
                  href="#gallery"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Studio &amp; Work Gallery
                </a>
                <a
                  href="#student-gallery"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Student Gallery (11 Categories)
                </a>
                <a
                  href="#reviews"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Client &amp; Trainee Reviews
                </a>
              </div>
            </div>

            <a
              href="#locations"
              className="hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
            >
              Our Locations
            </a>

            <a
              href="#contact"
              className="hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#appointment-booking"
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#651b38] hover:bg-[#4a1228] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg border border-[#d8c0a8] text-[#3f0e21] hover:bg-[#efe1d1] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden bg-[#faf3ec] border-b border-[#e5d3c0] px-4 pt-3 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[80vh] overflow-y-auto"
          >
            {[
              { label: '1. Home', href: '#home' },
              { label: '2. About Us', href: '#about' },
              { label: '3. Beauty Services', href: '#services' },
              { label: '4. Services & Pricing (36 Services)', href: '#services-pricing' },
              { label: '5. Beauty Academy', href: '#academy' },
              { label: '6. Professional Courses (9 Courses)', href: '#professional-courses' },
              { label: '7. Sonu Foundation & Charitable Trust', href: '#foundation' },
              { label: '8. Our Programs', href: '#our-programs' },
              { label: '9. Beauty Classes', href: '#beauty-classes' },
              { label: '10. Stitching Classes', href: '#stitching-classes' },
              { label: '11. Computer Classes', href: '#computer-classes' },
              { label: '12. Student Gallery', href: '#student-gallery' },
              { label: '13. Student Success Stories', href: '#student-stories' },
              { label: '14. Reviews', href: '#reviews' },
              { label: '15. Our Locations (Branch 1 & 2)', href: '#locations' },
              { label: '16. Contact', href: '#contact' },
              { label: '17. Appointment Booking', href: '#appointment-booking' },
              { label: '18. Course Enquiry', href: '#course-enquiry' },
            ].map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* HERO SECTION (Strictly Preserving Reference Design) */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#f5e7d8] via-[#f2e2d2] to-[#ead5c0] border-b border-[#e2cbb3]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 z-10">
                <p className="text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[#6e3b4b] mb-3">
                  Beauty · Care · Training
                </p>

                <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.12] text-[#28121a] mb-4">
                  Enhance Your
                  <span className="block text-[#6b1b3a] mt-1">Natural Beauty</span>
                </h1>

                <p className="text-base sm:text-lg text-[#432731] font-medium max-w-xl mb-7 leading-relaxed">
                  Professional Salon Services &amp; Certified Beauty Courses – All Under One Roof,
                  alongside vocational training programs by{' '}
                  <strong className="text-[#5e1933]">
                    Sonu Foundation and Charitable Trust
                  </strong>
                  .
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <a
                    href="#appointment-booking"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#651b38] hover:bg-[#4a1228] text-white text-sm sm:text-base font-semibold shadow-sm transition-colors whitespace-nowrap shrink-0"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </a>

                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#651b38]/50 bg-[#faf3ec]/70 hover:bg-[#faf3ec] text-[#3f0e21] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-[#dcc4ac]">
                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d4af6a]/25 text-[#8a5d1b] mb-1">
                      <Crown className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-[#2b1820]">Expert Professionals</p>
                    <p className="text-[11px] text-[#684752]">Trained &amp; Certified</p>
                  </div>

                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d4af6a]/25 text-[#8a5d1b] mb-1">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-[#2b1820]">Premium Products</p>
                    <p className="text-[11px] text-[#684752]">Safe &amp; Skin-Friendly</p>
                  </div>

                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d4af6a]/25 text-[#8a5d1b] mb-1">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-[#2b1820]">Hygiene &amp; Safety</p>
                    <p className="text-[11px] text-[#684752]">Our Top Priority</p>
                  </div>

                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d4af6a]/25 text-[#8a5d1b] mb-1">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-[#2b1820]">Beauty Academy</p>
                    <p className="text-[11px] text-[#684752]">Learn · Practice · Grow</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 relative">
                <div className="rounded-2xl overflow-hidden border border-[#d4af6a]/60 shadow-md bg-[#ebd7c3] aspect-[855/316] w-full">
                  <img
                    src="/assets/sonu/hero-banner.png"
                    alt="Sonu's Beauty Studio & Academy Bridal Makeover and Reception"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION A: OUR POPULAR SERVICES + BEAUTY ACADEMY CARD + COMPLETE 36-SERVICE CATALOG */}
        <section id="services" className="py-12 sm:py-16 bg-[#faf3ec] scroll-mt-24">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
              <div className="xl:col-span-9 flex flex-col justify-between">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-16 sm:w-28 bg-[#d5bda4]" />
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2b1820] text-center">
                    Our Popular Services
                  </h2>
                  <div className="h-px w-16 sm:w-28 bg-[#d5bda4]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  {HOMEPAGE_POPULAR_SERVICES.map((service) => (
                    <article
                      key={service.id}
                      className="bg-[#f6ece2] rounded-xl overflow-hidden border border-[#e3cdb7] flex flex-col justify-between shadow-2xs hover:border-[#c59b6d] transition-colors"
                    >
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8d6c3]">
                          <img
                            src={service.image}
                            alt={service.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                          />
                          <div className="absolute bottom-2 left-2.5 w-7 h-7 rounded-full bg-[#8c6229]/90 border border-[#f7e7ce] flex items-center justify-center shadow-xs">
                            {renderServiceIcon(service.iconName)}
                          </div>
                        </div>

                        <div className="p-3.5">
                          <h3 className="font-serif-luxury text-sm font-bold text-[#2b1820] leading-snug mb-1">
                            {service.name}
                          </h3>
                          <p className="text-[11px] text-[#5c3c47] leading-relaxed mb-2.5 line-clamp-2">
                            {service.shortSubtitle}
                          </p>
                        </div>
                      </div>

                      <div className="px-3.5 pb-3.5 pt-1">
                        <p className="text-xs text-[#4a1228] mb-2 tabular-nums">
                          <span className="font-bold text-[#651b38] text-sm">
                            {service.priceLabel}
                          </span>
                        </p>
                        <div className="flex items-center justify-between gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleBookService(service.id)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#651b38] hover:text-[#3f0e21] whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>Book Now</span>
                            <ArrowRight className="w-3 h-3 shrink-0" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveServiceModal(service)}
                            aria-label={`View details for ${service.name}`}
                            className="text-[11px] font-medium text-[#6e4d59] hover:text-[#3f0e21] underline whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-3 bg-gradient-to-br from-[#f3e3d3] via-[#edd7c2] to-[#e5c9ae] rounded-2xl p-5 border border-[#d8bc9e] flex flex-col justify-between relative overflow-hidden">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-7 z-10">
                    <div className="flex items-center gap-2 mb-1.5">
                      <GraduationCap className="w-6 h-6 text-[#8c5e20] shrink-0" />
                      <h3 className="font-serif-luxury text-xl font-bold text-[#3f0e21]">
                        Beauty Academy
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-[#2b1820] leading-snug mb-3">
                      Build a Successful Career in the Beauty Industry
                    </p>

                    <ul className="space-y-1.5 text-xs text-[#3f0e21] mb-4">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8c5e20] shrink-0" />
                        <span>Professional Training</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8c5e20] shrink-0" />
                        <span>Hands-on Practice</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8c5e20] shrink-0" />
                        <span>Industry Expert Guidance</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8c5e20] shrink-0" />
                        <span>9 Confirmed Courses</span>
                      </li>
                    </ul>

                    <a
                      href="#course-enquiry"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#651b38] hover:bg-[#4a1228] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="col-span-5 h-48 rounded-xl overflow-hidden">
                    <img
                      src="/assets/sonu/academy-instructor.png"
                      alt="Beauty Academy Instructor"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain object-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 6: COMPLETE BEAUTY SERVICE CATALOG (36 Client-Supplied Services) */}
            <div
              id="services-pricing"
              className="mt-12 pt-10 border-t border-[#e5d3c0] scroll-mt-24"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
                    Section A · Complete Salon Menu (36 Services)
                  </p>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3f0e21]">
                    Complete Beauty Services &amp; Pricing Catalog
                  </h3>
                  <p className="text-xs sm:text-sm text-[#563843] mt-1">
                    Explore all 36 client-supplied beauty, hair, makeup, hairstyle, and nail
                    services. Services where custom consultation applies display{' '}
                    <strong>Price on Enquiry</strong>.
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label="Filter beauty services by category"
                  className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#efe1d1] rounded-xl border border-[#dec6ad]"
                >
                  {SERVICE_CATEGORY_TABS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={serviceFilter === cat}
                      onClick={() => setServiceFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        serviceFilter === cat
                          ? 'bg-[#5e1933] text-white shadow-xs'
                          : 'bg-white text-[#4a1228] hover:bg-[#eadbc9]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#f5ebe0] rounded-2xl p-5 sm:p-7 border border-[#dec6ad]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredCatalogServices.map((srv) => (
                    <article
                      key={srv.id}
                      className="bg-white rounded-xl overflow-hidden border border-[#e2cbb3] flex flex-col justify-between shadow-2xs"
                    >
                      <div>
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e8d6c3]">
                          <img
                            src={srv.image}
                            alt={srv.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                          />
                          <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-[#3f0e21]/90 text-[#f7e7ce] text-[11px] font-semibold">
                            {srv.priceLabel}
                          </span>
                        </div>

                        <div className="p-4">
                          <p className="text-[11px] font-semibold text-[#7c2344] mb-0.5">
                            {srv.category}
                          </p>
                          <h4 className="font-serif-luxury text-base font-bold text-[#3f0e21] mb-1.5">
                            {srv.name}
                          </h4>
                          <p className="text-xs text-[#563843] leading-relaxed mb-3">
                            {srv.description}
                          </p>
                          {srv.clientNote && (
                            <p className="text-[11px] text-[#7c2344] italic mb-2">
                              Note: {srv.clientNote}
                            </p>
                          )}
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#4a1228] mb-1">
                              What&apos;s Included:
                            </p>
                            <ul className="space-y-1 text-[11px] text-[#563843]">
                              {srv.whatsIncluded.slice(0, 2).map((inc, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-[#5e1933] shrink-0 mt-0.5" />
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2.5 border-t border-[#f0e2d3] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleBookService(srv.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] text-white text-xs font-semibold cursor-pointer"
                        >
                          <span>Book Appointment</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveServiceModal(srv)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#5e1933] hover:underline cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Process</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SONU'S BEAUTY STUDIO & ACADEMY + QUICK BOOKING BAR */}
        <section
          id="about"
          className="py-10 sm:py-14 bg-[#faf3ec] border-t border-[#e5d3c0] scroll-mt-24"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-[#dec5ac] bg-[#e9d5c0] min-h-[220px]">
                <img
                  src="/assets/sonu/salon-interior.png"
                  alt="Sonu's Beauty Studio & Academy Salon Interior"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between py-1">
                <div>
                  <h2 className="font-serif-luxury text-2xl sm:text-[26px] font-bold text-[#2b1820] leading-snug mb-3">
                    About{' '}
                    <span className="text-[#651b38]">
                      Sonu&apos;s Beauty Studio &amp; Academy
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4a2f39] leading-relaxed mb-5">
                    A modern beauty studio and professional training academy operating across two
                    branches in Vadodara, dedicated to enhancing your natural beauty and building
                    practical careers alongside{' '}
                    <strong>Sonu Foundation and Charitable Trust</strong>.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#e2cbb3] mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#8c5e20] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#2b1820]">2 Branches</p>
                        <p className="text-[10px] text-[#684752]">Vadodara Studios</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#8c5e20] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#2b1820]">36 Services</p>
                        <p className="text-[10px] text-[#684752]">Full Salon Care</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#8c5e20] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#2b1820]">9 Courses</p>
                        <p className="text-[10px] text-[#684752]">Beauty Academy</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <HeartHandshake className="w-5 h-5 text-[#8c5e20] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#2b1820]">3 Tracks</p>
                        <p className="text-[10px] text-[#684752]">Foundation Trust</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href="#locations"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#651b38]/40 text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1] transition-colors"
                  >
                    <span>Explore Our Two Branches</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Quick Book Your Appointment Box (with Branch Selector) */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#52142b] via-[#651b38] to-[#3f0e21] text-white rounded-2xl p-5 sm:p-6 border border-[#d4af6a]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <Calendar className="w-5 h-5 text-[#e7c98f] shrink-0" />
                    <h3 className="font-serif-luxury text-xl font-bold text-white">
                      Book Your Appointment
                    </h3>
                  </div>
                  <p className="text-xs text-[#ebd8c5] mb-3">
                    Select your branch, service, date &amp; time.
                  </p>
                </div>

                <form onSubmit={handleQuickBarContinue} className="space-y-2.5">
                  <div>
                    <label htmlFor="qb-location" className="sr-only">
                      Select Your Location
                    </label>
                    <select
                      id="qb-location"
                      value={selectedLocationId}
                      onChange={(e) => setSelectedLocationId(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-[#faf3ec] text-[#2b1820] text-xs font-semibold border border-[#d4af6a]/40"
                    >
                      {activeLocations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.location_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label htmlFor="qb-service" className="sr-only">
                        Select Service
                      </label>
                      <select
                        id="qb-service"
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg bg-[#faf3ec] text-[#2b1820] text-xs font-medium border border-[#d4af6a]/40"
                      >
                        {POPULAR_SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="qb-date" className="sr-only">
                        Select Date
                      </label>
                      <input
                        id="qb-date"
                        type="date"
                        min={getKolkataNow().dateStr}
                        value={quickDate}
                        onChange={(e) => setQuickDate(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg bg-[#faf3ec] text-[#2b1820] text-xs font-medium border border-[#d4af6a]/40 tabular-nums"
                      />
                    </div>

                    <div>
                      <label htmlFor="qb-time" className="sr-only">
                        Select Time
                      </label>
                      <select
                        id="qb-time"
                        value={quickTime}
                        onChange={(e) => setQuickTime(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg bg-[#faf3ec] text-[#2b1820] text-xs font-medium border border-[#d4af6a]/40 tabular-nums"
                      >
                        {STANDARD_TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg bg-gradient-to-r from-[#e5c78e] to-[#cfa356] hover:from-[#ebd096] hover:to-[#d9b066] text-[#2b101b] font-bold text-sm shadow-xs transition-all cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION B & C: BEAUTY ACADEMY (9 COURSES) + SONU FOUNDATION AND CHARITABLE TRUST */}
        <FoundationAndCoursesSection
          locations={activeLocations}
          selectedCourseId={selectedCourseId}
          onSelectCourseForEnquiry={(courseId) => setSelectedCourseId(courseId)}
        />

        {/* GALLERY (11 CATEGORIES) + OUR LOCATIONS (BRANCH 1 & BRANCH 2) + REVIEWS */}
        <GalleryAndBranchesSection
          locations={activeLocations}
          onSelectLocationForBooking={(locationId) => setSelectedLocationId(locationId)}
        />

        {/* FUNCTIONAL TWO-BRANCH APPOINTMENT BOOKING + CONTACT US */}
        <BookingAndContactSection
          locations={activeLocations}
          selectedLocationId={selectedLocationId}
          selectedServiceId={selectedServiceId}
          prefilledDate={quickDate}
          prefilledTime={quickTime}
          onLocationChange={(locationId) => setSelectedLocationId(locationId)}
          onServiceChange={(serviceId) => setSelectedServiceId(serviceId)}
        />
      </main>

      {/* FOOTER (Clean, No Admin Links) */}
      <footer className="bg-[#3d0e20] text-[#f3e3d3] border-t border-[#d4af6a]/30">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 space-y-4">
              <BrandLogo variant="light-text" label="Sonu Foundation and Charitable Trust" />
              <p className="text-xs text-[#dbc4b0] leading-relaxed">
                Premium salon care, bridal makeup artistry, and vocational training programs in
                partnership with{' '}
                <strong className="text-[#f7e7ce]">
                  Sonu Foundation and Charitable Trust
                </strong>{' '}
                across two studio branches in Vadodara, Gujarat.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href={buildWhatsAppUrl(
                    BRAND_CONTACT.whatsappNumber,
                    "Hello Sonu's Beauty Studio & Academy, I have an enquiry."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="px-3 py-1.5 rounded-lg border border-[#d4af6a]/40 text-xs font-semibold text-[#f7e7ce] hover:bg-white/10 transition-colors"
                >
                  WhatsApp Enquiry
                </a>
                <a
                  href={`tel:${BRAND_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
                  aria-label="Call Studio"
                  className="px-3 py-1.5 rounded-lg border border-[#d4af6a]/40 text-xs font-semibold text-[#f7e7ce] hover:bg-white/10 transition-colors"
                >
                  Call Us
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-serif-luxury text-base font-bold text-white mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs text-[#e5d0bc]">
                <li>
                  <a href="#home" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services-pricing" className="hover:text-white transition-colors">
                    Services &amp; Pricing
                  </a>
                </li>
                <li>
                  <a href="#professional-courses" className="hover:text-white transition-colors">
                    Beauty Academy (9 Courses)
                  </a>
                </li>
                <li>
                  <a href="#foundation" className="hover:text-white transition-colors">
                    Sonu Foundation Trust
                  </a>
                </li>
                <li>
                  <a href="#locations" className="hover:text-white transition-colors">
                    Our Two Locations
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-serif-luxury text-base font-bold text-white mb-3">
                Beauty Services
              </h3>
              <ul className="space-y-2 text-xs text-[#e5d0bc]">
                <li>
                  <a href="#services-pricing" className="hover:text-white transition-colors">
                    Beauty, Waxing &amp; Skin
                  </a>
                </li>
                <li>
                  <a href="#services-pricing" className="hover:text-white transition-colors">
                    Hair Spa, Cuts &amp; Colour
                  </a>
                </li>
                <li>
                  <a href="#services-pricing" className="hover:text-white transition-colors">
                    Keratin, Smoothing &amp; Nanoplasty
                  </a>
                </li>
                <li>
                  <a href="#services-pricing" className="hover:text-white transition-colors">
                    Bridal, Haldi &amp; Party Makeup
                  </a>
                </li>
                <li>
                  <a href="#services-pricing" className="hover:text-white transition-colors">
                    Low Bun, Messy Bun &amp; Braids
                  </a>
                </li>
                <li>
                  <a href="#services-pricing" className="hover:text-white transition-colors">
                    Acrylic, Gel &amp; Nail Art
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-serif-luxury text-base font-bold text-white mb-3">
                Academy &amp; Trust
              </h3>
              <ul className="space-y-2 text-xs text-[#e5d0bc]">
                <li>
                  <a href="#professional-courses" className="hover:text-white transition-colors">
                    Basic, Advanced &amp; Makeup Courses
                  </a>
                </li>
                <li>
                  <a href="#professional-courses" className="hover:text-white transition-colors">
                    Mehendi, Nails, PMU &amp; Eyelashes
                  </a>
                </li>
                <li>
                  <a href="#beauty-classes" className="hover:text-white transition-colors">
                    Foundation Beauty Classes
                  </a>
                </li>
                <li>
                  <a href="#stitching-classes" className="hover:text-white transition-colors">
                    Stitching &amp; Tailoring Classes
                  </a>
                </li>
                <li>
                  <a href="#computer-classes" className="hover:text-white transition-colors">
                    Computer Education Classes
                  </a>
                </li>
                <li>
                  <a href="#course-enquiry" className="hover:text-white transition-colors">
                    Course Enquiry Form
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <div>
                <h3 className="font-serif-luxury text-base font-bold text-white mb-3">
                  Contact Us
                </h3>
                <ul className="space-y-2 text-xs text-[#e5d0bc]">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#e7c98f] shrink-0 mt-0.5" />
                    <span>
                      Location 1 &amp; Location 2 · Vadodara, Gujarat
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#e7c98f] shrink-0" />
                    <a
                      href={`tel:${BRAND_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
                      className="hover:text-white tabular-nums"
                    >
                      {BRAND_CONTACT.primaryPhone}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#e7c98f] shrink-0" />
                    <a href={`mailto:${BRAND_CONTACT.email}`} className="hover:text-white">
                      {BRAND_CONTACT.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#e7c98f] shrink-0" />
                    <span className="tabular-nums">{BRAND_CONTACT.hours}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <p className="font-serif-luxury text-sm font-semibold text-white mb-2">
                  Subscribe for Offers &amp; Updates
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex items-center">
                  <label htmlFor="footer-email" className="sr-only">
                    Enter your email
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Enter your email"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-l-lg bg-[#faf3ec] text-[#2b1820] text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe for offers"
                    className="px-3.5 py-2 rounded-r-lg bg-[#d4af6a] hover:bg-[#e0be7c] text-[#2d0917] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                {subscribedMessage && (
                  <p className="text-[11px] text-[#e7c98f] mt-1.5">{subscribedMessage}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#cbb099]">
            <p>
              &copy; {new Date().getFullYear()} Sonu&apos;s Beauty Studio &amp; Academy · Sonu
              Foundation and Charitable Trust. All rights reserved.
            </p>
            <p>Branch 1 &amp; Branch 2 (22.305021, 73.210297) · Vadodara, Gujarat</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP ACTION BUTTON */}
      <a
        href={buildWhatsAppUrl(
          BRAND_CONTACT.whatsappNumber,
          "Hello Sonu's Beauty Studio & Academy, I would like to book an appointment / enquire about courses."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sonu's Beauty Studio on WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>

      {/* SERVICE DETAILS & PROCESS MODAL */}
      {activeServiceModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="bg-[#faf3ec] rounded-2xl max-w-lg w-full overflow-hidden border border-[#d4af6a] shadow-xl">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#e8d6c3]">
              <img
                src={activeServiceModal.image}
                alt={activeServiceModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-xs font-semibold text-[#7c2344]">
                    {activeServiceModal.category} · {activeServiceModal.priceLabel}
                  </p>
                  <h3
                    id="service-modal-title"
                    className="font-serif-luxury text-2xl font-bold text-[#3f0e21]"
                  >
                    {activeServiceModal.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveServiceModal(null)}
                  className="px-3 py-1 rounded-lg border border-[#d5bda4] text-xs font-semibold text-[#4a1228] hover:bg-[#efe1d1] cursor-pointer"
                >
                  Close
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#563843] mb-4">
                {activeServiceModal.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-white p-3.5 rounded-xl border border-[#e2cbb3]">
                  <h4 className="font-serif-luxury text-sm font-bold text-[#3f0e21] mb-2">
                    What&apos;s Included
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#4a1228]">
                    {activeServiceModal.whatsIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5e1933] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#e2cbb3]">
                  <h4 className="font-serif-luxury text-sm font-bold text-[#3f0e21] mb-2">
                    Service Process
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#4a1228]">
                    {activeServiceModal.serviceProcess.map((step, i) => (
                      <li key={i} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const id = activeServiceModal.id;
                    setActiveServiceModal(null);
                    handleBookService(id);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] text-white text-xs font-semibold cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book This Service</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
