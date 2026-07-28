import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { EnquirySource } from "./analytics";

export interface OrderDetail {
  label: string;
}

export interface QuotationLineItem {
  label: string;
  price: number;
}

export interface Quotation {
  items: QuotationLineItem[];
  total: number;
  generatedAt: Timestamp | null;
}

export interface Receipt {
  receiptNumber: string;
  generatedAt: Timestamp | null;
}

export interface Order {
  id: string;
  customerName: string;
  source: EnquirySource;
  quantity: number;
  details: OrderDetail[];
  createdAt: Timestamp | null;
  quotation: Quotation | null;
  receipt: Receipt | null;
}

export interface CreateOrderInput {
  customerName: string;
  source: EnquirySource;
  quantity: number;
  details: OrderDetail[];
}

export async function createOrder(input: CreateOrderInput): Promise<void> {
  if (!db) return;
  try {
    await addDoc(collection(db, "orders"), {
      customerName: input.customerName,
      source: input.source,
      quantity: input.quantity,
      details: input.details,
      quotation: null,
      receipt: null,
      createdAt: serverTimestamp(),
    });
  } catch {
    // Non-critical — never block the customer's WhatsApp handoff over this.
  }
}

export function subscribeOrders(cb: (orders: Order[]) => void) {
  if (!db) return () => {};
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          customerName: (data.customerName as string) ?? "",
          source: (data.source as EnquirySource) ?? "contact",
          quantity: (data.quantity as number) ?? 1,
          details: (data.details as OrderDetail[]) ?? [],
          createdAt: (data.createdAt as Timestamp) ?? null,
          quotation: (data.quotation as Quotation | null) ?? null,
          receipt: (data.receipt as Receipt | null) ?? null,
        };
      })
    );
  });
}

export async function saveQuotation(orderId: string, items: QuotationLineItem[]): Promise<number> {
  if (!db) throw new Error("Firebase is not configured.");
  const total = items.reduce((sum, i) => sum + (Number.isFinite(i.price) ? i.price : 0), 0);
  await updateDoc(doc(db, "orders", orderId), {
    quotation: { items, total, generatedAt: serverTimestamp() },
  });
  return total;
}

export async function saveReceipt(orderId: string, receiptNumber: string): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.");
  await updateDoc(doc(db, "orders", orderId), {
    receipt: { receiptNumber, generatedAt: serverTimestamp() },
  });
}
