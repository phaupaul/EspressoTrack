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
    <Card className="glass-card rounded-3xl border-0 overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-slate-800">{profile.brand}</CardTitle>
            <CardDescription className="text-slate-500 font-medium mt-1">{profile.product}</CardDescription>
          </div>
          <Badge className="bg-slate-800 text-white border-0 shadow-sm px-3 py-1 rounded-xl">
            {profile.roast}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Main parameters with improved visibility */}
          <div className="glass rounded-2xl p-4 space-y-2.5 border border-slate-200">
            {profile.grinderSetting && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Grinder Setting</span>
                <span className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-xl">
                  {profile.grinderSetting}
                </span>
              </div>
            )}
            {profile.grindAmount && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Grind Dial</span>
                <span className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-xl">
                  {profile.grindAmount}
                </span>
              </div>
            )}
            {profile.grindAmountGrams && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Amount</span>
                <span className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-xl">
                  {profile.grindAmountGrams}g
                </span>
              </div>
            )}
          </div>

          {profile.rating && (
            <div className="flex justify-between items-center glass rounded-2xl p-3 border border-slate-200">
              <span className="text-sm font-medium text-slate-600">Rating</span>
              <Rating value={profile.rating} readOnly />
            </div>
          )}

          {profile.advancedFeedback && (
            <div className="glass rounded-2xl p-4 space-y-2.5 border border-slate-200">
              <div className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-slate-400"></div>
                Advanced Feedback
              </div>
              {profile.appearance && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Appearance</span>
                  <span className="text-slate-700 font-semibold text-right max-w-[60%]">{profile.appearance}</span>
                </div>
              )}
              {profile.aroma && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Aroma</span>
                  <span className="text-slate-700 font-semibold text-right max-w-[60%]">{profile.aroma}</span>
                </div>
              )}
              {profile.taste && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Taste</span>
                  <span className="text-slate-700 font-semibold text-right max-w-[60%]">{profile.taste}</span>
                </div>
              )}
              {profile.body && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Body</span>
                  <span className="text-slate-700 font-semibold text-right max-w-[60%]">{profile.body}</span>
                </div>
              )}
              {profile.aftertaste && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Aftertaste</span>
                  <span className="text-slate-700 font-semibold text-right max-w-[60%]">{profile.aftertaste}</span>
                </div>
              )}
              {profile.extractionTime && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Extraction</span>
                  <span className="text-slate-700 font-semibold text-right max-w-[60%]">{profile.extractionTime}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-2 gap-2">
            <Link href={`/profile/${profile.id}`} className="flex-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full glass border-2 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700 font-semibold transition-all duration-300 rounded-xl"
              >
                Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-dark border-0 rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-slate-800">Delete Profile</AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-600">
                    Are you sure you want to delete this profile? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="glass border-2 border-slate-200 rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteMutation.mutate()}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
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