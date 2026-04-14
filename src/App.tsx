import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import {
  certifications,
  education,
  experiences,
  profile,
  projects,
  skillGroups,
  strengths,
  testimonials,
} from "./data/site";
import type { ContactLink, Project } from "./types/site";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

function iconForContact(icon: ContactLink["icon"]) {
  switch (icon) {
    case "mail":
      return Mail;
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "instagram":
      return Instagram;
  }
}

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!activeProject) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-sand text-ink">
      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/60 bg-sand/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-ink">
            Michael Fung
          </a>

          <button
            type="button"
            className="inline-flex rounded-full border border-ink/10 bg-white/80 p-2 text-ink shadow-sm lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-brand">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {menuOpen ? (
          <nav className="border-t border-ink/10 bg-sand px-5 py-4 lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm font-medium text-slate">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-brand"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </div>

      <main id="top">
        <section className="relative overflow-hidden bg-hero-grid pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,244,0.15),rgba(255,250,244,1))]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24 lg:pt-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-4 py-2 text-sm font-medium text-brand shadow-sm">
                <Sparkles size={16} />
                Professional builder in cloud, systems, and product delivery
              </div>
              <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-4 text-xl font-medium text-slate">{profile.role}</p>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate">{profile.intro}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand"
                >
                  Explore projects
                  <ArrowRight size={16} />
                </a>
                <a
                  href="mailto:chaksumfung@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-brand hover:text-brand"
                >
                  Start a conversation
                  <Mail size={16} />
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {profile.highlights.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-ink/8 bg-white/80 p-5 shadow-panel">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate/70">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-ink">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-10 hidden h-32 w-32 rounded-full bg-gold/40 blur-3xl lg:block" />
              <div className="absolute -right-6 bottom-10 hidden h-36 w-36 rounded-full bg-coral/30 blur-3xl lg:block" />
              <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-panel backdrop-blur">
                <div className="overflow-hidden rounded-[1.5rem] bg-mist">
                  <img
                    src={profile.portrait}
                    alt={profile.name}
                    className="h-[420px] w-full object-cover object-center"
                  />
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-mist p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <MapPin size={16} className="text-brand" />
                      Based in
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate">{profile.location}</p>
                  </div>
                  <div className="rounded-2xl bg-mist p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <BriefcaseBusiness size={16} className="text-brand" />
                      Availability
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate">{profile.availability}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">About</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
                An engineer who likes turning complexity into a clear path forward.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate">{profile.summary}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {strengths.map((strength) => (
                  <article key={strength.title} className="rounded-3xl border border-ink/8 bg-white p-6 shadow-panel">
                    <h3 className="font-display text-xl font-semibold text-ink">{strength.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{strength.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
                  Experience
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
                  Building from systems delivery to interactive product work.
                </h2>
                <div className="mt-8 rounded-3xl bg-mist p-6">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-1 text-brand" size={20} />
                    <div>
                      <p className="font-display text-xl font-semibold text-ink">{education.degree}</p>
                      <p className="mt-1 text-sm font-medium text-slate">{education.school}</p>
                      <p className="mt-1 text-sm text-slate">{education.period}</p>
                      <p className="mt-4 text-sm leading-6 text-slate">{education.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {experiences.map((experience) => (
                  <article
                    key={`${experience.company}-${experience.period}`}
                    className="rounded-[2rem] border border-ink/8 bg-sand p-7 shadow-panel"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-display text-2xl font-semibold text-ink">{experience.title}</p>
                        <p className="mt-1 text-sm font-medium text-brand">{experience.company}</p>
                      </div>
                      <div className="text-sm text-slate sm:text-right">
                        <p>{experience.period}</p>
                        <p>{experience.location}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-slate">{experience.summary}</p>
                    <ul className="mt-5 space-y-3">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate">
                          <span className="mt-2 h-2 w-2 rounded-full bg-coral" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">Skills</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
                Tools, platforms, and working strengths I rely on.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {skillGroups.map((group) => (
                <article key={group.title} className="rounded-3xl border border-ink/8 bg-white p-6 shadow-panel">
                  <h3 className="font-display text-xl font-semibold text-ink">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-brand/15 bg-brand/5 px-3 py-2 text-sm font-medium text-ink"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="bg-ink py-20 text-white">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Projects</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">
                Selected work with stronger storytelling than a screenshot grid.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/75">
                These projects show how I approach delivery from idea framing and coordination
                through to implementation and presentation.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-panel backdrop-blur"
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                      {project.category}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm font-medium text-white/70">{project.role}</p>
                    <p className="mt-4 text-sm leading-7 text-white/75">{project.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                          {item}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
                      onClick={() => setActiveProject(project)}
                    >
                      View project details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="credentials" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
                Credentials
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
                Certifications and social proof that support the technical story.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {certifications.map((certification) => (
                  <a
                    key={certification.name}
                    href={certification.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-3xl border border-ink/8 bg-white p-5 shadow-panel transition hover:-translate-y-1"
                  >
                    <div className="flex h-16 items-center justify-between gap-4">
                      <img
                        src={certification.image}
                        alt={certification.name}
                        className="max-h-12 max-w-[7rem] object-contain"
                      />
                      <ExternalLink size={18} className="text-slate transition group-hover:text-brand" />
                    </div>
                    <p className="mt-5 font-display text-lg font-semibold text-ink">
                      {certification.name}
                    </p>
                    <p className="mt-1 text-sm text-slate">{certification.issuer}</p>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
                What people notice
              </p>
              <div className="mt-8 space-y-4">
                {testimonials.map((testimonial) => (
                  <article key={testimonial.name} className="rounded-3xl bg-mist p-6">
                    <p className="text-base leading-7 text-slate">"{testimonial.quote}"</p>
                    <div className="mt-5">
                      <p className="font-display text-lg font-semibold text-ink">{testimonial.name}</p>
                      <p className="text-sm text-slate">{testimonial.title}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-gradient-to-br from-brand to-ink py-20 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Contact</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">
                Let&apos;s build something useful, reliable, and well executed.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
                If you are hiring, collaborating, or looking for someone who can connect
                engineering detail with delivery momentum, I would love to hear from you.
              </p>
              <a
                href="mailto:chaksumfung@gmail.com"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold"
              >
                Email Michael
                <Mail size={16} />
              </a>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 backdrop-blur">
              <div className="space-y-4">
                {profile.contactLinks.map((link) => {
                  const Icon = iconForContact(link.icon);
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/25 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-white/10 p-2">
                          <Icon size={18} />
                        </span>
                        <span className="text-sm font-medium">{link.label}</span>
                      </div>
                      <ArrowRight size={16} />
                    </a>
                  );
                })}
              </div>
              <div className="mt-8 rounded-2xl bg-white/5 p-4 text-sm leading-7 text-white/75">
                <p className="font-semibold text-white">Current focus</p>
                <p className="mt-2">
                  Cloud projects, dependable systems delivery, and product-minded engineering work
                  where communication matters as much as execution.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/8 bg-sand px-5 py-8 text-sm text-slate sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {profile.fullName} · {profile.name} · {profile.role}
          </p>
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>

      {activeProject ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/70 px-4 py-10 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="w-full max-w-4xl rounded-[2rem] bg-white p-5 shadow-panel sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                  {activeProject.category}
                </p>
                <h3 id="project-dialog-title" className="mt-3 font-display text-3xl font-semibold text-ink">
                  {activeProject.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-slate">{activeProject.role}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-ink/10 p-2 text-slate transition hover:border-brand hover:text-brand"
                aria-label="Close project details"
                onClick={() => setActiveProject(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-72 w-full rounded-[1.5rem] object-cover"
                />
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {activeProject.gallery.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${activeProject.title} preview`}
                      className="h-24 w-full rounded-2xl object-cover"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate/70">
                    Summary
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate">{activeProject.summary}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate/70">
                    Challenge
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate">{activeProject.challenge}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate/70">
                    Outcome
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate">{activeProject.impact}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate/70">
                    Stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeProject.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-brand/15 bg-brand/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {activeProject.links.length ? (
                  <div className="flex flex-wrap gap-3">
                    {activeProject.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand"
                      >
                        {link.label}
                        <ExternalLink size={16} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
