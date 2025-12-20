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

-- ============================================
-- MARKETPLACE TABLES
-- ============================================

-- Create table for music products/tracks
create table products (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  genre text,
  bpm integer,
  key text,
  audio_url text not null,
  preview_url text,
  file_url text not null,
  cover_image_url text,
  
  -- License types with pricing (in cents to avoid floating point issues)
  basic_price integer,
  premium_price integer,
  exclusive_price integer,
  
  -- Metadata
  duration_seconds integer,
  file_size_bytes bigint,
  tags text[],
  
  -- Status
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create table for orders
create table orders (
  id uuid default uuid_generate_v4() primary key,
  buyer_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  
  -- Order details
  license_type text not null check (license_type in ('basic', 'premium', 'exclusive')),
  amount integer not null, -- in cents
  currency text default 'INR' not null,
  
  -- Status tracking
  status text default 'pending' not null check (status in ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  
  -- Payment gateway reference
  payment_gateway text check (payment_gateway in ('razorpay', 'stripe')),
  payment_id text,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- Create table for transactions (payment tracking)
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  
  -- Payment gateway details
  gateway text not null check (gateway in ('razorpay', 'stripe')),
  gateway_transaction_id text not null,
  gateway_order_id text,
  
  -- Transaction details
  amount integer not null, -- in cents
  currency text default 'INR' not null,
  status text not null check (status in ('created', 'authorized', 'captured', 'failed', 'refunded')),
  
  -- Payment method
  payment_method text,
  
  -- Gateway response
  gateway_response jsonb,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index idx_products_seller_id on products(seller_id);
create index idx_products_is_active on products(is_active);
create index idx_products_created_at on products(created_at desc);
create index idx_orders_buyer_id on orders(buyer_id);
create index idx_orders_product_id on orders(product_id);
create index idx_orders_status on orders(status);
create index idx_orders_created_at on orders(created_at desc);
create index idx_transactions_order_id on transactions(order_id);
create index idx_transactions_gateway_transaction_id on transactions(gateway_transaction_id);
create index idx_transactions_status on transactions(status);

-- Enable Row Level Security (RLS)
alter table products enable row level security;
alter table orders enable row level security;
alter table transactions enable row level security;

-- RLS Policies for products
-- Anyone can view active products
create policy "Anyone can view active products"
  on products for select
  using (is_active = true);

-- Sellers can insert their own products
create policy "Sellers can insert their own products"
  on products for insert
  with check (auth.uid() = seller_id);

-- Sellers can update their own products
create policy "Sellers can update their own products"
  on products for update
  using (auth.uid() = seller_id);

-- Sellers can delete their own products
create policy "Sellers can delete their own products"
  on products for delete
  using (auth.uid() = seller_id);

-- RLS Policies for orders
-- Buyers can view their own orders
create policy "Buyers can view their own orders"
  on orders for select
  using (auth.uid() = buyer_id);

-- Sellers can view orders for their products
create policy "Sellers can view orders for their products"
  on orders for select
  using (
    exists (
      select 1 from products
      where products.id = orders.product_id
      and products.seller_id = auth.uid()
    )
  );

-- Buyers can create orders
create policy "Buyers can create orders"
  on orders for insert
  with check (auth.uid() = buyer_id);

-- RLS Policies for transactions
-- Buyers can view transactions for their orders
create policy "Buyers can view their transactions"
  on transactions for select
  using (
    exists (
      select 1 from orders
      where orders.id = transactions.order_id
      and orders.buyer_id = auth.uid()
    )
  );

-- Sellers can view transactions for their products
create policy "Sellers can view product transactions"
  on transactions for select
  using (
    exists (
      select 1 from orders
      join products on products.id = orders.product_id
      where orders.id = transactions.order_id
      and products.seller_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers to auto-update updated_at
create trigger update_products_updated_at
  before update on products
  for each row
  execute function update_updated_at_column();

create trigger update_transactions_updated_at
  before update on transactions
  for each row
  execute function update_updated_at_column();
