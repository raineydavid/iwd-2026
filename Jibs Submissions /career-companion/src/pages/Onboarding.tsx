import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload, Linkedin, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const steps = ["LinkedIn", "Resume", "Email", "Done"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [email, setEmail] = useState("");
  const [fileName, setFileName] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  i <= step ? "bg-gradient-gold text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${i < step ? "bg-primary" : "bg-secondary"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card-elevated rounded-2xl p-8"
          >
            {step === 0 && (
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Linkedin className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display mb-2">Your LinkedIn Profile</h2>
                  <p className="text-muted-foreground">Paste your LinkedIn profile URL so we can analyze your presence.</p>
                </div>
                <Input
                  placeholder="https://linkedin.com/in/yourname"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="bg-secondary border-border h-12"
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Upload className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display mb-2">Upload Your Resume</h2>
                  <p className="text-muted-foreground">We'll cross-reference it with your LinkedIn for a complete picture.</p>
                </div>
                <label className="flex flex-col items-center justify-center h-36 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer bg-secondary/50">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {fileName || "Drop your PDF or click to upload"}
                  </span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Mail className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display mb-2">Your Coaching Email</h2>
                  <p className="text-muted-foreground">Where should we send your assessment and weekly coaching updates?</p>
                </div>
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary border-border h-12"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold font-display">You're All Set!</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  We're analyzing your profile now. You'll receive your full assessment and 30-60-90 plan at <strong className="text-foreground">{email}</strong> shortly.
                </p>
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-gold text-primary-foreground font-semibold px-8 py-6 glow-gold hover:opacity-90 transition-opacity"
                >
                  View Dashboard Preview
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}

            {step < 3 && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="ghost"
                  onClick={step === 0 ? () => navigate("/") : prev}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={next}
                  className="bg-gradient-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
