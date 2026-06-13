"use client";

import {
  BUDGET_RECOMMENDATIONS,
  CATEGORY_SKILL_SUGGESTIONS,
  CATEGORY_SUGGESTIONS,
} from "@/lib/client-projects-data";
import type { ClientProjectFormData } from "@/lib/types/client-project";
import type { ExperienceLevel, ProjectCategory } from "@/lib/types/project";
import { FILTER_OPTIONS } from "@/lib/types/project";

const DESCRIPTION_MAX = 2000;
const DESCRIPTION_MIN = 50;

export interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  skills?: string;
  budgetMin?: string;
  budgetMax?: string;
  projectType?: string;
  experienceLevel?: string;
  timeline?: string;
}

export function validateProjectForm(form: ClientProjectFormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.title.trim()) {
    errors.title = "Project title is required.";
  } else if (form.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters.";
  }

  if (!form.description.trim()) {
    errors.description = "Project description is required.";
  } else if (form.description.trim().length < DESCRIPTION_MIN) {
    errors.description = `Description must be at least ${DESCRIPTION_MIN} characters.`;
  } else if (form.description.length > DESCRIPTION_MAX) {
    errors.description = `Description must be under ${DESCRIPTION_MAX} characters.`;
  }

  if (!form.category) errors.category = "Please select a category.";
  if (form.skills.length === 0) errors.skills = "Add at least one required skill.";

  const min = Number(form.budgetMin);
  const max = Number(form.budgetMax);
  if (!form.budgetMin || !form.budgetMax) {
    errors.budgetMin = "Budget range is required.";
  } else if (isNaN(min) || isNaN(max) || min <= 0 || max <= 0) {
    errors.budgetMin = "Enter valid budget amounts.";
  } else if (min >= max) {
    errors.budgetMax = "Maximum budget must be greater than minimum.";
  }

  if (!form.projectType) errors.projectType = "Select a project type.";
  if (!form.experienceLevel) errors.experienceLevel = "Select experience level.";
  if (!form.timeline) errors.timeline = "Select a timeline.";

  return errors;
}

export function getSkillSuggestions(category: ProjectCategory | ""): string[] {
  if (!category) return [];
  return CATEGORY_SKILL_SUGGESTIONS[category] ?? [];
}

export function getBudgetRecommendation(
  category: ProjectCategory | "",
  level: ExperienceLevel | ""
): string | null {
  if (!category || !level) return null;
  return BUDGET_RECOMMENDATIONS[category]?.[level]?.label ?? null;
}

export { CATEGORY_SUGGESTIONS, FILTER_OPTIONS, DESCRIPTION_MAX, DESCRIPTION_MIN };
