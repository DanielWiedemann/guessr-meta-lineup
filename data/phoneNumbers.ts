import type { FactsMeta, FactCountry } from "@/data/types";

const geohints = "https://geohints.com/meta/phoneNumbers";

function p(code: string, callingCode: string): FactCountry {
  return {
    code,
    facts: [{ label: "Calling code", value: callingCode }],
    sourceUrl: geohints,
  };
}

export const phoneNumbers: FactsMeta = {
  id: "phoneNumbers",
  kind: "facts",
  name: "Phone numbers",
  description:
    "The international calling code itself is rarely visible in-game, but local phone number formats sometimes show up on shopfront signage — Chile and Brazil both have documented, learnable patterns.",
  attribution: "GeoHints",
  attributionUrl: geohints,
  countries: [
    // South America
    p("ar", "+54"),
    p("bo", "+591"),
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
    p("co", "+57"),
    p("ec", "+593"),
    p("pe", "+51"),
    p("uy", "+598"),

    // Latin America
    p("cr", "+506"),
    p("do", "+1 (809, 829 or 849)"),
    p("gt", "+502"),
    p("mx", "+52"),
    p("pa", "+507"),
    p("pr", "+1 (787 or 939)"),

    // Europe
    p("al", "+355"),
    p("ad", "+376"),
    p("at", "+43"),
    p("pt-az", "+351"),
    p("by", "+375"),
    p("be", "+32"),
    p("bg", "+359"),
    p("hr", "+385"),
    p("cy", "+357"),
    p("cz", "+420"),
    p("dk", "+45"),
    p("ee", "+372"),
    p("fo", "+298"),
    p("fi", "+358"),
    p("fr", "+33"),
    p("de", "+49"),
    p("gi", "+350"),
    p("gr", "+30"),
    p("hu", "+36"),
    p("is", "+354"),
    p("ie", "+353"),
    p("im", "+44 (1624)"),
    p("it", "+39"),
    p("je", "+44 (1534)"),
    p("lv", "+371"),
    p("li", "+423"),
    p("lt", "+370"),
    p("lu", "+352"),
    p("pt-ma", "+351"),
    p("mt", "+356"),
    p("mc", "+377"),
    p("me", "+382"),
    p("nl", "+31"),
    p("mk", "+389"),
    p("no", "+47"),
    p("pl", "+48"),
    p("pt", "+351"),
    p("ro", "+40"),
    p("ru", "+7"),
    p("sm", "+378"),
    p("rs", "+381"),
    p("sk", "+421"),
    p("si", "+386"),
    p("es", "+34"),
    p("sj", "+47 (79)"),
    p("se", "+46"),
    p("ch", "+41"),
    p("tr", "+90"),
    p("ua", "+380"),
    p("gb", "+44"),
  ],
};
