import { faqs, glow, profile, services, siteUrl } from "./content";

// Structured data (JSON-LD) that tells Google and AI tools who you are and what you offer.
// Client names are intentionally left out so your brand isn't tied to their searches.
export function buildSchema() {
  const personId = `${siteUrl}/#person`;
  const serviceId = `${siteUrl}/#service`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.title,
        description:
          "GoHighLevel specialist who builds funnels, websites, CRM pipelines and AI-powered automations that reply to, qualify and book leads automatically.",
        url: siteUrl,
        image: `${siteUrl}/images/shan-portrait.jpg`,
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressCountry: "PH" },
        sameAs: [profile.linkedin, profile.onlinejobs],
        knowsAbout: [
          "GoHighLevel",
          "HighLevel CRM",
          "Marketing automation",
          "AI automation",
          "Conversation AI",
          "AI lead scoring",
          "n8n",
          "Sales funnels",
          "Landing pages",
          "CRM pipeline setup",
          "Appointment booking automation",
          "Email and SMS follow-up",
          "Lovable",
          "WordPress",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: `${profile.name}, ${profile.title}`,
        url: siteUrl,
        image: `${siteUrl}/images/logo-mark.png`,
        logo: `${siteUrl}/images/logo-mark.png`,
        email: profile.email,
        telephone: "+639603059148",
        founder: { "@id": personId },
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressCountry: "PH" },
        description:
          "GoHighLevel funnels, websites, CRM and pipeline setup, and AI automations for service businesses. Every lead gets a fast reply, consistent follow-up and an easy way to book.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "GoHighLevel and AI automation services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.desc },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: `${profile.name} | ${profile.title}`,
        url: siteUrl,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "CreativeWork",
        name: glow.title,
        description: glow.description,
        creator: { "@id": personId },
        url: `${siteUrl}/#systems`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
