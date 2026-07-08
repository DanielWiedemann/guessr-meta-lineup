import type { GalleryMeta } from "@/data/types";

export const bollards: GalleryMeta = {
  id: "bollards",
  kind: "gallery",
  name: "Bollards",
  description:
    "Roadside bollards vary a lot in shape, colour and reflector style across South America. Scan the lineup below and match it to what you're seeing in-game.",
  attribution: "Plonk It",
  attributionUrl: "https://www.plonkit.net/guide",
  countries: [
    {
      code: "cl",
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
    { code: "ar", sourceUrl: "https://www.plonkit.net/argentina", variants: [] },
    { code: "bo", sourceUrl: "https://www.plonkit.net/bolivia", variants: [] },
    { code: "br", sourceUrl: "https://www.plonkit.net/brazil", variants: [] },
    { code: "co", sourceUrl: "https://www.plonkit.net/colombia", variants: [] },
  ],
};
