import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Instagram,
  Youtube,
  Play,
  Calendar,
  ArrowRight,
  Navigation,
  Heart,
  Users,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import heroImg from "@/assets/hero-worship.jpg";
import communityImg from "@/assets/community-welcome.jpg";
import logoImg from "@/assets/logo.png";

/* ── Route meta (page-level overrides) ─────────────────────── */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MercyLife Church Dominion Temple — Arlington, TX" },
      {
        name: "description",
        content:
          "MercyLife Church Dominion Temple is a welcoming Christian church in Arlington, Texas. Join us for Friday worship at 7:30 PM and Sunday service at 10:00 AM. Plan your visit today!",
      },
      { property: "og:title", content: "MercyLife Church Dominion Temple — Arlington, TX" },
      {
        property: "og:description",
        content:
          "Experience powerful worship, practical teaching, and a vibrant community at MercyLife Church. Services every Friday at 7:30 PM & Sunday at 10 AM in Arlington, TX.",
      },
      { property: "og:image", content: heroImg },
      {
        property: "og:image:alt",
        content: "Worship service at MercyLife Church Dominion Temple in Arlington, Texas",
      },
      { name: "twitter:image", content: heroImg },
      {
        name: "twitter:image:alt",
        content: "Worship service at MercyLife Church Dominion Temple in Arlington, Texas",
      },
    ],
  }),
  component: Index,
});

/* ── Constants ─────────────────────────────────────────────── */

const ADDRESS = "3100 Pleasant Valley Ln, Arlington, TX 76015";
const MAPS_QUERY = encodeURIComponent("MercyLife Church " + ADDRESS);
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
const EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
const PHONE_DISPLAY = "(817) 677-1407";
const PHONE_HREF = "tel:+18176771407";
const INSTAGRAM_URL = "https://www.instagram.com/mercylife_dallas";
const YOUTUBE_URL = "https://www.youtube.com/@brianamoatengtv";

/* ── Page Component ────────────────────────────────────────── */

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <Hero />
        <Welcome />
        <WhatToExpect />
        <Services />
        <Location />
        <Contact />
        <Connect />
        <ComingSoon />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

/* ── Nav ───────────────────────────────────────────────────── */

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30" role="banner">
      <nav
        className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          id="nav-home"
          className="flex items-center gap-2 group"
          aria-label="MercyLife Church — Back to top"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <img
              src={logoImg}
              width={36}
              height={36}
              alt="MercyLife Church logo"
              decoding="async"
            />
          </div>
          <span className="font-serif text-xl text-primary-foreground tracking-wide">
            MercyLife Church
          </span>
        </a>
        <a
          href="#visit"
          id="nav-plan-visit"
          className="hidden sm:inline-flex items-center gap-2 text-sm text-primary-foreground/90 hover:text-gold transition-colors"
          aria-label="Plan your visit to MercyLife Church"
        >
          Plan Your Visit <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Welcome hero"
    >
      <img
        src={heroImg}
        alt="Congregation worshiping at MercyLife Church Dominion Temple in Arlington, Texas"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div className="absolute inset-0 bg-navy-deep/30" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-stretch mb-8 shadow-elegant border border-gold/40 rounded-sm overflow-hidden">
            <div className="bg-gradient-gold text-navy px-4 py-2.5 font-sans text-[11px] tracking-[0.25em] uppercase font-bold flex items-center">
              Arlington, TX
            </div>
            <div className="bg-navy-deep/70 backdrop-blur-sm px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase text-primary-foreground/90 flex items-center border-l border-gold/40">
              Fridays 7:30 PM &bull; Sundays 10:00 AM
            </div>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.05]">
            Welcome to <span className="text-gold italic">MercyLife Church</span>
            <span className="block text-xl sm:text-2xl md:text-3xl mt-2 font-normal text-gold/70">
              Dominion Temple
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-4 font-normal text-primary-foreground/80">
              Your Church Home in Arlington, Texas
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Experience powerful worship, life-changing teaching, and a warm community of believers
            at one of Arlington's most welcoming churches. Whether you're exploring faith or
            deepening your walk with God, you belong here.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#visit"
              id="hero-plan-visit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] transition-transform"
              aria-label="Plan your visit to MercyLife Church"
            >
              Plan Your Visit <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={YOUTUBE_URL}
              id="hero-watch-online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
              aria-label="Watch MercyLife Church sermons on YouTube"
            >
              <Play className="w-4 h-4" aria-hidden="true" /> Watch Online
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

