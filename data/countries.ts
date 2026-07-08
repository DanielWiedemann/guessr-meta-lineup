export type Region = "South America" | "Latin America" | "Europe";

export type Country = {
  code: string;
  name: string;
  region: Region;
  /** Override when the entity has no standalone flag in the Worldometer flag set (e.g. sub-national territories) */
  flagCode?: string;
};

export const countries: Country[] = [
  // South America
  { code: "ar", name: "Argentina", region: "South America" },
  { code: "bo", name: "Bolivia", region: "South America" },
  { code: "br", name: "Brazil", region: "South America" },
  { code: "cl", name: "Chile", region: "South America" },
  { code: "co", name: "Colombia", region: "South America" },
  { code: "ec", name: "Ecuador", region: "South America" },
  { code: "pe", name: "Peru", region: "South America" },
  { code: "uy", name: "Uruguay", region: "South America" },

  // Latin America (Central America / Caribbean, Spanish-speaking)
  { code: "cr", name: "Costa Rica", region: "Latin America" },
  { code: "do", name: "Dominican Republic", region: "Latin America" },
  { code: "gt", name: "Guatemala", region: "Latin America" },
  { code: "mx", name: "Mexico", region: "Latin America" },
  { code: "pa", name: "Panama", region: "Latin America" },
  { code: "pr", name: "Puerto Rico", region: "Latin America", flagCode: "us" },

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
];

export function flagUrl(code: string): string {
  const country = countries.find((c) => c.code === code);
  const flagCode = country?.flagCode ?? code;
  return `https://www.worldometers.info/images/flags/w240/${flagCode}.webp`;
}

export function countryName(code: string): string {
  return countries.find((c) => c.code === code)?.name ?? code.toUpperCase();
}

export function countriesByRegion(region: Region): Country[] {
  return countries.filter((c) => c.region === region);
}
