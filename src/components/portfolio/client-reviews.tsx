"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ClientReview } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

interface ClientReviewsProps {
  reviews: ClientReview[];
}

export function ClientReviews({ reviews }: ClientReviewsProps) {
  return (
    <section aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="mb-6 text-xl font-semibold text-foreground">
        Client Reviews
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review, index) => (
          <motion.figure
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="mb-3 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-4",
                    i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="text-sm leading-relaxed text-foreground">
              &ldquo;{review.review}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {review.clientName.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">{review.clientName}</p>
                <p className="text-xs text-muted-foreground">
                  {review.projectCompleted} · {review.date}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
