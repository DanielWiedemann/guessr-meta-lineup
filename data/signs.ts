import type { GroupedGalleryMeta, CountryEntry } from "@/data/types";

function commons(filename: string, width = 600) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${width}`;
}

function country(
  code: string,
  variants: CountryEntry["variants"],
  note?: string
): CountryEntry {
  return { code, variants, note, sourceUrl: undefined };
}

export const signs: GroupedGalleryMeta = {
  id: "signs",
  kind: "grouped-gallery",
  name: "Signs",
  description:
    "Stop, yield, pedestrian and bus stop signs are designed nationally, so wording and styling differ by country. Pick a sign type below to compare. Photos are real-world examples from Wikimedia Commons contributors, so quality and framing vary.",
  attribution: "Wikimedia Commons",
  attributionUrl: "https://commons.wikimedia.org/",
  groups: [
    {
      id: "stop",
      label: "Stop",
      countries: [
        country("ar", [
          {
            id: "ar-stop",
            label: "PARE",
            description:
              "Standard red octagon with white \"PARE\" text and border, on a roadside pole in Mendoza Province.",
            image: commons("Pare_Rutas_argentinas.jpg"),
            credit: {
              author: "WM2911",
              license: "CC BY-SA 4.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Pare_Rutas_argentinas.jpg",
            },
          },
        ]),
        country("br", [
          {
            id: "br-stop",
            label: "PARE",
            description:
              "Red octagonal \"PARE\" stop sign photographed in Alphaville, São Paulo — same octagon/PARE format as Spanish-speaking neighbours despite Brazil being Portuguese-speaking.",
            image: commons("StopSignS%C3%A3oPaulo.jpg"),
            credit: {
              author: "OperaJoeGreen",
              license: "CC0 1.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:StopSignS%C3%A3oPaulo.jpg",
            },
          },
        ]),
        country("cl", [
          {
            id: "cl-stop",
            label: "PARE",
            description: "Standard red octagon \"PARE\" sign photographed in Santiago.",
            image: commons("Pare-Chile.jpg"),
            credit: {
              author: "JetDriver",
              license: "CC BY-SA 3.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Pare-Chile.jpg",
            },
          },
        ]),
        country("co", [
          {
            id: "co-stop",
            label: "PARE",
            description: "Red octagonal \"PARE\" sign on a pole in the La Soledad neighbourhood of Bogotá.",
            image: commons("Pare_con_%C3%A1rbol.jpg"),
            credit: {
              author: "Peter Angritt",
              license: "CC BY-SA 4.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Pare_con_%C3%A1rbol.jpg",
            },
          },
        ]),
        country("ec", [
          {
            id: "ec-stop",
            label: "PARE",
            description: "Red octagonal \"PARE\" sign near a Quito Metro construction site.",
            image: commons(
              "PARE_a_stop_sign_in_Spanish_in_Quito._Parque_La_Alameda_Metro_de_Quito_Quito_Metro_station%2C_under_construction.jpg"
            ),
            credit: {
              author: "David Adam Kess",
              license: "CC BY-SA 4.0",
              sourceUrl:
                "https://commons.wikimedia.org/wiki/File:PARE_a_stop_sign_in_Spanish_in_Quito._Parque_La_Alameda_Metro_de_Quito_Quito_Metro_station,_under_construction.jpg",
            },
          },
        ]),
        country("uy", [
          {
            id: "uy-stop",
            label: "PARE",
            description:
              "Red octagonal \"PARE\" sign mounted on a wall bracket at a street corner in Montevideo, with a supplementary one-way arrow plate above it.",
            image: commons("Calle_25_de_Mayo_esquina_Col%C3%B3n_-_panoramio.jpg"),
            credit: {
              author: "Andrés Franchi Ugarte",
              license: "CC BY-SA 3.0",
              sourceUrl:
                "https://commons.wikimedia.org/wiki/File:Calle_25_de_Mayo_esquina_Col%C3%B3n_-_panoramio.jpg",
            },
          },
        ]),
        country("bo", [], "No usable real photo found on Wikimedia Commons yet — only an official sign diagram exists."),
        country("pe", [], "No usable real photo found on Wikimedia Commons yet."),
      ],
    },
    {
      id: "yield",
      label: "Yield",
      countries: [
        country("ar", [
          {
            id: "ar-yield",
            label: "CEDA EL PASO",
            description: "Red-bordered downward triangle reading \"CEDA EL PASO\" on a street sign in Buenos Aires.",
            image: commons("Ceda_el_paso_bajada_general_paz.jpg"),
            credit: {
              author: "Fernando Martello",
              license: "CC BY 4.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Ceda_el_paso_bajada_general_paz.jpg",
            },
          },
        ]),
        country("cl", [
          {
            id: "cl-yield",
            label: "CEDA EL PASO",
            description: "Red-bordered inverted triangle \"CEDA EL PASO\" sign photographed in Santiago.",
            image: commons("Chile-Ceda_el_paso.jpg"),
            credit: {
              author: "JetDriver",
              license: "CC BY-SA 3.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Chile-Ceda_el_paso.jpg",
            },
          },
        ]),
        country("bo", [], "No usable real photo found on Wikimedia Commons yet."),
        country("br", [], "No usable real photo found on Wikimedia Commons yet."),
        country("co", [], "No usable real photo found on Wikimedia Commons yet."),
        country("ec", [], "No usable real photo found on Wikimedia Commons yet."),
        country("pe", [], "No usable real photo found on Wikimedia Commons yet."),
        country("uy", [], "No usable real photo found on Wikimedia Commons yet."),
      ],
    },
    {
      id: "pedestrian",
      label: "Pedestrian crossing",
      countries: [
        country("ar", [
          {
            id: "ar-pedestrian",
            label: "Pedestrian warning sign",
            description: "Yellow diamond warning sign with a black pedestrian-crossing pictogram, on a rural highway shoulder in Chaco Province.",
            image: commons("Senal_cruce_peatonal_ruta_95_chaco.jpg"),
            credit: {
              author: "Argentina.gob.ar (via Wikimedia Commons)",
              license: "CC BY 4.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Senal_cruce_peatonal_ruta_95_chaco.jpg",
            },
          },
        ]),
        country("br", [
          {
            id: "br-pedestrian",
            label: "Sign A-32b",
            description: "Brazilian road sign A-32b: yellow diamond with black pedestrian pictogram, shown along Curitiba's BRT corridor.",
            image: commons("Linha_Verde_Curitiba_BRT_05_2013_6641.JPG"),
            credit: {
              author: "Mario Roberto Durán Ortiz (Mariordo)",
              license: "CC BY-SA 3.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Linha_Verde_Curitiba_BRT_05_2013_6641.JPG",
            },
          },
        ]),
        country("cl", [], "No usable real photo found on Wikimedia Commons yet."),
        country("co", [
          {
            id: "co-pedestrian",
            label: "Pedestrian warning sign",
            description: "Yellow diamond pedestrian warning sign on a rural road, Boyacá — wider scene rather than a tight sign close-up.",
            image: commons("Ruta_Trasversal_60A_Boyac%C3%A1.JPG"),
            credit: {
              author: "Petruss",
              license: "CC BY-SA 3.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Ruta_Trasversal_60A_Boyac%C3%A1.JPG",
            },
          },
        ]),
        country("uy", [
          {
            id: "uy-pedestrian",
            label: "Pedestrian warning sign",
            description: "The only real photo available in Uruguay's pedestrian-crossing category — signage near Carrasco International Airport.",
            image: commons("Aeropuerto_Internacional_de_Carrasco_-_panoramio_%2876%29.jpg"),
            credit: {
              author: "Andrés Franchi Ugarte",
              license: "CC BY-SA 3.0",
              sourceUrl:
                "https://commons.wikimedia.org/wiki/File:Aeropuerto_Internacional_de_Carrasco_-_panoramio_(76).jpg",
            },
          },
        ]),
        country("bo", [], "No usable real photo found on Wikimedia Commons yet."),
        country("ec", [], "No usable real photo found on Wikimedia Commons yet."),
        country("pe", [], "No usable real photo found on Wikimedia Commons yet."),
      ],
    },
    {
      id: "busStop",
      label: "Bus stop",
      countries: [
        country("ar", [
          {
            id: "ar-busstop",
            label: "PARADA",
            description: "Blue rectangular pole sign reading \"PARADA\" with a bus pictogram, in Munro, Buenos Aires.",
            image: commons("Senal_parada_colectivos_en_munro.jpg"),
            credit: {
              author: "Fernando Martello",
              license: "CC BY-SA 4.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Senal_parada_colectivos_en_munro.jpg",
            },
          },
        ]),
        country("bo", [], "No usable real photo found on Wikimedia Commons yet."),
        country("br", [
          {
            id: "br-busstop",
            label: "Ponto de ônibus",
            description: "Green-roofed São Paulo \"ponto de ônibus\" shelter and sign pole, a typical municipal bus-stop marker.",
            image: commons("Ponto_de_%C3%B4nibus_da_cidade_de_S%C3%A3o_Paulo_%282025%29.jpg"),
            credit: {
              author: "AltoRelampago",
              license: "CC BY 4.0",
              sourceUrl:
                "https://commons.wikimedia.org/wiki/File:Ponto_de_%C3%B4nibus_da_cidade_de_S%C3%A3o_Paulo_(2025).jpg",
            },
          },
        ]),
        country("cl", [
          {
            id: "cl-busstop",
            label: "Paradero",
            description: "Chilean \"paradero\" bus-stop sign post with a numbered route placard, in Olmué.",
            image: commons("Letrero_paradero_24%2C_Olmu%C3%A9_20210926.jpg"),
            credit: {
              author: "Carlos Figueroa Rojas",
              license: "CC BY-SA 4.0",
              sourceUrl:
                "https://commons.wikimedia.org/wiki/File:Letrero_paradero_24,_Olmu%C3%A9_20210926.jpg",
            },
          },
        ]),
        country("co", [
          {
            id: "co-busstop",
            label: "Parada MIO",
            description: "Cali's MIO integrated-transit feeder-bus stop sign — a green pole-mounted marker.",
            image: commons("Parada_del_MIO_01.JPG"),
            credit: {
              author: "Remux",
              license: "CC BY-SA 4.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Parada_del_MIO_01.JPG",
            },
          },
        ]),
        country("ec", [
          {
            id: "ec-busstop",
            label: "Trolebús stop",
            description: "Quito Trolebús (electric trolleybus) station platform sign/shelter, rather than a simple curbside pole sign.",
            image: commons("Quito_Eugenio_Espejo_bus_stop_eastbound.jpg"),
            credit: {
              author: "Ymblanter",
              license: "CC BY-SA 4.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Quito_Eugenio_Espejo_bus_stop_eastbound.jpg",
            },
          },
        ]),
        country("pe", [
          {
            id: "pe-busstop",
            label: "Metropolitano stop",
            description: "Lima Metropolitano BRT bus-stop signage pole, a red-and-white branded transit marker.",
            image: commons("Se%C3%B1al%C3%A9tica_inestable.jpg"),
            credit: {
              author: "Mitzi Matias Rodriguez",
              license: "CC BY-SA 4.0",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Se%C3%B1al%C3%A9tica_inestable.jpg",
            },
          },
        ]),
        country("uy", [
          {
            id: "uy-busstop",
            label: "Parada",
            description: "Montevideo tourist-bus stop totem/marker post (\"Parada 8\") near Hospital de Clínicas.",
            image: commons("Marcador_Parada_8_Bus_Turistico_Montevideo.JPG"),
            credit: {
              author: "Ganímedes",
              license: "CC BY-SA 4.0",
              sourceUrl:
                "https://commons.wikimedia.org/wiki/File:Marcador_Parada_8_Bus_Turistico_Montevideo.JPG",
            },
          },
        ]),
      ],
    },
  ],
};
