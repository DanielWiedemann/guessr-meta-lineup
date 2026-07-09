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

export const bollards: GalleryMeta = {
  id: "bollards",
  kind: "gallery",
  name: "Bollards",
  description:
    "Roadside bollards vary a lot in shape, colour and reflector style. Scan the lineup below and match it to what you're seeing in-game.",
  attribution: "Plonk It",
  attributionUrl: "https://www.plonkit.net/guide",
  countries: [
    // South America
    c("cl", "chile", [
      v("cl-standard", "Standard bollard", "Similar to Spanish-style bollards, with a white reflector at the front and a yellow-orange reflector at the back. Not super common.", pk("chile", "bollard.png")),
      v("cl-temporary", "Temporary bollard", "Regular bollards are fairly rare in Chile, but you may spot this orange, temporary bollard with two white stripes at the top.", pk("chile", "temporary_bollards.png")),
    ]),
    c("ec", "ecuador", [
      v("ec-round", "Round bollard", "Ecuador is one of the few Latin American countries where bollards are very common. Round bollard with two red stripes.", pk("ecuador", "Bollards-EC.png")),
    ], "Many other bollard shapes appear in Ecuador, but they almost always share this red-and-black colour scheme."),
    c("pe", "peru", [
      v("pe-triangular", "Triangular concrete bollard", "Peru mainly uses red or yellow painted, triangular-shaped concrete bollards. Circular concrete variants also appear occasionally.", pk("peru", "1.bollard.png")),
      v("pe-moquegua", "Moquegua cylindrical bollard", "A cylindrical bollard with a black and yellow stripe at the top, unique to the state of Moquegua in southern Peru.", pk("peru", "2.moqueguabollard.png")),
    ]),
    c("uy", "uruguay", [
      v("uy-white", "White bollard / stone barrier", "White bollards, with one side often painted yellow, plus stone barriers, are specific to Uruguay.", pk("uruguay", "Bollards_and_barriers.png")),
    ]),
    { code: "ar", sourceUrl: "https://www.plonkit.net/argentina", variants: [] },
    { code: "bo", sourceUrl: "https://www.plonkit.net/bolivia", variants: [] },
    { code: "br", sourceUrl: "https://www.plonkit.net/brazil", variants: [] },
    { code: "co", sourceUrl: "https://www.plonkit.net/colombia", variants: [] },

    // Latin America
    c("cr", "costa-rica", [
      v("cr-reflector", "Reflector board", "Costa Rica's equivalent of a bollard: vertical orange boards with 3 black circles on them.", pk("costa-rica", "cr_reflectors")),
    ]),
    c("gt", "guatemala", [
      v("gt-striped", "White bollard, black stripes", "Small white bollards with two black stripes, found on Road 1 northeast of Quetzaltenango.", pk("guatemala", "gt_uniquebollardroad.png")),
    ], "Bollards are otherwise rare in Guatemala — this is a specific, localised example rather than a nationwide standard."),
    c("mx", "mexico", [
      v("mx-cylindrical", "Cylindrical bollard, black base", "Small, cylindrical white bollards with a black base are unique to Mexico. A yellow reflector or a flat version can also be seen.", pk("mexico", "mx_bollard.png")),
    ]),
    { code: "do", sourceUrl: "https://www.plonkit.net/dominican-republic", variants: [] },
    { code: "pa", sourceUrl: "https://www.plonkit.net/panama", variants: [] },
    { code: "pr", sourceUrl: "https://www.plonkit.net/puerto-rico", variants: [] },

    // North America
    c("us", "united-states", [
      v("us-nevada", "Nevada thin-post bollard", "A slim post topped with a narrow vertical rectangular reflector that has a white centre and black border.", pk("united-states", "15Nevada_bollard.png")),
      v("us-co-wy", "Colorado/Wyoming metal-post bollard", "A dark metal post whose top extends above a round white reflector rather than stopping at it; in Wyoming the exposed tip is sometimes painted white or grey.", pk("united-states", "Wyoming_Bollard.png")),
      v("us-washington", "Washington twin-square bollard", "A white or brown post with one white rectangular reflector on the front and two smaller white or silver squares on the back.", pk("united-states", "washingtonbollard.png")),
      v("us-utah", "Utah stacked-reflector bollard", "A bollard style unique to Utah that stacks a white square reflector directly above a black rectangular reflector.", pk("united-states", "Utah_bollard.png")),
    ], "The US has dozens of state-specific bollard variants beyond these four — this is a representative, not exhaustive, sample."),
    c("ca", "canada", [
      v("ca-alberta", "Alberta black-and-white cylinder", "A cylindrical roadside post with two black bands separated by a white gap, extremely common at Alberta intersections.", pk("canada", "Alberta_bollard.png")),
      v("ca-bc", "British Columbia thin curved post", "A slim, slightly curved black-and-white bollard found province-wide but especially on Vancouver Island.", pk("canada", "Canada_Map18.png")),
      v("ca-quebec", "Quebec guardrail-mounted post", "Long, thin white posts fixed directly to guardrails, topped with a red or green reflector.", pk("canada", "Quebec_bollard_v2.png")),
      v("ca-ontario", "Ontario diamond marker", "Diamond-shaped delineator markers seen along Ontario roadsides, appearing in a range of colours.", pk("canada", "Untitled_2200_1080_px_1.png")),
    ]),
    { code: "us-ak", sourceUrl: "https://www.plonkit.net/alaska", variants: [] },
    { code: "us-hi", sourceUrl: "https://www.plonkit.net/hawaii", variants: [] },
    { code: "bm", sourceUrl: "https://www.plonkit.net/bermuda", variants: [] },
    { code: "gl", sourceUrl: "https://www.plonkit.net/greenland", variants: [] },
    { code: "mq", sourceUrl: "https://www.plonkit.net/martinique", variants: [] },
    { code: "pm", sourceUrl: "https://www.plonkit.net/saint-pierre-and-miquelon", variants: [] },
    { code: "um", sourceUrl: "https://www.plonkit.net/us-minor-outlying-islands", variants: [] },
    { code: "vi", sourceUrl: "https://www.plonkit.net/us-virgin-islands", variants: [] },

    // Europe
    c("al", "albania", [
      v("al-bollard", "Black-top reflector bollard", "Black top with a red and grey reflector, painted white on the bottom.", pk("albania", "Bollards.png")),
    ]),
    c("ad", "andorra", [
      v("ad-bollard", "Orange reflector bollard", "An orange reflector bollard, occasionally found on main highways — also seen in Spain.", pk("andorra", "bollard.png")),
    ]),
    c("be", "belgium", [
      v("be-bollard", "White/yellow or brown/red-stripe bollard", "White bollards with a yellow rectangular reflector on front and white on back; a second type is dark brown with two red stripes at the top.", pk("belgium", "Belgium_Bollards.png")),
    ]),
    c("bg", "bulgaria", [
      v("bg-bollard", "Red/white reflector bollard", "Bollards are fairly rare in Bulgaria; when seen, they have a generic design with a red reflector on front and white on back.", pk("bulgaria", "Bollard.png")),
    ]),
    c("hr", "croatia", [
      v("hr-bollard", "Triangular white bollard", "White with a black rectangle and red or white reflector, triangular in cross-section with sharper edges than similar Hungarian/Lithuanian bollards.", pk("croatia", "Croatia_bollard.png")),
    ]),
    c("cy", "cyprus", [
      v("cy-bollard", "Triangular red/white bollard", "Resembles Turkish bollards (red front/white back reflector) but triangular with a slanted top rather than flat.", pk("cyprus", "cy_bollard.png")),
    ]),
    c("cz", "czechia", [
      v("cz-bollard", "Orange-reflector bollard", "Orange double reflectors on the front, single white reflector on the back; design shared only with Slovakia.", pk("czechia", "cz_bollard.png")),
    ]),
    c("dk", "denmark", [
      v("dk-bollard", "White bollard, orange stripe", "White with a yellow reflector and a dark orange stripe, unique to Denmark. A green variant also exists.", pk("denmark", "Bollard.png")),
    ]),
    c("ee", "estonia", [
      v("ee-bollard", "Round baton bollard", "Round, baton-like shape with a rectangular front reflector and two circular back reflectors (white or orange).", pk("estonia", "Estonian_bollards.png")),
    ]),
    c("fo", "faroe-islands", [
      v("fo-bollard", "Yellow wooden stick", "Small wooden sticks, mainly painted yellow, sometimes red on top.", pk("faroe-islands", "fo5.png")),
    ]),
    c("fi", "finland", [
      v("fi-bollard", "Black/white diagonal-strip bollard", "Long, black-and-white bollard with a rectangular white front reflector, two back dots, and typically a diagonal black strip.", pk("finland", "Untitled_design6.png")),
    ]),
    c("fr", "france", [
      v("fr-round", "Round, pointed-top bollard", "Round white post with a pointed top and a full reflector band (grey or red).", pk("france", "Bollard.png")),
      v("fr-double-band", "Double-band round bollard", "Round white bollard with two reflective indented bands, unique to France.", pk("france", "Medium_bollard.png")),
    ]),
    c("de", "germany", [
      v("de-bollard", "Black/white reflector bollard", "White/light-grey reflectors (orange near intersections), sometimes with road-number plates or blue side attachments.", pk("germany", "Germany_Bollard_v2.png")),
    ]),
    c("gr", "greece", [
      v("gr-bollard", "Wedge-shaped red/white bollard", "Almost-square reflectors, red on the front and white on the back.", pk("greece", "gr_bollard.png")),
    ]),
    c("hu", "hungary", [
      v("hu-bollard", "Black-and-white wedge bollard", "Wedge-shaped, black-and-white bollard with a red front reflector and white back reflector; blue reflectors also occur.", pk("hungary", "hu_bollard.png")),
    ]),
    c("is", "iceland", [
      v("is-bollard", "Yellow bollard", "A unique yellow bollard with a white reflector, extremely common on rural roads throughout Iceland.", pk("iceland", "Iceland_Bollard.jpg")),
    ]),
    c("ie", "ireland", [
      v("ie-bollard", "Green-and-white bollard", "Green-and-white bollards, useful for distinguishing Ireland from the UK in 50-50 situations.", pk("ireland", "Bollards.png")),
    ]),
    c("im", "isle-of-man", [
      v("im-bollard", "Blue bollard", "Blue bollards commonly found in urban areas of the Isle of Man.", pk("isle-of-man", "bollard.png")),
    ]),
    c("it", "italy", [
      v("it-bollard", "Triangular white/black bollard", "Triangular bollard, white with a black top, red front reflector and white rear reflector; the identical design is used in Albania.", pk("italy", "it_bollard.png")),
    ]),
    c("lv", "latvia", [
      v("lv-bollard", "Thin curved bollard", "Thin, slightly curved bollard with a rectangular front reflector and two circular rear reflectors (white or orange), often numbered.", pk("latvia", "Bollard.png")),
    ]),
    c("li", "liechtenstein", [
      v("li-bollard", "Black/white cylindrical bollard", "Black-and-white cylindrical bollard with a rounded top and white/grey reflector, often with a blue side attachment — nearly identical to Switzerland's.", pk("liechtenstein", "2.png")),
    ]),
    c("lt", "lithuania", [
      v("lt-bollard", "Wedge bollard, orange reflector", "Wedge-shaped bollard with an orange front reflector and white rear reflector (both rectangular); a thinner variant also exists.", pk("lithuania", "Bollard.png")),
    ]),
    c("lu", "luxembourg", [
      v("lu-bollard", "Black-and-white wedge bollard", "Wedge-shaped black-and-white bollards with grey reflectors, some with a distinctive indent in the lower half — nearly identical to German bollards.", pk("luxembourg", "Bollards.png")),
    ]),
    c("pt-ma", "madeira", [
      v("ma-bollard", "Small stone bollard", "Small, unique stone bollards with a red reflector, either cuboidal or cylindrical in shape.", pk("madeira", "stonebollards.png")),
    ]),
    c("me", "montenegro", [
      v("me-bollard", "White bollard, black top", "The most common bollard is white with a red reflector on the front, white reflector on the back, and a black top; also found in Slovenia.", pk("montenegro", "Bollard.png")),
    ]),
    c("nl", "netherlands", [
      v("nl-bollard", "Simple white bollard", "A simple white bollard with a red reflector; rare round French-style bollards with a red band can also occur.", pk("netherlands", "Dutch_bollard.png")),
    ]),
    c("mk", "north-macedonia", [
      v("mk-bollard", "Rounded thin / wedge bollard", "Two types occur: a rounded, very thin one and a wedge-shaped one, both white with red or white reflectors on a black surface.", pk("north-macedonia", "Bollards.png")),
    ]),
    c("no", "norway", [
      v("no-bollard", "Thin, curved rectangular bollard", "Thin, curved rectangular bollards with the reflector set inside a black parallelogram shape.", pk("norway", "no_bollard.png")),
    ]),
    c("pl", "poland", [
      v("pl-bollard", "Red-strip reflector bollard", "A red strip wraps fully around the bollard, with a red front reflector and white back reflector, sometimes numbered.", pk("poland", "Poland-bollard.png")),
    ]),
    c("pt", "portugal", [
      v("pt-bollard", "Wedge or flat white bollard", "Wedge-shaped with a thin white top, or flat with a wide reflector; usually white, occasionally darker orange.", pk("portugal", "bollard.png")),
    ]),
    c("ro", "romania", [
      v("ro-bollard", "Thin white bollard, red strip", "Thin white bollard with a red vertical strip near the top; bollards are relatively rare overall in Romania.", pk("romania", "ro_bollard.png")),
    ]),
    c("ru", "russia", [
      v("ru-bollard", "Assorted reflector bollards", "Three common types: a thin type attached to a stick, one with a black top and red vertical reflector, and a German-style bollard.", pk("russia", "bollards.png")),
    ]),
    c("sm", "san-marino", [
      v("sm-bollard", "Italian-style bollard", "Road signs and bollards are generally identical in design to Italy's.", pk("san-marino", "San_Marino_Italian_infrastructure.png")),
    ]),
    c("rs", "serbia", [
      v("rs-bollard", "Flat bollard, off-centre reflector", "A few designs exist, most with an off-centred reflector and a flat, shallow profile.", pk("serbia", "bollard.png")),
    ]),
    c("sk", "slovakia", [
      v("sk-orange", "Orange double-reflector bollard", "Orange double reflectors on front, single white reflector on back; shared only with Czechia.", pk("slovakia", "sk_bollard.png")),
      v("sk-wedge", "New wedge-shaped bollard", "Newly introduced standard bollard resembling Hungary's wedge shape with a red front reflector; still rare.", pk("slovakia", "sk_newbollard.png")),
    ]),
    c("si", "slovenia", [
      v("si-bollard", "White bollard, black top, red reflector", "White with a black top, bright red front reflector, white back reflector; similar but distinguishable from Austrian/Montenegrin bollards.", pk("slovenia", "si_bollard.png")),
    ]),
    c("es", "spain", [
      v("es-bollard", "Standard Spanish bollard", "Yellow-orange reflector on the front, two white dots on the back (sometimes blank); typically hollow.", pk("spain", "Spain_bollards.png")),
    ]),
    c("se", "sweden", [
      v("se-bollard", "Black-and-white bollard", "Black-and-white with a grey reflector (orange near intersections); shape can be wedge, round, or thin/curved.", pk("sweden", "pollare.png")),
    ]),
    c("ch", "switzerland", [
      v("ch-bollard", "Black-and-white bollard", "Black-and-white with white/grey reflectors, wedge-shaped or rounded cylindrical — Liechtenstein uses nearly identical ones.", pk("switzerland", "ch_bollard.png")),
      v("ch-wooden", "Thick wooden bollard (Valais)", "In canton Valais, thick wooden bollards appear, either square-shaped or cylindrical.", pk("switzerland", "ch_thickwoodenbollard.png")),
    ]),
    c("tr", "turkey", [
      v("tr-bollard", "White rectangular bollard", "Simple rectangular, plain white bollard with a red reflector on the front, thin in profile; a rare yellow version appears in snowy areas.", pk("turkey", "tr_bollard.png")),
    ]),
    c("gb", "united-kingdom", [
      v("gb-standard", "Standard UK bollard", "Rounded shape, red reflector on front, white on back, black base/top with a white middle stripe.", pk("united-kingdom", "Bollard.png")),
      v("gb-scottish", "Scottish red/white bollard", "Round, bulky bollard with a red-and-grey reflector wrapping all the way around; common in Scotland, occasionally elsewhere in the UK.", pk("united-kingdom", "Indicator-template-UK1.png")),
    ]),

    // Countries researched with no distinctive/documented bollard meta
    { code: "at", sourceUrl: "https://www.plonkit.net/austria", variants: [] },
    { code: "pt-az", sourceUrl: "https://www.plonkit.net/azores", variants: [] },
    { code: "by", sourceUrl: "https://www.plonkit.net/belarus", variants: [] },
    { code: "gi", sourceUrl: "https://www.plonkit.net/gibraltar", variants: [] },
    { code: "je", sourceUrl: "https://www.plonkit.net/jersey", variants: [] },
    { code: "mt", sourceUrl: "https://www.plonkit.net/malta", variants: [] },
    { code: "mc", sourceUrl: "https://www.plonkit.net/monaco", variants: [] },
    { code: "sj", sourceUrl: "https://www.plonkit.net/svalbard", variants: [] },
    { code: "ua", sourceUrl: "https://www.plonkit.net/ukraine", variants: [] },
  ],
};
