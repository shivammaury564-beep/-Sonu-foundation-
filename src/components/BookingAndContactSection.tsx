import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  POPULAR_SERVICES,
  StudioLocation,
  BRAND_CONTACT,
} from '../data/catalogData';
import {
  generateTimeSlotsForHours,
  formatOpeningHoursRange,
  validateBookingInput,
  validateContactInput,
  getKolkataNow,
} from '../utils/validation';

interface BookingAndContactSectionProps {
  locations: StudioLocation[];
  selectedLocationId: string;
  selectedServiceId: string;
  prefilledDate?: string;
  prefilledTime?: string;
  onLocationChange: (locationId: string) => void;
  onServiceChange: (serviceId: string) => void;
}

function getDefaultTomorrowKolkata(): string {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return getKolkataNow(tomorrow).dateStr;
}

export const BookingAndContactSection: React.FC<BookingAndContactSectionProps> = ({
  locations,
  selectedLocationId,
  selectedServiceId,
  prefilledDate,
  prefilledTime,
  onLocationChange,
  onServiceChange,
}) => {
  const minDateKolkata = getKolkataNow().dateStr;

  const currentLocation =
    locations.find((l) => l.id === selectedLocationId) || locations[0];

  // Filter services available for the selected location
  const servicesForSelectedLocation = React.useMemo(() => {
    if (!currentLocation || !Array.isArray(currentLocation.available_services)) {
      return POPULAR_SERVICES;
    }
    const list = POPULAR_SERVICES.filter((s) =>
      currentLocation.available_services.includes(s.id)
    );
    return list.length > 0 ? list : POPULAR_SERVICES;
  }, [currentLocation]);

  // Compute time slots available for the selected location's opening & closing hours
  const slotsForSelectedLocation = React.useMemo(() => {
    if (!currentLocation) return generateTimeSlotsForHours('10:00', '20:00');
    return generateTimeSlotsForHours(
      currentLocation.opening_time,
      currentLocation.closing_time
    );
  }, [currentLocation]);

  // Appointment Booking Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(
    prefilledDate || getDefaultTomorrowKolkata()
  );
  const [timeSlot, setTimeSlot] = useState<string>(
    prefilledTime || slotsForSelectedLocation[1] || '11:00 AM'
  );
  const [message, setMessage] = useState('');
  const [bookingHoneypot, setBookingHoneypot] = useState('');

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingRef: string;
    status: string;
    locationName: string;
    locationAddress: string;
    locationDirectionsUrl: string;
    serviceName: string;
    appointmentDate: string;
    timeSlot: string;
    whatsappFallbackUrl: string;
    whatsappPendingRequestText: string;
    message: string;
  } | null>(null);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactHoneypot, setContactHoneypot] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState<{
    contactRef: string;
    whatsappFallbackUrl: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (prefilledDate) setAppointmentDate(prefilledDate);
  }, [prefilledDate]);

  useEffect(() => {
    if (prefilledTime && slotsForSelectedLocation.includes(prefilledTime)) {
      setTimeSlot(prefilledTime);
    } else if (!slotsForSelectedLocation.includes(timeSlot)) {
      setTimeSlot(slotsForSelectedLocation[0] || '10:00 AM');
    }
  }, [prefilledTime, slotsForSelectedLocation]);

  // Ensure selectedServiceId is valid for the selected location
  useEffect(() => {
    if (
      servicesForSelectedLocation.length > 0 &&
      !servicesForSelectedLocation.some((s) => s.id === selectedServiceId)
    ) {
      onServiceChange(servicesForSelectedLocation[0].id);
    }
  }, [servicesForSelectedLocation, selectedServiceId]);

  // Fetch non-sensitive slot availability whenever location or date changes
  useEffect(() => {
    let active = true;
    async function loadAvailability() {
      if (!currentLocation || !/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) return;
      setLoadingSlots(true);
      try {
        const res = await fetch(
          `/api/availability?locationId=${encodeURIComponent(currentLocation.id)}&date=${encodeURIComponent(appointmentDate)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data.bookedSlots)) {
            setBookedSlots(data.bookedSlots);
          }
        }
      } catch {
        // Keep existing state on transient error
      } finally {
        if (active) setLoadingSlots(false);
      }
    }
    loadAvailability();
    return () => {
      active = false;
    };
  }, [currentLocation?.id, appointmentDate]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (!currentLocation) {
      setBookingError('Please select a studio location.');
      return;
    }

    const selectedService = POPULAR_SERVICES.find((s) => s.id === selectedServiceId);

    const validation = validateBookingInput(
      {
        customerName,
        phone,
        email,
        locationId: currentLocation.id,
        serviceId: selectedServiceId,
        serviceName: selectedService?.name,
        appointmentDate,
        timeSlot,
        message,
        honeypot: bookingHoneypot,
      },
      bookedSlots,
      new Date(),
      {
        activeIds: locations.map((l) => l.id),
        openingTime: currentLocation.opening_time,
        closingTime: currentLocation.closing_time,
        availableServices: currentLocation.available_services,
      }
    );

    if (!validation.valid) {
      setBookingError(validation.error || 'Please verify your booking details.');
      return;
    }

    setBookingSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          locationId: currentLocation.id,
          serviceId: selectedServiceId,
          serviceName: selectedService?.name,
          appointmentDate,
          timeSlot,
          message,
          honeypot: bookingHoneypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setBookingError(data.error || 'Could not submit booking request.');
        return;
      }

      setBookedSlots((prev) => Array.from(new Set([...prev, timeSlot])));
      setBookingSuccess({
        bookingRef: data.bookingRef,
        status: data.status || 'Pending Confirmation',
        locationName: data.locationName,
        locationAddress: data.locationAddress,
        locationDirectionsUrl: data.locationDirectionsUrl,
        serviceName: data.serviceName,
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        whatsappFallbackUrl: data.whatsappFallbackUrl,
        whatsappPendingRequestText: data.whatsappPendingRequestText,
        message: data.message,
      });
      setCustomerName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch {
      setBookingError('Network error while submitting your booking request. Please try again.');
    } finally {
      setBookingSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);

    const validation = validateContactInput({
      name: contactName,
      phone: contactPhone,
      email: contactEmail,
      subject: contactSubject,
      message: contactMessage,
      honeypot: contactHoneypot,
    });

    if (!validation.valid) {
      setContactError(validation.error || 'Please check the contact form fields.');
      return;
    }

    setContactSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage,
          honeypot: contactHoneypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setContactError(data.error || 'Could not send message.');
        return;
      }

      setContactSuccess({
        contactRef: data.contactRef,
        whatsappFallbackUrl: data.whatsappFallbackUrl,
        message: data.message,
      });
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    } catch {
      setContactError('Network error while sending your message. Please try again.');
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <section
      id="appointment-booking"
      className="py-16 sm:py-20 bg-[#faf3ec] border-t border-[#e5d3c0] scroll-mt-24"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT 7 COLUMNS: FUNCTIONAL TWO-LOCATION APPOINTMENT BOOKING */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#4a1228] via-[#5e1933] to-[#380b1d] text-[#faf3ec] rounded-2xl p-6 sm:p-10 border border-[#d4af6a]/40 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-[#e7c98f] shrink-0" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#e7c98f]">
                Two-Branch Appointment Booking · Asia/Kolkata (IST)
              </p>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-2">
              Book Your Appointment
            </h2>
            <p className="text-sm text-[#eddcc9] mb-6">
              Select your preferred studio branch, beauty service, date, and available time slot.
              All requests are saved with initial status <strong>Pending Confirmation</strong> until
              manually confirmed by our studio team.
            </p>

            {bookingSuccess ? (
              <div
                role="status"
                aria-live="polite"
                data-testid="booking-confirmation-card"
                className="bg-[#faf3ec] text-[#2b1820] rounded-xl p-6 border border-[#d4af6a]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#e5d3c0]">
                  <div className="flex items-center gap-2 text-[#5e1933] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Booking Request Submitted (Pending Confirmation)</span>
                  </div>
                  <span className="text-xs font-semibold text-[#7c2344] tabular-nums">
                    Booking Ref: {bookingSuccess.bookingRef} · Status: {bookingSuccess.status}
                  </span>
                </div>

                <p className="text-sm text-[#4a1228] leading-relaxed mb-4">
                  {bookingSuccess.message}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#f5ebe0] p-4 rounded-lg border border-[#e2cbb3] text-xs text-[#3f0e21] mb-4">
                  <div>
                    <span className="text-[#7a5864] block">Selected Branch</span>
                    <strong className="text-[#5e1933]">{bookingSuccess.locationName}</strong>
                  </div>
                  <div>
                    <span className="text-[#7a5864] block">Address</span>
                    <strong>{bookingSuccess.locationAddress}</strong>
                  </div>
                  <div>
                    <span className="text-[#7a5864] block">Service &amp; Requested Slot (IST)</span>
                    <strong className="tabular-nums">
                      {bookingSuccess.serviceName} · {bookingSuccess.appointmentDate} at{' '}
                      {bookingSuccess.timeSlot}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#7a5864] block">Booking Reference &amp; Status</span>
                    <strong className="tabular-nums">
                      {bookingSuccess.bookingRef} ({bookingSuccess.status})
                    </strong>
                  </div>
                </div>

                {/* WhatsApp Booking Request Summary (Pending Confirmation) */}
                <div className="mb-5">
                  <p className="text-xs font-bold text-[#3f0e21] mb-1.5">
                    WhatsApp Booking Request Summary (Pending Owner Confirmation):
                  </p>
                  <pre className="p-3.5 rounded-lg bg-white border border-[#e5d3c0] text-xs text-[#2b1820] whitespace-pre-wrap font-sans leading-relaxed">
                    {bookingSuccess.whatsappPendingRequestText}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={bookingSuccess.whatsappFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Booking Enquiry on WhatsApp</span>
                  </a>
                  <a
                    href={bookingSuccess.locationDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#5e1933]/40 text-[#4a1228] hover:bg-[#efe1d1] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setBookingSuccess(null)}
                    className="px-4 py-2.5 rounded-lg border border-[#5e1933]/40 text-[#4a1228] hover:bg-[#efe1d1] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} noValidate className="space-y-4">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="bk-company">Company</label>
                  <input
                    id="bk-company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={bookingHoneypot}
                    onChange={(e) => setBookingHoneypot(e.target.value)}
                  />
                </div>

                {bookingError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-[#fff1f2] border border-[#fecdd3] text-[#881337] text-xs font-semibold flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{bookingError}</span>
                  </div>
                )}

                {/* STEP 1: SELECT YOUR LOCATION */}
                <div className="p-4 rounded-xl bg-black/20 border border-[#d4af6a]/40">
                  <label
                    htmlFor="bk-location"
                    className="block text-xs sm:text-sm font-bold text-[#e7c98f] mb-2"
                  >
                    Select Your Location *
                  </label>
                  <select
                    id="bk-location"
                    value={currentLocation?.id || ''}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf3ec] text-[#2b1820] text-sm font-semibold border border-[#d4af6a] focus:outline-2 focus:outline-[#e7c98f]"
                  >
                    {locations.map((loc, idx) => (
                      <option key={loc.id} value={loc.id}>
                        {idx + 1}. {loc.location_name} ({loc.address || `${loc.city}, ${loc.state}`})
                      </option>
                    ))}
                  </select>
                  {currentLocation && (
                    <p className="text-[11px] text-[#eddcc9] mt-2">
                      Address: <strong>{currentLocation.address}</strong> · Hours:{' '}
                      <span className="tabular-nums">
                        {formatOpeningHoursRange(
                          currentLocation.opening_time,
                          currentLocation.closing_time
                        )}
                      </span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="bk-name"
                      className="block text-xs font-semibold text-[#f7e7ce] mb-1.5"
                    >
                      Customer Full Name *
                    </label>
                    <input
                      id="bk-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf3ec] text-[#2b1820] text-sm border border-[#d4af6a]/50 focus:outline-2 focus:outline-[#e7c98f]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bk-phone"
                      className="block text-xs font-semibold text-[#f7e7ce] mb-1.5"
                    >
                      Indian Phone Number (10 Digits) *
                    </label>
                    <input
                      id="bk-phone"
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf3ec] text-[#2b1820] text-sm border border-[#d4af6a]/50 focus:outline-2 focus:outline-[#e7c98f]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bk-email"
                      className="block text-xs font-semibold text-[#f7e7ce] mb-1.5"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="bk-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf3ec] text-[#2b1820] text-sm border border-[#d4af6a]/50 focus:outline-2 focus:outline-[#e7c98f]"
                    />
                  </div>
                </div>

                {/* SERVICES & TIME SLOTS AVAILABLE FOR THE SELECTED LOCATION */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="bk-service"
                      className="block text-xs font-semibold text-[#f7e7ce] mb-1.5"
                    >
                      Available Service at Location *
                    </label>
                    <select
                      id="bk-service"
                      value={selectedServiceId}
                      onChange={(e) => onServiceChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf3ec] text-[#2b1820] text-sm border border-[#d4af6a]/50 focus:outline-2 focus:outline-[#e7c98f]"
                    >
                      {servicesForSelectedLocation.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.priceLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="bk-date"
                      className="block text-xs font-semibold text-[#f7e7ce] mb-1.5"
                    >
                      Appointment Date *
                    </label>
                    <input
                      id="bk-date"
                      type="date"
                      required
                      min={minDateKolkata}
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf3ec] text-[#2b1820] text-sm border border-[#d4af6a]/50 focus:outline-2 focus:outline-[#e7c98f] tabular-nums"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bk-slot"
                      className="block text-xs font-semibold text-[#f7e7ce] mb-1.5"
                    >
                      Available Time Slot *
                    </label>
                    <select
                      id="bk-slot"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf3ec] text-[#2b1820] text-sm border border-[#d4af6a]/50 focus:outline-2 focus:outline-[#e7c98f] tabular-nums"
                    >
                      {slotsForSelectedLocation.map((slot) => {
                        const isTaken = bookedSlots.includes(slot);
                        return (
                          <option key={slot} value={slot} disabled={isTaken}>
                            {slot} {isTaken ? '(Booked)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {loadingSlots && (
                  <p className="text-xs text-[#e7c98f]">
                    Checking live slot availability for {currentLocation?.location_name}...
                  </p>
                )}

                <div>
                  <label
                    htmlFor="bk-message"
                    className="block text-xs font-semibold text-[#f7e7ce] mb-1.5"
                  >
                    Additional Message or Bridal / Styling Notes (Optional)
                  </label>
                  <textarea
                    id="bk-message"
                    rows={2}
                    placeholder="Share any specific preferences, skin sensitivities, or event date details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf3ec] text-[#2b1820] text-sm border border-[#d4af6a]/50 focus:outline-2 focus:outline-[#e7c98f]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={bookingSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#e2bf7d] to-[#cfa356] hover:from-[#ebd096] hover:to-[#d9b066] text-[#2b101b] font-bold text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>
                      {bookingSubmitting ? 'Submitting Request...' : 'Request Appointment'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-xs text-[#e5d0bc]">
                    Selected Location: <strong>{currentLocation?.location_name}</strong>
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT 5 COLUMNS: CONTACT US & ENQUIRY FORM */}
          <div
            id="contact"
            className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#dec5ac] scroll-mt-20"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
              Get in Touch
            </p>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3f0e21] mb-2">
              Contact Sonu&apos;s Beauty Studio
            </h2>
            <p className="text-xs sm:text-sm text-[#563843] mb-6">
              Have a question about bridal packages, salon services, or Sonu Foundation skill
              classes across our two locations? Send us a message or connect via WhatsApp.
            </p>

            <div className="space-y-2.5 p-4 rounded-xl bg-[#faf3ec] border border-[#e5d3c0] text-xs text-[#4a1228] mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#5e1933] shrink-0 mt-0.5" />
                <span>
                  {BRAND_CONTACT.businessName}, {BRAND_CONTACT.city} ({locations.length} Active Locations)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#5e1933] shrink-0" />
                <a
                  href={`tel:${BRAND_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
                  className="font-semibold hover:underline tabular-nums"
                >
                  {BRAND_CONTACT.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#5e1933] shrink-0" />
                <a
                  href={`mailto:${BRAND_CONTACT.email}`}
                  className="font-semibold hover:underline"
                >
                  {BRAND_CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#5e1933] shrink-0" />
                <span className="tabular-nums">{BRAND_CONTACT.hours}</span>
              </div>
            </div>

            {contactSuccess ? (
              <div
                role="status"
                aria-live="polite"
                className="p-5 rounded-xl bg-[#faf3ec] border border-[#d4af6a]"
              >
                <div className="flex items-center gap-2 text-[#5e1933] font-bold text-sm mb-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Message Received · Ref: {contactSuccess.contactRef}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#563843] mb-4">{contactSuccess.message}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={contactSuccess.whatsappFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Continue on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setContactSuccess(null)}
                    className="px-3.5 py-2 rounded-lg border border-[#d5bda4] text-[#4a1228] text-xs font-semibold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} noValidate className="space-y-3.5">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="ct-fax">Fax</label>
                  <input
                    id="ct-fax"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={contactHoneypot}
                    onChange={(e) => setContactHoneypot(e.target.value)}
                  />
                </div>

                {contactError && (
                  <div
                    role="alert"
                    className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800"
                  >
                    {contactError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="ct-name"
                      className="block text-xs font-semibold text-[#3f0e21] mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      id="ct-name"
                      type="text"
                      required
                      placeholder="Full name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ct-phone"
                      className="block text-xs font-semibold text-[#3f0e21] mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="ct-phone"
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="ct-email"
                      className="block text-xs font-semibold text-[#3f0e21] mb-1"
                    >
                      Email (Optional)
                    </label>
                    <input
                      id="ct-email"
                      type="email"
                      placeholder="you@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ct-subject"
                      className="block text-xs font-semibold text-[#3f0e21] mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      id="ct-subject"
                      type="text"
                      required
                      placeholder="Bridal enquiry / Course details"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ct-message"
                    className="block text-xs font-semibold text-[#3f0e21] mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="ct-message"
                    rows={3}
                    required
                    placeholder="How can we help you?"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>{contactSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
