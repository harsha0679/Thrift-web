-- Create storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Storage policies for product images
create policy "Anyone can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images' 
    and auth.role() = 'authenticated'
  );

create policy "Users can update their own product images"
  on storage.objects for update
  using (
    bucket_id = 'product-images' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );
