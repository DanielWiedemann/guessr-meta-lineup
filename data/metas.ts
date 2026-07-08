export type Variant = {
  id: string;
  label: string;
  description: string;
  image: string;
};

export type CountryEntry = {
  code: string;
  name: string;
  flag: string;
  sourceUrl: string;
  variants: Variant[];
  note?: string;
};

export type Meta = {
  id: string;
  name: string;
  description: string;
  countries: CountryEntry[];
};

export const metas: Meta[] = [
  {
    id: "bollards",
    name: "Bollards",
    description:
      "Roadside bollards vary a lot in shape, colour and reflector style across South America. Scan the lineup below and match it to what you're seeing in-game.",
    countries: [
      {
        code: "cl",
        name: "Chile",
        flag: "🇨🇱",
        sourceUrl: "https://www.plonkit.net/chile",
        variants: [
          {
            id: "cl-standard",
            label: "Standard bollard",
            description:
              "Similar to Spanish-style bollards, with a white reflector at the front and a yellow-orange reflector at the back. Not super common.",
            image: "https://www.plonkit.net/images/resize/600/80/chile/bollard.png",
          },
          {
            id: "cl-temporary",
            label: "Temporary bollard",
            description:
              "Regular bollards are fairly rare in Chile, but you may spot this orange, temporary bollard with two white stripes at the top.",
            image: "https://www.plonkit.net/images/resize/600/80/chile/temporary_bollards.png",
          },
        ],
      },
      {
        code: "ec",
        name: "Ecuador",
        flag: "🇪🇨",
        sourceUrl: "https://www.plonkit.net/ecuador",
        variants: [
          {
            id: "ec-round",
            label: "Round bollard",
            description:
              "Ecuador is one of the few Latin American countries where bollards are very common. Round bollard with two red stripes.",
            image: "https://www.plonkit.net/images/resize/600/80/ecuador/Bollards-EC.png",
          },
        ],
        note: "Many other bollard shapes appear in Ecuador, but they almost always share this red-and-black colour scheme.",
      },
      {
        code: "pe",
        name: "Peru",
        flag: "🇵🇪",
        sourceUrl: "https://www.plonkit.net/peru",
        variants: [
          {
            id: "pe-triangular",
            label: "Triangular concrete bollard",
            description:
              "Peru mainly uses red or yellow painted, triangular-shaped concrete bollards. Circular concrete variants also appear occasionally.",
            image: "https://www.plonkit.net/images/resize/600/80/peru/1.bollard.png",
          },
          {
            id: "pe-moquegua",
            label: "Moquegua cylindrical bollard",
            description:
              "A cylindrical bollard with a black and yellow stripe at the top, unique to the state of Moquegua in southern Peru.",
            image: "https://www.plonkit.net/images/resize/600/80/peru/2.moqueguabollard.png",
          },
        ],
      },
      {
        code: "uy",
        name: "Uruguay",
        flag: "🇺🇾",
        sourceUrl: "https://www.plonkit.net/uruguay",
        variants: [
          {
            id: "uy-white",
            label: "White bollard / stone barrier",
            description:
              "White bollards, with one side often painted yellow, plus stone barriers, are specific to Uruguay.",
            image: "https://www.plonkit.net/images/resize/600/80/uruguay/Bollards_and_barriers.png",
          },
        ],
      },
      {
        code: "ar",
        name: "Argentina",
        flag: "🇦🇷",
        sourceUrl: "https://www.plonkit.net/argentina",
        variants: [],
      },
      {
        code: "bo",
        name: "Bolivia",
        flag: "🇧🇴",
        sourceUrl: "https://www.plonkit.net/bolivia",
        variants: [],
      },
      {
        code: "br",
        name: "Brazil",
        flag: "🇧🇷",
        sourceUrl: "https://www.plonkit.net/brazil",
        variants: [],
      },
      {
        code: "co",
        name: "Colombia",
        flag: "🇨🇴",
        sourceUrl: "https://www.plonkit.net/colombia",
        variants: [],
      },
    ],
  },
];

export function getMeta(id: string): Meta | undefined {
  return metas.find((m) => m.id === id);
}
