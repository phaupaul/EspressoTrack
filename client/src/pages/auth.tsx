import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Coffee } from "lucide-react";

type FormData = {
  username: string;
  password: string;
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [, navigate] = useLocation();
  const { loginMutation, registerMutation, user } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(isLogin ? loginSchema : insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        await loginMutation.mutateAsync(data);
      } else {
        await registerMutation.mutateAsync(data);
      }
      navigate("/dashboard");
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative" style={{ background: 'var(--espresso-bg)' }}>
      <div className="noise-overlay" />

      {/* Form side */}
      <div className="flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="surface-elevated rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-3xl text-[var(--espresso-cream)] mb-1">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-[var(--espresso-muted)] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {isLogin
                  ? "Sign in to access your coffee profiles"
                  : "Sign up to start tracking your coffee profiles"}
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--espresso-cream-dim)] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="username"
                          className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-12 text-base focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)] placeholder:text-[var(--espresso-muted)]"
                          placeholder="Enter username"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--espresso-cream-dim)] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          autoComplete={isLogin ? "current-password" : "new-password"}
                          className="bg-[var(--espresso-input)] border-[var(--espresso-border)] text-[var(--espresso-cream)] rounded-lg h-12 text-base focus:border-[var(--espresso-amber)] focus:ring-1 focus:ring-[var(--espresso-amber)] placeholder:text-[var(--espresso-muted)]"
                          placeholder="Enter password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3 pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-[var(--espresso-amber)] hover:bg-[var(--espresso-amber-hover)] text-[var(--espresso-bg)] font-semibold rounded-lg h-12"
                    disabled={loginMutation.isPending || registerMutation.isPending}
                  >
                    {isLogin ? "Sign In" : "Sign Up"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-[var(--espresso-muted)] hover:text-[var(--espresso-cream)] hover:bg-transparent rounded-lg"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Need an account?" : "Already have an account?"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Branding side */}
      <div className="hidden md:flex flex-col items-center justify-center p-8 relative" style={{ background: 'var(--espresso-surface)' }}>
        <div className="warm-gradient-radial absolute inset-0" />
        <div className="text-center relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-[var(--espresso-amber)] flex items-center justify-center mx-auto mb-8 glow-amber-strong">
            <Coffee className="h-10 w-10 text-[var(--espresso-bg)]" />
          </div>
          <h1 className="text-5xl mb-4 text-[var(--espresso-cream)]">
            EspressoTrack
          </h1>
          <p className="text-lg text-[var(--espresso-muted)] max-w-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Your personal coffee brewing companion. Track, optimize, and perfect your espresso shots.
          </p>
        </div>
      </div>
    </div>
  );
}
