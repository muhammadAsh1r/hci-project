"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FreelancerPortfolioItem } from "@/lib/types/freelancer";
import { cn } from "@/lib/utils";

interface ProfilePortfolioProps {
  items: FreelancerPortfolioItem[];
}

export function ProfilePortfolio({ items }: ProfilePortfolioProps) {
  if (items.length === 0) {
    return (
      <section aria-labelledby="portfolio-heading">
        <h2 id="portfolio-heading" className="text-xl font-semibold text-foreground">
          Portfolio
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          No portfolio items yet.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="portfolio-heading">
      <h2 id="portfolio-heading" className="mb-6 text-xl font-semibold text-foreground">
        Portfolio
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className={cn(
                "flex h-36 items-center justify-center bg-gradient-to-br text-white",
                item.thumbnail
              )}
            >
              <span className="text-lg font-bold opacity-80">{item.title}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="rounded-lg text-xs font-normal"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 gap-1 rounded-lg px-0 text-primary hover:bg-transparent"
              >
                View Details
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
