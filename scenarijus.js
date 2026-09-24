/* EG DOORS – aukštos durys. Paprastas JavaScript, be bibliotekų. */

/* ------------------------------------------------------------------
   1. GIDO NUORODA
   Įrašykite čia savo Google formos adresą tarp kabučių, pvz.:
   const GOOGLE_FORMOS_NUORODA = "https://forms.gle/xxxxxxxx";
   Kol čia tuščia, mygtukas tiesiog atidaro PDF gidą.
------------------------------------------------------------------- */
const GOOGLE_FORMOS_NUORODA = "";

const GIDO_FAILAS = "gidas-7-klausimai-gamintojui.pdf";

document.querySelectorAll(".js-gidas").forEach(function (m) {
  if (GOOGLE_FORMOS_NUORODA) {
    m.setAttribute("href", GOOGLE_FORMOS_NUORODA);
  } else {
    // Kol formos nėra, mygtukas tiesiog atidaro PDF gidą
    m.setAttribute("href", GIDO_FAILAS);
  }
  m.setAttribute("target", "_blank");
  m.setAttribute("rel", "noopener");
});

if (!GOOGLE_FORMOS_NUORODA) {
  const smulkiai = document.getElementById("gidasSmulkiai");
  if (smulkiai) {
    smulkiai.textContent = "PDF atsidarys naujame lange. Klausimams rašykite info@egdoors.lt";
  }
}

/* ------------------------------------------------------------------
   2. AUKŠČIO SKALĖ
   Ribos paimtos iš EG DOORS žinyno: varstomos 350 cm, stumdomos 360 cm,
   akustinės 320 cm; vyrių skaičius pagal varčios aukštį.
------------------------------------------------------------------- */
const MAKS = 360;              // skalės viršus centimetrais
const IPRASTOS = 200;          // įprastų durų aukštis palyginimui

const laukas = document.getElementById("laukas");
const jusu = document.getElementById("jusu");
const iprastos = document.getElementById("iprastos");
const jusuZyma = document.getElementById("jusuZyma");
const reiksme = document.getElementById("reiksme");
const iranga = document.getElementById("aukstisInput");
const rezultatai = document.getElementById("rezultatai");

function vyriuSkaicius(cm) {
  if (cm <= 240) return "2";
  if (cm <= 280) return "3";
  return "4";
}

function eilute(raktas, tekstas, tinka) {
  const li = rezultatai.querySelector('[data-eil="' + raktas + '"] .rezultatai__busena');
  li.textContent = tekstas;
  li.className = "rezultatai__busena " + (tinka ? "taip" : "ne");
}

function perpiesti() {
  const cm = Number(iranga.value);
  const aukstis = laukas.clientHeight;

  // Durys piešiamos tuo pačiu masteliu kaip aukštis: varčia 90 cm pločio
  const plotis = Math.round(aukstis * 90 / MAKS);
  iprastos.style.width = plotis + "px";
  jusu.style.width = plotis + "px";
  jusu.style.left = Math.round(plotis * 1.9) + "px";

  jusu.style.height = Math.round(aukstis * cm / MAKS) + "px";
  iprastos.style.height = Math.round(aukstis * IPRASTOS / MAKS) + "px";

  reiksme.textContent = cm + " cm";
  jusuZyma.textContent = cm + " cm";

  eilute("varstomos", cm <= 350 ? "Galima" : "Per aukšta, riba 350 cm", cm <= 350);
  eilute("stumdomos", cm <= 360 ? "Galima" : "Per aukšta, riba 360 cm", cm <= 360);
  eilute("akustines", cm <= 320 ? "Galima" : "Per aukšta, riba 320 cm", cm <= 320);
  eilute("vyriai", vyriuSkaicius(cm), true);
}

if (iranga) {
  iranga.addEventListener("input", perpiesti);
  if (window.ResizeObserver) {
    new ResizeObserver(perpiesti).observe(laukas);
  }
  perpiesti();
}
