import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSettingsSchema, type Settings, type InsertSettings } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Settings as SettingsIcon, Trash2 } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      // Clear the user data from cache
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
    return <div className="container mx-auto p-8">Loading...</div>;
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

  return (
    <div className="min-h-screen animated-gradient py-8">
      <div className="container mx-auto max-w-3xl px-4 space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="glass border border-slate-200 hover:bg-white mb-4 rounded-2xl text-slate-700"
        >
          ← Back to Dashboard
        </Button>

        {/* Settings Card */}
        <Card className="glass-dark border-0 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-200">
            <CardTitle className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-2xl">
                <SettingsIcon className="h-6 w-6 text-white" />
              </div>
              Equipment Settings
            </CardTitle>
            <p className="text-slate-600 mt-2">Configure your grinder and dosage ranges</p>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Grinder Settings Section */}
                <div className="glass rounded-3xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    Grinder Settings Range
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="grinderSettingMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Minimum Setting</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="glass border-2 border-slate-200 focus:border-slate-400 text-slate-800 font-semibold text-lg h-12 rounded-2xl bg-white"
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
                          <FormLabel className="text-slate-700 font-semibold">Maximum Setting</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="glass border-2 border-slate-200 focus:border-slate-400 text-slate-800 font-semibold text-lg h-12 rounded-2xl bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Dial Settings Section */}
                <div className="glass rounded-3xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    Dial Settings Range
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="dialSettingMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Minimum Dial</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="glass border-2 border-slate-200 focus:border-slate-400 text-slate-800 font-semibold text-lg h-12 rounded-2xl bg-white"
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
                          <FormLabel className="text-slate-700 font-semibold">Maximum Dial</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="glass border-2 border-slate-200 focus:border-slate-400 text-slate-800 font-semibold text-lg h-12 rounded-2xl bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Grind Amount Section */}
                <div className="glass rounded-3xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    Grind Amount Range (grams)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="grindAmountMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Minimum Amount</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="glass border-2 border-slate-200 focus:border-slate-400 text-slate-800 font-semibold text-lg h-12 rounded-2xl bg-white"
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
                          <FormLabel className="text-slate-700 font-semibold">Maximum Amount</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="glass border-2 border-slate-200 focus:border-slate-400 text-slate-800 font-semibold text-lg h-12 rounded-2xl bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    size="lg"
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-semibold rounded-2xl"
                  >
                    {updateMutation.isPending ? "Saving..." : "Save Settings"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    size="lg"
                    className="glass border-2 border-slate-200 hover:border-slate-300 hover:bg-white h-12 rounded-2xl text-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Delete Account Section */}
        <Card className="glass-dark border-2 border-red-200 rounded-3xl shadow-lg overflow-hidden">
          <CardHeader className="bg-red-50/50 border-b border-red-200">
            <CardTitle className="text-2xl font-bold text-red-700 flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-2xl">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-slate-600 mb-6 leading-relaxed">
              This action cannot be undone. All your coffee profiles and settings will be permanently deleted from our servers.
            </p>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive"
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl"
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-dark border-0 rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl text-red-700">Delete Account</AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-600 space-y-4">
                    <p>This action is permanent and cannot be undone. All your coffee profiles and settings will be deleted.</p>
                    <div className="mt-4">
                      <p className="font-semibold text-slate-700 mb-2">Type "delete" to confirm:</p>
                      <Input
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        placeholder="Type 'delete' to confirm"
                        className="glass border-2 border-red-200 focus:border-red-400 text-slate-800 font-semibold rounded-2xl bg-white"
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="glass border-2 border-slate-200 rounded-2xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-2xl"
                    disabled={deleteAccountMutation.isPending}
                  >
                    {deleteAccountMutation.isPending ? "Deleting..." : "Delete Account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}