<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>R1 Service | Recepce, která nezmešká zákazníka</title>
<meta name="description" content="R1 Service přijme hovor, zjistí, co zákazník potřebuje, a připraví vám hotovou poptávku nebo rezervaci — i když zrovna nestíháte zvednout telefon.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#14171A; --ink-soft:#5B5F5A; --border:#E4E4DE; --bg:#F6F6F3;
    --accent:#2454FF; --accent-deep:#0F172A; --dark:#12151A; --dark-border:#262B33; --dark-soft:#9AA0A8;
  }
  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;}
  a{text-decoration:none;color:inherit;}
  img,svg{display:block;}
  .wrap{max-width:1200px;margin:0 auto;padding:0 24px;}
  @media(min-width:1024px){.wrap{padding:0 48px;}}

  /* NAV */
  header{position:sticky;top:0;z-index:40;background:rgba(246,246,243,.85);backdrop-filter:blur(10px);border-bottom:1px solid transparent;transition:border-color .2s;}
  header.scrolled{border-bottom-color:var(--border);}
  .navrow{height:72px;display:flex;align-items:center;justify-content:space-between;}
  .brand{display:flex;align-items:center;gap:10px;}
  .brand .mark{width:32px;height:32px;border-radius:8px;background:var(--accent);display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:13px;}
  .brand .name{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;}
  nav.links{display:none;gap:36px;font-size:13.5px;color:var(--ink-soft);}
  @media(min-width:768px){nav.links{display:flex;}}
  nav.links a:hover{color:var(--ink);}
  .cta-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:9px;background:var(--accent);color:#fff;font-size:13.5px;font-weight:500;}
  .cta-btn:hover{opacity:.9;}

  /* HERO */
  .hero{padding:80px 0 96px;}
  @media(min-width:1024px){.hero{padding:112px 0 128px;}}
  .hero-grid{display:grid;gap:64px;align-items:center;}
  @media(min-width:1024px){.hero-grid{grid-template-columns:1.05fr .95fr;gap:48px;}}
  .eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--accent);background:#E8EEFF;padding:6px 12px;border-radius:999px;margin-bottom:28px;}
  h1{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:34px;line-height:1.1;letter-spacing:-.01em;margin:0 0 28px;}
  @media(min-width:1024px){h1{font-size:52px;}}
  .hero p{font-size:17px;line-height:1.6;color:var(--ink-soft);max-width:460px;margin:0 0 40px;}
  .btnrow{display:flex;flex-wrap:wrap;gap:16px;}
  .btn-secondary{display:inline-flex;align-items:center;padding:13.5px 24px;border-radius:10px;border:1px solid var(--border);font-size:15px;font-weight:500;}
  .btn-secondary:hover{background:#EFEFEA;}

  /* CALL CONSOLE */
  .console{background:var(--dark);border:1px solid var(--dark-border);border-radius:16px;overflow:hidden;max-width:420px;margin:0 auto;box-shadow:0 24px 60px -24px rgba(15,23,42,.35);}
  .console-top{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--dark-border);}
  .console-top .left{display:flex;align-items:center;gap:10px;}
  .dot{width:8px;height:8px;border-radius:50%;background:#3EDC81;box-shadow:0 0 0 3px rgba(62,220,129,.18);}
  .console-top span.label{font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--dark-soft);}
  .console-top .timer{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#565B57;}
  .toggle{display:flex;gap:6px;padding:14px 20px 0;}
  .toggle button{flex:1;padding:8px 10px;border-radius:8px;border:1px solid var(--dark-border);background:transparent;color:var(--dark-soft);font-family:'Inter',sans-serif;font-size:12.5px;cursor:pointer;transition:all .15s;}
  .toggle button.active{background:var(--accent);color:#fff;border-color:var(--accent);}
  .lines{padding:16px 20px 4px;display:flex;flex-direction:column;gap:12px;min-height:130px;}
  .line .who{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px;}
  .line.r1 .who{color:#5C8DFF;}
  .line.cust .who{color:#6B716B;}
  .line p{margin:0;font-size:13.5px;line-height:1.4;font-family:'Inter',sans-serif;}
  .line.r1 p{color:#E8ECFF;}
  .line.cust p{color:#C6CAD1;}
  .result{margin:16px 20px 20px;border-radius:12px;background:#1B2027;border:1px solid #2A3038;padding:14px 16px;}
  .result-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
  .result-head span{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--dark-soft);}
  .result-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 8px;font-size:12.5px;font-family:'Inter',sans-serif;}
  .result-grid .k{color:#6B716B;}
  .result-grid .v{color:#EDEFF1;}

  /* CALCULATOR */
  .calc-section{padding-bottom:64px;}
  @media(min-width:1024px){.calc-section{padding-bottom:80px;}}
  .calc-title{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:22px;letter-spacing:-.01em;margin:0 0 16px;}
  .calc{max-width:640px;margin:0 auto;background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px 28px;}
  .calc-top{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px;}
  .calc-top .label{font-size:13px;color:var(--ink-soft);}
  .calc-top .formula{font-family:'IBM Plex Mono',monospace;font-size:13px;color:#A8ACA6;}
  .calc-total{display:flex;align-items:baseline;border-bottom:1px solid var(--border);padding-bottom:24px;margin-bottom:24px;}
  .calc-total .num{font-family:'IBM Plex Mono',monospace;font-size:27px;font-weight:600;color:var(--accent);}
  .calc-total .unit{font-size:14px;margin-left:6px;color:var(--ink-soft);}
  .calc-fields{display:grid;gap:20px;}
  @media(min-width:640px){.calc-fields{grid-template-columns:1fr 1fr;column-gap:32px;}}
  .field-head{display:flex;justify-content:space-between;gap:12px;margin-bottom:8px;}
  .field-head label{font-size:13px;}
  .field-head .val{font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:500;color:var(--accent);}
  input[type=range]{-webkit-appearance:none;width:100%;height:4px;border-radius:999px;background:var(--border);outline:none;}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent);cursor:pointer;border:3px solid #fff;box-shadow:0 0 0 1px var(--accent);}

  /* generic section styles */
  section.pad{padding:80px 0;}
  @media(min-width:1024px){section.pad{padding:112px 0;}}
  .white{background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
  .darkbg{background:var(--dark);}
  .seclabel{display:flex;align-items:center;gap:12px;margin-bottom:20px;}
  .seclabel .n{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--accent);}
  .seclabel .n.dark{color:#5C8DFF;}
  .seclabel .rule{width:32px;height:1px;background:var(--border);}
  .seclabel .rule.dark{background:var(--dark-border);}
  .seclabel .t{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);}
  .seclabel .t.dark{color:var(--dark-soft);}
  .twocol{display:grid;gap:40px;align-items:start;}
  @media(min-width:1024px){.twocol{grid-template-columns:5fr 7fr;gap:32px;}}
  h2{font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:-.01em;font-size:28px;line-height:1.15;margin:0;}
  @media(min-width:1024px){h2{font-size:34px;}}
  h2.dark{color:#F5F5F2;}
  section p.body{font-size:16px;line-height:1.75;color:var(--ink-soft);max-width:520px;margin:0;}

  .steps{display:grid;gap:1px;background:var(--dark-border);margin-top:56px;}
  @media(min-width:640px){.steps{grid-template-columns:1fr 1fr;}}
  @media(min-width:1024px){.steps{grid-template-columns:repeat(4,1fr);}}
  .step{background:var(--dark);padding:28px;}
  .step .n{font-family:'IBM Plex Mono',monospace;font-size:13px;color:#5C8DFF;display:block;margin-bottom:32px;}
  .step h3{font-family:'Space Grotesk',sans-serif;font-weight:500;font-size:17px;color:#F5F5F2;margin:0 0 10px;}
  .step p{font-size:14px;line-height:1.6;color:var(--dark-soft);margin:0;}

  .benefits{display:grid;gap:20px;margin-top:56px;}
  @media(min-width:640px){.benefits{grid-template-columns:1fr 1fr;}}
  .benefit{background:#fff;border:1px solid var(--border);border-radius:14px;padding:28px;}
  .benefit h3{font-family:'Space Grotesk',sans-serif;font-weight:500;font-size:17px;margin:0 0 10px;}
  .benefit p{font-size:14.5px;line-height:1.6;color:var(--ink-soft);margin:0;}

  .verticals{display:grid;gap:20px;margin-top:56px;}
  @media(min-width:640px){.verticals{grid-template-columns:1fr 1fr;}}
  .vertical{border:1px solid var(--border);border-radius:14px;padding:28px;background:#fff;}
  .vertical .tag{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:10px;display:block;}
  .vertical h3{font-family:'Space Grotesk',sans-serif;font-weight:500;font-size:17px;margin:0 0 10px;}
  .vertical p{font-size:14.5px;line-height:1.6;color:var(--ink-soft);margin:0;}

  ul.checklist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:20px;}
  ul.checklist li{display:flex;align-items:flex-start;gap:14px;}
  ul.checklist .tick{flex:none;width:20px;height:20px;border-radius:50%;background:#E8EEFF;display:flex;align-items:center;justify-content:center;margin-top:2px;}
  ul.checklist span.txt{font-size:15.5px;line-height:1.6;color:#3A3D39;}

  .faq-item{border-bottom:1px solid var(--border);}
  .faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:20px 0;background:none;border:none;text-align:left;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:500;font-size:16px;color:var(--ink);}
  .faq-plus{flex:none;width:24px;height:24px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;transition:transform .3s;}
  .faq-item.open .faq-plus{transform:rotate(45deg);}
  .faq-a{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.16,1,.3,1);}
  .faq-item.open .faq-a{max-height:220px;}
  .faq-a p{margin:0;padding-bottom:20px;font-size:14.5px;line-height:1.7;color:var(--ink-soft);max-width:580px;}

  .cta-panel{border-radius:20px;background:var(--accent-deep);padding:56px 32px;display:flex;flex-direction:column;gap:36px;}
  @media(min-width:1024px){.cta-panel{flex-direction:row;align-items:center;justify-content:space-between;padding:64px;}}
  .cta-panel .tag{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#7C97FF;margin-bottom:16px;display:block;}
  .cta-panel h2{color:#fff;font-size:26px;margin-bottom:12px;}
  @media(min-width:1024px){.cta-panel h2{font-size:30px;}}
  .cta-panel p{color:#B9C4E8;font-size:15.5px;line-height:1.6;max-width:480px;margin:0;}
  .cta-white{flex:none;display:inline-flex;align-items:center;gap:8px;padding:16px 28px;border-radius:10px;background:#fff;color:var(--accent-deep);font-weight:500;font-size:15px;}

  footer{padding:64px 0;}
  .foot-tag{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8A8E86;margin-bottom:16px;}
  .foot-top{display:flex;flex-direction:column;gap:40px;padding-bottom:40px;border-bottom:1px solid var(--border);}
  @media(min-width:768px){.foot-top{flex-direction:row;align-items:flex-end;justify-content:space-between;}}
  .foot-contacts{display:flex;flex-direction:column;gap:32px;}
  @media(min-width:640px){.foot-contacts{flex-direction:row;gap:56px;}}
  .foot-contacts .k{display:block;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8A8E86;margin-bottom:8px;}
  .foot-contacts a{font-size:15.5px;font-weight:500;}
  .foot-contacts a:hover{color:var(--accent);}
  footer .copy{padding-top:32px;font-size:13px;color:#8A8E86;}
</style>
</head>
<body>

<header id="site-header">
  <div class="wrap navrow">
    <a href="#top" class="brand">
      <span class="mark">R1</span>
      <span class="name">R1 Service</span>
    </a>
    <nav class="links">
      <a href="#problem">Problém</a>
      <a href="#jak-to-funguje">Jak to funguje</a>
      <a href="#pro-koho">Pro koho</a>
      <a href="#faq">FAQ</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
    <a href="mailto:horakk.leo@gmail.com?subject=Z%C3%A1jem%20o%2010minutovou%20uk%C3%A1zku%20R1%20Service&body=Dobr%C3%BD%20den%2C%20m%C4%9Bl%20bych%20z%C3%A1jem%20o%2010minutovou%20uk%C3%A1zku%20R1%20Service.%20Pros%C3%ADm%20o%20n%C3%A1vrh%20term%C3%ADnu." class="cta-btn">Domluvit ukázku</a>
  </div>
</header>

<section id="top" class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow">Recepce pro provozy, které nestíhají telefon</div>
      <h1>Nezmeškejte zákazníka jen proto, že právě nemůžete zvednout telefon.</h1>
      <p>R1 Service přijme hovor, zjistí, co zákazník potřebuje, a předá vám hotovou poptávku nebo rezervaci — ať děláte cokoliv.</p>
      <div class="btnrow">
        <a href="mailto:horakk.leo@gmail.com?subject=Z%C3%A1jem%20o%2010minutovou%20uk%C3%A1zku%20R1%20Service" class="cta-btn">Domluvit 10minutovou ukázku</a>
        <a href="#jak-to-funguje" class="btn-secondary">Jak to funguje</a>
      </div>
    </div>

    <div class="console">
      <div class="console-top">
        <div class="left">
          <span class="dot"></span>
          <span class="label" id="console-label">Ukázka hovoru · Autoservis</span>
        </div>
        <span class="timer">00:14</span>
      </div>
      <div class="toggle">
        <button class="active" data-vertical="auto">Autoservis</button>
        <button data-vertical="restaurant">Restaurace</button>
      </div>
      <div class="lines" id="console-lines"></div>
      <div class="result" id="console-result"></div>
    </div>
  </div>
</section>

<section class="calc-section">
  <div class="wrap">
    <div style="max-width:640px;margin:0 auto;">
      <h2 class="calc-title">Spočítejte si, kolik vás to reálně stojí</h2>
      <div class="calc">
        <div class="calc-top">
          <span class="label">Odhadovaná měsíční ztráta</span>
          <span class="formula" id="calc-formula"></span>
        </div>
        <div class="calc-total"><span class="num" id="calc-total">0</span><span class="unit">Kč</span></div>
        <div class="calc-fields">
          <div>
            <div class="field-head"><label>Hovorů denně nezvednete</label><span class="val" id="v-missed">3 /den</span></div>
            <input type="range" id="missed" min="0" max="20" step="1" value="3">
          </div>
          <div>
            <div class="field-head"><label>Kolik z nich by se stalo zakázkou</label><span class="val" id="v-conv">30 %</span></div>
            <input type="range" id="conv" min="10" max="80" step="5" value="30">
          </div>
          <div>
            <div class="field-head"><label>Průměrná hodnota zakázky</label><span class="val" id="v-value">2 500 Kč</span></div>
            <input type="range" id="value" min="500" max="15000" step="100" value="2500">
          </div>
          <div>
            <div class="field-head"><label>Otevírací dny v týdnu</label><span class="val" id="v-days">5 dní</span></div>
            <input type="range" id="days" min="3" max="7" step="1" value="5">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="problem" class="pad white">
  <div class="wrap twocol">
    <div>
      <div class="seclabel"><span class="n">01</span><span class="rule"></span><span class="t">Problém</span></div>
      <h2>Telefon zvoní. Personál má ruce plné práce. Zákazník čeká.</h2>
    </div>
    <div>
      <p class="body">Ať je to mechanik pod autem, nebo číšník uprostřed obsluhy — telefon málokdy vyhraje. Zákazník, kterému to nikdo nezvedne, často nezavolá znovu — zajde nebo zavolá jinam. A opakované telefonáty mezitím přerušují práci na tom, co provoz už dělá.</p>
    </div>
  </div>
</section>

<section id="reseni" class="pad">
  <div class="wrap twocol">
    <div>
      <div class="seclabel"><span class="n">02</span><span class="rule"></span><span class="t">Řešení</span></div>
      <h2>R1 Service převezme první kontakt za vás.</h2>
    </div>
    <div>
      <p class="body">R1 Service přijme příchozí hovor a vede se zákazníkem první komunikaci — zjistí, co potřebuje, a předá vám to jako přehlednou poptávku nebo rezervaci. Cílem je, abyste o zakázku nepřišli jen kvůli nezvednutému telefonu.</p>
    </div>
  </div>
</section>

<section id="jak-to-funguje" class="pad darkbg">
  <div class="wrap">
    <div class="seclabel"><span class="n dark">03</span><span class="rule dark"></span><span class="t dark">Jak to funguje</span></div>
    <h2 class="dark" style="max-width:600px;margin-bottom:0;">Čtyři kroky od zvonícího telefonu k hotové poptávce.</h2>
    <div class="steps">
      <div class="step"><span class="n">01</span><h3>Zákazník zavolá</h3><p>Telefonát přijde v době, kdy nikdo z provozu nemůže zvednout telefon — je vytížený jinou prací.</p></div>
      <div class="step"><span class="n">02</span><h3>R1 Service přijme hovor</h3><p>Recepce hovor okamžitě zvedne a přirozeně komunikuje se zákazníkem, i mimo pracovní dobu.</p></div>
      <div class="step"><span class="n">03</span><h3>Zjistí potřebné informace</h3><p>Jméno, telefon, co zákazník potřebuje a případně požadovaný termín.</p></div>
      <div class="step"><span class="n">04</span><h3>Předá vám připravenou poptávku</h3><p>Strukturovaná poptávka nebo rezervace je hotová a čeká na vás — nic neřešíte za chodu.</p></div>
    </div>
  </div>
</section>

<section id="prinosy" class="pad">
  <div class="wrap">
    <div class="seclabel"><span class="n">04</span><span class="rule"></span><span class="t">Přínosy</span></div>
    <h2 style="max-width:560px;margin-bottom:0;">Co to reálně přinese vašemu provozu.</h2>
    <div class="benefits">
      <div class="benefit"><h3>Méně zmeškaných hovorů</h3><p>Telefonát nezůstane bez odpovědi jen proto, že zrovna nikdo nemůže k telefonu.</p></div>
      <div class="benefit"><h3>Méně vyrušování týmu</h3><p>Personál nemusí odbíhat od rozdělané práce, aby zvedl telefon.</p></div>
      <div class="benefit"><h3>Přehlednější poptávky</h3><p>Místo útržkovitého vzkazu dostanete strukturovaný přehled toho, co zákazník potřeboval.</p></div>
      <div class="benefit"><h3>Dostupnost i mimo běžnou pracovní dobu</h3><p>Zákazník se dovolá i večer nebo o víkendu, kdy je provoz běžně zavřený.</p></div>
    </div>
  </div>
</section>

<section id="ukazka" class="pad" style="padding-top:32px;padding-bottom:32px;">
  <div class="wrap">
    <div class="cta-panel">
      <div style="max-width:520px;">
        <span class="tag">05 — Ukázka</span>
        <h2>Poslechněte si, jak může R1 Service fungovat u vás.</h2>
        <p>Během přibližně 10 minut vám ukážeme, jak recepce přijme hovor a zpracuje zákaznickou poptávku nebo rezervaci.</p>
      </div>
      <a href="mailto:horakk.leo@gmail.com?subject=Z%C3%A1jem%20o%2010minutovou%20uk%C3%A1zku%20R1%20Service" class="cta-white">Domluvit 10minutovou ukázku</a>
    </div>
  </div>
</section>

<section id="pro-koho" class="pad white">
  <div class="wrap">
    <div class="seclabel"><span class="n">06</span><span class="rule"></span><span class="t">Pro koho je R1 Service</span></div>
    <h2 style="max-width:520px;margin-bottom:0;">Pro provozy, kde telefon zvoní víc, než stíháte zvedat.</h2>
    <div class="verticals">
      <div class="vertical">
        <span class="tag">Autoservisy</span>
        <h3>Zakázky, které by jinak zajely ke konkurenci</h3>
        <p>Mechanik je pod autem, hovory se hromadí. R1 Service zjistí vozidlo, popis problému a preferovaný termín a předá vám hotovou poptávku.</p>
      </div>
      <div class="vertical">
        <span class="tag">Restaurace</span>
        <h3>Rezervace a objednávky, které nezůstanou bez odezvy</h3>
        <p>V provozní špičce nikdo nestíhá telefon. R1 Service přijme rezervaci nebo objednávku a předá vám ji přehledně a včas.</p>
      </div>
    </div>
  </div>
</section>

<section id="faq" class="pad">
  <div class="wrap twocol">
    <div>
      <div class="seclabel"><span class="n">07</span><span class="rule"></span><span class="t">Časté otázky</span></div>
      <h2 style="max-width:320px;">Co byste o R1 Service mohli chtít vědět.</h2>
    </div>
    <div id="faq-list"></div>
  </div>
</section>

<section class="pad darkbg" style="text-align:center;">
  <div class="wrap" style="display:flex;flex-direction:column;align-items:center;">
    <h2 class="dark" style="max-width:680px;margin-bottom:40px;font-size:28px;">Nechte si ukázat, jak může R1 Service fungovat u vás.</h2>
    <a href="mailto:horakk.leo@gmail.com?subject=Z%C3%A1jem%20o%2010minutovou%20uk%C3%A1zku%20R1%20Service" class="cta-btn">Domluvit 10minutovou ukázku</a>
  </div>
</section>

<footer id="kontakt">
  <div class="wrap">
    <div class="foot-tag">08 — Kontakt</div>
    <div class="foot-top">
      <div>
        <div class="brand" style="margin-bottom:20px;">
          <span class="mark">R1</span>
          <span class="name">R1 Service</span>
        </div>
        <p style="color:var(--ink-soft);font-size:14.5px;margin:0;">Leoš Horák</p>
      </div>
      <div class="foot-contacts">
        <div><span class="k">Telefon</span><a href="tel:+420774301940">774 301 940</a></div>
        <div><span class="k">E-mail</span><a href="mailto:horakk.leo@gmail.com">horakk.leo@gmail.com</a></div>
      </div>
    </div>
    <p class="copy">© <span id="year"></span> R1 Service. Všechna práva vyhrazena.</p>
  </div>
</footer>

<script>
document.getElementById('year').textContent = new Date().getFullYear();

// header scroll shadow
window.addEventListener('scroll', () => {
  document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 8);
});

// mobile-friendly menu omitted for brevity in preview; add before pushing if needed

// demo console content per vertical
const demos = {
  auto: {
    label: 'Ukázka hovoru · Autoservis',
    lines: [
      { who: 'cust', text: 'Dobrý den, potřeboval bych vyměnit přední brzdy.' },
      { who: 'r1', text: 'Jasně, zjistím pár údajů. Jaká je značka a model vozu?' },
      { who: 'cust', text: 'Škoda Octavia, ročník 2018.' },
      { who: 'r1', text: 'Díky. Kdy by se vám hodilo přivézt auto?' },
    ],
    result: { title: 'poptávka vytvořena', fields: [['Vozidlo','Škoda Octavia, 2018'],['Problém','Výměna předních brzd'],['Kontakt','+420 6xx xxx xxx']] }
  },
  restaurant: {
    label: 'Ukázka hovoru · Restaurace',
    lines: [
      { who: 'cust', text: 'Dobrý den, chtěl bych zarezervovat stůl na sobotu večer.' },
      { who: 'r1', text: 'Ráda pomůžu. Pro kolik osob a v kolik hodin?' },
      { who: 'cust', text: 'Pro 4 osoby, v 19:30.' },
      { who: 'r1', text: 'Skvěle, na jaké jméno mám rezervaci zapsat?' },
    ],
    result: { title: 'rezervace vytvořena', fields: [['Termín','Sobota, 19:30'],['Počet osob','4'],['Kontakt','+420 6xx xxx xxx']] }
  }
};

function renderDemo(key){
  const d = demos[key];
  document.getElementById('console-label').textContent = d.label;
  const linesEl = document.getElementById('console-lines');
  linesEl.innerHTML = '';
  d.lines.forEach(l => {
    const div = document.createElement('div');
    div.className = 'line ' + l.who;
    div.innerHTML = `<div class="who">${l.who === 'r1' ? 'R1 Service' : 'Zákazník'}</div><p>${l.text}</p>`;
    linesEl.appendChild(div);
  });
  const resultEl = document.getElementById('console-result');
  resultEl.innerHTML = `<div class="result-head"><span>${d.result.title}</span></div><div class="result-grid">${d.result.fields.map(f => `<span class="k">${f[0]}</span><span class="v">${f[1]}</span>`).join('')}</div>`;
}
renderDemo('auto');
document.querySelectorAll('.toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDemo(btn.dataset.vertical);
  });
});

// loss calculator
const fmt = n => Math.round(n).toLocaleString('cs-CZ');
function updateCalc(){
  const missed = +document.getElementById('missed').value;
  const conv = +document.getElementById('conv').value;
  const value = +document.getElementById('value').value;
  const days = +document.getElementById('days').value;
  document.getElementById('v-missed').textContent = missed + ' /den';
  document.getElementById('v-conv').textContent = conv + ' %';
  document.getElementById('v-value').textContent = fmt(value) + ' Kč';
  document.getElementById('v-days').textContent = days + ' dní';
  document.getElementById('calc-formula').textContent = `${missed}/den × ${days} dní × ${conv} % × ${fmt(value)} Kč`;
  const monthly = missed * (conv/100) * value * days * (52/12);
  document.getElementById('calc-total').textContent = fmt(monthly);
}
['missed','conv','value','days'].forEach(id => document.getElementById(id).addEventListener('input', updateCalc));
updateCalc();

// FAQ
const faqs = [
  { q: 'Co R1 Service umí?', a: 'R1 Service vede první komunikaci se zákazníkem, zjistí předem definované informace a předá je vašemu provozu jako hotovou poptávku nebo rezervaci.' },
  { q: 'Umí R1 Service přijímat hovory?', a: 'Ano, přijímání a zpracování telefonátů je hlavní směr služby. Konkrétní nastavení se přizpůsobuje potřebám vašeho provozu.' },
  { q: 'Co když zákazník požaduje něco, co recepce nezvládne?', a: 'Recepce pracuje podle předem nastavených scénářů. Složitější požadavky mohou být předány přímo vám.' },
  { q: 'Jak se informace dostanou k vám?', a: 'Poptávku nebo rezervaci vám předáme v přehledné podobě. Konkrétní způsob (e-mail, SMS či jinak) nastavíme podle toho, co vám vyhovuje.' },
  { q: 'Jak probíhá spuštění?', a: 'Po ukázce si společně projdeme provoz — otevírací dobu, nabízené služby a časté dotazy — a podle toho recepci nastavíme.' },
  { q: 'Kolik R1 Service stojí?', a: 'Cena se odvíjí od rozsahu využití a konkrétního nastavení. Podrobnosti vám představíme během ukázky.' },
];
const faqList = document.getElementById('faq-list');
faqs.forEach((f, i) => {
  const item = document.createElement('div');
  item.className = 'faq-item' + (i === 0 ? ' open' : '');
  item.innerHTML = `
    <button class="faq-q">${f.q}<span class="faq-plus"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1V10M1 5.5H10" stroke="#565B57" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
    <div class="faq-a"><p>${f.a}</p></div>`;
  item.querySelector('.faq-q').addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(el => { if (el !== item) el.classList.remove('open'); });
    item.classList.toggle('open');
  });
  faqList.appendChild(item);
});
</script>
</body>
</html>
