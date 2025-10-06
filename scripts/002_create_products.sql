-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price decimal(10, 2) not null,
  category text not null check (category in ('Books', 'Electronics', 'Stationery', 'Accessories', 'Others')),
  condition text not null check (condition in ('New', 'Like New', 'Good', 'Fair')),
  image_url text,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'available' check (status in ('available', 'sold')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.products enable row level security;

-- RLS Policies for products
create policy "Anyone can view available products"
  on public.products for select
  using (status = 'available' or seller_id = auth.uid());

create policy "Users can insert their own products"
  on public.products for insert
  with check (auth.uid() = seller_id);

create policy "Users can update their own products"
  on public.products for update
  using (auth.uid() = seller_id);

create policy "Users can delete their own products"
  on public.products for delete
  using (auth.uid() = seller_id);

-- Create index for faster queries
create index if not exists products_seller_id_idx on public.products(seller_id);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_status_idx on public.products(status);
