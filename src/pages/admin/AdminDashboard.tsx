import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../lib/adminAuth";
import HomeTab from "./tabs/HomeTab";
import FinanceTab from "./tabs/FinanceTab";
import CustomersTab from "./tabs/CustomersTab";
import OrdersTab from "./tabs/OrdersTab";
import ReceiptTab from "./tabs/ReceiptTab";
import ReviewsTab from "./tabs/ReviewsTab";

type Tab = "home" | "finance" | "customers" | "orders" | "receipt" | "reviews";

const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "finance", label: "Finance" },
  { id: "customers", label: "Customers" },
  { id: "orders", label: "Orders" },
  { id: "receipt", label: "Receipt" },
  { id: "reviews", label: "Reviews" },
];

export default function AdminDashboard() {
  const { user, loading, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("home");

  useEffect(() => {
    document.title = "Admin Dashboard — Al Wafd";
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-cream" />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-maroon/10 bg-white/60">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-2.png" alt="Al Wafd" className="h-9 w-9 object-contain" />
            <span className="font-serif font-medium text-xl text-maroon">Al Wafd Admin</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs tracking-widest-lg uppercase text-maroon/60 hover:text-maroon transition-colors"
          >
            Log Out
          </button>
        </div>

        <nav className="max-w-6xl mx-auto px-6 flex gap-8 border-t border-maroon/5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`py-4 text-sm font-medium tracking-wide border-b-2 transition-colors ${
                tab === t.id ? "border-gold text-maroon" : "border-transparent text-ink/50 hover:text-maroon"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {tab === "home" && <HomeTab />}
        {tab === "finance" && <FinanceTab />}
        {tab === "customers" && <CustomersTab />}
        {tab === "orders" && <OrdersTab />}
        {tab === "receipt" && <ReceiptTab />}
        {tab === "reviews" && <ReviewsTab />}
      </main>
    </div>
  );
}
