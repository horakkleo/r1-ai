import React, { useState, useEffect } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');`;
const F_HEAD = "'Archivo', sans-serif";
const F_BODY = "'IBM Plex Sans', sans-serif";
const F_MONO = "'IBM Plex Mono', monospace";

const PHONE = "774 301 940";
const PHONE_TEL = "+420774301940";
const EMAIL = "horakk.leo@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Zájem o 10minutovou ukázku R1 AI"
)}&body=${encodeURIComponent(
  "Dobrý den, měl bych zájem o 10minutovou ukázku R1 AI. Prosím o návrh termínu."
)}`;

/* ---- Palette: grounded in the auto-repair workshop, not generic SaaS ---- */
const INK = "#211C16";
const INK_SOFT = "#6F6656";
const BORDER = "#DFD5C2";
const PAPER = "#F2EDE1";       // page background — manila/work-order paper
const PAPER_ALT = "#FBF8F2";   // lighter paper for alternating sections
const ACCENT = "#2454FF";      // signature blue
const ACCENT_INK = "#FFFFFF";
const DARK = "#221C15";        // warm charcoal, not blue-black
const DARK_BORDER = "#3B3225";
const DARK_SOFT = "#B3A28A";
const STEEL = "#3E6E86";       // diagnostic-scanner blue, used once

function PrimaryButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[15px] font-medium transition-transform duration-150 hover:-translate-y-[1px] ${className}`}
      style={{ fontFamily: F_BODY, background: ACCENT, color: ACCENT_INK, borderRadius: "3px" }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3.2 2.4c.2-.5.7-.8 1.2-.6l1.7.6c.5.2.8.7.6 1.2l-.5 1.3c-.1.4 0 .8.3 1l1.3 1.3c.3.3.7.4 1 .3l1.3-.5c.5-.2 1 .1 1.2.6l.6 1.7c.2.5-.1 1-.6 1.2-3.8 1.3-8-.9-9.3-4.7-.5-1.3-.5-2.7 0-4.4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
      {children}
    </a>
  );
}

function SecondaryButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center px-6 py-3.5 text-[15px] font-medium border transition-colors duration-150"
      style={{ fontFamily: F_BODY, borderColor: INK, color: INK, borderRadius: "3px" }}
    >
      {children}
    </a>
  );
}

/* ---------------- Hero visual: live call console ---------------- */
const CONSOLE_DARK = "#12151A";
const CONSOLE_BORDER = "#262B33";
const CONSOLE_TEXT_SOFT = "#9AA0A8";

