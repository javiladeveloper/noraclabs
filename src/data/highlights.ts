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
    title: { es: "IA Generativa & RAG", en: "Generative AI & RAG" },
    body: {
      es: "Sistemas RAG, agentes LLM y pipelines NLP listos para producción — con foco en precisión, trazabilidad y control de costos.",
      en: "Production-ready RAG systems, LLM agents and NLP pipelines — focused on accuracy, traceability and cost control.",
    },
  },
  {
    icon: "architecture",
    title: { es: "Arquitectura de sistemas", en: "System architecture" },
    body: {
      es: "Diseño de arquitecturas serverless y event-driven en AWS, con Clean/Onion Architecture y foco en escalabilidad.",
      en: "Serverless and event-driven architectures on AWS, with Clean/Onion Architecture and a focus on scalability.",
    },
  },
  {
    icon: "cloud",
    title: { es: "Backend & APIs", en: "Backend & APIs" },
    body: {
      es: "APIs REST/GraphQL y microservicios en Python y Node.js, con latencias por debajo de 200 ms y resiliencia real.",
      en: "REST/GraphQL APIs and microservices in Python and Node.js, with sub-200ms latency and real resilience.",
    },
  },
  {
    icon: "data",
    title: { es: "Datos escalables", en: "Scalable data systems" },
    body: {
      es: "Modelado de datos SQL y NoSQL, búsqueda semántica con vector DBs y pipelines de datos para volúmenes altos.",
      en: "SQL and NoSQL data modeling, semantic search with vector DBs and data pipelines for high volumes.",
    },
  },
];
