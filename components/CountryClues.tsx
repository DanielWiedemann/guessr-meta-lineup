import type { CountryClues } from "@/data/countryClues";

const COLOR_HEX: Record<string, string> = {
  white: "#f8fafc",
  yellow: "#facc15",
  black: "#18181b",
  red: "#ef4444",
  blue: "#3b82f6",
  burgundy: "#7f1d3b",
};

// Sample glyphs + a line of real sign-style text per writing script, so the
// script "image" reads the way it does in-game (mirrors the extension).
const SCRIPT_SAMPLE: Record<string, string> = {
  Latin: "Aa",
  Cyrillic: "Бб",
  Thai: "สวัสดี",
  Lao: "ສະບາຍ",
  Khmer: "សួស្ដី",
  "Chinese characters": "北京路",
  "Japanese kana": "こんにち",
  "Korean Hangul": "안녕",
  Devanagari: "नमस्ते",
  Bengali: "ঢাকা",
  Tamil: "வணக்கம்",
  Telugu: "నమస్తే",
  Kannada: "ನಮಸ್ಕಾರ",
  Gujarati: "નમસ્તે",
  Sinhala: "ආයුබෝ",
  "Tibetan (Dzongkha)": "བཀྲ་ཤིས",
  Arabic: "شارع",
  Hebrew: "רחוב",
  Greek: "Οδός",
};

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Chip({ children, big }: { children: React.ReactNode; big?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 ${
        big ? "text-base font-semibold text-slate-100" : "text-sm text-slate-200"
      }`}
    >
      {children}
    </span>
  );
}

function ColorChip({ color }: { color: string }) {
  if (color === "none") {
    return (
      <Chip>
        <span
          className="h-3 w-3 rounded-full border border-slate-600"
          style={{
            background:
              "repeating-linear-gradient(45deg,#334155,#334155 2px,#0b1120 2px,#0b1120 4px)",
          }}
        />
        No line
      </Chip>
    );
  }
  return (
    <Chip>
      <span
        className="h-3 w-3 rounded-full border border-black/30 ring-1 ring-white/10"
        style={{ background: COLOR_HEX[color] ?? "#64748b" }}
      />
      {cap(color)}
    </Chip>
  );
}

function StopSign({ text }: { text: string }) {
  const cjk = /[぀-ヿ一-鿿가-힯]/.test(text);
  const wide = /[؀-ۿ฀-๿]/.test(text);
  const fs = cjk ? (text.length <= 2 ? 14 : 11) : wide ? 12 : text.length <= 3 ? 12 : text.length <= 5 ? 8.5 : 6.5;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-sm text-slate-200">
      <svg viewBox="0 0 40 40" width="22" height="22" aria-hidden="true">
        <polygon
          points="13.4,3 26.6,3 37,13.4 37,26.6 26.6,37 13.4,37 3,26.6 3,13.4"
          fill="#dc2626"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <text
          x="20"
          y="20"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={fs}
          fontWeight="800"
          fontFamily="Arial, sans-serif"
        >
          {text}
        </text>
      </svg>
      {text}
    </span>
  );
}

function ChevronSign({ bg, arrow }: { bg: string; arrow: string }) {
  const bgHex = COLOR_HEX[bg] ?? "#475569";
  const arrowHex = COLOR_HEX[arrow] ?? "#e2e8f0";
  return (
    <svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true" className="shrink-0">
      <rect x="3" y="3" width="34" height="34" rx="5" fill={bgHex} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      {[-4, 4].map((dx) => (
        <polyline
          key={dx}
          points={`${13 + dx},11 ${24 + dx},20 ${13 + dx},29`}
          fill="none"
          stroke={arrowHex}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

function ClueRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:gap-4">
      <div className="w-40 shrink-0 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function CountryClues({ clues }: { clues: CountryClues }) {
  const rows: React.ReactNode[] = [];

  if (clues.driving_side) {
    rows.push(
      <ClueRow key="drive" label="Drives on">
        <Chip>{cap(clues.driving_side)}-hand side</Chip>
      </ClueRow>
    );
  }
  if (clues.continents.length) {
    rows.push(
      <ClueRow key="cont" label="Continent">
        {clues.continents.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </ClueRow>
    );
  }
  if (clues.languages.length) {
    rows.push(
      <ClueRow key="lang" label="Language">
        {clues.languages.map((l) => (
          <Chip key={l}>{l}</Chip>
        ))}
      </ClueRow>
    );
  }
  if (clues.scripts.length) {
    rows.push(
      <ClueRow key="script" label="Writing script">
        {clues.scripts.map((s) => (
          <Chip key={s} big>
            {SCRIPT_SAMPLE[s] && (
              <span className="text-lg leading-none text-emerald-300">{SCRIPT_SAMPLE[s]}</span>
            )}
            <span className="text-sm font-normal text-slate-300">{s}</span>
          </Chip>
        ))}
      </ClueRow>
    );
  }
  if (clues.special_letters_latin.length) {
    rows.push(
      <ClueRow key="latin" label="Special letters">
        {clues.special_letters_latin.map((l) => (
          <Chip key={l} big>
            {l}
          </Chip>
        ))}
      </ClueRow>
    );
  }
  if (clues.special_letters_cyrillic.length) {
    rows.push(
      <ClueRow key="cyr" label="Cyrillic letters">
        {clues.special_letters_cyrillic.map((l) => (
          <Chip key={l} big>
            {l}
          </Chip>
        ))}
      </ClueRow>
    );
  }
  if (clues.currency_symbols.length) {
    rows.push(
      <ClueRow key="cur" label="Currency symbol">
        {clues.currency_symbols.map((s) => (
          <Chip key={s} big>
            {s}
          </Chip>
        ))}
      </ClueRow>
    );
  }
  if (clues.phone_codes.length) {
    rows.push(
      <ClueRow key="phone" label="Phone code">
        {clues.phone_codes.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </ClueRow>
    );
  }
  if (clues.stop_sign_wording.length) {
    rows.push(
      <ClueRow key="stop" label="Stop sign">
        {clues.stop_sign_wording.map((w) => (
          <StopSign key={w} text={w} />
        ))}
      </ClueRow>
    );
  }
  if (clues.road_line_color_inner.length) {
    rows.push(
      <ClueRow key="inner" label="Center line">
        {clues.road_line_color_inner.map((c) => (
          <ColorChip key={c} color={c} />
        ))}
      </ClueRow>
    );
  }
  if (clues.road_line_color_outer.length) {
    rows.push(
      <ClueRow key="outer" label="Edge line">
        {clues.road_line_color_outer.map((c) => (
          <ColorChip key={c} color={c} />
        ))}
      </ClueRow>
    );
  }
  if (clues.chevron_bg_color.length || clues.chevron_arrow_color.length) {
    const bgs = clues.chevron_bg_color.length ? clues.chevron_bg_color : ["black"];
    const arrow = clues.chevron_arrow_color[0] ?? "white";
    rows.push(
      <ClueRow key="chev" label="Chevron">
        {bgs.map((bg) => (
          <span key={bg} className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-2 py-1 text-sm text-slate-200">
            <ChevronSign bg={bg} arrow={arrow} />
            {cap(bg)}
          </span>
        ))}
        {clues.chevron_arrow_color.length > 0 && (
          <span className="self-center text-xs text-slate-500">
            arrow: {clues.chevron_arrow_color.map(cap).join(", ")}
          </span>
        )}
      </ClueRow>
    );
  }
  if (clues.road_name_words.length) {
    rows.push(
      <ClueRow key="roadword" label="Road name words">
        {clues.road_name_words.map((w) => (
          <Chip key={w}>{w}</Chip>
        ))}
      </ClueRow>
    );
  }

  if (rows.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Clues at a glance</h2>
        <span className="text-xs text-slate-600">Filter data</span>
      </div>
      <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900 px-4">
        {rows}
      </div>
    </section>
  );
}
