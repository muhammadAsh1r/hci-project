"use client";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { testimonials } from "@/lib/mock-data";

export function TestimonialsSection() {
  return (
    <section
      className="bg-muted/40 py-16 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by freelancers and clients"
          description="See what our community has to say about their experience on FreelanceAI."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
