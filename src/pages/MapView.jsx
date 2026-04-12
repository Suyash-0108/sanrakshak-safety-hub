import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { supabase } from "../lib/supabaseClient";

// 🔥 FIX MARKER ICON ISSUE
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapView = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // 🔹 Fetch existing alerts
    const fetchAlerts = async () => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*");

      if (error) {
        console.error("Fetch error:", error);
      } else {
        setAlerts(data);
      }
    };

    fetchAlerts();

    // 🔴 Realtime updates
    const channel = supabase
      .channel("alerts-map")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "alerts" },
        (payload) => {
          console.log("New SOS:", payload.new);
          setAlerts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[26.84, 75.56]} // default center (can change)
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {alerts.map((alert, index) => (
          <Marker
            key={index}
            position={[alert.latitude, alert.longitude]}
          >
            <Popup>
              🚨 SOS Alert <br />
              User: {alert.user_id} <br />
              Status: {alert.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
