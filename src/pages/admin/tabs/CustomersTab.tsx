import { useEffect, useState } from "react";
import { subscribeCustomers, type CustomerRecord, type EnquirySource } from "../../../lib/analytics";

const SOURCE_LABEL: Record<EnquirySource, string> = {
  economy: "Economy Package",
  comfort: "Comfort Package",
  "elite-5-star": "Elite 5-Star Package",
  "custom-builder": "Custom Builder",
  contact: "Contact Form",
};

function formatDate(ts: CustomerRecord["createdAt"]): string {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CustomersTab() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);

  useEffect(() => subscribeCustomers(setCustomers), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif font-medium text-maroon">Customers</h2>
        <p className="text-sm text-ink/50">{customers.length} total</p>
      </div>

      <div className="border border-maroon/15 bg-white/50 overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-maroon/10 text-left">
              <th className="px-5 py-3 text-[11px] tracking-widest-lg uppercase text-gold-dark font-medium">Name</th>
              <th className="px-5 py-3 text-[11px] tracking-widest-lg uppercase text-gold-dark font-medium">Phone</th>
              <th className="px-5 py-3 text-[11px] tracking-widest-lg uppercase text-gold-dark font-medium">Source</th>
              <th className="px-5 py-3 text-[11px] tracking-widest-lg uppercase text-gold-dark font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-maroon/5">
            {customers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-ink/40">
                  No customers saved yet.
                </td>
              </tr>
            )}
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="px-5 py-3 text-ink/85">{c.name}</td>
                <td className="px-5 py-3 text-ink/70">
                  <a href={`tel:${c.phone}`} className="hover:text-maroon transition-colors">
                    {c.phone}
                  </a>
                </td>
                <td className="px-5 py-3 text-ink/60">{SOURCE_LABEL[c.source] ?? c.source}</td>
                <td className="px-5 py-3 text-ink/50 whitespace-nowrap">{formatDate(c.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
