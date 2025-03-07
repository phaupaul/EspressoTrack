import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">EspressoTrack Blog</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Coming soon! Our blog will feature articles about coffee brewing techniques,
                equipment reviews, and tips for perfecting your espresso shots.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
