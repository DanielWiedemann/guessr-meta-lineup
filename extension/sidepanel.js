const SUPABASE_URL = "https://ofiiluzxhnyzkbjlqfgk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_AfMMFkL2mEu48zpi1HjowQ_HYt511A3";

// Every filterable fact now lives on the countries table itself (one row
// per country, text[] columns for multi-valued facts) instead of the old
// filter_categories / filter_options / country_filter_tags trio. 137 rows
// is well under PostgREST's 1000-row cap, so a single request suffices —
// but keep a Range-paginated helper anyway so this never silently
// truncates if the table grows.
const PAGE_SIZE = 1000;

async function sb(path) {
  const rows = [];
  let offset = 0;
  for (;;) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Range: `${offset}-${offset + PAGE_SIZE - 1}`,
      },
    });
    if (!res.ok) throw new Error(`Supabase request failed (${res.status})`);
    const page = await res.json();
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }
  return rows;
}

function flagUrl(code, flagCode) {
  return `https://flagcdn.com/w80/${flagCode || code}.png`;
}

const SITE_URL = "https://guessr-meta-lineup.vercel.app";

// Panel-level preferences (which sections are open, AND/OR choices)
// survive the side panel closing between rounds. Selections deliberately
// do NOT persist - each round starts from a clean slate.
const PREFS_KEY = "meta-lineup-prefs";

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY)) ?? {};
  } catch {
    return {};
  }
}

function savePrefs() {
  const prefs = {
    collapsed: [...state.collapsed],
    matchMode: Object.fromEntries(state.matchMode),
  };
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // storage full/unavailable - preferences just won't stick
  }
}

// --- Filter definitions ----------------------------------------------------
// Each category maps to one column on the countries table. `match` is how
// multiple selected options combine: "or" (any is enough — the default,
// good for "these two colours look similar / I'm unsure") or "and" (all
// required — only the letter categories, since you're describing several
// characters seen together in one word).
// Order is deliberately grouped: quick geography first, then road markings,
// then road signs, then the language/writing cluster (language → script →
// Latin letters → Cyrillic letters → road-name words) so related clues sit
// together. `match` is the DEFAULT combine mode; categories with
// `toggle: true` let the user flip AND/OR live from the heading.
const CATEGORIES = [
  { id: "driving_side", col: "driving_side", name: "Side of driving", kind: "side", match: "or",
    hint: "Which side traffic drives on - the fastest clue to check first." },
  { id: "continents", col: "continents", name: "Continent", kind: "pill", match: "or",
    hint: "Pick several if you're between regions." },
  { id: "road_line_color_inner", col: "road_line_color_inner", name: "Center line colour", kind: "road", variant: "inner", match: "or",
    hint: "Colour of the middle dividing line." },
  { id: "road_line_color_outer", col: "road_line_color_outer", name: "Edge line colour", kind: "road", variant: "outer", match: "or",
    hint: "Colour of the outer edge lines." },
  { id: "stop_sign_wording", col: "stop_sign_wording", name: "Stop sign", kind: "stop", match: "or",
    hint: "The word (or script) printed on the stop sign." },
  { id: "chevron_bg_color", col: "chevron_bg_color", name: "Chevron background", kind: "chevron", variant: "bg", match: "or",
    hint: "Background colour of curve-warning chevrons." },
  { id: "chevron_arrow_color", col: "chevron_arrow_color", name: "Chevron arrow", kind: "chevron", variant: "arrow", match: "or",
    hint: "Arrow colour on curve-warning chevrons." },
  { id: "currency_symbols", col: "currency_symbols", name: "Currency symbol", kind: "currency", match: "or", complete: true,
    hint: "The symbol on price boards, shopfronts and fuel signs." },
  { id: "phone_codes", col: "phone_codes", name: "Phone code", kind: "currency", icon: "phone", match: "or", complete: true,
    hint: "The +XX on phone numbers on shopfronts, vans and ads. Shared codes narrow to a group (+1, +44, +7)." },
  { id: "languages", col: "languages", name: "Language", kind: "pill", icon: "speech", match: "or", toggle: true,
    hint: "A language spoken here. OR = any of them; AND = all must be spoken." },
  { id: "scripts", col: "scripts", name: "Writing script", kind: "script", match: "or",
    hint: "Recognise the alphabet by its shape, even if you can't read it." },
  { id: "special_letters_latin", col: "special_letters_latin", name: "Special letters (Latin)", kind: "letter", match: "and", complete: true,
    hint: "Accented / extra Latin letters. Picking several needs ALL to appear." },
  { id: "special_letters_cyrillic", col: "special_letters_cyrillic", name: "Cyrillic letters", kind: "letter", match: "and", complete: true,
    hint: "Letters specific to a country's Cyrillic alphabet. Picking several needs ALL to appear." },
  { id: "road_name_words", col: "road_name_words", name: "Road name words", kind: "pill", icon: "signpost", match: "or",
    hint: "The street word on name plates - Jalan, ul., -straat, Rue, Calle…" },
];

// Only the driving side starts open — everything else collapses to keep
// the panel short until you need it.
const EXPANDED_BY_DEFAULT = new Set(["driving_side"]);

