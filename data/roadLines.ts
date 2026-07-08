import type { GroupedGalleryMeta } from "@/data/types";
import { southAmerica } from "@/data/countries";

function plonkit(country: string, file: string) {
  return `https://www.plonkit.net/images/resize/600/80/${country}/${file}`;
}

const allCodes = southAmerica.map((c) => c.code);

function gap(withCodes: string[]) {
  return allCodes
    .filter((code) => !withCodes.includes(code))
    .map((code) => ({ code, variants: [] }));
}

export const roadLines: GroupedGalleryMeta = {
  id: "roadLines",
  kind: "grouped-gallery",
  name: "Road lines",
  description:
    "Road line colour patterns and chevron colour schemes are both documented by Plonk It for several South American countries — not every country has a distinctive one of each.",
  attribution: "Plonk It",
  attributionUrl: "https://www.plonkit.net/guide",
  groups: [
    {
      id: "lines",
      label: "Road lines",
      countries: [
        {
          code: "ar",
          sourceUrl: "https://www.plonkit.net/argentina",
          variants: [
            {
              id: "ar-lines",
              label: "Dashed white / double yellow",
              description: "Mainly dashed white, double yellow, or a mix in between.",
              image: plonkit("argentina", "Argentina_roadlines.png"),
            },
          ],
        },
        {
          code: "bo",
          sourceUrl: "https://www.plonkit.net/bolivia",
          variants: [
            {
              id: "bo-lines",
              label: "Mixed middle line",
              description:
                "Middle lines can be all-yellow, yellow-and-white, or all-white, while outer lines are always white.",
              image: plonkit("bolivia", "1_roadlines.png"),
            },
          ],
        },
        {
          code: "br",
          sourceUrl: "https://www.plonkit.net/brazil",
          variants: [
            {
              id: "br-lines",
              label: "Double yellow middle",
              description:
                "Usually double yellow middle lines with white outer lines. Roads can occasionally have a single dashed yellow line.",
              image: plonkit("brazil", "doubleyellow.png"),
            },
          ],
        },
        {
          code: "cl",
          sourceUrl: "https://www.plonkit.net/chile",
          variants: [
            {
              id: "cl-lines",
              label: "All white or all yellow",
              description:
                "Either all white (most common) or all yellow (national parks / high snowfall). Almost never a mix of the two — a good clue within the Americas.",
              image: plonkit("chile", "road_lines.png"),
            },
          ],
        },
        {
          code: "pe",
          sourceUrl: "https://www.plonkit.net/peru",
          variants: [
            {
              id: "pe-lines",
              label: "White outer, yellow middle",
              description:
                "Outer lines are always white. Highways have single dashed or double yellow middle lines; rural mountain roads often have white outer lines with no middle line at all.",
              image: plonkit("peru", "1.roadlines.png"),
            },
          ],
        },
        {
          code: "uy",
          sourceUrl: "https://www.plonkit.net/uruguay",
          variants: [
            {
              id: "uy-lines",
              label: "Triple road lines",
              description:
                "Often has triple road lines — double yellow with white dashes in between — a design not seen anywhere else in the Americas.",
              image: plonkit("uruguay", "Triple_road_lines.png"),
            },
          ],
        },
        ...gap(["ar", "bo", "br", "cl", "pe", "uy"]),
      ],
    },
    {
      id: "chevrons",
      label: "Chevrons",
      countries: [
        {
          code: "ar",
          sourceUrl: "https://www.plonkit.net/argentina",
          variants: [
            {
              id: "ar-chevron",
              label: "White base, red arrow",
              description:
                "Typically white-and-red chevrons — Argentina is the only American country with this colour scheme.",
              image: plonkit("argentina", "ar_chevron.png"),
            },
          ],
        },
        {
          code: "br",
          sourceUrl: "https://www.plonkit.net/brazil",
          variants: [
            {
              id: "br-chevron",
              label: "Black base, yellow arrow",
              description:
                "Yellow-on-black chevrons, the opposite of most of South America, which uses black-on-yellow.",
              image: plonkit("brazil", "Untitled_design32.png"),
            },
          ],
        },
        {
          code: "cl",
          sourceUrl: "https://www.plonkit.net/chile",
          variants: [
            {
              id: "cl-chevron",
              label: "Yellow base, black arrow",
              description: "Chevrons with a yellow base and black arrows.",
              image: plonkit("chile", "Chile%20Chevron.png"),
            },
          ],
        },
        {
          code: "ec",
          sourceUrl: "https://www.plonkit.net/ecuador",
          variants: [
            {
              id: "ec-chevron",
              label: "\"Chevron spam\"",
              description:
                "Standard yellow/black colouring, but Ecuador uses far more chevrons per curve (\"chevron spam\") than most other Latin American countries.",
              image: plonkit("ecuador", "Chevron_spam2.png"),
            },
          ],
        },
        {
          code: "uy",
          sourceUrl: "https://www.plonkit.net/uruguay",
          variants: [
            {
              id: "uy-chevron",
              label: "Yellow base, black arrow",
              description:
                "Yellow with black arrows, like most of Latin America — mainly useful to rule out neighbouring Argentina's white/red chevrons.",
              image: plonkit("uruguay", "Chevron.png"),
            },
          ],
        },
        ...gap(["ar", "br", "cl", "ec", "uy"]),
      ],
    },
  ],
};
