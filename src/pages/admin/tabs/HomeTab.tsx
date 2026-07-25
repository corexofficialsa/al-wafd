import { useEffect, useState } from "react";
import { subscribeExpenses, subscribeIncome, sumEntries, splitProfit } from "../../../lib/finance";
import { subscribeStats, subscribeCustomers, type SiteStats } from "../../../lib/analytics";

function formatSar(n: number): string {
  return `${n.toLocaleString("en-US", { maximumFractionDigits: 0 })} SAR`;
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`p-6 border ${accent ? "border-gold bg-maroon text-cream" : "border-maroon/15 bg-white/50"}`}>
      <p className={`text-[11px] tracking-widest-lg uppercase mb-2 ${accent ? "text-gold" : "text-gold-dark"}`}>
        {label}
      </p>
      <p className={`text-3xl font-serif font-semibold ${accent ? "text-cream" : "text-maroon"}`}>{value}</p>
    </div>
  );
}

export default function HomeTab() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [stats, setStats] = useState<SiteStats>({ websiteVisits: 0, enquireClicks: 0 });
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const unsubIncome = subscribeIncome((entries) => setIncome(sumEntries(entries)));
    const unsubExpense = subscribeExpenses((entries) => setExpense(sumEntries(entries)));
    const unsubStats = subscribeStats(setStats);
    const unsubCustomers = subscribeCustomers((customers) => setCustomerCount(customers.length));
    return () => {
      unsubIncome();
      unsubExpense();
      unsubStats();
      unsubCustomers();
    };
  }, []);

  const { profit, charity, corex, parents } = splitProfit(income, expense);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-serif font-medium text-maroon mb-4">Overview</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Income" value={formatSar(income)} />
          <StatCard label="Total Expense" value={formatSar(expense)} />
          <StatCard label="Total Profit" value={formatSar(profit)} accent />
          <StatCard label="Customers Saved" value={String(customerCount)} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-serif font-medium text-maroon mb-4">Website Activity</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <StatCard label="Website Visits" value={String(stats.websiteVisits)} />
          <StatCard label="Enquire Button Clicks" value={String(stats.enquireClicks)} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-serif font-medium text-maroon mb-4">Profit Split (from current profit)</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard label="Charity — 25%" value={formatSar(charity)} />
          <StatCard label="Corex (Muhammed) — 5%" value={formatSar(corex)} />
          <StatCard label="Parents — 25%" value={formatSar(parents)} />
        </div>
      </div>
    </div>
  );
}
