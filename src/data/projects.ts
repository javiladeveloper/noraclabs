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
    slug: "fitcore",
    name: "FitCore",
    year: "2025",
    tagline: {
      es: "El sistema operativo para gimnasios.",
      en: "The operating system for gyms.",
    },
    description: {
      es: "Gestión completa del gimnasio: socios, membresías y cobros con MercadoPago, app para socios (Android/iOS) con rutinas de más de 1,300 ejercicios, y Finny, un vendedor con IA que atiende el WhatsApp del negocio 24/7.",
      en: "Complete gym management: members, memberships and MercadoPago payments, a member app (Android/iOS) with a 1,300+ exercise routine library, and Finny, an AI salesperson answering the business WhatsApp 24/7.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["Next.js", "TypeScript", "AI", "MercadoPago"],
    url: "https://fitcorecenter.com/",
    icon: "/icon-fitcore.png",
    accent: "#FF6B35",
  },
  {
    slug: "sania",
    name: "Sania",
    year: "2024",
    tagline: {
      es: "Gestión clínica con asistente IA por WhatsApp.",
      en: "Clinic management with an AI WhatsApp assistant.",
    },
    description: {
      es: "Ordena la clínica o consultorio: agenda, fichas de tratamiento, caja y comisiones automáticas, con app Android para el equipo, portal del paciente y Sani, un agente con IA que agenda citas reales por WhatsApp.",
      en: "Runs the clinic end to end: scheduling, treatment records, cash flow and automatic commissions, with an Android app for staff, a patient portal and Sani, an AI agent that books real appointments over WhatsApp.",
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
    slug: "leadai",
    name: "LeadAI",
    year: "2026",
    tagline: {
      es: "Tu WhatsApp atendido por IA, 24/7.",
      en: "Your WhatsApp answered by AI, 24/7.",
    },
    description: {
      es: "Toma pedidos completos de restaurantes por WhatsApp —valida pagos Yape/Plin leyendo el comprobante con IA—, ofrece carta digital con link propio y califica interesados para negocios de servicios, pasando a un humano cuando hace falta.",
      en: "Takes complete restaurant orders over WhatsApp — validating Yape/Plin payments by reading receipts with AI — offers a digital menu with its own link, and qualifies leads for service businesses, handing off to a human when needed.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["AI", "WhatsApp API", "TypeScript", "Next.js"],
    url: "https://leadai-pe.com/",
    icon: "/icon-leadai.svg",
    accent: "#22c55e",
  },
  {
    slug: "wappido",
    name: "Wappido",
    year: "2026",
    tagline: {
      es: "Pedidos por WhatsApp para tu restaurante.",
      en: "WhatsApp ordering for your restaurant.",
    },
    description: {
      es: "App y panel para que un restaurante reciba pedidos por WhatsApp con un bot, cobre por Yape/Plin y maneje su cocina, carta, reservas y delivery — el cliente pide desde la carta web sin descargar nada.",
      en: "App and dashboard for restaurants to take WhatsApp orders with a bot, charge via Yape/Plin and run their kitchen, menu, reservations and delivery — customers order from the web menu with nothing to install.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["Android", "WhatsApp API", "Next.js", "AI"],
    url: "https://wappido.com/",
    icon: "/icon-wappido.svg",
    accent: "#E8503A",
  },
  {
    slug: "niami-niami",
    name: "Niami Niami",
    year: "2026",
    tagline: {
      es: "La app para pedir de tus restaurantes favoritos.",
      en: "The app for ordering from your favorite restaurants.",
    },
    description: {
      es: "App de comensales conectada al ecosistema de pedidos: exploras la carta del restaurante, armas tu carrito y pagas desde el celular, con tu pedido cayendo directo a la cocina.",
      en: "A diner app connected to the ordering ecosystem: browse the restaurant's menu, build your cart and pay from your phone, with the order landing straight in the kitchen.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["Kotlin Multiplatform", "Compose", "Android"],
    icon: "/icon-niami.svg",
    accent: "#f43f5e",
  },
  {
    slug: "facnow",
    name: "FacNow",
    year: "2026",
    tagline: {
      es: "Boletas y facturas SUNAT sin complicarte.",
      en: "Peruvian e-invoicing without the hassle.",
    },
    description: {
      es: "Emisión de boletas, facturas y notas de crédito ante SUNAT desde el navegador, con autocompletado por RUC/DNI, catálogo de clientes y productos, historial con XML/CDR/PDF y ayuda para obtener el certificado digital.",
      en: "Issues receipts, invoices and credit notes to SUNAT (Peru's tax authority) from the browser, with RUC/DNI autocomplete, client and product catalogs, full history with XML/CDR/PDF and guided digital certificate setup.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["TypeScript", "Next.js", "Node.js", "SUNAT"],
    icon: "/icon-facnow.svg",
    accent: "#3b82f6",
  },
  {
    slug: "light-drive",
    name: "Light Drive",
    year: "2026",
    tagline: {
      es: "Pide tu moto y pon tú el precio, en Tacna.",
      en: "Hail a moto and name your price, in Tacna.",
    },
    description: {
      es: "El pasajero propone el precio y los motorizados ofertan: personas, delivery y encomiendas en una sola app (Android/iOS), con mapa en vivo, chat interno y motorizados verificados por brevete y placa.",
      en: "Passengers propose the fare and riders bid: rides, delivery and parcels in a single app (Android/iOS), with live map tracking, in-app chat and riders verified by license and plate.",
    },
    role: {
      es: "Fundador y desarrollador",
      en: "Founder & developer",
    },
    tech: ["Android", "iOS", "Google Maps", "Realtime"],
    url: "https://play.google.com/store/apps/details?id=pe.leadai.rider",
    icon: "/icon-lightdrive.svg",
    accent: "#eab308",
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
