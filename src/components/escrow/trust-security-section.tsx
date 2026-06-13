import { Lock, Scale, Shield, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Escrow Protection",
    description: "Funds are held securely until work is approved. Neither party can access funds unilaterally.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Payments",
    description: "All transactions are verified and logged with full audit trails for complete transparency.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description: "Bank-grade encryption protects every payment. PCI-DSS compliant payment processing.",
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    description: "Fair mediation process with dedicated support team to resolve conflicts quickly.",
  },
];

export function TrustSecuritySection() {
  return (
    <section aria-labelledby="trust-heading">
      <h2 id="trust-heading" className="mb-6 text-xl font-semibold text-foreground">
        Trust & Security
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <item.icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/30 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Secured by</span>
        {["SSL Encrypted", "PCI Compliant", "SOC 2", "256-bit AES"].map((badge) => (
          <span key={badge} className="rounded-lg border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}
