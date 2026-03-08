import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, AlertCircle, CheckCircle2, Clock, Target, Lightbulb, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const scoreItems = [
  { label: "Headline", score: 65, tip: "Add your value proposition and target role" },
  { label: "Summary", score: 40, tip: "Write a compelling 3-paragraph story" },
  { label: "Experience", score: 78, tip: "Quantify achievements with metrics" },
  { label: "Skills", score: 55, tip: "Add 20+ relevant skills, prioritize top 3" },
  { label: "Recommendations", score: 30, tip: "Request 3-5 from recent colleagues" },
  { label: "Resume Alignment", score: 52, tip: "Sync job titles and date ranges" },
];

const plan30 = [
  "Rewrite headline with target role + value prop",
  "Craft a compelling 3-paragraph summary",
  "Add professional headshot (increase views by 14x)",
  "Update top 3 skills to match career goals",
];

const plan60 = [
  "Rewrite 2 most recent experience entries with metrics",
  "Request 3 recommendations from colleagues",
  "Align resume job titles with LinkedIn exactly",
  "Join and engage in 3 relevant LinkedIn groups",
];

const plan90 = [
  "Publish 2 thought leadership posts",
  "Comment meaningfully on 5 posts per week",
  "Connect with 20 people in target companies",
  "Review and adjust strategy based on analytics",
];

const overallScore = Math.round(scoreItems.reduce((a, b) => a + b.score, 0) / scoreItems.length);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center h-16 px-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </Button>
          <h1 className="ml-4 font-display font-bold text-lg">Your Assessment</h1>
        </div>
      </nav>

      <div className="container px-6 py-12 max-w-5xl">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" stroke="hsl(var(--secondary))" strokeWidth="8" fill="none" />
              <circle
                cx="60" cy="60" r="52"
                stroke="url(#goldGradient)" strokeWidth="8" fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(overallScore / 100) * 327} 327`}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(40, 52%, 58%)" />
                  <stop offset="100%" stopColor="hsl(40, 60%, 72%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-display text-gradient-gold">{overallScore}</span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display mb-2">Profile Health Score</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your LinkedIn profile and resume have significant room for improvement. 
              Follow your personalized plan below to boost your visibility and career prospects.
            </p>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Detailed Breakdown
          </h3>
          <div className="space-y-5">
            {scoreItems.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-sm">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.score >= 70 ? "text-green-400" : item.score >= 50 ? "text-primary" : "text-orange-400"}`}>
                    {item.score}%
                  </span>
                </div>
                <Progress value={item.score} className="h-2 bg-secondary" />
                <div className="flex items-start gap-2 mt-2">
                  <Lightbulb className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{item.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 30-60-90 Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { days: "30 Days", icon: Target, items: plan30, color: "text-green-400" },
            { days: "60 Days", icon: Clock, items: plan60, color: "text-primary" },
            { days: "90 Days", icon: Calendar, items: plan90, color: "text-orange-400" },
          ].map((phase, pi) => (
            <motion.div
              key={phase.days}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + pi * 0.1 }}
              className="card-elevated rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <phase.icon className={`w-5 h-5 ${phase.color}`} />
                <h3 className="text-lg font-bold font-display">{phase.days}</h3>
              </div>
              <ul className="space-y-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Email coaching note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-elevated rounded-2xl p-8 text-center"
        >
          <AlertCircle className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold font-display mb-2">Weekly Coaching Emails Activated</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            You'll receive your first coaching email within 24 hours with Week 1 tasks. 
            Each email tracks your progress and adapts your plan accordingly.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
