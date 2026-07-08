import type { FactsMeta } from "@/data/types";

const geohints = "https://geohints.com/meta/phoneNumbers";

export const phoneNumbers: FactsMeta = {
  id: "phoneNumbers",
  kind: "facts",
  name: "Phone numbers",
  description:
    "The international calling code itself is rarely visible in-game, but local phone number formats sometimes show up on shopfront signage — Chile and Brazil both have documented, learnable patterns.",
  attribution: "GeoHints",
  attributionUrl: geohints,
  countries: [
    {
      code: "ar",
      facts: [{ label: "Calling code", value: "+54" }],
      sourceUrl: geohints,
    },
    {
      code: "bo",
      facts: [{ label: "Calling code", value: "+591" }],
      sourceUrl: geohints,
    },
    {
      code: "br",
      facts: [
        { label: "Calling code", value: "+55" },
        { label: "Local format", value: "Area code (DDD) + 8 (landline) or 9 (mobile) digits" },
      ],
      image: "https://www.plonkit.net/images/resize/600/80/brazil/Brasil_-_C_C3_B3digos_de__C3_A1rea_DDD.png",
      sourceUrl: "https://www.plonkit.net/brazil",
    },
    {
      code: "cl",
      facts: [
        { label: "Calling code", value: "+56" },
        { label: "Local format", value: "2-digit area code + 7 digits" },
      ],
      image: "https://www.plonkit.net/images/resize/600/80/chile/Chile_Area_Codes.png",
      sourceUrl: "https://www.plonkit.net/chile",
    },
    {
      code: "co",
      facts: [{ label: "Calling code", value: "+57" }],
      sourceUrl: geohints,
    },
    {
      code: "ec",
      facts: [{ label: "Calling code", value: "+593" }],
      sourceUrl: geohints,
    },
    {
      code: "pe",
      facts: [{ label: "Calling code", value: "+51" }],
      sourceUrl: geohints,
    },
    {
      code: "uy",
      facts: [{ label: "Calling code", value: "+598" }],
      sourceUrl: geohints,
    },
  ],
};
