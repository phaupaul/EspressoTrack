import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchBar({ value, onChange, className }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 h-14 glass-dark border-2 border-slate-200 focus:border-slate-400 rounded-2xl text-slate-700 placeholder:text-slate-400 font-medium text-base shadow-sm"
        placeholder="Search profiles by brand, product, or roast..."
      />
    </div>
  );
}
