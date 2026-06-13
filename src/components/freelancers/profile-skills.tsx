"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import type { FreelancerSkill } from "@/lib/types/freelancer";

interface ProfileSkillsProps {
  skills: FreelancerSkill[];
}

export function ProfileSkills({ skills }: ProfileSkillsProps) {
  return (
    <section aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="mb-6 text-xl font-semibold text-foreground">
        Skills
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-foreground">{skill.name}</span>
              <span className="text-sm font-semibold text-primary">
                {skill.proficiency}%
              </span>
            </div>
            <Progress
              value={skill.proficiency}
              className="h-2"
              aria-label={`${skill.name} proficiency: ${skill.proficiency}%`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
