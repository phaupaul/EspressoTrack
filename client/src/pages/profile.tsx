import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProfileSchema, roastOptions, type Profile } from "@shared/schema";
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

  const createMutation = useMutation({
    mutationFn: async (data: typeof form.getValues) => {
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
    mutationFn: async (data: typeof form.getValues) => {
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

  const onSubmit = (data: typeof form.getValues) => {
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grinder Setting (1-16)</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <Slider
                      min={1}
                      max={16}
                      step={1}
                      value={[field.value || 8]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground text-right">
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
                <FormLabel>Grind Dial Setting (1-100)</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={[field.value || 50]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground text-right">
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
                <FormLabel>Grind Amount (0-25g)</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <Slider
                      min={0}
                      max={25}
                      step={0.5}
                      value={[field.value || 18]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground text-right">
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