const COLOR_ORDER = ["white", "yellow", "black", "red", "blue", "burgundy", "none"];
const COLOR_HEX = {
  white: "#f8fafc", yellow: "#facc15", black: "#18181b",
  red: "#ef4444", blue: "#3b82f6", burgundy: "#7f1d3b",
};

// Canonical display order for stop-sign wordings (most common first, then
// native scripts); anything unlisted falls back to alphabetical after.
const STOP_ORDER = ["STOP", "PARE", "ALTO", "DUR", "BERHENTI", "ARRÊT", "止まれ", "停", "정지", "หยุด", "قف"];
const CONTINENT_ORDER = ["North America", "South America", "Europe", "Africa", "Asia", "Oceania", "Antarctica"];

// Writing scripts: each tile shows big sample glyphs PLUS a line of real
// sign-style text (greetings, city names, street words) so the tile looks
// like what you actually see in-game - including the tone marks, stacked
// vowels and digits that dominate real signage (a bare 3-letter sample
// wasn't enough to recognise a busy Thai shopfront). Ordered by rough
// region so lookalikes sit next to each other.
const SCRIPT_SAMPLES = {
  "Latin": { glyphs: "ABc", more: "Street · Straße" },
  "Cyrillic": { glyphs: "БЖД", more: "улица Москва" },
  "Thai": { glyphs: "กสด", more: "สวัสดี ถนน ๑๒๓" },
  "Lao": { glyphs: "ກສດ", more: "ສະບາຍດີ ຖະໜົນ" },
  "Khmer": { glyphs: "កសដ", more: "ភ្នំពេញ សួស្ដី" },
  "Chinese characters": { glyphs: "中文字", more: "北京 上海 路" },
  "Japanese kana": { glyphs: "あのか", more: "こんにちは カナ" },
  "Korean Hangul": { glyphs: "한글", more: "서울 안녕하세요" },
  "Devanagari": { glyphs: "कमल", more: "नमस्ते मार्ग" },
  "Bengali": { glyphs: "বকল", more: "ঢাকা সড়ক" },
  "Tamil": { glyphs: "தமழ", more: "சென்னை வீதி" },
  "Telugu": { glyphs: "తలవ", more: "హైదరాబాద్" },
  "Kannada": { glyphs: "ಕಬಳ", more: "ಬೆಂಗಳೂರು" },
  "Gujarati": { glyphs: "ગમળ", more: "અમદાવાદ" },
  "Sinhala": { glyphs: "සකම", more: "කොළඹ පාර" },
  "Tibetan (Dzongkha)": { glyphs: "ཀཁག", more: "ཐིམ་ཕུག" },
  "Arabic": { glyphs: "ابع", more: "شارع قف" },
  "Hebrew": { glyphs: "אבש", more: "רחוב שלום" },
  "Greek": { glyphs: "αβΩ", more: "Οδός Αθήνα" },
};
const SCRIPT_ORDER = Object.keys(SCRIPT_SAMPLES);

const state = {
  countries: [],
  // category id -> sorted array of option values present in the data
  optionsByCat: new Map(),
  // category id -> Set of currently checked values
  selected: new Map(),
  // category id -> "and" | "or" (mutable for categories with toggle: true)
  matchMode: new Map(),
  collapsed: new Set(),
  // confirmed matches currently eligible for the "What's different?" compare
  compareList: [],
};

function valuesFor(country, cat) {
  const raw = country[cat.col];
  if (raw == null) return [];
  return Array.isArray(raw) ? raw : [raw];
}

async function loadData() {
  const cols = ["code", "name", "region", "flag_code", ...CATEGORIES.map((c) => c.col)];
  const countries = await sb(`countries?select=${cols.join(",")}&order=name`);
  state.countries = countries;

  for (const cat of CATEGORIES) {
    const present = new Set();
    for (const c of countries) for (const v of valuesFor(c, cat)) present.add(v);
    state.optionsByCat.set(cat.id, sortOptions(cat, [...present]));
    state.selected.set(cat.id, new Set());
    state.matchMode.set(cat.id, cat.match);
  }
  state.collapsed = new Set(CATEGORIES.filter((c) => !EXPANDED_BY_DEFAULT.has(c.id)).map((c) => c.id));

  // Restore remembered collapsed/AND-OR preferences (validated against the
  // current category list so stale ids from old versions are dropped).
  const prefs = loadPrefs();
  const validIds = new Set(CATEGORIES.map((c) => c.id));
  if (Array.isArray(prefs.collapsed)) {
    state.collapsed = new Set(prefs.collapsed.filter((id) => validIds.has(id)));
  }
  if (prefs.matchMode && typeof prefs.matchMode === "object") {
    for (const cat of CATEGORIES) {
      const m = prefs.matchMode[cat.id];
      if (cat.toggle && (m === "and" || m === "or")) state.matchMode.set(cat.id, m);
    }
  }
}

