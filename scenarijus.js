/* EG DOORS – aukštos durys. Paprastas JavaScript, be bibliotekų. */

/* ------------------------------------------------------------------
   1. GIDO FORMA
   Formos duomenys keliauja į /api/gidas ir iš ten laišku į info@egdoors.lt.
   Lankytojas iš karto gauna nuorodą į PDF gidą.
------------------------------------------------------------------- */
const GIDO_FAILAS = "gidas-7-klausimai-gamintojui.pdf";

const forma = document.getElementById("gidoForma");
const zinute = document.getElementById("gidoZinute");
const gidoMygtukas = document.getElementById("gidoMygtukas");

function rodyti(tekstas, busena) {
  zinute.className = "forma__zinute " + busena;
  zinute.textContent = tekstas;
}

if (forma) {
  forma.addEventListener("submit", async function (e) {
    e.preventDefault();
    const pastas = forma.pastas.value.trim();
    const vardas = forma.vardas.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(pastas)) {
      rodyti("Patikrinkite el. pašto adresą.", "klaida");
      forma.pastas.focus();
      return;
    }

    gidoMygtukas.disabled = true;
    gidoMygtukas.textContent = "Siunčiama…";
    rodyti("", "");

    try {
      const atsakymas = await fetch("/api/gidas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pastas: pastas, vardas: vardas, miestas: forma.miestas.value }),
      });
      const rezultatas = await atsakymas.json().catch(function () { return {}; });

      if (!atsakymas.ok || !rezultatas.ok) {
        throw new Error(rezultatas.klaida || "Nepavyko išsiųsti");
      }

      forma.reset();
      zinute.className = "forma__zinute pavyko";
      zinute.innerHTML =
        'Ačiū. Gidas paruoštas: <a href="' + GIDO_FAILAS + '" target="_blank" rel="noopener">atidaryti PDF</a>';
      window.open(GIDO_FAILAS, "_blank", "noopener");
    } catch (klaida) {
      rodyti(klaida.message + ". Arba parašykite info@egdoors.lt", "klaida");
    } finally {
      gidoMygtukas.disabled = false;
      gidoMygtukas.textContent = "Atsisiųsti gidą";
    }
  });
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
