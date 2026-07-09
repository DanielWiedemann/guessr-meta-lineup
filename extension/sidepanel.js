const SUPABASE_URL = "https://ofiiluzxhnyzkbjlqfgk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_AfMMFkL2mEu48zpi1HjowQ_HYt511A3";

async function sb(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Supabase request failed (${res.status})`);
  return res.json();
}

function flagUrl(code, flagCode) {
  return `https://www.worldometers.info/images/flags/w240/${flagCode || code}.webp`;
}

// These categories render as a grid of single-letter tiles instead of the
// usual pill checkboxes — one click selects, another deselects, and any
// number can be active at once.
const LETTER_CATEGORY_IDS = new Set(["special_letters_latin", "special_letters_cyrillic"]);

// These categories render as actual color swatches instead of a text
// label naming the color.
const COLOR_CATEGORY_IDS = new Set(["road_line_color", "chevron_bg_color", "chevron_arrow_color"]);

// Every category starts collapsed except this one, since it's the
// fastest, most universal clue to check first.
const EXPANDED_BY_DEFAULT = new Set(["side_of_driving"]);

// label (lowercased) -> CSS color. Anything not listed here (e.g. "Varies
// (state/province)") falls back to a striped pattern instead of a color.
const COLOR_SWATCHES = {
  white: "#f8fafc",
  yellow: "#facc15",
  black: "#18181b",
  blue: "#3b82f6",
  red: "#ef4444",
  burgundy: "#7f1d3b",
};

const state = {
  countries: [],
  categories: [],
  options: [],
  // country_code -> Set<filter_option_id>
  tagsByCountry: new Map(),
  // category_id -> Set<filter_option_id> currently checked
  selected: new Map(),
};

async function loadData() {
  const [countries, categories, options, tags] = await Promise.all([
    sb("countries?select=code,name,region,flag_code&order=name"),
    sb("filter_categories?select=id,name,description,sort_order&order=sort_order"),
    sb("filter_options?select=id,category_id,label,sort_order&order=sort_order"),
    sb("country_filter_tags?select=country_code,filter_option_id"),
  ]);

  state.countries = countries;
  state.categories = categories;
  state.options = options;

  state.tagsByCountry = new Map();
  for (const tag of tags) {
    if (!state.tagsByCountry.has(tag.country_code)) {
      state.tagsByCountry.set(tag.country_code, new Set());
    }
    state.tagsByCountry.get(tag.country_code).add(tag.filter_option_id);
  }

  state.selected = new Map(categories.map((c) => [c.id, new Set()]));
  state.collapsed = new Set(categories.filter((c) => !EXPANDED_BY_DEFAULT.has(c.id)).map((c) => c.id));
}

// A country matches if, for every category with at least one option
// checked, it satisfies that category's tags — AND across categories
// always. Within a category it's normally OR (any checked option is
// enough — useful when two colors look similar and you're unsure), except
// the letter categories, where it's AND (you're describing letters you
// saw together in the same word/sign, so the country's alphabet must
// contain all of them).
function matchesFilters(countryCode) {
  const tags = state.tagsByCountry.get(countryCode) ?? new Set();
  for (const [categoryId, selectedOptions] of state.selected) {
    if (selectedOptions.size === 0) continue;
    if (LETTER_CATEGORY_IDS.has(categoryId)) {
      for (const optionId of selectedOptions) {
        if (!tags.has(optionId)) return false;
      }
    } else {
      let matchedThisCategory = false;
      for (const optionId of selectedOptions) {
        if (tags.has(optionId)) {
          matchedThisCategory = true;
          break;
        }
      }
      if (!matchedThisCategory) return false;
    }
  }
  return true;
}

function hasAnyFilterSelected() {
  for (const set of state.selected.values()) {
    if (set.size > 0) return true;
  }
  return false;
}

function renderFilters() {
  const container = document.getElementById("filters");
  container.innerHTML = "";

  for (const category of state.categories) {
    const section = document.createElement("section");
    section.className = "filter-category";

    const isCollapsed = state.collapsed.has(category.id);
    const selectedCount = state.selected.get(category.id)?.size ?? 0;

    const heading = document.createElement("button");
    heading.type = "button";
    heading.className = "filter-category-heading";
    heading.setAttribute("aria-expanded", String(!isCollapsed));

    const headingText = document.createElement("span");
    headingText.textContent = category.name + (selectedCount > 0 ? ` (${selectedCount})` : "");
    heading.appendChild(headingText);

    const chevron = document.createElement("span");
    chevron.className = "filter-category-chevron";
    chevron.textContent = isCollapsed ? "▸" : "▾";
    heading.appendChild(chevron);

    heading.addEventListener("click", () => {
      if (state.collapsed.has(category.id)) state.collapsed.delete(category.id);
      else state.collapsed.add(category.id);
      renderFilters();
    });
    section.appendChild(heading);

    if (isCollapsed) {
      container.appendChild(section);
      continue;
    }

    const isLetterCategory = LETTER_CATEGORY_IDS.has(category.id);
    const isColorCategory = COLOR_CATEGORY_IDS.has(category.id);
    if (isLetterCategory && category.description) {
      const hint = document.createElement("p");
      hint.className = "filter-category-hint";
      hint.textContent = category.description;
      section.appendChild(hint);
    }
    const optionsList = document.createElement("div");
    optionsList.className = isLetterCategory || isColorCategory ? "tile-grid" : "filter-options";

    const optionsForCategory = state.options.filter((o) => o.category_id === category.id);
    for (const option of optionsForCategory) {
      const label = document.createElement("label");
      label.title = option.label;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = state.selected.get(category.id).has(option.id);
      checkbox.addEventListener("change", () => {
        const set = state.selected.get(category.id);
        if (checkbox.checked) set.add(option.id);
        else set.delete(option.id);
        renderResults();
        updateClearButton();
      });

      label.appendChild(checkbox);
      if (isLetterCategory) {
        label.className = "letter-tile";
        const glyph = document.createElement("span");
        glyph.className = "letter-glyph";
        glyph.textContent = option.label;
        label.appendChild(glyph);
      } else if (isColorCategory) {
        label.className = "color-swatch";
        const swatch = COLOR_SWATCHES[option.label.toLowerCase()];
        if (swatch) {
          label.style.background = swatch;
        } else {
          label.classList.add("color-swatch-varies");
        }
        const check = document.createElement("span");
        check.className = "color-swatch-check";
        check.textContent = "✓";
        label.appendChild(check);
      } else {
        label.className = "filter-option";
        label.append(option.label);
      }
      optionsList.appendChild(label);
    }

    section.appendChild(optionsList);
    container.appendChild(section);
  }
}

function renderResults() {
  const matching = state.countries.filter((c) => matchesFilters(c.code));

  document.getElementById("results-summary").textContent = hasAnyFilterSelected()
    ? `${matching.length} of ${state.countries.length} countries match`
    : `Showing all ${state.countries.length} countries — pick filters below to narrow it down`;

  const list = document.getElementById("results");
  list.innerHTML = "";

  if (matching.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No countries match this combination.";
    list.appendChild(li);
    return;
  }

  for (const country of matching) {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = flagUrl(country.code, country.flag_code);
    img.alt = "";
    li.appendChild(img);

    const span = document.createElement("span");
    span.textContent = country.name;
    li.appendChild(span);

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
