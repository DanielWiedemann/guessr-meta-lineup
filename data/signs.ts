import type { GroupedGalleryMeta, CountryEntry, Variant } from "@/data/types";

function commons(filename: string, width = 600) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${width}`;
}

function pk(slug: string, file: string) {
  return `https://www.plonkit.net/images/resize/600/80/${slug}/${file}`;
}

// Commons-sourced variant (South America), carries its own per-photo credit
function vc(
  id: string,
  label: string,
  description: string,
  filename: string,
  author: string,
  license: string,
  fileUrl: string
): Variant {
  return {
    id,
    label,
    description,
    image: commons(filename),
    credit: { author, license, sourceUrl: fileUrl },
  };
}

// Plonk It-sourced variant (Latin America + Europe), covered by the country's own sourceUrl
function vp(id: string, label: string, description: string, slug: string, file: string): Variant {
  return { id, label, description, image: pk(slug, file) };
}

function country(code: string, variants: Variant[], note?: string): CountryEntry {
  return { code, variants, note, sourceUrl: undefined };
}

function countryPk(code: string, slug: string, variants: Variant[], note?: string): CountryEntry {
  return { code, sourceUrl: `https://www.plonkit.net/${slug}`, variants, note };
}

export const signs: GroupedGalleryMeta = {
  id: "signs",
  kind: "grouped-gallery",
  name: "Signs",
  description:
    "Stop, yield, pedestrian and bus stop signs are designed nationally, so wording and styling differ by country. Pick a sign type below to compare.",
  attribution: "Plonk It / Wikimedia Commons",
  attributionUrl: "https://www.plonkit.net/guide",
  groups: [
    {
      id: "stop",
      label: "Stop",
      countries: [
        // South America (Wikimedia Commons)
        country("ar", [
          vc("ar-stop", "PARE", "Standard red octagon with white \"PARE\" text and border, on a roadside pole in Mendoza Province.", "Pare_Rutas_argentinas.jpg", "WM2911", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Pare_Rutas_argentinas.jpg"),
        ]),
        country("br", [
          vc("br-stop", "PARE", "Red octagonal \"PARE\" stop sign photographed in Alphaville, São Paulo — same octagon/PARE format as Spanish-speaking neighbours despite Brazil being Portuguese-speaking.", "StopSignS%C3%A3oPaulo.jpg", "OperaJoeGreen", "CC0 1.0", "https://commons.wikimedia.org/wiki/File:StopSignS%C3%A3oPaulo.jpg"),
        ]),
        country("cl", [
          vc("cl-stop", "PARE", "Standard red octagon \"PARE\" sign photographed in Santiago.", "Pare-Chile.jpg", "JetDriver", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Pare-Chile.jpg"),
        ]),
        country("co", [
          vc("co-stop", "PARE", "Red octagonal \"PARE\" sign on a pole in the La Soledad neighbourhood of Bogotá.", "Pare_con_%C3%A1rbol.jpg", "Peter Angritt", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Pare_con_%C3%A1rbol.jpg"),
        ]),
        country("ec", [
          vc("ec-stop", "PARE", "Red octagonal \"PARE\" sign near a Quito Metro construction site.", "PARE_a_stop_sign_in_Spanish_in_Quito._Parque_La_Alameda_Metro_de_Quito_Quito_Metro_station%2C_under_construction.jpg", "David Adam Kess", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:PARE_a_stop_sign_in_Spanish_in_Quito._Parque_La_Alameda_Metro_de_Quito_Quito_Metro_station,_under_construction.jpg"),
        ]),
        country("uy", [
          vc("uy-stop", "PARE", "Red octagonal \"PARE\" sign mounted on a wall bracket at a street corner in Montevideo, with a supplementary one-way arrow plate above it.", "Calle_25_de_Mayo_esquina_Col%C3%B3n_-_panoramio.jpg", "Andrés Franchi Ugarte", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Calle_25_de_Mayo_esquina_Col%C3%B3n_-_panoramio.jpg"),
        ]),
        country("bo", [], "No usable real photo found on Wikimedia Commons yet — only an official sign diagram exists."),
        country("pe", [], "No usable real photo found on Wikimedia Commons yet."),

        // Latin America (Plonk It)
        countryPk("cr", "costa-rica", [
          vp("cr-stop", "ALTO", "Like Mexico, Panama and Guatemala, Costa Rica uses the word \"ALTO\" on its stop signs rather than \"PARE\".", "costa-rica", "cr_alto_new.png"),
        ]),
        countryPk("do", "dominican-republic", [
          vp("do-stop", "PARE", "Despite being in Central America/Caribbean geographically, the Dominican Republic uses the South American \"PARE\" wording. Signs are often mounted on yellow posts.", "dominican-republic", "pare.png"),
        ]),
        countryPk("gt", "guatemala", [
          vp("gt-stop", "ALTO", "Like Mexico, Panama and Costa Rica, Guatemala uses the word \"ALTO\" on stop signs.", "guatemala", "gt_alto.png"),
        ]),
        countryPk("mx", "mexico", [
          vp("mx-stop", "ALTO", "Mexico uses \"ALTO\" on stop signs — all of South America plus Puerto Rico use \"PARE\" instead.", "mexico", "mx_alto.png"),
        ]),
        countryPk("pa", "panama", [
          vp("pa-stop", "ALTO", "Panama uses the Spanish word \"ALTO\" on stop signs, in a noticeably thinner font than Mexico, Costa Rica or Guatemala.", "panama", "10.png"),
        ]),
        countryPk("pr", "puerto-rico", [
          vp("pr-stop", "PARE", "Stop signs in Puerto Rico say \"PARE\" — the same wording used across all of South America and the Dominican Republic.", "puerto-rico", "pr_pare.png"),
        ]),

        // Europe (Plonk It) — most of Europe uses the standard international "STOP" text,
        // so it's usually not a distinguishing meta; only countries with a documented
        // deviation or notable variation are listed.
        countryPk("al", "albania", [
          vp("al-stop", "Distinct \"S\" shape", "Albanian stop signs have an \"S\" whose ends are short and angled rather than vertical, also seen on directional signs (shared with Italy).", "albania", "al_stopsignss.png"),
        ]),
        countryPk("pt", "portugal", [
          vp("pt-stop", "Large-font STOP", "Portuguese stop signs use a noticeably larger font than Spain's compact font.", "portugal", "stopsign.png"),
        ]),
        countryPk("es", "spain", [
          vp("es-stop", "Small-font STOP", "Spanish stop signs use a distinctly small font, useful for distinguishing from Portugal's larger font.", "spain", "Spain_stop_sign.png"),
        ]),
        countryPk("tr", "turkey", [
          vp("tr-stop", "DUR", "Turkish stop signs read \"DUR\" instead of \"STOP\", unique to Turkey.", "turkey", "tr_dur.png"),
        ]),
      ],
    },
    {
      id: "yield",
      label: "Yield",
      countries: [
        country("ar", [
          vc("ar-yield", "CEDA EL PASO", "Red-bordered downward triangle reading \"CEDA EL PASO\" on a street sign in Buenos Aires.", "Ceda_el_paso_bajada_general_paz.jpg", "Fernando Martello", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Ceda_el_paso_bajada_general_paz.jpg"),
        ]),
        country("cl", [
          vc("cl-yield", "CEDA EL PASO", "Red-bordered inverted triangle \"CEDA EL PASO\" sign photographed in Santiago.", "Chile-Ceda_el_paso.jpg", "JetDriver", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Chile-Ceda_el_paso.jpg"),
        ]),
        country("bo", [], "No usable real photo found on Wikimedia Commons yet."),
        country("br", [], "No usable real photo found on Wikimedia Commons yet."),
        country("co", [], "No usable real photo found on Wikimedia Commons yet."),
        country("ec", [], "No usable real photo found on Wikimedia Commons yet."),
        country("pe", [], "No usable real photo found on Wikimedia Commons yet."),
        country("uy", [], "No usable real photo found on Wikimedia Commons yet."),

        countryPk("ie", "ireland", [
          vp("ie-yield", "YIELD", "Irish yield signs display the word \"YIELD\", compared to the UK's \"GIVE WAY\" phrasing.", "ireland", "Yield_sign.png"),
        ]),
        countryPk("ro", "romania", [
          vp("ro-yield", "Thick red-bordered yield sign", "A yield sign with an extremely thick red border and thin white outline, unique to Romania.", "romania", "ro_prioritysign.png"),
        ]),
        countryPk("gb", "united-kingdom", [
          vp("gb-yield", "GIVE WAY", "UK yield signs read \"GIVE WAY\" (Ireland's equivalent just says \"YIELD\").", "united-kingdom", "Yield_signs2.png"),
        ]),
      ],
    },
    {
      id: "pedestrian",
      label: "Pedestrian crossing",
      countries: [
        // South America (Wikimedia Commons)
        country("ar", [
          vc("ar-pedestrian", "Pedestrian warning sign", "Yellow diamond warning sign with a black pedestrian-crossing pictogram, on a rural highway shoulder in Chaco Province.", "Senal_cruce_peatonal_ruta_95_chaco.jpg", "Argentina.gob.ar (via Wikimedia Commons)", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Senal_cruce_peatonal_ruta_95_chaco.jpg"),
        ]),
        country("br", [
          vc("br-pedestrian", "Sign A-32b", "Brazilian road sign A-32b: yellow diamond with black pedestrian pictogram, shown along Curitiba's BRT corridor.", "Linha_Verde_Curitiba_BRT_05_2013_6641.JPG", "Mario Roberto Durán Ortiz (Mariordo)", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Linha_Verde_Curitiba_BRT_05_2013_6641.JPG"),
        ]),
        country("cl", [], "No usable real photo found on Wikimedia Commons yet."),
        country("co", [
          vc("co-pedestrian", "Pedestrian warning sign", "Yellow diamond pedestrian warning sign on a rural road, Boyacá — wider scene rather than a tight sign close-up.", "Ruta_Trasversal_60A_Boyac%C3%A1.JPG", "Petruss", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Ruta_Trasversal_60A_Boyac%C3%A1.JPG"),
        ]),
        country("uy", [
          vc("uy-pedestrian", "Pedestrian warning sign", "The only real photo available in Uruguay's pedestrian-crossing category — signage near Carrasco International Airport.", "Aeropuerto_Internacional_de_Carrasco_-_panoramio_%2876%29.jpg", "Andrés Franchi Ugarte", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Aeropuerto_Internacional_de_Carrasco_-_panoramio_(76).jpg"),
        ]),
        country("bo", [], "No usable real photo found on Wikimedia Commons yet."),
        country("ec", [], "No usable real photo found on Wikimedia Commons yet."),
        country("pe", [], "No usable real photo found on Wikimedia Commons yet."),

        // Europe (Plonk It)
        countryPk("ad", "andorra", [
          vp("ad-pedestrian", "8-stripe pedestrian sign", "Andorran pedestrian signs have 8 stripes; only Spain shares this in Europe.", "andorra", "Pedestrian_sign.png"),
        ]),
        countryPk("at", "austria", [
          vp("at-pedestrian", "Dashed-line pedestrian sign", "Austrian pedestrian signs use two horizontal dashed lines instead of zebra stripes — unlike every neighbouring country.", "austria", "Pedestrian_sign.png"),
        ]),
        countryPk("be", "belgium", [
          vp("be-pedestrian", "Dotted lines, square head", "No stripes — instead two horizontal dotted lines, with a square-headed figure (France/Netherlands use regular 5-stripe zebra signs).", "belgium", "Ontwerp_zonder_titel_10.png"),
        ]),
        countryPk("bg", "bulgaria", [
          vp("bg-pedestrian", "4-stripe hatted pedestrian", "Four stripes and depicts a person wearing a hat.", "bulgaria", "bg_pedestriansign.png"),
        ]),
        countryPk("hr", "croatia", [
          vp("hr-pedestrian", "Belted pedestrian, 5 stripes", "Shows a pedestrian wearing a belt on a 5-stripe zebra path, unlike Slovenia's beltless version.", "croatia", "Pedestrian_sign_2.png"),
        ]),
        countryPk("cz", "czechia", [
          vp("cz-pedestrian", "Five-stripe pedestrian sign", "Five stripes; distinguished from Slovak signs by stripe scale relative to the triangle edge.", "czechia", "cz_pedestriansign.png"),
        ]),
        countryPk("dk", "denmark", [
          vp("dk-pedestrian", "Five-stripe pedestrian sign", "5 stripes; the first and fifth stripe uniquely touch the triangle's edge.", "denmark", "Pedestrian_sign.png"),
        ]),
        countryPk("ee", "estonia", [
          vp("ee-pedestrian", "Detailed three-stripe pedestrian", "3 stripes, with a relatively detailed figure with shoes and an attached head.", "estonia", "Pedestrian_sign_Estonia.png"),
        ]),
        countryPk("fi", "finland", [
          vp("fi-pedestrian", "Five-stripe pedestrian sign", "5 stripes vs. the usual 4 in Sweden/Norway.", "finland", "FInland_Pedestrian_Signs.png"),
        ]),
        countryPk("fr", "france", [
          vp("fr-pedestrian", "Five-stripe, disconnected head", "5 stripes, a disconnected head on the figure, and a white sign border; a rarer two-dashed-line variant exists.", "france", "Pedestrian.png"),
        ]),
        countryPk("de", "germany", [
          vp("de-pedestrian", "Five-stripe belted pedestrian", "5 stripes, with the pedestrian figure wearing a belt; the same design is used in Luxembourg.", "germany", "de_pedestriansign.png"),
        ]),
        countryPk("gr", "greece", [
          vp("gr-pedestrian", "Dotted horizontal-line pedestrian", "Two dotted horizontal lines instead of vertical stripes.", "greece", "gr_pedestriansign.png"),
        ]),
        countryPk("hu", "hungary", [
          vp("hu-pedestrian", "Five-stripe, low belt", "Five stripes where the figure wears a belt sitting noticeably low; a rarer 4-stripe variant shows the figure holding a bag.", "hungary", "hu_pedestriansign.png"),
        ]),
        countryPk("is", "iceland", [
          vp("is-pedestrian", "Four-stripe, yellow tint", "Four stripes with a slight yellow background tint — Iceland is the only European country with a yellow pedestrian sign background.", "iceland", "Screenshot__281164_29.png"),
        ]),
        countryPk("ie", "ireland", [
          vp("ie-pedestrian", "Diamond yellow / bulb signpost", "Yellow diamond-shaped pedestrian signs are rare; more commonly seen are black-and-white signposts topped with a yellow bulb (shared design with UK).", "ireland", "Pedestrian_signs_2.png"),
        ]),
        countryPk("it", "italy", [
          vp("it-pedestrian", "Five-stripe, no belt", "A five-stripe pedestrian figure with a basic design and no belt.", "italy", "it_pedestriansign.png"),
        ]),
        countryPk("lv", "latvia", [
          vp("lv-pedestrian", "Five-stripe, long legs", "A five-stripe sign, unique in the Baltics, with a figure that has noticeably long legs.", "latvia", "Pedestrian_sign.png"),
        ]),
        countryPk("li", "liechtenstein", [
          vp("li-pedestrian", "Seven-stripe, tall rectangle", "Seven stripes and an unusually tall rectangular sign shape, identical to Switzerland's.", "liechtenstein", "6.png"),
        ]),
        countryPk("lt", "lithuania", [
          vp("lt-pedestrian", "Three-stripe, low detail", "A three-stripe pedestrian figure with a relatively low level of detail, shared design with Russia/Ukraine.", "lithuania", "Pedestrian_sign_Lithuania.png"),
        ]),
        countryPk("lu", "luxembourg", [
          vp("lu-pedestrian", "Five-stripe pedestrian sign", "5 vertical stripes, distinguishing it from Belgium's 2-horizontal-stripe design.", "luxembourg", "Pedestrian_sign.png"),
        ]),
        countryPk("no", "norway", [
          vp("no-pedestrian", "Four-stripe pedestrian sign", "Typically four stripes with a simply drawn person (versions with five stripes or a more detailed hatted figure also exist).", "norway", "no_pedestriansign.png"),
        ]),
        countryPk("pl", "poland", [
          vp("pl-pedestrian", "Single horizontal line sign", "Uniquely shows one horizontal line instead of zebra stripes.", "poland", "Poland-pedestrian-sign.png"),
        ]),
        countryPk("pt", "portugal", [
          vp("pt-pedestrian", "Five-stripe, high belt", "Five stripes with a person wearing a noticeably high belt.", "portugal", "pedestriansign.png"),
        ]),
        countryPk("ru", "russia", [
          vp("ru-pedestrian", "Yellow-bordered pedestrian sign", "A simply drawn person with three stripes and commonly a bright yellow border; shared with Ukraine and some Central Asian countries.", "russia", "pedestriansign.png"),
        ]),
        countryPk("sm", "san-marino", [
          vp("sm-pedestrian", "Blue crosswalk, hanging sign", "Elaborate crossings with painted blue crosswalks and hanging signs, specific to San Marino.", "san-marino", "San_Marino_Pedestrian_Crossing.png"),
        ]),
        countryPk("sk", "slovakia", [
          vp("sk-pedestrian", "Five-stripe belted pedestrian", "Two main variants, both five stripes: one with a simply drawn belted person, one with tightly packed stripes.", "slovakia", "sk_pedestriansign.png"),
        ]),
        countryPk("si", "slovenia", [
          vp("si-pedestrian", "Five-stripe unbelted pedestrian", "Five stripes with a simply drawn person without a belt, unlike Croatia's belted version.", "slovenia", "si_pedestriansign.png"),
        ]),
        countryPk("es", "spain", [
          vp("es-pedestrian", "8-stripe crossing sign", "Spanish pedestrian crossing signs have 8 stripes, the most in Europe (only Andorra shares this).", "spain", "2022-12-11_11.png"),
        ]),
        countryPk("se", "sweden", [
          vp("se-pedestrian", "4-stripe pedestrian sign", "Four stripes, sometimes featuring a female-silhouette version.", "sweden", "herrg_C3_A5rman.png"),
        ]),
        countryPk("ch", "switzerland", [
          vp("ch-pedestrian", "Tall blue pedestrian sign", "Seven stripes, shown as a tall blue rectangle rather than the typical European square (Liechtenstein shares this).", "switzerland", "ch_pedestrian_sign.png"),
        ]),
        countryPk("ua", "ukraine", [
          vp("ua-pedestrian", "3-stripe pedestrian sign", "Three stripes (also used in Russia, Estonia, Lithuania).", "ukraine", "Pedestrian_sign.png"),
        ]),
        countryPk("gb", "united-kingdom", [
          vp("gb-pedestrian", "Belisha beacon post", "Dedicated pedestrian crossing signs are almost absent; instead, black-and-white striped poles with a yellow flashing beacon on top mark crossings.", "united-kingdom", "Pedestrian_signpost.png"),
        ]),
      ],
    },
    {
      id: "busStop",
      label: "Bus stop",
      countries: [
        // South America (Wikimedia Commons)
        country("ar", [
          vc("ar-busstop", "PARADA", "Blue rectangular pole sign reading \"PARADA\" with a bus pictogram, in Munro, Buenos Aires.", "Senal_parada_colectivos_en_munro.jpg", "Fernando Martello", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Senal_parada_colectivos_en_munro.jpg"),
        ]),
        country("bo", [], "No usable real photo found on Wikimedia Commons yet."),
        country("br", [
          vc("br-busstop", "Ponto de ônibus", "Green-roofed São Paulo \"ponto de ônibus\" shelter and sign pole, a typical municipal bus-stop marker.", "Ponto_de_%C3%B4nibus_da_cidade_de_S%C3%A3o_Paulo_%282025%29.jpg", "AltoRelampago", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Ponto_de_%C3%B4nibus_da_cidade_de_S%C3%A3o_Paulo_(2025).jpg"),
        ]),
        country("cl", [
          vc("cl-busstop", "Paradero", "Chilean \"paradero\" bus-stop sign post with a numbered route placard, in Olmué.", "Letrero_paradero_24%2C_Olmu%C3%A9_20210926.jpg", "Carlos Figueroa Rojas", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Letrero_paradero_24,_Olmu%C3%A9_20210926.jpg"),
        ]),
        country("co", [
          vc("co-busstop", "Parada MIO", "Cali's MIO integrated-transit feeder-bus stop sign — a green pole-mounted marker.", "Parada_del_MIO_01.JPG", "Remux", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Parada_del_MIO_01.JPG"),
        ]),
        country("ec", [
          vc("ec-busstop", "Trolebús stop", "Quito Trolebús (electric trolleybus) station platform sign/shelter, rather than a simple curbside pole sign.", "Quito_Eugenio_Espejo_bus_stop_eastbound.jpg", "Ymblanter", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Quito_Eugenio_Espejo_bus_stop_eastbound.jpg"),
        ]),
        country("pe", [
          vc("pe-busstop", "Metropolitano stop", "Lima Metropolitano BRT bus-stop signage pole, a red-and-white branded transit marker.", "Se%C3%B1al%C3%A9tica_inestable.jpg", "Mitzi Matias Rodriguez", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Se%C3%B1al%C3%A9tica_inestable.jpg"),
        ]),
        country("uy", [
          vc("uy-busstop", "Parada", "Montevideo tourist-bus stop totem/marker post (\"Parada 8\") near Hospital de Clínicas.", "Marcador_Parada_8_Bus_Turistico_Montevideo.JPG", "Ganímedes", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Marcador_Parada_8_Bus_Turistico_Montevideo.JPG"),
        ]),

        // Europe (Plonk It)
        countryPk("at", "austria", [
          vp("at-busstop", "Yellow/green \"H\" circle", "Bus stop signs show a yellow-and-green circle with the letter H, a design largely shared only with Germany.", "austria", "Bus_stop_signs.png"),
        ]),
        countryPk("be", "belgium", [
          vp("be-busstop", "Flanders white-top / Wallonia yellow-top", "Bus stop signs have a white rectangle at the top in Flanders and Brussels, but a yellow top in Wallonia.", "belgium", "Belgium_Bus_Stop_Signs.png"),
        ]),
        countryPk("dk", "denmark", [
          vp("dk-busstop", "Black/yellow bus stop sign", "A small sign atop a pole with a schedule below; an older blue-and-white version also exists.", "denmark", "Bus_stop_sign.png"),
        ]),
        countryPk("ee", "estonia", [
          vp("ee-busstop", "Four-window bus icon", "The bus icon has four windows, vs. five in Latvia (Lithuania shares Estonia's design).", "estonia", "Bus_stop_sign.png"),
        ]),
        countryPk("fi", "finland", [
          vp("fi-busstop", "Blue/white or yellow/black bus stop", "Two styles are used nationally.", "finland", "Finland_bus_stop_signs.png"),
        ]),
        countryPk("de", "germany", [
          vp("de-busstop", "Yellow/green \"H\" bus stop", "Regional designs vary widely, but all feature a large yellow-and-green \"H\" symbol.", "germany", "German_Bus_Stops.png"),
        ]),
        countryPk("lv", "latvia", [
          vp("lv-busstop", "Five-window bus icon", "The Latvian bus stop sign design shows a bus with five windows, unique among the Baltic states (others have four).", "latvia", "Bus_stop_sign.png"),
        ]),
        countryPk("li", "liechtenstein", [
          vp("li-busstop", "Green/white \"LIEMOBIL\" sign", "A green-and-white bus stop sign with a black metallic border and \"LIEMOBIL\" text at the top.", "liechtenstein", "Screenshot__281398_29.png"),
        ]),
        countryPk("lt", "lithuania", [
          vp("lt-busstop", "Four-window bus icon", "The bus stop sign shows a bus with four windows (vs. Latvia's five); Estonia shares this same design.", "lithuania", "Bus_stop_sign_Lithuania.png"),
        ]),
        countryPk("lu", "luxembourg", [
          vp("lu-busstop", "Blue six-window bus sign", "Bus stop signs are blue with a consistent design showing a bus with six windows, differing from Belgian and Dutch bus stop designs.", "luxembourg", "Bus_stop_sign.png"),
        ]),
        countryPk("pt-ma", "madeira", [
          vp("ma-busstop", "Black/white/yellow bus sign", "Bus stop signs follow a unique black, white and yellow colour scheme found on the island.", "madeira", "busstops.png"),
        ]),
        countryPk("mt", "malta", [
          vp("mt-busstop", "Informational bus stop sign", "Bus stops are a common sight and may display useful location information.", "malta", "mt_busstop.png"),
        ]),
        countryPk("no", "norway", [
          vp("no-busstop", "Blue sign, white bus", "A small blue bus stop sign with a white bus icon; Sweden's bus stop designs look very different.", "norway", "no_busstop.png"),
        ]),
        countryPk("se", "sweden", [
          vp("se-busstop", "Regional bus stop signs", "Each administrative region has at least one (often several) unique bus stop sign designs.", "sweden", "busstopp3.png"),
        ]),
        countryPk("ch", "switzerland", [
          vp("ch-busstop", "Metal-framed bus stop sign", "Bus stop signs with a thick metal signpost frame going around them, unique to Switzerland.", "switzerland", "ch_busstop.png"),
        ]),
      ],
    },
  ],
};
