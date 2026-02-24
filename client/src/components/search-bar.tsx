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
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--espresso-muted)] h-5 w-5" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 h-13 bg-[var(--espresso-surface)] border-[var(--espresso-border-strong)] text-[var(--espresso-cream)] rounded-lg placeholder:text-[var(--espresso-muted)] font-medium text-base focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]"
        placeholder="Search profiles by brand, product, or roast..."
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
    </div>
  );
}
