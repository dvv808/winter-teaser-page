export const zulassungIntro = {
  eyebrow:
    "Ihre Zulassungsstelle in Schladming – direkt bei Winter Versicherungsmakler",
  title: "Zulassungsstelle",
  paragraphs: [
    "In unserem Hauptsitz in Schladming finden Sie eine offizielle Zulassungsstelle der Oberösterreichischen Versicherung. Hier erledigen Sie alle An- und Abmeldungen, Ummeldungen, Hinterlegungen etc., schnell, unkompliziert und mit kurzen Wegen.",
    "Das Besondere: Neben den amtlichen Zulassungsvorgängen haben Sie bei Winter Versicherungsmakler gleichzeitig die Möglichkeit, eine unabhängige Versicherungsberatung in Anspruch zu nehmen. So verbinden wir für Sie das Beste aus zwei Welten: Behördliche Zulassung + neutrale Versicherungslösung – alles unter einem Dach. Für ein individuelles Kfz-Angebot vereinbaren Sie bitte vorab einen Termin, damit wir eine Beraterin oder einen Berater vom Außendienst hinzuziehen können.",
  ],
} as const;

export const zulassungSections = [
  {
    id: "besonders",
    title: "Besonders für Sie:",
    toc: "Besonders für Sie",
    items: [
      "Die Zulassungsstelle ist vollständig barrierefrei zugänglich",
      "Kostenlose Parkplätze direkt vor der Tür",
      "Kein Termin notwendig – einfach vorbeikommen",
      "Bezahlung bar oder mit Bankomat (keine Kreditkarten)",
    ],
  },
  {
    id: "kennzeichen",
    title: "Welche Kennzeichen können zugelassen werden?",
    toc: "Welche Kennzeichen können zugelassen werden?",
    items: ["GB (Gröbming)", "LI (Liezen)", "BA (Bad Aussee)"],
  },
  {
    id: "anmeldung",
    title: "Unterlagen für eine Anmeldung:",
    toc: "Unterlagen für eine Anmeldung",
    items: [
      "Genehmigungsnachweis (Typenschein, Auszug aus der Genehmigungsdatenbank, Einzelgenehmigung, COC-Papier)",
      "Kaufvertrag (Rechnung, Leasing-Bestätigung oder sonstiger Besitznachweis)",
      "Versicherungsbestätigung",
      "Lichtbildausweis",
      "ggf. Vollmacht (wenn jemand anderes die Zulassung übernimmt)",
      "Prüfgutachten gemäß §57a KFG muss vorhanden sein",
    ],
  },
  {
    id: "abmeldung",
    title: "Unterlagen für eine Abmeldung:",
    toc: "Unterlagen für eine Abmeldung",
    items: [
      "Zulassungsschein (Teil 1+2, wobei der 2. Teil im Typenschein angeheftet ist)",
      "Genehmigungsnachweis (Typenschein, Auszug aus der Genehmigungsdatenbank, Einzelgenehmigung)",
      "Kennzeichentafeln",
      "Lichtbildausweis",
      "Vollmacht, falls das Kfz nicht persönlich abgemeldet wird",
      "Bei Abmeldung im Todesfall: Zustimmungserklärung des Nachlassverwalters oder Einantwortungsurkunde",
    ],
  },
  {
    id: "kosten",
    title: "Kosten:",
    toc: "Kosten",
    items: [
      "PKW und LKW € 270,-",
      "Anhänger und Zugmaschinen € 258,50",
      "Motorrad € 260,-",
      "Moped € 255,50",
      "Scheckkartenzulassungsschein € 31,10",
      "Abmeldung kostenlos",
    ],
  },
] as const;

export const zulassungHours = {
  id: "oeffnungszeiten",
  toc: "Kontakt & Öffnungszeiten",
  title: "Kontakt & Öffnungszeiten",
  weekdaysLabel: "Montag bis Donnerstag:",
  weekdays: "08:00 - 12:00",
  fridayLabel: "Freitag:",
  friday: "08:30 - 13:00",
  contactTitle: "Kontakt Schladming",
  company: "Winter Versicherungsmakler",
  street: "Obere Klaus 244",
  city: "8970 Schladming",
  phone: "+43 3687 23753 444",
} as const;

export const zulassungToc = [
  ...zulassungSections.map((section) => ({
    id: section.id,
    label: section.toc,
  })),
  { id: zulassungHours.id, label: zulassungHours.toc },
] as const;
