import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Coffee } from "lucide-react";
import ProfileCard from "@/components/profile-card";
import SearchBar from "@/components/search-bar";
import type { Profile } from "@shared/schema";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data: profiles = [], isLoading } = useQuery<Profile[]>({
    queryKey: ["/api/profiles"],
  });

  const filteredProfiles = profiles.filter(
    (p) =>
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.product.toLowerCase().includes(search.toLowerCase()) ||
      p.roast.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-lg">
            <Coffee className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent transform transition-transform hover:scale-105">
            BaristaIQ
          </h1>
        </div>
        <div className="flex gap-4">
          <Link href="/settings">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Link href="/profile/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Profile
            </Button>
          </Link>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} className="mb-8" />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
          {filteredProfiles.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No profiles found
            </div>
          )}
        </div>
      )}
    </div>
  );
}