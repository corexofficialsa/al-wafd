import { useEffect, useState } from "react";
import { SOURCE_LABEL } from "../../../lib/analytics";
import { subscribeOrders, saveQuotation, type Order, type QuotationLineItem } from "../../../lib/orders";
import { generateQuotationPdf, downloadBlob } from "../../../lib/quotationPdf";

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

function quotationNumber(orderId: string): string {
  return `AW-${orderId.slice(-6).toUpperCase()}`;
}

function QuotationEditor({ order, onClose }: { order: Order; onClose: () => void }) {
  const [items, setItems] = useState<QuotationLineItem[]>(
    () =>
      order.quotation?.items ??
      order.details.map((d) => ({ label: d.label, price: 0 }))
  );
  const [generating, setGenerating] = useState(false);

  const total = items.reduce((sum, i) => sum + (Number.isFinite(i.price) ? i.price : 0), 0);

  function updatePrice(index: number, price: number) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, price } : it)));
  }

  function updateLabel(index: number, label: string) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, label } : it)));
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function addItem() {
    setItems((prev) => [...prev, { label: "", price: 0 }]);
  }

  async function handleGenerate() {
    setGenerating(true);
    try {
      const cleanItems = items.filter((i) => i.label.trim().length > 0);
      const blob = await generateQuotationPdf({
        documentNumber: quotationNumber(order.id),
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        customerName: order.customerName,
        sourceLabel: SOURCE_LABEL[order.source] ?? order.source,
        quantity: order.quantity,
        items: cleanItems,
      });
      downloadBlob(blob, `${quotationNumber(order.id)}-${order.customerName.replace(/\s+/g, "-")}.pdf`);
      await saveQuotation(order.id, cleanItems);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="border-t border-maroon/10 bg-cream-dim p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium tracking-wide text-maroon">
          Quotation {quotationNumber(order.id)}
        </h3>
        <button type="button" onClick={onClose} className="text-xs text-ink/40 hover:text-maroon transition-colors">
          Close
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              value={item.label}
              onChange={(e) => updateLabel(i, e.target.value)}
              placeholder="Service"
              className="flex-1 bg-white border border-maroon/20 focus:border-gold px-3 py-2 text-sm outline-none transition-colors"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.price || ""}
              onChange={(e) => updatePrice(i, Number(e.target.value))}
              placeholder="0"
              className="w-28 bg-white border border-maroon/20 focus:border-gold px-3 py-2 text-sm outline-none transition-colors"
            />
            <button
              type="button"
              aria-label={`Remove ${item.label || "line"}`}
              onClick={() => removeItem(i)}
              className="text-ink/30 hover:text-red-700 transition-colors text-lg leading-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="text-xs tracking-widest-lg uppercase text-maroon/60 hover:text-maroon transition-colors mb-6"
      >
        + Add Line
      </button>

      <div className="flex items-center justify-between border-t border-maroon/15 pt-4">
        <p className="text-sm font-medium text-maroon">
          Total: <span className="font-serif text-lg">{total.toLocaleString("en-US")} SAR</span>
        </p>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3 bg-maroon text-cream text-xs tracking-widest-lg uppercase hover:bg-maroon-light transition-colors disabled:opacity-40"
        >
          {generating ? "Generating…" : "Generate PDF"}
        </button>
      </div>
    </div>
  );
}

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  useEffect(() => subscribeOrders(setOrders), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif font-medium text-maroon">Orders</h2>
        <p className="text-sm text-ink/50">{orders.length} total</p>
      </div>

      <div className="space-y-4">
        {orders.length === 0 && (
          <p className="border border-maroon/15 bg-white/50 px-5 py-6 text-sm text-ink/40">No orders yet.</p>
        )}
        {orders.map((order) => (
          <div key={order.id} className="border border-maroon/15 bg-white/50">
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-maroon font-medium">{order.customerName}</p>
                  <span className="text-[11px] tracking-widest-lg uppercase text-gold-dark">
                    {SOURCE_LABEL[order.source] ?? order.source}
                  </span>
                  {order.quantity > 1 && <span className="text-xs text-ink/40">{order.quantity} pax</span>}
                  {order.quotation && (
                    <span className="text-[10px] tracking-widest-lg uppercase bg-gold/20 text-gold-dark px-2 py-0.5">
                      Quoted
                    </span>
                  )}
                  {order.receipt && (
                    <span className="text-[10px] tracking-widest-lg uppercase bg-maroon/15 text-maroon px-2 py-0.5">
                      Receipted
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink/40 mb-2">{formatDate(order.createdAt)}</p>
                <ul className="text-sm text-ink/70 space-y-0.5">
                  {order.details.length === 0 && <li className="text-ink/30">No details recorded.</li>}
                  {order.details.map((d, i) => (
                    <li key={i}>• {d.label}</li>
                  ))}
                </ul>
                {order.quotation && (
                  <p className="text-sm text-gold-dark font-medium mt-2">
                    Quoted total: {order.quotation.total.toLocaleString("en-US")} SAR
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveOrderId(activeOrderId === order.id ? null : order.id)}
                className="shrink-0 px-6 py-3 border border-maroon text-maroon text-xs tracking-widest-lg uppercase hover:bg-maroon hover:text-cream transition-colors"
              >
                {activeOrderId === order.id ? "Cancel" : order.quotation ? "Edit Quotation" : "Generate Quotation"}
              </button>
            </div>
            {activeOrderId === order.id && (
              <QuotationEditor order={order} onClose={() => setActiveOrderId(null)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
