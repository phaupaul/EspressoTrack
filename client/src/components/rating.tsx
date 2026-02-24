import { Star } from "lucide-react";

interface RatingProps {
  value?: number | null;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function Rating({ value = 0, onChange, readOnly }: RatingProps) {
  const ratingValue = value || 0;
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 transition-colors ${
            star <= ratingValue
              ? "fill-[var(--espresso-amber)] text-[var(--espresso-amber)]"
              : "fill-transparent text-[var(--espresso-muted)]"
          } ${!readOnly && "cursor-pointer hover:text-[var(--espresso-amber)]"}`}
          onClick={() => !readOnly && onChange?.(star)}
        />
      ))}
    </div>
  );
}
