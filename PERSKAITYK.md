# Svetainė „Aukštos durys iki 350 cm“

Vienos temos svetainė šalia egdoors.lt. Paprastas HTML, CSS ir JavaScript, be jokių diegimų.

## Kaip pasižiūrėti savo kompiuteryje

Aplanke `svetaine` paleisti komandą ir naršyklėje atidaryti http://127.0.0.1:8777

```
python -m http.server 8777
```

Galima ir tiesiog du kartus spustelėti `index.html`, bet per serverį rodoma tiksliau.

## Ką dar reikia padaryti

**1. Google forma.** Failo `scenarijus.js` pradžioje yra eilutė:

```js
const GOOGLE_FORMOS_NUORODA = "";
```

Tarp kabučių įrašykite savo Google formos adresą, pavyzdžiui `https://forms.gle/abc123`.
Tada visi trys mygtukai „Atsisiųsti gidą“ ves į formą. Kol ten tuščia, mygtukas atidaro
paruoštą laišką į info@egdoors.lt.

Formoje užtenka dviejų laukų: el. paštas ir vardas. Formos pabaigoje (arba patvirtinimo
žinutėje) įdėkite nuorodą į gidą `gidas-7-klausimai-gamintojui.pdf`, įkeltą į Google Drive.

**2. Atsiliepimai.** Svetainėje jų nėra, nes realių atsiliepimų kol kas neturime. Kai
surinksite 3–4, įdėsime atskirą skyrių po objektų galerija.

**3. Objektų parašai.** Parašuose rašoma tik tai, kas matyti nuotraukoje (apdaila, durų tipas).
Objektų adresų ir klientų vardų nėra sąmoningai. Jei atsiųsite angų aukščius, sudėsime
tikslius skaičius prie kiekvienos nuotraukos.

**4. Nuotraukos.** Svetainėje naudojamos **tik Luko Kučinsko fotografuotos** nuotraukos iš
trijų aplankų: „EG Doors Interjeras Nočios g. 5“, „EGDOORS Žemuogių g, Bajorai“ ir
„EGDOORS Lietaviškių g.“. Telefonu darytų kadrų iš `svetaine-vizualai` šaknies svetainėje
nebeliko nė vieno. Vienintelė ne fotografo iliustracija – staktos profilio brėžinys, nes
tokios nuotraukos nėra.

## Kas kur guli

| Failas | Kas viduje |
|---|---|
| `index.html` | visas svetainės turinys |
| `stilius.css` | spalvos, šriftai, maketas |
| `scenarijus.js` | gido nuoroda ir aukščio skaičiuoklė |
| `nuotraukos/` | visos nuotraukos, sumažintos internetui |
| `sriftai/` | šriftas Archivo (svetainė veikia ir be interneto) |
| `logo.png` | logotipo versija tamsiam fonui |
| `gidas-7-klausimai-gamintojui.pdf` | gidas, kurį gauna palikęs el. paštą |

## Iš kur paimti duomenys

Tekstai remiasi `context/darbas.md` ir žinynu `zinynas/gaminiai/EGD-LUXUS.md`.

Svarbu: pagal žinyną klasė **C5 ir „200 000 ciklų“ priskiriama tik LINE 50F ir LINE 50S**
durims, todėl svetainėje rašome tikslų faktą – GTC bandyme (ataskaita 59-5.2024.15) durys su
80,4 kg varčia ir 3 vyriais išlaikė **212 523 ciklus**. Taip pat atsparumo ugniai ir dūmams
klasės nurodytos kaip LINE 50F / LINE 50S, o ne kaip visų LUXUS durų savybė.

Telefono ir adreso svetainėje nėra sąmoningai: kontaktas tik info@egdoors.lt.
