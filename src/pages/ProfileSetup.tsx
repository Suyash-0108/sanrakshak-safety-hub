import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Heart, Users, ChevronRight, ChevronLeft, Check, Plus, X } from "lucide-react";

const steps = [
  { icon: User, label: "Basic Info" },
  { icon: Heart, label: "Emergency Info" },
  { icon: Users, label: "Trusted Contacts" },
];

interface Contact {
  name: string;
  phone: string;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "Mom", phone: "+91 98765 43210" },
    { name: "Best Friend", phone: "+91 91234 56789" },
  ]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const next = () => { setDir(1); setStep((s) => Math.min(s + 1, 2)); };
  const prev = () => { setDir(-1); setStep((s) => Math.max(s - 1, 0)); };

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact }]);
      setNewContact({ name: "", phone: "" });
    }
  };

  const removeContact = (i: number) => setContacts(contacts.filter((_, idx) => idx !== i));

  return (
    <div className="gradient-bg flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-lg p-8"
      >
        <h2 className="text-xl font-bold text-foreground text-center mb-6">Set Up Your Profile</h2>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                i < step ? "bg-safe text-safe-foreground" :
                i === step ? "bg-primary text-primary-foreground" :
                "bg-secondary text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-10 h-0.5 transition-colors duration-300 ${i < step ? "bg-safe" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center mb-6">{steps[step].label}</p>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {step === 0 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Age</label>
                  <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" type="number" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Gender (Optional)</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-field">
                    <option value="">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Blood Group</label>
                  <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="input-field">
                    <option value="">Select blood group</option>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Medical Notes</label>
                  <textarea
                    value={medicalNotes}
                    onChange={(e) => setMedicalNotes(e.target.value)}
                    placeholder="Allergies, conditions, medications..."
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-3">
                  {contacts.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                        {c.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.phone}</p>
                      </div>
                      <button onClick={() => removeContact(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} placeholder="Name" className="input-field flex-1" />
                  <input value={newContact.phone} onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })} placeholder="Phone" className="input-field flex-1" />
                  <button onClick={addContact} className="p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <button onClick={prev} disabled={step === 0} className="btn-ghost flex items-center gap-1 disabled:opacity-30">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          {step < 2 ? (
            <button onClick={next} className="btn-primary flex items-center gap-1 px-5 py-2.5">
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/dashboard")}
              className="btn-primary flex items-center gap-1 px-5 py-2.5"
            >
              Go to Dashboard <ChevronRight className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
