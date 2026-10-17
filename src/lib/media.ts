import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const CATEGORIES = ["Certificates", "Trophies", "Robots", "Projects", "CAD", "Photos"] as const;

export type Media = {
  id: string;
  path: string;
  caption: string;
  category: string;
  project_slug: string | null;
  award_title: string | null;
  created_at: string;
  url: string;
};

export async function fetchMedia(): Promise<Media[]> {
  const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  if (!data.length) return [];
  const { data: signed } = await supabase.storage
    .from("evidence")
    .createSignedUrls(data.map((m) => m.path), 60 * 60 * 24);
  return data.map((m, i) => ({ ...m, url: signed?.[i]?.signedUrl ?? "" }));
}

export function useMedia() {
  return useQuery({ queryKey: ["media"], queryFn: fetchMedia, staleTime: 1000 * 60 * 60, refetchOnWindowFocus: false });
}
