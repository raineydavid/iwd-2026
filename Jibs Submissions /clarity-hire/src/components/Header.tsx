import { FileCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
          <FileCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold font-display leading-tight text-foreground">
            Inclusive Job Description Checker
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
