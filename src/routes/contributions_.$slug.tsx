import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Placeholder } from "@/components/site";
import { projects } from "@/lib/content";

export const Route = createFileRoute("/contributions_/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Seraj Abushnaf` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
        ]
      : [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

function Page() {
  const p = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-6xl px-6 pt-12 md:pt-20">
      <Link to="/contributions" className="eyebrow">← Contributions</Link>
      <p className="eyebrow mt-10">{p.category}</p>
      <h1 className="fade-up mt-3 text-5xl md:text-7xl">{p.title}</h1>
      <Placeholder label="Hero image" className="mt-12 aspect-[16/9]" />
      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow">Overview</p>
          <p className="mt-4 font-serif text-2xl leading-snug">{p.summary}</p>
          <p className="eyebrow mt-12">My Role</p>
          <p className="mt-4 text-muted-foreground">{p.role}</p>
        </div>
        <aside className="border-t pt-6 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p className="eyebrow">Technical Details</p>
          <ul className="mt-4 space-y-3 text-sm">
            {p.technical.map((t) => <li key={t} className="border-b pb-3">{t}</li>)}
          </ul>
        </aside>
      </div>
      <p className="eyebrow mt-20">Supporting Evidence</p>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {p.evidence.map((e, i) => (
          <Placeholder key={e} label={e} className={i === 0 ? "col-span-2 aspect-[4/3] md:col-span-1 md:aspect-[3/4]" : "aspect-[3/4]"} />
        ))}
      </div>
    </article>
  );
}
