-- Create table for job applications
create table applications (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  city text,
  role text not null,
  experience_level text not null,
  years_of_experience integer,
  portfolio_link text,
  motivation text,
  availability text,
  resume_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add unique constraint to email to prevent spam/duplicate applications
alter table applications add constraint applications_email_key unique (email);

-- Enable Row Level Security (RLS)
alter table applications enable row level security;

-- Policy: Allow anyone (anon) to INSERT applications
create policy "Allow public to insert applications"
  on applications for insert
  with check (true);

-- Policy: No one can SELECT/VIEW applications via API (Public) - Maintain Privacy
-- Only service_role (backend admin) can read.
create policy "Allow service_role full access"
  on applications for all
  using (auth.role() = 'service_role');