function sortOptions(cat, values) {
  if (cat.kind === "road" || cat.kind === "chevron") {
    return values.sort((a, b) => idx(COLOR_ORDER, a) - idx(COLOR_ORDER, b));
  }
  if (cat.kind === "stop") {
    return values.sort((a, b) => {
      const d = idx(STOP_ORDER, a) - idx(STOP_ORDER, b);
      return d !== 0 ? d : a.localeCompare(b);
    });
  }
  if (cat.id === "continents") {
    return values.sort((a, b) => idx(CONTINENT_ORDER, a) - idx(CONTINENT_ORDER, b));
  }
  if (cat.kind === "side") {
    return values.sort((a, b) => idx(["left", "right"], a) - idx(["left", "right"], b));
  }
  if (cat.kind === "script") {
    return values.sort((a, b) => idx(SCRIPT_ORDER, a) - idx(SCRIPT_ORDER, b));
  }
  if (cat.id === "phone_codes") {
    // numeric order: +1, +7, +30, +31 ... +1868
    const num = (v) => parseInt(v.replace(/[^0-9]/g, ""), 10) || 0;
    return values.sort((a, b) => num(a) - num(b));
  }
  if (cat.kind === "currency") {
    // most widely-shared symbols first ($, €, £...), then the distinctive
    // ones, so the common cases are easy to reach.
    const count = (v) => state.countries.filter((c) => valuesFor(c, cat).includes(v)).length;
    return values.sort((a, b) => count(b) - count(a) || a.localeCompare(b, "en"));
  }
  // letters + languages: locale-aware alphabetical
  return values.sort((a, b) => a.localeCompare(b, "en"));
}

function idx(order, v) {
  const i = order.indexOf(v);
  return i === -1 ? order.length : i;
}

// --- Matching --------------------------------------------------------------
// AND across categories. Within a category, OR by default, AND for letters
// (or per the live AND/OR toggle). Two safety layers on top:
//  * A country with NO data for a selected category is "unknown, still
//    possible" — never excluded (unless the category is `complete`
//    knowledge, where empty genuinely means "has none"). Excluding on
//    missing data once silently hid correct answers.
//  * Instead of a bare yes/no, this returns WHICH categories missed — so
//    a country contradicting exactly one clue can be shown as a dimmed
//    near-miss ("differs: edge line") rather than vanishing without
//    trace. One misread clue in-game should never be able to silently
//    remove the correct country.
function evaluateCountry(country) {
  const missCats = [];
  const unknownCats = [];
  let selectedCats = 0;
  for (const cat of CATEGORIES) {
    const selected = state.selected.get(cat.id);
    if (selected.size === 0) continue;
    selectedCats++;

    const values = new Set(valuesFor(country, cat));
    if (values.size === 0) {
      if (cat.complete) missCats.push(cat); // fully-known category: empty = definitely none
      else unknownCats.push(cat); // honest gap → still possible, flagged
      continue;
    }

    let ok;
    if (state.matchMode.get(cat.id) === "and") {
      ok = [...selected].every((v) => values.has(v));
    } else {
      ok = [...selected].some((v) => values.has(v));
    }
    if (!ok) missCats.push(cat);
  }
  return { missCats, unknownCats, selectedCats };
}

function hasAnyFilterSelected() {
  for (const set of state.selected.values()) if (set.size > 0) return true;
  return false;
}

// --- SVG icon builders -----------------------------------------------------
// All inline (no external assets — the extension's CSP blocks those) and
// coloured with the actual clue colour so an option looks like the thing
// it filters for.

function headerIcon(kind) {
  const p = (d) => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  let inner;
  switch (kind) {
    case "side": // steering wheel
      inner = `<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="8" r="1.6" fill="currentColor"/>${p("M8 9.6V14")}${p("M6.6 7 2.4 5.4")}${p("M9.4 7l4.2-1.6")}`;
      break;
    case "pill": // globe
      inner = `<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6"/>${p("M2 8h12")}${p("M8 2c2.2 2 2.2 10 0 12")}${p("M8 2c-2.2 2-2.2 10 0 12")}`;
      break;
    case "stop": // octagon
      inner = `<path d="M5.3 1.8h5.4L14.2 5.3v5.4L10.7 14.2H5.3L1.8 10.7V5.3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`;
      break;
    case "road": // road narrowing to horizon with centre dashes
      inner = `${p("M3 14 6.5 2")}${p("M13 14 9.5 2")}${p("M8 3.5v1.5")}${p("M8 7v1.5")}${p("M8 10.5V12")}`;
      break;
    case "chevron": // curve-warning chevrons
      inner = `${p("M4 3l4 5-4 5")}${p("M8 3l4 5-4 5")}`;
      break;
    case "letter": // "Á"
      inner = `<text x="8" y="12.5" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" font-family="Georgia, serif">Á</text>`;
      break;
    case "script": // "あ"
      inner = `<text x="8" y="12.5" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">あ</text>`;
      break;
    case "signpost": // road-name sign on a post
      inner = `<rect x="2" y="3" width="12" height="5.5" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/>${p("M8 8.5V14")}${p("M5.5 14h5")}`;
      break;
    case "speech": // speech bubble
      inner = `<path d="M2 3.5h12v7H8l-3 3v-3H2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`;
      break;
    case "currency": // banknote with a coin
      inner = `<rect x="1.5" y="4" width="13" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.3"/>`;
      break;
    case "phone": // handset
      inner = `<path d="M3.5 2.5c-.8.8-1 2.3-.3 4 1 2.5 3.8 5.3 6.3 6.3 1.7.7 3.2.5 4-.3l-2.2-2.6-1.9.8c-1.5-.7-2.8-2-3.6-3.6l.8-1.9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`;
      break;
    default:
      inner = "";
  }
  return `<svg class="cat-icon" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">${inner}</svg>`;
}

