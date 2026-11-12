import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Calendar,
  MessageCircle,
  Play,
  Star,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  Gem,
  Eye,
} from 'lucide-react';
import {
  GALLERY_MEDIA,
  GALLERY_CATEGORIES,
  GalleryCategoryName,
  GalleryMediaItem,
  StudioLocation,
  CLIENT_REVIEWS,
} from '../data/catalogData';
import {
  buildWhatsAppUrl,
  formatOpeningHoursRange,
  getDirectionsUrlForLocation,
} from '../utils/validation';

interface GalleryAndBranchesSectionProps {
  locations: StudioLocation[];
  onSelectLocationForBooking: (locationId: string) => void;
}

type GalleryFilter = 'All' | GalleryCategoryName;

export const GalleryAndBranchesSection: React.FC<GalleryAndBranchesSectionProps> = ({
  locations,
  onSelectLocationForBooking,
}) => {
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('All');
  const [selectedMedia, setSelectedMedia] = useState<GalleryMediaItem | null>(null);

  const visibleGallery =
    galleryFilter === 'All'
      ? GALLERY_MEDIA
      : GALLERY_MEDIA.filter((item) => item.category === galleryFilter);

  const handleBookLocation = (locationId: string) => {
    onSelectLocationForBooking(locationId);
    const el = document.getElementById('appointment-booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getMapEmbedSrc = (loc: StudioLocation) => {
    if (loc.latitude !== null && loc.longitude !== null) {
      return `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`;
    }
    return `https://www.google.com/maps?q=${encodeURIComponent(
      loc.address || 'Vadodara, Gujarat'
    )}&z=14&output=embed`;
  };

  return (
    <>
      {/* SECTION 11: STUDENT GALLERY & MEDIA (All 11 Categories) */}
      <section
        id="gallery"
        className="py-16 sm:py-20 bg-[#f5ebe0] border-t border-[#e5d3c0] scroll-mt-24"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
              Salon Portfolio, Academy Classrooms &amp; Foundation Activities
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3f0e21] mb-4">
              Studio, Academy &amp; Student Gallery
            </h2>

            <div
              role="tablist"
              aria-label="Filter gallery items by category"
              className="flex flex-wrap items-center gap-1.5 p-2 bg-[#eadbc9] rounded-xl border border-[#dac3ab]"
            >
              {(['All', ...GALLERY_CATEGORIES] as GalleryFilter[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={galleryFilter === tab}
                  onClick={() => setGalleryFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    galleryFilter === tab
                      ? 'bg-[#5e1933] text-white shadow-xs'
                      : 'text-[#4a1228] hover:bg-[#dfd0be]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div
            id="student-gallery"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-24"
          >
            {visibleGallery.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#e2cbb3] flex flex-col justify-between shadow-2xs"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2b121c]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full ${
                      item.fitMode === 'contain' ? 'object-contain bg-[#faf3ec]' : 'object-cover'
                    } object-center transition-transform duration-200 group-hover:scale-[1.02]`}
                  />

                  {item.isVideo && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setSelectedMedia(item)}
                        aria-label={`Play video preview: ${item.title}`}
                        className="w-12 h-12 rounded-full bg-[#d4af6a] text-[#2d0917] flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#7c2344] font-medium mb-1.5">
                      <span>{item.category}</span>
                      {item.isVideo && item.videoDuration && (
                        <span className="tabular-nums">Video · {item.videoDuration}</span>
                      )}
                    </div>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#3f0e21] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#563843] leading-relaxed mb-3">{item.caption}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedMedia(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5e1933] hover:text-[#3f0e21] cursor-pointer self-start"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{item.isVideo ? 'Watch Walkthrough Preview' : 'View Full Frame'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: TWO BRANCH LOCATIONS (Branch 1 & Branch 2) */}
      <section
        id="branches"
        className="py-16 sm:py-20 bg-[#faf3ec] border-t border-[#e5d3c0] scroll-mt-28"
      >
        <div
          id="locations"
          className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28"
        >
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
              Two Physical Studio &amp; Academy Branches · Vadodara, Gujarat
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3f0e21]">
              Our Locations
            </h2>
            <p className="text-sm sm:text-base text-[#563843] mt-1">
              Sonu&apos;s Beauty Studio &amp; Academy operates across two physical studio branches
              in Vadodara. Select your preferred branch for beauty appointments or training enquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((loc) => {
              const directionsUrl = getDirectionsUrlForLocation(loc);
              const formattedHours = formatOpeningHoursRange(
                loc.opening_time,
                loc.closing_time
              );

              return (
                <article
                  key={loc.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#dec5ac] flex flex-col justify-between shadow-xs"
                >
                  <div>
                    {/* Exterior & Interior Photographs Preview */}
                    <div className="grid grid-cols-2 gap-1 bg-[#f4e8dc] border-b border-[#e5d3c0]">
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={loc.interior_image_url || loc.image_url}
                          alt={`${loc.location_name} — Studio Interior`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/65 text-[#faf3ec] text-[10px] font-medium">
                          Interior View
                        </span>
                      </div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={loc.exterior_image_url || loc.image_url}
                          alt={`${loc.location_name} — Reception & Entrance`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/65 text-[#faf3ec] text-[10px] font-medium">
                          Reception / Branch View
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#7c2344] mb-1">
                        <span>{loc.branch_label}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {loc.city}, {loc.state}
                        </span>
                        {loc.latitude !== null && loc.longitude !== null && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">
                              GPS: {loc.latitude}, {loc.longitude}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif-luxury text-2xl font-bold text-[#3f0e21] mb-4">
                        {loc.location_name}
                      </h3>

                      <div className="space-y-2.5 text-sm text-[#4a1228] mb-5">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-[#5e1933] shrink-0 mt-1" />
                          <div>
                            <span>{loc.address || `${loc.city}, ${loc.state}`}</span>
                            <span className="block text-xs text-[#6e4d59]">
                              PIN Code: {loc.pincode || 'Contact for Details'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-[#5e1933] shrink-0" />
                          <a
                            href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                            className="font-semibold hover:underline tabular-nums"
                          >
                            {loc.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-[#5e1933] shrink-0" />
                          <span className="tabular-nums">{formattedHours}</span>
                        </div>
                      </div>

                      {/* Interactive Google Maps Preview */}
                      <div className="rounded-xl overflow-hidden border border-[#e5d3c0] bg-[#faf3ec] h-44 w-full">
                        <iframe
                          title={`Google Maps Preview for ${loc.location_name}`}
                          src={getMapEmbedSrc(loc)}
                          className="w-full h-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-[#f0e2d3] flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleBookLocation(loc.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Appointment</span>
                    </button>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#d5bda4] hover:bg-[#faf3ec] text-[#4a1228] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </a>

                    <a
                      href={buildWhatsAppUrl(
                        loc.whatsapp || loc.phone,
                        `Hello ${loc.location_name}, I would like to enquire about an appointment / directions.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#25D366]/50 text-[#1b6e39] hover:bg-[#25D366]/10 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Branch</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 14: CLIENT & TRAINEE REVIEWS */}
      <section
        id="reviews"
        className="py-16 bg-[#f5ebe0] border-t border-[#e5d3c0] scroll-mt-24"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
                Verified Client &amp; Student Feedback · Vadodara
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3f0e21]">
                Client &amp; Trainee Reviews
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#faf3ec] rounded-2xl p-6 border border-[#e2cbb3] flex flex-col justify-between"
              >
                <div>
                  <div
                    className="flex items-center gap-1 text-[#c9953c] mb-3"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#4a1228] leading-relaxed mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-[#e5d3c0]">
                  <p className="font-serif-luxury font-bold text-base text-[#3f0e21]">
                    {rev.name}
                  </p>
                  <p className="text-xs text-[#6e4d59]">
                    {rev.role} · {rev.service}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US STRIP */}
      <section className="py-8 bg-[#efe2d3] border-y border-[#dec6ad]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 items-center">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <h2 className="font-serif-luxury text-xl font-bold text-[#3f0e21]">
                Why Choose Us?
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Gem className="w-6 h-6 text-[#7c2344] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#3f0e21]">Experienced Team</p>
                <p className="text-[11px] text-[#684752]">Skilled &amp; Professional</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#7c2344] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#3f0e21]">Premium Products</p>
                <p className="text-[11px] text-[#684752]">Skin-Friendly Care</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#7c2344] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#3f0e21]">Hygienic &amp; Safe</p>
                <p className="text-[11px] text-[#684752]">Clean &amp; Sanitized Space</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#7c2344] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#3f0e21]">Easy Booking</p>
                <p className="text-[11px] text-[#684752]">Two Studio Branches</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-[#7c2344] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#3f0e21]">Training Academy</p>
                <p className="text-[11px] text-[#684752]">Practical Skill Courses</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-[#7c2344] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#3f0e21]">Customer Support</p>
                <p className="text-[11px] text-[#684752]">Always Here For You</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Lightbox Modal */}
      {selectedMedia && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        >
          <div className="bg-[#faf3ec] rounded-2xl max-w-3xl w-full overflow-hidden border border-[#d4af6a]">
            <div className="aspect-[16/9] w-full bg-[#1e0a12] overflow-hidden flex items-center justify-center">
              <img
                src={selectedMedia.image}
                alt={selectedMedia.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-center"
              />
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#7c2344]">{selectedMedia.category}</p>
                <h3
                  id="gallery-modal-title"
                  className="font-serif-luxury text-xl font-bold text-[#3f0e21]"
                >
                  {selectedMedia.title}
                </h3>
                <p className="text-xs text-[#563843] mt-1">{selectedMedia.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="px-4 py-2 rounded-lg bg-[#5e1933] text-white text-xs font-semibold hover:bg-[#4a1228] cursor-pointer shrink-0"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
