-- Create cart table
create table if not exists public.cart (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  added_at timestamp with time zone default now(),
  unique(user_id, product_id)
);

-- Enable RLS
alter table public.cart enable row level security;

-- RLS Policies for cart
create policy "Users can view their own cart"
  on public.cart for select
  using (auth.uid() = user_id);

create policy "Users can add to their own cart"
  on public.cart for insert
  with check (auth.uid() = user_id);

create policy "Users can remove from their own cart"
  on public.cart for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists cart_user_id_idx on public.cart(user_id);
create index if not exists cart_product_id_idx on public.cart(product_id);
