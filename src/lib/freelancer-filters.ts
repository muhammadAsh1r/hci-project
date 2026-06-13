import type {
  FreelancerFilters,
  FreelancerProfile,
  FreelancerSortOption,
} from "@/lib/types/freelancer";
import { AVAILABILITY_LABELS } from "@/lib/types/freelancer";

const EXPERIENCE_ORDER = { Beginner: 1, Intermediate: 2, Expert: 3 };

export function filterFreelancers(
  freelancers: FreelancerProfile[],
  filters: FreelancerFilters
): FreelancerProfile[] {
  return freelancers.filter((f) => {
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const searchable = [
        f.name,
        f.role,
        f.title,
        f.bio,
        ...f.skills.map((s) => s.name),
        ...f.specializations,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(query)) return false;
    }

    if (filters.skills.length > 0) {
      const hasSkill = filters.skills.some((skill) =>
        f.skills.some((s) => s.name === skill)
      );
      if (!hasSkill) return false;
    }

    if (
      filters.experienceLevels.length > 0 &&
      !filters.experienceLevels.includes(f.experienceLevel)
    ) {
      return false;
    }

    if (f.hourlyRate < filters.rateMin || f.hourlyRate > filters.rateMax) {
      return false;
    }

    if (
      filters.availability.length > 0 &&
      !filters.availability.includes(f.availability)
    ) {
      return false;
    }

    if (
      filters.locations.length > 0 &&
      !filters.locations.includes(f.location)
    ) {
      return false;
    }

    if (filters.minRating > 0 && f.rating < filters.minRating) {
      return false;
    }

    if (filters.minJobSuccess > 0 && f.jobSuccessScore < filters.minJobSuccess) {
      return false;
    }

    if (filters.languages.length > 0) {
      const hasLang = filters.languages.some((lang) =>
        f.languages.includes(lang)
      );
      if (!hasLang) return false;
    }

    return true;
  });
}

export function sortFreelancers(
  freelancers: FreelancerProfile[],
  sortBy: FreelancerSortOption
): FreelancerProfile[] {
  const sorted = [...freelancers];

  switch (sortBy) {
    case "highest-rated":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "most-experienced":
      return sorted.sort(
        (a, b) =>
          EXPERIENCE_ORDER[b.experienceLevel] -
            EXPERIENCE_ORDER[a.experienceLevel] ||
          b.projectsCompleted - a.projectsCompleted
      );
    case "lowest-rate":
      return sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
    case "highest-rate":
      return sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
    case "recently-active":
      return sorted.sort((a, b) => {
        const score = (s: string) =>
          s === "Online now" ? 3 : s.includes("hour") ? 2 : 1;
        return score(b.lastActive) - score(a.lastActive);
      });
    case "best-match":
    default:
      return sorted.sort((a, b) => {
        const scoreA =
          a.rating * 20 + a.jobSuccessScore * 0.5 + a.projectsCompleted * 0.1;
        const scoreB =
          b.rating * 20 + b.jobSuccessScore * 0.5 + b.projectsCompleted * 0.1;
        return scoreB - scoreA;
      });
  }
}

export function getActiveFilterCount(filters: FreelancerFilters): number {
  return (
    filters.skills.length +
    filters.experienceLevels.length +
    filters.availability.length +
    filters.locations.length +
    filters.languages.length +
    (filters.rateMin > 0 || filters.rateMax < 200 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minJobSuccess > 0 ? 1 : 0) +
    (filters.search ? 1 : 0)
  );
}

export interface FreelancerFilterTag {
  key: string;
  label: string;
  group: keyof FreelancerFilters;
  value: string;
}

export function getActiveFilterTags(
  filters: FreelancerFilters
): FreelancerFilterTag[] {
  const tags: FreelancerFilterTag[] = [];

  if (filters.search) {
    tags.push({
      key: "search",
      label: `"${filters.search}"`,
      group: "search",
      value: filters.search,
    });
  }

  filters.skills.forEach((skill) =>
    tags.push({ key: `skill-${skill}`, label: skill, group: "skills", value: skill })
  );

  filters.experienceLevels.forEach((level) =>
    tags.push({
      key: `exp-${level}`,
      label: level,
      group: "experienceLevels",
      value: level,
    })
  );

  filters.availability.forEach((avail) =>
    tags.push({
      key: `avail-${avail}`,
      label: AVAILABILITY_LABELS[avail].label,
      group: "availability",
      value: avail,
    })
  );

  filters.locations.forEach((loc) =>
    tags.push({ key: `loc-${loc}`, label: loc, group: "locations", value: loc })
  );

  filters.languages.forEach((lang) =>
    tags.push({ key: `lang-${lang}`, label: lang, group: "languages", value: lang })
  );

  if (filters.minRating > 0) {
    tags.push({
      key: "rating",
      label: `${filters.minRating}+ stars`,
      group: "minRating",
      value: String(filters.minRating),
    });
  }

  if (filters.minJobSuccess > 0) {
    tags.push({
      key: "jss",
      label: `${filters.minJobSuccess}%+ success`,
      group: "minJobSuccess",
      value: String(filters.minJobSuccess),
    });
  }

  return tags;
}
