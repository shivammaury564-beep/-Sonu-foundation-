import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeIndianPhone,
  validateDateAndSlotInKolkata,
  validateBookingInput,
  validateCourseEnquiryInput,
  validateContactInput,
  generateReferenceId,
  getDirectionsUrlForLocation,
  formatWhatsAppBookingConfirmation,
  formatWhatsAppPendingBookingRequest,
  generateTimeSlotsForHours,
} from './validation';
import {
  COMPLETE_BEAUTY_SERVICES,
  ACADEMY_COURSES,
  FOUNDATION_COURSES,
  GALLERY_CATEGORIES,
  INITIAL_LOCATIONS,
} from '../data/catalogData';

test('normalizeIndianPhone validates Indian 10-digit numbers and prefixes', () => {
  assert.equal(normalizeIndianPhone('9876543210'), '9876543210');
  assert.equal(normalizeIndianPhone('+91 98765-43210'), '9876543210');
  assert.equal(normalizeIndianPhone('08765432109'), '8765432109');
  assert.equal(normalizeIndianPhone('1234567890'), null);
  assert.equal(normalizeIndianPhone('98765'), null);
});

test('validateDateAndSlotInKolkata rejects past dates and out-of-hours slots', () => {
  const refDate = new Date('2026-11-12T06:00:00Z'); // 11:30 AM IST on 2026-11-12
  const pastCheck = validateDateAndSlotInKolkata('2026-11-10', '12:00 PM', refDate);
  assert.equal(pastCheck.valid, false);

  const passedSlotToday = validateDateAndSlotInKolkata('2026-11-12', '10:00 AM', refDate);
  assert.equal(passedSlotToday.valid, false);

  const futureSlotToday = validateDateAndSlotInKolkata('2026-11-12', '02:00 PM', refDate);
  assert.equal(futureSlotToday.valid, true);

  const invalidSlot = validateDateAndSlotInKolkata('2026-11-15', '09:00 PM', refDate);
  assert.equal(invalidSlot.valid, false);
});

test('validateBookingInput enforces location selection, location services, and blocks duplicate bookings', () => {
  const refDate = new Date('2026-11-12T06:00:00Z');
  const baseInput = {
    customerName: 'Priya Patel',
    phone: '+91 98765 43210',
    email: 'priya@example.com',
    locationId: 'location-2',
    serviceId: 'makeup-bridal-party',
    appointmentDate: '2026-11-20',
    timeSlot: '11:00 AM',
  };

  const ok = validateBookingInput(baseInput, ['02:00 PM'], refDate, {
    activeIds: ['location-1', 'location-2'],
    availableServices: ['makeup-bridal-party', 'facial-skin-care'],
  });
  assert.equal(ok.valid, true);
  assert.equal(ok.normalizedPhone, '9876543210');

  const unavailableService = validateBookingInput(baseInput, [], refDate, {
    activeIds: ['location-1', 'location-2'],
    availableServices: ['facial-skin-care'],
  });
  assert.equal(unavailableService.valid, false);
  assert.match(unavailableService.error || '', /not available at this location/i);

  const duplicate = validateBookingInput(baseInput, ['11:00 AM', '02:00 PM'], refDate);
  assert.equal(duplicate.valid, false);
  assert.match(duplicate.error || '', /already reserved/i);
});

test('getDirectionsUrlForLocation preserves exact coordinates 22.305021, 73.210297 for Location 2', () => {
  const url = getDirectionsUrlForLocation({
    latitude: 22.305021,
    longitude: 73.210297,
    google_maps_url: 'https://www.google.com/maps?q=22.305021,73.210297',
  });
  assert.equal(url, 'https://www.google.com/maps?q=22.305021,73.210297');
});

test('formatWhatsAppPendingBookingRequest and formatWhatsAppBookingConfirmation format messages accurately', () => {
  const pendingMsg = formatWhatsAppPendingBookingRequest({
    customerName: 'Riya Patel',
    serviceName: 'Bridal Makeup',
    date: '2026-11-20',
    time: '11:00 AM',
    locationName: 'Sonu’s Beauty Studio & Academy — Location 2',
    locationAddress: 'Vadodara, Gujarat',
    bookingId: 'SB-20261120-ABCD',
  });
  assert.match(pendingMsg, /Status: Pending Confirmation/);
  assert.doesNotMatch(pendingMsg, /has been confirmed/i);

  const msg = formatWhatsAppBookingConfirmation({
    customerName: 'Riya Patel',
    serviceName: 'Makeup (Bridal & Party)',
    date: '2026-11-20',
    time: '11:00 AM',
    locationName: 'Sonu’s Beauty Studio & Academy — Location 2',
    locationAddress: 'Vadodara, Gujarat',
    bookingId: 'SB-20261120-ABCD',
  });
  assert.match(msg, /Hello Riya Patel 👋/);
  assert.match(msg, /Location: Sonu’s Beauty Studio & Academy — Location 2/);
  assert.match(msg, /Address: Vadodara, Gujarat/);
  assert.match(msg, /Booking ID: SB-20261120-ABCD/);
});

test('generateTimeSlotsForHours computes dynamic location slots', () => {
  const slots = generateTimeSlotsForHours('11:00', '14:00');
  assert.deepEqual(slots, ['11:00 AM', '12:00 PM', '01:00 PM']);
});

test('validateCourseEnquiryInput and validateContactInput validate fields properly', () => {
  const courseCheck = validateCourseEnquiryInput({
    studentName: 'Anjali Sharma',
    phone: '9123456789',
    courseCategory: 'Beauty Academy — Professional Courses',
    courseId: 'academy-basic-course',
    preferredBranch: 'location-1',
    preferredBatch: 'Morning Batch',
  });
  assert.equal(courseCheck.valid, true);

  const contactCheck = validateContactInput({
    name: 'Meera Desai',
    phone: '9988776655',
    subject: 'Bridal package enquiry',
    message: 'Looking for bridal makeup details for December.',
  });
  assert.equal(contactCheck.valid, true);
});

test('generateReferenceId formats booking reference IDs cleanly', () => {
  const ref = generateReferenceId('SB', '2026-11-20');
  assert.match(ref, /^SB-20261120-[A-Z0-9]{4}$/);
});

test('catalogData includes all 36 beauty services, 9 academy courses, 3 foundation programs, 11 gallery categories, and 2 branches', () => {
  assert.equal(COMPLETE_BEAUTY_SERVICES.length, 36);
  assert.equal(ACADEMY_COURSES.length, 9);
  assert.equal(FOUNDATION_COURSES.length, 3);
  assert.equal(GALLERY_CATEGORIES.length, 11);
  assert.equal(INITIAL_LOCATIONS.length, 2);
});
