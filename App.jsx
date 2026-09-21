import React, { useState, useEffect, useRef } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');`;

const PHONE = "774 301 940";
const PHONE_TEL = "+420774301940";
const EMAIL = "horakk.leo@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Zájem o 10minutovou ukázku R1 Service"
)}&body=${encodeURIComponent(
  "Dobrý den, měl bych zájem o 10minutovou ukázku R1 Service. Prosím o návrh termínu."
)}`;

const INK = "#14171A";
const INK_SOFT = "#5B5F5A";
const BORDER = "#E4E4DE";
const BG = "#F6F6F3";
const ACCENT = "#2454FF";
const ACCENT_DEEP = "#0F172A";
const DARK = "#12151A";
const DARK_BORDER = "#262B33";
const DARK_TEXT_SOFT = "#9AA0A8";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.6s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.6s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(14px)",
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ n, children, dark = false }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="text-[12px] tabular-nums"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          color: dark ? "#5C8DFF" : ACCENT,
        }}
      >
        {n}
      </span>
      <span
        className="w-8 h-px"
        style={{ background: dark ? DARK_BORDER : BORDER }}
      />
      <span
        className="text-[12px] tracking-[0.14em] uppercase"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          color: dark ? DARK_TEXT_SOFT : INK_SOFT,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function PrimaryButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] text-[15px] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-90 ${className}`}
      style={{ fontFamily: "'Inter', sans-serif", background: ACCENT, color: "#FFFFFF" }}
    >
      {children}
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M3 7.5H12M12 7.5L8 3.5M12 7.5L8 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function SecondaryButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] text-[15px] font-medium tracking-[0.01em] border transition-colors duration-200 hover:bg-[#EFEFEA]"
      style={{ fontFamily: "'Inter', sans-serif", borderColor: BORDER, color: INK }}
    >
      {children}
    </a>
  );
}

/* ---------------- Hero call console with vertical toggle ---------------- */
const DEMOS = {
  auto: {
    label: "Ukázka hovoru · Autoservis",
    lines: [
      { who: "Zákazník", text: "Dobrý den, potřeboval bych vyměnit přední brzdy." },
      { who: "R1 Service", text: "Jasně, zjistím pár údajů. Jaká je značka a model vozu?" },
      { who: "Zákazník", text: "Škoda Octavia, ročník 2018." },
      { who: "R1 Service", text: "Díky. Kdy by se vám hodilo přivézt auto?" },
    ],
    resultTitle: "poptávka vytvořena",
    fields: [
      ["Vozidlo", "Škoda Octavia, 2018"],
      ["Problém", "Výměna předních brzd"],
      ["Kontakt", "+420 6xx xxx xxx"],
    ],
  },
  restaurant: {
    label: "Ukázka hovoru · Restaurace",
    lines: [
      { who: "Zákazník", text: "Dobrý den, chtěl bych zarezervovat stůl na sobotu večer." },
      { who: "R1 Service", text: "Ráda pomůžu. Pro kolik osob a v kolik hodin?" },
      { who: "Zákazník", text: "Pro 4 osoby, v 19:30." },
      { who: "R1 Service", text: "Skvěle, na jaké jméno mám rezervaci zapsat?" },
    ],
    resultTitle: "rezervace vytvořena",
    fields: [
      ["Termín", "Sobota, 19:30"],
      ["Počet osob", "4"],
      ["Kontakt", "+420 6xx xxx xxx"],
    ],
  },
};

