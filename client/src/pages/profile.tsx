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

  // Update form values when profile data is loaded
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
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  const onSubmit = (data: any) => {
    if (id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen animated-gradient py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="glass-dark rounded-3xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-slate-800">
            {id ? "Edit Profile" : "New Profile"}
          </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">Brand <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter coffee brand" className="glass border-2 border-slate-200 focus:border-slate-400 rounded-2xl bg-white h-11" />
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
                <FormLabel className="text-slate-700 font-semibold">Product <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter coffee product name" className="glass border-2 border-slate-200 focus:border-slate-400 rounded-2xl bg-white h-11" />
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
                <FormLabel className="text-slate-700 font-semibold">Roast <span className="text-red-500">*</span></FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="glass border-2 border-slate-200 focus:border-slate-400 rounded-2xl bg-white h-11">
                      <SelectValue placeholder="Select roast level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="glass-dark rounded-2xl">
                    {roastOptions.map((roast) => (
                      <SelectItem key={roast} value={roast}>
                        {roast}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grinderSetting"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">Grinder Setting (1-16)</FormLabel>
                <div className="space-y-3 glass rounded-2xl p-4 border border-slate-200">
                  <FormControl>
                    <Slider
                      min={1}
                      max={16}
                      step={1}
                      value={[field.value || 8]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                  <div className="text-sm font-semibold text-slate-700 text-right bg-slate-100 px-3 py-1 rounded-xl inline-block float-right">
                    Current setting: {field.value || 8}
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
                <FormLabel className="text-slate-700 font-semibold">Grind Dial Setting (1-100)</FormLabel>
                <div className="space-y-3 glass rounded-2xl p-4 border border-slate-200">
                  <FormControl>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={[field.value || 50]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                  <div className="text-sm font-semibold text-slate-700 text-right bg-slate-100 px-3 py-1 rounded-xl inline-block float-right">
                    Current setting: {field.value || 50}
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
                <FormLabel className="text-slate-700 font-semibold">Grind Amount (0-25g)</FormLabel>
                <div className="space-y-3 glass rounded-2xl p-4 border border-slate-200">
                  <FormControl>
                    <Slider
                      min={0}
                      max={25}
                      step={0.5}
                      value={[field.value || 18]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                  <div className="text-sm font-semibold text-slate-700 text-right bg-slate-100 px-3 py-1 rounded-xl inline-block float-right">
                    Current amount: {field.value || 18}g
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
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Rating
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6 border-t pt-6">
            <FormField
              control={form.control}
              name="advancedFeedback"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Advanced Feedback</FormLabel>
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
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="appearance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appearance</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select appearance" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {appearanceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aroma"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aroma</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select aroma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {aromaOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taste"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taste</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select taste" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tasteOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select body" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bodyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aftertaste"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aftertaste</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select aftertaste" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {aftertasteOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="extractionTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extraction Time</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select extraction time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {extractionTimeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-slate-800 hover:bg-slate-900 text-white rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              {id ? "Update" : "Create"} Profile
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="glass border-2 border-slate-200 hover:border-slate-300 hover:bg-white rounded-2xl text-slate-700"
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