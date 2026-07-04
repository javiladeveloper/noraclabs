import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import { projects } from "@/data/projects";
import { profile, experience } from "@/data/profile";
import { metrics, services } from "@/data/highlights";
import { steps, benefits, techBadges } from "@/data/content";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
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

  return (
    <>
      <Navbar lang={lang} dict={dict} />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="relative flex min-h-[86vh] items-center py-20">
          {/* Subtle neural-network backdrop */}
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
          </div>

          <div className="grid w-full items-center gap-12 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-sm font-medium text-accent">
                {dict.hero.greeting}{" "}
                <span className="text-foreground">{dict.hero.name}</span>
                {" · "}
                {dict.hero.role}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                {dict.hero.pitch}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {dict.hero.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`#projects`}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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

            <div className="relative mx-auto w-full max-w-xs md:max-w-none">
              <div
                className="absolute -inset-4 rounded-full opacity-40 blur-3xl"
                style={{ background: "var(--accent)" }}
                aria-hidden
              />
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/portrait.png"
                  alt={dict.hero.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 20rem, 22rem"
                  className="object-cover"
                />
              </div>
            </div>
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
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {dict.about.body}
            </p>
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
              <Reveal key={s.icon} delay={i * 70}>
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
              <Reveal key={b.icon} delay={i * 70}>
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
              <Reveal key={item.company} delay={i * 60}>
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
              <Reveal key={project.slug} delay={i * 70}>
                <ProjectCard project={project} lang={lang} dict={dict} />
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
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {techBadges.map((t) => (
                <span
                  key={t}
                  className="text-sm font-medium text-muted/80 transition-colors hover:text-foreground"
                >
                  {t}
                </span>
              ))}
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
          <Reveal>
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
