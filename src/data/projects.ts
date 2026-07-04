import type { Locale } from "@/dictionaries";

type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  year: string;
  tagline: Localized;
  description: Localized;
  role: Localized;
  tech: string[];
  url?: string;
  repo?: string;
  /** Icon path in /public. */
  icon: string;
  /** Accent color used in the card. */
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "fitcontrol",
    name: "FitControl",
    year: "2025",
    tagline: {
      es: "El sistema operativo para gimnasios.",
      en: "The operating system for gyms.",
    },
    description: {
      es: "Plataforma todo-en-uno para gimnasios, academias y entrenadores: control de accesos, cobros, gestión de socios y su propia página web para captar clientes.",
      en: "All-in-one platform for gyms, studios and personal trainers: access control, payments, member management and their own website to attract clients.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    url: "https://fitcorecenter.com/",
    icon: "/icon-fitcontrol.png",
    accent: "#FF6B35",
  },
  {
    slug: "ciudadano-alerta",
    name: "Ciudadano Alerta",
    year: "2024",
    tagline: {
      es: "Red ciudadana de alertas de seguridad en tiempo real.",
      en: "Citizen network for real-time safety alerts.",
    },
    description: {
      es: "Plataforma que permite a los ciudadanos reportar y recibir alertas de seguridad en tiempo real dentro de su comunidad, fomentando la colaboración y la respuesta rápida ante incidentes.",
      en: "A platform that lets citizens report and receive real-time safety alerts within their community, fostering collaboration and rapid response to incidents.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["Kotlin", "Firebase", "Node.js", "Google Maps"],
    url: "https://www.ciudadanoalerta.com/",
    icon: "/icon-ciudadano-alerta.png",
    accent: "#ef4444",
  },
  {
    slug: "sania",
    name: "Sania",
    year: "2024",
    tagline: {
      es: "Gestión clínica potenciada con IA.",
      en: "AI-powered clinical management.",
    },
    description: {
      es: "Aplicación multiplataforma para clínicas que digitaliza la gestión de pacientes, personal y consultas, con asistencia de inteligencia artificial para agilizar la operación diaria.",
      en: "A multiplatform application for clinics that digitizes patient, staff and appointment management, with AI assistance to streamline day-to-day operations.",
    },
    role: {
      es: "Fundador y desarrollador principal",
      en: "Founder & lead developer",
    },
    tech: ["Kotlin Multiplatform", "Compose", "AI", "Firebase"],
    url: "https://www.saniape.com/",
    icon: "/icon-sania.png",
    accent: "#14b8a6",
  },
  {
    slug: "helpet",
    name: "HelPet",
    year: "2023",
    tagline: {
      es: "Cuidado, servicios y adopción de mascotas.",
      en: "Pet care, services and adoption.",
    },
    description: {
      es: "Aplicación que conecta a dueños de mascotas con servicios veterinarios y facilita procesos de adopción responsable, centralizando el cuidado de cada mascota en un solo lugar.",
      en: "An app that connects pet owners with veterinary services and streamlines responsible adoption processes, centralizing each pet's care in one place.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["Kotlin", "Android", "REST API", "Firebase"],
    url: "https://help-pet.com/",
    icon: "/icon-helpet.png",
    accent: "#f59e0b",
  },
  {
    slug: "maxfind",
    name: "MaxFind",
    year: "2023",
    tagline: {
      es: "Buscador inteligente de productos y servicios cercanos.",
      en: "Smart finder for nearby products and services.",
    },
    description: {
      es: "Herramienta de búsqueda que ayuda a los usuarios a encontrar productos y servicios cercanos de forma rápida y eficiente, conectando la oferta local con quien la necesita.",
      en: "A search tool that helps users quickly and efficiently find nearby products and services, connecting local offerings with the people who need them.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["TypeScript", "Next.js", "Node.js", "Tailwind CSS"],
    url: "https://maxfind.app/",
    icon: "/icon-maxfind.png",
    accent: "#6366f1",
  },
];
