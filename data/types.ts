export type ImageCredit = {
  author: string;
  license: string;
  sourceUrl: string;
};

export type Variant = {
  id: string;
  label: string;
  description: string;
  image: string;
  credit?: ImageCredit;
};

export type CountryEntry = {
  code: string;
  variants: Variant[];
  note?: string;
  sourceUrl?: string;
};

export type GalleryMeta = {
  id: string;
  kind: "gallery";
  name: string;
  description: string;
  attribution: string;
  attributionUrl: string;
  countries: CountryEntry[];
};

export type Fact = {
  label: string;
  value: string;
};

export type FactCountry = {
  code: string;
  facts: Fact[];
  sourceUrl?: string;
};

export type FactsMeta = {
  id: string;
  kind: "facts";
  name: string;
  description: string;
  attribution: string;
  attributionUrl: string;
  countries: FactCountry[];
};

export type SignGroup = {
  id: string;
  label: string;
  countries: CountryEntry[];
};

export type GroupedGalleryMeta = {
  id: string;
  kind: "grouped-gallery";
  name: string;
  description: string;
  attribution: string;
  attributionUrl: string;
  groups: SignGroup[];
};

export type Meta = GalleryMeta | FactsMeta | GroupedGalleryMeta;
