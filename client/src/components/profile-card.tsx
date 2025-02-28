import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Rating from "@/components/rating";
import type { Profile } from "@shared/schema";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link href={`/profile/${profile.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{profile.brand}</CardTitle>
              <CardDescription>{profile.product}</CardDescription>
            </div>
            <Badge>{profile.roast}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.grinderSetting && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grinder Setting</span>
                <span>{profile.grinderSetting}</span>
              </div>
            )}
            {profile.grindAmount && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grind Amount</span>
                <span>{profile.grindAmount}</span>
              </div>
            )}
            {profile.shotLength && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shot Length</span>
                <span>{profile.shotLength}s</span>
              </div>
            )}
            {profile.rating && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Rating</span>
                <Rating value={profile.rating} readOnly />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
