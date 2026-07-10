-- Two new filterable facts on countries:
--  * scripts — writing systems visible on local signage (Thai, Khmer,
--    Telugu, Arabic, Hangul, ...), so a player can identify a country from
--    the *shape* of an unfamiliar alphabet even when they can't read it.
--  * road_name_words — the street-name designator words/abbreviations seen
--    on road signs and name plates (Jalan/Jl., ul., -straat, -vej, Rue,
--    Calle, ...).
-- Same conventions as the other wide columns: text[] display-ready values,
-- empty array = "not yet researched", never "has none".

alter table countries
  add column scripts text[] not null default '{}',
  add column road_name_words text[] not null default '{}';
