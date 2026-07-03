import type { Locale } from "@/dictionaries";

type Localized = Record<Locale, string>;

export const profile = {
  name: "Jonathan Avila",
  /** Shown in the hero as the role/title. */
  email: "noraclabspe@gmail.com",
  location: {
    es: "Tacna, Perú",
    en: "Tacna, Peru",
  } satisfies Localized,
  /** WhatsApp number in international format, digits only (for wa.me links). */
  whatsapp: "51986110558",
  socials: {
    github: "https://github.com/javiladeveloper",
    linkedin: "",
    website: "",
  },
  /** Path to the CV file placed in /public. Leave empty to hide the button. */
  resume: {
    es: "/Jonathan_Avila_CV.pdf",
    en: "/Jonathan_Avila_CV.pdf",
  } satisfies Localized,
};

export const skills: string[] = [
  // Backend (foco)
  "Python",
  "FastAPI",
  "Node.js",
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "Microservices",
  // IA / LLM
  "Generative AI",
  "RAG",
  "LangChain",
  "LangGraph",
  "Vector DBs",
  // Cloud
  "AWS",
  "AWS Lambda",
  "AWS Bedrock",
  "Azure",
  "Docker",
  "CI/CD",
  // Frontend / Mobile
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Tailwind CSS",
  "Kotlin",
  "Kotlin Multiplatform",
];

export type ExperienceItem = {
  company: string;
  role: Localized;
  start: string;
  /** Empty string means "present". */
  end: string;
  description: Localized;
};

export const experience: ExperienceItem[] = [
  {
    company: "Coderio — Coca-Cola Andina",
    role: {
      es: "Senior AI Engineer · Backend & Fullstack",
      en: "Senior AI Engineer · Backend & Fullstack",
    },
    start: "2024",
    end: "",
    description: {
      es: "Plataforma de automatización con IA: sistemas multi-agente con LangChain y AWS Bedrock (GPT-4, Claude, Gemini), pipelines RAG sobre 100K+ documentos y microservicios serverless con latencias por debajo de 200 ms.",
      en: "AI-driven automation platform: multi-agent systems with LangChain and AWS Bedrock (GPT-4, Claude, Gemini), RAG pipelines over 100K+ documents, and serverless microservices with sub-200ms latency.",
    },
  },
  {
    company: "Distillery — Naranja X",
    role: {
      es: "Senior AI Engineer · Backend",
      en: "Senior AI Engineer · Backend",
    },
    start: "2023",
    end: "2024",
    description: {
      es: "Plataforma de servicios financieros: interfaces conversacionales de IA (70% de desvío de consultas), sistema RAG para 50K+ consultas mensuales y servicios backend event-driven resilientes en AWS.",
      en: "Financial services platform: conversational AI interfaces (70% inquiry deflection), a RAG system handling 50K+ monthly queries, and resilient event-driven backend services on AWS.",
    },
  },
  {
    company: "NTT DATA — AUNA Salud y Seguros",
    role: {
      es: "Lead Software Engineer · Fullstack & IA",
      en: "Lead Software Engineer · Fullstack & AI",
    },
    start: "2022",
    end: "2023",
    description: {
      es: "Plataforma de salud: lideré un equipo de 5 desarrolladores, integré LLMs para automatizar la comunicación con pacientes (–50% de carga administrativa) y diseñé una arquitectura onion con pipelines NLP sobre registros médicos.",
      en: "Healthcare platform: led a team of 5 developers, integrated LLMs to automate patient communication (–50% administrative overhead), and designed an onion architecture with NLP pipelines over medical records.",
    },
  },
  {
    company: "COMPLEXLESS",
    role: {
      es: "Software Engineer · Backend & Team Lead",
      en: "Software Engineer · Backend & Team Lead",
    },
    start: "2021",
    end: "2022",
    description: {
      es: "API unificada que integra múltiples redes sociales (YouTube, Facebook, Twitter, Instagram) sobre arquitectura serverless en AWS. Mentoría técnica y métricas de consumo y costo.",
      en: "Unified API integrating multiple social platforms (YouTube, Facebook, Twitter, Instagram) on AWS serverless architecture. Technical mentoring plus consumption and cost metrics.",
    },
  },
  {
    company: "Convoca · Tismart · FuturaSoft · IDW",
    role: {
      es: "Software Engineer · Backend",
      en: "Software Engineer · Backend",
    },
    start: "2020",
    end: "2022",
    description: {
      es: "Servicios backend en Node.js/Express y funciones AWS Lambda para clientes en distintos dominios: levantamiento de requerimientos, diseño de datos y entrega de features con PostgreSQL/MySQL/MongoDB.",
      en: "Backend services in Node.js/Express and AWS Lambda functions for clients across domains: requirements gathering, data design, and feature delivery with PostgreSQL/MySQL/MongoDB.",
    },
  },
  {
    company: "Universidad Privada de Tacna · Industrias San Miguel · JyC",
    role: {
      es: "Software Developer · TI (primeros roles)",
      en: "Software Developer · IT (early roles)",
    },
    start: "2012",
    end: "2019",
    description: {
      es: "Inicio de mi carrera: desarrollo de sistemas administrativos y pedagógicos en la Universidad Privada de Tacna, soporte y sistemas comerciales en Industrias San Miguel, y desarrollo de sistemas de negocio en JyC Asesores.",
      en: "Start of my career: built administrative and pedagogical systems at Universidad Privada de Tacna, commercial systems and IT support at Industrias San Miguel, and business systems at JyC Asesores.",
    },
  },
];
