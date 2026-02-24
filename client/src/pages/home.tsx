import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Coffee, LogOut } from "lucide-react";
import ProfileCard from "@/components/profile-card";
import SearchBar from "@/components/search-bar";
import type { Profile } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const [search, setSearch] = useState("");
  const [, navigate] = useLocation();
  const { logoutMutation } = useAuth();
  const { data: profiles = [], isLoading } = useQuery<Profile[]>({
    queryKey: ["/api/profiles"],
  });

  const filteredProfiles = profiles.filter(
    (p) =>
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.product.toLowerCase().includes(search.toLowerCase()) ||
      p.roast.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/auth");
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--espresso-bg)' }}>
      <div className="noise-overlay" />
      <div className="warm-gradient-radial fixed inset-0 pointer-events-none" />

      <div className="container mx-auto py-6 px-4 md:py-10 relative z-10">
        {/* Header */}
        <div className="surface-elevated rounded-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--espresso-amber)] flex items-center justify-center glow-amber">
                <Coffee className="h-6 w-6 text-[var(--espresso-bg)]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl tracking-tight text-[var(--espresso-cream)]">
                  EspressoTrack
                </h1>
                <p className="text-sm text-[var(--espresso-muted)] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Perfect your brew
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/profile/new">
                <Button
                  size="lg"
                  className="bg-[var(--espresso-amber)] hover:bg-[var(--espresso-amber-hover)] text-[var(--espresso-bg)] font-semibold rounded-lg"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  New Profile
                </Button>
              </Link>
              <Link href="/settings">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[var(--espresso-border-strong)] text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] hover:border-[var(--espresso-amber)] rounded-lg bg-transparent"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 border-[var(--espresso-border-strong)] text-[var(--espresso-red)] hover:text-[var(--espresso-red-hover)] hover:bg-[rgba(196,92,76,0.08)] hover:border-[var(--espresso-red)] rounded-lg bg-transparent"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Profile grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="surface-card h-64 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
            {filteredProfiles.length === 0 && (
              <div className="col-span-full">
                <div className="surface-elevated rounded-2xl p-12 text-center">
                  <Coffee className="h-16 w-16 text-[var(--espresso-muted)] mx-auto mb-4 opacity-40" />
                  <p className="text-lg text-[var(--espresso-cream-dim)]">No profiles found</p>
                  <p className="text-sm text-[var(--espresso-muted)] mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Start tracking your espresso shots!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
