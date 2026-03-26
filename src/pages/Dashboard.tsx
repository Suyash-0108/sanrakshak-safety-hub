import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, MapPin, Phone, Mic, CheckCircle, AlertTriangle, LogOut, Lock, Siren } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getAlerts } from "../services/sosService";

const quickActions = [
  { icon: MapPin, label: "Share Live Location", color: "bg-blue-500/10 text-blue-400", toast: "Location shared with contacts" },
  { icon: Phone, label: "Call Emergency", color: "bg-warning/10 text-warning", toast: "Calling emergency services..." },
  { icon: Mic, label: "Start Recording", color: "bg-safe/10 text-safe", toast: "Audio recording started" },
];

const Dashboard = () => {
  const [status, setStatus] = useState<"safe" | "alert">("safe");
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSOS = () => {
    setStatus("alert");
    showToast("🚨 SOS Alert sent to all trusted contacts!");
    setTimeout(() => setStatus("safe"), 4000);
  };

  return (
    <div className="gradient-bg flex flex-col px-4 py-6">
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
          transition={{ delay: 0.1 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full mb-10 transition-colors duration-500 ${
            status === "safe"
              ? "bg-safe/10 border border-safe/20 text-safe"
              : "bg-primary/10 border border-primary/20 text-primary"
          }`}
        >
          {status === "safe" ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <span className="text-sm font-medium">
            {status === "safe" ? "You are Safe" : "Alert Active"}
          </span>
        </motion.div>

        {/* SOS Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative mb-12"
        >
          {/* Pulse rings */}
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-primary"
          />
          <motion.div
            animate={{ scale: [1, 1.3], opacity: [0.2, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
            className="absolute inset-0 rounded-full bg-primary"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSOS}
            className="relative w-36 h-36 rounded-full flex flex-col items-center justify-center text-primary-foreground font-bold text-lg glow-emergency"
            style={{ background: "var(--gradient-emergency)" }}
          >
            <span className="text-3xl font-black">SOS</span>
            <span className="text-xs font-normal opacity-80 mt-1">Tap for help</span>
          </motion.button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3 w-full mb-8"
        >
          {quickActions.map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => showToast(action.toast)}
              className="glass-card p-4 flex flex-col items-center gap-3 hover:border-primary/20 transition-colors"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium text-center leading-tight">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-3 w-full mb-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/evidence")}
            className="glass-card p-4 flex items-center gap-3 hover:border-primary/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <span className="text-sm text-foreground font-medium">Evidence Vault</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/emergency")}
            className="glass-card p-4 flex items-center gap-3 hover:border-primary/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-warning/10 text-warning">
              <Siren className="h-5 w-5" />
            </div>
            <span className="text-sm text-foreground font-medium">Emergency</span>
          </motion.button>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-5 w-full"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "Safety check completed", time: "2 min ago", icon: CheckCircle, cls: "text-safe" },
              { text: "Location shared with Mom", time: "1 hour ago", icon: MapPin, cls: "text-blue-400" },
              { text: "Profile updated", time: "3 hours ago", icon: Shield, cls: "text-muted-foreground" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 ${item.cls}`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.text}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatedToast message={toast} />
    </div>
  );
};

const AnimatedToast = ({ message }: { message: string | null }) => {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card px-5 py-3 text-sm text-foreground font-medium z-50"
    >
      {message}
    </motion.div>
  );
};

export default Dashboard;
