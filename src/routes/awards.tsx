import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Placeholder } from "@/components/site";
import { awards } from "@/lib/content";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards — Seraj Abushnaf" },
      { name: "description", content: "Archive of awards and recognition in robotics and engineering." },
      { property: "og:title", content: "Awards — Seraj Abushnaf" },
      { property: "og:description", content: "Archive of awards and recognition in robotics and engineering." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro eyebrow="Archive" title="Awards & recognition" />
      <div className="mx-auto max-w-6xl space-y-16 px-6">
        {awards.map((a, i) => (
          <div key={i} className="grid gap-6 border-b pb-16 md:grid-cols-12">
            <Placeholder label="Certificate" className="aspect-[4/3] md:col-span-5" />
            <div className="md:col-span-6 md:col-start-7 md:pt-8">
              <p className="eyebrow">{a.year}</p>
              <h2 className="mt-3 text-4xl">{a.title}</h2>
              <p className="mt-3 text-muted-foreground">{a.issuer}</p>
              <p className="mt-6 text-sm text-muted-foreground">Add a short description of what the award recognised.</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
