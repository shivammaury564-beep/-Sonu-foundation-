import React, { useState } from 'react';
import {
  GraduationCap,
  Scissors,
  Monitor,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Clock,
  IndianRupee,
  UserCheck,
  Calendar,
  BookOpen,
  Award,
  ShieldCheck,
  HeartHandshake,
  Users,
  FileCheck2,
} from 'lucide-react';
import {
  ACADEMY_COURSES,
  FOUNDATION_COURSES,
  TRAINING_COURSES,
  TrainingCourse,
  CourseCategoryName,
  StudioLocation,
  BRAND_CONTACT,
} from '../data/catalogData';
import {
  validateCourseEnquiryInput,
  buildWhatsAppUrl,
} from '../utils/validation';

interface FoundationAndCoursesSectionProps {
  locations: StudioLocation[];
  selectedCourseId: string;
  onSelectCourseForEnquiry: (courseId: string) => void;
}

const COURSE_CATEGORIES: CourseCategoryName[] = [
  'Beauty Academy — Professional Courses',
  'Beauty Training Classes',
  'Stitching & Tailoring Classes',
  'Computer Classes',
];

export const FoundationAndCoursesSection: React.FC<FoundationAndCoursesSectionProps> = ({
  locations,
  selectedCourseId,
  onSelectCourseForEnquiry,
}) => {
  const [activeCourseModal, setActiveCourseModal] = useState<TrainingCourse | null>(null);

  // Course Enquiry Form State
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [courseCategory, setCourseCategory] = useState<CourseCategoryName>(
    'Beauty Academy — Professional Courses'
  );
  const [courseId, setCourseId] = useState(selectedCourseId || ACADEMY_COURSES[0].id);
  const [preferredBranch, setPreferredBranch] = useState<string>(
    locations[0]?.id || 'location-1'
  );
  const [preferredBatch, setPreferredBatch] = useState('Morning Batch (10:00 AM - 1:00 PM)');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<{
    enquiryRef: string;
    courseCategory: string;
    courseTitle: string;
    branchName: string;
    preferredBatch: string;
    whatsappFallbackUrl: string;
    message: string;
  } | null>(null);

  React.useEffect(() => {
    if (selectedCourseId) {
      const found = TRAINING_COURSES.find((c) => c.id === selectedCourseId);
      if (found) {
        setCourseCategory(found.category);
        setCourseId(found.id);
      }
    }
  }, [selectedCourseId]);

  React.useEffect(() => {
    if (locations.length > 0 && !locations.some((l) => l.id === preferredBranch)) {
      setPreferredBranch(locations[0].id);
    }
  }, [locations]);

  const coursesInSelectedCategory = React.useMemo(() => {
    const filtered = TRAINING_COURSES.filter((c) => c.category === courseCategory);
    return filtered.length > 0 ? filtered : TRAINING_COURSES;
  }, [courseCategory]);

  const handleCategoryChangeInForm = (newCat: CourseCategoryName) => {
    setCourseCategory(newCat);
    const firstInCat = TRAINING_COURSES.find((c) => c.category === newCat);
    if (firstInCat) {
      setCourseId(firstInCat.id);
      onSelectCourseForEnquiry(firstInCat.id);
    }
  };

  const handleSelectCourseAndScroll = (targetCourseId: string) => {
    const found = TRAINING_COURSES.find((c) => c.id === targetCourseId);
    if (found) {
      setCourseCategory(found.category);
      setCourseId(found.id);
      onSelectCourseForEnquiry(found.id);
    }
    const el = document.getElementById('course-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const selectedCourse = TRAINING_COURSES.find((c) => c.id === courseId);
    const clientCheck = validateCourseEnquiryInput({
      studentName,
      phone,
      courseCategory,
      courseId,
      courseTitle: selectedCourse?.title,
      preferredBranch,
      preferredBatch,
      message,
      honeypot,
    });

    if (!clientCheck.valid) {
      setErrorMsg(clientCheck.error || 'Please check the form fields.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/course-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          phone,
          courseCategory,
          courseId,
          courseTitle: selectedCourse?.title,
          preferredBranch,
          preferredBatch,
          message,
          honeypot,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Could not submit your course enquiry.');
        return;
      }

      setSubmittedEnquiry({
        enquiryRef: data.enquiryRef,
        courseCategory: data.courseCategory || courseCategory,
        courseTitle: data.courseTitle,
        branchName: data.branchName,
        preferredBatch: data.preferredBatch,
        whatsappFallbackUrl: data.whatsappFallbackUrl,
        message: data.message,
      });
      setStudentName('');
      setPhone('');
      setMessage('');
    } catch {
      setErrorMsg('Network error while submitting course enquiry. Please try again or use WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* =====================================================================
          SECTION 1: SONU'S BEAUTY ACADEMY & COMPLETE 9-COURSE CATALOG
          ===================================================================== */}
      <section
        id="academy"
        className="py-16 sm:py-20 bg-[#f6ebe0] border-t border-[#e5d3c0] scroll-mt-24"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Academy Overview Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
            <div className="lg:col-span-7 flex flex-col justify-between bg-[#faf3ec] rounded-2xl p-6 sm:p-10 border border-[#e2cbb3] shadow-xs">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#7c2344] mb-2">
                  Section B · Professional Beauty Education · Vadodara
                </p>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3f0e21] leading-tight mb-4">
                  Sonu&apos;s Beauty Academy — Learn, Practice &amp; Grow
                </h2>
                <p className="text-[#563843] text-base leading-relaxed mb-6">
                  At Sonu&apos;s Beauty Studio &amp; Academy, we offer structured professional
                  training across Basic &amp; Advanced salon courses, Makeup, Hairstyles, Nails,
                  Mehendi, Chemical treatments, PMU (Permanent Makeup), and Eyelashes. Every batch
                  focuses on hands-on studio practice, hygiene discipline, and live client
                  consultation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-[#f4e7da] border border-[#e3cdb7]">
                    <h3 className="font-serif-luxury text-lg font-semibold text-[#4a1228] mb-1">
                      01. Hands-On Studio Mentorship
                    </h3>
                    <p className="text-sm text-[#5c3c47]">
                      Supervised practice on real salon tools, techniques, and hygiene protocols in
                      focused training batches.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f4e7da] border border-[#e3cdb7]">
                    <h3 className="font-serif-luxury text-lg font-semibold text-[#4a1228] mb-1">
                      02. Complete 9-Course Curriculum
                    </h3>
                    <p className="text-sm text-[#5c3c47]">
                      From Basic &amp; Advanced salon mastery to specialized Makeup, Hairstyles,
                      Nails, Mehendi, Chemical, PMU, and Eyelashes courses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#e5d3c0]">
                <button
                  type="button"
                  onClick={() => handleSelectCourseAndScroll('academy-basic-course')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Enquire for Academy Course</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={buildWhatsAppUrl(
                    BRAND_CONTACT.whatsappNumber,
                    "Hello Sonu's Beauty Academy, I would like to enquire about your professional beauty courses and upcoming batch timings."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#5e1933]/40 text-[#4a1228] hover:bg-[#5e1933]/5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-[#5e1933]" />
                  <span>WhatsApp Course Enquiry</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#4a1228] via-[#5e1933] to-[#340b1b] text-[#faf3ec] rounded-2xl p-6 sm:p-8 border border-[#d4af6a]/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-7 h-7 text-[#e7c98f] shrink-0" />
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#f7e7ce]">
                    Confirmed Academy Courses
                  </h3>
                </div>
                <p className="text-sm text-[#eddcc9] leading-relaxed mb-5">
                  All 9 professional courses supplied by Sonu&apos;s Beauty Academy are open for
                  admission counseling across our two Vadodara branches:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#f7e7ce] mb-6">
                  {ACADEMY_COURSES.map((c, idx) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-[#d4af6a]/25"
                    >
                      <span className="text-[#e7c98f] font-bold tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span className="font-medium">{c.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#faf3ec]/10 border border-[#d4af6a]/30 p-3 flex items-center gap-4">
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#faf3ec] shrink-0">
                  <img
                    src="/assets/sonu/academy-instructor.png"
                    alt="Sonu's Beauty Academy Instructor"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                <div>
                  <p className="font-serif-luxury text-base font-semibold text-[#f7e7ce]">
                    Course Details &amp; Counseling
                  </p>
                  <p className="text-xs text-[#e6d0b8] mt-1">
                    Course duration, fee structure, eligibility &amp; batch timings are shared
                    directly upon enquiry (<strong>Contact for Details</strong>).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Complete 9-Course Academy Catalog */}
          <div id="professional-courses" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
                  Sonu&apos;s Beauty Academy · 9 Confirmed Courses
                </p>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3f0e21]">
                  Professional Beauty Academy Courses
                </h3>
                <p className="text-xs sm:text-sm text-[#563843] mt-1">
                  Inspect what students will learn, syllabus modules, and practical training for
                  each course. Additional courses will be listed only after client confirmation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACADEMY_COURSES.map((course, index) => (
                <article
                  key={course.id}
                  className="bg-[#faf3ec] rounded-2xl overflow-hidden border border-[#dec5ac] flex flex-col justify-between shadow-2xs hover:border-[#b98b56] transition-colors"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8d6c3]">
                      <img
                        src={course.image}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full ${
                          course.image.includes('academy-instructor')
                            ? 'object-contain bg-[#f3e3d3]'
                            : 'object-cover'
                        } object-center`}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#3f0e21]/90 text-[#f7e7ce] text-[11px] font-semibold">
                        Course 0{index + 1} · Beauty Academy
                      </span>
                    </div>

                    <div className="p-6">
                      <h4 className="font-serif-luxury text-xl font-bold text-[#3f0e21] mb-2">
                        {course.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#563843] leading-relaxed mb-4">
                        {course.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-white border border-[#e5d3c0] text-xs text-[#4a1228] mb-4">
                        <div className="flex items-start gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#7c2344] shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[10px] text-[#7a5864]">Duration</span>
                            <span className="font-semibold">{course.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <IndianRupee className="w-3.5 h-3.5 text-[#7c2344] shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[10px] text-[#7a5864]">Fees</span>
                            <span className="font-semibold">{course.fees}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#7c2344] shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[10px] text-[#7a5864]">Eligibility</span>
                            <span className="font-semibold">{course.eligibility}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#7c2344] shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[10px] text-[#7a5864]">Batch Timings</span>
                            <span className="font-semibold">{course.batchTimings}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#4a1228] mb-1.5">
                          What Students Will Learn:
                        </p>
                        <div className="space-y-1.5">
                          {course.whatStudentsWillLearn.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs text-[#563843]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#5e1933] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#e5d3c0] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectCourseAndScroll(course.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Course Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCourseModal(course)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg border border-[#d5bda4] bg-white hover:bg-[#f5ebe0] text-[#4a1228] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Syllabus &amp; Details</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* SECTION 10: GOVERNMENT CERTIFICATES AND ISO RECOGNITION */}
          <div
            id="certificates"
            className="mt-14 pt-12 border-t border-[#dec5ac] scroll-mt-24"
          >
            <div className="rounded-2xl bg-[#faf3ec] border border-[#dec5ac] p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-2">
                    <FileCheck2 className="w-4 h-4 text-[#5e1933]" />
                    <span>Certificates &amp; Recognition Verification Policy</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3f0e21] mb-2">
                    Course Completion Certificates &amp; Official Recognition
                  </h3>
                  <p className="text-xs sm:text-sm text-[#563843] leading-relaxed">
                    Trainees completing courses at <strong>Sonu&apos;s Beauty Academy</strong> and{' '}
                    <strong>Sonu Foundation and Charitable Trust</strong> receive course training
                    documentation as applicable to their batch. In accordance with our strict
                    transparency policy, official <strong>Government Certificate</strong> and{' '}
                    <strong>ISO</strong> recognition details—including exact issuing authority names,
                    registration numbers, validity dates, and original certificate scans—are
                    displayed only upon verification of original documents supplied by the business
                    owner.
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#f5ebe0] border border-[#dec6ad]">
                    <Award className="w-6 h-6 text-[#7c2344] mb-2" />
                    <h4 className="font-serif-luxury text-base font-bold text-[#3f0e21] mb-1">
                      Government Certificate Slot
                    </h4>
                    <p className="text-xs text-[#563843]">
                      Reserved for verified original certificate photograph, exact issuing body
                      name, and certificate number once provided by the client.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f5ebe0] border border-[#dec6ad]">
                    <ShieldCheck className="w-6 h-6 text-[#7c2344] mb-2" />
                    <h4 className="font-serif-luxury text-base font-bold text-[#3f0e21] mb-1">
                      ISO Recognition Slot
                    </h4>
                    <p className="text-xs text-[#563843]">
                      Reserved for verified ISO certificate document, issuing organization, and
                      validity details once provided by the client.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: SONU FOUNDATION AND CHARITABLE TRUST (NGO Architecture)
          ===================================================================== */}
      <section
        id="foundation"
        className="py-16 sm:py-20 bg-[#faf3ec] border-t border-[#e5d3c0] scroll-mt-24"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Foundation Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#3f0e21] via-[#5e1933] to-[#4a1228] text-[#faf3ec] p-6 sm:p-10 lg:p-12 border border-[#d4af6a]/40 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#e7c98f] mb-2">
                  Section C · Community Skill Development &amp; Vocational Training
                </p>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4">
                  Sonu Foundation and Charitable Trust
                </h2>
                <p className="text-[#f1e2d3] text-base sm:text-lg leading-relaxed max-w-3xl">
                  Connected with the training leadership of Sonu&apos;s Beauty Studio &amp; Academy,{' '}
                  <strong className="text-white">Sonu Foundation and Charitable Trust</strong>{' '}
                  conducts structured classroom and practical skill-development programs in{' '}
                  <span className="text-[#e7c98f] font-medium">
                    Beauty Training Classes, Stitching &amp; Tailoring Classes, and Computer Classes
                  </span>{' '}
                  to empower learners with practical, everyday livelihood skills.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href="#our-programs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#d4af6a] hover:bg-[#e0be7c] text-[#2d0917] font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore Foundation Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#course-enquiry"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#e7c98f]/50 hover:bg-white/10 text-[#f7e7ce] font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Join Our Programs (Enquire)</span>
                </a>
              </div>
            </div>
          </div>

          {/* A. About Our Foundation | B. Our Vision | C. Our Mission | D. Our Work */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            <div className="bg-[#f5ebe0] rounded-2xl p-6 border border-[#e2cbb3] flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7c2344] mb-2">
                  A. About Our Foundation
                </p>
                <h3 className="font-serif-luxury text-xl font-bold text-[#3f0e21] mb-2.5">
                  Purpose &amp; Vocational Focus
                </h3>
                <p className="text-xs sm:text-sm text-[#563843] leading-relaxed">
                  Sonu Foundation and Charitable Trust focuses on accessible, practical skill
                  education for women, youth, and community learners in Vadodara across beauty
                  services, garment tailoring, and foundational computer literacy.
                </p>
              </div>
            </div>

            <div className="bg-[#f5ebe0] rounded-2xl p-6 border border-[#e2cbb3] flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7c2344] mb-2">
                  B. Our Vision
                </p>
                <h3 className="font-serif-luxury text-xl font-bold text-[#3f0e21] mb-2.5">
                  Self-Reliant Communities
                </h3>
                <p className="text-xs sm:text-sm text-[#563843] leading-relaxed">
                  To foster practical skill literacy and self-reliance through structured classroom
                  learning.{' '}
                  <em className="text-[#7c2344] block mt-1.5 text-xs">
                    (Official client-approved Vision statement placeholder — ready for client&apos;s
                    exact wording.)
                  </em>
                </p>
              </div>
            </div>

            <div className="bg-[#f5ebe0] rounded-2xl p-6 border border-[#e2cbb3] flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7c2344] mb-2">
                  C. Our Mission
                </p>
                <h3 className="font-serif-luxury text-xl font-bold text-[#3f0e21] mb-2.5">
                  Hands-On Skill Training
                </h3>
                <p className="text-xs sm:text-sm text-[#563843] leading-relaxed">
                  To deliver disciplined, hands-on training in beauty care, stitching &amp;
                  tailoring, and basic computer operations.{' '}
                  <em className="text-[#7c2344] block mt-1.5 text-xs">
                    (Official client-approved Mission statement placeholder — ready for client&apos;s
                    exact wording.)
                  </em>
                </p>
              </div>
            </div>

            <div className="bg-[#f5ebe0] rounded-2xl p-6 border border-[#e2cbb3] flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7c2344] mb-2">
                  D. Our Work &amp; Impact
                </p>
                <h3 className="font-serif-luxury text-xl font-bold text-[#3f0e21] mb-2.5">
                  Qualitative Skill Impact
                </h3>
                <p className="text-xs sm:text-sm text-[#563843] leading-relaxed">
                  Through daily practical workshops, guided instructor feedback, and supportive
                  peer batches, learners build real vocational confidence without relying on
                  theory-only lectures.
                </p>
              </div>
            </div>
          </div>

          {/* E. OUR TRAINING PROGRAMS (Three Dedicated Foundation Tracks) */}
          <div id="our-programs" className="scroll-mt-24 mb-16">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-1">
                E. Sonu Foundation and Charitable Trust · Core Skill Tracks
              </p>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3f0e21]">
                Our Foundation Training Programs
              </h3>
              <p className="text-xs sm:text-sm text-[#563843] mt-1">
                Three dedicated vocational training tracks. Duration, fee details, eligibility, and
                batch timings are shared directly during admission counseling (
                <strong>Contact for Details</strong>).
              </p>
            </div>

            <div
              id="training-programs"
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-24"
            >
              {FOUNDATION_COURSES.map((prog) => {
                const sectionAnchorId =
                  prog.category === 'Beauty Training Classes'
                    ? 'beauty-classes'
                    : prog.category === 'Stitching & Tailoring Classes'
                    ? 'stitching-classes'
                    : 'computer-classes';

                return (
                  <article
                    key={prog.id}
                    id={sectionAnchorId}
                    className="bg-white rounded-2xl overflow-hidden border border-[#dec5ac] flex flex-col justify-between shadow-2xs scroll-mt-28"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f4e8dc]">
                        <img
                          src={prog.image}
                          alt={prog.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#5e1933]/90 text-[#f7e7ce] text-[11px] font-semibold">
                          Sonu Foundation Program
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#7c2344] mb-1.5">
                          {prog.category === 'Beauty Training Classes' && (
                            <Sparkles className="w-4 h-4" />
                          )}
                          {prog.category === 'Stitching & Tailoring Classes' && (
                            <Scissors className="w-4 h-4" />
                          )}
                          {prog.category === 'Computer Classes' && (
                            <Monitor className="w-4 h-4" />
                          )}
                          <span>{prog.category}</span>
                        </div>

                        <h4 className="font-serif-luxury text-2xl font-bold text-[#3f0e21] mb-2">
                          {prog.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#563843] leading-relaxed mb-4">
                          {prog.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#faf3ec] border border-[#e5d3c0] text-xs text-[#4a1228] mb-4">
                          <div>
                            <span className="text-[10px] text-[#7a5864] block">Duration</span>
                            <span className="font-semibold">{prog.duration}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#7a5864] block">Fees</span>
                            <span className="font-semibold">{prog.fees}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#7a5864] block">Eligibility</span>
                            <span className="font-semibold">{prog.eligibility}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#7a5864] block">Batch Timings</span>
                            <span className="font-semibold">{prog.batchTimings}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#4a1228] mb-1.5">
                            Proposed Topics &amp; Skills Taught:
                          </p>
                          <div className="space-y-1.5">
                            {prog.modules.map((mod, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-xs text-[#563843]"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#5e1933] shrink-0 mt-0.5" />
                                <span>{mod}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-[#f0e2d3] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectCourseAndScroll(prog.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span>Enquire for Program</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveCourseModal(prog)}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg border border-[#d5bda4] hover:bg-[#faf3ec] text-[#4a1228] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* F. STUDENT DEVELOPMENT & G. STUDENT SUCCESS STORIES & H. QUALITATIVE IMPACT */}
          <div
            id="student-stories"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 scroll-mt-24"
          >
            <div className="lg:col-span-6 bg-[#f5ebe0] rounded-2xl p-6 sm:p-8 border border-[#e2cbb3] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-2">
                  <Users className="w-4 h-4 text-[#5e1933]" />
                  <span>F. Student Development &amp; H. Our Impact</span>
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#3f0e21] mb-3">
                  Practical Classroom Development &amp; Qualitative Impact
                </h3>
                <p className="text-xs sm:text-sm text-[#563843] leading-relaxed mb-4">
                  Every batch at Sonu Foundation and Charitable Trust is structured around
                  step-by-step demonstrations followed by supervised individual practice:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#4a1228] mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5e1933] shrink-0 mt-0.5" />
                    <span>
                      <strong>Beauty Training Learners:</strong> Practice threading symmetry,
                      waxing hygiene, facial strokes, hair styling, and bridal/festive makeup setup.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5e1933] shrink-0 mt-0.5" />
                    <span>
                      <strong>Stitching &amp; Tailoring Learners:</strong> Progress from basic hand
                      stitches and sewing machine control to garment drafting, cutting, and neat
                      finishing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5e1933] shrink-0 mt-0.5" />
                    <span>
                      <strong>Computer Literacy Learners:</strong> Gain everyday confidence in
                      desktop operations, MS Word documents, MS Excel tables, MS PowerPoint slides,
                      and internet skills.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#dec6ad]">
                <a
                  href="#student-gallery"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#d5bda4] text-xs font-semibold text-[#3f0e21] hover:bg-[#efe1d1]"
                >
                  <span>View Student &amp; Classroom Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#course-enquiry"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#5e1933] text-xs font-semibold text-white hover:bg-[#4a1228]"
                >
                  <span>Join Our Programs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#f5ebe0] rounded-2xl p-6 sm:p-8 border border-[#e2cbb3] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-2">
                  <HeartHandshake className="w-4 h-4 text-[#5e1933]" />
                  <span>G. Student Stories &amp; Trainee Reflections</span>
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#3f0e21] mb-3">
                  Learner Experiences &amp; Skill Journey
                </h3>
                <p className="text-xs text-[#684752] mb-4">
                  We share only verified trainee experiences approved by our students and client:
                </p>

                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-white border border-[#e2cbb3]">
                    <p className="text-xs sm:text-sm text-[#4a1228] leading-relaxed mb-2">
                      &ldquo;Learning basic beauty, threading, and bridal makeup steps in a real
                      studio setting helped me understand both client hygiene and practical
                      application.&rdquo;
                    </p>
                    <p className="text-xs font-bold text-[#5e1933]">
                      — Beauty &amp; Makeup Batch Trainee · Vadodara
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#e2cbb3]">
                    <p className="text-xs sm:text-sm text-[#4a1228] leading-relaxed mb-2">
                      &ldquo;Our stitching and tailoring classes start from sewing machine
                      threading and paper drafting, making it easy for beginners to learn garment
                      cutting step by step.&rdquo;
                    </p>
                    <p className="text-xs font-bold text-[#5e1933]">
                      — Stitching &amp; Tailoring Batch Learner · Sonu Foundation
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#6e4d59] mt-4 pt-3 border-t border-[#dec6ad]">
                Additional named student stories and video interviews are published as approved by
                individual trainees and Sonu Foundation and Charitable Trust.
              </p>
            </div>
          </div>

          {/* =====================================================================
              SECTION 15: COURSE ENQUIRY FORM (With Course Category + Branch Selection)
              ===================================================================== */}
          <div
            id="course-enquiry"
            className="scroll-mt-24 rounded-2xl bg-[#f4e8dc] border border-[#dec5ac] p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#7c2344] mb-2">
                  Admissions &amp; Batch Counseling
                </p>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3f0e21] mb-3">
                  Course Enquiry Form
                </h3>
                <p className="text-sm text-[#563843] leading-relaxed mb-6">
                  Enquire about any of the 9 <strong>Sonu&apos;s Beauty Academy</strong> courses or
                  the 3 <strong>Sonu Foundation and Charitable Trust</strong> training programs
                  (Beauty, Stitching &amp; Tailoring, and Computer Classes).
                </p>

                <div className="space-y-3 text-sm text-[#4a1228] bg-[#faf3ec] p-5 rounded-xl border border-[#e2cbb3]">
                  <p className="font-serif-luxury font-bold text-base text-[#3f0e21]">
                    Direct Training &amp; Counseling Desk
                  </p>
                  <p className="text-xs text-[#684752]">
                    Phone / WhatsApp:{' '}
                    <a
                      href={`tel:${BRAND_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
                      className="font-semibold text-[#5e1933] underline tabular-nums"
                    >
                      {BRAND_CONTACT.primaryPhone}
                    </a>
                  </p>
                  <p className="text-xs text-[#684752]">
                    Visiting Hours: {BRAND_CONTACT.hours}
                  </p>
                  <div className="pt-2">
                    <a
                      href={buildWhatsAppUrl(
                        BRAND_CONTACT.whatsappNumber,
                        'Hello Sonu’s Beauty Academy & Sonu Foundation, I would like to enquire about course admissions, fees, and batch timings.'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Course Enquiry</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#e2cbb3]">
                {submittedEnquiry ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-6 rounded-xl bg-[#faf3ec] border border-[#d4af6a]"
                  >
                    <div className="flex items-center gap-2 text-[#5e1933] font-semibold text-sm mb-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Course Enquiry Submitted · Ref: {submittedEnquiry.enquiryRef}</span>
                    </div>
                    <h4 className="font-serif-luxury text-2xl font-bold text-[#3f0e21] mb-2">
                      Thank You for Your Course Enquiry
                    </h4>
                    <p className="text-sm text-[#563843] mb-4">{submittedEnquiry.message}</p>
                    <div className="text-xs text-[#4a1228] space-y-1 bg-white p-4 rounded-lg border border-[#e5d3c0] mb-5">
                      <p>
                        <strong>Course Category:</strong> {submittedEnquiry.courseCategory}
                      </p>
                      <p>
                        <strong>Course Name:</strong> {submittedEnquiry.courseTitle}
                      </p>
                      <p>
                        <strong>Preferred Branch:</strong> {submittedEnquiry.branchName}
                      </p>
                      <p>
                        <strong>Preferred Batch:</strong> {submittedEnquiry.preferredBatch}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={submittedEnquiry.whatsappFallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send Course Enquiry on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmittedEnquiry(null)}
                        className="px-4 py-2.5 rounded-lg border border-[#d5bda4] text-[#4a1228] text-xs font-semibold hover:bg-[#f4e8dc] transition-colors cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} noValidate className="space-y-4">
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="ce-website">Website</label>
                      <input
                        id="ce-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {errorMsg && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800"
                      >
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="ce-student-name"
                          className="block text-xs font-semibold text-[#3f0e21] mb-1.5"
                        >
                          Student Full Name *
                        </label>
                        <input
                          id="ce-student-name"
                          type="text"
                          required
                          placeholder="Enter student name"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820] focus:outline-2 focus:outline-[#5e1933]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="ce-phone"
                          className="block text-xs font-semibold text-[#3f0e21] mb-1.5"
                        >
                          Phone Number (10-digit Indian Mobile) *
                        </label>
                        <input
                          id="ce-phone"
                          type="tel"
                          required
                          placeholder="e.g. 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820] focus:outline-2 focus:outline-[#5e1933]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="ce-category"
                          className="block text-xs font-semibold text-[#3f0e21] mb-1.5"
                        >
                          Course Category *
                        </label>
                        <select
                          id="ce-category"
                          value={courseCategory}
                          onChange={(e) =>
                            handleCategoryChangeInForm(e.target.value as CourseCategoryName)
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820] focus:outline-2 focus:outline-[#5e1933]"
                        >
                          {COURSE_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="ce-course"
                          className="block text-xs font-semibold text-[#3f0e21] mb-1.5"
                        >
                          Course Name *
                        </label>
                        <select
                          id="ce-course"
                          value={courseId}
                          onChange={(e) => setCourseId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820] focus:outline-2 focus:outline-[#5e1933]"
                        >
                          {coursesInSelectedCategory.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="ce-branch"
                          className="block text-xs font-semibold text-[#3f0e21] mb-1.5"
                        >
                          Preferred Branch *
                        </label>
                        <select
                          id="ce-branch"
                          value={preferredBranch}
                          onChange={(e) => setPreferredBranch(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820] focus:outline-2 focus:outline-[#5e1933]"
                        >
                          {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.location_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="ce-batch"
                          className="block text-xs font-semibold text-[#3f0e21] mb-1.5"
                        >
                          Preferred Batch *
                        </label>
                        <select
                          id="ce-batch"
                          value={preferredBatch}
                          onChange={(e) => setPreferredBatch(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820] focus:outline-2 focus:outline-[#5e1933]"
                        >
                          <option value="Morning Batch (10:00 AM - 1:00 PM)">
                            Morning Batch (10:00 AM - 1:00 PM)
                          </option>
                          <option value="Afternoon Batch (1:00 PM - 4:00 PM)">
                            Afternoon Batch (1:00 PM - 4:00 PM)
                          </option>
                          <option value="Evening Batch (4:00 PM - 7:00 PM)">
                            Evening Batch (4:00 PM - 7:00 PM)
                          </option>
                          <option value="Weekend / Flexible Batch">
                            Weekend / Flexible Batch
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="ce-message"
                        className="block text-xs font-semibold text-[#3f0e21] mb-1.5"
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        id="ce-message"
                        rows={3}
                        placeholder="Ask about course syllabus, practical sessions, fees, or batch start dates..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8c0a8] bg-[#faf3ec]/50 text-sm text-[#2b1820] focus:outline-2 focus:outline-[#5e1933]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <span>{submitting ? 'Submitting Enquiry...' : 'Submit Course Enquiry'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE SYLLABUS, PRACTICAL TRAINING & CERTIFICATE MODAL */}
      {activeCourseModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
        >
          <div className="bg-[#faf3ec] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#d4af6a] shadow-xl my-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-[#7c2344]">
                  {activeCourseModal.category}
                </p>
                <h3
                  id="course-modal-title"
                  className="font-serif-luxury text-2xl font-bold text-[#3f0e21]"
                >
                  {activeCourseModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="px-3 py-1.5 rounded-lg border border-[#d5bda4] text-xs font-semibold text-[#4a1228] hover:bg-[#efe1d1] cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-sm text-[#563843] mb-4">{activeCourseModal.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-white border border-[#e2cbb3]">
                <h4 className="font-serif-luxury text-sm font-bold text-[#3f0e21] mb-2">
                  What Students Will Learn
                </h4>
                <ul className="space-y-1.5 text-xs text-[#4a1228]">
                  {activeCourseModal.whatStudentsWillLearn.map((w, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5e1933] shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#e2cbb3]">
                <h4 className="font-serif-luxury text-sm font-bold text-[#3f0e21] mb-2">
                  Course Syllabus
                </h4>
                <ul className="space-y-1.5 text-xs text-[#4a1228]">
                  {activeCourseModal.modules.map((m, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5e1933] shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f5ebe0] border border-[#dec6ad] mb-4 text-xs text-[#4a1228] space-y-1.5">
              <p>
                <strong>Practical Training Information:</strong>{' '}
                {activeCourseModal.practicalTraining}
              </p>
              <p>
                <strong>Certificate Information:</strong> {activeCourseModal.certificateInfo}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#4a1228] mb-6 bg-white p-3.5 rounded-xl border border-[#e2cbb3]">
              <div>
                <span className="block text-[10px] text-[#7a5864]">Duration</span>
                <strong>{activeCourseModal.duration}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-[#7a5864]">Fees</span>
                <strong>{activeCourseModal.fees}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-[#7a5864]">Eligibility</span>
                <strong>{activeCourseModal.eligibility}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-[#7a5864]">Batch Timings</span>
                <strong>{activeCourseModal.batchTimings}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <a
                href={buildWhatsAppUrl(
                  BRAND_CONTACT.whatsappNumber,
                  `Hello Sonu's Beauty Academy, I would like to enquire about the ${activeCourseModal.title}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  const id = activeCourseModal.id;
                  setActiveCourseModal(null);
                  handleSelectCourseAndScroll(id);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5e1933] hover:bg-[#4a1228] text-white text-xs font-semibold cursor-pointer"
              >
                <span>Enquire via Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
