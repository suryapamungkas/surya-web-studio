"use client";

import { create } from "zustand";
import type { PortfolioProject } from "@/lib/portfolio-data";

export type AudienceMode = "INDIVIDUAL" | "ENTERPRISE";

export interface ContactModalDraft {
  subject: string;
  contextLabel?: string;
  defaultMessage?: string;
}

interface AgencyStoreState {
  audienceMode: AudienceMode;
  setAudienceMode: (mode: AudienceMode) => void;

  activeDemoProject: PortfolioProject | null;
  setActiveDemoProject: (project: PortfolioProject | null) => void;

  bookmarkedSlugs: string[];
  toggleBookmark: (slug: string) => void;

  isContactModalOpen: boolean;
  contactDraft: ContactModalDraft;
  openContactModal: (draft?: Partial<ContactModalDraft>) => void;
  setContactModalOpen: (open: boolean) => void;
}

const DEFAULT_CONTACT_DRAFT: ContactModalDraft = {
  subject: "Konsultasi Pembuatan Website",
  contextLabel: "Konsultasi Umum",
  defaultMessage: "",
};

export const useAgencyStore = create<AgencyStoreState>((set) => ({
  audienceMode: "INDIVIDUAL",
  setAudienceMode: (mode) => set({ audienceMode: mode }),

  activeDemoProject: null,
  setActiveDemoProject: (project) => set({ activeDemoProject: project }),

  bookmarkedSlugs: ["baru-lagi", "nusa-asset-management"],
  toggleBookmark: (slug) =>
    set((state) => ({
      bookmarkedSlugs: state.bookmarkedSlugs.includes(slug)
        ? state.bookmarkedSlugs.filter((item) => item !== slug)
        : [...state.bookmarkedSlugs, slug],
    })),

  isContactModalOpen: false,
  contactDraft: DEFAULT_CONTACT_DRAFT,
  openContactModal: (draft) =>
    set({
      isContactModalOpen: true,
      contactDraft: {
        subject: draft?.subject ?? DEFAULT_CONTACT_DRAFT.subject,
        contextLabel: draft?.contextLabel ?? DEFAULT_CONTACT_DRAFT.contextLabel,
        defaultMessage:
          draft?.defaultMessage ?? DEFAULT_CONTACT_DRAFT.defaultMessage,
      },
    }),
  setContactModalOpen: (open) => set({ isContactModalOpen: open }),
}));
