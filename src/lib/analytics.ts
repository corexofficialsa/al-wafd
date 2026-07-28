import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const VISIT_DEVICE_KEY = "wafd-visit-last-date";

const STATS_DOC = () => doc(db!, "stats", "counters");

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Counts one visit per device per calendar day, not per tab/reload. */
export async function trackWebsiteVisit(): Promise<void> {
  if (!db) return;
  if (typeof window === "undefined") return;
  const today = todayIso();
  if (window.localStorage.getItem(VISIT_DEVICE_KEY) === today) return;
  window.localStorage.setItem(VISIT_DEVICE_KEY, today);
  try {
    await setDoc(STATS_DOC(), { websiteVisits: increment(1) }, { merge: true });
  } catch {
    // Non-critical — never block the visitor over an analytics write.
  }
}

export async function trackEnquireClick(): Promise<void> {
  if (!db) return;
  try {
    await setDoc(STATS_DOC(), { enquireClicks: increment(1) }, { merge: true });
  } catch {
    // Non-critical.
  }
}

export type EnquirySource =
  | "economy"
  | "comfort"
  | "elite-5-star"
  | "custom-builder"
  | "contact";

export const SOURCE_LABEL: Record<EnquirySource, string> = {
  economy: "Economy Package",
  comfort: "Comfort Package",
  "elite-5-star": "Elite 5-Star Package",
  "custom-builder": "Custom Builder",
  contact: "Contact Form",
};

export interface SaveCustomerInput {
  name: string;
  phone?: string;
  source: EnquirySource;
  detail?: string;
}

export async function saveCustomer(input: SaveCustomerInput): Promise<void> {
  if (!db) return;
  try {
    await addDoc(collection(db, "customers"), {
      name: input.name,
      phone: input.phone ?? "",
      source: input.source,
      detail: input.detail ?? "",
      createdAt: serverTimestamp(),
    });
  } catch {
    // Non-critical — the WhatsApp handoff must still proceed even if this fails.
  }
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  source: EnquirySource;
  detail: string;
  createdAt: Timestamp | null;
}

export function subscribeCustomers(cb: (customers: CustomerRecord[]) => void) {
  if (!db) return () => {};
  const q = query(collection(db, "customers"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: (data.name as string) ?? "",
          phone: (data.phone as string) ?? "",
          source: (data.source as EnquirySource) ?? "contact",
          detail: (data.detail as string) ?? "",
          createdAt: (data.createdAt as Timestamp) ?? null,
        };
      })
    );
  });
}

export interface SiteStats {
  websiteVisits: number;
  enquireClicks: number;
}

export function subscribeStats(cb: (stats: SiteStats) => void) {
  if (!db) return () => {};
  return onSnapshot(STATS_DOC(), (snap) => {
    const data = snap.data();
    cb({
      websiteVisits: (data?.websiteVisits as number) ?? 0,
      enquireClicks: (data?.enquireClicks as number) ?? 0,
    });
  });
}
