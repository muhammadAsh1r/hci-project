"use client";

import { Award } from "lucide-react";
import type { FreelancerCertification } from "@/lib/types/freelancer";

interface ProfileCertificationsProps {
  certifications: FreelancerCertification[];
}

export function ProfileCertifications({
  certifications,
}: ProfileCertificationsProps) {
  if (certifications.length === 0) return null;

  return (
    <section aria-labelledby="certifications-heading">
      <h2
        id="certifications-heading"
        className="mb-6 text-xl font-semibold text-foreground"
      >
        Certifications
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <article
            key={cert.id}
            className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Award className="size-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{cert.name}</h3>
              <p className="text-sm text-muted-foreground">{cert.provider}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Issued {cert.issueDate} · ID: {cert.credentialId}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
