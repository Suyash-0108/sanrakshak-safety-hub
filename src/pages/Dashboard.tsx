import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  MapPin,
  Phone,
  Mic,
  CheckCircle,
  AlertTriangle,
  LogOut,
  Lock,
  Siren,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { getAlerts, sendSOS } from "../services/sosService";
import { supabase } from "../lib/supabaseClient";

const quickActions = [
  {
    icon: MapPin,
    label: "Share Live Location",
    color: "bg-blue-500/10 text-blue-400",
    toast: "Location shared with contacts",
  },
  {
    icon: Phone,
    label: "Call Emergency",
    color: "bg-warning/10 text-warning",
    toast: "Calling emergency services...",
  },
  {
    icon: Mic,
    label: "Start Recording",
    color: "bg-safe/10 text-safe",
    toast: "Audio recording started",
  },
];

const Dashboard = () => {
  const [status, setStatus] = useState<"safe" | "alert">("safe");
  const [toast, setToast] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<any[]>([]);

  const navigate = useNavigate();

  // 🔥 FETCH + REALTIME
  useEffect(() => {
    const fetchAlerts = async () => {
      const data = await getAlerts();
      setAlerts(data);
    };

    fetchAlerts();

    const channel = supabase
      .channel("alerts-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts",
        },
        (payload) => {
          console.log("New Alert:", payload);
          setAlerts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 🔔 TOAST
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // 🚨 SOS FUNCTION (FIXED)
  const handleSOS = () => {
    console.log("SOS CLICKED");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log("LOCATION:", lat, lng);

        const userId = "demo-user-id";

        // ✅ SEND TO SUPABASE
        await sendSOS(lat, lng, userId);

        setStatus("alert");
        showToast("🚨 SOS sent successfully!");

        setTimeout(() => setStatus("safe"), 4000);
      },
      (error) => {
        console.log("LOCATION ERROR:", error);
        showToast("❌ Location permission denied");
      }
    );
  };

  return (
    <div className="gradient-bg flex flex-col px-4 py-6">
      {/* 🚨 Alerts Section */}
      <div style={{ marginTop: "20px" }}>
        <h2>🚨 Recent Alerts</h2>

        {alerts.map((alert, index) => (
          <div
            key={index}
            style={{
              border: "1px solid red",
              padding: "10px",
              margin: "10px",
            }}
          >
            <p>User: {alert.user_id}</p>
            <p>
              Location: {alert.latitude}, {alert.longitude}
            </p>
            <p>Status: {alert.status}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between max-w-lg mx-auto w-full mb-8"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground">Sanrakshak</span>
        </div>
        <Link to="/" className="btn-ghost text-sm flex items-center gap-1">
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </motion.header>

      <div className="max-w-lg mx-auto w-full flex flex-col items-center flex-1">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full mb-10 ${
            status === "safe"
              ? "bg-safe/10 border border-safe/20 text-safe"
              : "bg-primary/10 border border-primary/20 text-primary"
          }`}
        >
          {status === "safe" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {status === "safe" ? "You are Safe" : "Alert Active"}
          </span>
        </motion.div>

        {/* 🚨 SOS BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSOS}
          className="w-36 h-36 rounded-full flex flex-col items-center justify-center text-white font-bold text-lg mb-12"
          style={{ background: "red" }}
        >
          <span className="text-3xl">SOS</span>
          <span className="text-xs mt-1">Tap for help</span>
        </motion.button>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 w-full mb-8">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => showToast(action.toast)}
              className="glass-card p-4 flex flex-col items-center gap-3"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.color}`}
              >
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-xs">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-3 w-full mb-4">
          <button
            onClick={() => navigate("/evidence")}
            className="glass-card p-4 flex items-center gap-3"
          >
            <Lock className="h-5 w-5" />
            Evidence Vault
          </button>

          <button
            onClick={() => navigate("/emergency")}
            className="glass-card p-4 flex items-center gap-3"
          >
            <Siren className="h-5 w-5" />
            Emergency
          </button>
        </div>
      </div>

      {/* Toast */}
      <AnimatedToast message={toast} />
    </div>
  );
};

// 🔔 TOAST COMPONENT
const AnimatedToast = ({ message }: { message: string | null }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-3 rounded"
    >
      {message}
    </motion.div>
  );
};

export default Dashboard;
