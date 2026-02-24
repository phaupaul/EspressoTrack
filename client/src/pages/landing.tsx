import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Coffee, Star, Settings2, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const features = [
  {
    icon: Coffee,
    title: "Track Your Shots",
    description: "Record and manage your espresso profiles with detailed brewing parameters",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description: "Rate your shots and capture detailed feedback on taste, body, and more",
  },
  {
    icon: Settings2,
    title: "Optimize Settings",
    description: "Fine-tune your grinder settings and dosage for the perfect extraction",
  },
];

export default function Landing() {
  const [, navigate] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen warm-gradient relative">
      <div className="noise-overlay" />
      <div className="warm-gradient-radial fixed inset-0 pointer-events-none" />

      <nav className="fixed w-full z-40">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--espresso-amber)] flex items-center justify-center">
              <Coffee className="h-5 w-5 text-[var(--espresso-bg)]" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-[var(--espresso-cream)]" style={{ fontFamily: "'Instrument Serif', serif" }}>
              EspressoTrack
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)]"
              size="sm"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Blog</span>
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-[var(--espresso-amber)] hover:bg-[var(--espresso-amber-hover)] text-[var(--espresso-bg)] font-semibold rounded-lg"
              size="sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--espresso-border-strong)] bg-[var(--espresso-surface)] text-[var(--espresso-cream-dim)] text-sm mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--espresso-amber)] animate-pulse" />
            Track every shot. Perfect every cup.
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-[var(--espresso-cream)]">
            Perfect Your
            <br />
            <span className="text-[var(--espresso-amber)]">Espresso</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--espresso-muted)] mb-10 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Track, analyze, and improve your espresso shots with detailed profiles and expert feedback.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-[var(--espresso-amber)] hover:bg-[var(--espresso-amber-hover)] text-[var(--espresso-bg)] font-semibold rounded-lg px-8 h-14 text-lg group"
            >
              Start Tracking
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/blog")}
              className="border-[var(--espresso-border-strong)] text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] hover:border-[var(--espresso-amber)] rounded-lg px-8 h-14 text-lg bg-transparent"
            >
              Read the Blog
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 mt-28"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="surface-card rounded-xl p-6 accent-line"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--espresso-surface)] border border-[var(--espresso-border-strong)] flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-[var(--espresso-amber)]" />
                </div>
                <h3 className="text-lg mb-2 text-[var(--espresso-cream)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--espresso-muted)] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="container mx-auto px-4 mt-28 text-center"
        >
          <div className="surface-elevated rounded-2xl p-10 md:p-14 glow-amber">
            <h2 className="text-3xl md:text-5xl mb-4 text-[var(--espresso-cream)]">
              Ready to elevate your brew?
            </h2>
            <p className="text-[var(--espresso-muted)] mb-8 max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join a community of coffee enthusiasts and start your journey to the perfect shot.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-[var(--espresso-amber)] hover:bg-[var(--espresso-amber-hover)] text-[var(--espresso-bg)] font-semibold rounded-lg px-8 h-14 text-lg"
            >
              Create Free Account
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
