import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";
import type { projects } from "./schema";

export type NewProjectRow = typeof projects.$inferInsert;

export const INITIAL_PROJECT_SEED: NewProjectRow[] = PORTFOLIO_PROJECTS.map(
  (item) => ({
    slug: item.slug,
    title: item.title,
    shortDescription: item.shortDescription,
    engineeringStory: item.engineeringStory,
    category: item.category,
    targetSegment: item.targetSegment,
    coverImageUrl: item.coverImageUrl,
    previewVideoUrl: item.previewVideoUrl ?? null,
    liveDemoUrl: item.liveDemoUrl,
    techStack: item.techStack,
    metrics: item.metrics,
    likesCount: item.likesCount,
    viewsCount: item.viewsCount,
    isFeatured: item.isFeatured,
    isStandout: item.isStandout,
  })
);
