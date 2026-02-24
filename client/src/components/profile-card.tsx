import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Rating from "@/components/rating";
import type { Profile } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/profiles/${profile.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      toast({ title: "Profile deleted successfully" });
    },
  });

  return (
    <div className="surface-card rounded-xl overflow-hidden accent-line group">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl text-[var(--espresso-cream)] truncate">{profile.brand}</h3>
            <p className="text-sm text-[var(--espresso-muted)] mt-0.5 truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {profile.product}
            </p>
          </div>
          <span className="ml-3 px-3 py-1 rounded-md text-xs font-medium bg-[rgba(200,149,108,0.12)] text-[var(--espresso-amber)] border border-[var(--espresso-border)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {profile.roast}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 space-y-3">
        {/* Parameters */}
        <div className="rounded-lg bg-[var(--espresso-surface)] p-4 space-y-2.5 border border-[var(--espresso-border)]">
          {profile.grinderSetting && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Grinder Setting</span>
              <span className="text-sm font-semibold text-[var(--espresso-cream)] bg-[var(--espresso-card)] px-2.5 py-0.5 rounded-md border border-[var(--espresso-border)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {profile.grinderSetting}
              </span>
            </div>
          )}
          {profile.grindAmount && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Grind Dial</span>
              <span className="text-sm font-semibold text-[var(--espresso-cream)] bg-[var(--espresso-card)] px-2.5 py-0.5 rounded-md border border-[var(--espresso-border)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {profile.grindAmount}
              </span>
            </div>
          )}
          {profile.grindAmountGrams && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Amount</span>
              <span className="text-sm font-semibold text-[var(--espresso-cream)] bg-[var(--espresso-card)] px-2.5 py-0.5 rounded-md border border-[var(--espresso-border)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {profile.grindAmountGrams}g
              </span>
            </div>
          )}
        </div>

        {profile.rating && (
          <div className="flex justify-between items-center rounded-lg bg-[var(--espresso-surface)] p-3 border border-[var(--espresso-border)]">
            <span className="text-xs font-medium text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rating</span>
            <Rating value={profile.rating} readOnly />
          </div>
        )}

        {profile.advancedFeedback && (
          <div className="rounded-lg bg-[var(--espresso-surface)] p-4 space-y-2 border border-[var(--espresso-border)]">
            <div className="text-xs font-semibold text-[var(--espresso-amber)] mb-2 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Tasting Notes
            </div>
            {profile.appearance && (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Appearance</span>
                <span className="text-[var(--espresso-cream-dim)] text-right max-w-[60%]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{profile.appearance}</span>
              </div>
            )}
            {profile.aroma && (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Aroma</span>
                <span className="text-[var(--espresso-cream-dim)] text-right max-w-[60%]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{profile.aroma}</span>
              </div>
            )}
            {profile.taste && (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Taste</span>
                <span className="text-[var(--espresso-cream-dim)] text-right max-w-[60%]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{profile.taste}</span>
              </div>
            )}
            {profile.body && (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Body</span>
                <span className="text-[var(--espresso-cream-dim)] text-right max-w-[60%]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{profile.body}</span>
              </div>
            )}
            {profile.aftertaste && (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Aftertaste</span>
                <span className="text-[var(--espresso-cream-dim)] text-right max-w-[60%]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{profile.aftertaste}</span>
              </div>
            )}
            {profile.extractionTime && (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--espresso-muted)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Extraction</span>
                <span className="text-[var(--espresso-cream-dim)] text-right max-w-[60%]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{profile.extractionTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-2 gap-2">
          <Link href={`/profile/${profile.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-[var(--espresso-border-strong)] text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] hover:border-[var(--espresso-amber)] rounded-lg bg-transparent font-medium transition-all"
            >
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="bg-[var(--espresso-red)] hover:bg-[var(--espresso-red-hover)] rounded-lg"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="surface-elevated border-[var(--espresso-border-strong)] rounded-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[var(--espresso-cream)]">Delete Profile</AlertDialogTitle>
                <AlertDialogDescription className="text-[var(--espresso-muted)]">
                  Are you sure you want to delete this profile? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-[var(--espresso-border)] bg-transparent text-[var(--espresso-cream-dim)] hover:bg-[var(--espresso-surface)] rounded-lg">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate()}
                  className="bg-[var(--espresso-red)] hover:bg-[var(--espresso-red-hover)] text-white rounded-lg"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
