import type {
  MarketplaceProject,
  ProjectFilters,
  SortOption,
} from "@/lib/types/project";
import { FILTER_OPTIONS } from "@/lib/types/project";

export function filterProjects(
  projects: MarketplaceProject[],
  filters: ProjectFilters
): MarketplaceProject[] {
  return projects.filter((project) => {
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const searchable = [
        project.title,
        project.description,
        ...project.skills,
        project.category,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(query)) return false;
    }

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(project.category)
    ) {
      return false;
    }

    if (
      filters.budgetRanges.length > 0 &&
      !filters.budgetRanges.includes(project.budgetRange)
    ) {
      return false;
    }

    if (
      filters.experienceLevels.length > 0 &&
      !filters.experienceLevels.includes(project.experienceLevel)
    ) {
      return false;
    }

    if (
      filters.projectTypes.length > 0 &&
      !filters.projectTypes.includes(project.projectType)
    ) {
      return false;
    }

    if (
      filters.durations.length > 0 &&
      !filters.durations.includes(project.duration)
    ) {
      return false;
    }

    if (filters.skills.length > 0) {
      const hasSkill = filters.skills.some((skill) =>
        project.skills.includes(skill)
      );
      if (!hasSkill) return false;
    }

    return true;
  });
}

export function sortProjects(
  projects: MarketplaceProject[],
  sortBy: SortOption
): MarketplaceProject[] {
  const sorted = [...projects];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
    case "highest-budget":
      return sorted.sort((a, b) => b.budgetMax - a.budgetMax);
    case "most-proposals":
      return sorted.sort((a, b) => b.proposalCount - a.proposalCount);
    case "best-match":
    default:
      return sorted.sort((a, b) => {
        const scoreA = a.clientRating * 10 - a.proposalCount * 0.5;
        const scoreB = b.clientRating * 10 - b.proposalCount * 0.5;
        return scoreB - scoreA;
      });
  }
}

export function getActiveFilterCount(filters: ProjectFilters): number {
  return (
    filters.categories.length +
    filters.budgetRanges.length +
    filters.experienceLevels.length +
    filters.projectTypes.length +
    filters.durations.length +
    filters.skills.length +
    (filters.search ? 1 : 0)
  );
}

export interface ActiveFilterTag {
  key: string;
  label: string;
  group: keyof ProjectFilters;
  value: string;
}

export function getActiveFilterTags(
  filters: ProjectFilters
): ActiveFilterTag[] {
  const tags: ActiveFilterTag[] = [];

  if (filters.search) {
    tags.push({
      key: "search",
      label: `"${filters.search}"`,
      group: "search",
      value: filters.search,
    });
  }

  filters.categories.forEach((cat) =>
    tags.push({ key: `cat-${cat}`, label: cat, group: "categories", value: cat })
  );

  filters.budgetRanges.forEach((range) => {
    const label =
      FILTER_OPTIONS.budgetRanges.find((b) => b.value === range)?.label ?? range;
    tags.push({
      key: `budget-${range}`,
      label,
      group: "budgetRanges",
      value: range,
    });
  });

  filters.experienceLevels.forEach((level) =>
    tags.push({
      key: `exp-${level}`,
      label: level,
      group: "experienceLevels",
      value: level,
    })
  );

  filters.projectTypes.forEach((type) =>
    tags.push({
      key: `type-${type}`,
      label: type,
      group: "projectTypes",
      value: type,
    })
  );

  filters.durations.forEach((dur) =>
    tags.push({ key: `dur-${dur}`, label: dur, group: "durations", value: dur })
  );

  filters.skills.forEach((skill) =>
    tags.push({ key: `skill-${skill}`, label: skill, group: "skills", value: skill })
  );

  return tags;
}
