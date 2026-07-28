import { useEffect, useState } from "react";
import { SOURCE_LABEL } from "../../../lib/analytics";
import { subscribeOrders, saveReceipt, type Order } from "../../../lib/orders";
import { generateReceiptPdf, downloadBlob } from "../../../lib/quotationPdf";

function formatDate(ts: Order["createdAt"]): string {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function receiptNumber(orderId: string): string {
  return `RCT-${orderId.slice(-6).toUpperCase()}`;
}

export default function ReceiptTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  useEffect(() => subscribeOrders(setOrders), []);

  const quotedOrders = orders.filter((o) => o.quotation !== null);

  async function handleGenerate(order: Order) {
    if (!order.quotation) return;
    setGeneratingId(order.id);
    try {
      const number = receiptNumber(order.id);
      const blob = await generateReceiptPdf({
        documentNumber: number,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        customerName: order.customerName,
        sourceLabel: SOURCE_LABEL[order.source] ?? order.source,
        quantity: order.quantity,
        items: order.quotation.items,
      });
      downloadBlob(blob, `${number}-${order.customerName.replace(/\s+/g, "-")}.pdf`);
      await saveReceipt(order.id, number);
    } finally {
      setGeneratingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif font-medium text-maroon">Receipts</h2>
        <p className="text-sm text-ink/50">{quotedOrders.length} quoted</p>
      </div>

      <div className="space-y-4">
        {quotedOrders.length === 0 && (
          <p className="border border-maroon/15 bg-white/50 px-5 py-6 text-sm text-ink/40">
            No quoted orders yet. Generate a quotation in the Orders tab first.
          </p>
        )}
        {quotedOrders.map((order) => (
          <div key={order.id} className="border border-maroon/15 bg-white/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <p className="text-maroon font-medium">{order.customerName}</p>
                <span className="text-[11px] tracking-widest-lg uppercase text-gold-dark">
                  {SOURCE_LABEL[order.source] ?? order.source}
                </span>
                {order.quantity > 1 && <span className="text-xs text-ink/40">{order.quantity} pax</span>}
                {order.receipt && (
                  <span className="text-[10px] tracking-widest-lg uppercase bg-maroon/15 text-maroon px-2 py-0.5">
                    Receipted
                  </span>
                )}
              </div>
              <p className="text-xs text-ink/40 mb-2">{formatDate(order.createdAt)}</p>
              <p className="text-sm text-gold-dark font-medium">
                Quoted total: {order.quotation?.total.toLocaleString("en-US")} SAR
              </p>
              {order.receipt && (
                <p className="text-xs text-ink/40 mt-1">
                  {receiptNumber(order.id)} · generated {formatDate(order.receipt.generatedAt)}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleGenerate(order)}
              disabled={generatingId === order.id}
              className="shrink-0 px-6 py-3 bg-maroon text-cream text-xs tracking-widest-lg uppercase hover:bg-maroon-light transition-colors disabled:opacity-40"
            >
              {generatingId === order.id
                ? "Generating…"
                : order.receipt
                ? "Regenerate Receipt"
                : "Generate Receipt"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