function optionSvg(cat, value) {
  if (cat.kind === "road") return roadSvg(value, cat.variant);
  if (cat.kind === "chevron") return chevronSvg(value, cat.variant);
  if (cat.kind === "stop") return stopSvg(value);
  if (cat.kind === "side") return sideSvg(value);
  return "";
}

function roadSvg(color, variant) {
  const hex = COLOR_HEX[color];
  const asphalt = `<rect x="1.5" y="1.5" width="37" height="37" rx="6" fill="#3b4252"/>`;
  let lines;
  if (color === "none" || !hex) {
    // no painted line — bare asphalt with a subtle strike-through
    lines = `<line x1="11" y1="29" x2="29" y2="11" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>`;
  } else if (variant === "inner") {
    lines = `<line x1="20" y1="6" x2="20" y2="34" stroke="${hex}" stroke-width="3.4" stroke-dasharray="5 4" stroke-linecap="round"/>`;
  } else {
    lines = `<line x1="9" y1="5" x2="9" y2="35" stroke="${hex}" stroke-width="2.6" stroke-linecap="round"/>` +
            `<line x1="31" y1="5" x2="31" y2="35" stroke="${hex}" stroke-width="2.6" stroke-linecap="round"/>`;
  }
  return `<svg class="opt-svg" viewBox="0 0 40 40" aria-hidden="true">${asphalt}${lines}</svg>`;
}

function chevronSvg(color, variant) {
  const hex = COLOR_HEX[color] || "#94a3b8";
  const bg = variant === "bg" ? hex : "#475569";
  const arrow = variant === "arrow" ? hex : "#cbd5e1";
  const sign = `<rect x="3" y="3" width="34" height="34" rx="5" fill="${bg}" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>`;
  // two chevrons pointing right
  const ch = (dx) =>
    `<polyline points="${13 + dx},11 ${24 + dx},20 ${13 + dx},29" fill="none" stroke="${arrow}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<svg class="opt-svg" viewBox="0 0 40 40" aria-hidden="true">${sign}${ch(-4)}${ch(4)}</svg>`;
}

function stopSvg(text) {
  const oct = `<polygon points="13.4,3 26.6,3 37,13.4 37,26.6 26.6,37 13.4,37 3,26.6 3,13.4" fill="#dc2626" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>`;
  const isCJK = /[぀-ヿ一-鿿가-힯]/.test(text);
  const isRTLorThai = /[؀-ۿ฀-๿]/.test(text);
  let fs;
  if (isCJK) fs = text.length <= 2 ? 15 : 11.5;
  else if (isRTLorThai) fs = 13;
  else if (text.length <= 3) fs = 12;
  else if (text.length === 4) fs = 9.5;
  else if (text.length === 5) fs = 8;
  else if (text.length <= 7) fs = 6.8;
  else fs = 5.8; // BERHENTI

  const label = `<text x="20" y="20" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="${fs}" font-weight="800" font-family="Arial, sans-serif">${escapeXml(text)}</text>`;
  return `<svg class="opt-svg" viewBox="0 0 40 40" aria-hidden="true">${oct}${label}</svg>`;
}

function sideSvg(side) {
  // a road viewed head-on with a car keeping to the correct side
  const carX = side === "left" ? 9 : 22;
  return `<svg class="opt-svg opt-svg-side" viewBox="0 0 40 40" aria-hidden="true">` +
    `<rect x="1.5" y="1.5" width="37" height="37" rx="6" fill="#3b4252"/>` +
    `<line x1="20" y1="5" x2="20" y2="35" stroke="#facc15" stroke-width="2.4" stroke-dasharray="4 4"/>` +
    `<rect x="${carX}" y="14" width="9" height="12" rx="2" fill="#34d399"/>` +
    `<rect x="${carX + 1.5}" y="16" width="6" height="3.5" rx="1" fill="#0f172a"/>` +
    `</svg>`;
}

function escapeXml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// --- Labels ----------------------------------------------------------------
function optionLabel(cat, value) {
  if (cat.kind === "side") return value === "left" ? "Left" : "Right";
  if (cat.kind === "road" || cat.kind === "chevron") {
    return value === "none" ? "No line" : value[0].toUpperCase() + value.slice(1);
  }
  return value; // continents, languages, stop wordings, letters are already display-ready
}