function CallConsole() {
  const bars = [6, 14, 9, 18, 11, 16, 7, 13, 10, 17, 8, 15];
  const [vertical, setVertical] = useState("auto");
  const demo = DEMOS[vertical];

  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-[420px] mx-auto lg:mx-0"
      style={{ background: DARK, border: `1px solid ${DARK_BORDER}`, boxShadow: "0 24px 60px -24px rgba(15,23,42,0.35)" }}
    >
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${DARK_BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "#3EDC81", boxShadow: "0 0 0 3px rgba(62,220,129,0.18)" }} />
          <span className="text-[13px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: DARK_TEXT_SOFT }}>
            {demo.label}
          </span>
        </div>
        <span className="text-[12px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#565B57" }}>00:14</span>
      </div>

      <div className="flex gap-1.5 px-5 pt-4">
        {Object.keys(DEMOS).map((key) => (
          <button
            key={key}
            onClick={() => setVertical(key)}
            className="flex-1 py-2 rounded-lg text-[12.5px] transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: vertical === key ? ACCENT : "transparent",
              color: vertical === key ? "#FFFFFF" : DARK_TEXT_SOFT,
              border: `1px solid ${vertical === key ? ACCENT : DARK_BORDER}`,
            }}
          >
            {key === "auto" ? "Autoservis" : "Restaurace"}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-[3px] px-5 pt-5 pb-4 h-12">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-full"
            style={{ background: ACCENT, height: `${h}px`, animation: `r1wave 1.1s ease-in-out ${i * 0.07}s infinite`, opacity: 0.85 }}
          />
        ))}
      </div>

      <div className="px-5 pb-5 flex flex-col gap-3" key={vertical}>
        {demo.lines.map((l, i) => (
          <div key={i} className="flex flex-col gap-1" style={{ animation: `r1fadeIn 0.6s ease forwards`, animationDelay: `${0.2 + i * 0.3}s`, opacity: 0 }}>
            <span className="text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: l.who === "R1 Service" ? "#5C8DFF" : "#6B716B" }}>
              {l.who}
            </span>
            <p className="text-[13.5px] leading-snug" style={{ fontFamily: "'Inter', sans-serif", color: l.who === "R1 Service" ? "#E8ECFF" : "#C6CAD1" }}>
              {l.text}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mx-5 mb-5 rounded-xl px-4 py-3.5"
        style={{ background: "#1B2027", border: "1px solid #2A3038" }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#3EDC81" />
            <path d="M4 7.2L6.1 9.2L10 4.8" stroke="#0B2016" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11px] tracking-[0.1em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: DARK_TEXT_SOFT }}>
            {demo.resultTitle}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-y-1.5 text-[12.5px]" style={{ fontFamily: "'Inter', sans-serif" }}>
          {demo.fields.map(([k, v]) => (
            <React.Fragment key={k}>
              <span style={{ color: "#6B716B" }}>{k}</span>
              <span style={{ color: "#EDEFF1" }}>{v}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Loss calculator ---------------- */
function LossCalculator() {
  const [missed, setMissed] = useState(3);
  const [conv, setConv] = useState(30);
  const [value, setValue] = useState(2500);
  const [days, setDays] = useState(5);

  const fmt = (n) => Math.round(n).toLocaleString("cs-CZ");
  const monthly = missed * (conv / 100) * value * days * (52 / 12);

  const fields = [
    { key: "missed", label: "Hovorů denně nezvednete", value: missed, set: setMissed, min: 0, max: 20, step: 1, suffix: " /den" },
    { key: "conv", label: "Kolik z nich by se stalo zakázkou", value: conv, set: setConv, min: 10, max: 80, step: 5, suffix: " %" },
    { key: "value", label: "Průměrná hodnota zakázky", value: value, set: setValue, min: 500, max: 15000, step: 100, suffix: " Kč", format: true },
    { key: "days", label: "Otevírací dny v týdnu", value: days, set: setDays, min: 3, max: 7, step: 1, suffix: " dní" },
  ];

  return (
    <div className="rounded-2xl p-6 lg:p-7" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
      <div className="flex items-baseline justify-between gap-4 mb-1.5 flex-wrap">
        <span className="text-[13px]" style={{ fontFamily: "'Inter', sans-serif", color: INK_SOFT }}>
          Odhadovaná měsíční ztráta
        </span>
        <span className="text-[13px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#A8ACA6" }}>
          {missed}/den × {days} dní × {conv} % × {fmt(value)} Kč
        </span>
      </div>
      <div className="flex items-baseline mb-6 pb-6" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <span className="text-[27px] font-semibold tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}>
          {fmt(monthly)}
        </span>
        <span className="text-[14px] ml-1.5" style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif" }}>Kč</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <div className="flex items-center justify-between mb-2 gap-3">
              <label className="text-[13px]" style={{ fontFamily: "'Inter', sans-serif", color: INK }}>
                {f.label}
              </label>
              <span className="text-[13px] font-medium tabular-nums flex-none" style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}>
                {f.format ? fmt(f.value) : f.value}{f.suffix}
              </span>
            </div>
            <input
              type="range"
              className="r1-range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={f.value}
              onChange={(e) => f.set(Number(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FaqItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button onClick={onClick} className="w-full flex items-center justify-between gap-6 py-5 text-left">
        <span className="text-[16px] font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: INK }}>
          {q}
        </span>
        <span
          className="flex-none w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{ border: `1px solid ${BORDER}`, transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1V10M1 5.5H10" stroke="#565B57" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? "220px" : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.16,1,.3,1)" }}>
        <p className="pb-5 text-[14.5px] leading-relaxed max-w-[580px]" style={{ fontFamily: "'Inter', sans-serif", color: INK_SOFT }}>
          {a}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Main ---------------- */
export default function R1Landing() {
  const [faqOpen, setFaqOpen] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const products = [
    {
      n: "01",
      t: "AI Asistent",
      d: "Zvedne příchozí hovor, zjistí, co zákazník potřebuje, a předá vám hotovou poptávku nebo rezervaci.",
      anchor: "#ai-asistent",
    },
    {
      n: "02",
      t: "AI Reputation",
      d: "Po dokončené zakázce požádá zákazníka o hodnocení a hlídá, co o vás lidé píšou na Google Maps.",
      anchor: "#ai-reputation",
    },
    {
      n: "03",
      t: "Missed Call Text-Back",
      d: "Když se hovor zmešká, zákazníkovi hned odejde SMS, ať napíše, s čím potřebuje pomoct.",
      anchor: "#text-back",
    },
  ];

  const steps = [
    { n: "01", t: "Zákazník zavolá", d: "Telefonát přijde v době, kdy nikdo z provozu nemůže zvednout telefon — je vytížený jinou prací." },
    { n: "02", t: "AI Asistent přijme hovor", d: "Hovor okamžitě zvedne a přirozeně komunikuje se zákazníkem, i mimo pracovní dobu." },
    { n: "03", t: "Zjistí potřebné informace", d: "Jméno, telefon, co zákazník potřebuje a případně požadovaný termín." },
    { n: "04", t: "Předá vám připravenou poptávku", d: "Strukturovaná poptávka nebo rezervace je hotová a čeká na vás — nic neřešíte za chodu." },
  ];

  const repSteps = [
    { n: "01", t: "Zakázka je hotová", d: "Oprava, objednávka nebo rezervace je u konce." },
    { n: "02", t: "Zákazník dostane zprávu", d: "Poděkování s odkazem na hodnocení, ať nemusí nic hledat." },
    { n: "03", t: "Nechá hodnocení", d: "Zákazník ohodnotí váš provoz přímo na Google Maps." },
    { n: "04", t: "Dostanete upozornění", d: "O nové recenzi se dozvíte hned, ne až náhodou." },
    { n: "05", t: "AI navrhne odpověď", d: "Návrh reakce na recenzi čeká na vaše schválení." },
  ];

  const textbackSteps = [
    { n: "01", t: "Zákazník zavolá", d: "Telefonát přijde v běžné špičce." },
    { n: "02", t: "Hovor se zmešká", d: "Nikdo ho nestihne zvednout." },
    { n: "03", t: "Hned mu odejde SMS", d: "Zákazník dostane zprávu, ať napíše, s čím potřebuje pomoct." },
    { n: "04", t: "Zákazník odpoví", d: "Napíše, o co jde, písemně, až bude mít chvilku." },
    { n: "05", t: "Dostanete poptávku", d: "Číslo, zpráva a čas hovoru přehledně na jednom místě." },
  ];

  const benefits = [
    { t: "Méně zmeškaných hovorů", d: "Telefonát nezůstane bez odpovědi jen proto, že zrovna nikdo nemůže k telefonu." },
    { t: "Méně vyrušování týmu", d: "Personál nemusí odbíhat od rozdělané práce, aby zvedl telefon." },
    { t: "Přehlednější poptávky", d: "Místo útržkovitého vzkazu dostanete strukturovaný přehled toho, co zákazník potřeboval." },
    { t: "Dostupnost i mimo běžnou pracovní dobu", d: "Zákazník se dovolá i večer nebo o víkendu, kdy je provoz běžně zavřený." },
  ];

  const bundleItems = [
    { t: "AI Asistent", d: "zvedá hovory a stará se o poptávky i rezervace." },
    { t: "AI Reputation", d: "sbírá hodnocení a hlídá recenze." },
    { t: "Missed Call Text-Back", d: "dohání hovory, které se přesto zmeškají." },
  ];

  const faqs = [
    { q: "Co R1 Service umí?", a: "R1 Service jsou tři samostatné produkty — AI Asistent, AI Reputation a Missed Call Text-Back. Každý řeší jinou situaci, ve které provoz běžně přichází o zákazníka." },
    { q: "Musím si koupit všechny tři produkty?", a: "Ne. Každý produkt funguje samostatně a můžete si vybrat jen ten, který vám dává smysl. Většina provozů si nakonec objedná všechny tři jako jeden balíček, ale není to podmínkou." },
    { q: "Co když zákazník požaduje něco, co AI Asistent nezvládne?", a: "AI Asistent pracuje podle předem nastavených scénářů. Složitější požadavky mohou být předány přímo vám." },
    { q: "Jak se informace dostanou k vám?", a: "Poptávku, rezervaci nebo zprávu vám předáme v přehledné podobě. Konkrétní způsob (e-mail, SMS či jinak) nastavíme podle toho, co vám vyhovuje." },
    { q: "Jak probíhá spuštění?", a: "Po ukázce si společně projdeme provoz — otevírací dobu, nabízené služby a časté dotazy — a podle toho produkty nastavíme." },
    { q: "Kolik R1 Service stojí?", a: "Cena se odvíjí od toho, které produkty zvolíte, a od rozsahu využití. Podrobnosti vám představíme během ukázky." },
  ];

  const navLinks = [
    { href: "#problem", label: "Problém" },
    { href: "#produkty", label: "Produkty" },
    { href: "#balicek", label: "Balíček" },
    { href: "#faq", label: "FAQ" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <div style={{ background: BG, color: INK, fontFamily: "'Inter', sans-serif" }} className="min-h-screen w-full antialiased">
      <style>{`
        ${FONT_IMPORT}
        @keyframes r1wave { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
        @keyframes r1fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes r1slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .r1-range { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 999px; background: ${BORDER}; outline: none; }
        .r1-range::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${ACCENT}; cursor: pointer; border: 3px solid #FFFFFF; box-shadow: 0 0 0 1px ${ACCENT}; }
        .r1-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: ${ACCENT}; cursor: pointer; border: 3px solid #FFFFFF; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* NAV */}
      <header
        className="sticky top-0 z-40 transition-shadow duration-200"
        style={{
          background: scrolled ? "rgba(246,246,243,0.92)" : "rgba(246,246,243,0.7)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}`,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-none" style={{ background: ACCENT }}>
              <span className="text-white text-[13px] font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R1</span>
            </span>
            <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R1 Service</span>
          </a>

          <nav className="hidden md:flex items-center gap-9 text-[13.5px]" style={{ color: INK_SOFT }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#14171A] transition-colors">{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={MAILTO}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[9px] text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Domluvit ukázku
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6H19M3 11H19M3 16H19" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-[15px]" style={{ borderTop: `1px solid ${BORDER}`, color: "#3A3D39", background: BG }}>
            {navLinks.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className={i === 0 ? "pt-5" : ""}>{l.label}</a>
            ))}
            <a href={MAILTO} className="inline-flex items-center justify-center px-5 py-3 rounded-[9px] text-white font-medium text-[15px] mt-1" style={{ background: ACCENT }}>
              Domluvit ukázku
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-12 items-center">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase mb-7 px-3 py-1.5 rounded-full"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT, background: "#E8EEFF" }}
            >
              Tři produkty pro provozy, které nestíhají telefon
            </div>
            <h1
              className="text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.1] tracking-tight font-semibold mb-7"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Nezmeškejte zákazníka jen proto, že právě nemůžete zvednout telefon.
            </h1>
            <p className="text-[17px] lg:text-[18.5px] leading-relaxed mb-10 max-w-[480px]" style={{ color: INK_SOFT }}>
              R1 Service je sada tří samostatných produktů — AI Asistent, AI Reputation a Missed Call Text-Back. Každý řeší jinou situaci, ve které provoz nejčastěji přichází o zákazníka. Fungují jednotlivě, nebo jako balíček.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton href={MAILTO}>Domluvit 10minutovou ukázku</PrimaryButton>
              <SecondaryButton href="#produkty">Naše produkty</SecondaryButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <CallConsole />
          </Reveal>
        </div>
      </section>

      {/* KALKULAČKA */}
      <section id="kalkulacka" className="pb-16 lg:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="max-w-[640px] mx-auto">
              <h2 className="text-[22px] lg:text-[24px] font-semibold tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: INK }}>
                Spočítejte si, kolik vás to reálně stojí
              </h2>
              <LossCalculator />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-20 lg:py-28" style={{ background: "#FFFFFF", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <SectionLabel n="01">Problém</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Telefon zvoní. Personál má ruce plné práce. Zákazník čeká.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] leading-[1.75] max-w-[520px]" style={{ color: INK_SOFT }}>
              Ať je to mechanik pod autem, nebo číšník uprostřed obsluhy — telefon málokdy vyhraje. Zákazník, kterému to nikdo nezvedne, často nezavolá znovu — zajde nebo zavolá jinam. A opakované telefonáty mezitím přerušují práci na tom, co provoz už dělá.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRODUKTY — overview of the three separate products, the "head" the rest hangs off */}
      <section id="produkty" className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <SectionLabel n="02">Produkty</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight mb-4 max-w-[600px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Tři samostatné produkty, ne jeden balík funkcí.
            </h2>
            <p className="text-[16px] leading-[1.75] mb-16 max-w-[560px]" style={{ color: INK_SOFT }}>
              Každý produkt řeší jinou situaci a dá se objednat sám za sebe. Dohromady kryjí nejčastější způsoby, jak provoz přijde o zákazníka — zmeškaný hovor, ztracenou poptávku i chybějící recenzi.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <a
                  href={p.anchor}
                  className="block p-7 rounded-[14px] h-full transition-colors duration-200 hover:bg-[#F6F6F3]"
                  style={{ border: `1px solid ${BORDER}` }}
                >
                  <span className="text-[13px] block mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}>{p.n}</span>
                  <h3 className="text-[18px] font-medium mb-2.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.t}</h3>
                  <p className="text-[14.5px] leading-relaxed mb-5" style={{ color: INK_SOFT }}>{p.d}</p>
                  <span className="text-[13.5px] font-medium" style={{ color: ACCENT }}>Jak přesně funguje →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT 1 — AI ASISTENT */}
      <section id="ai-asistent" className="py-20 lg:py-28" style={{ background: DARK }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <SectionLabel n="03" dark>Produkt 1 — AI Asistent</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight mb-16 max-w-[600px]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>
              Čtyři kroky od zvonícího telefonu k hotové poptávce.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: DARK_BORDER }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="p-7 lg:p-8 h-full" style={{ background: DARK }}>
                  <span className="text-[13px] block mb-9" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#5C8DFF" }}>{s.n}</span>
                  <h3 className="text-[17px] font-medium mb-2.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>{s.t}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: DARK_TEXT_SOFT }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT 2 — AI REPUTATION */}
      <section id="ai-reputation" className="py-20 lg:py-28" style={{ background: "#FFFFFF", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <SectionLabel n="04">Produkt 2 — AI Reputation</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight mb-4 max-w-[600px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Po zakázce požádá o hodnocení a hlídá recenze za vás.
            </h2>
            <p className="text-[16px] leading-[1.75] mb-16 max-w-[560px]" style={{ color: INK_SOFT }}>
              Zákazník dostane zprávu s odkazem na hodnocení, vy dostanete upozornění na každou novou recenzi a návrh odpovědi ke schválení — nic neodesíláme za vás bez vědomí.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: BORDER }}>
            {repSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="p-6 lg:p-7 h-full" style={{ background: "#FFFFFF" }}>
                  <span className="text-[13px] block mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}>{s.n}</span>
                  <h3 className="text-[15.5px] font-medium mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.t}</h3>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: INK_SOFT }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT 3 — MISSED CALL TEXT-BACK */}
      <section id="text-back" className="py-20 lg:py-28" style={{ background: DARK }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <SectionLabel n="05" dark>Produkt 3 — Missed Call Text-Back</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight mb-4 max-w-[600px]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>
              Zmeškaný hovor nemusí být ztracený zákazník.
            </h2>
            <p className="text-[16px] leading-[1.75] mb-16 max-w-[560px]" style={{ color: DARK_TEXT_SOFT }}>
              Když se hovor zmešká, zákazníkovi hned odejde SMS, ať napíše, s čím potřebuje pomoct. Vy odpovíte, až budete mít chvilku — žádný AI hlas, jen jednodušší cesta, jak zákazníka neztratit.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: DARK_BORDER }}>
            {textbackSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="p-6 lg:p-7 h-full" style={{ background: DARK }}>
                  <span className="text-[13px] block mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#5C8DFF" }}>{s.n}</span>
                  <h3 className="text-[15.5px] font-medium mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>{s.t}</h3>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: DARK_TEXT_SOFT }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="prinosy" className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <SectionLabel n="06">Přínosy</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight mb-16 max-w-[560px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Co to reálně přinese vašemu provozu.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 70}>
                <div className="p-7 rounded-[14px] h-full" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                  <h3 className="text-[17px] font-medium mb-2.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.t}</h3>
                  <p className="text-[14.5px] leading-relaxed" style={{ color: INK_SOFT }}>{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BALÍČEK — explicit: 3 standalone products, optionally combined, no pricing shown */}
      <section id="balicek" className="py-20 lg:py-28" style={{ background: "#FFFFFF", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <SectionLabel n="07">Balíček</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Jeden produkt, nebo všechny tři.
            </h2>
            <p className="text-[16px] leading-[1.75] max-w-[480px]" style={{ color: INK_SOFT }}>
              Každý produkt si můžete objednat samostatně. Většina provozů si ale nakonec vezme všechny tři dohromady jako jeden balíček, protože se vzájemně doplňují.
            </p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[14px] p-7" style={{ border: `1px solid ${BORDER}` }}>
              <span className="text-[12px] tracking-[0.12em] uppercase block mb-5" style={{ fontFamily: "'IBM Plex Mono', monospace", color: INK_SOFT }}>
                V balíčku dostanete
              </span>
              <ul className="flex flex-col gap-4 mb-6">
                {bundleItems.map((item) => (
                  <li key={item.t} className="flex items-start gap-3">
                    <span className="flex-none text-[15px] font-medium mt-0.5" style={{ color: ACCENT }}>—</span>
                    <span className="text-[15px] leading-relaxed" style={{ color: INK }}>
                      <span className="font-medium">{item.t}</span> — {item.d}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[13.5px] leading-relaxed" style={{ color: INK_SOFT }}>
                Přesný rozsah a cenu probereme na ukázce podle toho, co váš provoz skutečně potřebuje.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEMO CTA */}
      <section id="ukazka" className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div
              className="rounded-[20px] px-8 py-14 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-9"
              style={{ background: ACCENT_DEEP }}
            >
              <div className="max-w-[520px]">
                <div className="text-[11px] tracking-[0.14em] uppercase mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#7C97FF" }}>
                  08 — Ukázka
                </div>
                <h2 className="text-[26px] lg:text-[30px] leading-[1.2] font-semibold tracking-tight text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Poslechněte si, jak může R1 Service fungovat u vás.
                </h2>
                <p className="text-[15.5px] leading-relaxed" style={{ color: "#B9C4E8" }}>
                  Během přibližně 10 minut vám ukážeme všechny tři produkty a probereme, které dávají smysl pro váš provoz.
                </p>
              </div>
              <a
                href={MAILTO}
                className="flex-none inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[10px] text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ background: "#FFFFFF", color: ACCENT_DEEP, fontFamily: "'Inter', sans-serif" }}
              >
                Domluvit 10minutovou ukázku
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M3 7.5H12M12 7.5L8 3.5M12 7.5L8 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <SectionLabel n="09">Časté otázky</SectionLabel>
            <h2 className="text-[26px] lg:text-[30px] leading-[1.25] font-semibold tracking-tight max-w-[320px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Co byste o R1 Service mohli chtít vědět.
            </h2>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-7 lg:col-start-6">
            <div>
              {faqs.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} open={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 lg:py-28" style={{ background: DARK }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          <Reveal>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.12] font-semibold tracking-tight max-w-[680px] mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>
              Nechte si ukázat, jak může R1 Service fungovat u vás.
            </h2>
            <PrimaryButton href={MAILTO}>Domluvit 10minutovou ukázku</PrimaryButton>
          </Reveal>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="kontakt" className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="mb-4">
            <span className="text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8E86" }}>
              10 — Kontakt
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ background: ACCENT }}>
                  <span className="text-white text-[13px] font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R1</span>
                </span>
                <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R1 Service</span>
              </div>
              <p className="text-[14.5px]" style={{ color: INK_SOFT }}>Leoš Horák</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
              <div>
                <span className="block text-[11px] tracking-[0.14em] uppercase mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8E86" }}>Telefon</span>
                <a href={`tel:${PHONE_TEL}`} className="text-[15.5px] font-medium hover:text-[#2454FF] transition-colors">{PHONE}</a>
              </div>
              <div>
                <span className="block text-[11px] tracking-[0.14em] uppercase mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8E86" }}>E-mail</span>
                <a href={MAILTO} className="text-[15.5px] font-medium hover:text-[#2454FF] transition-colors">{EMAIL}</a>
              </div>
            </div>
          </div>
          <p className="pt-8 text-[13px]" style={{ color: "#8A8E86" }}>© {new Date().getFullYear()} R1 Service. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
