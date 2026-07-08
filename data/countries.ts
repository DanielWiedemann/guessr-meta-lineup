export type Country = {
  code: string;
  name: string;
};

export const southAmerica: Country[] = [
  { code: "ar", name: "Argentina" },
  { code: "bo", name: "Bolivia" },
  { code: "br", name: "Brazil" },
  { code: "cl", name: "Chile" },
  { code: "co", name: "Colombia" },
  { code: "ec", name: "Ecuador" },
  { code: "pe", name: "Peru" },
  { code: "uy", name: "Uruguay" },
];

export function flagUrl(code: string): string {
  return `https://www.worldometers.info/images/flags/w240/${code}.webp`;
}

export function countryName(code: string): string {
  return southAmerica.find((c) => c.code === code)?.name ?? code.toUpperCase();
}
