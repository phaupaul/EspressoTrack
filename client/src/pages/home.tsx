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
    <div className="container mx-auto py-4 px-4 md:py-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-lg">
            <Coffee className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent transform transition-transform hover:scale-105">
            EspressoTrack
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <Link href="/profile/new">
            <Button size="sm" className="md:size-default">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Profile
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" size="sm" className="md:size-default">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon"
            className="h-8 w-8 md:h-9 md:w-9"
            onClick={handleLogout} 
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign Out</span>
          </Button>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} className="mb-6 md:mb-8" />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
          {filteredProfiles.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8 md:py-12">
              No profiles found
            </div>
          )}
        </div>
      )}
    </div>
  );
}