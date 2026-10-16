import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, useMedia, type Media } from "@/lib/media";
import { projects, awards } from "@/lib/content";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Seraj Abushnaf" },
      { name: "description", content: "Private admin area." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const toEmail = (u: string) => (u.includes("@") ? u : `${u.trim().toLowerCase()}@seraj-admin.local`);
const field = "w-full border-b bg-transparent py-2 text-base outline-none focus:border-foreground";
const btn = "eyebrow border border-foreground px-4 py-3 text-foreground disabled:opacity-40";

function AdminPage() {
  const [state, setState] = useState<"loading" | "out" | "denied" | "in">("loading");

  async function check() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return setState("out");
    const { data: ok } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
    setState(ok ? "in" : "denied");
  }
  useEffect(() => {
    check();
    const { data } = supabase.auth.onAuthStateChange((e) => {
      if (e === "SIGNED_IN" || e === "SIGNED_OUT") check();
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (state === "loading") return <p className="mx-auto max-w-6xl px-6 py-24 eyebrow">Loading…</p>;
  if (state === "out") return <Login />;
  if (state === "denied")
    return (
      <div className="mx-auto max-w-md px-6 py-24">
        <p>This account is not authorised.</p>
        <button className={`${btn} mt-6`} onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>
    );
  return <Dashboard />;
}

function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email: toEmail(u), password: p });
    if (error) setErr("Wrong username or password.");
    setBusy(false);
  }
  return (
    <form onSubmit={submit} className="fade-up mx-auto max-w-sm space-y-6 px-6 py-24">
      <p className="eyebrow">Private</p>
      <h1 className="text-5xl">Admin</h1>
      <input className={field} placeholder="Username" autoCapitalize="none" autoComplete="username" value={u} onChange={(e) => setU(e.target.value)} required />
      <input className={field} type="password" placeholder="Password" autoComplete="current-password" value={p} onChange={(e) => setP(e.target.value)} required />
      {err && <p className="text-sm text-destructive">{err}</p>}
      <button className={`${btn} w-full`} disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}

const ext = (f: File) => f.name.split(".").pop()?.toLowerCase() || "jpg";
const newPath = (f: File) => `${crypto.randomUUID()}.${ext(f)}`;

function LinkSelects({ v, set }: { v: Partial<Media>; set: (x: Partial<Media>) => void }) {
  return (
    <>
      <select className={field} value={v.category} onChange={(e) => set({ ...v, category: e.target.value })}>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select className={field} value={v.project_slug ?? ""} onChange={(e) => set({ ...v, project_slug: e.target.value || null })}>
        <option value="">No project link</option>
        {projects.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
      </select>
      <select className={field} value={v.award_title ?? ""} onChange={(e) => set({ ...v, award_title: e.target.value || null })}>
        <option value="">No award link</option>
        {awards.map((a) => <option key={a.title} value={a.title}>{a.title}</option>)}
      </select>
    </>
  );
}

function Dashboard() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useMedia();
  const [files, setFiles] = useState<{ file: File; preview: string; caption: string }[]>([]);
  const [meta, setMeta] = useState<Partial<Media>>({ category: "Photos", project_slug: null, award_title: null });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [filter, setFilter] = useState("All");
  const refresh = () => qc.invalidateQueries({ queryKey: ["media"] });

  function pick(list: FileList | null) {
    if (!list) return;
    const added = Array.from(list).map((file) => ({ file, preview: URL.createObjectURL(file), caption: "" }));
    setFiles((f) => [...f, ...added]);
  }

  async function upload() {
    setBusy(true);
    setMsg("");
    let ok = 0;
    for (const f of files) {
      const path = newPath(f.file);
      const up = await supabase.storage.from("evidence").upload(path, f.file, { contentType: f.file.type });
      if (up.error) { setMsg(`Failed: ${f.file.name} — ${up.error.message}`); continue; }
      const { error } = await supabase.from("media").insert({
        path, caption: f.caption, category: meta.category!, project_slug: meta.project_slug ?? null, award_title: meta.award_title ?? null,
      });
      if (error) setMsg(error.message); else ok++;
    }
    setFiles([]);
    setBusy(false);
    setMsg((m) => m || `Uploaded ${ok} photo${ok === 1 ? "" : "s"}.`);
    refresh();
  }

  const shown = filter === "All" ? data : data.filter((m) => m.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12">
      <div className="flex items-end justify-between border-b pb-6">
        <div><p className="eyebrow">Private</p><h1 className="mt-2 text-5xl">Dashboard</h1></div>
        <button className="eyebrow" onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl">Upload</h2>
        <label className={`${btn} mt-6 inline-block cursor-pointer`}>
          Choose photos
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />
        </label>
        {files.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-3"><LinkSelects v={meta} set={setMeta} /></div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {files.map((f, i) => (
                <div key={f.preview}>
                  <img src={f.preview} alt="" className="aspect-square w-full object-cover" />
                  <input className={field} placeholder="Caption" value={f.caption}
                    onChange={(e) => setFiles((all) => all.map((x, j) => (j === i ? { ...x, caption: e.target.value } : x)))} />
                  <button className="eyebrow mt-2" onClick={() => setFiles((all) => all.filter((_, j) => j !== i))}>Remove</button>
                </div>
              ))}
            </div>
            <button className={btn} disabled={busy} onClick={upload}>{busy ? "Uploading…" : `Upload ${files.length}`}</button>
          </div>
        )}
        {msg && <p className="mt-4 text-sm text-muted-foreground">{msg}</p>}
      </section>

      <section className="mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-4">
          <h2 className="text-3xl">Media library</h2>
          <select className="border-b bg-transparent py-1 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        {isLoading && <p className="eyebrow mt-6">Loading…</p>}
        {!isLoading && !shown.length && <p className="mt-6 text-muted-foreground">No photos yet.</p>}
        <div className="mt-6 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {shown.map((m) => <Item key={m.id} m={m} onChange={refresh} />)}
        </div>
      </section>
    </div>
  );
}

