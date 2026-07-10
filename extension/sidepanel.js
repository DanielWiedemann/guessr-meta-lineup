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
  { id: "road_line_color_inner", col: "road_line_color_inner", name: "Centre line colour", kind: "road", variant: "inner", match: "or",
    hint: "Colour of the middle dividing line." },
  { id: "road_line_color_outer", col: "road_line_color_outer", name: "Edge line colour", kind: "road", variant: "outer", match: "or",
    hint: "Colour of the outer edge lines." },
  { id: "stop_sign_wording", col: "stop_sign_wording", name: "Stop sign", kind: "stop", match: "or",
    hint: "The word (or script) printed on the stop sign." },
  { id: "chevron_bg_color", col: "chevron_bg_color", name: "Chevron background", kind: "chevron", variant: "bg", match: "or",
    hint: "Background colour of curve-warning chevrons." },
  { id: "chevron_arrow_color", col: "chevron_arrow_color", name: "Chevron arrow", kind: "chevron", variant: "arrow", match: "or",
    hint: "Arrow colour on curve-warning chevrons." },
  { id: "languages", col: "languages", name: "Language", kind: "pill", icon: "speech", match: "or", toggle: true,
    hint: "A language spoken here. OR = any of them; AND = all must be spoken." },
  { id: "scripts", col: "scripts", name: "Writing script", kind: "script", match: "or",
    hint: "Recognise the alphabet by its shape, even if you can't read it." },
  { id: "special_letters_latin", col: "special_letters_latin", name: "Special letters (Latin)", kind: "letter", match: "and",
    hint: "Accented / extra Latin letters. Picking several needs ALL to appear." },
  { id: "special_letters_cyrillic", col: "special_letters_cyrillic", name: "Cyrillic letters", kind: "letter", match: "and",
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

// Writing scripts: sample glyphs so the tile shows the alphabet's *shape*
// (the thing you actually recognise in-game), with the name underneath.
// Ordered by rough region so lookalikes sit next to each other.
const SCRIPT_SAMPLES = {
  "Latin": "ABc",
  "Cyrillic": "БЖД",
  "Thai": "กสด",
  "Lao": "ກສດ",
  "Khmer": "កសដ",
  "Chinese characters": "中文字",
  "Japanese kana": "あのか",
  "Korean Hangul": "한글",
  "Devanagari": "कमल",
  "Bengali": "বকল",
  "Tamil": "தமழ",
  "Telugu": "తలవ",
  "Kannada": "ಕಬಳ",
  "Gujarati": "ગમળ",
  "Sinhala": "සකම",
  "Tibetan (Dzongkha)": "ཀཁག",
  "Arabic": "ابع",
  "Hebrew": "אבש",
  "Greek": "αβΩ",
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
  // letters + languages: locale-aware alphabetical
  return values.sort((a, b) => a.localeCompare(b, "en"));
}

function idx(order, v) {
  const i = order.indexOf(v);
  return i === -1 ? order.length : i;
}

// --- Matching --------------------------------------------------------------
// AND across categories. Within a category, OR by default, AND for letters.
// Critically: a country with NO data for a selected category is treated as
// "unknown, still possible" — never excluded. Excluding on missing data is
// what silently dropped correct answers (Australia had no road-line colour,
// so selecting any colour wrongly hid it). Countries kept only via such a
// gap are returned as "uncertain" so the UI can dim them and list them
// after the confirmed matches instead of flooding the list.
function matchesFilters(country) {
  let uncertain = false;
  for (const cat of CATEGORIES) {
    const selected = state.selected.get(cat.id);
    if (selected.size === 0) continue;

    const values = new Set(valuesFor(country, cat));
    if (values.size === 0) {
      uncertain = true; // honest gap → still possible, but flagged
      continue;
    }

    if (state.matchMode.get(cat.id) === "and") {
      for (const v of selected) if (!values.has(v)) return "no";
    } else {
      let ok = false;
      for (const v of selected) if (values.has(v)) { ok = true; break; }
      if (!ok) return "no";
    }
  }
  return uncertain ? "uncertain" : "match";
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

    const isCollapsed = state.collapsed.has(cat.id);
    const selectedCount = state.selected.get(cat.id)?.size ?? 0;

    const collapseToggle = () => {
      if (state.collapsed.has(cat.id)) state.collapsed.delete(cat.id);
      else state.collapsed.add(cat.id);
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
      heading.innerHTML = `<span class="heading-left">${headerIcon(cat.icon ?? cat.kind)}<span class="heading-name">${cat.name}${selectedCount ? ` (${selectedCount})` : ""}</span></span>`;
      const mode = state.matchMode.get(cat.id);
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "match-toggle";
      toggle.title = "How multiple picks combine: OR = any of them, AND = all must match";
      toggle.innerHTML =
        `<span class="${mode === "or" ? "on" : ""}">OR</span><span class="${mode === "and" ? "on" : ""}">AND</span>`;
      toggle.addEventListener("click", () => {
        state.matchMode.set(cat.id, mode === "or" ? "and" : "or");
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
        `<span class="heading-left">${headerIcon(cat.icon ?? cat.kind)}<span class="heading-name">${cat.name}${selectedCount ? ` (${selectedCount})` : ""}</span></span>` + chevron;
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

    const usesTiles = cat.kind === "letter" || cat.kind === "road" || cat.kind === "chevron" || cat.kind === "stop" || cat.kind === "side" || cat.kind === "script";
    const grid = document.createElement("div");
    grid.className = !usesTiles
      ? "filter-options"
      : cat.kind === "side" ? "side-grid"
      : cat.kind === "script" ? "script-grid"
      : "tile-grid";

    for (const value of options) {
      const label = document.createElement("label");
      label.title = optionLabel(cat, value);

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
        const glyphs = document.createElement("span");
        glyphs.className = "script-glyphs";
        glyphs.textContent = SCRIPT_SAMPLES[value] ?? value.slice(0, 3);
        const name = document.createElement("span");
        name.className = "script-name";
        name.textContent = value;
        wrap.append(glyphs, name);
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

    section.appendChild(grid);
    container.appendChild(section);
  }
}

function renderResults() {
  const confirmed = [];
  const uncertain = [];
  for (const country of state.countries) {
    const verdict = matchesFilters(country);
    if (verdict === "match") confirmed.push(country);
    else if (verdict === "uncertain") uncertain.push(country);
  }
  const matching = [...confirmed, ...uncertain.map((c) => ({ ...c, _uncertain: true }))];

  document.getElementById("results-summary").textContent = !hasAnyFilterSelected()
    ? `Showing all ${state.countries.length} - pick filters above to narrow it down`
    : uncertain.length > 0
      ? `${confirmed.length} of ${state.countries.length} match · ${uncertain.length} unknown (no data yet)`
      : `${confirmed.length} of ${state.countries.length} possible matches`;

  const list = document.getElementById("results");
  list.innerHTML = "";

  if (matching.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No matches for this combination.";
    list.appendChild(li);
    return;
  }

  for (const country of matching) {
    const li = document.createElement("li");
    if (country._uncertain) {
      li.className = "uncertain";
      li.title = "No data yet for one of your selected clues - still possible, not confirmed.";
    }

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
    span.textContent = country.name;
    li.appendChild(span);

    if (country._uncertain) {
      const q = document.createElement("span");
      q.className = "uncertain-badge";
      q.textContent = "?";
      li.appendChild(q);
    }

    list.appendChild(li);
  }
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
  } catch (err) {
    document.getElementById("status").textContent = `Couldn't load filter data: ${err.message}`;
  }
}

init();
