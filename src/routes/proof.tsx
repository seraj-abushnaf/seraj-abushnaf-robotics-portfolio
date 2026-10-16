import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Placeholder } from "@/components/site";
import { proofGroups } from "@/lib/content";

export const Route = createFileRoute("/proof")({
  head: () => ({
    meta: [
      { title: "Proof — Seraj Abushnaf" },
      { name: "description", content: "Organised evidence gallery: certificates, build photos and CAD renders." },
      { property: "og:title", content: "Proof — Seraj Abushnaf" },
      { property: "og:description", content: "Organised evidence gallery: certificates, build photos and CAD renders." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro eyebrow="Evidence" title="Proof gallery">
        Certificates, photographs and design files supporting each project and award.
      </PageIntro>
      <div className="mx-auto max-w-6xl space-y-20 px-6">
        {proofGroups.map((g) => (
          <section key={g.name}>
            <div className="flex items-baseline justify-between border-b pb-4">
              <h2 className="text-3xl">{g.name}</h2>
              <span className="eyebrow">{g.count} items</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: g.count }).map((_, i) => (
                <Placeholder key={i} label={`${g.name} ${i + 1}`} className={i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
