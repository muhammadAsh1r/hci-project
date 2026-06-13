"use client";

import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { PortfolioItem } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  item: PortfolioItem;
  index?: number;
  onDelete?: (id: string) => void;
}

export function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <Link
        href={`/dashboard/portfolio/${item.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div
          className={cn(
            "relative flex h-44 items-center justify-center bg-gradient-to-br",
            item.thumbnail
          )}
        >
          <span className="text-4xl font-bold text-white/30">
            {item.title.charAt(0)}
          </span>
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <Badge variant="outline" className="shrink-0 rounded-lg text-xs font-normal">
              {item.category}
            </Badge>
          </div>

          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {item.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {item.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-md bg-muted text-xs font-normal"
              >
                {tech}
              </Badge>
            ))}
            {item.technologies.length > 3 && (
              <Badge variant="secondary" className="rounded-md bg-muted text-xs font-normal">
                +{item.technologies.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Eye className="size-3.5" aria-hidden="true" />
                {item.views}
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart className="size-3.5" aria-hidden="true" />
                {item.likes}
              </span>
            </div>
            <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
