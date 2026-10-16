import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Placeholder } from "@/components/site";
import { awards } from "@/lib/content";
import { useMedia } from "@/lib/media";

function AwardImage({ title }: { title: string }) {
  const { data = [] } = useMedia();
  const m = data.find((x) => x.award_title === title);
  if (!m) return <Placeholder label="Certificate" className="aspect-[4/3] md:col-span-5" />;
  return <img src={m.url} alt={m.caption || title} className="aspect-[4/3] w-full object-cover md:col-span-5" />;
}

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards — Seraj Abushnaf" },
      { name: "description", content: "Team and individual awards in robotics, science and academics." },
      { property: "og:title", content: "Awards — Seraj Abushnaf" },
      { property: "og:description", content: "Team and individual awards in robotics, science and academics." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro eyebrow="Archive" title="Awards & recognition" />
      {(["Team", "Individual"] as const).map((type) => (
        <div key={type} className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 border-b pb-4 text-3xl">{type} {type === "Team" ? "Awards" : "Achievements"}</h2>
          <div className="mb-16 space-y-16">
            {awards.filter((a) => a.type === type).map((a) => (
              <div key={a.title} className="grid gap-6 border-b pb-16 md:grid-cols-12">
                <AwardImage title={a.title} />
                <div className="md:col-span-6 md:col-start-7 md:pt-8">
                  <p className="eyebrow">{a.type}{a.year && ` · ${a.year}`}</p>
                  <h3 className="mt-3 text-4xl">{a.title}</h3>
                  <p className="mt-3 text-muted-foreground">{a.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
