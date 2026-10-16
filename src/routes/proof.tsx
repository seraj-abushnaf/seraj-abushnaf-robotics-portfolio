import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Placeholder } from "@/components/site";
import { MediaGrid } from "@/components/media-grid";
import { CATEGORIES, useMedia } from "@/lib/media";

export const Route = createFileRoute("/proof")({
  head: () => ({
    meta: [
      { title: "Proof — Seraj Abushnaf" },
      { name: "description", content: "Evidence gallery: certificates, trophies, robots, projects and CAD designs." },
      { property: "og:title", content: "Proof — Seraj Abushnaf" },
      { property: "og:description", content: "Evidence gallery: certificates, trophies, robots, projects and CAD designs." },
    ],
  }),
  component: Page,
});

function Page() {
  const { data = [], isLoading } = useMedia();
  return (
    <>
      <PageIntro eyebrow="Evidence" title="Proof gallery">
        Certificates, photographs and design files supporting each project and award.
      </PageIntro>
      <div className="mx-auto max-w-6xl space-y-20 px-6">
        {CATEGORIES.map((c) => {
          const items = data.filter((m) => m.category === c);
          return (
            <section key={c}>
              <div className="flex items-baseline justify-between border-b pb-4">
                <h2 className="text-3xl">{c}</h2>
                <span className="eyebrow">{items.length} items</span>
              </div>
              {items.length ? (
                <MediaGrid items={items} />
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Placeholder label={isLoading ? "Loading" : `${c} — coming soon`} className="col-span-2 aspect-[2/1]" />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
