import type { GalleryMeta, CountryEntry, Variant } from "@/data/types";

function pk(slug: string, file: string) {
  return `https://www.plonkit.net/images/resize/600/80/${slug}/${file}`;
}

function v(id: string, label: string, description: string, image: string): Variant {
  return { id, label, description, image };
}

function c(code: string, slug: string, variants: Variant[], note?: string): CountryEntry {
  return { code, sourceUrl: `https://www.plonkit.net/${slug}`, variants, note };
}

export const poles: GalleryMeta = {
  id: "poles",
  kind: "gallery",
  name: "Poles",
  description:
    "Utility pole shape, material and top design vary a lot from country to country. These are the nationally-common types — plenty of countries have extra regional variants beyond these.",
  attribution: "Plonk It",
  attributionUrl: "https://www.plonkit.net/guide",
  countries: [
    // South America
    c("ar", "argentina", [
      v("ar-pole-concrete", "Round concrete pole", "Round concrete poles sustaining three electricity lines in an alternating pattern are very common in Argentina. Doubled-up poles are also a good clue.", pk("argentina", "Argentina_concrete_poles.png")),
      v("ar-pole-wooden", "Wooden A-frame pole", "Wooden poles, with or without a crossbar, are also fairly common. Wooden A-frame poles in South America are only found in Argentina.", pk("argentina", "Argentina_wooden_poles.png")),
    ]),
    c("bo", "bolivia", [
      v("bo-pole", "Concrete or wooden pole", "Round concrete poles (often with small pinholes near the top) and wooden poles are both common. Poles in Bolivia are inconsistent and shouldn't be relied on too heavily.", pk("bolivia", "1_poles.png")),
    ]),
    c("br", "brazil", [
      v("br-pole-ladder", "\"Ladder\" pole", "The most common pole in Brazil resembles a ladder in the bottom portion — rectangular with long segments and small holes near the top.", pk("brazil", "ladders.png")),
      v("br-pole-round", "Round concrete pole", "Round, cylindrical concrete poles are also common, especially across the south of Brazil and São Paulo.", pk("brazil", "Brazil_Round_Poles_2.png")),
    ]),
    c("cl", "chile", [
      v("cl-pole", "Square concrete pole", "Square concrete poles with an indent on both sides, similar to Brazilian poles but with fewer horizontal supports. The upper part typically has small pinholes.", pk("chile", "pole.png")),
    ]),
    c("co", "colombia", [
      v("co-pole", "Striped concrete pole", "Colombian poles are often marked with distinctive black-and-yellow or black-and-orange stripes.", pk("colombia", "Copy_of_Copy_of_Copy_of_Copy_of_Untitled__282_29.png")),
    ], "Colombia is also one of the only Latin American countries (besides Mexico and Ecuador) where octagonal poles appear."),
    c("ec", "ecuador", [
      v("ec-pole-ladder", "\"Ladder\" pole", "Most Ecuadorian poles are generic round concrete, but the ladder pole — with many small indents resembling ladder steps — is more or less unique to Ecuador within Latin America.", pk("ecuador", "Ecua_poles.png")),
    ]),
    c("pe", "peru", [
      v("pe-pole", "Concrete or wooden pole", "Made of concrete or wood, sometimes with distinct horizontal concrete bars (also seen in Argentina).", pk("peru", "Peru_poles.png")),
      v("pe-pole-paint", "Painted-bottom pole", "Some poles have painted bottom sections, most commonly black or black-and-yellow — a pattern fairly unique to Peru within South America.", pk("peru", "Peru_pole_paint.png")),
    ]),
    c("uy", "uruguay", [
      v("uy-pole-trident", "Trident pole", "The most useful Uruguayan pole type — named for its distinctive top with three insulators pointing upwards. Similar poles appear just across the border in Rio Grande do Sul, Brazil.", pk("uruguay", "Trident_pole.png")),
    ]),

    // Latin America
    c("cr", "costa-rica", [
      v("cr-pole-crossbar", "Low crossbar, uneven insulators", "One of the most common pole tops: an even crossbar with uneven insulators (one on one side, two on the other), with the crossbar set further down the pole than usual, and usually a support bar.", pk("costa-rica", "cr_crossbar")),
    ]),
    c("do", "dominican-republic", [
      v("do-pole-square", "Square concrete pole", "Most electricity poles are square and concrete with a reverse \"L\" shape at the top. Within the Americas, only the Dominican Republic, Puerto Rico and Uruguay use square poles.", pk("dominican-republic", "Copy_of_Copy_of_Copy_of_Copy_of_Copy_of_Copy_of_Copy_of_Small_Pin__282_29.png")),
    ]),
    c("gt", "guatemala", [
      v("gt-pole-paint", "Pink/green painted pole", "Very commonly seen painted with either pink, green, or a combination of the two.", pk("guatemala", "gt_polepaint.png")),
    ]),
    c("mx", "mexico", [
      v("mx-pole-octagonal", "Octagonal concrete pole", "Most utility poles in Mexico are concrete and octagonal, often with engravings on the side. Octagonal poles are also common in Colombia.", pk("mexico", "mx_octopole.png")),
    ]),
    c("pa", "panama", [
      v("pa-pole-round", "Round concrete pole", "Panama uses a wide variety of poles, but the most common type is round concrete with a varying number of insulators. Poles can also be wooden or metallic, and often have plates or painted numbers attached.", pk("panama", "8.png")),
    ]),
    { code: "pr", sourceUrl: "https://www.plonkit.net/puerto-rico", variants: [] },

    // Europe
    c("al", "albania", [
      v("al-pole-triangle", "Upside-down triangle pole top", "Pole tops often feature an upside-down triangle shape (also seen in Serbia, Czechia, Slovakia, Romania).", pk("albania", "Upside_triangle_pole_top.png")),
      v("al-pole-bars", "Horizontal-bar pole top", "Simpler pole tops often have horizontal bars instead of the triangle shape.", pk("albania", "Horizontal_bars.png")),
    ]),
    c("ad", "andorra", [
      v("ad-pole-snow", "Wooden snow pole", "Andorran snow poles are made of wood and come in a variety of colours.", pk("andorra", "Untitled_design_2855_29.png")),
    ]),
    c("at", "austria", [
      v("at-pole-wooden", "Round wooden pole", "Round wooden poles are the most common pole type found in Austria.", pk("austria", "Wooden_poles.png")),
      v("at-pole-gas", "Yellow gas pole", "Yellow natural gas poles resembling snow poles are unique to Austria.", pk("austria", "Yellow_gas_poles.png")),
    ]),
    c("be", "belgium", [
      v("be-pole", "Square concrete pole, tiny holes", "Most poles are square concrete with tiny holes running up them and small metal wrappings; a second common type has oval-shaped holes.", pk("belgium", "Belgium_Poles.png")),
    ]),
    c("bg", "bulgaria", [
      v("bg-pole", "Cylindrical concrete pole", "Most utility poles are cylindrical concrete; rarer ladder-style concrete and simple wooden poles also occur.", pk("bulgaria", "Pole_material_and_shape.png")),
      v("bg-pole-top", "Triple-hook pole top", "A pole top with 3 large, alternating upward-facing hook insulators is probably unique to Bulgaria.", pk("bulgaria", "Poletop_3_large_hook.png")),
    ]),
    c("hr", "croatia", [
      v("hr-pole", "Concrete or wood utility pole", "Cylindrical, made of concrete or wood, with wooden ones often showing alternating hook insulators.", pk("croatia", "Croatia_poles.png")),
    ]),
    c("cy", "cyprus", [
      v("cy-pole", "Tall dark wooden pole", "Primarily wooden, tall, and distinctly dark brown — a feature shared with Greek poles.", pk("cyprus", "cy_utilitypole.png")),
      v("cy-pole-top", "Harp-shaped pole top", "Commonly one of three pole tops: a crossbar with insulators, five insulators attached directly to the pole side, or a harp-shaped metal frame.", pk("cyprus", "Cyprus%20Poles.png")),
    ]),
    c("cz", "czechia", [
      v("cz-pole", "Paired round concrete pole", "Czechia and Slovakia most commonly use wide, round concrete poles, often attached in pairs.", pk("czechia", "cz_doublepole.png")),
      v("cz-pole-top", "Trident pole top", "A less common pole top with two arms angled upward; unique to Czechia and Slovakia.", pk("czechia", "cz_poletop3.png")),
    ]),
    c("dk", "denmark", [
      v("dk-pole", "Large towering power pole", "Standard street-level poles are rare in Denmark; countryside electricity infrastructure instead uses large towering overhead lines, often near highways.", pk("denmark", "Large_Poles.png")),
    ]),
    c("ee", "estonia", [
      v("ee-pole-wooden", "Round wooden pole", "The most common Estonian utility pole, sometimes with diagonal supports.", pk("estonia", "Wooden_pole.png")),
      v("ee-pole-concrete", "Square concrete pole", "Fairly common, often with diagonal supports; similar to Lithuania's.", pk("estonia", "Concrete_pole.png")),
    ]),
    c("fi", "finland", [
      v("fi-pole", "Wooden utility pole", "Simple wooden poles with varied pole tops, often with an attached street light.", pk("finland", "Finland_poles.png")),
      v("fi-pole-snow", "Orange snow pole", "A single thin white band near the top, distinguishing it from Norway/Sweden's wider, lower bands.", pk("finland", "Finland_snowpole.png")),
    ]),
    c("fr", "france", [
      v("fr-pole-ladder", "Ladder / \"waffle\" concrete pole", "Concrete poles with step-like indents, nicknamed ladder or waffle poles; also common in Spain.", pk("france", "Ladder_poles.png")),
      v("fr-pole-top", "Diamond \"French\" pole top", "Diamond-shaped pole top with three wires, most often atop ladder poles.", pk("france", "French_poletop.png")),
    ]),
    c("de", "germany", [
      v("de-pole-top", "Common German pole tops", "A wide variety nationally, most commonly a horizontal bar with uneven insulators, triangle tops, or T-shaped tops.", pk("germany", "Some_german_Poletops.png")),
      v("de-pole-sticker", "Wooden pole with white sticker", "Most wooden utility poles feature a small rectangular white sticker.", pk("germany", "White_sticker.png")),
    ]),
    c("gr", "greece", [
      v("gr-pole", "Tall dark wooden pole", "Primarily wooden, often dark brown, and noticeably taller than poles in other countries.", pk("greece", "gr_woodenpole.png")),
      v("gr-pole-top", "Harp-shaped pole top", "A distinctive metal-frame pole top shaped like a harp; unique to Greece and Cyprus.", pk("greece", "gr_poletop.png")),
    ]),
    c("hu", "hungary", [
      v("hu-pole", "Concrete \"holey\" pole", "The most common Hungarian utility pole is concrete with relatively thin holes running all the way to the ground; wooden poles also occur.", pk("hungary", "hu_pole.png")),
    ]),
    c("ie", "ireland", [
      v("ie-pole", "Wooden pole with steps", "Wooden poles with metal step-rods bolted to the side, shared with the UK; a distinct yellow warning sticker helps tell them apart.", pk("ireland", "Utility_poles.png")),
    ]),
    c("it", "italy", [
      v("it-pole-round", "Round concrete pole", "Italy features many round concrete utility poles, unusual for a Mediterranean country.", pk("italy", "it_concretepole.png")),
      v("it-pole-top", "Concrete \"trident\" pole top", "The most common Italian pole tops are concrete, trident-shaped, with two typical insulator configurations.", pk("italy", "it_poletop.png")),
    ]),
    c("lv", "latvia", [
      v("lv-pole-top", "Alternating hook-insulator pole top", "Distinctive pole tops with hook-shaped insulators arranged in an alternating left-right-left pattern, rare in the other Baltic states.", pk("latvia", "Poletop.png")),
    ]),
    c("lt", "lithuania", [
      v("lt-pole", "Square concrete pole, diagonal beam", "Usually square concrete poles, often featuring a diagonal support beam (\"leaner\" pole).", pk("lithuania", "Leaner_poles.png")),
      v("lt-pole-top", "Trident-insulator pole top", "Typical pole tops have short horizontal rods holding insulators, sometimes arranged in a trident shape.", pk("lithuania", "Poletops_Lithuania.png")),
    ]),
    c("lu", "luxembourg", [
      v("lu-pole", "Trident-top pole", "Poles with pole tops shaped like an upside-down trident are the most common type, though other shapes also occur.", pk("luxembourg", "Poletops.png")),
    ]),
    c("me", "montenegro", [
      v("me-pole", "Round concrete or wooden pole", "Montenegro uses simple round concrete or wooden utility poles.", pk("montenegro", "Poles.png")),
    ]),
    c("nl", "netherlands", [
      v("nl-pole", "Street-level poles are absent", "The Netherlands essentially never has street-level utility poles, though larger power-line pylons can appear — Belgium, by contrast, does use utility poles.", pk("netherlands", "Lack_of_utility_poles.png")),
    ]),
    c("mk", "north-macedonia", [
      v("mk-pole", "\"Greek lamp\" on utility pole", "Distinctive \"Greek lamps\" mounted on utility poles are a recognisable feature, also found in Greece and Serbia.", pk("north-macedonia", "Greek-Lamp-FYROM.png")),
    ]),
    c("no", "norway", [
      v("no-pole", "Wooden pole, black cap", "Poles are normally wooden with a small black metal cap on top (also seen in Sweden and Finland).", pk("norway", "no_poles.png")),
      v("no-pole-snow", "Orange snow pole", "A fairly thin white reflector positioned toward the middle of the pole, distinct from Swedish and Finnish snow pole reflector placement.", pk("norway", "no_snowpole.png")),
    ]),
    c("pl", "poland", [
      v("pl-pole", "Holey concrete utility pole", "Thin concrete \"holey poles\" with see-through holes that don't reach the bottom; sometimes joined in pairs/A-frames, plus round concrete poles.", pk("poland", "Poland-poles-comp2.png")),
    ]),
    c("pt", "portugal", [
      v("pt-pole", "Tall ladder concrete pole", "Concrete ladder poles with very tall steps, each with a small see-through hole; taller-stepped than Spain/France equivalents.", pk("portugal", "ladderpole.png")),
    ]),
    c("ro", "romania", [
      v("ro-pole", "Holey concrete pole", "The most common type: holes reach all the way to the bottom, wider and taller than Poland's or Hungary's holey poles.", pk("romania", "ro_holeypole.png")),
      v("ro-pole-round", "Round concrete pole", "Round concrete poles are also common, similar to those in Bulgaria.", pk("romania", "ro_undpoles.png")),
    ]),
    c("ru", "russia", [
      v("ru-pole", "Square concrete pole", "Mainly square concrete utility poles, a style shared with other post-Soviet countries (Ukraine, Kazakhstan, etc.).", pk("russia", "Russian_pole.png")),
    ]),
    c("sm", "san-marino", [
      v("sm-pole", "Round concrete pole", "Like Italy, most utility poles are round concrete; wooden poles also appear.", pk("san-marino", "San_Marino_Poles.png")),
    ]),
    c("sk", "slovakia", [
      v("sk-pole", "Wide round concrete pole, paired", "Wide, round concrete poles, often attached in pairs (shared with Czechia).", pk("slovakia", "sk_doublepole.png")),
      v("sk-pole-top", "Short metal-bar pole top", "Pole tops typically feature short metal bars holding the insulators.", pk("slovakia", "sk_poletops.png")),
    ]),
    c("es", "spain", [
      v("es-pole", "Ladder / wooden pole", "In small towns and rural areas, concrete \"ladder\" poles (with ladder-like indents) and wooden poles are most common.", pk("spain", "Ladder_and_wooden_poles.png")),
      v("es-pole-top", "\"French-style\" pole top", "Upside-down-triangle pole top with a horizontal top bar curved slightly upward, common on tall ladder/steel poles.", pk("spain", "Frenchpoletop_Spain.png")),
    ]),
    c("tr", "turkey", [
      v("tr-pole", "Ladder / mesh metal pole", "Metal poles in either a ladder shape or a mesh pattern are extremely common.", pk("turkey", "tr_pole.png")),
    ]),
    c("ua", "ukraine", [
      v("ua-pole-concrete", "Square concrete pole", "Primarily square concrete poles with varied pole tops, sometimes with white paint at the base; a style shared with Russia/Lithuania.", pk("ukraine", "Square_pole.png")),
      v("ua-pole-wooden", "Wooden pole", "Wooden poles are also found, sometimes with concrete support blocks at the base.", pk("ukraine", "Wooden_pole.png")),
    ]),
    c("gb", "united-kingdom", [
      v("gb-pole", "Wooden pole with pole steps", "Wooden poles with bolted-on pole steps shaped like thin horizontal metal rods.", pk("united-kingdom", "Pole_steps.png")),
      v("gb-pole-crossbar", "Triangular crossbar pole", "Poles occasionally have a metal crossbar near the top with two diagonal supports forming a triangle.", pk("united-kingdom", "Screenshot%20(1128).png")),
    ]),
    c("se", "sweden", [
      v("se-pole", "Wooden utility pole", "Usually wooden with varied pole tops; a small black metal cap on the very top is a Nordic-specific detail.", pk("sweden", "elstolpe.png")),
    ]),

    // Countries researched with no distinctive/documented pole meta
    { code: "pt-az", sourceUrl: "https://www.plonkit.net/azores", variants: [] },
    { code: "by", sourceUrl: "https://www.plonkit.net/belarus", variants: [] },
    { code: "fo", sourceUrl: "https://www.plonkit.net/faroe-islands", variants: [] },
    { code: "gi", sourceUrl: "https://www.plonkit.net/gibraltar", variants: [] },
    { code: "is", sourceUrl: "https://www.plonkit.net/iceland", variants: [] },
    { code: "im", sourceUrl: "https://www.plonkit.net/isle-of-man", variants: [] },
    { code: "je", sourceUrl: "https://www.plonkit.net/jersey", variants: [] },
    { code: "li", sourceUrl: "https://www.plonkit.net/liechtenstein", variants: [] },
    { code: "pt-ma", sourceUrl: "https://www.plonkit.net/madeira", variants: [] },
    { code: "mt", sourceUrl: "https://www.plonkit.net/malta", variants: [] },
    { code: "mc", sourceUrl: "https://www.plonkit.net/monaco", variants: [] },
    { code: "rs", sourceUrl: "https://www.plonkit.net/serbia", variants: [] },
    { code: "si", sourceUrl: "https://www.plonkit.net/slovenia", variants: [] },
    { code: "sj", sourceUrl: "https://www.plonkit.net/svalbard", variants: [] },
    { code: "ch", sourceUrl: "https://www.plonkit.net/switzerland", variants: [] },
  ],
};
