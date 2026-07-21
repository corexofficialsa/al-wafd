import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./lib/i18n";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import PackageBuilder from "./pages/PackageBuilder";
import Contact from "./pages/Contact";

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // Reset scroll only once the old page's exit animation has fully
    // finished — resetting on route change alone fires while the outgoing
    // page is still mounted, and the browser's scroll anchoring silently
    // re-scrolls away from top as that page's DOM is removed underneath it.
    <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/build" element={<PackageBuilder />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}
