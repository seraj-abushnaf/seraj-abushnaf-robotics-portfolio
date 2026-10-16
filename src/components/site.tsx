import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/contributions", label: "Contributions" },
  { to: "/awards", label: "Awards" },
  { to: "/proof", label: "Proof" },
  { to: "/summary", label: "Summary" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-serif text-xl tracking-wide">Seraj Abushnaf</Link>
        <nav className="hidden gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="eyebrow transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="eyebrow md:hidden">
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="fade-up border-t px-6 pb-8 pt-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block border-b py-4 font-serif text-3xl">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-14 md:flex-row md:justify-between">
        <p className="font-serif text-2xl">Seraj Abushnaf</p>
        <p className="text-sm opacity-70">Robotics & Engineering Portfolio</p>
      </div>
    </footer>
  );
}

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`placeholder-img flex items-end p-4 ${className}`}>
      <span className="eyebrow">{label} — image placeholder</span>
    </div>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="fade-up mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
      {children && <div className="mt-6 max-w-xl text-muted-foreground">{children}</div>}
      <div className="mt-12 border-t" />
    </section>
  );
}