function Item({ m, onChange }: { m: Media; onChange: () => void }) {
  const [v, setV] = useState<Partial<Media>>(m);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const dirty = v.caption !== m.caption || v.category !== m.category || v.project_slug !== m.project_slug || v.award_title !== m.award_title;

  async function save() {
    setBusy(true);
    const { error } = await supabase.from("media").update({
      caption: v.caption ?? "", category: v.category!, project_slug: v.project_slug ?? null, award_title: v.award_title ?? null,
    }).eq("id", m.id);
    setNote(error ? error.message : "Saved");
    setBusy(false);
    onChange();
  }
  async function replace(file?: File) {
    if (!file) return;
    setBusy(true);
    const path = newPath(file);
    const up = await supabase.storage.from("evidence").upload(path, file, { contentType: file.type });
    if (up.error) { setNote(up.error.message); setBusy(false); return; }
    const { error } = await supabase.from("media").update({ path }).eq("id", m.id);
    if (!error) await supabase.storage.from("evidence").remove([m.path]);
    setNote(error ? error.message : "Replaced");
    setBusy(false);
    onChange();
  }
  async function remove() {
    if (!confirm("Delete this photo permanently?")) return;
    setBusy(true);
    const { error } = await supabase.from("media").delete().eq("id", m.id);
    if (!error) await supabase.storage.from("evidence").remove([m.path]);
    else setNote(error.message);
    setBusy(false);
    onChange();
  }

  return (
    <div className="space-y-2">
      <img src={m.url} alt={m.caption} className="aspect-square w-full object-cover" />
      <input className={field} placeholder="Caption" value={v.caption ?? ""} onChange={(e) => setV({ ...v, caption: e.target.value })} />
      <LinkSelects v={v} set={setV} />
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button className="eyebrow text-foreground disabled:opacity-40" disabled={!dirty || busy} onClick={save}>Save</button>
        <label className="eyebrow cursor-pointer text-foreground">
          Replace
          <input type="file" accept="image/*" className="hidden" onChange={(e) => replace(e.target.files?.[0])} />
        </label>
        <button className="eyebrow text-destructive" disabled={busy} onClick={remove}>Delete</button>
        {note && <span className="text-xs text-muted-foreground">{note}</span>}
      </div>
    </div>
  );
}
