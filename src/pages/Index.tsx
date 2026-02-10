import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, MapPin, Phone, Mic, ChevronRight } from "lucide-react";

const features = [
  { icon: Phone, title: "Instant Alerts", desc: "One-tap SOS to your trusted contacts" },
  { icon: MapPin, title: "Live Location", desc: "Share real-time location with loved ones" },
  { icon: Mic, title: "Audio Evidence", desc: "Silent recording for your protection" },
];

const Index = () => {
  return (
    <div className="gradient-bg flex flex-col">
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">Sanrakshak</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost text-sm">Log in</Link>
          <Link to="/login" className="btn-primary text-sm px-4 py-2">Get Started</Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto -mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            Personal Safety Reimagined
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl md:text-7xl font-black text-gradient leading-tight mb-6"
        >
          Your Safety.
          <br />
          <span className="text-gradient-emergency">One Tap Away.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Instant alerts to trusted contacts. Real-time location sharing.
          Silent audio recording. Everything you need to feel protected — always.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <Link to="/login" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 justify-center">
            Get Started Free
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link to="/login" className="btn-secondary text-base px-8 py-3.5 justify-center">
            Sign In
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-muted-foreground">
        © 2026 Sanrakshak — Built for your protection.
      </footer>
    </div>
  );
};

export default Index;
