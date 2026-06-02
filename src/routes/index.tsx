import { createFileRoute } from "@tanstack/react-router";
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
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-worship.jpg";
import communityImg from "@/assets/community-welcome.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mercy Life Church — Encounter God. Experience Mercy." },
      {
        name: "description",
        content:
          "Mercy Life Church in Arlington, TX. Join us Fridays at 7:30 PM and Sundays at 10:00 AM. A welcoming community of faith — our full website is launching soon.",
      },
      { property: "og:title", content: "Mercy Life Church — Arlington, TX" },
      {
        property: "og:description",
        content:
          "Plan your visit to Mercy Life Church. Powerful worship, practical teaching, and a vibrant community.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

const ADDRESS = "3100 Pleasant Valley Ln, Arlington, TX 76015";
const MAPS_QUERY = encodeURIComponent("Mercy Life Church " + ADDRESS);
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
const EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Welcome />
      <Services />
      <Location />
      <Contact />
      <Connect />
      <ComingSoon />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Sparkles className="w-4 h-4 text-navy" strokeWidth={2.5} />
          </div>
          <span className="font-serif text-xl text-primary-foreground tracking-wide">
            Mercy Life
          </span>
        </a>
        <a
          href="#visit"
          className="hidden sm:inline-flex items-center gap-2 text-sm text-primary-foreground/90 hover:text-gold transition-colors"
        >
          Plan Your Visit <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Worship at Mercy Life Church"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-navy-deep/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-stretch mb-8 shadow-elegant border border-gold/40 rounded-sm overflow-hidden">
            <div className="bg-gradient-gold text-navy px-4 py-2.5 font-sans text-[11px] tracking-[0.25em] uppercase font-bold flex items-center">
              Announcement
            </div>
            <div className="bg-navy-deep/70 backdrop-blur-sm px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase text-primary-foreground/90 flex items-center border-l border-gold/40">
              New Website Launching Soon
            </div>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.05]">
            Welcome to <br />
            <span className="text-gold italic">Mercy Life Church</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Something exciting is on the way. While we put the finishing touches on our new
            online home, we'd love to welcome you to one of our services and help you
            become part of our growing family.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#visit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] transition-transform"
            >
              Plan Your Visit <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@brianamoatengtv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
            >
              <Play className="w-4 h-4" /> Watch Online
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50 text-xs tracking-widest uppercase">
        Scroll
      </div>
    </section>
  );
}

function Welcome() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="gold-rule mb-6" />
          <h2 className="text-4xl md:text-5xl text-navy mb-6">You Belong Here</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Mercy Life Church, we are passionate about helping people encounter God's
            presence, grow in faith, and build meaningful relationships. Whether you're
            visiting for the first time or looking for a church family, you'll find a
            welcoming community ready to walk alongside you.
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
          <div className="absolute -inset-4 bg-gradient-gold rounded-2xl opacity-20 blur-2xl" />
          <img
            src={communityImg}
            alt="Mercy Life Church community"
            loading="lazy"
            width={1400}
            height={1600}
            className="relative rounded-2xl shadow-elegant w-full h-[520px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-navy text-primary-foreground p-6 rounded-xl shadow-elegant max-w-[220px] hidden md:block">
            <div className="text-gold font-serif text-3xl">100%</div>
            <div className="text-sm text-primary-foreground/80 mt-1">
              Welcomed. No exceptions.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      day: "Friday",
      name: "Friday Service",
      time: "7:30 PM",
      desc: "An intimate evening of worship, prayer, and the Word.",
    },
    {
      day: "Sunday",
      name: "Worship Experience",
      time: "10:00 AM",
      desc: "Powerful worship, practical teaching, and community.",
    },
  ];
  return (
    <section id="visit" className="py-24 md:py-32 bg-navy text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 80%, var(--gold) 0, transparent 40%)"
      }} />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="gold-rule mb-6" />
          <h2 className="text-4xl md:text-5xl mb-4">Join Us This Week</h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Come experience powerful worship, practical teaching, and a vibrant community of believers.
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
                  <Clock className="w-6 h-6 text-navy" strokeWidth={2.5} />
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-gold/80">
                  {s.day}
                </span>
              </div>
              <h3 className="font-serif text-3xl mb-2">{s.name}</h3>
              <div className="font-serif text-5xl text-gold mb-4">{s.time}</div>
              <p className="text-primary-foreground/70">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-primary-foreground transition-colors"
          >
            <Calendar className="w-4 h-4" /> Add to your calendar — we'll save you a seat
          </a>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="gold-rule mb-6" />
          <h2 className="text-4xl md:text-5xl text-navy">Visit Us</h2>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-2 p-10 rounded-2xl bg-navy text-primary-foreground shadow-elegant flex flex-col">
            <MapPin className="w-10 h-10 text-gold mb-6" />
            <h3 className="font-serif text-3xl mb-4">Mercy Life Church</h3>
            <address className="not-italic text-primary-foreground/80 text-lg leading-relaxed mb-8">
              3100 Pleasant Valley Ln<br />
              Arlington, TX 76015
            </address>
            <div className="mt-auto space-y-3">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] transition-transform"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
              <a
                href="tel:+18176771407"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-primary-foreground/20 hover:border-gold/50 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call the Church
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-elegant min-h-[420px] border border-border">
            <iframe
              title="Mercy Life Church location"
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

