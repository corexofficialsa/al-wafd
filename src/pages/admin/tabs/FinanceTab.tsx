import { useEffect, useState } from "react";
import {
  addExpense,
  addIncome,
  subscribeExpenses,
  subscribeIncome,
  sumEntries,
  splitProfit,
  type FinanceEntry,
} from "../../../lib/finance";

function formatSar(n: number): string {
  return `${n.toLocaleString("en-US", { maximumFractionDigits: 0 })} SAR`;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function EntryForm({
  title,
  onSubmit,
}: {
  title: string;
  onSubmit: (amount: number, note: string, date: string) => Promise<void>;
}) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(todayIso());
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return;
    setSubmitting(true);
    try {
      await onSubmit(parsed, note.trim(), date);
      setAmount("");
      setNote("");
      setDate(todayIso());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 border border-maroon/15 bg-white/50 space-y-4">
      <h3 className="text-sm font-medium tracking-wide text-maroon">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] tracking-widest-lg uppercase text-maroon/50 mb-1.5">Amount (SAR)</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min="0"
            step="0.01"
            required
            className="w-full bg-transparent border border-maroon/20 focus:border-gold px-3 py-2 text-sm outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] tracking-widest-lg uppercase text-maroon/50 mb-1.5">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            required
            className="w-full bg-transparent border border-maroon/20 focus:border-gold px-3 py-2 text-sm outline-none transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-[11px] tracking-widest-lg uppercase text-maroon/50 mb-1.5">Note</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          type="text"
          placeholder="What was this for?"
          className="w-full bg-transparent border border-maroon/20 focus:border-gold px-3 py-2 text-sm outline-none transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2.5 bg-maroon text-cream text-xs tracking-widest-lg uppercase hover:bg-maroon-light transition-colors disabled:opacity-40"
      >
        {submitting ? "Adding…" : title}
      </button>
    </form>
  );
}

function EntryList({ title, entries }: { title: string; entries: FinanceEntry[] }) {
  return (
    <div className="border border-maroon/15 bg-white/50">
      <h3 className="text-sm font-medium tracking-wide text-maroon px-6 py-4 border-b border-maroon/10">{title}</h3>
      <div className="max-h-72 overflow-y-auto divide-y divide-maroon/5">
        {entries.length === 0 && <p className="px-6 py-4 text-sm text-ink/40">No entries yet.</p>}
        {entries.map((e) => (
          <div key={e.id} className="px-6 py-3 flex items-center justify-between gap-4 text-sm">
            <div className="min-w-0">
              <p className="text-ink/80 truncate">{e.note || "—"}</p>
              <p className="text-ink/40 text-xs">{e.date}</p>
            </div>
            <p className="text-maroon font-medium shrink-0">{formatSar(e.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinanceTab() {
  const [incomeEntries, setIncomeEntries] = useState<FinanceEntry[]>([]);
  const [expenseEntries, setExpenseEntries] = useState<FinanceEntry[]>([]);

  useEffect(() => {
    const unsubIncome = subscribeIncome(setIncomeEntries);
    const unsubExpense = subscribeExpenses(setExpenseEntries);
    return () => {
      unsubIncome();
      unsubExpense();
    };
  }, []);

  const income = sumEntries(incomeEntries);
  const expense = sumEntries(expenseEntries);
  const { profit, charity, corex, parents, remaining } = splitProfit(income, expense);

  return (
    <div className="space-y-10">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-6 border border-maroon/15 bg-white/50">
          <p className="text-[11px] tracking-widest-lg uppercase text-gold-dark mb-2">Total Income</p>
          <p className="text-3xl font-serif font-semibold text-maroon">{formatSar(income)}</p>
        </div>
        <div className="p-6 border border-maroon/15 bg-white/50">
          <p className="text-[11px] tracking-widest-lg uppercase text-gold-dark mb-2">Total Expense</p>
          <p className="text-3xl font-serif font-semibold text-maroon">{formatSar(expense)}</p>
        </div>
        <div className="p-6 border border-gold bg-maroon text-cream">
          <p className="text-[11px] tracking-widest-lg uppercase text-gold mb-2">Profit</p>
          <p className="text-3xl font-serif font-semibold">{formatSar(profit)}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-serif font-medium text-maroon mb-4">Where the Profit Goes</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="p-6 border border-maroon/15 bg-white/50">
            <p className="text-[11px] tracking-widest-lg uppercase text-gold-dark mb-2">Charity · 25%</p>
            <p className="text-2xl font-serif font-semibold text-maroon">{formatSar(charity)}</p>
          </div>
          <div className="p-6 border border-maroon/15 bg-white/50">
            <p className="text-[11px] tracking-widest-lg uppercase text-gold-dark mb-2">Corex (Muhammed) · 5%</p>
            <p className="text-2xl font-serif font-semibold text-maroon">{formatSar(corex)}</p>
          </div>
          <div className="p-6 border border-maroon/15 bg-white/50">
            <p className="text-[11px] tracking-widest-lg uppercase text-gold-dark mb-2">Parents · 25%</p>
            <p className="text-2xl font-serif font-semibold text-maroon">{formatSar(parents)}</p>
          </div>
          <div className="p-6 border border-maroon/15 bg-white/50">
            <p className="text-[11px] tracking-widest-lg uppercase text-ink/40 mb-2">Remaining · 45%</p>
            <p className="text-2xl font-serif font-semibold text-ink/70">{formatSar(remaining)}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <EntryForm title="Add Income" onSubmit={addIncome} />
        <EntryForm title="Add Expense" onSubmit={addExpense} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <EntryList title="Income History" entries={incomeEntries} />
        <EntryList title="Expense History" entries={expenseEntries} />
      </div>
    </div>
  );
}
