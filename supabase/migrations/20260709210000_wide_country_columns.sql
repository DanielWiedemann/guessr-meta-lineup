-- Replace the filter_categories / filter_options / country_filter_tags
-- EAV-style system with columns directly on countries — one row per
-- country holding every filterable fact. Single-valued facts are plain
-- columns; genuinely multi-valued facts (a country can speak several
-- languages, use more than one road-line color, etc.) are text[] arrays.
-- An empty array or null column means "not yet researched," not "none" —
-- see scripts/seed-filters.ts and the extension's matching logic, which
-- treats missing data as "still possible" rather than excluding a country.

alter table countries
  add column driving_side text check (driving_side in ('left', 'right')),
  add column continents text[] not null default '{}',
  add column languages text[] not null default '{}',
  add column special_letters_latin text[] not null default '{}',
  add column special_letters_cyrillic text[] not null default '{}',
  add column stop_sign_wording text[] not null default '{}',
  add column road_line_color_inner text[] not null default '{}',
  add column road_line_color_outer text[] not null default '{}',
  add column chevron_bg_color text[] not null default '{}',
  add column chevron_arrow_color text[] not null default '{}';

drop table if exists country_filter_tags;
drop table if exists filter_options;
drop table if exists filter_categories;
