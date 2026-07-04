import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logoImg from "../assets/logo.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Sermons", to: "/sermons" },
    { name: "Events", to: "/events" },
    { name: "Gallery", to: "/gallery" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-panel-dark border-b border-gold/20 py-3 shadow-elegant"
          : "bg-transparent py-6"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer"
          aria-label="MercyLife Church — Go to Home"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
            <img
              src={logoImg}
              width={38}
              height={38}
              alt="MercyLife Church logo"
              className="object-contain"
              decoding="async"
            />
          </div>
          <span className="font-serif text-xl text-primary-foreground tracking-wide group-hover:text-gold transition-colors">
            MercyLife Church
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold py-1 ${
                    currentPath === link.to
                      ? "text-gold border-b-2 border-gold"
                      : "text-primary-foreground/90"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/"
            hash="visit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-navy font-semibold text-sm shadow-gold hover:scale-[1.02] transition-all"
            aria-label="Plan your visit to MercyLife Church"
          >
            Plan Your Visit <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-primary-foreground hover:text-gold transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 animate-fade-in" />
          ) : (
            <Menu className="w-6 h-6 animate-fade-in" />
          )}
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-navy/98 backdrop-blur-lg z-40 animate-fade-in flex flex-col justify-between py-12 px-8 border-t border-gold/10">
          <ul className="space-y-8 text-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className={`text-2xl font-serif tracking-wide block py-2 transition-colors ${
                    currentPath === link.to ? "text-gold" : "text-primary-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/"
                hash="visit"
                className="inline-flex items-center gap-2 mt-4 px-8 py-3.5 rounded-full bg-gradient-gold text-navy font-semibold text-lg shadow-gold"
                aria-label="Plan your visit to MercyLife Church"
              >
                Plan Your Visit <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
          <div className="text-center text-primary-foreground/50 text-xs font-serif italic">
            Encounter God. Experience Mercy. Live Purposefully.
          </div>
        </div>
      )}
    </header>
  );
}
