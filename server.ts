import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generateTimeSlotsForHours,
  validateBookingInput,
  validateCourseEnquiryInput,
  validateContactInput,
  generateReferenceId,
  sanitizeText,
  buildWhatsAppUrl,
  getKolkataNow,
  getDirectionsUrlForLocation,
  formatWhatsAppPendingBookingRequest,
} from './src/utils/validation.ts';
import {
  BRAND_CONTACT,
  INITIAL_LOCATIONS,
  StudioLocation,
  POPULAR_SERVICES,
  COMPLETE_BEAUTY_SERVICES,
  ACADEMY_COURSES,
  FOUNDATION_COURSES,
  TRAINING_COURSES,
} from './src/data/catalogData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const REQUIRE_SUPABASE_STRICT = process.env.REQUIRE_SUPABASE === 'true';

let supabase: SupabaseClient | null = null;
if (
  SUPABASE_URL &&
  SUPABASE_KEY &&
  SUPABASE_URL.startsWith('http') &&
  !SUPABASE_URL.includes('your-project-id')
) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Verified branch profiles (Branch 1 & Branch 2)
const serverLocations: StudioLocation[] = INITIAL_LOCATIONS.map((loc) => ({
  ...loc,
  available_services: [...loc.available_services],
}));

// Private server-side slot reservation tracker (never exposed publicly; only non-sensitive slot strings are used for availability checks)
interface PrivateBookingSlotRecord {
  bookingRef: string;
  locationId: string;
  appointmentDate: string;
  timeSlot: string;
  status: 'Pending Confirmation' | 'Confirmed' | 'Cancelled';
}

const serverReservedSlots: PrivateBookingSlotRecord[] = [];
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, bucket: string, maxRequests = 25, windowMs = 60_000): boolean {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count += 1;
  return true;
}

async function getBookedSlotsForLocationDate(locationId: string, date: string): Promise<string[]> {
  const localSlots = serverReservedSlots
    .filter(
      (b) =>
        b.locationId === locationId &&
        b.appointmentDate === date &&
        b.status !== 'Cancelled'
    )
    .map((b) => b.timeSlot);

  if (supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .select('time_slot')
      .eq('location_id', locationId)
      .eq('appointment_date', date)
      .neq('status', 'Cancelled');

    if (!error && Array.isArray(data)) {
      const dbSlots = data.map((row: { time_slot: string }) => row.time_slot);
      return Array.from(new Set([...localSlots, ...dbSlots]));
    }
  }

  return Array.from(new Set(localSlots));
}

