import * as schema from "./schema";

export { schema };

export interface StoredBriefRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  clientWhatsapp: string;
  companyOrPersonalName?: string;
  segment: "INDIVIDUAL" | "SME" | "ENTERPRISE";
  rawPrompt: string;
  projectTitle: string;
  estimatedTimelineWeeks: string;
  recommendedServicePackage: string;
  createdAt: string;
}

const memoryBriefStore: StoredBriefRecord[] = [];

export function saveProjectBriefRecord(
  input: Omit<StoredBriefRecord, "id" | "createdAt">
): StoredBriefRecord {
  const record: StoredBriefRecord = {
    ...input,
    id: `BRF-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  memoryBriefStore.unshift(record);
  return record;
}

export function listSavedBriefRecords(): StoredBriefRecord[] {
  return memoryBriefStore;
}
