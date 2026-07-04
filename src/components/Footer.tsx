import { Link } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";
import logoImg from "../assets/logo.png";

const PHONE_DISPLAY = "(817) 677-1407";
const PHONE_HREF = "tel:+18176771407";
const INSTAGRAM_URL = "https://www.instagram.com/mercylife_dallas";
const YOUTUBE_URL = "https://www.youtube.com/@brianamoatengtv";

export default function Footer() {
  return (
    <footer
      className="bg-navy text-primary-foreground border-t border-primary-foreground/10 relative z-10"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Contact */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer w-fit">
            <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center">
              <img
                src={logoImg}
                width={36}
                height={36}
                alt="MercyLife Church logo"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="font-serif text-xl group-hover:text-gold transition-colors">
              MercyLife Church
            </span>
          </Link>
          <address className="not-italic text-primary-foreground/70 leading-relaxed">
            3100 Pleasant Valley Ln
            <br />
            Arlington, TX 76015
          </address>
          <a
            href={PHONE_HREF}
            className="text-primary-foreground/70 hover:text-gold transition-colors block w-fit"
            aria-label={`Call MercyLife Church at ${PHONE_DISPLAY}`}
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Navigation & Service Times */}
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4 font-semibold">Quick Links</div>
            <ul className="space-y-2.5 font-sans">
              <li>
                <Link
                  to="/"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/sermons"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  hash="visit"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Plan Your Visit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">Service Times</div>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>Friday Worship: <span className="text-gold">7:30 PM</span></li>
              <li>Sunday Service: <span className="text-gold">10:00 AM</span></li>
            </ul>

            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4 mt-6">Follow</div>
            <ul className="flex items-center gap-4">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-navy-deep border border-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:text-gold hover:border-gold/50 transition-all"
                  aria-label="Instagram Page"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-navy-deep border border-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:text-gold hover:border-gold/50 transition-all"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif italic text-gold text-lg">
            Encounter God. Experience Mercy. Live Purposefully.
          </p>
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} MercyLife Church Dominion Temple. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
