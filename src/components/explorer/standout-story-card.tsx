"use client";

import { ProjectCard } from "@/components/explorer/project-card";
import type { PortfolioProject } from "@/lib/portfolio-data";

export interface StandoutStoryCardProps {
  project: PortfolioProject;
}

export function StandoutStoryCard({ project }: StandoutStoryCardProps) {
  return <ProjectCard project={project} />;
}

export default StandoutStoryCard;
