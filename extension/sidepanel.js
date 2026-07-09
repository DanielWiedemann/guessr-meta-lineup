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
}

// A country matches if, for every category with at least one option
// checked, it carries at least one of the checked options in that
// category (OR within a category, AND across categories).
function matchesFilters(countryCode) {
  const tags = state.tagsByCountry.get(countryCode) ?? new Set();
  for (const selectedOptions of state.selected.values()) {
    if (selectedOptions.size === 0) continue;
    let matchedThisCategory = false;
    for (const optionId of selectedOptions) {
      if (tags.has(optionId)) {
        matchedThisCategory = true;
        break;
      }
    }
    if (!matchedThisCategory) return false;
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

    const heading = document.createElement("h2");
    heading.textContent = category.name;
    section.appendChild(heading);

    const isLetterCategory = LETTER_CATEGORY_IDS.has(category.id);
    const optionsList = document.createElement("div");
    optionsList.className = isLetterCategory ? "letter-grid" : "filter-options";

    const optionsForCategory = state.options.filter((o) => o.category_id === category.id);
    for (const option of optionsForCategory) {
      const label = document.createElement("label");
      label.className = isLetterCategory ? "letter-tile" : "filter-option";
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
        const glyph = document.createElement("span");
        glyph.className = "letter-glyph";
        glyph.textContent = option.label;
        label.appendChild(glyph);
      } else {
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
