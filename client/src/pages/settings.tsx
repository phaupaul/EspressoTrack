import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSettingsSchema, type Settings, type InsertSettings } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Settings as SettingsIcon, Trash2, ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";

export default function Settings() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: settings, isLoading } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const form = useForm({
    resolver: zodResolver(insertSettingsSchema),
    defaultValues: settings || {
      grinderSettingMin: 1,
      grinderSettingMax: 16,
      dialSettingMin: 1,
      dialSettingMax: 100,
      grindAmountMin: 0,
      grindAmountMax: 25,
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertSettings) => {
      const res = await apiRequest("PATCH", "/api/settings", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "Settings updated successfully" });
      navigate("/");
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/user");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ title: "Account deleted successfully" });
      navigate("/auth");
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete account",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--espresso-bg)' }}>
        <p className="text-[var(--espresso-muted)]">Loading...</p>
      </div>
    );
  }

  const onSubmit = (data: InsertSettings) => {
    updateMutation.mutate(data);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() !== "delete") {
      toast({
        title: "Invalid confirmation",
        description: 'Please type "delete" to confirm account deletion',
        variant: "destructive",
      });
      return;
    }
    deleteAccountMutation.mutate();
    setShowDeleteDialog(false);
  };

  const sansFont = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--espresso-bg)' }}>
      <div className="noise-overlay" />
      <div className="warm-gradient-radial fixed inset-0 pointer-events-none" />

      <div className="container mx-auto max-w-3xl px-4 py-8 relative z-10 space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] rounded-lg -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Settings Card */}
        <div className="surface-elevated rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[var(--espresso-border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--espresso-amber)] flex items-center justify-center">
                <SettingsIcon className="h-5 w-5 text-[var(--espresso-bg)]" />
              </div>
              <div>
                <h1 className="text-2xl text-[var(--espresso-cream)]">Equipment Settings</h1>
                <p className="text-sm text-[var(--espresso-muted)]" style={sansFont}>Configure your grinder and dosage ranges</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Grinder Settings */}
                <div className="rounded-lg bg-[var(--espresso-surface)] p-5 border border-[var(--espresso-border)]">
                  <h3 className="text-sm font-semibold text-[var(--espresso-amber)] uppercase tracking-wider mb-5" style={sansFont}>
                    Grinder Settings Range
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="grinderSettingMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--espresso-cream-dim)] text-sm" style={sansFont}>Minimum Setting</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-12 text-lg font-semibold focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="grinderSettingMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--espresso-cream-dim)] text-sm" style={sansFont}>Maximum Setting</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-12 text-lg font-semibold focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Dial Settings */}
                <div className="rounded-lg bg-[var(--espresso-surface)] p-5 border border-[var(--espresso-border)]">
                  <h3 className="text-sm font-semibold text-[var(--espresso-amber)] uppercase tracking-wider mb-5" style={sansFont}>
                    Dial Settings Range
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="dialSettingMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--espresso-cream-dim)] text-sm" style={sansFont}>Minimum Dial</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-12 text-lg font-semibold focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dialSettingMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--espresso-cream-dim)] text-sm" style={sansFont}>Maximum Dial</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-12 text-lg font-semibold focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Grind Amount */}
                <div className="rounded-lg bg-[var(--espresso-surface)] p-5 border border-[var(--espresso-border)]">
                  <h3 className="text-sm font-semibold text-[var(--espresso-amber)] uppercase tracking-wider mb-5" style={sansFont}>
                    Grind Amount Range (grams)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="grindAmountMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--espresso-cream-dim)] text-sm" style={sansFont}>Minimum Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-12 text-lg font-semibold focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="grindAmountMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--espresso-cream-dim)] text-sm" style={sansFont}>Maximum Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-12 text-lg font-semibold focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    size="lg"
                    className="flex-1 bg-[var(--espresso-amber)] hover:bg-[var(--espresso-amber-hover)] text-[var(--espresso-bg)] font-semibold rounded-lg h-12"
                  >
                    {updateMutation.isPending ? "Saving..." : "Save Settings"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    size="lg"
                    className="border-[var(--espresso-border-strong)] text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] hover:border-[var(--espresso-amber)] rounded-lg bg-transparent h-12"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="surface-elevated rounded-xl overflow-hidden border-[var(--espresso-red)] border-opacity-30" style={{ borderColor: 'rgba(196, 92, 76, 0.3)' }}>
          <div className="p-6 border-b" style={{ borderColor: 'rgba(196, 92, 76, 0.2)', background: 'rgba(196, 92, 76, 0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--espresso-red)] flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl text-[var(--espresso-red)]">Danger Zone</h2>
            </div>
          </div>

          <div className="p-6">
            <p className="text-[var(--espresso-muted)] mb-6 leading-relaxed" style={sansFont}>
              This action cannot be undone. All your coffee profiles and settings will be permanently deleted.
            </p>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-[var(--espresso-red)] hover:bg-[var(--espresso-red-hover)] text-white font-semibold rounded-lg"
                  size="lg"
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="surface-elevated border-[var(--espresso-border-strong)] rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl text-[var(--espresso-red)]">Delete Account</AlertDialogTitle>
                  <AlertDialogDescription className="text-[var(--espresso-muted)] space-y-4" asChild>
                    <div>
                      <p>This action is permanent. All your coffee profiles and settings will be deleted.</p>
                      <div className="mt-4">
                        <p className="font-semibold text-[var(--espresso-cream-dim)] mb-2" style={sansFont}>Type "delete" to confirm:</p>
                        <Input
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="Type 'delete' to confirm"
                          className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg focus:border-[var(--espresso-red)] focus:ring-1 focus:ring-[var(--espresso-red)] placeholder:text-[var(--espresso-muted)]"
                        />
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-[var(--espresso-border)] bg-transparent text-[var(--espresso-cream-dim)] hover:bg-[var(--espresso-surface)] rounded-lg">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-[var(--espresso-red)] hover:bg-[var(--espresso-red-hover)] text-white rounded-lg"
                    disabled={deleteAccountMutation.isPending}
                  >
                    {deleteAccountMutation.isPending ? "Deleting..." : "Delete Account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
