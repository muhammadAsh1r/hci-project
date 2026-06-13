"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { freelancerProfiles } from "@/lib/freelancers-data";

export function TopFreelancersSection() {
  return (
    <section
      id="freelancers"
      className="py-16 sm:py-24"
      aria-labelledby="freelancers-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Top Talent"
          title="Meet our top freelancers"
          description="Highly rated professionals ready to bring your projects to life."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {freelancerProfiles.slice(0, 6).map((freelancer, index) => (
            <motion.article
              key={freelancer.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Link
                href={`/freelancers/${freelancer.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="size-14">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-base font-semibold text-primary-foreground">
                      {freelancer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {freelancer.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {freelancer.title}
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      <Star
                        className="size-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {freelancer.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-primary">
                    ${freelancer.hourlyRate}
                    <span className="text-xs font-normal text-muted-foreground">
                      /hr
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {freelancer.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="rounded-lg bg-muted font-normal text-muted-foreground"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
