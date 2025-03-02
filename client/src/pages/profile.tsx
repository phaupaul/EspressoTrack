import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProfileSchema, roastOptions, type Profile, type InsertProfile } from "@shared/schema";
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

  // Add toggle states
  const [showGrinderSetting, setShowGrinderSetting] = useState(true);
  const [showDialSetting, setShowDialSetting] = useState(true);
  const [showGrindAmount, setShowGrindAmount] = useState(true);

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: [`/api/profiles/${id}`],
    enabled: !!id,
  });

  const form = useForm<InsertProfile>({
    resolver: zodResolver(insertProfileSchema),
    defaultValues: profile || {
      brand: "",
      product: "",
      roast: "Medium",
      grinderSetting: 8,
      grindAmount: 50,
      grindAmountGrams: 18,
      rating: undefined,
    },
  });

  // Update form values when toggles change
  const handleGrinderSettingToggle = (checked: boolean) => {
    setShowGrinderSetting(checked);
    if (!checked) {
      form.setValue('grinderSetting', null);
    } else {
      form.setValue('grinderSetting', 8);
    }
  };

  const handleDialSettingToggle = (checked: boolean) => {
    setShowDialSetting(checked);
    if (!checked) {
      form.setValue('grindAmount', null);
    } else {
      form.setValue('grindAmount', 50);
    }
  };

  const handleGrindAmountToggle = (checked: boolean) => {
    setShowGrindAmount(checked);
    if (!checked) {
      form.setValue('grindAmountGrams', null);
    } else {
      form.setValue('grindAmountGrams', 18);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: InsertProfile) => {
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
    mutationFn: async (data: InsertProfile) => {
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

  const onSubmit = (data: InsertProfile) => {
    if (id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold mb-8">
        {id ? "Edit Profile" : "New Profile"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter coffee brand" />
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
                <FormLabel>Product <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter coffee product name" />
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
                <FormLabel>Roast <span className="text-red-500">*</span></FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select roast level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <div className="flex justify-between items-center mb-2">
                  <FormLabel>Grinder Setting (1-16)</FormLabel>
                  <Switch
                    checked={showGrinderSetting}
                    onCheckedChange={handleGrinderSettingToggle}
                  />
                </div>
                {showGrinderSetting && (
                  <div className="space-y-2">
                    <FormControl>
                      <Slider
                        min={1}
                        max={16}
                        step={1}
                        value={[value ?? 8]}
                        onValueChange={([v]) => onChange(v)}
                        {...field}
                      />
                    </FormControl>
                    <div className="text-sm text-muted-foreground text-right">
                      Current setting: {value ?? 8}
                    </div>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grindAmount"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <div className="flex justify-between items-center mb-2">
                  <FormLabel>Grind Dial Setting (1-100)</FormLabel>
                  <Switch
                    checked={showDialSetting}
                    onCheckedChange={handleDialSettingToggle}
                  />
                </div>
                {showDialSetting && (
                  <div className="space-y-2">
                    <FormControl>
                      <Slider
                        min={1}
                        max={100}
                        step={1}
                        value={[value ?? 50]}
                        onValueChange={([v]) => onChange(v)}
                        {...field}
                      />
                    </FormControl>
                    <div className="text-sm text-muted-foreground text-right">
                      Current setting: {value ?? 50}
                    </div>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grindAmountGrams"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <div className="flex justify-between items-center mb-2">
                  <FormLabel>Grind Amount (0-25g)</FormLabel>
                  <Switch
                    checked={showGrindAmount}
                    onCheckedChange={handleGrindAmountToggle}
                  />
                </div>
                {showGrindAmount && (
                  <div className="space-y-2">
                    <FormControl>
                      <Slider
                        min={0}
                        max={25}
                        step={0.5}
                        value={[value ?? 18]}
                        onValueChange={([v]) => onChange(v)}
                        {...field}
                      />
                    </FormControl>
                    <div className="text-sm text-muted-foreground text-right">
                      Current amount: {value ?? 18}g
                    </div>
                  </div>
                )}
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
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {id ? "Update" : "Create"} Profile
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}