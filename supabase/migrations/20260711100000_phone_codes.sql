-- Phone country code filter: the +XX calling code seen on shopfront
-- signage, vans and ads. Populated from data/phoneNumbers.ts via
-- scripts/seed-filters.ts; complete for all countries. Shared codes are a
-- feature, not a bug (+1 narrows to the NANP countries, +44 to the UK and
-- its crown dependencies) - the filter is OR-matched like the rest.
alter table countries
  add column phone_codes text[] not null default '{}';
