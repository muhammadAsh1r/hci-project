import { Award } from "lucide-react";
import type { Certification } from "@/lib/types/dashboard";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section aria-labelledby="certifications-heading">
      <h2 id="certifications-heading" className="mb-6 text-xl font-semibold text-foreground">
        Certifications
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Award className="size-5" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-foreground">{cert.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{cert.organization}</p>
            <div className="mt-4 space-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
              <p>Issued: {cert.issueDate}</p>
              <p className="font-mono">ID: {cert.credentialId}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
