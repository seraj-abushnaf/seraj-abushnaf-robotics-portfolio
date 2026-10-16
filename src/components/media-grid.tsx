import { Placeholder } from "@/components/site";
import type { Media } from "@/lib/media";

export function MediaGrid({ items, fallback }: { items: Media[]; fallback?: string[] }) {
  if (!items.length && fallback) {
    return (
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {fallback.map((e, i) => (
          <Placeholder key={e} label={e} className={i === 0 ? "col-span-2 aspect-[4/3] md:col-span-1 md:aspect-[3/4]" : "aspect-[3/4]"} />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((m, i) => (
        <figure key={m.id} className={i === 0 ? "col-span-2 row-span-2" : ""}>
          <a href={m.url} target="_blank" rel="noreferrer">
            <img src={m.url} alt={m.caption || m.category} loading="lazy" className="aspect-square w-full object-cover" />
          </a>
          {m.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{m.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
