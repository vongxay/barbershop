-- สร้างตารางสำหรับบริการ (services)
create table services (
  id bigint primary key generated always as identity,
  name text not null,
  price decimal(10,2) not null,
  duration interval not null,
  description text,
  rating decimal(2,1),
  bookings_count integer default 0,
  is_popular boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- สร้างตารางสำหรับรูปภาพในแกลเลอรี่ (gallery_images)
create table gallery_images (
  id bigint primary key generated always as identity,
  type text not null check (type in ('before-after', 'interior')),
  title text not null,
  before_image_url text,
  after_image_url text,
  image_url text,
  description text,
  likes_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- สร้างตารางสำหรับผู้ใช้งาน (users)
create table users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- สร้างตารางสำหรับการจองคิว (bookings)
create table bookings (
  id bigint primary key generated always as identity,
  user_id uuid references users(id) on delete cascade not null,
  service_id bigint references services(id) on delete cascade not null,
  booking_date date not null,
  booking_time time not null,
  status text not null check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- สร้างตารางสำหรับการกดไลค์รูปภาพ (image_likes)
create table image_likes (
  id bigint primary key generated always as identity,
  user_id uuid references users(id) on delete cascade not null,
  image_id bigint references gallery_images(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, image_id)
);

-- สร้างตารางสำหรับข้อความติดต่อ (contact_messages)
create table contact_messages (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null check (status in ('new', 'read', 'replied')) default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- สร้าง trigger functions สำหรับอัพเดท updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- สร้าง triggers
create trigger update_services_updated_at
  before update on services
  for each row
  execute function update_updated_at_column();

create trigger update_bookings_updated_at
  before update on bookings
  for each row
  execute function update_updated_at_column();

-- สร้าง RLS policies
alter table services enable row level security;
alter table gallery_images enable row level security;
alter table users enable row level security;
alter table bookings enable row level security;
alter table image_likes enable row level security;
alter table contact_messages enable row level security;

-- ตัวอย่าง RLS policies สำหรับการอ่านข้อมูล
create policy "Services are viewable by everyone"
  on services for select
  using (true);

create policy "Gallery images are viewable by everyone"
  on gallery_images for select
  using (true);

create policy "Users can view their own profile"
  on users for select
  using (auth.uid() = id);

create policy "Users can view their own bookings"
  on bookings for select
  using (auth.uid() = user_id);

-- เพิ่มข้อมูลตัวอย่างสำหรับบริการ
insert into services (name, price, duration, description, rating, bookings_count, is_popular) values
  ('Classic Haircut', 30.00, interval '30 minutes', 'Traditional haircut with modern styling', 4.8, 1250, true),
  ('Beard Trim', 25.00, interval '20 minutes', 'Professional beard grooming and shaping', 4.9, 980, false),
  ('Hot Towel Shave', 35.00, interval '45 minutes', 'Luxurious traditional straight razor shave', 4.7, 750, false),
  ('Hair & Beard Combo', 50.00, interval '60 minutes', 'Complete grooming package', 4.9, 1100, true);

-- เพิ่มข้อมูลตัวอย่างสำหรับแกลเลอรี่
insert into gallery_images (type, title, before_image_url, after_image_url, description) values
  ('before-after', 'Classic Fade Transformation', 'https://images.unsplash.com/photo-1519699047748-de8e457a634e', 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c', null),
  ('interior', 'Modern Workspace', null, null, 'Our state-of-the-art barbershop interior'),
  ('before-after', 'Beard Grooming', 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6', 'https://images.unsplash.com/photo-1621605774974-01ecce055b78', null),
  ('interior', 'Waiting Area', null, null, 'Comfortable waiting area for our clients');