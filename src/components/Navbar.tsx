import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/packages", label: "Packages" },
  { to: "/build", label: "Build a Package" },
  { to: "/contact", label: "Contact" },
];

// Routes that open on a full-bleed dark hero, so the transparent navbar
// needs light text until the user scrolls past it onto the cream page body.
const DARK_HERO_ROUTES = new Set(["/", "/about"]);

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onDarkHero = !scrolled && DARK_HERO_ROUTES.has(pathname);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(138,0,77,0.12)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={onDarkHero ? "/logo.png" : "/logo-2.png"}
            alt="Al Wafd"
            className="h-14 w-14 md:h-16 md:w-16 object-contain"
          />
          <span
            className={`font-serif font-medium text-2xl tracking-wide flex items-baseline gap-2 transition-colors duration-500 ${
              onDarkHero ? "text-cream" : "text-maroon"
            }`}
          >
            Al Wafd
            <span
              className={`hidden sm:inline text-[10px] font-sans font-normal tracking-widest-lg uppercase transition-colors duration-500 ${
                onDarkHero ? "text-gold" : "text-gold-dark"
              }`}
            >
              The Delegation
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[15px] font-medium tracking-wide font-sans transition-colors duration-500 ${
                  isActive
                    ? onDarkHero
                      ? "text-gold"
                      : "text-maroon"
                    : onDarkHero
                      ? "text-cream/80 hover:text-gold"
                      : "text-ink/75 hover:text-maroon"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-end justify-center"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`h-px transition-all duration-300 ${onDarkHero ? "bg-cream" : "bg-maroon"} ${open ? "w-6 rotate-45 translate-y-[3px]" : "w-6"}`}
          />
          <span
            className={`h-px transition-all duration-300 ${onDarkHero ? "bg-cream" : "bg-maroon"} ${open ? "w-6 -rotate-45 -translate-y-[3px]" : "w-4"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-cream/95 backdrop-blur-md border-t border-gold/20"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium tracking-wide font-sans py-1 ${
                      isActive ? "text-maroon" : "text-ink/75"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
