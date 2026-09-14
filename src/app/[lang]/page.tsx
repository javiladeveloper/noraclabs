import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import { projects } from "@/data/projects";
import { profile, experience } from "@/data/profile";
import { metrics, services } from "@/data/highlights";
import { steps, benefits, techBadges } from "@/data/content";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TiltCard } from "@/components/TiltCard";
import { HeroOrbit } from "@/components/HeroOrbit";
import { SkillGraph } from "@/components/SkillGraph";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ContactForm } from "@/components/ContactForm";
import { CountUp } from "@/components/CountUp";
import { Icon } from "@/components/Icon";
import { Faq } from "@/components/Faq";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const resume = profile.resume[lang];

  const orbitInfo: Record<
    string,
    { label: Record<typeof lang, string>; stat: Record<typeof lang, string> }
  > = {
    fitcore: {
      label: { es: "Gimnasios", en: "Gyms" },
      stat: { es: "En producción · Perú", en: "In production · Peru" },
    },
    sania: {
      label: { es: "Clínicas", en: "Clinics" },
      stat: { es: "En producción · Perú", en: "In production · Peru" },
    },
    leadai: {
      label: { es: "Ventas por WhatsApp", en: "WhatsApp sales" },
      stat: { es: "En producción · Perú", en: "In production · Peru" },
    },
    wappido: {
      label: { es: "Restaurantes", en: "Restaurants" },
      stat: { es: "En producción · Perú", en: "In production · Peru" },
    },
    "niami-niami": {
      label: { es: "App de comensales", en: "Diner app" },
      stat: { es: "Android · Perú", en: "Android · Peru" },
    },
    facnow: {
      label: { es: "Facturación SUNAT", en: "e-Invoicing" },
      stat: { es: "En producción · Perú", en: "In production · Peru" },
    },
    "light-drive": {
      label: { es: "Movilidad", en: "Mobility" },
      stat: { es: "Android + iOS · Tacna", en: "Android + iOS · Tacna" },
    },
    "ciudadano-alerta": {
      label: { es: "Seguridad ciudadana", en: "Public safety" },
      stat: { es: "Desde 2024", en: "Since 2024" },
    },
    helpet: {
      label: { es: "Mascotas", en: "Pets" },
      stat: { es: "Desde 2023", en: "Since 2023" },
    },
  };
  const orbitProducts = projects.slice(0, 9).map((p) => ({
    slug: p.slug,
    name: p.name,
    icon: p.icon,
    accent: p.accent,
    label: orbitInfo[p.slug]?.label[lang] ?? "",
    stat: orbitInfo[p.slug]?.stat[lang] ?? p.year,
    cta: lang === "es" ? "Ver proyecto" : "View project",
  }));

  const pitchWords = dict.hero.pitch.split(" ");
  const afterPitch = 140 + pitchWords.length * 80;

  return (
    <>
      <ScrollProgress />
      <Navbar lang={lang} dict={dict} />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="relative flex min-h-[86vh] items-center py-20">
          {/* Subtle neural-network backdrop + drifting gradient orbs */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            aria-hidden
          >
            <Image
              src="/hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
            />
            <div
              className="orb orb-a -left-24 top-16 h-96 w-96 opacity-35"
              style={{ background: "var(--accent)" }}
            />
            <div
              className="orb orb-b -right-16 bottom-8 h-80 w-80 opacity-25"
              style={{ background: "#d946ef" }}
            />
          </div>

          <div className="grid w-full items-center gap-12 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="hero-rise text-sm font-medium text-accent">
                {dict.hero.greeting}{" "}
                <span className="text-foreground">{dict.hero.name}</span>
                {" · "}
                {dict.hero.role}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
                {pitchWords.map((w, i) => (
                  <span
                    key={`${w}-${i}`}
                    className="word-rise"
                    style={{ ["--word-delay" as string]: `${140 + i * 80}ms` }}
                  >
                    {w}
                    {i < pitchWords.length - 1 ? " " : ""}
                  </span>
                ))}
              </h1>
              <p
                className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
                style={{ ["--rise-delay" as string]: `${afterPitch}ms` }}
              >
                {dict.hero.tagline}
              </p>
              <div
                className="hero-rise mt-8 flex flex-wrap gap-4"
                style={{ ["--rise-delay" as string]: `${afterPitch + 120}ms` }}
              >
                <a
                  href={`#projects`}
                  className="btn-shine rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.04]"
                >
                  {dict.hero.ctaProjects}
                </a>
                <a
                  href={`#contact`}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent"
                >
                  {dict.hero.ctaContact}
                </a>
                {resume && (
                  <a
                    href={resume}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
                  >
                    {dict.nav.resume}
                  </a>
                )}
              </div>
            </div>

            <HeroOrbit products={orbitProducts} />
          </div>
        </section>

        {/* Metrics */}
        <Reveal>
          <section className="grid grid-cols-2 gap-6 border-t border-border py-12 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.value} className="text-center sm:text-left">
                <div className="text-3xl font-bold tracking-tight text-accent sm:text-4xl">
                  <CountUp value={m.value} />
                </div>
                <div className="mt-1 text-xs leading-snug text-muted">
                  {m.label[lang]}
                </div>
              </div>
            ))}
          </section>
        </Reveal>

        {/* About */}
        <section id="about" className="scroll-mt-24 border-t border-border py-20">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {dict.about.title}
            </h2>
            <div className="mt-6 grid gap-8 md:grid-cols-[1.5fr_1fr]">
              <p className="text-lg leading-relaxed text-muted">
                {dict.about.body}
              </p>
              {/* Personal details card */}
              <div className="rounded-2xl border border-border bg-card/50 p-6">
                <div className="mx-auto mb-5 w-36 rounded-2xl bg-gradient-to-br from-accent via-violet-500 to-fuchsia-500 p-[2px] shadow-[0_16px_50px_-18px_var(--accent)]">
                  <div className="relative aspect-square overflow-hidden rounded-[calc(1rem-2px)]">
                    <Image
                      src="/portrait.png"
                      alt={profile.fullName}
                      fill
                      sizes="9rem"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-center text-sm font-semibold text-foreground">
                  {profile.fullName}
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  {[
                    { l: dict.about.labelLocation, v: profile.location[lang] },
                    { l: dict.about.labelNationality, v: profile.nationality[lang] },
                    { l: dict.about.labelLanguages, v: profile.languages[lang] },
                    { l: dict.about.labelAvailability, v: profile.availability[lang] },
                  ].map((row) => (
                    <div key={row.l} className="flex flex-col">
                      <dt className="text-xs uppercase tracking-wide text-muted/70">
                        {row.l}
                      </dt>
                      <dd className="text-foreground">{row.v}</dd>
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <dt className="text-xs uppercase tracking-wide text-muted/70">
                      {dict.about.labelWhatsapp}
                    </dt>
                    <dd>
                      <a
                        href={`https://wa.me/${profile.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline"
                      >
                        +51 986 110 558
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-xs uppercase tracking-wide text-muted/70">
                      {dict.about.labelPhone}
                    </dt>
                    <dd>
                      <a
                        href={`tel:${profile.phone.replace(/\s/g, "")}`}
                        className="text-foreground hover:text-accent"
                      >
                        {profile.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-xs uppercase tracking-wide text-muted/70">
                      {dict.about.labelEmail}
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-foreground hover:text-accent"
                      >
                        {profile.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="mt-10 text-sm font-semibold text-foreground">
              {dict.about.skillsTitle}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              {dict.about.skillsHint}
            </p>
            <div className="mt-6">
              <SkillGraph lang={lang} />
            </div>
          </Reveal>
        </section>

        {/* Services */}
        <section
          id="services"
          className="scroll-mt-24 border-t border-border py-20"
        >
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {dict.services.title}
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {dict.services.subtitle}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal
                key={s.icon}
                delay={i * 70}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div className="group flex h-full gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_8px_30px_-10px_var(--accent)]">
                  <ServiceIcon name={s.icon} />
                  <div>
                    <h3 className="font-semibold">{s.title[lang]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {s.body[lang]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Benefits — why choose us */}
        <section className="scroll-mt-24 border-t border-border py-20">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {dict.benefits.title}
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {dict.benefits.subtitle}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.icon} delay={i * 70} direction="zoom">
                <div className="group h-full rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_8px_30px_-10px_var(--accent)]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent transition-colors group-hover:border-accent/60">
                    <Icon name={b.icon} />
                  </span>
                  <h3 className="mt-4 font-semibold">{b.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {b.body[lang]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process — how we work */}
        <section className="scroll-mt-24 border-t border-border py-20">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {dict.process.title}
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {dict.process.subtitle}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.icon} delay={i * 90}>
                <div className="relative h-full rounded-2xl border border-border bg-card/50 p-6">
                  <span className="absolute right-5 top-5 text-4xl font-bold text-border">
                    {i + 1}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon name={s.icon} />
                  </span>
                  <h3 className="mt-4 font-semibold">{s.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body[lang]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience — timeline */}
        <section
          id="experience"
          className="scroll-mt-24 border-t border-border py-20"
        >
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {dict.experience.title}
            </h2>
          </Reveal>
          <div className="mt-10 ml-2 border-l border-border">
            {experience.map((item, i) => (
              <Reveal key={item.company} delay={i * 60} direction="left">
                <div className="relative pb-10 pl-8 last:pb-0">
                  {/* timeline dot */}
                  <span
                    className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background"
                    style={{ background: "var(--accent)" }}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{item.role[lang]}</h3>
                    <span className="font-mono text-xs text-muted">
                      {item.start} — {item.end || dict.experience.present}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-accent">
                    {item.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description[lang]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="scroll-mt-24 border-t border-border py-20"
        >
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {dict.projects.title}
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {dict.projects.subtitle}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal
                key={project.slug}
                delay={i * 70}
                direction="zoom"
                className="h-full"
              >
                <TiltCard>
                  <ProjectCard project={project} lang={lang} dict={dict} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tech badges */}
        <section className="border-t border-border py-14">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">
              {dict.tech.title}
            </p>
            <div className="marquee-mask mt-6 overflow-hidden">
              <div className="marquee-track items-center">
                {[...techBadges, ...techBadges].map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="mr-14 whitespace-nowrap text-base font-medium text-muted/80"
                    aria-hidden={i >= techBadges.length}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-24 border-t border-border py-20"
        >
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {dict.faq.title}
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {dict.faq.subtitle}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Faq lang={lang} />
          </Reveal>
        </section>

        {/* CTA banner */}
        <section className="py-16">
          <Reveal direction="zoom">
            <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent/10 px-8 py-14 text-center">
              <div
                className="pointer-events-none absolute -inset-px opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, var(--accent), transparent 70%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {dict.cta.title}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-muted">
                  {dict.cta.body}
                </p>
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.46-.15-.65.15-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.57-.9-2.15-.24-.56-.48-.48-.65-.49h-.56c-.2 0-.5.07-.77.37-.26.3-1 .98-1 2.4 0 1.4 1.02 2.76 1.17 2.95.15.2 2.02 3.08 4.9 4.32.68.3 1.22.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.19-.56-.34zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z" />
                  </svg>
                  {dict.cta.button}
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-border py-20"
        >
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {dict.contact.title}
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {dict.contact.subtitle}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {dict.contact.body}
            </p>
            <ContactForm
              dict={dict}
              email={profile.email}
              whatsapp={profile.whatsapp}
              formKey={profile.web3formsKey}
            />
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-sm text-muted sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-norac.png"
                alt="Norac Labs"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <p>
                © 2026 Norac Labs. {dict.footer.rights}
              </p>
            </div>
            <p className="text-xs">NORAC LABS E.I.R.L. · RUC 20616346548</p>
          </div>
          <div className="flex gap-4">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            )}
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </footer>

      <WhatsAppFab number={profile.whatsapp} label={dict.contact.whatsapp} />
    </>
  );
}
