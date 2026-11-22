// All the text, links and project data for the site lives here.
// Edit this file to update your portfolio without touching the layout.

export const profile = {
  name: "Shan Mickyla",
  title: "GoHighLevel Specialist",
  location: "Philippines",
  email: "shanmickyla.work@gmail.com",
  whatsappDisplay: "+63 960 305 9148",
  whatsappLink: "https://wa.me/639603059148",
  booking: "https://api.astroaiautomations.com/widget/booking/t8VxJ7idMy8dxlfMX9ID",
  resume: "https://drive.google.com/file/d/17VNXpT1m6Z8546lxvlunaHSqQ52RGLJ-/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/shan-mickyla-r-25a572399",
  onlinejobs: "https://www.onlinejobs.ph/jobseekers/info/3881812",
};

export const videos = {
  glowFull: { id: "6wo6TgjzpNE", title: "GLOW: full walkthrough" },
  glowHighlight: { id: "yQ74RoMl8JE", title: "GLOW: highlight" },
  clearPaw: { id: "cWSSmguSJy8", title: "Clear Paw Clinic: walkthrough" },
};

export type VideoKey = keyof typeof videos;

export type IconName = "page" | "flow" | "spark" | "target" | "calendar" | "message";

export const pillars: { icon: IconName; title: string; desc: string }[] = [
  { icon: "page", title: "Funnels & websites", desc: "Pages built to convert, in GoHighLevel, Lovable or WordPress." },
  { icon: "flow", title: "CRM & pipelines", desc: "Every lead tracked, tagged and moved to the right stage automatically." },
  { icon: "spark", title: "AI automations", desc: "Scoring, replies, booking and briefs, so your team only steps in when it matters." },
];

export const glow = {
  title: "GLOW: AI lead system for a med spa",
  tags: ["GoHighLevel", "n8n", "Med spa · Demo build"],
  description:
    "When a lead fills out the website form or messages the chat, AI scores them as hot, warm or cold and sends a matching reply within seconds. Or Mia, the AI assistant, answers their questions and books them directly. Every lead lands in the GoHighLevel pipeline, where follow-ups, reminders and staff alerts move them from new lead to booked consultation automatically.",
  wins: [
    "Every lead gets a reply in under a minute",
    "Follow-ups stop the moment someone replies",
    "AI assistant answers questions and books 24/7",
    "Patients get automatic reminders",
    "No-shows get a second chance",
    "The team walks into every consult prepared",
  ],
};

export type Slide = { n: string; img: string; w: number; h: number; title: string; chain: string; dark?: boolean };

export const buildSlides: Slide[] = [
  { n: "01", img: "/images/workflows/glow-01.webp", w: 2400, h: 579, title: "New lead intake + AI qualify", chain: "Form or chat > service check > AI scores hot / warm / cold > matching reply" },
  { n: "02", img: "/images/workflows/glow-02.webp", w: 2400, h: 502, title: "Follow-up until they reply", chain: "Nurture tag > wait > email > wait > email > no reply: move to Cold" },
  { n: "03", img: "/images/workflows/glow-02b.webp", w: 1395, h: 792, title: "Lead replied: stop follow-up", chain: "Lead replies > exit follow-up > move to Engaged > alert staff > send booking link" },
  { n: "04", img: "/images/workflows/glow-03.webp", w: 2400, h: 387, title: "Appointment booked + reminders", chain: "Booked > stop follow-ups > confirmation > reminders before the visit" },
  { n: "05", img: "/images/workflows/glow-03b.webp", w: 2400, h: 378, title: "No-show recovery", chain: "Marked no-show > tag > re-engage > rebook" },
  { n: "06", img: "/images/workflows/glow-03c.webp", w: 2400, h: 363, title: "Showed: review request", chain: "Marked showed > stop reminders > thank you > review request after the visit" },
  { n: "07", img: "/images/workflows/glow-04a.webp", w: 1172, h: 917, title: "Booked: send to n8n", chain: "Consultation booked > webhook sends lead + appointment to n8n" },
  { n: "08", img: "/images/workflows/glow-04.webp", w: 2400, h: 777, dark: true, title: "n8n: AI brief back to GHL", chain: "Webhook > clean fields > Gemini writes brief + score > Sheets > Gmail > GHL API" },
  { n: "09", img: "/images/workflows/glow-05.webp", w: 2320, h: 1080, title: "Mia handover: alert staff", chain: "Handoff tag > medical concern? > priority or general alert > clear tags" },
];

export type WorkItem = {
  name: string;
  img: string;
  tags: string[];
  built: string;
  cta: string;
  href?: string;
  video?: VideoKey;
};

export const featuredWork: WorkItem = {
  name: "Mark Z Properties",
  img: "/images/work/mark-z.webp",
  tags: ["Lovable", "Website", "Real estate"],
  built: "Website for a Detroit real estate team, with home search, home valuation and seller lead capture.",
  cta: "Visit site",
  href: "https://markzproperties.com/",
};

