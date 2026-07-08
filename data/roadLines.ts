import type { GroupedGalleryMeta, CountryEntry, Variant } from "@/data/types";

function pk(slug: string, file: string) {
  return `https://www.plonkit.net/images/resize/600/80/${slug}/${file}`;
}

function v(id: string, label: string, description: string, image: string): Variant {
  return { id, label, description, image };
}

function c(code: string, slug: string, variants: Variant[], note?: string): CountryEntry {
  return { code, sourceUrl: `https://www.plonkit.net/${slug}`, variants, note };
}

function gap(code: string, slug: string): CountryEntry {
  return { code, sourceUrl: `https://www.plonkit.net/${slug}`, variants: [] };
}

export const roadLines: GroupedGalleryMeta = {
  id: "roadLines",
  kind: "grouped-gallery",
  name: "Road lines",
  description:
    "Road line colour patterns and chevron colour schemes are both documented by Plonk It for many countries — not every country has a distinctive one of each.",
  attribution: "Plonk It",
  attributionUrl: "https://www.plonkit.net/guide",
  groups: [
    {
      id: "lines",
      label: "Road lines",
      countries: [
        // South America
        c("ar", "argentina", [
          v("ar-lines", "Dashed white / double yellow", "Mainly dashed white, double yellow, or a mix in between.", pk("argentina", "Argentina_roadlines.png")),
        ]),
        c("bo", "bolivia", [
          v("bo-lines", "Mixed middle line", "Middle lines can be all-yellow, yellow-and-white, or all-white, while outer lines are always white.", pk("bolivia", "1_roadlines.png")),
        ]),
        c("br", "brazil", [
          v("br-lines", "Double yellow middle", "Usually double yellow middle lines with white outer lines. Roads can occasionally have a single dashed yellow line.", pk("brazil", "doubleyellow.png")),
        ]),
        c("cl", "chile", [
          v("cl-lines", "All white or all yellow", "Either all white (most common) or all yellow (national parks / high snowfall). Almost never a mix of the two — a good clue within the Americas.", pk("chile", "road_lines.png")),
        ]),
        c("pe", "peru", [
          v("pe-lines", "White outer, yellow middle", "Outer lines are always white. Highways have single dashed or double yellow middle lines; rural mountain roads often have white outer lines with no middle line at all.", pk("peru", "1.roadlines.png")),
        ]),
        c("uy", "uruguay", [
          v("uy-lines", "Triple road lines", "Often has triple road lines — double yellow with white dashes in between — a design not seen anywhere else in the Americas.", pk("uruguay", "Triple_road_lines.png")),
        ]),
        gap("co", "colombia"),
        gap("ec", "ecuador"),

        // Latin America
        c("gt", "guatemala", [
          v("gt-lines", "White outer, thin yellow middle", "Solid white outer lines with a single yellow middle line, similar to Mexico but noticeably thinner.", pk("guatemala", "gt_roadlines.png")),
        ]),
        c("mx", "mexico", [
          v("mx-lines", "White outer, solid yellow middle", "The most typical pattern: solid white outer lines with a single unbroken yellow middle line. Broken or double-yellow middle lines are also common.", pk("mexico", "mx_roadlines.png")),
        ]),
        c("pa", "panama", [
          v("pa-lines", "White outer, no middle line", "A diverse set of road lines, but solid outer white lines with no middle line at all are almost unique to Panama within Latin America.", pk("panama", "7.png")),
        ]),
        gap("cr", "costa-rica"),
        gap("do", "dominican-republic"),
        gap("pr", "puerto-rico"),

        // Europe
        c("be", "belgium", [
          v("be-lines", "All-white lines", "All-white road lines, which can be continuous or broken, often paired with bike lanes on both sides.", pk("belgium", "be_white_lines.webp")),
        ]),
        c("dk", "denmark", [
          v("dk-lines", "Double white middle line", "All-white road lines; double middle lines are very common (also seen in Poland/Greece).", pk("denmark", "Road_Lines.png")),
          v("dk-lines-outer", "Blocky, gapped outer line", "Outer lines are often made of small white squares — a unique, useful identifier.", pk("denmark", "Blocky_Gapped_Outside_Road_Lines.png")),
        ]),
        c("ee", "estonia", [
          v("ee-lines", "Dashed outer line", "Outer lines sometimes consist of short dashes (occasionally also Lithuania, primarily Sweden).", pk("estonia", "Road_lines.png")),
        ]),
        c("fi", "finland", [
          v("fi-lines", "Solid white outer line", "Outer lines are always solid white where present, unlike dashed lines in Sweden/Norway.", pk("finland", "2022-12-21__2813_29.png")),
          v("fi-lines-middle", "Varied middle line types", "White dashes, solid yellow with white dashes, or double yellow; yellow is increasingly rare in newer coverage.", pk("finland", "Finland_road_lines_comp_2.png")),
        ]),
        c("fr", "france", [
          v("fr-lines", "Offset double-block middle line", "Middle line dashes made of two offset blocks — unique to France and a safe national identifier.", pk("france", "Middle_Z_line.png")),
        ]),
        c("gr", "greece", [
          v("gr-lines", "Yellow road lines", "Yellow road lines are more common in Greece than any other southern European country.", pk("greece", "gr_yellowroadlines.png")),
        ]),
        c("hu", "hungary", [
          v("hu-lines", "All-white, yellow bike lanes", "Hungarian road lines are all-white, but lines marking bicycle lanes are typically yellow.", pk("hungary", "hu_bicyclelanelines.png")),
        ]),
        c("is", "iceland", [
          v("is-lines", "All-white lines", "Iceland has all-white road lines only (no yellow); outer lines can be solid or, rarely, dashed.", pk("iceland", "Screenshot__281165_29.png")),
        ]),
        c("ie", "ireland", [
          v("ie-lines", "Double yellow no-parking lines", "Double yellow lines along road edges in urban areas indicate no-parking zones; common in Ireland/UK, rare elsewhere in Europe (except Malta).", pk("ireland", "Double_yellow_lines.png")),
        ]),
        c("it", "italy", [
          v("it-lines", "White solid outer, no middle line", "A common Italian pattern is a white solid outer line with no middle line, less common elsewhere in the Mediterranean.", pk("italy", "it_roadlines.png")),
        ]),
        c("je", "jersey", [
          v("je-lines", "Yellow give-way lines", "Jersey uses yellow give-way lines at intersections, versus the UK's double dotted white lines for the same purpose.", pk("jersey", "Yellow_give_way_lines.png")),
        ]),
        c("mt", "malta", [
          v("mt-lines", "Double yellow no-parking line", "Distinctive double yellow no-parking lines, similar to the UK and Ireland.", pk("malta", "mt_doubleyellowline.png")),
        ]),
        c("nl", "netherlands", [
          v("nl-lines", "All-white, dashed outer lines", "Like most of Europe, all-white road lines, often with dashed outside lines, and occasionally unique green middle lines.", pk("netherlands", "Road_lines.png")),
        ]),
        c("no", "norway", [
          v("no-lines", "Dashed white / orange-yellow middle", "Smaller roads have long dashed white outer lines; larger roads have solid outer lines and yellow (orange-tinged) middle lines.", pk("norway", "no_roadlines.png")),
        ]),
        c("pl", "poland", [
          v("pl-lines", "All-white, double middle lines", "Poland uses all-white road lines; double middle lines are especially common and a useful clue.", pk("poland", "Poland-road-lines.png")),
        ]),
        c("ro", "romania", [
          v("ro-lines", "Thick middle lines", "Middle lines are often noticeably thicker than average, distinguishing Romania from Bulgaria's thinner lines.", pk("romania", "ro_road_lines.png")),
        ]),
        c("es", "spain", [
          v("es-lines", "Dashed outer lines", "Rural roads sometimes have dashed outer lines, helping distinguish Spain from Portugal/Italy where these are rare.", pk("spain", "Dashed_road_lines.png")),
        ]),
        c("se", "sweden", [
          v("se-lines", "Dashed lines (small roads)", "On smaller roads, white dashed outer lines that are distinctly shorter than Norway's; all lines are white (unlike Norway/Finland).", pk("sweden", "vaglinje_liten.png")),
          v("se-lines-highway", "Sectioned solid lines (highways)", "Highway outer lines look solid from a distance but are divided into small sections in a pattern unique versus Finland/Norway.", pk("sweden", "vaglinje_motorvag.png")),
        ]),
        c("ch", "switzerland", [
          v("ch-lines", "Long dashed yellow lines", "Long dashed yellow road lines are a good clue for Switzerland (also found in Liechtenstein).", pk("switzerland", "Screenshot__28505_29.png")),
        ]),
        c("tr", "turkey", [
          v("tr-lines", "White / yellow line mix", "Road line colour is inconsistent — mostly white, but yellow-only or mixed yellow/white lines are also common.", pk("turkey", "tr_roadlines.png")),
        ]),
        c("gb", "united-kingdom", [
          v("gb-lines", "Double yellow lines", "Double yellow lines at road edges (often urban) indicate a no-stopping zone; also found in Ireland.", pk("united-kingdom", "Kopie_van_Magnifying_Effect_10.png")),
          v("gb-lines-cats-eye", "Cat's-eye dashed centre line", "Middle line made of long dashes with \"cat's eye\" reflectors set in the gaps — a strong UK indicator.", pk("united-kingdom", "Cats_eyes_dashes2.png")),
        ]),
      ],
    },
    {
      id: "chevrons",
      label: "Chevrons",
      countries: [
        // South America
        c("ar", "argentina", [
          v("ar-chevron", "White base, red arrow", "Typically white-and-red chevrons — Argentina is the only American country with this colour scheme.", pk("argentina", "ar_chevron.png")),
        ]),
        c("br", "brazil", [
          v("br-chevron", "Black base, yellow arrow", "Yellow-on-black chevrons, the opposite of most of South America, which uses black-on-yellow.", pk("brazil", "Untitled_design32.png")),
        ]),
        c("cl", "chile", [
          v("cl-chevron", "Yellow base, black arrow", "Chevrons with a yellow base and black arrows.", pk("chile", "Chile%20Chevron.png")),
        ]),
        c("ec", "ecuador", [
          v("ec-chevron", "\"Chevron spam\"", "Standard yellow/black colouring, but Ecuador uses far more chevrons per curve (\"chevron spam\") than most other Latin American countries.", pk("ecuador", "Chevron_spam2.png")),
        ]),
        c("uy", "uruguay", [
          v("uy-chevron", "Yellow base, black arrow", "Yellow with black arrows, like most of Latin America — mainly useful to rule out neighbouring Argentina's white/red chevrons.", pk("uruguay", "Chevron.png")),
        ]),
        gap("bo", "bolivia"),
        gap("co", "colombia"),
        gap("pe", "peru"),

        // Europe
        c("al", "albania", [
          v("al-chevron", "White on black", "White chevrons on black; also used by Italy, Greece, and Spain in southern Europe.", pk("albania", "Chevron.png")),
        ]),
        c("at", "austria", [
          v("at-chevron", "White-on-red / red-on-yellow", "Two colour schemes are used: white on red, and red on yellow (Germany mostly uses red on white).", pk("austria", "Chevrons.png")),
        ]),
        c("be", "belgium", [
          v("be-chevron", "White chevron, red arrow", "White chevrons with a red arrow, also used in the Netherlands but not seen in France.", pk("belgium", "Ontwerp_zonder_titel_3.png")),
        ]),
        c("bg", "bulgaria", [
          v("bg-chevron", "Red on white", "Typically red on white, shared with neighbours Romania, Turkey, and North Macedonia (Greece and Serbia use black-and-white).", pk("bulgaria", "bg_chevron.png")),
        ]),
        c("hr", "croatia", [
          v("hr-chevron", "Red arrow, yellow/white", "A red arrow on a yellow or white background.", pk("croatia", "Chevron.png")),
        ]),
        c("cz", "czechia", [
          v("cz-chevron", "White chevron, red arrow", "White with red arrows; a less common red-on-yellow version also exists.", pk("czechia", "cz_chevron.png")),
        ]),
        c("dk", "denmark", [
          v("dk-chevron", "Red-and-white chevron", "A red-and-white chevron, often mounted low to the ground.", pk("denmark", "Chevron.png")),
        ]),
        c("ee", "estonia", [
          v("ee-chevron", "Red chevron, white arrow", "Red chevrons with white arrows; Russia and Ukraine share the same scheme, while Latvia/Lithuania use the opposite.", pk("estonia", "Chevron.png")),
        ]),
        c("fi", "finland", [
          v("fi-chevron", "Black chevron, yellow arrow", "Black with yellow arrows; Norway and Iceland are similarly coloured, while Sweden uses a unique blue-and-yellow scheme.", pk("finland", "Untitled_design2.png")),
        ]),
        c("fr", "france", [
          v("fr-chevron", "Blue chevron, white arrows", "White arrows on a blue background, ranging from one to five arrows; Spain is the only other country with this colour scheme.", pk("france", "Chevrons.png")),
        ]),
        c("gr", "greece", [
          v("gr-chevron", "Black chevron, white arrow", "White arrows on a black background, similar to Albania, Italy, and the UK.", pk("greece", "gr_chevron.png")),
        ]),
        c("hu", "hungary", [
          v("hu-chevron", "White base, red arrow", "White on red; black-and-white chevrons occur but are less common.", pk("hungary", "hu_chevron.png")),
        ]),
        c("is", "iceland", [
          v("is-chevron", "Black chevron, yellow arrow", "Black with yellow arrows, similar to Norway/Finland but distinct from Sweden's blue-yellow design.", pk("iceland", "Screenshot__281167_29.png")),
        ]),
        c("ie", "ireland", [
          v("ie-chevron", "Yellow-on-black chevron", "Yellow on black (single or multiple arrows), versus the UK's white-on-black chevrons.", pk("ireland", "Chevrons.png")),
        ]),
        c("it", "italy", [
          v("it-chevron", "White-on-black chevron", "White arrows on black, also found in Spain, Greece, and Albania.", pk("italy", "it_chevron.png")),
        ]),
        c("lv", "latvia", [
          v("lv-chevron", "White chevron, red arrow", "White chevron with red arrows, shared with Lithuania and Poland (Estonia/Russia/Ukraine use the inverse colour scheme).", pk("latvia", "Chevron.png")),
        ]),
        c("lt", "lithuania", [
          v("lt-chevron", "White chevron, red outline", "White chevron with red arrows and a red outline around the sign edge on small single chevrons.", pk("lithuania", "Chevron_Lithuania.png")),
        ]),
        c("pl", "poland", [
          v("pl-chevron", "White chevron, red arrow", "Polish chevrons are white with red arrows.", pk("poland", "Poland-chevron.png")),
        ]),
        c("pt", "portugal", [
          v("pt-chevron", "Black chevron, yellow arrow", "Black with yellow arrows, a scheme unique among Mediterranean countries.", pk("portugal", "chevron.png")),
        ]),
        c("ro", "romania", [
          v("ro-chevron", "Red on white, yellow frame", "Red on white, most distinctively often bordered with a yellow frame.", pk("romania", "ro_chevron.png")),
        ]),
        c("rs", "serbia", [
          v("rs-chevron", "Black arrow on white", "Black arrow on a white background, also shared with Slovenia, Montenegro and North Macedonia.", pk("serbia", "Screenshot_2023-07-01_160357.png")),
        ]),
        c("sk", "slovakia", [
          v("sk-chevron", "White chevron, red arrow", "White with red arrows; a less common red-on-yellow version also exists.", pk("slovakia", "sk_chevron.png")),
        ]),
        c("si", "slovenia", [
          v("si-chevron", "Red arrow on white", "Usually red arrows on white; a less common black-arrow version also exists.", pk("slovenia", "si_chevron.png")),
        ]),
        c("sm", "san-marino", [
          v("sm-chevron", "Yellow chevron, burgundy arrow", "San Marino is the only country in the world using yellow chevrons with burgundy red arrows.", pk("san-marino", "San_Marino_Chevron.png")),
        ]),
        c("es", "spain", [
          v("es-chevron", "Black or blue chevron", "Two types: black with white arrows, and blue with white arrows; single-arrow chevrons are rare.", pk("spain", "Chevrons.png")),
        ]),
        c("se", "sweden", [
          v("se-chevron", "Yellow-on-blue chevron", "Sweden is the only European country with yellow arrows on a blue chevron background (Luxembourg rarely shares this).", pk("sweden", "chevron.png")),
        ]),
        c("ch", "switzerland", [
          v("ch-chevron", "Black chevron, white arrow", "Typically black with a white arrow; rarely white with a black arrow.", pk("switzerland", "ch_chevron.png")),
        ]),
        c("tr", "turkey", [
          v("tr-chevron", "Red-on-white chevron", "Typical Turkish chevrons are red on white, with the arrow tip usually not touching the chevron's edge.", pk("turkey", "tr_chevron.png")),
        ]),
        c("ua", "ukraine", [
          v("ua-chevron", "Red chevron, white arrows", "A red chevron with white arrows (shared with Russia and Estonia).", pk("ukraine", "Chevron.png")),
        ]),
        c("gb", "united-kingdom", [
          v("gb-chevron", "Black chevron, white arrow", "Black with white arrows (vs. Ireland's black/yellow, France's blue/white).", pk("united-kingdom", "Chevron.png")),
        ]),
      ],
    },
  ],
};
