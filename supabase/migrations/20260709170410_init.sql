-- Meta Lineup schema: countries, metas, per-country meta entries (with image
-- variants or plain facts), and a separate filter-tag system for the
-- Chrome extension's progressive filtering.

create table countries (
  code text primary key,
  name text not null,
  region text not null,
  flag_code text
);

create table metas (
  id text primary key,
  kind text not null check (kind in ('gallery', 'grouped-gallery', 'facts')),
  name text not null,
  description text not null,
  attribution text not null,
  attribution_url text not null,
  sort_order int not null default 0
);

-- One row per (meta, optional group, country). group_key is null for
-- simple 'gallery'/'facts' metas, and set (e.g. 'lines'/'chevrons',
-- 'stop'/'yield'/'pedestrian'/'busStop') for 'grouped-gallery' metas.
create table country_meta_entries (
  id uuid primary key default gen_random_uuid(),
  meta_id text not null references metas(id) on delete cascade,
  group_key text,
  group_label text,
  country_code text not null references countries(code) on delete cascade,
  source_url text,
  note text,
  image_url text,
  unique (meta_id, group_key, country_code)
);

create index on country_meta_entries (country_code);
create index on country_meta_entries (meta_id, group_key);

-- Image-based clues, for 'gallery'/'grouped-gallery' entries.
create table variants (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references country_meta_entries(id) on delete cascade,
  slug text not null,
  label text not null,
  description text not null,
  image_url text not null,
  credit_author text,
  credit_license text,
  credit_source_url text,
  sort_order int not null default 0,
  unique (entry_id, slug)
);

create index on variants (entry_id);

-- Plain facts, for 'facts' entries (currency, phone numbers).
create table facts (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references country_meta_entries(id) on delete cascade,
  label text not null,
  value text not null,
  sort_order int not null default 0
);

create index on facts (entry_id);

-- Filter system (Chrome extension). A country can hold multiple options in
-- the same category (e.g. "similar/unsure" or genuinely mixed variants).
create table filter_categories (
  id text primary key,
  name text not null,
  description text,
  sort_order int not null default 0
);

create table filter_options (
  id text primary key,
  category_id text not null references filter_categories(id) on delete cascade,
  label text not null,
  sort_order int not null default 0
);

create index on filter_options (category_id);

create table country_filter_tags (
  country_code text not null references countries(code) on delete cascade,
  filter_option_id text not null references filter_options(id) on delete cascade,
  primary key (country_code, filter_option_id)
);

create index on country_filter_tags (filter_option_id);

-- Everything here is public read-only reference data (no user accounts yet),
-- served to both the website and the Chrome extension via the anon key.
alter table countries enable row level security;
alter table metas enable row level security;
alter table country_meta_entries enable row level security;
alter table variants enable row level security;
alter table facts enable row level security;
alter table filter_categories enable row level security;
alter table filter_options enable row level security;
alter table country_filter_tags enable row level security;

create policy "public read" on countries for select using (true);
create policy "public read" on metas for select using (true);
create policy "public read" on country_meta_entries for select using (true);
create policy "public read" on variants for select using (true);
create policy "public read" on facts for select using (true);
create policy "public read" on filter_categories for select using (true);
create policy "public read" on filter_options for select using (true);
create policy "public read" on country_filter_tags for select using (true);
