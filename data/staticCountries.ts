// Authoring source for the `countries` table — edit here, then re-run
// `scripts/migrate-to-supabase.ts` to sync to Supabase. The live app reads
// from Supabase (see data/countries.ts), not from this file.

export type Region =
  | "South America"
  | "Latin America"
  | "Europe"
  | "North America"
  | "Africa"
  | "Antarctica"
  | "Asia"
  | "Oceania";

export type StaticCountry = {
  code: string;
  name: string;
  region: Region;
  /** Override when the entity has no standalone flag in the Worldometer flag set (e.g. sub-national territories) */
  flagCode?: string;
};

export const staticCountries: StaticCountry[] = [
  // South America
  { code: "ar", name: "Argentina", region: "South America" },
  { code: "bo", name: "Bolivia", region: "South America" },
  { code: "br", name: "Brazil", region: "South America" },
  { code: "cl", name: "Chile", region: "South America" },
  { code: "co", name: "Colombia", region: "South America" },
  { code: "cw", name: "Curaçao", region: "South America" },
  { code: "ec", name: "Ecuador", region: "South America" },
  { code: "fk", name: "Falkland Islands", region: "South America" },
  { code: "pe", name: "Peru", region: "South America" },
  { code: "uy", name: "Uruguay", region: "South America" },

  // Latin America (Central America / Caribbean, Spanish-speaking)
  { code: "cr", name: "Costa Rica", region: "Latin America" },
  { code: "do", name: "Dominican Republic", region: "Latin America" },
  { code: "gt", name: "Guatemala", region: "Latin America" },
  { code: "mx", name: "Mexico", region: "Latin America" },
  { code: "pa", name: "Panama", region: "Latin America" },
  { code: "pr", name: "Puerto Rico", region: "Latin America", flagCode: "us" },

  // North America
  { code: "us", name: "United States", region: "North America" },
  { code: "us-ak", name: "Alaska", region: "North America", flagCode: "us" },
  { code: "us-hi", name: "Hawaii", region: "North America", flagCode: "us" },
  { code: "ca", name: "Canada", region: "North America" },
  { code: "bm", name: "Bermuda", region: "North America" },
  { code: "gl", name: "Greenland", region: "North America" },
  { code: "mq", name: "Martinique", region: "North America" },
  { code: "pm", name: "Saint Pierre and Miquelon", region: "North America" },
  { code: "um", name: "US Minor Outlying Islands", region: "North America" },
  { code: "vi", name: "US Virgin Islands", region: "North America" },

  // Europe
  { code: "al", name: "Albania", region: "Europe" },
  { code: "ad", name: "Andorra", region: "Europe" },
  { code: "at", name: "Austria", region: "Europe" },
  { code: "pt-az", name: "Azores", region: "Europe", flagCode: "pt" },
  { code: "by", name: "Belarus", region: "Europe" },
  { code: "be", name: "Belgium", region: "Europe" },
  { code: "bg", name: "Bulgaria", region: "Europe" },
  { code: "hr", name: "Croatia", region: "Europe" },
  { code: "cy", name: "Cyprus", region: "Europe" },
  { code: "cz", name: "Czechia", region: "Europe" },
  { code: "dk", name: "Denmark", region: "Europe" },
  { code: "ee", name: "Estonia", region: "Europe" },
  { code: "fo", name: "Faroe Islands", region: "Europe", flagCode: "dk" },
  { code: "fi", name: "Finland", region: "Europe" },
  { code: "fr", name: "France", region: "Europe" },
  { code: "de", name: "Germany", region: "Europe" },
  { code: "gi", name: "Gibraltar", region: "Europe", flagCode: "gb" },
  { code: "gr", name: "Greece", region: "Europe" },
  { code: "hu", name: "Hungary", region: "Europe" },
  { code: "is", name: "Iceland", region: "Europe" },
  { code: "ie", name: "Ireland", region: "Europe" },
  { code: "im", name: "Isle of Man", region: "Europe", flagCode: "gb" },
  { code: "it", name: "Italy", region: "Europe" },
  { code: "je", name: "Jersey", region: "Europe", flagCode: "gb" },
  { code: "lv", name: "Latvia", region: "Europe" },
  { code: "li", name: "Liechtenstein", region: "Europe" },
  { code: "lt", name: "Lithuania", region: "Europe" },
  { code: "lu", name: "Luxembourg", region: "Europe" },
  { code: "pt-ma", name: "Madeira", region: "Europe", flagCode: "pt" },
  { code: "mt", name: "Malta", region: "Europe" },
  { code: "mc", name: "Monaco", region: "Europe" },
  { code: "me", name: "Montenegro", region: "Europe" },
  { code: "nl", name: "Netherlands", region: "Europe" },
  { code: "mk", name: "North Macedonia", region: "Europe" },
  { code: "no", name: "Norway", region: "Europe" },
  { code: "pl", name: "Poland", region: "Europe" },
  { code: "pt", name: "Portugal", region: "Europe" },
  { code: "ro", name: "Romania", region: "Europe" },
  { code: "ru", name: "Russia", region: "Europe" },
  { code: "sm", name: "San Marino", region: "Europe" },
  { code: "rs", name: "Serbia", region: "Europe" },
  { code: "sk", name: "Slovakia", region: "Europe" },
  { code: "si", name: "Slovenia", region: "Europe" },
  { code: "es", name: "Spain", region: "Europe" },
  { code: "sj", name: "Svalbard", region: "Europe", flagCode: "no" },
  { code: "se", name: "Sweden", region: "Europe" },
  { code: "ch", name: "Switzerland", region: "Europe" },
  { code: "tr", name: "Turkey", region: "Europe" },
  { code: "ua", name: "Ukraine", region: "Europe" },
  { code: "gb", name: "United Kingdom", region: "Europe" },

  // Africa
  { code: "bw", name: "Botswana", region: "Africa" },
  { code: "eg", name: "Egypt", region: "Africa" },
  { code: "sz", name: "Eswatini", region: "Africa" },
  { code: "gh", name: "Ghana", region: "Africa" },
  { code: "ke", name: "Kenya", region: "Africa" },
  { code: "ls", name: "Lesotho", region: "Africa" },
  { code: "mg", name: "Madagascar", region: "Africa" },
  { code: "ml", name: "Mali", region: "Africa" },
  { code: "na", name: "Namibia", region: "Africa" },
  { code: "ng", name: "Nigeria", region: "Africa" },
  { code: "re", name: "Reunion", region: "Africa" },
  { code: "rw", name: "Rwanda", region: "Africa" },
  { code: "sn", name: "Senegal", region: "Africa" },
  { code: "za", name: "South Africa", region: "Africa" },
  { code: "st", name: "São Tomé and Príncipe", region: "Africa" },
  { code: "tz", name: "Tanzania", region: "Africa" },
  { code: "tn", name: "Tunisia", region: "Africa" },
  { code: "ug", name: "Uganda", region: "Africa" },

  // Antarctica
  { code: "aq", name: "Antarctica", region: "Antarctica" },
  { code: "gs", name: "South Georgia and the South Sandwich Islands", region: "Antarctica", flagCode: "gb" },

  // Asia
  { code: "bd", name: "Bangladesh", region: "Asia" },
  { code: "bt", name: "Bhutan", region: "Asia" },
  { code: "io", name: "British Indian Ocean Territory", region: "Asia", flagCode: "gb" },
  { code: "kh", name: "Cambodia", region: "Asia" },
  { code: "cn", name: "China", region: "Asia" },
  { code: "hk", name: "Hong Kong", region: "Asia" },
  { code: "in", name: "India", region: "Asia" },
  { code: "id", name: "Indonesia", region: "Asia" },
  { code: "iq", name: "Iraq", region: "Asia" },
  { code: "il", name: "Israel", region: "Asia" },
  { code: "ps", name: "West Bank", region: "Asia" },
  { code: "jp", name: "Japan", region: "Asia" },
  { code: "jo", name: "Jordan", region: "Asia" },
  { code: "kz", name: "Kazakhstan", region: "Asia" },
  { code: "kg", name: "Kyrgyzstan", region: "Asia" },
  { code: "la", name: "Laos", region: "Asia" },
  { code: "lb", name: "Lebanon", region: "Asia" },
  { code: "mo", name: "Macau", region: "Asia" },
  { code: "my", name: "Malaysia", region: "Asia" },
  { code: "mn", name: "Mongolia", region: "Asia" },
  { code: "np", name: "Nepal", region: "Asia" },
  { code: "om", name: "Oman", region: "Asia" },
  { code: "pk", name: "Pakistan", region: "Asia" },
  { code: "ph", name: "Philippines", region: "Asia" },
  { code: "qa", name: "Qatar", region: "Asia" },
  { code: "sg", name: "Singapore", region: "Asia" },
  { code: "kr", name: "South Korea", region: "Asia" },
  { code: "lk", name: "Sri Lanka", region: "Asia" },
  { code: "tw", name: "Taiwan", region: "Asia" },
  { code: "th", name: "Thailand", region: "Asia" },
  { code: "ae", name: "United Arab Emirates", region: "Asia" },
  { code: "vn", name: "Vietnam", region: "Asia" },

  // Oceania
  { code: "as", name: "American Samoa", region: "Oceania" },
  { code: "au", name: "Australia", region: "Oceania" },
  { code: "cx", name: "Christmas Island", region: "Oceania", flagCode: "au" },
  { code: "cc", name: "Cocos Islands", region: "Oceania", flagCode: "au" },
  { code: "gu", name: "Guam", region: "Oceania" },
  { code: "nz", name: "New Zealand", region: "Oceania" },
  { code: "mp", name: "Northern Mariana Islands", region: "Oceania" },
  { code: "pn", name: "Pitcairn Islands", region: "Oceania", flagCode: "gb" },
  { code: "vu", name: "Vanuatu", region: "Oceania" },
];
