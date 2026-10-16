import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site";
import { projects, awards, skills, business, profile } from "@/lib/content";

export const Route = createFileRoute("/summary")({
  head: () => ({
    meta: [
      { title: "Summary — Seraj Abushnaf" },
      { name: "description", content: "One-page summary of Seraj Abushnaf's robotics and engineering work." },
      { property: "og:title", content: "Summary — Seraj Abushnaf" },
      { property: "og:description", content: "One-page summary for admissions and technical reviewers." },
    ],
  }),
  component: Page,
});

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-b py-10 md:grid-cols-12">
      <p className="eyebrow md:col-span-3">{label}</p>
      <div className="md:col-span-9">{children}</div>
    </div>
  );
}

function Page() {
  return (
    <>
      <PageIntro eyebrow="Summary" title="At a glance">
        A one-page overview for admissions officers and technical reviewers.
      </PageIntro>
      <div className="mx-auto max-w-6xl px-6">
        <Row label="Profile"><p className="font-serif text-2xl">{profile}</p></Row>
        <Row label="Projects">
          <ul className="space-y-2">{projects.map((p) => <li key={p.slug}><span className="font-serif text-xl">{p.title}</span> <span className="text-sm text-muted-foreground">— {p.category}</span></li>)}</ul>
        </Row>
        <Row label="Team Awards">
          <ul className="space-y-2">{awards.filter((a) => a.type === "Team").map((a) => <li key={a.title} className="font-serif text-xl">{a.title}{a.year && `, ${a.year}`}</li>)}</ul>
        </Row>
        <Row label="Individual">
          <ul className="space-y-2">{awards.filter((a) => a.type === "Individual").map((a) => <li key={a.title} className="font-serif text-xl">{a.title}</li>)}</ul>
        </Row>
        <Row label="Business">
          <ul className="space-y-2">{business.map((b) => <li key={b.title}><span className="font-serif text-xl">{b.title}</span> <span className="text-sm text-muted-foreground">— {b.detail}</span></li>)}</ul>
        </Row>
        <Row label="Skills"><p className="text-muted-foreground">{skills.join(" · ")}</p></Row>
        <Row label="Contact"><p className="text-muted-foreground">Add your email or contact link.</p></Row>
      </div>
    </>
  );
}
