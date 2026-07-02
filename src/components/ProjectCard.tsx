import Image from "next/image";
import type { Dictionary, Locale } from "@/dictionaries";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  lang,
  dict,
}: {
  project: Project;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
      style={{ ["--accent" as string]: project.accent }}
    >
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: project.accent }}
        aria-hidden
      />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={project.icon}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl border border-border"
          />
          <h3 className="text-lg font-semibold">{project.name}</h3>
        </div>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>

      <p className="mt-3 text-sm font-medium" style={{ color: project.accent }}>
        {project.tagline[lang]}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.description[lang]}
      </p>

      <p className="mt-4 text-xs text-muted">
        <span className="font-semibold text-foreground">
          {dict.projects.roleLabel}:
        </span>{" "}
        {project.role[lang]}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(project.url || project.repo) && (
        <div className="mt-5 flex gap-4 text-sm font-medium">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              {dict.projects.visit} →
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-foreground"
            >
              {dict.projects.code}
            </a>
          )}
        </div>
      )}
    </article>
  );
}
