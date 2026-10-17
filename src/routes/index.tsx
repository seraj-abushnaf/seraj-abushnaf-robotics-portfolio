import { createFileRoute, Link } from "@tanstack/react-router";
import { Placeholder } from "@/components/site";
import { projects, awards } from "@/lib/content";
import { useMedia, type Media } from "@/lib/media";

function pick(data: Media[], i: number, slug?: string) {
  const own = slug ? data.find((m) => m.project_slug === slug) : undefined;
  if (own) return own;
  const pref = data.filter((m) => ["Robots", "Projects", "Photos", "CAD"].includes(m.category));
  const pool = pref.length ? pref : data;
  return pool.length ? pool[i % pool.length] : undefined;
}

function HomeImage({ i, slug, label, className }: { i: number; slug?: string; label: string; className: string }) {
  const { data = [] } = useMedia();
  const m = pick(data, i, slug);
  if (!m?.url) return <Placeholder label={label} className={className} />;
  return <img src={m.url} alt={m.caption || label} className={`w-full object-cover ${className}`} />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seraj Abushnaf — Robotics & Engineering Portfolio" },
      { name: "description", content: "Robotics, FTC contributions, CAD design and engineering projects by Seraj Abushnaf." },
      { property: "og:title", content: "Seraj Abushnaf — Robotics & Engineering" },
      { property: "og:description", content: "Engineering projects, FTC robotics contributions, awards and evidence." },
      { property: "og:url", content: "https://seraj-abushnaf-robotics-portfolio.lovable.app/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pt-12 md:grid-cols-12 md:pt-20">
        <div className="fade-up md:col-span-6 md:pt-16">
          <p className="eyebrow">Robotics · Engineering · Design</p>
          <h1 className="mt-5 text-6xl leading-[0.98] md:text-8xl">Seraj<br /><em className="text-primary">Abushnaf</em></h1>
          <p className="mt-8 max-w-md text-muted-foreground">
            Libyan robotics student · FTC autonomous lead programmer and robot designer for TLC CyberKnights and LyBrix.
          </p>
          <Link to="/contributions" className="eyebrow mt-10 inline-block border-b border-foreground pb-1 text-foreground">View contributions</Link>
        </div>
        <HomeImage i={0} label="Portrait or robot" className="aspect-[4/5] md:col-span-6" />
      </section>

      <section className="mx-auto mt-28 grid max-w-6xl gap-8 border-t px-6 pt-14 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">Biography</p>
        <p className="font-serif text-2xl leading-snug md:col-span-8 md:text-3xl">
          I lead autonomous programming and robot design in FTC, build Arduino prototypes, mentor younger students, and run a 3D-printing business alongside web and video work.
        </p>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-6">
        <div className="flex items-end justify-between border-b pb-6">
          <h2 className="text-4xl md:text-5xl">Selected Projects</h2>
          <Link to="/contributions" className="eyebrow">All</Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          {projects.slice(0, 3).map((p, i) => (
            <Link key={p.slug} to="/contributions/$slug" params={{ slug: p.slug }}
              className={`group ${i === 0 ? "md:col-span-7" : "md:col-span-5"} ${i === 2 ? "md:col-start-6 md:col-span-7" : ""}`}>
              <HomeImage i={i + 1} slug={p.slug} label={p.category} className={`${i === 0 ? "aspect-[4/3]" : "aspect-square"} transition-opacity group-hover:opacity-80`} />
              <p className="eyebrow mt-4">{p.category}</p>
              <h3 className="mt-1 text-2xl">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-6">
        <div className="flex items-end justify-between border-b pb-6">
          <h2 className="text-4xl md:text-5xl">Featured Achievements</h2>
          <Link to="/awards" className="eyebrow">Archive</Link>
        </div>
        <ul>
          {awards.map((a) => (
            <li key={a.title} className="grid grid-cols-12 gap-4 border-b py-6">
              <span className="eyebrow col-span-3 md:col-span-2">{a.type}</span>
              <span className="col-span-9 font-serif text-xl md:col-span-6">{a.title}</span>
              <span className="col-span-9 col-start-4 text-sm text-muted-foreground md:col-span-4 md:col-start-auto">{a.issuer}{a.year && ` · ${a.year}`}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
