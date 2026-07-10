-- Currency symbol filter: the symbol(s) seen on price boards, shopfronts
-- and fuel signs (€, £, ₴, ฿, zł, Kč, ...). Multi-valued because some
-- countries show more than one (e.g. Panama's B/. alongside $). Populated
-- from data/currency.ts via scripts/seed-filters.ts; complete for all
-- countries, so an empty value here would mean a real "none" (excluded).
alter table countries
  add column currency_symbols text[] not null default '{}';
