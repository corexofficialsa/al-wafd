import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-maroon text-cream/80 pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="rule-gold mb-12 opacity-60" />
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo.png" alt="Al Wafd" className="h-14 w-14 object-contain" />
              <span className="font-serif text-2xl text-gold">Al Wafd</span>
            </div>
            <p className="text-sm font-light leading-relaxed text-cream/60 max-w-xs">
              We plan Umrah trips with care, from your visa to your
              guided visits to the holy sites.
            </p>
          </div>

          <div className="text-sm">
            <div className="uppercase tracking-widest-lg text-[11px] text-gold/80 mb-4">Navigate</div>
            <ul className="space-y-2 font-light">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/packages" className="hover:text-gold transition-colors">Packages</Link></li>
              <li><Link to="/build" className="hover:text-gold transition-colors">Build a Package</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="uppercase tracking-widest-lg text-[11px] text-gold/80 mb-4">Direct Line</div>
            <ul className="space-y-2 font-light text-cream/70">
              <li>
                <a href="tel:+966548609600" className="hover:text-gold transition-colors">+966 54 860 9600</a>
              </li>
              <li>
                <a href="mailto:concierge@alwafd.travel" className="hover:text-gold transition-colors">
                  concierge@alwafd.travel
                </a>
              </li>
              <li className="text-cream/50">Jeddah &middot; Makkah &middot; Madeenah</li>
            </ul>
          </div>
        </div>

        <div className="rule-gold my-10 opacity-30" />
        <p className="text-[11px] tracking-wide text-cream/40 font-light">
          &copy; {new Date().getFullYear()} Al Wafd Travel &amp; Umrah Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