function CallConsole() {
  const bars = [6, 14, 9, 18, 11, 16, 7, 13, 10, 17, 8, 15];
  const lines = [
    { who: "Zákazník", text: "Dobrý den, potřeboval bych vyměnit přední brzdy." },
    { who: "R1 AI", text: "Jasně, zjistím pár údajů. Jaká je značka a model vozu?" },
    { who: "Zákazník", text: "Škoda Octavia, ročník 2018." },
    { who: "R1 AI", text: "Díky. Kdy by se vám hodilo přivézt auto?" },
  ];
  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto"
      style={{ background: CONSOLE_DARK, border: `1px solid ${CONSOLE_BORDER}`, boxShadow: "0 24px 60px -24px rgba(15,23,42,0.35)" }}
    >
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${CONSOLE_BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "#3EDC81", boxShadow: "0 0 0 3px rgba(62,220,129,0.18)" }} />
          <span className="text-[13px]" style={{ fontFamily: F_MONO, color: CONSOLE_TEXT_SOFT }}>
            Ukázka hovoru — Ukázkový autoservis
          </span>
        </div>
        <span className="text-[12px]" style={{ fontFamily: F_MONO, color: "#565B57" }}>00:14</span>
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

      <div className="px-5 pb-5 flex flex-col gap-3">
        {lines.map((l, i) => (
          <div key={i} className="flex flex-col gap-1" style={{ animation: `r1fadeIn 0.6s ease forwards`, animationDelay: `${0.4 + i * 0.35}s`, opacity: 0 }}>
            <span className="text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: F_MONO, color: l.who === "R1 AI" ? "#5C8DFF" : "#6B716B" }}>
              {l.who}
            </span>
            <p className="text-[13.5px] leading-snug" style={{ fontFamily: F_BODY, color: l.who === "R1 AI" ? "#E8ECFF" : "#C6CAD1" }}>
              {l.text}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mx-5 mb-5 rounded-xl px-4 py-3.5"
        style={{ background: "#1B2027", border: "1px solid #2A3038", animation: "r1slideUp 0.6s cubic-bezier(.16,1,.3,1) forwards", animationDelay: "2s", opacity: 0 }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#3EDC81" />
            <path d="M4 7.2L6.1 9.2L10 4.8" stroke="#0B2016" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11px] tracking-[0.1em] uppercase" style={{ fontFamily: F_MONO, color: CONSOLE_TEXT_SOFT }}>
            poptávka vytvořena
          </span>
        </div>
        <div className="grid grid-cols-2 gap-y-1.5 text-[12.5px]" style={{ fontFamily: F_BODY }}>
          <span style={{ color: "#6B716B" }}>Vozidlo</span>
          <span style={{ color: "#EDEFF1" }}>Škoda Octavia, 2018</span>
          <span style={{ color: "#6B716B" }}>Problém</span>
          <span style={{ color: "#EDEFF1" }}>Výměna předních brzd</span>
          <span style={{ color: "#6B716B" }}>Kontakt</span>
          <span style={{ color: "#EDEFF1" }}>+420 6xx xxx xxx</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FaqItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button onClick={onClick} className="w-full flex items-center justify-between gap-6 py-5 text-left">
        <span className="text-[16px] font-medium" style={{ fontFamily: F_HEAD, color: INK }}>
          {q}
        </span>
        <span
          className="flex-none w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{ border: `1px solid ${BORDER}`, transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1V10M1 5.5H10" stroke={INK_SOFT} strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? "220px" : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.16,1,.3,1)" }}>
        <p className="pb-5 text-[14.5px] leading-relaxed max-w-[560px]" style={{ fontFamily: F_BODY, color: INK_SOFT }}>
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

  const services = [
    {
      n: "01",
      t: "AI recepční",
      oneLiner: "Zvedne první hovor, zjistí, co zákazník potřebuje, a předá vám hotovou poptávku.",
      gets: "Jméno, telefon, vozidlo, popis problému, termín.",
      fits: "Nestíháte zvedat telefon.",
      anchor: "#jak-to-funguje",
    },
    {
      n: "02",
      t: "AI Reputation",
      oneLiner: "Po dokončené opravě požádá zákazníka o hodnocení a na každou novou recenzi vás hned upozorní.",
      gets: "Upozornění na recenzi a návrh odpovědi ke schválení.",
      fits: "Máte málo recenzí, nebo na ně nikdo nemá čas odpovídat.",
      anchor: "#ai-reputation",
    },
    {
      n: "03",
      t: "Missed Call Text-Back",
      oneLiner: "Když se hovor zmešká, zákazníkovi hned odejde SMS, ať napíše, s čím potřebuje pomoct.",
      gets: "Číslo zákazníka a jeho zprávu.",
      fits: "Nechcete AI hlas, ale nechcete ztrácet hovory.",
      anchor: "#text-back",
    },
  ];

  const steps = [
    { n: "01", t: "Zákazník zavolá", d: "Telefonát přijde v době, kdy mechanik nemůže zvednout — je pod autem nebo řeší jiného zákazníka." },
    { n: "02", t: "R1 AI přijme hovor", d: "AI recepční hovor okamžitě zvedne a přirozeně komunikuje se zákazníkem, i mimo pracovní dobu." },
    { n: "03", t: "Zjistí potřebné údaje", d: "Jméno, telefon, vozidlo, popis problému a případně požadovaný termín." },
    { n: "04", t: "Předá vám hotovou poptávku", d: "Strukturovaná poptávka na vás čeká hotová — nic neřešíte za chodu, u auta." },
  ];

  const benefits = [
    { t: "Méně zmeškaných hovorů", d: "Telefonát nezůstane bez odpovědi jen proto, že zrovna nikdo nemůže k telefonu." },
    { t: "Méně vyrušování mechaniků", d: "Mechanik nemusí odbíhat od rozdělané práce, aby zvedl telefon." },
    { t: "Přehlednější poptávky", d: "Místo útržkovitého vzkazu dostanete strukturovaný přehled toho, co zákazník potřeboval." },
    { t: "Dostupnost i mimo pracovní dobu", d: "Zákazník se dovolá i večer nebo o víkendu, kdy je servis běžně zavřený." },
  ];

  const repSteps = [
    { n: "01", t: "Oprava je hotová", d: "Zakázka je dokončená a servis ji uzavírá." },
    { n: "02", t: "Zákazník dostane zprávu", d: "Poděkování s odkazem na hodnocení, ať nemusí nic hledat." },
    { n: "03", t: "Nechá hodnocení", d: "Zákazník ohodnotí servis přímo na Google Maps." },
    { n: "04", t: "Servis dostane upozornění", d: "O nové recenzi se dozvíte hned, ne až náhodou." },
    { n: "05", t: "AI navrhne odpověď", d: "Návrh reakce na recenzi čeká na vaše schválení." },
  ];

  const repPoints = [
    "Zpráva odejde po zakázce — zákazník nemusí nic hledat.",
    "Nová recenze = upozornění hned, ne až se na ni náhodou podíváte.",
    "Odpověď na recenzi vždy schvalujete vy, AI ji jen připraví.",
    "O hodnocení žádáme všechny zákazníky stejně, ne jen spokojené — recenze nekupujeme ani nemažeme.",
  ];

  const textbackSteps = [
    { n: "01", t: "Zákazník zavolá", d: "Telefonát přijde v běžné špičce." },
    { n: "02", t: "Hovor se zmešká", d: "Nikdo ho nestihne zvednout." },
    { n: "03", t: "Hned mu odejde SMS", d: "Zákazník dostane zprávu, ať napíše, s čím potřebuje pomoct." },
    { n: "04", t: "Zákazník odpoví", d: "Napíše, o co jde, písemně, až bude mít chvilku." },
    { n: "05", t: "Servis dostane poptávku", d: "Číslo, zpráva a čas hovoru přehledně na jednom místě." },
  ];

  const textbackPoints = [
    "Zákazník ví, že se mu ozvete — nezůstane bez odpovědi.",
    "Nemusíte hned volat zpátky, odpovíte, až budete mít chvilku.",
    "Poptávka je napsaná, nic se neztratí jen proto, že jste ji zapomněli zapsat.",
  ];

  const faqs = [
    { q: "Co R1 AI umí?", a: "R1 AI dokáže vést první komunikaci se zákazníkem, zjistit předem definované informace a předat je autoservisu." },
    { q: "Může R1 AI přijímat hovory?", a: "Ano, právě telefonická AI recepční je hlavní směr produktu. Konkrétní nastavení se přizpůsobuje potřebám autoservisu." },
    { q: "Co když zákazník chce něco, co AI neumí vyřešit?", a: "Systém pracuje podle předem nastavených scénářů. Složitější požadavky mohou být předány člověku." },
    { q: "Jak se informace dostanou k autoservisu?", a: "Poptávku, kterou AI od zákazníka zjistí, vám předáme v přehledné podobě. Způsob (e-mail, SMS či jinak) nastavíme podle toho, co vám vyhovuje." },
    { q: "Jak probíhá spuštění?", a: "Po ukázce si společně projdeme provoz vašeho servisu — otevírací dobu, nabízené služby a časté dotazy — a podle toho AI nastavíme." },
    { q: "Kolik R1 AI stojí?", a: "Cena se odvíjí od rozsahu využití a konkrétního nastavení. Podrobnosti představíme během ukázky." },
  ];

  const navLinks = [
    { href: "#problem", label: "Problém" },
    { href: "#sluzby", label: "Služby" },
    { href: "#jak-to-funguje", label: "Jak to funguje" },
    { href: "#pro-koho", label: "Pro koho" },
    { href: "#faq", label: "FAQ" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <div style={{ background: PAPER, color: INK, fontFamily: F_BODY }} className="min-h-screen w-full antialiased">
      <style>{`
        ${FONT_IMPORT}
        @keyframes r1wave { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
        @keyframes r1fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes r1slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
        html { scroll-behavior: smooth; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${STEEL}; outline-offset: 2px; }
      `}</style>

      {/* NAV */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: PAPER,
          borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}`,
        }}
      >
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 h-[64px] flex items-center justify-between">
          <a href="#top" className="text-[16px] font-semibold tracking-tight" style={{ fontFamily: F_HEAD, color: INK }}>
            R1 AI
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[14px]" style={{ color: INK_SOFT }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#211C16] transition-colors">{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={MAILTO}
              className="inline-flex items-center justify-center px-5 py-2.5 text-[13.5px] font-medium transition-opacity hover:opacity-90"
              style={{ background: ACCENT, color: ACCENT_INK, borderRadius: "3px" }}
            >
              Domluvit ukázku
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <svg width="21" height="21" viewBox="0 0 22 22" fill="none">
              <path d="M3 6H19M3 11H19M3 16H19" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-[15px]" style={{ borderTop: `1px solid ${BORDER}`, color: INK_SOFT, background: PAPER }}>
            {navLinks.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className={i === 0 ? "pt-5" : ""}>{l.label}</a>
            ))}
            <a href={MAILTO} className="inline-flex items-center justify-center px-5 py-3 font-medium text-[15px] mt-1" style={{ background: ACCENT, color: ACCENT_INK, borderRadius: "3px" }}>
              Domluvit ukázku
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="max-w-[1180px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-14 items-center">
          <div>
            <h1
              className="text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.08] tracking-[-0.01em] font-semibold mb-6 max-w-[560px]"
              style={{ fontFamily: F_HEAD }}
            >
              Nezmeškejte zákazníka jen proto, že jste zrovna pod autem.
            </h1>
            <p className="text-[17px] lg:text-[18px] leading-relaxed mb-9 max-w-[440px]" style={{ color: INK_SOFT }}>
              R1 AI je digitální recepční pro autoservisy. Zvedne telefon, zjistí co zákazník potřebuje a předá vám hotovou poptávku.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <PrimaryButton href={MAILTO}>Domluvit 10minutovou ukázku</PrimaryButton>
              <SecondaryButton href="#jak-to-funguje">Jak to funguje</SecondaryButton>
            </div>
            <p className="text-[14px]" style={{ color: INK_SOFT }}>
              Nebo mi rovnou zavolejte — <a href={`tel:${PHONE_TEL}`} className="font-medium underline decoration-1 underline-offset-2" style={{ color: INK }}>{PHONE}</a>, jsem to já, Leoš, žádné call centrum.
            </p>
          </div>

          <CallConsole />
        </div>
      </section>

      {/* PROBLEM — single flowing statement, not a formula grid */}
      <section id="problem" className="py-20 lg:py-24" style={{ background: PAPER_ALT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <div className="max-w-[620px] pl-6" style={{ borderLeft: `3px solid ${ACCENT}` }}>
            <h2 className="text-[26px] lg:text-[31px] leading-[1.3] font-semibold tracking-tight mb-5" style={{ fontFamily: F_HEAD }}>
              Telefon zvoní. Mechanik pracuje. Zákazník čeká.
            </h2>
            <p className="text-[16px] leading-[1.75]" style={{ color: INK_SOFT }}>
              V malém i středním autoservisu má telefon málokdy prioritu — mechanik má ruce pod kapotou, ne u sluchátka. Zákazník, kterému to nikdo nezvedne, často nezavolá znovu — zavolá jinam. A opakované telefonáty mezitím přerušují práci na zakázkách, které už servis má.
            </p>
          </div>
        </div>
      </section>

      {/* SLUŽBY — the three modules, grounded in what Leo actually sells */}
      <section id="sluzby" className="py-20 lg:py-24" style={{ background: PAPER_ALT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <h2 className="text-[27px] lg:text-[32px] leading-[1.2] font-semibold tracking-tight mb-4 max-w-[520px]" style={{ fontFamily: F_HEAD }}>
            Tři moduly, jeden balíček.
          </h2>
          <p className="text-[15.5px] leading-relaxed mb-12 max-w-[560px]" style={{ color: INK_SOFT }}>
            Každý řeší jiný moment — zmeškaný hovor, hodnocení po opravě, nebo zákazníka, kterému se AI hlas nezamlouvá. Fungují samostatně i dohromady jako jeden balíček.
          </p>

          <div className="flex flex-col">
            {services.map((s) => (
              <div key={s.n} id={`modul-${s.n}`} className="grid sm:grid-cols-[64px_1fr] gap-3 sm:gap-8 py-7" style={{ borderTop: `1px solid ${BORDER}` }}>
                <span className="text-[14px]" style={{ fontFamily: F_MONO, color: ACCENT }}>{s.n}</span>
                <div>
                  <h3 className="text-[18px] font-medium mb-2" style={{ fontFamily: F_HEAD }}>{s.t}</h3>
                  <p className="text-[15px] leading-relaxed max-w-[540px] mb-3" style={{ color: INK_SOFT }}>{s.oneLiner}</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-1.5 text-[12.5px] mb-3" style={{ fontFamily: F_MONO }}>
                    <span><span style={{ color: "#A79A7F" }}>Dostanete: </span><span style={{ color: INK }}>{s.gets}</span></span>
                    <span><span style={{ color: "#A79A7F" }}>Hodí se, když: </span><span style={{ color: INK }}>{s.fits}</span></span>
                  </div>
                  {s.anchor && (
                    <a href={s.anchor} className="text-[13.5px] font-medium underline decoration-1 underline-offset-2" style={{ color: ACCENT }}>
                      Jak přesně funguje
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${BORDER}` }} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — deep dive on Modul 01, the flagship product */}
      <section id="jak-to-funguje" className="py-20 lg:py-24" style={{ background: DARK }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <h2 className="text-[27px] lg:text-[32px] leading-[1.25] font-semibold tracking-tight mb-5 max-w-[560px]" style={{ fontFamily: F_HEAD, color: "#F3EFE7" }}>
            Jak funguje AI recepční — Modul 01.
          </h2>
          <p className="text-[15.5px] leading-relaxed mb-14 max-w-[540px]" style={{ color: DARK_SOFT }}>
            Přijme příchozí hovor a vede se zákazníkem první komunikaci — zjistí, co potřebuje, a předá vám to jako přehlednou poptávku. Konkrétně jde o tyto čtyři kroky:
          </p>

          <div className="flex flex-col">
            {steps.map((s) => (
              <div
                key={s.n}
                className="grid sm:grid-cols-[64px_1fr] gap-3 sm:gap-8 py-6"
                style={{ borderTop: `1px solid ${DARK_BORDER}` }}
              >
                <span className="text-[14px]" style={{ fontFamily: F_MONO, color: ACCENT }}>{s.n}</span>
                <div className="grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-8">
                  <h3 className="text-[17px] font-medium" style={{ fontFamily: F_HEAD, color: "#F3EFE7" }}>{s.t}</h3>
                  <p className="text-[14.5px] leading-relaxed max-w-[440px]" style={{ color: DARK_SOFT }}>{s.d}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${DARK_BORDER}` }} />
          </div>
        </div>
      </section>

      {/* BENEFITS — full-width heading, 2x2 grid (distinct rhythm from Problem/Pro koho) */}
      <section id="prinosy" className="py-20 lg:py-24" style={{ background: PAPER_ALT, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <h2 className="text-[27px] lg:text-[32px] leading-[1.2] font-semibold tracking-tight mb-12 max-w-[460px]" style={{ fontFamily: F_HEAD }}>
            Co to reálně přinese vašemu servisu.
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {benefits.map((b) => (
              <div key={b.t}>
                <span className="flex-none w-2 h-2 rounded-full inline-block mb-3" style={{ background: ACCENT }} />
                <h3 className="text-[16px] font-medium mb-1.5" style={{ fontFamily: F_HEAD }}>{b.t}</h3>
                <p className="text-[14.5px] leading-relaxed max-w-[380px]" style={{ color: INK_SOFT }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODUL 02 — AI Reputation */}
      <section id="ai-reputation" className="py-20 lg:py-24" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <h2 className="text-[27px] lg:text-[32px] leading-[1.25] font-semibold tracking-tight mb-5 max-w-[560px]" style={{ fontFamily: F_HEAD }}>
            Jak funguje AI Reputation — Modul 02.
          </h2>
          <p className="text-[15.5px] leading-relaxed mb-14 max-w-[560px]" style={{ color: INK_SOFT }}>
            Po dokončené opravě požádá zákazníka o hodnocení a hlídá, co o servisu píšou na Google Maps. Sama nic neodesílá bez vašeho vědomí — odpověď na recenzi vždy schvalujete vy. Konkrétně jde o těchto pět kroků:
          </p>

          <div className="flex flex-col mb-14">
            {repSteps.map((s) => (
              <div key={s.n} className="grid sm:grid-cols-[64px_1fr] gap-3 sm:gap-8 py-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                <span className="text-[14px]" style={{ fontFamily: F_MONO, color: ACCENT }}>{s.n}</span>
                <div className="grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-8">
                  <h3 className="text-[17px] font-medium" style={{ fontFamily: F_HEAD }}>{s.t}</h3>
                  <p className="text-[14.5px] leading-relaxed max-w-[440px]" style={{ color: INK_SOFT }}>{s.d}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${BORDER}` }} />
          </div>

          <div className="max-w-[620px]">
            <h3 className="text-[15px] font-medium mb-4" style={{ fontFamily: F_HEAD }}>Proč je to dobré</h3>
            <ul className="flex flex-col gap-3">
              {repPoints.map((t) => (
                <li key={t} className="flex items-start gap-3.5">
                  <span className="flex-none text-[15px] font-medium mt-0.5" style={{ color: ACCENT }}>—</span>
                  <span className="text-[15px] leading-relaxed" style={{ color: INK_SOFT }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MODUL 03 — Missed Call Text-Back */}
      <section id="text-back" className="py-20 lg:py-24" style={{ background: PAPER_ALT, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <h2 className="text-[27px] lg:text-[32px] leading-[1.25] font-semibold tracking-tight mb-5 max-w-[560px]" style={{ fontFamily: F_HEAD }}>
            Jak funguje Missed Call Text-Back — Modul 03.
          </h2>
          <p className="text-[15.5px] leading-relaxed mb-14 max-w-[560px]" style={{ color: INK_SOFT }}>
            Když se hovor zmešká, zákazníkovi hned odejde SMS, ať napíše, s čím potřebuje pomoct. Vy odpovíte, až budete mít chvilku — žádný AI hlas, jen jednodušší cesta, jak neztratit zákazníka. Konkrétně jde o těchto pět kroků:
          </p>

          <div className="flex flex-col mb-14">
            {textbackSteps.map((s) => (
              <div key={s.n} className="grid sm:grid-cols-[64px_1fr] gap-3 sm:gap-8 py-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                <span className="text-[14px]" style={{ fontFamily: F_MONO, color: ACCENT }}>{s.n}</span>
                <div className="grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-8">
                  <h3 className="text-[17px] font-medium" style={{ fontFamily: F_HEAD }}>{s.t}</h3>
                  <p className="text-[14.5px] leading-relaxed max-w-[440px]" style={{ color: INK_SOFT }}>{s.d}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${BORDER}` }} />
          </div>

          <div className="max-w-[620px]">
            <h3 className="text-[15px] font-medium mb-4" style={{ fontFamily: F_HEAD }}>Proč je to dobré</h3>
            <ul className="flex flex-col gap-3">
              {textbackPoints.map((t) => (
                <li key={t} className="flex items-start gap-3.5">
                  <span className="flex-none text-[15px] font-medium mt-0.5" style={{ color: ACCENT }}>—</span>
                  <span className="text-[15px] leading-relaxed" style={{ color: INK_SOFT }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DEMO CTA */}
      <section id="ukazka" className="py-16 lg:py-20">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <div
            className="px-8 py-14 lg:px-14 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-9"
            style={{ background: DARK, borderRadius: "3px" }}
          >
            <div className="max-w-[500px]">
              <h2 className="text-[25px] lg:text-[29px] leading-[1.25] font-semibold tracking-tight mb-3" style={{ fontFamily: F_HEAD, color: "#F3EFE7" }}>
                Poslechněte si, jak může R1 AI fungovat ve vašem servisu.
              </h2>
              <p className="text-[15.5px] leading-relaxed" style={{ color: DARK_SOFT }}>
                Během přibližně 10 minut vám ukážeme, jak AI recepční přijme hovor a zpracuje zákaznickou poptávku.
              </p>
            </div>
            <a
              href={MAILTO}
              className="flex-none inline-flex items-center justify-center px-7 py-4 text-[15px] font-medium transition-opacity hover:opacity-90"
              style={{ background: ACCENT, color: ACCENT_INK, fontFamily: F_BODY, borderRadius: "3px" }}
            >
              Domluvit 10minutovou ukázku
            </a>
          </div>
        </div>
      </section>

      {/* PRO KOHO */}
      <section id="pro-koho" className="py-20 lg:py-24" style={{ background: PAPER_ALT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-[25px] lg:text-[29px] leading-[1.3] font-semibold tracking-tight max-w-[380px]" style={{ fontFamily: F_HEAD }}>
              Pro autoservisy, kde telefon zvoní víc, než stíháte zvedat.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="flex flex-col gap-5">
              {[
                "Mechanici jsou často pod autem a nemohou telefon zvednout.",
                "Víc hovorů přichází ve stejnou chvíli.",
                "Zákazníci volají kvůli objednávkám a poptávkám na opravy.",
                "Rychlá reakce rozhoduje o tom, jestli zakázka zůstane u vás, nebo jde ke konkurenci.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3.5">
                  <span className="flex-none text-[15.5px] font-medium mt-0.5" style={{ color: ACCENT }}>—</span>
                  <span className="text-[15.5px] leading-relaxed" style={{ color: INK }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* KDO ZA TÍM STOJÍ */}
      <section id="kdo" className="py-16 lg:py-20">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start max-w-[680px]">
            <div
              className="flex-none w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: DARK, transform: "rotate(-4deg)" }}
            >
              <span style={{ fontFamily: F_HEAD, fontSize: "14px", fontWeight: 600, color: "#F3EFE7" }}>LH</span>
            </div>
            <div>
              <p className="text-[16px] leading-[1.75]" style={{ color: INK_SOFT }}>
                Jmenuju se Leoš, je mi 19 a R1 AI stavím sám — chodím po autoservisech v okolí Prahy, mluvím s majiteli a testuju to naostro. Není za tím velká firma ani call centrum, jen jeden člověk, co chce vyřešit konkrétní, reálný problém.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-24">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10">
          <h2 className="text-[25px] lg:text-[29px] leading-[1.3] font-semibold tracking-tight mb-10" style={{ fontFamily: F_HEAD }}>
            Co byste o R1 AI mohli chtít vědět.
          </h2>
          <div>
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 lg:py-24" style={{ background: DARK }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 text-center flex flex-col items-center">
          <h2 className="text-[27px] sm:text-[34px] lg:text-[38px] leading-[1.18] font-semibold tracking-tight max-w-[640px] mb-9" style={{ fontFamily: F_HEAD, color: "#F3EFE7" }}>
            Nechte si ukázat, jak může R1 AI fungovat ve vašem autoservisu.
          </h2>
          <PrimaryButton href={MAILTO}>Domluvit 10minutovou ukázku</PrimaryButton>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="kontakt" className="py-16">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: F_HEAD }}>R1 AI</span>
              </div>
              <p className="text-[14.5px]" style={{ color: INK_SOFT }}>Leoš Horák</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
              <div>
                <span className="block text-[13px] mb-2" style={{ color: INK_SOFT }}>Telefon</span>
                <a href={`tel:${PHONE_TEL}`} className="text-[15.5px] font-medium hover:text-[#2454FF] transition-colors">{PHONE}</a>
              </div>
              <div>
                <span className="block text-[13px] mb-2" style={{ color: INK_SOFT }}>E-mail</span>
                <a href={MAILTO} className="text-[15.5px] font-medium hover:text-[#2454FF] transition-colors">{EMAIL}</a>
              </div>
            </div>
          </div>
          <p className="pt-8 text-[13px]" style={{ color: "#9C927C" }}>© {new Date().getFullYear()} R1 AI. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
