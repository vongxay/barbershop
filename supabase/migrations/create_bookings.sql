create type booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');

create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  service_id integer not null,
  service_name text not null,
  booking_date timestamp with time zone not null,
  notes text,
  status booking_status default 'pending' not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Add RLS policies
alter table public.bookings enable row level security;

create policy "Users can view their own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can create their own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own bookings"
  on public.bookings for update
  using (auth.uid() = user_id);

-- Add updated_at trigger
create function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger handle_bookings_updated_at
  before update on public.bookings
  for each row
  execute procedure public.handle_updated_at(); 