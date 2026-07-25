import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth, firebaseReady } from "../../lib/adminAuth";

export default function AdminLogin() {
  const { user, loading, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Admin Login — Al Wafd";
  }, []);

  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-10">
          <img src="/logo-2.png" alt="Al Wafd" className="h-14 w-14 object-contain mx-auto mb-4" />
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-2">Al Wafd</p>
          <h1 className="text-2xl font-serif font-medium text-maroon">Admin Sign In</h1>
        </div>

        {!firebaseReady && (
          <p className="mb-6 text-xs text-maroon-dark bg-gold/20 border border-gold/40 px-4 py-3 leading-relaxed">
            Firebase isn't configured yet — add your Firebase project keys to
            <code className="mx-1">.env.local</code> and restart the dev server.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              required
              className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-3 text-lg font-normal transition-colors"
              placeholder="AL-WAFD_ADMIN"
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-3 text-lg font-normal transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting || !firebaseReady}
            className="w-full px-8 py-4 bg-maroon text-cream text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
