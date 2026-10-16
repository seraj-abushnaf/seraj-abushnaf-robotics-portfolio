import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Placeholder } from "@/components/site";
import { projects } from "@/lib/content";

export const Route = createFileRoute("/contributions")({
  head: () => ({
    meta: [
      { title: "Contributions — Seraj Abushnaf" },
      { name: "description", content: "Engineering projects, FTC robotics contributions and CAD designs." },
      { property: "og:title", content: "Contributions — Seraj Abushnaf" },
      { property: "og:description", content: "Engineering projects, FTC robotics contributions and CAD designs." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro eyebrow="Contributions" title="Projects & engineering work">
        FTC robotics, CAD design and independent engineering — each with my role and evidence.
      </PageIntro>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Link key={p.slug} to="/contributions/$slug" params={{ slug: p.slug }} className={`group ${i % 2 ? "md:mt-24" : ""}`}>
            <Placeholder label={p.category} className="aspect-[4/5] transition-opacity group-hover:opacity-80" />
            <p className="eyebrow mt-4">0{i + 1} · {p.category}</p>
            <h2 className="mt-1 text-3xl">{p.title}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
