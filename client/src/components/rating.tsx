import { Star } from "lucide-react";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function Rating({ value = 0, onChange, readOnly }: RatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= value
              ? "fill-yellow-400 text-yellow-400"
              : "fill-transparent text-muted-foreground"
          } ${!readOnly && "cursor-pointer hover:text-yellow-400"}`}
          onClick={() => !readOnly && onChange?.(star)}
        />
      ))}
    </div>
  );
}
