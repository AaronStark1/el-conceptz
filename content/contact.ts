import type { ContactAction } from "@/types";

/**
 * Contact channels.
 * TODO(owner): replace every placeholder below with the studio's real details.
 * The values are deliberately obvious placeholders so nothing fake ships by accident.
 */
const email = "elconceptz@gmail.com";
const phoneDisplay = "+91 98958 12897";
const phoneE164 = "+919895812897";
const whatsappNumber = "919895812897"; // digits only, country code first
const locationLabel = "Kerala, India";
const mapsQuery = "El Conceptz interior design Kerala";

export const contactActions: ContactAction[] = [
  {
    kind: "email",
    label: "Email",
    value: email,
    href: `mailto:${email}?subject=${encodeURIComponent("Project enquiry")}`,
    note: "For briefs, drawings and references",
  },
  {
    kind: "whatsapp",
    label: "WhatsApp",
    value: phoneDisplay,
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello El Conceptz, I would like to discuss a project.")}`,
    note: "Quickest way to reach the studio",
  },
  {
    kind: "phone",
    label: "Call",
    value: phoneDisplay,
    href: `tel:${phoneE164}`,
    note: "Weekdays, working hours",
  },
  {
    kind: "location",
    label: "Studio",
    value: locationLabel,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
    note: "Open in Google Maps",
  },
];

export const contactCopy = {
  heading: "Start a project",
  body: "Tell us about the home or the space, where it is and when you hope to begin. We reply to every enquiry personally.",
};
