-- Create services table
create table public.services (
  id serial primary key,
  name text not null,
  description text,
  duration interval not null,
  price decimal(10,2) not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create barbers table
create table public.barbers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  bio text,
  profile_image_url text,
  is_active boolean default true not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create working_hours table
create table public.working_hours (
  id serial primary key,
  barber_id uuid references public.barbers(id) on delete cascade not null,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_working boolean default true not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint valid_time_range check (start_time < end_time)
);

-- Add RLS policies
alter table public.services enable row level security;
alter table public.barbers enable row level security;
alter table public.working_hours enable row level security;

-- Services policies
create policy "Anyone can view active services"
  on public.services for select
  using (is_active = true);

create policy "Only authenticated users can view all services"
  on public.services for select
  using (auth.role() = 'authenticated');

-- Barbers policies
create policy "Anyone can view active barbers"
  on public.barbers for select
  using (is_active = true);

create policy "Barbers can update their own profile"
  on public.barbers for update
  using (auth.uid() = user_id);

-- Working hours policies
create policy "Anyone can view working hours"
  on public.working_hours for select
  using (true);

create policy "Barbers can manage their working hours"
  on public.working_hours for all
  using (auth.uid() = (select user_id from public.barbers where id = barber_id));

-- Add triggers for updated_at
create trigger handle_services_updated_at
  before update on public.services
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_barbers_updated_at
  before update on public.barbers
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_working_hours_updated_at
  before update on public.working_hours
  for each row
  execute procedure public.handle_updated_at(); 