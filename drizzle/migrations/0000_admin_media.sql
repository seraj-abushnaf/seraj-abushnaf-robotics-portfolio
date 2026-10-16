create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create table public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  caption text not null default '',
  category text not null default 'Photos',
  project_slug text,
  award_title text,
  created_at timestamptz not null default now()
);
grant select on public.media to anon, authenticated;
grant insert, update, delete on public.media to authenticated;
grant all on public.media to service_role;
alter table public.media enable row level security;
create policy "Public read media" on public.media for select to anon, authenticated using (true);
create policy "Admin insert media" on public.media for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admin update media" on public.media for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin delete media" on public.media for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Public read evidence" on storage.objects for select using (bucket_id = 'evidence');
create policy "Admin upload evidence" on storage.objects for insert to authenticated with check (bucket_id = 'evidence' and public.has_role(auth.uid(), 'admin'));
create policy "Admin update evidence" on storage.objects for update to authenticated using (bucket_id = 'evidence' and public.has_role(auth.uid(), 'admin'));
create policy "Admin delete evidence" on storage.objects for delete to authenticated using (bucket_id = 'evidence' and public.has_role(auth.uid(), 'admin'));