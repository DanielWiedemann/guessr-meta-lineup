import type { GalleryMeta } from "@/data/types";

function plonkit(country: string, file: string) {
  return `https://www.plonkit.net/images/resize/600/80/${country}/${file}`;
}

export const poles: GalleryMeta = {
  id: "poles",
  kind: "gallery",
  name: "Poles",
  description:
    "Utility pole shape, material and top design vary a lot across South America. These are the nationally-common types — plenty of countries have extra regional variants beyond these.",
  attribution: "Plonk It",
  attributionUrl: "https://www.plonkit.net/guide",
  countries: [
    {
      code: "ar",
      sourceUrl: "https://www.plonkit.net/argentina",
      variants: [
        {
          id: "ar-pole-concrete",
          label: "Round concrete pole",
          description:
            "Round concrete poles sustaining three electricity lines in an alternating pattern are very common in Argentina. Doubled-up poles are also a good clue.",
          image: plonkit("argentina", "Argentina_concrete_poles.png"),
        },
        {
          id: "ar-pole-wooden",
          label: "Wooden A-frame pole",
          description:
            "Wooden poles, with or without a crossbar, are also fairly common. Wooden A-frame poles in South America are only found in Argentina.",
          image: plonkit("argentina", "Argentina_wooden_poles.png"),
        },
      ],
    },
    {
      code: "bo",
      sourceUrl: "https://www.plonkit.net/bolivia",
      variants: [
        {
          id: "bo-pole",
          label: "Concrete or wooden pole",
          description:
            "Round concrete poles (often with small pinholes near the top) and wooden poles are both common. Poles in Bolivia are inconsistent and shouldn't be relied on too heavily.",
          image: plonkit("bolivia", "1_poles.png"),
        },
      ],
    },
    {
      code: "br",
      sourceUrl: "https://www.plonkit.net/brazil",
      variants: [
        {
          id: "br-pole-ladder",
          label: "\"Ladder\" pole",
          description:
            "The most common pole in Brazil resembles a ladder in the bottom portion — rectangular with long segments and small holes near the top.",
          image: plonkit("brazil", "ladders.png"),
        },
        {
          id: "br-pole-round",
          label: "Round concrete pole",
          description:
            "Round, cylindrical concrete poles are also common, especially across the south of Brazil and São Paulo.",
          image: plonkit("brazil", "Brazil_Round_Poles_2.png"),
        },
      ],
    },
    {
      code: "cl",
      sourceUrl: "https://www.plonkit.net/chile",
      variants: [
        {
          id: "cl-pole",
          label: "Square concrete pole",
          description:
            "Square concrete poles with an indent on both sides, similar to Brazilian poles but with fewer horizontal supports. The upper part typically has small pinholes.",
          image: plonkit("chile", "pole.png"),
        },
      ],
    },
    {
      code: "co",
      sourceUrl: "https://www.plonkit.net/colombia",
      variants: [
        {
          id: "co-pole",
          label: "Striped concrete pole",
          description:
            "Colombian poles are often marked with distinctive black-and-yellow or black-and-orange stripes.",
          image: plonkit("colombia", "Copy_of_Copy_of_Copy_of_Copy_of_Untitled__282_29.png"),
        },
      ],
      note: "Colombia is also one of the only Latin American countries (besides Mexico and Ecuador) where octagonal poles appear.",
    },
    {
      code: "ec",
      sourceUrl: "https://www.plonkit.net/ecuador",
      variants: [
        {
          id: "ec-pole-ladder",
          label: "\"Ladder\" pole",
          description:
            "Most Ecuadorian poles are generic round concrete, but the ladder pole — with many small indents resembling ladder steps — is more or less unique to Ecuador within Latin America.",
          image: plonkit("ecuador", "Ecua_poles.png"),
        },
      ],
    },
    {
      code: "pe",
      sourceUrl: "https://www.plonkit.net/peru",
      variants: [
        {
          id: "pe-pole",
          label: "Concrete or wooden pole",
          description:
            "Made of concrete or wood, sometimes with distinct horizontal concrete bars (also seen in Argentina).",
          image: plonkit("peru", "Peru_poles.png"),
        },
        {
          id: "pe-pole-paint",
          label: "Painted-bottom pole",
          description:
            "Some poles have painted bottom sections, most commonly black or black-and-yellow — a pattern fairly unique to Peru within South America.",
          image: plonkit("peru", "Peru_pole_paint.png"),
        },
      ],
    },
    {
      code: "uy",
      sourceUrl: "https://www.plonkit.net/uruguay",
      variants: [
        {
          id: "uy-pole-trident",
          label: "Trident pole",
          description:
            "The most useful Uruguayan pole type — named for its distinctive top with three insulators pointing upwards. Similar poles appear just across the border in Rio Grande do Sul, Brazil.",
          image: plonkit("uruguay", "Trident_pole.png"),
        },
      ],
    },
  ],
};
