"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { PortfolioItem } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

interface PortfolioDetailsContentProps {
  item: PortfolioItem;
}

export function PortfolioDetailsContent({ item }: PortfolioDetailsContentProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-6 lg:p-8">
      <Link
        href="/dashboard/portfolio"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Portfolio
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative flex h-56 items-end overflow-hidden rounded-2xl bg-gradient-to-br sm:h-72",
          item.thumbnail
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative p-6 sm:p-8">
          <Badge className="mb-3 rounded-lg bg-white/20 text-white backdrop-blur-sm">
            {item.category}
          </Badge>
          <h1 className="text-2xl font-bold text-white sm:text-4xl">{item.title}</h1>
          <p className="mt-2 text-sm text-white/80">{item.createdAt}</p>
        </div>
      </motion.div>

      {/* Overview */}
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="mb-4 text-xl font-semibold text-foreground">
          Project Overview
        </h2>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="leading-relaxed text-muted-foreground">{item.overview}</p>
          {item.projectUrl && (
            <a
              href={item.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              View Live Project
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </section>

      {/* Challenges & Solutions */}
      <div className="grid gap-6 md:grid-cols-2">
        <section aria-labelledby="challenges-heading">
          <h2 id="challenges-heading" className="mb-4 text-xl font-semibold text-foreground">
            Challenges
          </h2>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <ul className="space-y-3">
              {item.challenges.map((challenge, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="solutions-heading">
          <h2 id="solutions-heading" className="mb-4 text-xl font-semibold text-foreground">
            Solutions
          </h2>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <ul className="space-y-3">
              {item.solutions.map((solution, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-400" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Results */}
      <section aria-labelledby="results-heading">
        <h2 id="results-heading" className="mb-4 text-xl font-semibold text-foreground">
          Results
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {item.results.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <p className="text-sm font-medium leading-relaxed text-foreground">
                {result}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-4 text-xl font-semibold text-foreground">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <Badge
              key={tech}
              className="rounded-lg bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="mb-4 text-xl font-semibold text-foreground">
          Project Gallery
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {item.gallery.map((gradient, i) => (
            <div
              key={i}
              className={cn(
                "flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br",
                gradient
              )}
              role="img"
              aria-label={`${item.title} gallery image ${i + 1}`}
            >
              <span className="text-2xl font-bold text-white/20">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
