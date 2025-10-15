import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR-ANON-KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getScores() {
  const { data, error } = await supabase.from("leaderboard").select("*").order("score", { ascending: false }).limit(10);
  return data || [];
}

export async function saveScore(user, score) {
  const { data, error } = await supabase.from("leaderboard").insert([{ user, score }]);
  return { data, error };
}
