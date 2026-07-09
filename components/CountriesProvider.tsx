"use client";

import { createContext, useContext, useMemo } from "react";
import type { Country } from "@/data/countries";

const CountriesContext = createContext<Country[]>([]);

export function CountriesProvider({
  countries,
  children,
}: {
  countries: Country[];
  children: React.ReactNode;
}) {
  return <CountriesContext.Provider value={countries}>{children}</CountriesContext.Provider>;
}

export function useCountries() {
  const countries = useContext(CountriesContext);

  return useMemo(() => {
    function getCountry(code: string): Country | undefined {
      return countries.find((c) => c.code === code);
    }
    function countryName(code: string): string {
      return getCountry(code)?.name ?? code.toUpperCase();
    }
    return { countries, getCountry, countryName };
  }, [countries]);
}
