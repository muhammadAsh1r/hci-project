"use client";

import { Container } from "@/components/layout/container";
import { StatisticCard } from "@/components/shared/statistic-card";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { stats } from "@/lib/mock-data";

function AnimatedStat({
  label,
  value,
  prefix,
  suffix,
  index,
}: {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  index: number;
}) {
  const { count, ref } = useAnimatedCounter({ end: value });

  const formattedValue =
    suffix === "M+"
      ? `${prefix}${count}${suffix}`
      : `${prefix}${count.toLocaleString()}${suffix}`;

  return (
    <div ref={ref}>
      <StatisticCard label={label} value={formattedValue} index={index} />
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 sm:py-20" aria-label="Platform statistics">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              label={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