async function notifyOwnerViaWhatsAppCloud(
  recipientPhone: string,
  messageText: string
): Promise<{
  sentAutomatically: boolean;
  mode: 'whatsapp_cloud_api' | 'click_to_whatsapp_fallback';
}> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    return {
      sentAutomatically: false,
      mode: 'click_to_whatsapp_fallback',
    };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${encodeURIComponent(phoneNumberId)}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipientPhone.replace(/[^\d]/g, ''),
          type: 'text',
          text: { body: messageText },
        }),
      }
    );

    if (!response.ok) {
      return {
        sentAutomatically: false,
        mode: 'click_to_whatsapp_fallback',
      };
    }

    return {
      sentAutomatically: true,
      mode: 'whatsapp_cloud_api',
    };
  } catch {
    return {
      sentAutomatically: false,
      mode: 'click_to_whatsapp_fallback',
    };
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // 1. Health Endpoint
  app.get('/api/health', (_req, res) => {
    const kolkata = getKolkataNow();
    res.json({
      status: 'ok',
      timezone: 'Asia/Kolkata',
      currentKolkataDate: kolkata.dateStr,
      supabaseConfigured: Boolean(supabase),
      whatsappCloudConfigured: Boolean(
        process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_ACCESS_TOKEN
      ),
      activeLocationsCount: serverLocations.filter((l) => l.active).length,
      totalServicesCount: COMPLETE_BEAUTY_SERVICES.length,
      totalAcademyCoursesCount: ACADEMY_COURSES.length,
      totalFoundationProgramsCount: FOUNDATION_COURSES.length,
    });
  });

  // 2. Public Branch Locations Endpoint (Read-only)
  app.get('/api/locations', (_req, res) => {
    const list = serverLocations.filter((loc) => loc.active);
    res.json({ locations: list });
  });

  // 3. Public Catalog Endpoint
  app.get('/api/catalog', (_req, res) => {
    res.json({
      locations: serverLocations.filter((l) => l.active),
      services: POPULAR_SERVICES,
      completeBeautyServices: COMPLETE_BEAUTY_SERVICES,
      academyCourses: ACADEMY_COURSES,
      foundationCourses: FOUNDATION_COURSES,
      courses: TRAINING_COURSES,
    });
  });

  // 4. Non-Sensitive Slot Availability Endpoint (Never exposes customer names, phones, or emails)
  app.get('/api/availability', async (req, res) => {
    const rawLocId =
      sanitizeText(req.query.locationId, 60) ||
      sanitizeText(req.query.branchId, 60) ||
      'location-1';
    const date = sanitizeText(req.query.date, 20);

    const loc = serverLocations.find((l) => l.id === rawLocId);
    if (!loc || !loc.active) {
      res.status(400).json({ error: 'Invalid or inactive studio branch selected.' });
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ error: 'Invalid date format. Expected YYYY-MM-DD.' });
      return;
    }

    const allSlotsForLocation = generateTimeSlotsForHours(
      loc.opening_time,
      loc.closing_time
    );
    const bookedSlots = await getBookedSlotsForLocationDate(loc.id, date);
    const availableSlots = allSlotsForLocation.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.json({
      locationId: loc.id,
      locationName: loc.location_name,
      date,
      timezone: 'Asia/Kolkata',
      allSlots: allSlotsForLocation,
      bookedSlots,
      availableSlots,
    });
  });

  // 5. Functional Appointment Booking Endpoint (Initial Status strictly: Pending Confirmation)
  app.post('/api/bookings', async (req, res) => {
    const clientIp = req.ip || 'unknown';
    if (!checkRateLimit(clientIp, 'bookings', 15, 60_000)) {
      res.status(429).json({
        error: 'Too many booking attempts. Please wait a minute before trying again.',
      });
      return;
    }

    if (REQUIRE_SUPABASE_STRICT && !supabase) {
      res.status(503).json({
        error:
          'Database connection (Supabase) is required in strict production mode. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      });
      return;
    }

    const body = req.body || {};
    const locationId =
      sanitizeText(body.locationId, 60) ||
      sanitizeText(body.branchId, 60) ||
      'location-1';
    const appointmentDate = sanitizeText(body.appointmentDate, 20);

    const activeLocations = serverLocations.filter((l) => l.active);
    const selectedLocation = activeLocations.find((l) => l.id === locationId);
    if (!selectedLocation) {
      res.status(400).json({ error: 'Please select an active studio branch.' });
      return;
    }

    const existingSlots = await getBookedSlotsForLocationDate(
      selectedLocation.id,
      appointmentDate
    );

    const validation = validateBookingInput(
      {
        customerName: body.customerName,
        phone: body.phone,
        email: body.email,
        locationId: selectedLocation.id,
        serviceId: body.serviceId,
        serviceName: body.serviceName,
        appointmentDate,
        timeSlot: body.timeSlot,
        message: body.message,
        honeypot: body.honeypot,
      },
      existingSlots,
      new Date(),
      {
        activeIds: activeLocations.map((l) => l.id),
        openingTime: selectedLocation.opening_time,
        closingTime: selectedLocation.closing_time,
        availableServices: selectedLocation.available_services,
      }
    );

    if (!validation.valid || !validation.normalizedPhone) {
      res.status(400).json({ error: validation.error || 'Invalid booking details.' });
      return;
    }

    const serviceObj = POPULAR_SERVICES.find((s) => s.id === body.serviceId);
    const resolvedServiceName =
      serviceObj?.name || sanitizeText(body.serviceName, 120) || body.serviceId;
    const resolvedLocationName = selectedLocation.location_name;
    const resolvedLocationAddress =
      selectedLocation.address && selectedLocation.address.trim().length > 0
        ? selectedLocation.address
        : `${selectedLocation.city}, ${selectedLocation.state}`;

    const bookingRef = generateReferenceId('SB', appointmentDate);
    const cleanName = sanitizeText(body.customerName, 100);
    const cleanEmail = sanitizeText(body.email, 120);
    const cleanMessage = sanitizeText(body.message, 500);

    if (supabase) {
      const { error: dbError } = await supabase.from('bookings').insert({
        booking_ref: bookingRef,
        customer_name: cleanName,
        phone: validation.normalizedPhone,
        email: cleanEmail || null,
        location_id: selectedLocation.id,
        location_name: resolvedLocationName,
        location_address: resolvedLocationAddress,
        service_id: sanitizeText(body.serviceId, 80),
        service_name: resolvedServiceName,
        appointment_date: appointmentDate,
        time_slot: body.timeSlot,
        message: cleanMessage || null,
        status: 'Pending Confirmation',
        timezone: 'Asia/Kolkata',
      });

      if (dbError) {
        if (dbError.code === '23505') {
          res.status(409).json({
            error:
              'This time slot was just booked by another customer at this branch. Please choose a different time slot.',
          });
          return;
        }
        if (IS_PRODUCTION && REQUIRE_SUPABASE_STRICT) {
          res.status(500).json({
            error: 'Could not save booking to database. Please contact us via WhatsApp.',
          });
          return;
        }
      }
    }

    serverReservedSlots.push({
      bookingRef,
      locationId: selectedLocation.id,
      appointmentDate,
      timeSlot: body.timeSlot,
      status: 'Pending Confirmation',
    });

    const whatsappPendingRequestText = formatWhatsAppPendingBookingRequest({
      customerName: cleanName,
      serviceName: resolvedServiceName,
      date: appointmentDate,
      time: body.timeSlot,
      locationName: resolvedLocationName,
      locationAddress: resolvedLocationAddress,
      bookingId: bookingRef,
    });

    const ownerSummary = [
      `New Appointment Booking Request (${bookingRef})`,
      `Status: Pending Confirmation`,
      `Customer: ${cleanName}`,
      `Phone: +91 ${validation.normalizedPhone}`,
      cleanEmail ? `Email: ${cleanEmail}` : '',
      `Branch: ${resolvedLocationName}`,
      `Address: ${resolvedLocationAddress}`,
      `Service: ${resolvedServiceName}`,
      `Date: ${appointmentDate} (${body.timeSlot} IST)`,
      cleanMessage ? `Note: ${cleanMessage}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const ownerPhone = process.env.WHATSAPP_OWNER_PHONE || BRAND_CONTACT.whatsappNumber;
    const waNotification = await notifyOwnerViaWhatsAppCloud(ownerPhone, ownerSummary);
    const whatsappFallbackUrl = buildWhatsAppUrl(ownerPhone, whatsappPendingRequestText);

    res.status(201).json({
      ok: true,
      bookingRef,
      status: 'Pending Confirmation',
      timezone: 'Asia/Kolkata',
      locationId: selectedLocation.id,
      locationName: resolvedLocationName,
      locationAddress: resolvedLocationAddress,
      locationDirectionsUrl: getDirectionsUrlForLocation(selectedLocation),
      serviceName: resolvedServiceName,
      appointmentDate,
      timeSlot: body.timeSlot,
      notificationMode: waNotification.mode,
      whatsappFallbackUrl,
      whatsappPendingRequestText,
      message:
        'Booking request submitted (Status: Pending Confirmation). Our studio owner will contact you manually via WhatsApp or phone to confirm your appointment slot.',
    });
  });

  // 6. Course Enquiry Endpoint
  app.post('/api/course-enquiries', async (req, res) => {
    const clientIp = req.ip || 'unknown';
    if (!checkRateLimit(clientIp, 'course-enquiries', 10, 60_000)) {
      res.status(429).json({
        error: 'Too many course enquiries submitted. Please wait a moment and try again.',
      });
      return;
    }

    const body = req.body || {};
    const validation = validateCourseEnquiryInput({
      studentName: body.studentName,
      phone: body.phone,
      courseCategory: body.courseCategory,
      courseId: body.courseId,
      courseTitle: body.courseTitle,
      preferredBranch: body.preferredBranch,
      preferredBatch: body.preferredBatch,
      message: body.message,
      honeypot: body.honeypot,
    });

    if (!validation.valid || !validation.normalizedPhone) {
      res.status(400).json({ error: validation.error || 'Invalid course enquiry details.' });
      return;
    }

    const courseObj = TRAINING_COURSES.find((c) => c.id === body.courseId);
    const locObj = serverLocations.find((l) => l.id === body.preferredBranch);
    const resolvedCourseTitle =
      courseObj?.title || sanitizeText(body.courseTitle, 140) || body.courseId;
    const resolvedCourseCategory =
      courseObj?.category || sanitizeText(body.courseCategory, 100) || 'Beauty Academy — Professional Courses';
    const resolvedBranchName = locObj?.location_name || body.preferredBranch;
    const enquiryRef = generateReferenceId('CE');
    const cleanName = sanitizeText(body.studentName, 100);
    const cleanBatch = sanitizeText(body.preferredBatch, 80);
    const cleanMessage = sanitizeText(body.message, 500);

    if (supabase) {
      await supabase.from('course_enquiries').insert({
        enquiry_ref: enquiryRef,
        student_name: cleanName,
        phone: validation.normalizedPhone,
        course_id: sanitizeText(body.courseId, 80),
        course_title: `[${resolvedCourseCategory}] ${resolvedCourseTitle}`,
        preferred_branch: body.preferredBranch,
        preferred_batch: cleanBatch,
        message: cleanMessage || null,
      });
    }

    const waText = [
      `New Course Enquiry (${enquiryRef})`,
      `Student Name: ${cleanName}`,
      `Phone: +91 ${validation.normalizedPhone}`,
      `Category: ${resolvedCourseCategory}`,
      `Course: ${resolvedCourseTitle}`,
      `Preferred Branch: ${resolvedBranchName}`,
      `Preferred Batch: ${cleanBatch}`,
      cleanMessage ? `Message: ${cleanMessage}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const ownerPhone = process.env.WHATSAPP_OWNER_PHONE || BRAND_CONTACT.whatsappNumber;
    const waNotification = await notifyOwnerViaWhatsAppCloud(ownerPhone, waText);
    const whatsappFallbackUrl = buildWhatsAppUrl(ownerPhone, waText);

    res.status(201).json({
      ok: true,
      enquiryRef,
      courseCategory: resolvedCourseCategory,
      courseTitle: resolvedCourseTitle,
      branchName: resolvedBranchName,
      preferredBatch: cleanBatch,
      notificationMode: waNotification.mode,
      whatsappFallbackUrl,
      message:
        'Your course enquiry has been received. Our Academy & Foundation counselor will contact you shortly via phone or WhatsApp with batch timings, fee structure, and admission details.',
    });
  });

  // 7. Contact Enquiry Endpoint
  app.post('/api/contact', async (req, res) => {
    const clientIp = req.ip || 'unknown';
    if (!checkRateLimit(clientIp, 'contact', 10, 60_000)) {
      res.status(429).json({
        error: 'Too many messages sent. Please wait a minute before trying again.',
      });
      return;
    }

    const body = req.body || {};
    const validation = validateContactInput({
      name: body.name,
      phone: body.phone,
      email: body.email,
      subject: body.subject,
      message: body.message,
      honeypot: body.honeypot,
    });

    if (!validation.valid || !validation.normalizedPhone) {
      res.status(400).json({ error: validation.error || 'Invalid contact form submission.' });
      return;
    }

    const contactRef = generateReferenceId('CT');
    const cleanName = sanitizeText(body.name, 100);
    const cleanEmail = sanitizeText(body.email, 120);
    const cleanSubject = sanitizeText(body.subject, 140);
    const cleanMessage = sanitizeText(body.message, 1000);

    if (supabase) {
      await supabase.from('contact_enquiries').insert({
        contact_ref: contactRef,
        name: cleanName,
        phone: validation.normalizedPhone,
        email: cleanEmail || null,
        subject: cleanSubject,
        message: cleanMessage,
      });
    }

    const waText = [
      `New Website Enquiry (${contactRef})`,
      `Name: ${cleanName}`,
      `Phone: +91 ${validation.normalizedPhone}`,
      cleanEmail ? `Email: ${cleanEmail}` : '',
      `Subject: ${cleanSubject}`,
      `Message: ${cleanMessage}`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappFallbackUrl = buildWhatsAppUrl(BRAND_CONTACT.whatsappNumber, waText);

    res.status(201).json({
      ok: true,
      contactRef,
      whatsappFallbackUrl,
      message:
        'Thank you for reaching out to Sonu’s Beauty Studio & Academy. Our team will respond to your enquiry shortly.',
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Sonu's Beauty Studio & Academy server running on http://0.0.0.0:${PORT} (Asia/Kolkata)`
    );
  });
}

startServer();
