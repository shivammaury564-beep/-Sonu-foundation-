export interface BookingInput {
  customerName: string;
  phone: string;
  email?: string;
  locationId: string;
  serviceId: string;
  serviceName?: string;
  appointmentDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "10:00 AM"
  message?: string;
  honeypot?: string;
}

export interface CourseEnquiryInput {
  studentName: string;
  phone: string;
  courseCategory?: string;
  courseId: string;
  courseTitle?: string;
  preferredBranch: string;
  preferredBatch: string;
  message?: string;
  honeypot?: string;
}

export interface ContactEnquiryInput {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export const STANDARD_TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
] as const;

export function formatHour12(hour24: number): string {
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${String(hour12).padStart(2, '0')}:00 ${period}`;
}

export function formatOpeningHoursRange(openingTime: string, closingTime: string): string {
  const openH = Number((openingTime || '10:00').split(':')[0]);
  const closeH = Number((closingTime || '20:00').split(':')[0]);
  if (Number.isNaN(openH) || Number.isNaN(closeH)) {
    return 'Mon – Sun: 10:00 AM - 8:00 PM';
  }
  return `Mon – Sun: ${formatHour12(openH)} - ${formatHour12(closeH)}`;
}

/**
 * Generates 1-hour appointment time slots between openingTime (e.g. "10:00") and closingTime (e.g. "20:00").
 */
export function generateTimeSlotsForHours(
  openingTime = '10:00',
  closingTime = '20:00'
): string[] {
  const openHour = Number(openingTime.split(':')[0]);
  const closeHour = Number(closingTime.split(':')[0]);
  if (Number.isNaN(openHour) || Number.isNaN(closeHour) || openHour >= closeHour) {
    return [...STANDARD_TIME_SLOTS];
  }
  const slots: string[] = [];
  for (let h = openHour; h < closeHour; h++) {
    slots.push(formatHour12(h));
  }
  return slots;
}

/**
 * Preserves exact Google Maps coordinates URL when latitude & longitude are configured,
 * ensuring Location 2 (22.305021, 73.210297) always opens the exact coordinates.
 */
export function getDirectionsUrlForLocation(loc: {
  google_maps_url?: string;
  latitude?: number | null;
  longitude?: number | null;
}): string {
  if (
    typeof loc.latitude === 'number' &&
    !Number.isNaN(loc.latitude) &&
    typeof loc.longitude === 'number' &&
    !Number.isNaN(loc.longitude)
  ) {
    return `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`;
  }
  return (
    loc.google_maps_url ||
    'https://www.google.com/maps/search/?api=1&query=Sonu%27s+Beauty+Studio+and+Academy+Vadodara+Gujarat'
  );
}

/**
 * Formats a customer-facing WhatsApp appointment request summary with Status: Pending Confirmation.
 */
export function formatWhatsAppPendingBookingRequest(params: {
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
  bookingId: string;
}): string {
  return [
    `Hello Sonu’s Beauty Studio & Academy 👋`,
    ``,
    `I have submitted an appointment booking request (Status: Pending Confirmation).`,
    ``,
    `Customer: ${params.customerName}`,
    `Service: ${params.serviceName}`,
    `Date: ${params.date}`,
    `Time: ${params.time} (IST)`,
    `Branch: ${params.locationName}`,
    `Address: ${params.locationAddress}`,
    `Booking Reference: ${params.bookingId}`,
    ``,
    `Please review and confirm my appointment slot.`,
  ].join('\n');
}

/**
 * Formats the manual owner WhatsApp appointment confirmation message once the owner confirms a booking.
 */
export function formatWhatsAppBookingConfirmation(params: {
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
  bookingId: string;
}): string {
  return [
    `Hello ${params.customerName} 👋`,
    ``,
    `Your appointment at Sonu’s Beauty Studio & Academy has been confirmed.`,
    ``,
    `Service: ${params.serviceName}`,
    `Date: ${params.date}`,
    `Time: ${params.time}`,
    `Location: ${params.locationName}`,
    `Address: ${params.locationAddress}`,
    `Booking ID: ${params.bookingId}`,
    ``,
    `Please arrive 5–10 minutes before your appointment.`,
    ``,
    `Thank you for choosing Sonu’s Beauty Studio & Academy.`,
  ].join('\n');
}

export function sanitizeText(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates Indian mobile numbers:
 * Accepts 10 digits starting with 6-9, optionally prefixed with +91, 91, or 0,
 * and allows spaces or hyphens during input.
 */
export function normalizeIndianPhone(rawPhone: string): string | null {
  const digits = rawPhone.replace(/[^\d]/g, '');
  let core = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    core = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    core = digits.slice(1);
  }
  if (/^[6-9]\d{9}$/.test(core)) {
    return core;
  }
  return null;
}

export function isValidEmail(email: string): boolean {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Returns current date string YYYY-MM-DD and hour in Asia/Kolkata timezone.
 */
export function getKolkataNow(referenceDate: Date = new Date()): {
  dateStr: string;
  hour24: number;
  minute: number;
} {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(referenceDate);
  const map: Record<string, string> = {};
  for (const part of parts) {
    map[part.type] = part.value;
  }
  const dateStr = `${map.year}-${map.month}-${map.day}`;
  const hour24 = Number(map.hour === '24' ? '0' : map.hour);
  const minute = Number(map.minute);
  return { dateStr, hour24, minute };
}

export function parseSlotHour24(slot: string): number | null {
  const match = slot.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return hour;
}

export function validateDateAndSlotInKolkata(
  appointmentDate: string,
  timeSlot: string,
  referenceDate: Date = new Date(),
  openingTime = '10:00',
  closingTime = '20:00'
): { valid: boolean; error?: string } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
    return { valid: false, error: 'Please select a valid appointment date (YYYY-MM-DD).' };
  }

  const allowedSlots = generateTimeSlotsForHours(openingTime, closingTime);
  const slotHour = parseSlotHour24(timeSlot);
  if (slotHour === null || !allowedSlots.includes(timeSlot)) {
    return {
      valid: false,
      error: `Please select a valid time slot within location opening hours (${formatOpeningHoursRange(openingTime, closingTime)}).`,
    };
  }

  const openHour = Number(openingTime.split(':')[0]) || 10;
  const closeHour = Number(closingTime.split(':')[0]) || 20;
  if (slotHour < openHour || slotHour >= closeHour) {
    return {
      valid: false,
      error: `Selected time slot is outside location business hours (${formatOpeningHoursRange(openingTime, closingTime)}).`,
    };
  }

  const { dateStr: todayKolkata, hour24: currentHourKolkata } = getKolkataNow(referenceDate);

  if (appointmentDate < todayKolkata) {
    return { valid: false, error: 'Past dates cannot be booked. Please choose today or a future date.' };
  }

  if (appointmentDate === todayKolkata && slotHour <= currentHourKolkata) {
    return {
      valid: false,
      error: 'This time slot has already passed for today (Asia/Kolkata time). Please pick a later slot or tomorrow.',
    };
  }

  return { valid: true };
}

export function validateBookingInput(
  input: BookingInput,
  bookedSlotsForLocationDate: string[] = [],
  referenceDate: Date = new Date(),
  locationConfig?: {
    activeIds?: string[];
    openingTime?: string;
    closingTime?: string;
    availableServices?: string[];
  }
): { valid: boolean; error?: string; normalizedPhone?: string } {
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { valid: false, error: 'Spam submission rejected.' };
  }

  const name = sanitizeText(input.customerName, 100);
  if (!name || name.length < 2) {
    return { valid: false, error: 'Please enter your full name (at least 2 characters).' };
  }

  const normalizedPhone = normalizeIndianPhone(input.phone || '');
  if (!normalizedPhone) {
    return {
      valid: false,
      error: 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).',
    };
  }

  if (input.email && !isValidEmail(input.email)) {
    return { valid: false, error: 'Please enter a valid email address or leave it blank.' };
  }

  const locId = sanitizeText(input.locationId, 60);
  if (!locId) {
    return { valid: false, error: 'Please select a studio location.' };
  }
  if (
    locationConfig?.activeIds &&
    locationConfig.activeIds.length > 0 &&
    !locationConfig.activeIds.includes(locId)
  ) {
    return { valid: false, error: 'Please select an active studio location.' };
  }

  const srvId = sanitizeText(input.serviceId, 100);
  if (!srvId) {
    return { valid: false, error: 'Please select a beauty service for your appointment.' };
  }
  if (
    locationConfig?.availableServices &&
    locationConfig.availableServices.length > 0 &&
    !locationConfig.availableServices.includes(srvId)
  ) {
    return {
      valid: false,
      error: 'The selected service is not available at this location. Please choose an available service.',
    };
  }

  const dateSlotCheck = validateDateAndSlotInKolkata(
    input.appointmentDate,
    input.timeSlot,
    referenceDate,
    locationConfig?.openingTime || '10:00',
    locationConfig?.closingTime || '20:00'
  );
  if (!dateSlotCheck.valid) {
    return dateSlotCheck;
  }

  if (bookedSlotsForLocationDate.includes(input.timeSlot)) {
    return {
      valid: false,
      error: `The ${input.timeSlot} slot on ${input.appointmentDate} is already reserved at this location. Please select another time slot.`,
    };
  }

  return { valid: true, normalizedPhone };
}

export function validateCourseEnquiryInput(input: CourseEnquiryInput): {
  valid: boolean;
  error?: string;
  normalizedPhone?: string;
} {
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { valid: false, error: 'Spam submission rejected.' };
  }

  const studentName = sanitizeText(input.studentName, 100);
  if (!studentName || studentName.length < 2) {
    return { valid: false, error: 'Please enter the student name (at least 2 characters).' };
  }

  const normalizedPhone = normalizeIndianPhone(input.phone || '');
  if (!normalizedPhone) {
    return {
      valid: false,
      error: 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).',
    };
  }

  if (!input.courseId || sanitizeText(input.courseId, 100).length === 0) {
    return { valid: false, error: 'Please select a training course.' };
  }

  if (!input.preferredBranch || sanitizeText(input.preferredBranch, 60).length === 0) {
    return { valid: false, error: 'Please select your preferred studio location.' };
  }

  if (!input.preferredBatch || sanitizeText(input.preferredBatch, 100).length === 0) {
    return { valid: false, error: 'Please select your preferred batch timing.' };
  }

  return { valid: true, normalizedPhone };
}

export function validateContactInput(input: ContactEnquiryInput): {
  valid: boolean;
  error?: string;
  normalizedPhone?: string;
} {
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { valid: false, error: 'Spam submission rejected.' };
  }

  const name = sanitizeText(input.name, 100);
  if (!name || name.length < 2) {
    return { valid: false, error: 'Please enter your name.' };
  }

  const normalizedPhone = normalizeIndianPhone(input.phone || '');
  if (!normalizedPhone) {
    return {
      valid: false,
      error: 'Please enter a valid 10-digit Indian mobile number.',
    };
  }

  if (input.email && !isValidEmail(input.email)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  const subject = sanitizeText(input.subject, 140);
  if (!subject || subject.length < 3) {
    return { valid: false, error: 'Please enter a subject for your message.' };
  }

  const message = sanitizeText(input.message, 1000);
  if (!message || message.length < 5) {
    return { valid: false, error: 'Please enter a message (at least 5 characters).' };
  }

  return { valid: true, normalizedPhone };
}

export function generateReferenceId(prefix: 'SB' | 'CE' | 'CT', dateStr?: string): string {
  const compactDate = (dateStr || new Date().toISOString().slice(0, 10)).replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${compactDate}-${suffix}`;
}

export function buildWhatsAppUrl(phoneWithCountryCode: string, message: string): string {
  const cleanPhone = phoneWithCountryCode.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
