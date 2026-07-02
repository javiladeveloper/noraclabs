import type { Locale } from "@/dictionaries";

type Localized = Record<Locale, string>;

export type Skill = {
  name: string;
  /** Short note shown in the tooltip on click — level / years. */
  note: Localized;
};

export type SkillBranch = {
  id: string;
  label: Localized;
  /** Accent color for the branch and its nodes. */
  color: string;
  /** Leaf skills that hang off this branch. */
  skills: Skill[];
};

/** The core sits at the center; every branch connects back to it. */
export const skillCore: Localized = {
  es: "Fundamentos",
  en: "Fundamentals",
};

/** Skills the core itself represents (shown on hover / for a11y). */
export const skillCoreItems: Localized = {
  es: "Lógica · Estructuras de datos · Algoritmos · SOLID · Patrones · Clean Architecture",
  en: "Logic · Data structures · Algorithms · SOLID · Patterns · Clean Architecture",
};

/** Helper to keep the data terse: "8+ años" / "8+ yrs". */
const yrs = (n: number): Localized => ({
  es: `${n}+ años`,
  en: `${n}+ yrs`,
});

export const skillBranches: SkillBranch[] = [
  {
    id: "backend",
    label: { es: "Backend", en: "Backend" },
    color: "#6366f1",
    skills: [
      { name: "Node.js", note: yrs(6) },
      { name: "NestJS", note: yrs(3) },
      { name: "Python", note: yrs(4) },
      { name: "FastAPI", note: yrs(3) },
      { name: "C# / .NET", note: yrs(6) },
      { name: "VB.NET", note: yrs(6) },
      { name: "Java", note: yrs(2) },
      { name: "GraphQL", note: yrs(3) },
      { name: "REST APIs", note: yrs(6) },
      { name: "Microservices", note: yrs(5) },
    ],
  },
  {
    id: "databases",
    label: { es: "Bases de datos", en: "Databases" },
    color: "#22c55e",
    skills: [
      { name: "PostgreSQL", note: yrs(5) },
      { name: "MySQL", note: yrs(6) },
      { name: "SQL Server", note: yrs(6) },
      { name: "Oracle", note: yrs(3) },
      { name: "MongoDB", note: yrs(4) },
      { name: "DynamoDB", note: yrs(4) },
      { name: "Redis", note: yrs(3) },
    ],
  },
  {
    id: "ai",
    label: { es: "AI Engineering", en: "AI Engineering" },
    color: "#14b8a6",
    skills: [
      { name: "Generative AI", note: yrs(3) },
      { name: "RAG", note: yrs(3) },
      { name: "LangChain", note: yrs(3) },
      { name: "LangGraph", note: yrs(2) },
      { name: "Vector DBs", note: yrs(2) },
      { name: "LLM Agents", note: yrs(2) },
      { name: "AWS Bedrock", note: yrs(2) },
    ],
  },
  {
    id: "frontend",
    label: { es: "Frontend", en: "Frontend" },
    color: "#f59e0b",
    skills: [
      { name: "React", note: yrs(4) },
      { name: "Next.js", note: yrs(3) },
      { name: "Vue", note: yrs(2) },
      { name: "Angular", note: yrs(2) },
      { name: "TypeScript", note: yrs(5) },
      { name: "Tailwind CSS", note: yrs(3) },
      { name: "Micro-Frontends", note: yrs(3) },
    ],
  },
  {
    id: "cloud",
    label: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    color: "#ef4444",
    skills: [
      { name: "AWS", note: yrs(5) },
      { name: "Lambda", note: yrs(5) },
      { name: "EventBridge", note: yrs(3) },
      { name: "GCP", note: yrs(2) },
      { name: "Docker", note: yrs(4) },
      { name: "CI/CD", note: yrs(4) },
      { name: "Kafka", note: yrs(3) },
    ],
  },
  {
    id: "mobile",
    label: { es: "Mobile", en: "Mobile" },
    color: "#a855f7",
    skills: [
      { name: "Kotlin", note: yrs(3) },
      { name: "Kotlin Multiplatform", note: yrs(2) },
      { name: "Jetpack Compose", note: yrs(2) },
      { name: "Android", note: yrs(3) },
    ],
  },
];
