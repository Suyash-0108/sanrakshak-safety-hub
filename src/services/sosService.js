import { supabase } from "../lib/supabaseClient"

export const sendSOS = async (lat, lng, userId) => {
  const { data, error } = await supabase
    .from("alerts")
    .insert([
      {
        user_id: userId,
        latitude: lat,
        longitude: lng,
        status: "active"
      }
    ])

  if (error) {
    console.error("SOS Error:", error)
  } else {
    console.log("SOS Sent:", data)
  }
}
