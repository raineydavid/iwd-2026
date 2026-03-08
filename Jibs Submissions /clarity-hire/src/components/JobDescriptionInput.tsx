import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Search, FileText, Upload } from 'lucide-react';
import { SAMPLE_JD } from '@/lib/lexicon';

interface Props {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

const JobDescriptionInput = ({ onAnalyze, isAnalyzing }: Props) => {
  const [text, setText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === 'string') setText(result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your job description here…"
          className="w-full min-h-[280px] p-5 rounded-xl border border-border bg-background text-foreground font-body text-[15px] leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-y transition-all"
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {text.length > 0 && `${text.split(/\s+/).filter(Boolean).length} words`}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() => onAnalyze(text)}
          disabled={!text.trim() || isAnalyzing}
          className="gap-2 px-6 font-body font-semibold"
          size="lg"
        >
          <Search className="w-4 h-4" />
          {isAnalyzing ? 'Analyzing…' : 'Analyze Job Description'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setText(SAMPLE_JD)}
          className="gap-2 text-muted-foreground font-body"
        >
          <FileText className="w-3.5 h-3.5" />
          Try Sample
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          className="gap-2 text-muted-foreground font-body"
        >
          <Upload className="w-3.5 h-3.5" />
          Upload .txt
        </Button>
        <input ref={fileRef} type="file" accept=".txt,.md" className="hidden" onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default JobDescriptionInput;
