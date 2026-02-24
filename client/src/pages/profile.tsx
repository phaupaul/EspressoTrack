import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertProfileSchema,
  roastOptions,
  appearanceOptions,
  aromaOptions,
  tasteOptions,
  bodyOptions,
  aftertasteOptions,
  extractionTimeOptions,
  type Profile
} from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import Rating from "@/components/rating";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: [`/api/profiles/${id}`],
    enabled: !!id,
  });

  const form = useForm({
    resolver: zodResolver(insertProfileSchema),
    defaultValues: {
      brand: "",
      product: "",
      roast: "Medium" as const,
      grinderSetting: 8,
      grindAmount: 50,
      grindAmountGrams: 18,
      rating: null as number | null,
      advancedFeedback: false,
      appearance: null as string | null,
      aroma: null as string | null,
      taste: null as string | null,
      body: null as string | null,
      aftertaste: null as string | null,
      extractionTime: null as string | null,
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        brand: profile.brand,
        product: profile.product,
        roast: profile.roast as any,
        grinderSetting: profile.grinderSetting,
        grindAmount: profile.grindAmount,
        grindAmountGrams: profile.grindAmountGrams,
        rating: profile.rating as any,
        advancedFeedback: profile.advancedFeedback as any,
        appearance: profile.appearance as any,
        aroma: profile.aroma as any,
        taste: profile.taste as any,
        body: profile.body as any,
        aftertaste: profile.aftertaste as any,
        extractionTime: profile.extractionTime as any,
      });
    }
  }, [profile, form]);

  const advancedFeedbackEnabled = form.watch("advancedFeedback");

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/profiles", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      toast({ title: "Profile created successfully" });
      navigate("/");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("PATCH", `/api/profiles/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      toast({ title: "Profile updated successfully" });
      navigate("/");
    },
  });

  if (id && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--espresso-bg)' }}>
        <p className="text-[var(--espresso-muted)]">Loading...</p>
      </div>
    );
  }

  const onSubmit = (data: any) => {
    if (id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const sansFont = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--espresso-bg)' }}>
      <div className="noise-overlay" />
      <div className="warm-gradient-radial fixed inset-0 pointer-events-none" />

      <div className="container mx-auto max-w-2xl px-4 py-8 relative z-10">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] mb-6 rounded-lg -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="surface-elevated rounded-xl p-8">
          <h1 className="text-3xl text-[var(--espresso-cream)] mb-8">
            {id ? "Edit Profile" : "New Profile"}
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--espresso-cream-dim)] font-medium" style={sansFont}>
                      Brand <span className="text-[var(--espresso-amber)]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter coffee brand"
                        className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-11 focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)] placeholder:text-[var(--espresso-muted)]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--espresso-cream-dim)] font-medium" style={sansFont}>
                      Product <span className="text-[var(--espresso-amber)]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter coffee product name"
                        className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-11 focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)] placeholder:text-[var(--espresso-muted)]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roast"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--espresso-cream-dim)] font-medium" style={sansFont}>
                      Roast <span className="text-[var(--espresso-amber)]">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-11 focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]">
                          <SelectValue placeholder="Select roast level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[var(--espresso-card)] border-[var(--espresso-border-strong)] rounded-lg">
                        {roastOptions.map((roast) => (
                          <SelectItem key={roast} value={roast} className="text-[var(--espresso-cream)] focus:bg-[rgba(200,149,108,0.12)] focus:text-[var(--espresso-cream)]">
                            {roast}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sliders */}
              <FormField
                control={form.control}
                name="grinderSetting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--espresso-cream-dim)] font-medium" style={sansFont}>Grinder Setting (1-16)</FormLabel>
                    <div className="rounded-lg bg-[var(--espresso-surface)] p-4 border border-[var(--espresso-border)] space-y-3">
                      <FormControl>
                        <Slider
                          min={1}
                          max={16}
                          step={1}
                          value={[field.value || 8]}
                          onValueChange={([value]) => field.onChange(value)}
                        />
                      </FormControl>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[var(--espresso-amber)] bg-[var(--espresso-card)] px-3 py-1 rounded-md border border-[var(--espresso-border)] inline-block" style={sansFont}>
                          {field.value || 8}
                        </span>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grindAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--espresso-cream-dim)] font-medium" style={sansFont}>Grind Dial Setting (1-100)</FormLabel>
                    <div className="rounded-lg bg-[var(--espresso-surface)] p-4 border border-[var(--espresso-border)] space-y-3">
                      <FormControl>
                        <Slider
                          min={1}
                          max={100}
                          step={1}
                          value={[field.value || 50]}
                          onValueChange={([value]) => field.onChange(value)}
                        />
                      </FormControl>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[var(--espresso-amber)] bg-[var(--espresso-card)] px-3 py-1 rounded-md border border-[var(--espresso-border)] inline-block" style={sansFont}>
                          {field.value || 50}
                        </span>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grindAmountGrams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--espresso-cream-dim)] font-medium" style={sansFont}>Grind Amount (0-25g)</FormLabel>
                    <div className="rounded-lg bg-[var(--espresso-surface)] p-4 border border-[var(--espresso-border)] space-y-3">
                      <FormControl>
                        <Slider
                          min={0}
                          max={25}
                          step={0.5}
                          value={[field.value || 18]}
                          onValueChange={([value]) => field.onChange(value)}
                        />
                      </FormControl>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[var(--espresso-amber)] bg-[var(--espresso-card)] px-3 py-1 rounded-md border border-[var(--espresso-border)] inline-block" style={sansFont}>
                          {field.value || 18}g
                        </span>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--espresso-cream-dim)] font-medium" style={sansFont}>Rating</FormLabel>
                    <FormControl>
                      <Rating value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Advanced Feedback */}
              <div className="border-t border-[var(--espresso-border)] pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="advancedFeedback"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="text-[var(--espresso-cream-dim)] font-medium" style={sansFont}>Advanced Feedback</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {advancedFeedbackEnabled && (
                  <div className="space-y-4 rounded-lg bg-[var(--espresso-surface)] p-5 border border-[var(--espresso-border)]">
                    <p className="text-xs font-semibold text-[var(--espresso-amber)] uppercase tracking-wider" style={sansFont}>Tasting Notes</p>

                    {[
                      { name: "appearance" as const, label: "Appearance", options: appearanceOptions },
                      { name: "aroma" as const, label: "Aroma", options: aromaOptions },
                      { name: "taste" as const, label: "Taste", options: tasteOptions },
                      { name: "body" as const, label: "Body", options: bodyOptions },
                      { name: "aftertaste" as const, label: "Aftertaste", options: aftertasteOptions },
                      { name: "extractionTime" as const, label: "Extraction Time", options: extractionTimeOptions },
                    ].map(({ name, label, options }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--espresso-cream-dim)] text-sm" style={sansFont}>{label}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || undefined}>
                              <FormControl>
                                <SelectTrigger className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)]">
                                  <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[var(--espresso-card)] border-[var(--espresso-border-strong)] rounded-lg">
                                {options.map((option) => (
                                  <SelectItem key={option} value={option} className="text-[var(--espresso-cream)] focus:bg-[rgba(200,149,108,0.12)] focus:text-[var(--espresso-cream)]">
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-[var(--espresso-amber)] hover:bg-[var(--espresso-amber-hover)] text-[var(--espresso-bg)] font-semibold rounded-lg"
                >
                  {id ? "Update" : "Create"} Profile
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="border-[var(--espresso-border-strong)] text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] hover:border-[var(--espresso-amber)] rounded-lg bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
