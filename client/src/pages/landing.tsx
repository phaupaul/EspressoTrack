import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Coffee, Star, Settings2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const features = [
  {
    icon: Coffee,
    title: "Track Your Shots",
    description: "Record and manage your espresso profiles with detailed parameters",
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
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (user) {
      navigate("/dashboard");
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : ""
      }`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              EspressoTrack
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Blog
            </Button>
            <Button onClick={() => navigate("/auth")} variant="default">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Perfect Your
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              {" "}Espresso Game
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track, analyze, and improve your espresso shots with detailed profiles and expert feedback.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900"
            >
              Start Tracking Your Shots
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="container mx-auto px-4 mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg"
              >
                <feature.icon className="h-12 w-12 text-amber-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="container mx-auto px-4 mt-24 text-center"
        >
          <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to elevate your espresso?
            </h2>
            <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
              Join a community of coffee enthusiasts and start your journey to the perfect shot.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-white text-amber-800 hover:bg-amber-50"
            >
              Create Free Account
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}