import type { FactsMeta, FactCountry } from "@/data/types";

const geohints = "https://geohints.com/meta/currencies";

function c(code: string, currencyName: string, symbol: string, currencyCode: string): FactCountry {
  return {
    code,
    sourceUrl: geohints,
    facts: [
      { label: "Currency", value: currencyName },
      { label: "Symbol", value: symbol },
      { label: "Code", value: currencyCode },
    ],
  };
}

export const currency: FactsMeta = {
  id: "currency",
  kind: "facts",
  name: "Currency",
  description:
    "The currency symbol on price boards, gas station signs and shop windows can narrow down a country fast. Here's what to expect in each country.",
  attribution: "GeoHints",
  attributionUrl: geohints,
  countries: [
    // South America
    c("ar", "Argentine peso", "$", "ARS"),
    c("bo", "Bolivian boliviano", "Bs", "BOB"),
    c("br", "Brazilian real", "R$", "BRL"),
    c("cl", "Chilean peso", "$", "CLP"),
    c("co", "Colombian peso", "$", "COP"),
    c("ec", "United States dollar", "$ / US$ / U$", "USD"),
    c("pe", "Peruvian sol", "S/", "PEN"),
    c("uy", "Uruguayan peso", "$ / $U", "UYU"),

    // Latin America
    c("cr", "Costa Rican colón", "₡", "CRC"),
    c("do", "Dominican peso", "$ / RD$", "DOP"),
    c("gt", "Guatemalan quetzal", "Q", "GTQ"),
    c("mx", "Mexican peso", "$ / MX$ / Mex$", "MXN"),
    c("pa", "Panamanian balboa (USD also used)", "B/. / $", "PAB"),
    c("pr", "United States dollar", "$ / US$ / U$", "USD"),

    // North America
    c("us", "United States dollar", "$ / US$ / U$", "USD"),
    c("us-ak", "United States dollar", "$ / US$ / U$", "USD"),
    c("us-hi", "United States dollar", "$ / US$ / U$", "USD"),
    c("ca", "Canadian dollar", "$ / CA$ / C$", "CAD"),
    c("bm", "Bermudian dollar (USD also used)", "$ / BD$", "BMD"),
    c("gl", "Danish krone", "kr.", "DKK"),
    c("mq", "Euro", "€", "EUR"),
    c("pm", "Euro", "€", "EUR"),
    c("um", "United States dollar", "$ / US$ / U$", "USD"),
    c("vi", "United States dollar", "$ / US$ / U$", "USD"),

    // Europe
    c("al", "Albanian lek", "L", "ALL"),
    c("ad", "Euro", "€", "EUR"),
    c("at", "Euro", "€", "EUR"),
    c("pt-az", "Euro", "€", "EUR"),
    c("by", "Belarusian ruble", "Br", "BYN"),
    c("be", "Euro", "€", "EUR"),
    c("bg", "Bulgarian lev", "лв.", "BGN"),
    c("hr", "Euro", "€", "EUR"),
    c("cy", "Euro", "€", "EUR"),
    c("cz", "Czech koruna", "Kč", "CZK"),
    c("dk", "Danish krone", "kr.", "DKK"),
    c("ee", "Euro", "€", "EUR"),
    c("fo", "Danish krone", "kr.", "DKK"),
    c("fi", "Euro", "€", "EUR"),
    c("fr", "Euro", "€", "EUR"),
    c("de", "Euro", "€", "EUR"),
    c("gi", "Gibraltar pound", "£", "GIP"),
    c("gr", "Euro", "€", "EUR"),
    c("hu", "Hungarian forint", "Ft", "HUF"),
    c("is", "Icelandic króna", "kr", "ISK"),
    c("ie", "Euro", "€", "EUR"),
    c("im", "Pound sterling", "£", "GBP"),
    c("it", "Euro", "€", "EUR"),
    c("je", "Pound sterling", "£", "GBP"),
    c("lv", "Euro", "€", "EUR"),
    c("li", "Swiss franc", "Fr.", "CHF"),
    c("lt", "Euro", "€", "EUR"),
    c("lu", "Euro", "€", "EUR"),
    c("pt-ma", "Euro", "€", "EUR"),
    c("mt", "Euro", "€", "EUR"),
    c("mc", "Euro", "€", "EUR"),
    c("me", "Euro (unofficial)", "€", "EUR"),
    c("nl", "Euro", "€", "EUR"),
    c("mk", "Macedonian denar", "den / ден", "MKD"),
    c("no", "Norwegian krone", "kr", "NOK"),
    c("pl", "Polish złoty", "zł", "PLN"),
    c("pt", "Euro", "€", "EUR"),
    c("ro", "Romanian leu", "Lei", "RON"),
    c("ru", "Russian ruble", "₽ / руб", "RUB"),
    c("sm", "Euro", "€", "EUR"),
    c("rs", "Serbian dinar", "din / Дин", "RSD"),
    c("sk", "Euro", "€", "EUR"),
    c("si", "Euro", "€", "EUR"),
    c("es", "Euro", "€", "EUR"),
    c("sj", "Norwegian krone", "kr", "NOK"),
    c("se", "Swedish krona", "kr", "SEK"),
    c("ch", "Swiss franc", "Fr. / fr.", "CHF"),
    c("tr", "Turkish lira", "₺ / TL", "TRY"),
    c("ua", "Ukrainian hryvnia", "₴ / грн", "UAH"),
    c("gb", "Pound sterling", "£", "GBP"),
  ],
};
