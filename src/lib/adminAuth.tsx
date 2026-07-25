import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth, firebaseReady } from "./firebase";

// Firebase Auth needs an email/password pair, not a bare username, so the
// admin's chosen username is mapped to a fixed internal email here. The
// actual account (this email + the admin's password) is created once by
// hand in the Firebase Console — see the setup instructions.
export const ADMIN_USERNAME = "AL-WAFD_ADMIN";
const ADMIN_EMAIL = "al-wafd-admin@al-wafd-admin.internal";

// Firebase keeps a device signed in indefinitely by default (browserLocalPersistence,
// set explicitly below). This caps that at 30 days: the login time is stamped in
// localStorage on sign-in, and any session older than that is force-signed-out on load.
const SESSION_KEY = "wafd-admin-login-at";
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

interface AdminAuthValue {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    return onAuthStateChanged(auth, async (u) => {
      if (!u) {
        window.localStorage.removeItem(SESSION_KEY);
        setUser(null);
        setLoading(false);
        return;
      }

      const loginAt = Number(window.localStorage.getItem(SESSION_KEY));
      if (!loginAt) {
        // First time we've seen this session (e.g. a pre-existing login from
        // before this expiry feature shipped) — start its 30-day clock now.
        window.localStorage.setItem(SESSION_KEY, String(Date.now()));
      } else if (Date.now() - loginAt > SESSION_MAX_AGE_MS) {
        window.localStorage.removeItem(SESSION_KEY);
        await signOut(auth!);
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(u);
      setLoading(false);
    });
  }, []);

  async function login(username: string, password: string) {
    if (!auth) throw new Error("Firebase is not configured yet.");
    if (username.trim().toLowerCase() !== ADMIN_USERNAME.toLowerCase()) {
      throw new Error("Invalid username or password.");
    }
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
      window.localStorage.setItem(SESSION_KEY, String(Date.now()));
    } catch {
      throw new Error("Invalid username or password.");
    }
  }

  async function logout() {
    if (!auth) return;
    window.localStorage.removeItem(SESSION_KEY);
    await signOut(auth);
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return ctx;
}

export { firebaseReady };
