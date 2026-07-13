-- A compact license-plate summary on the countries table so the Chrome
-- extension (which only reads this one wide table) can show the plate when
-- you open a country's clue card. The full plate meta still lives in the
-- variants table for the website. Populated from data/licensePlates.ts via
-- scripts/seed-filters.ts.
alter table countries
  add column license_plate_image text,
  add column license_plate_label text,
  add column license_plate_desc text;
