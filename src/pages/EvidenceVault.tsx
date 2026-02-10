import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Unlock, Mic, Image, Video, MapPin, ArrowLeft, Fingerprint, ShieldAlert, ShieldCheck } from "lucide-react";
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
  const [biometricActive, setBiometricActive] = useState(false);

  const handleUnlock = () => {
    if (pin === "1234") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  const handleBiometric = () => {
    setBiometricActive(true);
    setTimeout(() => {
      setBiometricActive(false);
      setUnlocked(true);
    }, 1800);
  };

  return (
    <div className="gradient-bg flex flex-col px-4 py-6">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 max-w-lg mx-auto w-full mb-6"
      >
        <Link to="/dashboard" className="btn-ghost p-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <ShieldAlert className="h-5 w-5 text-primary" />
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
              className="flex flex-col items-center gap-6"
            >
              {/* Lock icon with animated ring */}
              <div className="relative">
                <motion.div
                  animate={{ opacity: [0.15, 0.3, 0.15] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -inset-4 rounded-full border-2 border-primary/20"
                />
                <motion.div
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -inset-8 rounded-full border border-primary/10"
                />
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Lock className="h-9 w-9 text-primary" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-1">Vault Locked</h2>
                <p className="text-sm text-muted-foreground">Authenticate to access protected evidence</p>
              </div>

              {/* Warning banner */}
              <div className="glass-card w-full p-3 flex items-start gap-3 border-primary/15">
                <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This vault contains legally protected evidence. Unauthorized access attempts are logged. Contents are encrypted and tamper-proof for legal admissibility.
                </p>
              </div>

              {/* PIN Entry */}
              <div className="glass-card w-full p-6 flex flex-col items-center gap-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Enter Security PIN</p>
                <div className="flex gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={error ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center text-lg font-mono transition-all duration-200 ${
                        pin.length > i
                          ? "border-primary bg-primary/15 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.2)]"
                          : "border-border bg-secondary/50 text-muted-foreground"
                      } ${error ? "border-destructive bg-destructive/10" : ""}`}
                    >
                      {pin.length > i ? "•" : ""}
                    </motion.div>
                  ))}
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-destructive"
                    >
                      Incorrect PIN. Try 1234.
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((key, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (key === "del") setPin((p) => p.slice(0, -1));
                        else if (key !== null && pin.length < 4) setPin((p) => p + key);
                      }}
                      className={`w-14 h-14 rounded-xl text-lg font-medium transition-all duration-150 ${
                        key === null
                          ? "invisible"
                          : "bg-secondary/70 hover:bg-accent active:scale-95 text-foreground border border-border/50"
                      }`}
                    >
                      {key === "del" ? "⌫" : key}
                    </button>
                  ))}
                </div>
                <button onClick={handleUnlock} className="btn-primary w-full">
                  Unlock Vault
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Biometric button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBiometric}
                disabled={biometricActive}
                className="glass-card w-full p-4 flex items-center justify-center gap-3 hover:border-primary/20 transition-all disabled:opacity-60"
              >
                <motion.div
                  animate={biometricActive ? { scale: [1, 1.15, 1], opacity: [1, 0.6, 1] } : {}}
                  transition={{ repeat: biometricActive ? Infinity : 0, duration: 0.8 }}
                >
                  <Fingerprint className={`h-6 w-6 ${biometricActive ? "text-primary" : "text-muted-foreground"}`} />
                </motion.div>
                <span className="text-sm font-medium text-foreground">
                  {biometricActive ? "Verifying identity..." : "Use Biometric Authentication"}
                </span>
              </motion.button>

              <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed max-w-xs">
                All evidence is end-to-end encrypted and stored in compliance with digital evidence preservation standards.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-safe/10 border border-safe/20 text-safe">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm font-medium">Vault Unlocked</span>
                </div>
                <span className="text-xs text-muted-foreground">4 items secured</span>
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
              <div className="glass-card p-3 flex items-start gap-3 border-border/50">
                <Lock className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                  Evidence is protected under digital forensics standards. Files cannot be modified or deleted to ensure legal admissibility.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EvidenceVault;
