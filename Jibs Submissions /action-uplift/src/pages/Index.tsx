import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommitmentCard from "@/components/CommitmentCard";
import ActionResult from "@/components/ActionResult";
import { actionsByLevel, levelLabels, Action } from "@/data/actions";

const levels = Object.keys(levelLabels);

const Index = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);

  const generateAction = useCallback((level: string) => {
    const actions = actionsByLevel[level];
    const random = actions[Math.floor(Math.random() * actions.length)];
    setCurrentAction(random);
  }, []);

  const handleSelect = (level: string) => {
    setSelectedLevel(level);
    setCurrentAction(null);
    generateAction(level);
  };

  const handleReroll = () => {
    if (selectedLevel) {
      generateAction(selectedLevel);
    }
  };

  const handleBack = () => {
    setSelectedLevel(null);
    setCurrentAction(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              International Women's Day 2026
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-900 text-foreground leading-[1.05] mb-6">
              Give to <span className="text-gold italic">Gain</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pick your commitment level. Get one concrete action. 
              Share it publicly — because change starts when we say it out loud.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {!selectedLevel ? (
            <motion.div
              key="picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-foreground mb-8">
                How much can you give today?
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {levels.map((level, i) => (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <CommitmentCard
                      level={level}
                      isSelected={false}
                      onClick={() => handleSelect(level)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={handleBack}
                className="mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                ← Choose a different level
              </button>

              {currentAction && (
                <ActionResult
                  action={currentAction}
                  level={selectedLevel}
                  onReroll={handleReroll}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Made with 💜 for International Women's Day 2026
        </p>
      </footer>
    </div>
  );
};

export default Index;
