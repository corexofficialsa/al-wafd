import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface FinanceEntry {
  id: string;
  amount: number;
  note: string;
  date: string;
  createdAt: Timestamp | null;
}

export async function addExpense(amount: number, note: string, date: string): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.");
  await addDoc(collection(db, "expenses"), { amount, note, date, createdAt: serverTimestamp() });
}

export async function addIncome(amount: number, note: string, date: string): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.");
  await addDoc(collection(db, "income"), { amount, note, date, createdAt: serverTimestamp() });
}

export async function deleteExpense(id: string): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "expenses", id));
}

export async function deleteIncome(id: string): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "income", id));
}

function subscribe(collectionName: "expenses" | "income", cb: (entries: FinanceEntry[]) => void) {
  if (!db) return () => {};
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          amount: data.amount as number,
          note: (data.note as string) ?? "",
          date: (data.date as string) ?? "",
          createdAt: (data.createdAt as Timestamp) ?? null,
        };
      })
    );
  });
}

export const subscribeExpenses = (cb: (entries: FinanceEntry[]) => void) => subscribe("expenses", cb);
export const subscribeIncome = (cb: (entries: FinanceEntry[]) => void) => subscribe("income", cb);

export const sumEntries = (entries: FinanceEntry[]): number =>
  entries.reduce((total, e) => total + (Number.isFinite(e.amount) ? e.amount : 0), 0);

export interface ProfitSplit {
  profit: number;
  charity: number;
  corex: number;
  parents: number;
  ridhwan: number;
}

const CHARITY_SHARE = 0.25;
const COREX_SHARE = 0.05;
const PARENTS_SHARE = 0.2;
// Ridhwan's share is the remaining 50% — computed below as the true
// remainder rather than its own constant, see the comment there.

/** Splits net profit per the fixed shares: 25% charity, 5% Corex (Muhammed), 20% parents, 50% Ridhwan. */
export function splitProfit(income: number, expense: number): ProfitSplit {
  const profit = income - expense;
  const charity = profit * CHARITY_SHARE;
  const corex = profit * COREX_SHARE;
  const parents = profit * PARENTS_SHARE;
  // Computed as the true remainder (not profit * 0.5) so the four shares
  // always sum exactly to profit even if the percentages above are ever
  // tweaked and no longer add up to a clean 100%.
  const ridhwan = profit - charity - corex - parents;
  return { profit, charity, corex, parents, ridhwan };
}
