export const officeHours = {
  title: "Bürozeiten",
  weekdays: {
    label: "Montag bis Donnerstag:",
    lines: ["08:00 - 12:30", "13:30 - 16:00"],
  },
  friday: {
    label: "Freitag:",
    lines: ["08:00 - 11:00"],
  },
} as const;

export type ContactLocation = {
  id: string;
  name: string;
  contactTitle: string;
  company: string;
  address: [string, string];
  email: string;
  phone: string;
};

export function mapsHref(location: ContactLocation) {
  const query = [location.company, location.address[0], location.address[1]].join(
    ", ",
  );
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const contactLocations: ContactLocation[] = [
  {
    id: "schladming",
    name: "Schladming",
    contactTitle: "Kontakt Schladming",
    company: "Winter Versicherungsmakler",
    address: ["Obere Klaus 244", "8970 Schladming"],
    email: "office@makler-winter.at",
    phone: "+43 3687 23753",
  },
  {
    id: "kapfenberg",
    name: "Kapfenberg",
    contactTitle: "Kontakt Kapfenberg",
    company: "Winter Versicherungsmakler",
    address: ["Wiener Straße 45", "8605 Kapfenberg"],
    email: "office@makler-winter.at",
    phone: "+43 3687 23753",
  },
];