export const sites: WorkItem[] = [
  { name: "Rhonda Hurford", img: "/images/work/rhonda-hurford.webp", tags: ["Lovable", "Website", "Real estate"], built: "Realtor site for a branch manager serving Indiana lake-area buyers and sellers, with search and valuation.", cta: "Visit site", href: "https://rhondahurford.com/" },
  { name: "Main Street Properties", img: "/images/work/main-street.webp", tags: ["Lovable", "Website", "Real estate"], built: "Website for a Lowcountry real estate team, with home search, home valuation and cash offers.", cta: "Visit site", href: "https://mainstreetproperties.net/" },
  { name: "XA Mortgages", img: "/images/work/xa-mortgages.webp", tags: ["GoHighLevel", "Website", "Mortgage"], built: "Full client-facing site and consultation path for a licensed mortgage advisor.", cta: "Visit site", href: "https://xamortgages.com/" },
  { name: "On the Bay Real Estate", img: "/images/work/on-the-bay.webp", tags: ["Lovable", "Website", "Real estate"], built: "Website for a Santa Cruz coastal real estate team, with property search and chat.", cta: "Visit site", href: "https://onthebayrealestate.com/" },
  { name: "Maison des Cartes", img: "/images/work/maison-des-cartes.webp", tags: ["GoHighLevel", "Funnel", "Concept"], built: "Fine-dining landing page with a reservation CTA, hours and offer bar.", cta: "View funnel", href: "https://app.astroaiautomations.com/v2/preview/CzKbOILyugjG7PBIay8h" },
  { name: "OPTIVIA", img: "/images/work/optivia.webp", tags: ["GoHighLevel", "Funnel", "Agency"], built: "Lead funnel for an AI automation agency, with a countdown offer and free audit CTA.", cta: "View funnel", href: "https://app.astroaiautomations.com/v2/preview/U1n6KnnoM1ziOD2Ew682" },
];

export const automations: WorkItem[] = [
  { name: "GLOW", img: "/images/work/glow.webp", tags: ["GoHighLevel", "n8n", "AI"], built: "AI lead scoring, instant replies and Mia, an AI assistant that answers questions and books consults.", cta: "Watch walkthrough", video: "glowFull" },
  { name: "Clear Paw Clinic", img: "/images/work/clear-paw.webp", tags: ["GoHighLevel", "Workflows", "Vet clinic"], built: "Vet clinic funnel with 5 stage workflows and the Aurora AI chat agent.", cta: "Watch walkthrough", video: "clearPaw" },
];

export const moreSites = [
  { name: "Scott Ln Group", desc: "Real estate team serving San Antonio and the Texas Hill Country.", href: "https://scottlngroup.com/", host: "scottlngroup.com" },
  { name: "Kowalski Realty Group", desc: "Agent recruiting site for an eXp Realty team in Baltimore.", href: "https://edkowalski.com/", host: "edkowalski.com" },
  { name: "GoAI Mortgage", desc: "Mortgage website with an AI assistant built into the hero.", href: "https://goaimortgage.com/", host: "goaimortgage.com" },
  { name: "Faith Schnaible", desc: "Real estate site for an agent serving Santa Cruz and Austin.", href: "https://faithschnaible.com/", host: "faithschnaible.com" },
  { name: "Gerad Wombles", desc: "Agent recruiting site for a real estate group in West Central Missouri.", href: "https://geraldwombles.com/", host: "geraldwombles.com" },
];

export const steps = [
  { n: "01", title: "Map the journey", desc: "First click, booked call, follow-up. We decide what should never need a human twice." },
  { n: "02", title: "Design the funnel", desc: "Pages, offer and brand in GoHighLevel, so the next step is always obvious." },
  { n: "03", title: "Build the backend", desc: "Tags, pipeline, calendar, SMS and email, plus n8n and AI where GHL needs a brain." },
  { n: "04", title: "Test and hand off", desc: "We run a live lead through the system, then you get a simple SOP and walkthrough." },
];

export const services: { icon: IconName; title: string; desc: string }[] = [
  { icon: "spark", title: "GHL + n8n AI workflows", desc: "Native HighLevel automations first, n8n and AI when you need scoring, routing or tools GHL can’t reach." },
  { icon: "page", title: "Funnels & landing pages", desc: "Conversion-focused funnels and websites aligned with your offer, brand and audience." },
  { icon: "target", title: "Lead generation systems", desc: "Lead capture connected to automated follow-up, so no lead sits untouched." },
  { icon: "flow", title: "CRM & pipeline setup", desc: "Clean pipelines, stages and tags that give you full visibility over every lead." },
  { icon: "calendar", title: "Calendar & booking automation", desc: "Scheduling, confirmations, reminders and no-show follow-ups." },
  { icon: "message", title: "Email & SMS copywriting", desc: "Follow-up messages written to get replies, not ignored." },
];
