@AGENTS.md

# noraclabs — Portafolio profesional de Javier Ávila

Portafolio web personal bilingüe (ES/EN) con información profesional (CV) y los
proyectos propios: **VecinoAlerta, Sania, HelPet, MaxiFind**.

## Ubicación y ejecución

- **Ruta del proyecto:** `d:\Personal Proyects\noraclabs`
- **Repo git:** `git@github.com:javiladeveloper/noraclabs.git` (aún sin commits/push)
- El shell de la terminal se resetea a `C:\Users\USUARIO`; usar rutas absolutas o
  `cd "/d/Personal Proyects/noraclabs"` al inicio de cada comando.

```bash
cd "/d/Personal Proyects/noraclabs"
npm run dev      # servidor de desarrollo (usa :3000, o :3001 si está ocupado)
npm run build    # build de producción — también genera los tipos PageProps/LayoutProps
npm run lint
```

- URLs en dev: `http://localhost:3001/es` y `http://localhost:3001/en`
  (la raíz `/` redirige al idioma según el navegador).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (config vía `@import "tailwindcss"` en `globals.css`, sin
  `tailwind.config`; tema con variables CSS y `@theme inline`)
- Alias de imports: `@/*` → `src/*`

## ⚠️ Next.js 16 — breaking changes (ver AGENTS.md)

Esta versión difiere de versiones anteriores. Antes de escribir código, consultar
`node_modules/next/dist/docs/`. Puntos ya aplicados en este proyecto:

- `params` es **asíncrono**: `const { lang } = await params;`
- **Middleware se llama ahora `proxy`** → el archivo es `src/proxy.ts` (export
  `proxy`, no `middleware`).
- Helpers globales de tipos `PageProps<'/[lang]'>` y `LayoutProps<'/[lang]'>` los
  **genera el build** en `.next/types`. Un `tsc --noEmit` en frío falla con
  "Cannot find name 'PageProps'" hasta correr `npm run build`. Es esperado.

## Estructura

```
src/
├── app/
│   └── [lang]/              # el root layout vive bajo el segmento dinámico (i18n)
│       ├── layout.tsx       # <html>, fuentes, generateStaticParams, generateMetadata
│       ├── page.tsx         # home: hero, about, experience, projects, contact, footer
│       ├── globals.css      # tema oscuro con variables CSS + @theme inline
│       └── favicon.ico
├── components/
│   ├── Navbar.tsx           # server component
│   ├── LangSwitcher.tsx     # "use client" — usa usePathname para cambiar de idioma
│   └── ProjectCard.tsx      # tarjeta de proyecto (color de acento por proyecto)
├── data/
│   ├── projects.ts          # los 4 proyectos (texto ES/EN por campo)
│   └── profile.ts           # nombre, email, socials, skills, experiencia, ruta del CV
├── dictionaries/
│   ├── es.json / en.json    # textos de UI por idioma
│   └── index.ts             # getDictionary, hasLocale, locales, defaultLocale ("es")
└── proxy.ts                 # redirección de locale según Accept-Language
```

## i18n

- Locales soportados: `es` (por defecto) y `en`, definidos en `src/dictionaries/index.ts`.
- Textos de **UI** → `dictionaries/*.json`. Textos de **contenido** (proyectos,
  experiencia) → objetos `{ es, en }` en `src/data/`.
- Para añadir un idioma: agregarlo en `dictionaries/index.ts`, crear su `.json`,
  y añadirlo al array `locales` de `proxy.ts` y `LangSwitcher.tsx`.

## Contenido a completar (placeholders actuales)

Los datos son **plantillas realistas pendientes de reemplazar con el CV real**:

- `src/data/profile.ts`: email, `location`, `socials` (LinkedIn/website vacíos),
  `skills`, `experience`, y `resume` (ruta a un PDF en `/public`, vacío = oculta el botón).
- `src/data/projects.ts`: por cada proyecto revisar `year`, `tagline`, `description`,
  `role`, `tech`, y añadir `url`/`repo` si existen (si no, no se muestran los enlaces).
- Confirmar la ortografía exacta de los nombres de proyecto con el usuario.

## Pendientes

- [ ] Reemplazar placeholders con datos reales del CV.
- [ ] Colocar el PDF del CV en `public/` y apuntar `profile.resume`.
- [ ] Primer commit y push al repo remoto.
- [ ] (Opcional) Desplegar en Vercel.
