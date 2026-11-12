import React, { useState, useEffect } from 'react';
import {
  Calendar,
  ArrowRight,
  Menu,
  X,
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
  Monitor,
  Award,
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
  FOUNDATION_COURSES,
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
  const [selectedCourseId, setSelectedCourseId] = useState<string>(FOUNDATION_COURSES[0].id);

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
    setSubscribedMessage('Thank you for subscribing to Foundation program & salon updates!');
    setSubscriberEmail('');
  };

  return (
    <div id="home" className="min-h-screen flex flex-col bg-[#faf3ec] text-[#2b1820]">
      {/* TOP NGO & SKILL DEVELOPMENT ANNOUNCEMENT BAR */}
      <div className="bg-[#52142b] text-[#f7e7ce] text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-[#d4af6a]/25">
        <span>
          Sonu Foundation and Charitable Trust · Vocational Skill Programs in Beauty Training,
          Stitching &amp; Tailoring, and Computer Classes · Vadodara
        </span>
      </div>

      {/* MAIN NAVIGATION HEADER (NGO Primary Identity + Beauty Studio & Academy Division) */}
      <header className="sticky top-0 z-40 bg-[#faf3ec]/95 backdrop-blur-md border-b border-[#e5d3c0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          <BrandLogo
            variant="dark-text"
            label="Sonu Foundation and Charitable Trust"
            logoSrc="/assets/aistudio/ChatGPT_Image_Nov_4__2026__09_51_48_PM_d8847b86.png"
          />

          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-3.5 text-[13px] font-medium text-[#3f0e21]"
          >
            <a
              href="#home"
              className="text-[#5e1933] font-semibold border-b-2 border-[#5e1933] pb-1 whitespace-nowrap shrink-0"
            >
              Home
            </a>

            <a
              href="#about-foundation"
              className="hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
            >
              About Foundation
            </a>

            <a
              href="#our-mission"
              className="hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
            >
              Our Mission
            </a>

            {/* Our Programs Dropdown */}
            <div className="relative group py-2">
              <a
                href="#our-programs"
                className="inline-flex items-center gap-1 hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Our Programs</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c2344]" />
              </a>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 top-full w-64 rounded-xl bg-[#faf3ec] border border-[#dec5ac] shadow-lg p-2 z-50">
                <a
                  href="#our-programs"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  All Foundation Programs
                </a>
                <a
                  href="#beauty-classes"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Beauty Training Classes
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
                  Computer Education Classes
                </a>
                <a
                  href="#course-enquiry"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Program Admission Enquiry
                </a>
              </div>
            </div>

            {/* Achievements & Stories Dropdown */}
            <div className="relative group py-2">
              <a
                href="#student-stories"
                className="inline-flex items-center gap-1 hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Stories &amp; Events</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c2344]" />
              </a>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 top-full w-64 rounded-xl bg-[#faf3ec] border border-[#dec5ac] shadow-lg p-2 z-50">
                <a
                  href="#student-stories"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Student Success Stories
                </a>
                <a
                  href="#achievements"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Achievements &amp; Outcomes
                </a>
                <a
                  href="#events"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Events &amp; Training Activities
                </a>
                <a
                  href="#certificates"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Certificates &amp; Recognition
                </a>
              </div>
            </div>

            <a
              href="#gallery"
              className="hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
            >
              Gallery
            </a>

            {/* Sonu's Beauty Studio & Academy Division Dropdown */}
            <div className="relative group py-2">
              <a
                href="#academy"
                className="inline-flex items-center gap-1 hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Studio &amp; Academy</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c2344]" />
              </a>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute right-0 top-full w-68 rounded-xl bg-[#faf3ec] border border-[#dec5ac] shadow-lg p-2 z-50">
                <a
                  href="#academy"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Sonu&apos;s Beauty Academy Overview
                </a>
                <a
                  href="#professional-courses"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  9 Confirmed Academy Courses
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Beauty Studio Services
                </a>
                <a
                  href="#services-pricing"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Complete 36-Service Salon Menu
                </a>
                <a
                  href="#locations"
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  Our Two Studio Branches
                </a>
              </div>
            </div>

            <a
              href="#contact"
              className="hover:text-[#5e1933] transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#course-enquiry"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#651b38] hover:bg-[#4a1228] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Join Programs</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="xl:hidden p-2 rounded-lg border border-[#d8c0a8] text-[#3f0e21] hover:bg-[#efe1d1] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="xl:hidden bg-[#faf3ec] border-b border-[#e5d3c0] px-4 pt-3 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[80vh] overflow-y-auto"
          >
            {[
              { label: '1. Home', href: '#home' },
              { label: '2. About Foundation', href: '#about-foundation' },
              { label: '3. Our Mission & Vision', href: '#our-mission' },
              { label: '4. Our Programs (All 3 Tracks)', href: '#our-programs' },
              { label: '5. Beauty Training Classes', href: '#beauty-classes' },
              { label: '6. Stitching & Tailoring Classes', href: '#stitching-classes' },
              { label: '7. Computer Education Classes', href: '#computer-classes' },
              { label: '8. Student Success Stories', href: '#student-stories' },
              { label: '9. Achievements & Outcomes', href: '#achievements' },
              { label: '10. Events & Training Activities', href: '#events' },
              { label: '11. Student & Event Gallery', href: '#gallery' },
              { label: "12. Sonu's Beauty Academy (9 Courses)", href: '#professional-courses' },
              { label: "13. Sonu's Beauty Studio (36 Services)", href: '#services-pricing' },
              { label: '14. Our Two Locations (Branch 1 & 2)', href: '#locations' },
              { label: '15. Program & Course Enquiry', href: '#course-enquiry' },
              { label: '16. Salon Appointment Booking', href: '#appointment-booking' },
              { label: '17. Contact Us', href: '#contact' },
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
        {/* =====================================================================
            SAATH-INSPIRED NGO HERO SECTION (SONU FOUNDATION & CHARITABLE TRUST)
            ===================================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#f5e7d8] via-[#f2e2d2] to-[#ead5c0] border-b border-[#e2cbb3]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5e1933]/10 border border-[#5e1933]/25 text-xs font-semibold uppercase tracking-widest text-[#5e1933] mb-4">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Sonu Foundation and Charitable Trust · Vadodara</span>
                </div>

                <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.12] text-[#28121a] mb-4">
                  Empowering Lives Through
                  <span className="block text-[#6b1b3a] mt-1">
                    Skill Development &amp; Training
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#432731] font-medium max-w-2xl mb-6 leading-relaxed">
                  <strong>Sonu Foundation and Charitable Trust</strong> is dedicated to practical
                  livelihood education through hands-on{' '}
                  <strong className="text-[#5e1933]">
                    Beauty Training, Stitching &amp; Tailoring Classes, and Computer Education
                  </strong>
                  —supported by our professional salon and academy division,{' '}
                  <strong>Sonu&apos;s Beauty Studio &amp; Academy</strong>.
                </p>

                {/* Three Prominent Foundation Program Highlight Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
                  <a
                    href="#beauty-classes"
                    className="p-3 rounded-xl bg-[#faf3ec]/90 hover:bg-white border border-[#d8bc9e] transition-colors flex items-start gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#7c2344] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#3f0e21]">Beauty Training</p>
                      <p className="text-[11px] text-[#684752]">Practical Salon Skills</p>
                    </div>
                  </a>

                  <a
                    href="#stitching-classes"
                    className="p-3 rounded-xl bg-[#faf3ec]/90 hover:bg-white border border-[#d8bc9e] transition-colors flex items-start gap-2.5"
                  >
                    <Scissors className="w-4 h-4 text-[#7c2344] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#3f0e21]">Stitching Classes</p>
                      <p className="text-[11px] text-[#684752]">Tailoring &amp; Garments</p>
                    </div>
                  </a>

                  <a
                    href="#computer-classes"
                    className="p-3 rounded-xl bg-[#faf3ec]/90 hover:bg-white border border-[#d8bc9e] transition-colors flex items-start gap-2.5"
                  >
                    <Monitor className="w-4 h-4 text-[#7c2344] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#3f0e21]">Computer Classes</p>
                      <p className="text-[11px] text-[#684752]">MS Office &amp; Digital Skills</p>
                    </div>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="#our-programs"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#651b38] hover:bg-[#4a1228] text-white text-sm font-semibold shadow-sm transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore Foundation Programs</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#course-enquiry"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#651b38]/50 bg-[#faf3ec]/80 hover:bg-[#faf3ec] text-[#3f0e21] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <GraduationCap className="w-4 h-4 text-[#651b38]" />
                    <span>Enquire for Admission</span>
                  </a>

                  <a
                    href="#services"
                    className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-lg text-[#5e1933] hover:underline text-sm font-semibold whitespace-nowrap shrink-0"
                  >
                    <span>Visit Beauty Studio &amp; Academy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Real Training, Classroom & Studio Visual Showcase */}
              <div className="lg:col-span-6">
                <div className="bg-[#faf3ec] p-3.5 sm:p-4 rounded-2xl border border-[#d4af6a]/60 shadow-md">
                  <div className="rounded-xl overflow-hidden border border-[#e2cbb3] bg-[#ebd7c3] aspect-[855/316] w-full mb-3">
                    <img
                      src="/assets/sonu/hero-banner.png"
                      alt="Sonu Foundation & Sonu's Beauty Studio and Academy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl overflow-hidden border border-[#e2cbb3] bg-[#f4e8dc]">
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src="/assets/sonu/service-threading.png"
                          alt="Beauty Skill Training Practice"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <p className="text-[11px] font-bold text-[#3f0e21]">Beauty Training</p>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-[#e2cbb3] bg-[#f4e8dc]">
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src="/assets/sonu/salon-interior.png"
                          alt="Stitching & Classroom Environment"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <p className="text-[11px] font-bold text-[#3f0e21]">
                          Stitching &amp; Tailoring
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-[#e2cbb3] bg-[#f4e8dc]">
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src="/assets/sonu/hero-reception.png"
                          alt="Computer Classes & Training Desk"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <p className="text-[11px] font-bold text-[#3f0e21]">Computer Classes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SONU FOUNDATION & CHARITABLE TRUST (PRIMARY SECTIONS)
            + SONU'S BEAUTY ACADEMY (9 PROFESSIONAL COURSES)
            + UNIFIED COURSE & PROGRAM ENQUIRY FORM
            ===================================================================== */}
        <FoundationAndCoursesSection
          locations={activeLocations}
          selectedCourseId={selectedCourseId}
          onSelectCourseForEnquiry={(courseId) => setSelectedCourseId(courseId)}
        />

        {/* =====================================================================
            SONU'S BEAUTY STUDIO & ACADEMY — SALON SERVICES & PRICING SECTION
            ===================================================================== */}
        <section
          id="services"
          className="py-14 sm:py-18 bg-[#faf3ec] border-t border-[#e5d3c0] scroll-mt-24"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
                Professional Salon Division · Sonu&apos;s Beauty Studio &amp; Academy
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3f0e21]">
                Sonu&apos;s Beauty Studio — Salon Services
              </h2>
              <p className="text-sm sm:text-base text-[#563843] mt-1">
                Professional salon care across Hair, Makeup, Skin, Waxing, Hairstyles, and Nail
                Extensions at our two Vadodara studio branches.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
              <div className="xl:col-span-9 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2b1820]">
                    Featured Popular Salon Services
                  </h3>
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
                          <h4 className="font-serif-luxury text-sm font-bold text-[#2b1820] leading-snug mb-1">
                            {service.name}
                          </h4>
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

              {/* Quick Book Your Salon Appointment Box */}
              <div className="xl:col-span-3 bg-gradient-to-br from-[#52142b] via-[#651b38] to-[#3f0e21] text-white rounded-2xl p-5 border border-[#d4af6a]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-5 h-5 text-[#e7c98f] shrink-0" />
                    <h3 className="font-serif-luxury text-lg font-bold text-white">
                      Quick Salon Booking
                    </h3>
                  </div>
                  <p className="text-xs text-[#ebd8c5] mb-3">
                    Select branch, service, date &amp; time.
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

                  <div className="grid grid-cols-2 gap-2">
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
                        className="w-full px-2 py-2 rounded-lg bg-[#faf3ec] text-[#2b1820] text-xs font-medium border border-[#d4af6a]/40 tabular-nums"
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
                        className="w-full px-2 py-2 rounded-lg bg-[#faf3ec] text-[#2b1820] text-xs font-medium border border-[#d4af6a]/40 tabular-nums"
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
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#e5c78e] to-[#cfa356] hover:from-[#ebd096] hover:to-[#d9b066] text-[#2b101b] font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                  >
                    <span>Continue to Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* COMPLETE BEAUTY SERVICE CATALOG (36 Client-Supplied Services) */}
            <div
              id="services-pricing"
              className="mt-12 pt-10 border-t border-[#e5d3c0] scroll-mt-24"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
                    Sonu&apos;s Beauty Studio · Complete Salon Menu (36 Services)
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

      {/* FOOTER (Clean, No Admin Links, Sonu Foundation Primary Identity) */}
      <footer className="bg-[#3d0e20] text-[#f3e3d3] border-t border-[#d4af6a]/30">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 space-y-4">
              <BrandLogo
                variant="light-text"
                label="Sonu Foundation and Charitable Trust"
                logoSrc="/assets/aistudio/ChatGPT_Image_Nov_4__2026__09_51_48_PM_d8847b86.png"
              />
              <p className="text-xs text-[#dbc4b0] leading-relaxed">
                Empowering women and youth through vocational skill development in Beauty Training,
                Stitching &amp; Tailoring, and Computer Classes—alongside professional salon care
                and courses at{' '}
                <strong className="text-[#f7e7ce]">
                  Sonu&apos;s Beauty Studio &amp; Academy
                </strong>{' '}
                in Vadodara, Gujarat.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href={buildWhatsAppUrl(
                    BRAND_CONTACT.whatsappNumber,
                    'Hello Sonu Foundation and Charitable Trust, I have an enquiry.'
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
                Foundation Links
              </h3>
              <ul className="space-y-2 text-xs text-[#e5d0bc]">
                <li>
                  <a href="#about-foundation" className="hover:text-white transition-colors">
                    About Foundation
                  </a>
                </li>
                <li>
                  <a href="#our-mission" className="hover:text-white transition-colors">
                    Our Mission &amp; Vision
                  </a>
                </li>
                <li>
                  <a href="#our-programs" className="hover:text-white transition-colors">
                    Our Training Programs
                  </a>
                </li>
                <li>
                  <a href="#student-stories" className="hover:text-white transition-colors">
                    Student Success Stories
                  </a>
                </li>
                <li>
                  <a href="#achievements" className="hover:text-white transition-colors">
                    Student Achievements
                  </a>
                </li>
                <li>
                  <a href="#events" className="hover:text-white transition-colors">
                    Events &amp; Workshops
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-serif-luxury text-base font-bold text-white mb-3">
                Skill Programs
              </h3>
              <ul className="space-y-2 text-xs text-[#e5d0bc]">
                <li>
                  <a href="#beauty-classes" className="hover:text-white transition-colors">
                    Beauty Training Classes
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
                  <a href="#professional-courses" className="hover:text-white transition-colors">
                    Beauty Academy (9 Courses)
                  </a>
                </li>
                <li>
                  <a href="#certificates" className="hover:text-white transition-colors">
                    Certificates &amp; Recognition
                  </a>
                </li>
                <li>
                  <a href="#course-enquiry" className="hover:text-white transition-colors">
                    Admission Enquiry Form
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-serif-luxury text-base font-bold text-white mb-3">
                Beauty Studio
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
                    Acrylic, Gel &amp; Nail Art
                  </a>
                </li>
                <li>
                  <a href="#appointment-booking" className="hover:text-white transition-colors">
                    Book Salon Appointment
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
                  Subscribe for Program &amp; Salon Updates
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
                    aria-label="Subscribe for updates"
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
              &copy; {new Date().getFullYear()} Sonu Foundation and Charitable Trust · Sonu&apos;s
              Beauty Studio &amp; Academy. All rights reserved.
            </p>
            <p>Branch 1 &amp; Branch 2 (22.305021, 73.210297) · Vadodara, Gujarat</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP ACTION BUTTON */}
      <a
        href={buildWhatsAppUrl(
          BRAND_CONTACT.whatsappNumber,
          'Hello Sonu Foundation and Charitable Trust, I would like to enquire about training programs / salon appointments.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sonu Foundation and Charitable Trust on WhatsApp"
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
