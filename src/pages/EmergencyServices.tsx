import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Phone, MapPin, ArrowLeft, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

const EmergencyServices = () => {
  const [activeCall, setActiveCall] = useState<"police" | "ambulance" | null>(null);

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
        <span className="font-bold text-foreground">Emergency Services</span>
      </motion.header>

      <div className="max-w-lg mx-auto w-full flex-1 space-y-4">
        {/* Call Police */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Call Police</p>
                <p className="text-xs text-muted-foreground">Dial 100</p>
              </div>
            </div>
            <a
              href="tel:100"
              onClick={(e) => { e.preventDefault(); setActiveCall("police"); }}
              className="btn-primary px-4 py-2 text-sm"
            >
              Call Now
            </a>
          </div>
          <AnimatePresence>
            {activeCall === "police" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-border pt-4 space-y-3"
              >
                <div className="flex items-center gap-2 text-sm text-safe">
                  <MapPin className="h-4 w-4" />
                  <span>Live location shared: 28.6139°N, 77.2090°E</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Navigation className="h-4 w-4 text-blue-400" />
                  <span>Nearest: Central Police Station — 1.2 km away</span>
                </div>
                <p className="text-xs text-muted-foreground">Calling 100...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Call Ambulance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Call Ambulance</p>
                <p className="text-xs text-muted-foreground">Dial 108</p>
              </div>
            </div>
            <a
              href="tel:108"
              onClick={(e) => { e.preventDefault(); setActiveCall("ambulance"); }}
              className="btn-primary px-4 py-2 text-sm"
            >
              Call Now
            </a>
          </div>
          <AnimatePresence>
            {activeCall === "ambulance" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-border pt-4 mt-4 space-y-3"
              >
                <div className="flex items-center gap-2 text-sm text-safe">
                  <MapPin className="h-4 w-4" />
                  <span>Live location shared: 28.6139°N, 77.2090°E</span>
                </div>
                <p className="text-xs text-muted-foreground">Calling 108...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyServices;
