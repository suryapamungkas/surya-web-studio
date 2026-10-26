import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const clientSegmentEnum = pgEnum("client_segment", [
  "INDIVIDUAL",
  "SME",
  "ENTERPRISE",
]);

export const projectCategoryEnum = pgEnum("project_category", [
  "WEB_APP",
  "MOBILE_APP",
  "AI_SYSTEM",
  "INTERACTIVE_WEB",
  "ENTERPRISE_ERP",
  "PERSONAL_BRAND",
]);

export type ClientSegment = (typeof clientSegmentEnum.enumValues)[number];
export type ProjectCategory = (typeof projectCategoryEnum.enumValues)[number];

export interface TechStackItem {
  name: string;
  icon: string;
  role: string;
}

export interface ProjectMetrics {
  lighthouseScore: number;
  loadTimeMs: number;
  impactMetric: string;
}

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  engineeringStory: text("engineering_story").notNull(),
  category: projectCategoryEnum("category").notNull(),
  targetSegment: clientSegmentEnum("target_segment").notNull(),
  coverImageUrl: text("cover_image_url").notNull(),
  previewVideoUrl: text("preview_video_url"),
  liveDemoUrl: text("live_demo_url"),
  techStack: jsonb("tech_stack").$type<TechStackItem[]>().notNull(),
  metrics: jsonb("metrics").$type<ProjectMetrics>().notNull(),
  likesCount: integer("likes_count").default(0).notNull(),
  viewsCount: integer("views_count").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isStandout: boolean("is_standout").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectBriefs = pgTable("project_briefs", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientWhatsapp: text("client_whatsapp").notNull(),
  companyOrPersonalName: text("company_or_personal_name"),
  segment: clientSegmentEnum("segment").notNull(),
  rawPrompt: text("raw_prompt").notNull(),
  aiGeneratedArchitecture: jsonb("ai_generated_architecture").$type<{
    summary: string;
    recommendedStack: string[];
    coreModules: {
      title: string;
      description: string;
      complexity: "Low" | "Medium" | "High";
    }[];
    estimatedWeeks: string;
    estimatedBudgetTier: string;
  }>(),
  status: text("status").default("NEW").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
