import type { FactsMeta } from "@/data/types";

export const currency: FactsMeta = {
  id: "currency",
  kind: "facts",
  name: "Currency",
  description:
    "The currency symbol on price boards, gas station signs and shop windows can narrow down a country fast. Here's what to expect in each South American country.",
  attribution: "GeoHints",
  attributionUrl: "https://geohints.com/meta/currencies",
  countries: [
    {
      code: "ar",
      sourceUrl: "https://geohints.com/meta/currencies",
      facts: [
        { label: "Currency", value: "Argentine peso" },
        { label: "Symbol", value: "$" },
        { label: "Code", value: "ARS" },
      ],
    },
    {
      code: "bo",
      sourceUrl: "https://geohints.com/meta/currencies",
      facts: [
        { label: "Currency", value: "Bolivian boliviano" },
        { label: "Symbol", value: "Bs" },
        { label: "Code", value: "BOB" },
      ],
    },
    {
      code: "br",
      sourceUrl: "https://geohints.com/meta/currencies",
      facts: [
        { label: "Currency", value: "Brazilian real" },
        { label: "Symbol", value: "R$" },
        { label: "Code", value: "BRL" },
      ],
    },
    {
      code: "cl",
      sourceUrl: "https://geohints.com/meta/currencies",
      facts: [
        { label: "Currency", value: "Chilean peso" },
        { label: "Symbol", value: "$" },
        { label: "Code", value: "CLP" },
      ],
    },
    {
      code: "co",
      sourceUrl: "https://geohints.com/meta/currencies",
      facts: [
        { label: "Currency", value: "Colombian peso" },
        { label: "Symbol", value: "$" },
        { label: "Code", value: "COP" },
      ],
    },
    {
      code: "ec",
      sourceUrl: "https://geohints.com/meta/currencies",
      facts: [
        { label: "Currency", value: "United States dollar" },
        { label: "Symbol", value: "$ / US$ / U$" },
        { label: "Code", value: "USD" },
      ],
    },
    {
      code: "pe",
      sourceUrl: "https://geohints.com/meta/currencies",
      facts: [
        { label: "Currency", value: "Peruvian sol" },
        { label: "Symbol", value: "S/" },
        { label: "Code", value: "PEN" },
      ],
    },
    {
      code: "uy",
      sourceUrl: "https://geohints.com/meta/currencies",
      facts: [
        { label: "Currency", value: "Uruguayan peso" },
        { label: "Symbol", value: "$ / $U" },
        { label: "Code", value: "UYU" },
      ],
    },
  ],
};
