import {
  addDoc,
  collection,
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
  remaining: number;
}

const CHARITY_SHARE = 0.25;
const COREX_SHARE = 0.05;
const PARENTS_SHARE = 0.25;

/** Splits net profit per the fixed shares: 25% charity, 5% Corex (Muhammed), 25% parents. */
export function splitProfit(income: number, expense: number): ProfitSplit {
  const profit = income - expense;
  const charity = profit * CHARITY_SHARE;
  const corex = profit * COREX_SHARE;
  const parents = profit * PARENTS_SHARE;
  const remaining = profit - charity - corex - parents;
  return { profit, charity, corex, parents, remaining };
}
