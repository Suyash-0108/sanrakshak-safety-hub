import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Unlock, Mic, Image, Video, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const mockEvidence = [
  { type: "audio", icon: Mic, title: "Audio Recording", time: "2 min ago", size: "1.2 MB", status: "Auto-saved during SOS" },
  { type: "image", icon: Image, title: "Photo Evidence", time: "2 min ago", size: "3.4 MB", status: "Auto-saved during SOS" },
  { type: "video", icon: Video, title: "Video Clip", time: "3 min ago", size: "12.1 MB", status: "Auto-saved during SOS" },
  { type: "location", icon: MapPin, title: "Location Snapshot", time: "3 min ago", size: "0.1 MB", status: "Auto-saved during SOS" },
];

const EvidenceVault = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (pin === "1234") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="gradient-bg flex flex-col px-4 py-6">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 max-w-lg mx-auto w-full mb-8"
      >
        <Link to="/dashboard" className="btn-ghost p-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-bold text-foreground">Evidence Vault</span>
      </motion.header>

      <div className="max-w-lg mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="lock"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-foreground mb-1">Vault Locked</h2>
                <p className="text-sm text-muted-foreground">Enter PIN to access evidence</p>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg font-mono ${
                      pin.length > i
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground"
                    } ${error ? "border-destructive" : ""}`}
                  >
                    {pin.length > i ? "•" : ""}
                  </div>
                ))}
              </div>
              {error && <p className="text-xs text-destructive">Incorrect PIN. Try 1234.</p>}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((key, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (key === "del") setPin((p) => p.slice(0, -1));
                      else if (key !== null && pin.length < 4) setPin((p) => p + key);
                    }}
                    className={`w-14 h-14 rounded-xl text-lg font-medium transition-colors ${
                      key === null
                        ? "invisible"
                        : "bg-secondary hover:bg-accent text-foreground"
                    }`}
                  >
                    {key === "del" ? "⌫" : key}
                  </button>
                ))}
              </div>
              <button onClick={handleUnlock} className="btn-primary w-full mt-2">
                Unlock Vault
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Use Biometric Instead
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-safe/10 border border-safe/20 text-safe w-fit">
                <Unlock className="h-4 w-4" />
                <span className="text-sm font-medium">Vault Unlocked</span>
              </div>
              <div className="space-y-3">
                {mockEvidence.map((item, i) => (
                  <motion.div
                    key={item.type}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.size} · {item.time}</p>
                      <p className="text-xs text-safe mt-1">{item.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EvidenceVault;
