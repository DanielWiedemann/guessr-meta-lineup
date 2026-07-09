-- Language data now lives in the same filter_categories / filter_options /
-- country_filter_tags system as every other filter (driving side, colors,
-- letters, continent) instead of its own parallel two-table structure —
-- one consistent tagging system instead of several differently-shaped
-- ones. See scripts/seed-filters.ts for the new "language" category.

drop table if exists country_languages;
drop table if exists languages;
