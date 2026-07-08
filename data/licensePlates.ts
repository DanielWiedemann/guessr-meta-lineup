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

export const licensePlates: GalleryMeta = {
  id: "licensePlates",
  kind: "gallery",
  name: "License plates",
  description:
    "Plate colour and format is one of the most reliable clues — most countries here have a distinct look.",
  attribution: "Plonk It",
  attributionUrl: "https://www.plonkit.net/guide",
  countries: [
    // South America
    c("ar", "argentina", [
      v("ar-plate", "Black or white plate", "Two types: a black plate with a black dot in the middle, and a white plate with a blue bar at the top.", pk("argentina", "Argentina_License_Plate.png")),
    ]),
    c("bo", "bolivia", [
      v("bo-plate", "White plate, blue text", "Short, white plates with blue text. The blue text can be hard to see through the blur, so plates may appear plain white.", pk("bolivia", "1_licenceplate.png")),
    ]),
    c("br", "brazil", [
      v("br-plate", "White plate, blue stripe", "White until 2018; now a white plate with a blue stripe on top. Red is still used for commercial vehicles.", pk("brazil", "Brazil_License_Plate.png")),
    ]),
    c("cl", "chile", [
      v("cl-plate", "White plate, orange commercial", "Regular vehicles have white plates, while commercial and taxi vehicles have orange plates.", pk("chile", "Chile_License_Plate.png")),
    ]),
    c("co", "colombia", [
      v("co-plate", "Yellow plate", "Typically yellow — within South America, yellow plates are almost exclusively found in Colombia.", pk("colombia", "Colombia_License_Plate.png")),
    ]),
    c("ec", "ecuador", [
      v("ec-plate", "White plate, short or long", "White, in a mix of short and long sizes — the only Latin American country to mix both. Commercial/taxi plates are orange.", pk("ecuador", "Ecuador_License_Plate.png")),
    ]),
    c("pe", "peru", [
      v("pe-plate", "White or yellow plate", "White or (less commonly) yellow. Taxis typically use plates that are yellow on top and white on the bottom.", pk("peru", "Peru_License_Plate.png")),
    ]),
    c("uy", "uruguay", [
      v("uy-plate", "White plate, black text", "Plain white with black characters — no dot or coloured bar like neighbouring Argentina.", pk("uruguay", "Uruguay_License_Plate.png")),
    ]),

    // Latin America
    c("cr", "costa-rica", [
      v("cr-plate", "White plate, blue text", "Typically short and white with blue text, which gives them a light blue tint through the blur.", pk("costa-rica", "cr_licence_plate_new.png")),
    ]),
    c("do", "dominican-republic", [
      v("do-plate", "Yellow top, white bottom", "Somewhat reminiscent of New Jersey plates — pale yellow at the top and white at the bottom. Front plates are not required.", pk("dominican-republic", "Dominican_Republic_License_Plate.png")),
    ]),
    c("gt", "guatemala", [
      v("gt-plate", "Short plate, blue/green tinge", "Short license plates which, when blurred, typically show either a blue tinge or a hint of green on the left side.", pk("guatemala", "gt_licenceplate.png")),
    ]),
    c("mx", "mexico", [
      v("mx-plate", "Short plate, regional designs", "Short plates with a large variety of state-specific designs. Front plates are required.", pk("mexico", "mx_licenceplate.png")),
    ]),
    c("pa", "panama", [
      v("pa-plate", "White plate, turquoise stripe", "Short plates, most commonly white with a horizontal turquoise stripe on top. Front plates are not required.", pk("panama", "2.png")),
    ]),
    { code: "pr", sourceUrl: "https://www.plonkit.net/puerto-rico", variants: [] },

    // Europe
    c("al", "albania", [
      v("al-plate", "Red or blue strip plate", "Blue strips on both sides, or a single red strip on the left side — Albania is the only European country with red on the left.", pk("albania", "albania_plate.png")),
    ]),
    c("ad", "andorra", [
      v("ad-plate", "Orange dot plate", "An orange dot on the left side, unique within Europe.", pk("andorra", "Andorra_License_Plate.png")),
    ]),
    c("at", "austria", [
      v("at-plate", "White plate, blue EU strip", "Long white plates with the standard blue EU strip on the left.", pk("austria", "Plates.png")),
    ]),
    c("be", "belgium", [
      v("be-plate", "Red-text plate", "Belgian plates use red text, a distinct colour recognisable even through the blur.", pk("belgium", "Belgium_License_Plate.png")),
    ]),
    c("bg", "bulgaria", [
      v("bg-plate", "Standard EU plate", "Follows the typical European design with a blue strip on the left.", pk("bulgaria", "Registation_plates.png")),
    ]),
    c("hr", "croatia", [
      v("hr-plate", "White plate, optional blue strip", "Long and white; some have a blue strip on the left while others are fully white.", pk("croatia", "Croatia_License_Plate.png")),
    ]),
    c("cy", "cyprus", [
      v("cy-plate", "Mixed EU/UK-style plates", "Both standard white EU-style plates and UK-style plates with yellow rear plates are used; rental cars use a distinct red plate.", pk("cyprus", "Cyprus%20License%20Plates.jpg")),
    ]),
    c("dk", "denmark", [
      v("dk-plate", "Standard / \"parrot\" plate", "Long white plates with a blue left strip; yellow commercial plates; a distinctive \"parrot\" plate with a yellow left section is unique to Denmark.", pk("denmark", "Denmark_License_Plate.png")),
    ]),
    c("ee", "estonia", [
      v("ee-plate", "Standard EU white plate", "Long white plate with the standard blue European strip on the left.", pk("estonia", "Estonia_License_Plate.png")),
    ]),
    c("fi", "finland", [
      v("fi-plate", "Short white EU plate", "A shorter-than-normal white plate with the standard EU blue strip.", pk("finland", "Finland_License_Plate.png")),
    ]),
    c("fr", "france", [
      v("fr-plate", "Dual blue-strip plate", "Long white plate with blue strips on both sides (left more visible); rare older plates have a yellow rear with no right strip.", pk("france", "1_licenceplate2.png")),
    ]),
    c("de", "germany", [], "No dedicated license plate close-up documented on Plonk It for Germany."),
    c("gi", "gibraltar", [
      v("gi-plate", "White front, yellow back plate", "Like the UK, white front plates and yellow back plates.", pk("gibraltar", "Back_plates.png")),
    ]),
    c("gr", "greece", [
      v("gr-plate", "White EU / yellow taxi plate", "All-white or standard EU design with a blue left strip; taxis use yellow plates.", pk("greece", "gr_licenceplate.png")),
    ]),
    c("hu", "hungary", [
      v("hu-plate", "Long white plate, coat of arms", "Long white standard European plate; since July 2022 a new format includes the coat of arms. Taxi plates are yellow, EVs are green.", pk("hungary", "Hungary_License_Plate.png")),
    ]),
    c("is", "iceland", [
      v("is-plate", "White plate, blue characters", "Fully white plate with blue characters and no blue European strip on the left, unlike most of Europe.", pk("iceland", "k7XBOxn.png")),
    ]),
    c("ie", "ireland", [
      v("ie-plate", "White plate, blue strip", "Long white plate with the standard European blue strip on the left — the white backplate distinguishes it from the UK's yellow rear plates.", pk("ireland", "ireland_plate.png")),
    ]),
    c("im", "isle-of-man", [
      v("im-plate", "White front, yellow rear, red strip", "Follows the UK model (white front / yellow rear plate) but with a distinguishing red strip on the left instead of a blue one.", pk("isle-of-man", "IOM_Plate.png")),
    ]),
    c("it", "italy", [
      v("it-plate", "Two blue strips, short front plate", "Blue strips on both sides and a notably short front plate — a combination unique in Europe.", pk("italy", "it_licenceplate.png")),
    ]),
    c("je", "jersey", [
      v("je-plate", "White front, yellow rear, coat of arms", "Follows the British model with the island's red coat of arms and a leading \"J\" on unblurred plates; no blue EU strip since Jersey was never in the EU.", pk("jersey", "Jersey_License_Plate.png")),
    ]),
    c("lv", "latvia", [
      v("lv-plate", "Long white plate, blue strip", "Long white plate with the standard blue European strip on the left.", pk("latvia", "Latvia_License_Plate.png")),
    ]),
    c("li", "liechtenstein", [
      v("li-plate", "Black plate, yellow-red emblem", "Black plates with white lettering and a yellow-and-red emblem on the left; they appear grey when blurred.", pk("liechtenstein", "Liechtenstein_plates.png")),
    ]),
    c("lt", "lithuania", [
      v("lt-plate", "Long white plate, blue strip", "Long white plate with the standard blue European strip on the left.", pk("lithuania", "Lithuania_License_Plate.png")),
    ]),
    c("lu", "luxembourg", [
      v("lu-plate", "Yellow plate, blue strip", "Long yellow plates with a blue strip on the left; foreign white-plated cars are also fairly common since Luxembourg is small.", pk("luxembourg", "Luxembourg_License_Plate.png")),
    ]),
    c("mt", "malta", [
      v("mt-plate", "Short plate, blue strip", "The standard European blue strip on the left, but unlike most of Europe, short plates are very common.", pk("malta", "mt_licenceplate.png")),
    ]),
    c("mc", "monaco", [
      v("mc-plate", "Short plate, no blue strip", "Short and lacking the blue strip; normal French plates (sometimes an old yellow-back style) are also commonly seen.", pk("monaco", "Monaco_Licence_Plate.png")),
    ]),
    c("me", "montenegro", [
      v("me-plate", "Blue strip, red circle coat of arms", "A standard European plate with a blue strip and the Montenegro coat of arms on a red circle, visible through the blur (unlike Albania's plates, which lack the red circle).", pk("montenegro", "Montenegro_Licence_Plate.png")),
    ]),
    c("nl", "netherlands", [
      v("nl-plate", "Long yellow plate, blue strip", "Long yellow plates with the standard European blue strip on the left; taxis have blue plates.", pk("netherlands", "Netherlands_plate.png")),
    ]),
    c("mk", "north-macedonia", [
      v("mk-plate", "White plate, red block", "White plates, sometimes with a blue strip, featuring a noticeable red block near the left side.", pk("north-macedonia", "North_Macedonia_License_Plate.png")),
    ]),
    c("no", "norway", [
      v("no-plate", "White plate, green commercial", "Long white plates with the standard European strip; commercial vans commonly use green plates, a distinctly Norwegian feature in Europe.", pk("norway", "no_licenceplate.png")),
    ]),
    c("pl", "poland", [], "No dedicated license plate close-up documented on Plonk It for Poland."),
    c("pt", "portugal", [], "No dedicated license plate close-up documented on Plonk It for Portugal."),
    c("ro", "romania", [], "No dedicated license plate close-up documented on Plonk It for Romania."),
    c("ru", "russia", [
      v("ru-plate", "White plate, black text", "Fully white with black text and no blue strip, unlike most European plates.", pk("russia", "licenceplate.png")),
    ]),
    c("sm", "san-marino", [
      v("sm-plate", "Short white plate, blue text", "Short white plates with blue lettering, notably shorter than most European plates.", pk("san-marino", "San_Marino_License_Plate.png")),
    ]),
    c("rs", "serbia", [
      v("rs-plate", "White plate, blue strip", "White with a blue strip on the left; agricultural vehicle plates are green.", pk("serbia", "Serbia_Plate.png")),
    ]),
    c("sk", "slovakia", [], "No dedicated license plate close-up documented on Plonk It for Slovakia."),
    c("si", "slovenia", [], "No dedicated license plate close-up documented on Plonk It for Slovenia."),
    c("es", "spain", [
      v("es-plate", "Standard Spanish plate", "Long white EU-style plate with a single blue strip on the left (vs. Portugal's yellow strip on the right, Italy's two blue strips).", pk("spain", "Spain_License_Plate.png")),
    ]),
    c("sj", "svalbard", [
      v("sj-plate", "Black/yellow Svalbard plate", "Plates in Svalbard are generally black with yellow text, distinct from mainland Norway.", pk("svalbard", "svalbard_licenceplate.png")),
    ]),
    c("se", "sweden", [
      v("se-plate", "Standard Swedish plate", "Long, white plate with the standard blue EU strip on the left; taxi plates have a yellow background instead of white.", pk("sweden", "Sweden_License_Plate.png")),
    ]),
    c("ch", "switzerland", [
      v("ch-plate", "Fully white Swiss plate", "Fully white, lacking the EU blue strip; front plates are extremely short compared to most of Europe.", pk("switzerland", "Switzerland_License_Plate.png")),
    ]),
    c("tr", "turkey", [
      v("tr-plate", "Standard EU-style plate", "Long, white plate with a blue strip on the left, the same style as most of Europe.", pk("turkey", "tr_licenceplate.png")),
    ]),
    c("ua", "ukraine", [
      v("ua-plate", "Blue/yellow strip plate", "Long white plate with a distinctive blue-and-yellow strip on the left (flag colours); older plates can have faded colours.", pk("ukraine", "Ukraine_License_Plate.png")),
    ]),
    c("gb", "united-kingdom", [
      v("gb-plate", "White front / yellow rear plate", "Front plates are white, rear plates yellow; some have a blue left strip (most don't), and Zero-Emission plates get a green strip.", pk("united-kingdom", "United_Kingdom_License_Plate.png")),
    ]),

    // Researched, but no meta documented at all (bollards/poles/plates/lines/signs)
    { code: "pt-az", sourceUrl: "https://www.plonkit.net/azores", variants: [] },
    { code: "by", sourceUrl: "https://www.plonkit.net/belarus", variants: [] },
    { code: "fo", sourceUrl: "https://www.plonkit.net/faroe-islands", variants: [] },
    { code: "pt-ma", sourceUrl: "https://www.plonkit.net/madeira", variants: [] },
  ],
};
