import { supabase } from "../lib/supabaseClient";

export const sendSOS = async (payload) => {
  const { data, error } = await supabase
    .from("alerts")
    .insert([payload]);

  console.log("SUPABASE RESPONSE:", data, error);

  return { data, error }; // 🔥 VERY IMPORTANT
};
