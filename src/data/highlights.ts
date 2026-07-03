import type { Locale } from "@/dictionaries";

type Localized = Record<Locale, string>;

/** Headline metrics — all grounded in the CV. */
export type Metric = {
  value: string;
  label: Localized;
};

export const metrics: Metric[] = [
  {
    value: "14+",
    label: { es: "años construyendo software", en: "years building software" },
  },
  {
    value: "100K+",
    label: {
      es: "documentos procesados con RAG",
      en: "documents processed with RAG",
    },
  },
  {
    value: "-45%",
    label: { es: "en uso de tokens (prompt eng.)", en: "token usage (prompt eng.)" },
  },
  {
    value: "12+",
    label: {
      es: "microservicios serverless desplegados",
      en: "serverless microservices deployed",
    },
  },
];

/** Services — positions Jonathan / Norac Labs as a studio, not just a hire. */
export type Service = {
  icon: "architecture" | "ai" | "cloud" | "data";
  title: Localized;
  body: Localized;
};

export const services: Service[] = [
  {
    icon: "ai",
    title: { es: "Automatización con IA", en: "AI automation" },
    body: {
      es: "Automatizamos tareas repetitivas y respuestas a clientes con inteligencia artificial, para que tu equipo dedique su tiempo a lo importante.",
      en: "We automate repetitive tasks and customer replies with AI, so your team can spend time on what matters.",
    },
  },
  {
    icon: "cloud",
    title: { es: "Apps y páginas web a medida", en: "Custom apps & websites" },
    body: {
      es: "Diseñamos y desarrollamos aplicaciones móviles y sitios web hechos para tu negocio, rápidos y fáciles de usar.",
      en: "We design and build mobile apps and websites made for your business — fast and easy to use.",
    },
  },
  {
    icon: "architecture",
    title: { es: "Sistemas de gestión", en: "Management systems" },
    body: {
      es: "Digitalizamos tus procesos: ventas, clientes, inventario o citas en un solo sistema ordenado y accesible desde cualquier lugar.",
      en: "We digitize your processes — sales, clients, inventory or appointments — in one tidy system, accessible from anywhere.",
    },
  },
  {
    icon: "data",
    title: { es: "Integraciones y datos", en: "Integrations & data" },
    body: {
      es: "Conectamos tus herramientas (pagos, WhatsApp, facturación) y ordenamos tu información para que tomes mejores decisiones.",
      en: "We connect your tools (payments, WhatsApp, billing) and organize your data so you make better decisions.",
    },
  },
];