// --- Rendering -------------------------------------------------------------
function renderFilters() {
  const container = document.getElementById("filters");
  container.innerHTML = "";

  for (const cat of CATEGORIES) {
    const options = state.optionsByCat.get(cat.id) ?? [];
    if (options.length === 0) continue; // nothing researched for this category yet

    const section = document.createElement("section");
    section.className = "filter-category";
    section.dataset.catId = cat.id;

    const isCollapsed = state.collapsed.has(cat.id);
    const selectedCount = state.selected.get(cat.id)?.size ?? 0;

    const collapseToggle = () => {
      if (state.collapsed.has(cat.id)) state.collapsed.delete(cat.id);
      else state.collapsed.add(cat.id);
      savePrefs();
      renderFilters();
    };
    const chevron = `<span class="filter-category-chevron">${isCollapsed ? "▸" : "▾"}</span>`;

    const heading = document.createElement("button");
    heading.type = "button";
    heading.className = "filter-category-heading";
    heading.setAttribute("aria-expanded", String(!isCollapsed));
    heading.addEventListener("click", collapseToggle);

    if (cat.toggle) {
      // AND/OR switch sits right next to the title. It's a real button, so
      // the heading (icon + name) shrinks to content and the switch + the
      // collapse chevron follow it in a flex row; the chevron gets its own
      // click target so the whole row still collapses/expands.
      heading.innerHTML = `<span class="heading-left">${headerIcon(cat.icon ?? cat.kind)}<span class="heading-name">${cat.name}${selectedCount ? ` (${selectedCount})` : ""}</span><span class="next-badge" hidden></span></span>`;
      const mode = state.matchMode.get(cat.id);
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "match-toggle";
      toggle.title = "How multiple picks combine: OR = any of them, AND = all must match";
      toggle.innerHTML =
        `<span class="${mode === "or" ? "on" : ""}">OR</span><span class="${mode === "and" ? "on" : ""}">AND</span>`;
      toggle.addEventListener("click", () => {
        state.matchMode.set(cat.id, mode === "or" ? "and" : "or");
        savePrefs();
        renderFilters();
        renderResults();
      });
      const chev = document.createElement("button");
      chev.type = "button";
      chev.className = "filter-category-heading chevron-only";
      chev.setAttribute("aria-label", (isCollapsed ? "Expand " : "Collapse ") + cat.name);
      chev.innerHTML = chevron;
      chev.addEventListener("click", collapseToggle);

      const row = document.createElement("div");
      row.className = "filter-category-row";
      row.append(heading, toggle, chev);
      section.appendChild(row);
    } else {
      heading.innerHTML =
        `<span class="heading-left">${headerIcon(cat.icon ?? cat.kind)}<span class="heading-name">${cat.name}${selectedCount ? ` (${selectedCount})` : ""}</span><span class="next-badge" hidden></span></span>` + chevron;
      section.appendChild(heading);
    }

    if (isCollapsed) {
      container.appendChild(section);
      continue;
    }

    if (cat.hint) {
      const hint = document.createElement("p");
      hint.className = "filter-category-hint";
      hint.textContent = cat.hint;
      section.appendChild(hint);
    }

    // Big lists (languages, currency symbols, road words, letters...) get a
    // quick type-to-filter box. Matches against the option's label and its
    // raw value, so "39" finds "+39" and "jal" finds "Jalan / Jl.".
    let searchBox = null;
    if (options.length >= 16) {
      searchBox = document.createElement("input");
      searchBox.type = "search";
      searchBox.className = "option-search";
      searchBox.placeholder = `Search ${options.length} options…`;
      section.appendChild(searchBox);
    }

    const usesTiles = cat.kind === "letter" || cat.kind === "road" || cat.kind === "chevron" || cat.kind === "stop" || cat.kind === "side" || cat.kind === "script" || cat.kind === "currency";
    const grid = document.createElement("div");
    grid.className = !usesTiles
      ? "filter-options"
      : cat.kind === "side" ? "side-grid"
      : cat.kind === "script" ? "script-grid"
      : cat.kind === "currency" ? "currency-grid"
      : "tile-grid";

    for (const value of options) {
      const label = document.createElement("label");
      const nWith = state.countries.filter((c) => valuesFor(c, cat).includes(value)).length;
      label.title = `${optionLabel(cat, value)} - ${nWith} ${nWith === 1 ? "country" : "countries"}`;
      label.dataset.search = `${optionLabel(cat, value)} ${value}`.toLowerCase();

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = state.selected.get(cat.id).has(value);
      checkbox.addEventListener("change", () => {
        const set = state.selected.get(cat.id);
        if (checkbox.checked) set.add(value);
        else set.delete(value);
        renderResults();
        updateClearButton();
        const name = heading.querySelector(".heading-name");
        name.textContent = cat.name + (set.size ? ` (${set.size})` : "");
      });
      label.appendChild(checkbox);

      if (cat.kind === "letter") {
        label.className = "letter-tile";
        const glyph = document.createElement("span");
        glyph.className = "letter-glyph";
        glyph.textContent = value;
        label.appendChild(glyph);
      } else if (cat.kind === "currency") {
        label.className = "letter-tile currency-tile";
        const glyph = document.createElement("span");
        glyph.className = "currency-glyph";
        if (value.length >= 3) glyph.classList.add("currency-glyph-long");
        glyph.textContent = value;
        label.appendChild(glyph);
      } else if (cat.kind === "side") {
        label.className = "side-tile";
        const wrap = document.createElement("span");
        wrap.className = "side-inner";
        wrap.innerHTML = optionSvg(cat, value) + `<span class="side-label">${optionLabel(cat, value)}</span>`;
        label.appendChild(wrap);
      } else if (cat.kind === "script") {
        label.className = "script-tile";
        const wrap = document.createElement("span");
        wrap.className = "script-inner";
        const sample = SCRIPT_SAMPLES[value];
        const glyphs = document.createElement("span");
        glyphs.className = "script-glyphs";
        glyphs.textContent = sample?.glyphs ?? value.slice(0, 3);
        wrap.appendChild(glyphs);
        if (sample?.more) {
          const more = document.createElement("span");
          more.className = "script-more";
          more.textContent = sample.more;
          wrap.appendChild(more);
        }
        const name = document.createElement("span");
        name.className = "script-name";
        name.textContent = value;
        wrap.appendChild(name);
        label.appendChild(wrap);
      } else if (usesTiles) {
        label.className = "opt-tile";
        const svg = document.createElement("span");
        svg.className = "opt-svg-wrap";
        svg.innerHTML = optionSvg(cat, value);
        label.appendChild(svg);
      } else {
        label.className = "filter-option";
        label.append(optionLabel(cat, value));
      }
      grid.appendChild(label);
    }

    if (searchBox) {
      searchBox.addEventListener("input", () => {
        const q = searchBox.value.trim().toLowerCase();
        for (const label of grid.children) {
          label.style.display = !q || label.dataset.search.includes(q) ? "" : "none";
        }
      });
      // Don't let typing spaces toggle the collapse button via key bubbling.
      searchBox.addEventListener("keydown", (e) => e.stopPropagation());
    }

    section.appendChild(grid);
    container.appendChild(section);
  }

  // Re-applying after a rebuild (collapse/expand wipes the badge elements).
  if (state.lastConfirmed) updateNextBadge(state.lastConfirmed);
  updateToggleAllLabel();
}

