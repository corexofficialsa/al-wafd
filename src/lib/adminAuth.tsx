import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
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
    return onAuthStateChanged(auth, (u) => {
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
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
    } catch {
      throw new Error("Invalid username or password.");
    }
  }

  async function logout() {
    if (!auth) return;
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
