"use client";

import { motion } from "framer-motion";
import { StarRating } from "@/components/freelancers/star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { FreelancerReview } from "@/lib/types/freelancer";

interface ProfileReviewsProps {
  reviews: FreelancerReview[];
  averageRating: number;
  totalReviews: number;
  distribution: { stars: number; count: number }[];
}

export function ProfileReviews({
  reviews,
  averageRating,
  totalReviews,
  distribution,
}: ProfileReviewsProps) {
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <section aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="mb-6 text-xl font-semibold text-foreground">
        Reviews & Ratings
      </h2>

      <div className="mb-8 grid gap-6 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
        <div className="text-center sm:text-left">
          <p className="text-5xl font-bold text-foreground">{averageRating}</p>
          <StarRating rating={averageRating} size="lg" className="mt-2 justify-center sm:justify-start" />
          <p className="mt-2 text-sm text-muted-foreground">
            {totalReviews} total reviews
          </p>
        </div>

        <div className="space-y-2" aria-label="Rating distribution">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="w-8 text-sm text-muted-foreground">
                {item.stars} ★
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(item.count / maxCount) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (5 - item.stars) * 0.1 }}
                  className="h-full rounded-full bg-amber-400"
                />
              </div>
              <span className="w-8 text-right text-sm text-muted-foreground">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start gap-4">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-muted text-sm font-medium">
                    {review.clientAvatar}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {review.clientName}
                      </p>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {review.review}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>Project: {review.projectName}</span>
                    <span>Budget: {review.projectBudget}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
