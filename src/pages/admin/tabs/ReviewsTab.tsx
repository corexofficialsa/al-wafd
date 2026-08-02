import { useEffect, useState } from "react";
import StarRating from "../../../components/StarRating";
import { subscribeAllReviews, approveReview, deleteReview, type Review } from "../../../lib/reviews";

function formatDate(ts: Review["createdAt"]): string {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => subscribeAllReviews(setReviews), []);

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  async function handleApprove(id: string) {
    setBusyId(id);
    try {
      await approveReview(id);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete ${name}'s review? This can't be undone.`)) return;
    setBusyId(id);
    try {
      await deleteReview(id);
    } finally {
      setBusyId(null);
    }
  }

  function ReviewRow({ r }: { r: Review }) {
    return (
      <div className="border border-maroon/15 bg-white/50 p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <p className="text-maroon font-medium">{r.name}</p>
            <StarRating value={r.rating} size={14} />
            {!r.approved && (
              <span className="text-[10px] tracking-widest-lg uppercase bg-gold/20 text-gold-dark px-2 py-0.5">
                Pending
              </span>
            )}
          </div>
          <p className="text-xs text-ink/40 mb-2">{formatDate(r.createdAt)}</p>
          <p className="text-sm text-ink/70 leading-relaxed">"{r.text}"</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {!r.approved && (
            <button
              type="button"
              onClick={() => handleApprove(r.id)}
              disabled={busyId === r.id}
              className="px-5 py-2.5 bg-maroon text-cream text-xs tracking-widest-lg uppercase hover:bg-maroon-light transition-colors disabled:opacity-40"
            >
              Approve
            </button>
          )}
          <button
            type="button"
            onClick={() => handleDelete(r.id, r.name)}
            disabled={busyId === r.id}
            className="px-5 py-2.5 border border-maroon/30 text-maroon/70 text-xs tracking-widest-lg uppercase hover:border-red-700 hover:text-red-700 transition-colors disabled:opacity-40"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif font-medium text-maroon">Reviews</h2>
        <p className="text-sm text-ink/50">{reviews.length} total</p>
      </div>

      <h3 className="text-xs tracking-widest-lg uppercase text-gold-dark mb-3">Pending ({pending.length})</h3>
      <div className="space-y-4 mb-10">
        {pending.length === 0 && (
          <p className="border border-maroon/15 bg-white/50 px-5 py-6 text-sm text-ink/40">No reviews awaiting approval.</p>
        )}
        {pending.map((r) => (
          <ReviewRow key={r.id} r={r} />
        ))}
      </div>

      <h3 className="text-xs tracking-widest-lg uppercase text-gold-dark mb-3">Approved ({approved.length})</h3>
      <div className="space-y-4">
        {approved.length === 0 && (
          <p className="border border-maroon/15 bg-white/50 px-5 py-6 text-sm text-ink/40">No approved reviews yet.</p>
        )}
        {approved.map((r) => (
          <ReviewRow key={r.id} r={r} />
        ))}
      </div>
    </div>
  );
}
