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
    <div className="min-h-screen animated-gradient">
      <div className="container mx-auto py-6 px-4 md:py-10">
        {/* Header with glass effect */}
        <div className="glass-dark rounded-3xl p-6 md:p-8 mb-8 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-slate-200 rounded-2xl blur-md opacity-40 float-animation"></div>
                <div className="relative p-3 bg-slate-800 rounded-2xl shadow-lg">
                  <Coffee className="h-10 w-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800">
                  EspressoTrack
                </h1>
                <p className="text-sm text-slate-500 font-medium mt-1">Perfect your brew</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/profile/new">
                <Button 
                  size="lg" 
                  className="bg-slate-800 hover:bg-slate-900 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-2xl"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  New Profile
                </Button>
              </Link>
              <Link href="/settings">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glass border-2 border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-300 rounded-2xl text-slate-700"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="icon"
                className="glass h-12 w-12 border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 rounded-2xl"
                onClick={handleLogout} 
                disabled={logoutMutation.isPending}
              >
                <LogOut className="h-5 w-5 text-red-600" />
                <span className="sr-only">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Search bar with glass effect */}
        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Profile grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card h-64 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
            {filteredProfiles.length === 0 && (
              <div className="col-span-full">
                <div className="glass-card rounded-3xl p-12 text-center">
                  <Coffee className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-lg text-slate-600 font-medium">No profiles found</p>
                  <p className="text-sm text-slate-400 mt-2">Start tracking your espresso shots!</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}