// Expand/collapse-all control. The button always offers the action that
// affects the most sections: if anything is open it collapses everything,
// otherwise it expands everything.
function anySectionExpanded() {
  return CATEGORIES.some(
    (c) => (state.optionsByCat.get(c.id)?.length ?? 0) > 0 && !state.collapsed.has(c.id)
  );
}

function updateToggleAllLabel() {
  const btn = document.getElementById("toggle-all");
  if (btn) btn.textContent = anySectionExpanded() ? "Collapse all" : "Expand all";
}

function toggleAllSections() {
  if (anySectionExpanded()) {
    state.collapsed = new Set(CATEGORIES.map((c) => c.id));
  } else {
    state.collapsed = new Set();
  }
  savePrefs();
  renderFilters();
}

function renderResults() {
  // Three tiers:
  //  * confirmed  - every selected clue fits recorded data
  //  * uncertain  - fits everything that IS recorded, but some selected
  //                 clue has no data for this country ("?")
  //  * near-miss  - contradicts exactly ONE selected clue (only shown when
  //                 2+ clues are selected) - the safety net against a
  //                 single misread observation eliminating the answer
  const confirmed = [];
  const uncertain = [];
  let nearMiss = [];
  for (const country of state.countries) {
    const r = evaluateCountry(country);
    if (r.missCats.length === 0 && r.unknownCats.length === 0) confirmed.push(country);
    else if (r.missCats.length === 0) uncertain.push({ country, unknownCats: r.unknownCats });
    else if (r.missCats.length === 1 && r.selectedCats >= 2) nearMiss.push({ country, miss: r.missCats[0] });
  }

  // Near-misses can flood the list (with 2 clues picked, missing either one
  // qualifies). Rank them by how RARE the clues they DID satisfy are - a
  // country that matched a 2-country letter but contradicts a 50-country
  // colour is a serious "did I misread that?" candidate; the reverse is
  // noise - and show only the strongest few, only while the confirmed list
  // is small enough that you're actually deciding.
  if (confirmed.length > 8) {
    nearMiss = [];
  } else if (nearMiss.length > 0) {
    const catMatchCount = new Map();
    for (const cat of CATEGORIES) {
      if (state.selected.get(cat.id).size === 0) continue;
      let n = 0;
      for (const c of state.countries) {
        const values = new Set(valuesFor(c, cat));
        if (values.size === 0) continue;
        const sel = state.selected.get(cat.id);
        const ok = state.matchMode.get(cat.id) === "and"
          ? [...sel].every((v) => values.has(v))
          : [...sel].some((v) => values.has(v));
        if (ok) n++;
      }
      catMatchCount.set(cat.id, n);
    }
    const support = (nm) => {
      let min = Infinity;
      for (const [catId, n] of catMatchCount) {
        if (catId === nm.miss.id) continue;
        if (n < min) min = n;
      }
      return min;
    };
    nearMiss.sort((a, b) => support(a) - support(b));
    nearMiss = nearMiss.slice(0, 8);
  }

  const parts = [`${confirmed.length} of ${state.countries.length} match`];
  if (uncertain.length) parts.push(`${uncertain.length} unknown`);
  if (nearMiss.length) parts.push(`${nearMiss.length} near (1 clue off)`);
  document.getElementById("results-summary").textContent = !hasAnyFilterSelected()
    ? `Showing all ${state.countries.length} - pick filters above to narrow it down`
    : parts.join(" · ");

  // Tie-breaker: when a handful of definite candidates remain, offer the
  // "What's different?" comparison so you know which clue to hunt for.
  state.compareList = confirmed;
  const cmpBtn = document.getElementById("compare-btn");
  const eligible = confirmed.length >= 2 && confirmed.length <= 6;
  cmpBtn.hidden = !eligible;
  // Keep an open overlay live as filters change; close it once it no longer applies.
  const overlay = document.getElementById("compare-overlay");
  if (!overlay.hidden) {
    if (eligible) renderCompare();
    else closeCompare();
  }

  state.lastConfirmed = confirmed;
  updateNextBadge(confirmed);

  const list = document.getElementById("results");
  list.innerHTML = "";
  list.classList.remove("has-open-card");

  const rows = [
    ...confirmed.map((country) => ({ country })),
    ...uncertain,
    ...nearMiss,
  ];

  if (rows.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No matches for this combination.";
    list.appendChild(li);
    return;
  }

  for (const row of rows) {
    const country = row.country;
    const li = document.createElement("li");
    li.className = "result-row";
    li.title = `${country.name} - click to see its recorded clues`;
    if (row.unknownCats) {
      li.classList.add("uncertain");
      li.title = `${country.name} - no data yet for: ${row.unknownCats.map((c) => c.name).join(", ")}. Click to see its recorded clues.`;
    } else if (row.miss) {
      li.classList.add("nearmiss");
      li.title = `${country.name} - contradicts your ${row.miss.name} pick, all other clues fit. Click to see its recorded clues.`;
    }
    li.addEventListener("click", () => toggleClueCard(li, country));

    const img = document.createElement("img");
    img.alt = "";
    img.src = flagUrl(country.code, country.flag_code);
    img.addEventListener("error", () => {
      if (!img.dataset.retried) {
        img.dataset.retried = "1";
        setTimeout(() => {
          img.src = `${flagUrl(country.code, country.flag_code)}?retry`;
        }, 300 + Math.random() * 500);
      } else {
        img.style.visibility = "hidden";
      }
    });
    li.appendChild(img);

    const span = document.createElement("span");
    span.className = "cname";
    span.textContent = country.name;
    li.appendChild(span);

    if (row.miss) {
      const note = document.createElement("span");
      note.className = "miss-note";
      note.textContent = `≠ ${row.miss.name}`;
      li.appendChild(note);
    } else if (row.unknownCats) {
      const q = document.createElement("span");
      q.className = "uncertain-badge";
      q.textContent = "?";
      li.appendChild(q);
    }

    const link = document.createElement("button");
    link.type = "button";
    link.className = "row-link";
    link.title = `Open ${country.name} on Meta Lineup`;
    link.innerHTML = `<svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M4.5 2H2v8h8V7.5M7 2h3v3M10 2 5.5 6.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    link.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(`${SITE_URL}/country/${country.code}`, "_blank", "noopener");
    });
    li.appendChild(link);

    list.appendChild(li);
  }
}

// --- "Check this next" guidance ---------------------------------------------
// Among the categories with nothing selected, find the one whose clue would
// narrow the current confirmed candidates the most, pessimistically: a
// candidate with no data for the category survives any observation, so it
// counts against every outcome. Badge that category's heading.
// Preferred order to suggest clues in - roughly how you actually read a
// scene: side of driving, then continent, then the road lines, then the
// language/script. Anything not listed is considered afterwards in its
// normal order. Within this, only categories that would ACTUALLY narrow
// the current candidates are eligible, so a clue that can't split them
// (e.g. everyone left drives on the same side) is skipped to the next.
const NEXT_PRIORITY = [
  "driving_side",
  "continents",
  "road_line_color_inner",
  "road_line_color_outer",
  "languages",
  "scripts",
];

function updateNextBadge(cands) {
  for (const b of document.querySelectorAll(".next-badge")) b.hidden = true;
  if (!cands || cands.length < 2) return;

  // Would this category split the candidates, and what's the worst case?
  const splitInfo = (cat) => {
    if (state.selected.get(cat.id).size > 0) return null;
    const groups = new Map();
    let unknown = 0;
    for (const c of cands) {
      const vals = [...new Set(valuesFor(c, cat))].sort();
      if (vals.length === 0) { unknown++; continue; }
      const sig = vals.join("|");
      groups.set(sig, (groups.get(sig) ?? 0) + 1);
    }
    if (groups.size < 2) return null;
    const worst = Math.max(...groups.values()) + unknown;
    if (worst >= cands.length) return null; // wouldn't actually narrow
    return { worst, nGroups: groups.size };
  };

  // 1. First eligible category in the preferred order.
  let pick = null;
  for (const id of NEXT_PRIORITY) {
    const cat = CATEGORIES.find((c) => c.id === id);
    const info = cat && splitInfo(cat);
    if (info) { pick = { cat, ...info }; break; }
  }

  // 2. Fall back to the most decisive of the remaining categories.
  if (!pick) {
    for (const cat of CATEGORIES) {
      if (NEXT_PRIORITY.includes(cat.id)) continue;
      const info = splitInfo(cat);
      if (!info) continue;
      if (!pick || info.worst < pick.worst || (info.worst === pick.worst && info.nGroups > pick.nGroups)) {
        pick = { cat, ...info };
      }
    }
  }
  if (!pick) return;

  const badge = document.querySelector(`.filter-category[data-cat-id="${pick.cat.id}"] .next-badge`);
  if (badge) {
    badge.hidden = false;
    badge.textContent = "check next";
    badge.title = `Best clue to check next - worst case leaves ${pick.worst} of the ${cands.length} candidates.`;
  }
}

// --- Inline clue cards -------------------------------------------------------
// Click a result row to unfold that country's full recorded clue profile
// right in the panel - no site visit needed to sanity-check a guess.
function clueCard(country) {
  const card = document.createElement("div");
  card.className = "clue-card";
  let html = "";
  for (const cat of CATEGORIES) {
    const vals = sortOptions(cat, [...new Set(valuesFor(country, cat))]);
    if (vals.length === 0) continue;
    html +=
      `<div class="cc-row"><span class="cc-cat">${headerIcon(cat.icon ?? cat.kind)}<span>${cat.name}</span></span>` +
      `<span class="cmp-chips">${compareValueChips(cat, vals, new Set())}</span></div>`;
  }
  card.innerHTML = html || `<div class="cc-none">No clue data recorded yet.</div>`;
  return card;
}

function toggleClueCard(li, country) {
  const wasOpen = !!li.querySelector(".clue-card");
  for (const open of document.querySelectorAll("#results .clue-card")) {
    open.parentElement.classList.remove("card-open");
    open.remove();
  }
  const list = document.getElementById("results");
  if (wasOpen) {
    list.classList.remove("has-open-card");
    return;
  }
  li.classList.add("card-open");
  li.appendChild(clueCard(country));
  list.classList.add("has-open-card");
}

// --- Tie-breaker "What's different?" overlay --------------------------------
// Given the 2-6 confirmed candidates, show only the categories where they
// DIFFER, and within each, highlight the value(s) unique to one country -
// that's the clue to hunt for in-game to break the 50/50.

function arraysEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function compareValueChips(cat, values, uniqueSet) {
  if (values.length === 0) return `<span class="cmp-none">no data</span>`;
  return values
    .map((v) => {
      const uniq = uniqueSet.has(v) ? " cmp-uniq" : "";
      let dot = "";
      if (cat.kind === "road" || cat.kind === "chevron") {
        const hex = COLOR_HEX[v];
        dot = hex
          ? `<span class="cmp-dot" style="background:${hex}"></span>`
          : `<span class="cmp-dot cmp-dot-none"></span>`;
      }
      return `<span class="cmp-chip${uniq}">${dot}${escapeXml(optionLabel(cat, v))}</span>`;
    })
    .join("");
}

function renderCompare() {
  const countries = state.compareList;
  const overlay = document.getElementById("compare-overlay");
  if (countries.length < 2) {
    overlay.hidden = true;
    return;
  }

  const rows = [];
  const shared = [];
  for (const cat of CATEGORIES) {
    const perCountry = countries.map((c) => sortOptions(cat, [...new Set(valuesFor(c, cat))]));
    if (perCountry.every((v) => v.length === 0)) continue; // nothing recorded
    const allSame = perCountry.every((v) => arraysEqual(v, perCountry[0]));
    if (allSame) { shared.push(cat.name); continue; }
    rows.push({ cat, perCountry });
  }

  const flag = (c) => `<img class="cmp-flag" src="${flagUrl(c.code, c.flag_code)}" alt="" />`;

  let body;
  if (rows.length === 0) {
    body = `<p class="cmp-empty">These share every recorded clue - the data can't separate them.</p>`;
  } else {
    body = rows
      .map(({ cat, perCountry }) => {
        // a value is a giveaway if exactly one candidate has it
        const counts = new Map();
        for (const vals of perCountry) for (const v of vals) counts.set(v, (counts.get(v) ?? 0) + 1);
        const cells = countries
          .map((c, i) => {
            const uniqueSet = new Set(perCountry[i].filter((v) => counts.get(v) === 1));
            return `<div class="cmp-country">${flag(c)}<span class="cmp-cname">${escapeXml(c.name)}</span>` +
              `<span class="cmp-chips">${compareValueChips(cat, perCountry[i], uniqueSet)}</span></div>`;
          })
          .join("");
        return `<div class="cmp-row"><div class="cmp-cat">${headerIcon(cat.icon ?? cat.kind)}<span>${cat.name}</span></div>${cells}</div>`;
      })
      .join("");
  }

  const sharedNote = shared.length
    ? `<p class="cmp-shared">Same across all: ${shared.join(", ")}.</p>`
    : "";

  overlay.innerHTML =
    `<div class="cmp-card">` +
    `<div class="cmp-head"><span>What's different? <span class="cmp-count">${countries.length} candidates</span></span>` +
    `<button type="button" class="cmp-close" aria-label="Close">✕</button></div>` +
    `<p class="cmp-sub">Highlighted values are unique to one country - spot that clue to break the tie.</p>` +
    `<div class="cmp-body">${body}${sharedNote}</div>` +
    `</div>`;

  overlay.querySelector(".cmp-close").addEventListener("click", closeCompare);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeCompare(); });
  overlay.hidden = false;
}

function closeCompare() {
  document.getElementById("compare-overlay").hidden = true;
}

function updateClearButton() {
  document.getElementById("clear-btn").disabled = !hasAnyFilterSelected();
}

function clearFilters() {
  for (const set of state.selected.values()) set.clear();
  renderFilters();
  renderResults();
  updateClearButton();
}

async function init() {
  try {
    await loadData();
    document.getElementById("status").hidden = true;
    document.getElementById("app").hidden = false;
    renderFilters();
    renderResults();
    updateClearButton();
    document.getElementById("clear-btn").addEventListener("click", clearFilters);
    document.getElementById("toggle-all").addEventListener("click", toggleAllSections);
    document.getElementById("compare-btn").addEventListener("click", renderCompare);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCompare(); });
  } catch (err) {
    document.getElementById("status").textContent = `Couldn't load filter data: ${err.message}`;
  }
}

init();
