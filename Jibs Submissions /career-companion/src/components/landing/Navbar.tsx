import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold font-display">Ascend</span>
        </div>
        <Button
          size="sm"
          onClick={() => navigate("/onboarding")}
          className="bg-gradient-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
