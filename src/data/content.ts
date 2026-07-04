import type { Locale } from "@/dictionaries";

type Localized = Record<Locale, string>;

/** "How we work" — simple steps for non-technical visitors. */
export type Step = {
  icon: "chat" | "design" | "build" | "launch";
  title: Localized;
  body: Localized;
};

export const steps: Step[] = [
  {
    icon: "chat",
    title: { es: "Cuéntanos tu idea", en: "Tell us your idea" },
    body: {
      es: "Nos escribes por WhatsApp o el formulario. Entendemos tu negocio y qué necesitas, sin tecnicismos.",
      en: "You reach us via WhatsApp or the form. We understand your business and what you need — no jargon.",
    },
  },
  {
    icon: "design",
    title: { es: "Diseñamos la solución", en: "We design the solution" },
    body: {
      es: "Te proponemos cómo resolverlo y cómo se verá, con un plan y presupuesto claros antes de empezar.",
      en: "We propose how to solve it and how it will look, with a clear plan and budget before we start.",
    },
  },
  {
    icon: "build",
    title: { es: "Lo construimos", en: "We build it" },
    body: {
      es: "Desarrollamos tu app, web o sistema mostrándote avances, para que nada te sorprenda al final.",
      en: "We build your app, website or system while showing you progress, so nothing surprises you at the end.",
    },
  },
  {
    icon: "launch",
    title: { es: "Lanzamos y acompañamos", en: "We launch & support" },
    body: {
      es: "Ponemos tu proyecto en marcha y te damos soporte para que siga funcionando y creciendo.",
      en: "We launch your project and give you support so it keeps running and growing.",
    },
  },
];

/** "Why choose us" — emotional benefits, non-technical. */
export type Benefit = {
  icon: "clock" | "shield" | "chat" | "chart";
  title: Localized;
  body: Localized;
};

export const benefits: Benefit[] = [
  {
    icon: "clock",
    title: { es: "Ahorras tiempo", en: "You save time" },
    body: {
      es: "Automatizamos lo repetitivo para que tú y tu equipo se enfoquen en lo que importa.",
      en: "We automate the repetitive so you and your team focus on what matters.",
    },
  },
  {
    icon: "chat",
    title: { es: "Sin complicaciones", en: "No headaches" },
    body: {
      es: "Hablamos claro. No necesitas saber de tecnología: nosotros nos encargamos de todo.",
      en: "We speak plainly. You don't need to know tech — we handle everything.",
    },
  },
  {
    icon: "shield",
    title: { es: "Trato cercano", en: "Close support" },
    body: {
      es: "Trabajas directo con quien construye tu proyecto. Respuestas rápidas y honestas.",
      en: "You work directly with who builds your project. Fast, honest answers.",
    },
  },
  {
    icon: "chart",
    title: { es: "Resultados reales", en: "Real results" },
    body: {
      es: "14+ años de experiencia entregando productos que funcionan y generan valor.",
      en: "14+ years delivering products that work and create value.",
    },
  },
];

/** FAQ — the questions a non-technical client actually asks. */
export type Faq = {
  q: Localized;
  a: Localized;
};

export const faqs: Faq[] = [
  {
    q: { es: "¿Necesito saber de tecnología?", en: "Do I need to know tech?" },
    a: {
      es: "Para nada. Tú nos cuentas qué quieres lograr en tu negocio y nosotros lo convertimos en una solución. Te explicamos todo en palabras simples.",
      en: "Not at all. You tell us what you want to achieve and we turn it into a solution, explaining everything in plain words.",
    },
  },
  {
    q: { es: "¿Cuánto cuesta un proyecto?", en: "How much does a project cost?" },
    a: {
      es: "Depende de lo que necesites. Después de entender tu idea te damos un presupuesto claro y sin sorpresas, antes de empezar.",
      en: "It depends on what you need. After understanding your idea we give you a clear, no-surprises quote before starting.",
    },
  },
  {
    q: { es: "¿Cuánto tiempo toma?", en: "How long does it take?" },
    a: {
      es: "Un proyecto pequeño puede estar en pocas semanas; uno más grande, algunos meses. Siempre te damos un plazo estimado desde el inicio.",
      en: "A small project can be ready in a few weeks; a larger one, a few months. We always give you an estimated timeline from the start.",
    },
  },
  {
    q: { es: "¿Dan soporte después?", en: "Do you provide support afterwards?" },
    a: {
      es: "Sí. No te dejamos solo tras el lanzamiento: te acompañamos para que tu proyecto siga funcionando y pueda crecer.",
      en: "Yes. We don't leave you alone after launch: we support you so your project keeps running and can grow.",
    },
  },
  {
    q: { es: "¿Trabajan con negocios pequeños?", en: "Do you work with small businesses?" },
    a: {
      es: "Claro. Trabajamos con emprendedores y empresas de todos los tamaños. Adaptamos la solución a tu presupuesto y objetivos.",
      en: "Absolutely. We work with entrepreneurs and businesses of all sizes, adapting the solution to your budget and goals.",
    },
  },
];

/** Tech badges — signals solidity without being the focus. */
export const techBadges: string[] = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Kotlin",
  "AWS",
  "Firebase",
  "IA / OpenAI",
];
