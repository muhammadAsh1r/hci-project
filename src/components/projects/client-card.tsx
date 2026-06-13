import { BadgeCheck, Briefcase, Calendar, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Client } from "@/lib/types/project";

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Client Information
      </h3>

      <div className="flex items-start gap-4">
        <Avatar className="size-14">
          <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-base font-semibold text-primary-foreground">
            {client.avatar}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">{client.name}</p>
            {client.verified && (
              <BadgeCheck
                className="size-4 text-primary"
                aria-label="Verified client"
              />
            )}
          </div>

          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star
                className="size-4 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              <span>
                <span className="font-medium text-foreground">
                  {client.rating}
                </span>{" "}
                rating
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="size-4" aria-hidden="true" />
              <span>{client.totalProjectsPosted} projects posted</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4" aria-hidden="true" />
              <span>Member since {client.memberSince}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
