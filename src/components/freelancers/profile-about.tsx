"use client";

import { CheckCircle2 } from "lucide-react";
import type { FreelancerProfile } from "@/lib/types/freelancer";

interface ProfileAboutProps {
  freelancer: FreelancerProfile;
}

export function ProfileAbout({ freelancer }: ProfileAboutProps) {
  return (
    <section aria-labelledby="about-heading" className="space-y-6">
      <h2 id="about-heading" className="text-xl font-semibold text-foreground">
        About
      </h2>

      <p className="leading-relaxed text-muted-foreground">{freelancer.about}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Experience</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {freelancer.experience}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Specializations
          </h3>
          <ul className="mt-2 space-y-1">
            {freelancer.specializations.map((spec) => (
              <li
                key={spec}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">
          Career Highlights
        </h3>
        <ul className="mt-2 space-y-2">
          {freelancer.careerHighlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
