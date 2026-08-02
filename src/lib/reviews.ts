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
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

function byCreatedAtDesc(a: Review, b: Review): number {
  return (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0);
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  approved: boolean;
  createdAt: Timestamp | null;
}

export interface CreateReviewInput {
  name: string;
  rating: number;
  text: string;
}

export async function createReview(input: CreateReviewInput): Promise<void> {
  if (!db) return;
  try {
    await addDoc(collection(db, "reviews"), {
      name: input.name,
      rating: input.rating,
      text: input.text,
      approved: false,
      createdAt: serverTimestamp(),
    });
  } catch {
    // Non-critical — the submit UI thanks the visitor either way.
  }
}

/**
 * Homepage feed — only reviews the admin has approved. Sorted client-side
 * rather than with `orderBy` in the query, since combining that with the
 * `approved` equality filter would require a manually-created Firestore
 * composite index.
 */
export function subscribeApprovedReviews(cb: (reviews: Review[]) => void) {
  if (!db) return () => {};
  const q = query(collection(db, "reviews"), where("approved", "==", true));
  return onSnapshot(q, (snap) => {
    const reviews = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: (data.name as string) ?? "",
        rating: (data.rating as number) ?? 5,
        text: (data.text as string) ?? "",
        approved: (data.approved as boolean) ?? false,
        createdAt: (data.createdAt as Timestamp) ?? null,
      };
    });
    cb(reviews.sort(byCreatedAtDesc));
  });
}

/** Admin moderation feed — every review, pending and approved. */
export function subscribeAllReviews(cb: (reviews: Review[]) => void) {
  if (!db) return () => {};
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: (data.name as string) ?? "",
          rating: (data.rating as number) ?? 5,
          text: (data.text as string) ?? "",
          approved: (data.approved as boolean) ?? false,
          createdAt: (data.createdAt as Timestamp) ?? null,
        };
      })
    );
  });
}

export async function approveReview(id: string): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.");
  await updateDoc(doc(db, "reviews", id), { approved: true });
}

export async function deleteReview(id: string): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "reviews", id));
}
