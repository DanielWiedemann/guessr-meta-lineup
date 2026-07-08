import type { GalleryMeta } from "@/data/types";

function plonkit(country: string, file: string) {
  return `https://www.plonkit.net/images/resize/600/80/${country}/${file}`;
}

export const licensePlates: GalleryMeta = {
  id: "licensePlates",
  kind: "gallery",
  name: "License plates",
  description:
    "Plate colour and format is one of the most reliable clues in South America — every country here has a distinct look.",
  attribution: "Plonk It",
  attributionUrl: "https://www.plonkit.net/guide",
  countries: [
    {
      code: "ar",
      sourceUrl: "https://www.plonkit.net/argentina",
      variants: [
        {
          id: "ar-plate",
          label: "Black or white plate",
          description:
            "Two types: a black plate with a black dot in the middle, and a white plate with a blue bar at the top.",
          image: plonkit("argentina", "Argentina_License_Plate.png"),
        },
      ],
    },
    {
      code: "bo",
      sourceUrl: "https://www.plonkit.net/bolivia",
      variants: [
        {
          id: "bo-plate",
          label: "White plate, blue text",
          description:
            "Short, white plates with blue text. The blue text can be hard to see through the blur, so plates may appear plain white.",
          image: plonkit("bolivia", "1_licenceplate.png"),
        },
      ],
    },
    {
      code: "br",
      sourceUrl: "https://www.plonkit.net/brazil",
      variants: [
        {
          id: "br-plate",
          label: "White plate, blue stripe",
          description:
            "White until 2018; now a white plate with a blue stripe on top. Red is still used for commercial vehicles.",
          image: plonkit("brazil", "Brazil_License_Plate.png"),
        },
      ],
    },
    {
      code: "cl",
      sourceUrl: "https://www.plonkit.net/chile",
      variants: [
        {
          id: "cl-plate",
          label: "White plate, orange commercial",
          description:
            "Regular vehicles have white plates, while commercial and taxi vehicles have orange plates.",
          image: plonkit("chile", "Chile_License_Plate.png"),
        },
      ],
    },
    {
      code: "co",
      sourceUrl: "https://www.plonkit.net/colombia",
      variants: [
        {
          id: "co-plate",
          label: "Yellow plate",
          description:
            "Typically yellow — within South America, yellow plates are almost exclusively found in Colombia.",
          image: plonkit("colombia", "Colombia_License_Plate.png"),
        },
      ],
    },
    {
      code: "ec",
      sourceUrl: "https://www.plonkit.net/ecuador",
      variants: [
        {
          id: "ec-plate",
          label: "White plate, short or long",
          description:
            "White, in a mix of short and long sizes — the only Latin American country to mix both. Commercial/taxi plates are orange.",
          image: plonkit("ecuador", "Ecuador_License_Plate.png"),
        },
      ],
    },
    {
      code: "pe",
      sourceUrl: "https://www.plonkit.net/peru",
      variants: [
        {
          id: "pe-plate",
          label: "White or yellow plate",
          description:
            "White or (less commonly) yellow. Taxis typically use plates that are yellow on top and white on the bottom.",
          image: plonkit("peru", "Peru_License_Plate.png"),
        },
      ],
    },
    {
      code: "uy",
      sourceUrl: "https://www.plonkit.net/uruguay",
      variants: [
        {
          id: "uy-plate",
          label: "White plate, black text",
          description:
            "Plain white with black characters — no dot or coloured bar like neighbouring Argentina.",
          image: plonkit("uruguay", "Uruguay_License_Plate.png"),
        },
      ],
    },
  ],
};
