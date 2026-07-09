-- Languages spoken in each country — separate from the filter-tag system
-- (country_filter_tags), since this is descriptive reference data rather
-- than a visual clue category yet.

create table languages (
  id text primary key,
  name text not null
);

create table country_languages (
  country_code text not null references countries(code) on delete cascade,
  language_id text not null references languages(id) on delete cascade,
  -- Whether this is the/a primary official language vs. a secondary one
  -- (e.g. English as a widely-spoken second language).
  is_primary boolean not null default true,
  primary key (country_code, language_id)
);

create index on country_languages (language_id);

alter table languages enable row level security;
alter table country_languages enable row level security;

create policy "public read" on languages for select using (true);
create policy "public read" on country_languages for select using (true);
