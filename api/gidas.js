// Priima gido užklausą iš svetainės formos ir praneša apie ją el. paštu.
// Veikia kaip Vercel funkcija; slaptažodis laikomas Vercel aplinkos kintamuosiuose.

const nodemailer = require("nodemailer");

const GAVEJAI = (process.env.GIDO_GAVEJAI || "info@egdoors.lt")
  .split(",")
  .map((a) => a.trim())
  .filter(Boolean);

function tinkamasPastas(p) {
  return typeof p === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p) && p.length < 200;
}

function svarus(t, ilgis) {
  return String(t || "").replace(/[\r\n]+/g, " ").trim().slice(0, ilgis);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, klaida: "Netinkamas metodas" });
  }

  let duomenys = req.body;
  if (typeof duomenys === "string") {
    try {
      duomenys = JSON.parse(duomenys);
    } catch (e) {
      duomenys = {};
    }
  }
  duomenys = duomenys || {};

  // Paslėptas laukas robotams: jei užpildytas, tyliai apsimetame, kad viskas gerai
  if (svarus(duomenys.miestas, 50)) {
    return res.status(200).json({ ok: true });
  }

  const pastas = svarus(duomenys.pastas, 200);
  const vardas = svarus(duomenys.vardas, 100);

  if (!tinkamasPastas(pastas)) {
    return res.status(400).json({ ok: false, klaida: "Patikrinkite el. pašto adresą" });
  }

  const vartotojas = process.env.GMAIL_USER;
  const slaptazodis = process.env.GMAIL_APP_PASSWORD;

  if (!vartotojas || !slaptazodis) {
    console.error("Nėra pašto nustatymų");
    return res.status(500).json({ ok: false, klaida: "Siuntimas kol kas neveikia" });
  }

  const laikas = new Date().toLocaleString("lt-LT", { timeZone: "Europe/Vilnius" });

  try {
    const siuntejas = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: vartotojas, pass: slaptazodis },
    });

    await siuntejas.sendMail({
      from: `"EG DOORS svetainė" <${vartotojas}>`,
      to: GAVEJAI.join(", "),
      replyTo: pastas,
      subject: `Gido užklausa: ${pastas}`,
      text: [
        "Svetainėje aukstos-durys.vercel.app kažkas atsisiuntė gidą.",
        "",
        `El. paštas: ${pastas}`,
        `Vardas: ${vardas || "nenurodytas"}`,
        `Laikas: ${laikas}`,
        "",
        "Į šį laišką atsakius, atsakymas keliaus tiesiai tam žmogui.",
      ].join("\n"),
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Nepavyko išsiųsti:", e && e.message);
    return res.status(500).json({ ok: false, klaida: "Nepavyko išsiųsti. Pabandykite dar kartą" });
  }
};
