-- ============================================================================
-- SONU'S BEAUTY STUDIO & ACADEMY + SONU FOUNDATION AND CHARITABLE TRUST
-- SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

create extension if not exists "pgcrypto";

-- 1. LOCATIONS TABLE (Two-Location Support + Full Admin Management Schema)
create table if not exists public.locations (
  id text primary key,
  location_name text not null,
  address text not null default '',
  city text not null default 'Vadodara',
  state text not null default 'Gujarat',
  pincode text not null default '',
  phone text not null,
  google_maps_url text not null,
  latitude numeric(10, 6),
  longitude numeric(10, 6),
  opening_time text not null default '10:00',
  closing_time text not null default '20:00',
  active boolean not null default true,
  available_services jsonb not null default '[]'::jsonb,
  image_url text not null default '/assets/sonu/salon-interior.png',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed Initial Two Locations (Preserving exact coordinates 22.305021, 73.210297 for Location 2)
insert into public.locations (
  id, location_name, address, city, state, pincode, phone,
  google_maps_url, latitude, longitude, opening_time, closing_time, active, image_url
) values
(
  'location-1',
  'Sonu’s Beauty Studio & Academy — Location 1',
  'Sonu''s Beauty Studio and Academy, Vadodara, Gujarat',
  'Vadodara',
  'Gujarat',
  '',
  '+91 98765 43210',
  'https://www.google.com/maps/search/?api=1&query=Sonu%27s+Beauty+Studio+and+Academy+Vadodara+Gujarat',
  null,
  null,
  '10:00',
  '20:00',
  true,
  '/assets/sonu/salon-interior.png'
),
(
  'location-2',
  'Sonu’s Beauty Studio & Academy — Location 2',
  'Vadodara, Gujarat',
  'Vadodara',
  'Gujarat',
  '',
  '+91 98765 43210',
  'https://www.google.com/maps?q=22.305021,73.210297',
  22.305021,
  73.210297,
  '10:00',
  '20:00',
  true,
  '/assets/sonu/hero-reception.png'
)
on conflict (id) do nothing;

-- 2. SERVICES TABLE
create table if not exists public.services (
  id text primary key,
  name text not null,
  category text not null,
  description text not null,
  price_label text not null default 'Price on Enquiry',
  starting_price integer,
  duration_label text,
  image_url text not null,
  whats_included jsonb not null default '[]'::jsonb,
  service_process jsonb not null default '[]'::jsonb,
  is_popular boolean not null default false,
  created_at timestamptz not null default now()
);

-- 3. COURSES TABLE (Academy + Sonu Foundation and Charitable Trust)
create table if not exists public.courses (
  id text primary key,
  title text not null,
  division text not null check (division in ('academy', 'foundation')),
  category text not null check (category in ('Beauty & Makeup Classes', 'Stitching & Tailoring Classes', 'Computer Classes')),
  description text not null,
  image_url text not null,
  duration text not null default 'Contact for Details',
  fees text not null default 'Contact for Details',
  eligibility text not null default 'Contact for Details',
  batch_timings text not null default 'Contact for Details',
  highlights jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- 4. BOOKINGS TABLE (Includes selected location_id, location_name, and location_address)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_ref text unique not null,
  customer_name text not null,
  phone text not null,
  email text,
  location_id text not null references public.locations(id),
  location_name text not null,
  location_address text not null,
  service_id text not null,
  service_name text not null,
  appointment_date date not null,
  time_slot text not null,
  message text,
  status text not null default 'Pending Confirmation' check (status in ('Pending Confirmation', 'Confirmed', 'Cancelled')),
  timezone text not null default 'Asia/Kolkata',
  created_at timestamptz not null default now(),
  constraint unique_location_date_slot unique (location_id, appointment_date, time_slot)
);

-- 5. COURSE ENQUIRIES TABLE
create table if not exists public.course_enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_ref text unique not null,
  student_name text not null,
  phone text not null,
  course_id text not null,
  course_title text not null,
  preferred_branch text not null,
  preferred_batch text not null,
  message text,
  created_at timestamptz not null default now()
);

-- 6. CONTACT ENQUIRIES TABLE
create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  contact_ref text unique not null,
  name text not null,
  phone text not null,
  email text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

alter table public.locations enable row level security;
alter table public.services enable row level security;
alter table public.courses enable row level security;
alter table public.bookings enable row level security;
alter table public.course_enquiries enable row level security;
alter table public.contact_enquiries enable row level security;

create policy "Public read access for active locations"
  on public.locations for select
  to anon, authenticated
  using (active = true);

create policy "Public read access for services"
  on public.services for select
  to anon, authenticated
  using (true);

create policy "Public read access for courses"
  on public.courses for select
  to anon, authenticated
  using (true);
