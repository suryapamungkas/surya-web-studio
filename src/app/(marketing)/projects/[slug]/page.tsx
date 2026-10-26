import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PORTFOLIO_PROJECTS,
  getProjectBySlug,
} from "@/lib/portfolio-data";
import { CaseStudyDetailClient } from "@/components/explorer/case-study-detail-client";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.title} (${project.clientTypeLabel})`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Surya Pamungkas`,
      description: project.shortDescription,
      images: [project.coverImageUrl],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = PORTFOLIO_PROJECTS.filter(
    (p) => p.slug !== project.slug
  )
    .sort((a, b) => {
      const aScore =
        (a.category === project.category ? 2 : 0) +
        (a.targetSegment === project.targetSegment ? 1 : 0);
      const bScore =
        (b.category === project.category ? 2 : 0) +
        (b.targetSegment === project.targetSegment ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  return (
    <CaseStudyDetailClient
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
