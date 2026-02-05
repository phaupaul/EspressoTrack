import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    // Redirect if already logged in
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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 animated-gradient">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md glass-dark border-slate-200 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-slate-800">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
            <CardDescription className="text-slate-600">
              {isLogin
                ? "Sign in to access your coffee profiles"
                : "Sign up to start tracking your coffee profiles"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Username</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          autoComplete="username"
                          className="bg-white border-slate-200 rounded-2xl text-slate-800 text-lg h-12"
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
                      <FormLabel className="text-slate-700">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          autoComplete={isLogin ? "current-password" : "new-password"}
                          className="bg-white border-slate-200 rounded-2xl text-slate-800 text-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-2xl h-12 shadow-lg"
                    disabled={loginMutation.isPending || registerMutation.isPending}
                  >
                    {isLogin ? "Sign In" : "Sign Up"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-slate-600 hover:text-slate-800 hover:bg-white/50 rounded-2xl"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Need an account?" : "Already have an account?"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center p-8 glass-dark">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-slate-200 rounded-3xl blur-xl opacity-40 float-animation"></div>
            <div className="relative p-4 bg-slate-800 rounded-3xl shadow-xl">
              <Coffee className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black mb-4 text-slate-800">EspressoTrack</h1>
          <p className="text-xl text-slate-600 max-w-md">
            Your personal coffee brewing companion. Track, optimize, and perfect your espresso shots with detailed profiles and ratings.
          </p>
        </div>
      </div>
    </div>
  );
}