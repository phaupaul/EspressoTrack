import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{profile.brand}</CardTitle>
            <CardDescription>{profile.product}</CardDescription>
          </div>
          <Badge>{profile.roast}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profile.grinderSetting && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grinder Setting</span>
              <span>{profile.grinderSetting}</span>
            </div>
          )}
          {profile.grindAmount && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grind Dial Setting</span>
              <span>{profile.grindAmount}</span>
            </div>
          )}
          {profile.grindAmountGrams && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grind Amount</span>
              <span>{profile.grindAmountGrams}g</span>
            </div>
          )}
          {profile.rating && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Rating</span>
              <Rating value={profile.rating} readOnly />
            </div>
          )}

          {profile.advancedFeedback && (
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="text-sm font-medium mb-2">Advanced Feedback</div>
              {profile.appearance && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Appearance</span>
                  <span>{profile.appearance}</span>
                </div>
              )}
              {profile.aroma && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Aroma</span>
                  <span>{profile.aroma}</span>
                </div>
              )}
              {profile.taste && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taste</span>
                  <span>{profile.taste}</span>
                </div>
              )}
              {profile.body && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Body</span>
                  <span>{profile.body}</span>
                </div>
              )}
              {profile.aftertaste && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Aftertaste</span>
                  <span>{profile.aftertaste}</span>
                </div>
              )}
              {profile.extractionTime && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Extraction Time</span>
                  <span>{profile.extractionTime}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <Link href={`/profile/${profile.id}`}>
              <Button variant="outline" size="sm">Edit</Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Profile</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this profile? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteMutation.mutate()}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}