/* ── Welcome ──────────────────────────────────────────────── */

function Welcome() {
  return (
    <section
      className="py-24 md:py-32 bg-background section-lazy"
      aria-label="About MercyLife Church"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="gold-rule mb-6" aria-hidden="true" />
          <h2 className="text-4xl md:text-5xl text-navy mb-6">
            A Welcoming Christian Church in Arlington, Texas
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            MercyLife Church Dominion Temple is a vibrant, faith-centered church located in the
            heart of Arlington, TX. We are passionate about helping people encounter God's presence,
            grow in faith, and build meaningful relationships that last a lifetime.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you're searching for churches in Arlington TX for the first time or looking for
            a new church family, you'll find a warm community ready to walk alongside you on your
            journey of faith.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { k: "Encounter", v: "God's Presence" },
              { k: "Grow", v: "In Faith" },
              { k: "Belong", v: "In Community" },
            ].map((i) => (
              <div key={i.k}>
                <div className="font-serif text-2xl text-gold">{i.k}</div>
                <div className="text-sm text-muted-foreground mt-1">{i.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-4 bg-gradient-gold rounded-2xl opacity-20 blur-2xl"
            aria-hidden="true"
          />
          <img
            src={communityImg}
            alt="MercyLife Church Dominion Temple community members greeting visitors at a Sunday worship service in Arlington, Texas"
            loading="lazy"
            decoding="async"
            width={1400}
            height={1600}
            className="relative rounded-2xl shadow-elegant w-full h-[520px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-navy text-primary-foreground p-6 rounded-xl shadow-elegant max-w-[220px] hidden md:block">
            <div className="text-gold font-serif text-3xl">100%</div>
            <div className="text-sm text-primary-foreground/80 mt-1">Welcomed. No exceptions.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── What to Expect ───────────────────────────────────────── */

function WhatToExpect() {
  const items = [
    {
      Icon: Heart,
      title: "Warm Welcome",
      desc: "From the moment you walk through our doors, our greeting team will make you feel right at home. Come as you are — there's no dress code.",
    },
    {
      Icon: BookOpen,
      title: "Engaging Teaching",
      desc: "Our messages are rooted in Scripture and delivered in a practical, relatable way that you can apply to your everyday life.",
    },
    {
      Icon: Users,
      title: "Vibrant Community",
      desc: "We're more than a Sunday gathering — we're a family. Connect with people who genuinely care about your growth and well-being.",
    },
  ];

  return (
    <section
      className="py-24 md:py-32 bg-secondary section-lazy"
      aria-label="What to expect at MercyLife Church"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="gold-rule mb-6" aria-hidden="true" />
          <h2 className="text-4xl md:text-5xl text-navy mb-4">
            What to Expect at Your First Visit
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Visiting a new church can feel unfamiliar, so we want you to know exactly what to expect
            when you join us for worship in Arlington, TX. No matter your background or where you
            are on your faith journey, you're welcome here.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="p-8 rounded-2xl bg-card border border-border hover:border-gold/40 hover:shadow-elegant transition-all text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-6">
                <Icon className="w-7 h-7 text-gold" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-navy mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services ─────────────────────────────────────────────── */

function Services() {
  const services = [
    {
      day: "Friday",
      name: "Friday Night Worship",
      time: "7:30 PM",
      desc: "An intimate Friday night church service of worship, prayer, and the Word — the perfect way to end your week in Arlington.",
    },
    {
      day: "Sunday",
      name: "Sunday Morning Service",
      time: "10:00 AM",
      desc: "Powerful Sunday worship in Arlington, TX with practical teaching, vibrant praise, and a welcoming community for the whole family.",
    },
  ];
  return (
    <section
      id="visit"
      className="py-24 md:py-32 bg-navy text-primary-foreground relative overflow-hidden section-lazy"
      aria-label="Worship service times"
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 80%, var(--gold) 0, transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="gold-rule mb-6" aria-hidden="true" />
          <h2 className="text-4xl md:text-5xl mb-4">
            Worship Services — Friday Night &amp; Sunday Morning
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto text-lg">
            Join us for a worship service in Arlington, TX. Experience God's presence through
            anointed praise, prayer, and teaching that transforms lives.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((s) => (
            <div
              key={s.name}
              className="group relative p-10 rounded-2xl bg-navy-deep/60 border border-primary-foreground/10 hover:border-gold/50 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                  <Clock className="w-6 h-6 text-navy" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-gold/80">{s.day}</span>
              </div>
              <h3 className="font-serif text-3xl mb-2">{s.name}</h3>
              <div className="font-serif text-5xl text-gold mb-4">{s.time}</div>
              <p className="text-primary-foreground/70">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={DIRECTIONS_URL}
            id="services-get-directions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] transition-transform"
            aria-label="Get directions to MercyLife Church Dominion Temple"
          >
            <Navigation className="w-4 h-4" aria-hidden="true" /> Get Directions
          </a>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-primary-foreground transition-colors"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" /> Add to your calendar — we'll save
            you a seat
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Location ─────────────────────────────────────────────── */

function Location() {
  return (
    <section
      className="py-24 md:py-32 bg-background section-lazy"
      aria-label="Church location and directions"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="gold-rule mb-6" aria-hidden="true" />
          <h2 className="text-4xl md:text-5xl text-navy">
            Visit MercyLife Church Dominion Temple in Arlington, TX
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 text-lg">
            Conveniently located on Pleasant Valley Lane, our church is easy to find and has ample
            parking for you and your family.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-2 p-10 rounded-2xl bg-navy text-primary-foreground shadow-elegant flex flex-col">
            <MapPin className="w-10 h-10 text-gold mb-6" aria-hidden="true" />
            <h3 className="font-serif text-3xl mb-4">MercyLife Church Dominion Temple</h3>
            <address className="not-italic text-primary-foreground/80 text-lg leading-relaxed mb-8">
              3100 Pleasant Valley Ln
              <br />
              Arlington, TX 76015
            </address>
            <div className="mt-auto space-y-3">
              <a
                href={DIRECTIONS_URL}
                id="location-get-directions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] transition-transform"
                aria-label="Get driving directions to MercyLife Church"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" /> Get Directions
              </a>
              <a
                href={PHONE_HREF}
                id="location-call"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-primary-foreground/20 hover:border-gold/50 transition-colors"
                aria-label={`Call MercyLife Church at ${PHONE_DISPLAY}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> Call the Church
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-elegant min-h-[420px] border border-border">
            <iframe
              title="MercyLife Church Dominion Temple location — 3100 Pleasant Valley Ln, Arlington TX 76015"
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────── */

function Contact() {
  return (
    <section
      className="py-24 md:py-32 bg-secondary section-lazy"
      aria-label="Contact MercyLife Church"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="gold-rule mb-6" aria-hidden="true" />
        <h2 className="text-4xl md:text-5xl text-navy mb-6">
          Connect With MercyLife Church Dominion Temple
        </h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Planning your first visit to our Christian church in Arlington, Texas? We'd love to hear
          from you. Whether you have questions about our worship services, need prayer, or simply
          want to learn more, our team is here to help. Call us anytime.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto">
          <a
            href={PHONE_HREF}
            id="contact-call"
            className="group flex-1 inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-navy text-primary-foreground shadow-elegant hover:shadow-gold transition-all"
            aria-label={`Call MercyLife Church at ${PHONE_DISPLAY}`}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-navy" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="text-xs tracking-[0.2em] uppercase text-gold">Call Us</div>
              <div className="font-serif text-2xl md:text-3xl">{PHONE_DISPLAY}</div>
            </div>
          </a>
          <a
            href={DIRECTIONS_URL}
            id="contact-directions"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-navy text-primary-foreground shadow-elegant hover:shadow-gold transition-all"
            aria-label="Get directions to MercyLife Church"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5 text-navy" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="text-xs tracking-[0.2em] uppercase text-gold">Visit Us</div>
              <div className="font-serif text-2xl md:text-3xl">Get Directions</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Connect (Social) ────────────────────────────────────── */

function Connect() {
  const socials = [
    {
      name: "Instagram",
      handle: "@mercylife_dallas",
      cta: "Follow Us on Instagram",
      url: INSTAGRAM_URL,
      Icon: Instagram,
      copy: "Daily encouragement, sermon clips, and glimpses of church life at MercyLife Church.",
    },
    {
      name: "YouTube",
      handle: "@brianamoatengtv",
      cta: "Watch Messages & Subscribe",
      url: YOUTUBE_URL,
      Icon: Youtube,
      copy: "Full messages, worship moments, and teachings on demand from our Arlington, TX services.",
    },
  ];
  return (
    <section className="py-24 md:py-32 bg-background section-lazy" aria-label="Social media links">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="gold-rule mb-6" aria-hidden="true" />
          <h2 className="text-4xl md:text-5xl text-navy mb-4">Stay Connected Online</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Follow us for sermons, updates, encouragement, and church life throughout the week.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socials.map(({ name, handle, cta, url, Icon, copy }) => (
            <a
              key={name}
              href={url}
              id={`social-${name.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-10 rounded-2xl bg-card border border-border hover:border-gold/50 hover:shadow-elegant transition-all"
              aria-label={`${cta} — ${handle}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center group-hover:bg-gradient-gold transition-colors">
                  <Icon
                    className="w-6 h-6 text-gold group-hover:text-primary-foreground transition-colors"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <ArrowRight
                  className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-serif text-2xl text-navy mb-1">{name}</h3>
              <div className="text-sm text-gold mb-4">{handle}</div>
              <p className="text-muted-foreground mb-6">{copy}</p>
              <span className="inline-flex items-center gap-2 text-navy font-medium border-b border-gold/40 pb-0.5">
                {cta}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Coming Soon ──────────────────────────────────────────── */

function ComingSoon() {
  return (
    <section
      className="py-24 md:py-32 bg-navy-deep text-primary-foreground relative overflow-hidden section-lazy"
      aria-label="Future website features"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, var(--gold) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <img
          src={logoImg}
          width={100}
          height={100}
          className="mx-auto block mb-6"
          alt="MercyLife Church logo"
          loading="lazy"
          decoding="async"
        />
        <h2 className="text-4xl md:text-5xl mb-6">
          More From MercyLife Church Dominion Temple —{" "}
          <span className="text-gold italic">Coming Soon</span>
        </h2>
        <p className="text-lg text-primary-foreground/75 leading-relaxed">
          We're building a richer online experience with pages dedicated to our ministries, upcoming
          events, sermon archives, online giving, and community resources — all designed to help you
          grow in your faith journey.
        </p>
        <p className="text-lg text-primary-foreground/75 mt-4">
          Until then, we'd love to connect with you in person at our Arlington, TX location or
          through our social channels.
        </p>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */

function Footer() {
  return (
    <footer
      className="bg-navy text-primary-foreground border-t border-primary-foreground/10"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
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
            <span className="font-serif text-xl">MercyLife Church</span>
          </div>
          <address className="not-italic text-primary-foreground/70 leading-relaxed mb-3">
            3100 Pleasant Valley Ln
            <br />
            Arlington, TX 76015
          </address>
          <a
            href={PHONE_HREF}
            className="text-primary-foreground/70 hover:text-gold transition-colors block"
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Service Times */}
        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">Service Times</div>
          <ul className="space-y-2 text-primary-foreground/80">
            <li>Friday — 7:30 PM</li>
            <li>Sunday — 10:00 AM</li>
          </ul>
        </div>

        {/* Links & Social */}
        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">Follow</div>
          <ul className="space-y-3">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors"
                aria-label="Follow MercyLife Church on Instagram"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" /> Instagram
              </a>
            </li>
            <li>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors"
                aria-label="Watch MercyLife Church on YouTube"
              >
                <Youtube className="w-4 h-4" aria-hidden="true" /> YouTube
              </a>
            </li>
          </ul>

          {/* Future pages (commented nav for future internal linking) */}
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4 mt-8">Coming Soon</div>
          <ul className="space-y-2 text-primary-foreground/50 text-sm">
            <li>About</li>
            <li>Ministries</li>
            <li>Events</li>
            <li>Sermons</li>
            <li>Giving</li>
          </ul>
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

/* ── Sticky Mobile CTA ────────────────────────────────────── */

function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero viewport
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy/95 backdrop-blur-md border-t border-gold/30 px-4 py-3 flex gap-3 animate-fade-up"
      role="complementary"
      aria-label="Quick actions"
    >
      <a
        href="#visit"
        id="sticky-plan-visit"
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-gold text-navy font-semibold text-sm shadow-gold"
        aria-label="Plan your visit to MercyLife Church"
      >
        Plan Your Visit
      </a>
      <a
        href={PHONE_HREF}
        id="sticky-call"
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground text-sm font-medium"
        aria-label={`Call MercyLife Church at ${PHONE_DISPLAY}`}
      >
        <Phone className="w-4 h-4" aria-hidden="true" /> Call Now
      </a>
    </div>
  );
}