function Contact() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="gold-rule mb-6" />
        <h2 className="text-4xl md:text-5xl text-navy mb-6">We're Here to Help</h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Have questions or planning your first visit? We would love to connect with you
          and answer any questions you may have. Feel free to call us anytime.
        </p>
        <a
          href="tel:+18176771407"
          className="group inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-navy text-primary-foreground shadow-elegant hover:shadow-gold transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
            <Phone className="w-5 h-5 text-navy" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <div className="text-xs tracking-[0.2em] uppercase text-gold">Call Us</div>
            <div className="font-serif text-2xl md:text-3xl">(817) 677-1407</div>
          </div>
        </a>
      </div>
    </section>
  );
}

function Connect() {
  const socials = [
    {
      name: "Instagram",
      handle: "@mercylife_dallas",
      cta: "Follow Us on Instagram",
      url: "https://www.instagram.com/mercylife_dallas",
      Icon: Instagram,
      copy: "Daily encouragement, sermon clips, and glimpses of church life.",
    },
    {
      name: "YouTube",
      handle: "@brianamoatengtv",
      cta: "Watch Messages & Subscribe",
      url: "https://www.youtube.com/@brianamoatengtv",
      Icon: Youtube,
      copy: "Full messages, worship moments, and teachings on demand.",
    },
  ];
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="gold-rule mb-6" />
          <h2 className="text-4xl md:text-5xl text-navy mb-4">Connect With Us Online</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Follow us for sermons, updates, encouragement, and church life throughout the week.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socials.map(({ name, handle, cta, url, Icon, copy }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-10 rounded-2xl bg-card border border-border hover:border-gold/50 hover:shadow-elegant transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center group-hover:bg-gradient-gold transition-colors">
                  <Icon className="w-6 h-6 text-gold group-hover:text-navy transition-colors" strokeWidth={2} />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
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

function ComingSoon() {
  return (
    <section className="py-24 md:py-32 bg-navy-deep text-primary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, var(--gold) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Sparkles className="w-10 h-10 text-gold mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl mb-6">
          Our Full Website Is <span className="text-gold italic">Launching Soon</span>
        </h2>
        <p className="text-lg text-primary-foreground/75 leading-relaxed">
          We're preparing a richer online experience that will help you learn more about
          our ministries, events, leadership, resources, and community.
        </p>
        <p className="text-lg text-primary-foreground/75 mt-4">
          Until then, we'd love to connect with you in person or through our social channels.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground border-t border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-navy" strokeWidth={2.5} />
            </div>
            <span className="font-serif text-xl">Mercy Life Church</span>
          </div>
          <address className="not-italic text-primary-foreground/70 leading-relaxed mb-3">
            3100 Pleasant Valley Ln<br />
            Arlington, TX 76015
          </address>
          <a href="tel:+18176771407" className="text-primary-foreground/70 hover:text-gold transition-colors block">
            (817) 677-1407
          </a>
        </div>
        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">Service Times</div>
          <ul className="space-y-2 text-primary-foreground/80">
            <li>Friday — 7:30 PM</li>
            <li>Sunday — 10:00 AM</li>
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">Follow</div>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.instagram.com/mercylife_dallas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@brianamoatengtv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors"
              >
                <Youtube className="w-4 h-4" /> YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif italic text-gold text-lg">
            Encounter God. Experience Mercy. Live Purposefully.
          </p>
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Mercy Life Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
