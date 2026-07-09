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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logoImg from "@/assets/logo.png";
// @ts-ignore
import introVideo from "@/assets/videos/intro-video.mp4";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getSiteSettings, getHomepageContent, getMapsUrls, getEvents } from "@/lib/content";

/* ── Load CMS Content ──────────────────────────────────────── */

const settings = getSiteSettings();
const homepage = getHomepageContent();
const { directionsUrl: DIRECTIONS_URL, embedUrl: EMBED_URL } = getMapsUrls(settings);

const PHONE_DISPLAY = settings.phone_display;
const PHONE_HREF = settings.phone_href;
const INSTAGRAM_URL = settings.instagram_url;
const YOUTUBE_URL = settings.youtube_url;

/* ── Route meta (page-level overrides) ─────────────────────── */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MercyLife Church Dominion Temple — Dallas, TX" },
      {
        name: "description",
        content:
          "MercyLife Church Dominion Temple is a welcoming Christian church in Dallas, Texas. Join us for Friday worship at 7:30 PM and Sunday service at 10:00 AM. Plan your visit today!",
      },
      { property: "og:title", content: "MercyLife Church Dominion Temple — Dallas, TX" },
      {
        property: "og:description",
        content:
          "Experience powerful worship, practical teaching, and a vibrant community at MercyLife Church. Services every Friday at 7:30 PM & Sunday at 10 AM in Dallas, TX.",
      },
    ],
  }),
  component: Index,
} as any);

/* ── Page Component ────────────────────────────────────────── */

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content">
        <Hero />
        <Welcome />
        <Pastor />
        <WhatToExpect />
        <MissionVision />
        <HomeEvents />
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
// Removed: Nav header is now imported from Header.tsx
/* ── Hero ──────────────────────────────────────────────────── */

function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const hero = homepage.hero;

  const togglePlay = () => {
    const video = document.getElementById("hero-bg-video") as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch((err) => console.log(err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-navy-deep"
      aria-label="Welcome hero"
    >
      {/* Background Video */}
      <video
        id="hero-bg-video"
        src={introVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-60"
        style={{ zIndex: 1 }}
      />

      {/* Glassmorphic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" style={{ zIndex: 2 }} aria-hidden="true" />
      {/* Editorial Grid overlay lines (Modernist) */}
      <div
        className="absolute inset-0 flex justify-between pointer-events-none opacity-10 px-6 max-w-7xl mx-auto"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <div className="w-[1px] bg-white h-full"></div>
        <div className="w-[1px] bg-white h-full hidden sm:block"></div>
        <div className="w-[1px] bg-white h-full hidden md:block"></div>
        <div className="w-[1px] bg-white h-full"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-32 text-center" style={{ zIndex: 4 }}>
        <div className="animate-fade-up">
          <div className="inline-flex items-stretch mb-8 glass-panel border border-white/20 rounded-full overflow-hidden p-1">
            <div className="bg-gradient-gold text-navy px-4 py-1.5 rounded-full font-sans text-[10px] tracking-[0.25em] uppercase font-bold flex items-center shadow-sm">
              {hero.location_badge}
            </div>
            <div className="px-5 py-1.5 text-[10px] tracking-[0.25em] uppercase flex items-center font-semibold">
              {hero.schedule_badge}
            </div>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-primary-foreground leading-[1.05] tracking-tight">
            {hero.title_line1}{" "}
            <span className="text-gold italic block sm:inline">{hero.title_highlight}</span>
            <span className="block text-xl sm:text-2xl md:text-3xl mt-4 font-sans tracking-[0.2em] uppercase font-medium text-gold/80">
              {hero.title_subtitle}
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#visit"
              id="hero-plan-visit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all font-sans"
              aria-label="Plan your visit to MercyLife Church"
            >
              {hero.cta_primary} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={YOUTUBE_URL}
              id="hero-watch-online"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md active:scale-[0.98] transition-all font-sans"
              aria-label="Watch MercyLife Church sermons on YouTube"
            >
              <Play className="w-4 h-4 text-gold fill-gold" aria-hidden="true" />{" "}
              {hero.cta_secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Pause/Play controller for the video */}
      <button
        onClick={togglePlay}
        className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
        style={{ zIndex: 10 }}
      >
        {isPlaying ? (
          <span className="block w-2.5 h-2.5 border-l-2 border-r-2 border-current" />
        ) : (
          <Play className="w-4 h-4 fill-current ml-0.5" />
        )}
      </button>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

function Welcome() {
  const about = homepage.about;

  return (
    <section
      className="py-24 md:py-32 bg-background relative overflow-hidden section-lazy"
      aria-label="About MercyLife Church"
    >
      {/* Decorative Editorial Elements */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center relative">
        <div className="md:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              About Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-navy mb-8 font-serif leading-[1.15]">
            {about.heading} <span className="italic text-gold">{about.heading_highlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 editorial-first-letter">
            {about.paragraph1}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
            {about.paragraph2}
          </p>
        </div>
        <div className="md:col-span-5 relative">
          <div
            className="absolute -inset-4 bg-gradient-gold rounded-2xl opacity-10 blur-2xl"
            aria-hidden="true"
          />
          <div className="rounded-2xl overflow-hidden border border-gold/10 p-2 glass-panel shadow-material-2">
            <img
              src={about.image}
              alt="MercyLife Church Dominion Temple community members greeting visitors at a Sunday worship service in Dallas, Texas"
              loading="lazy"
              decoding="async"
              width={1400}
              height={1600}
              className="rounded-xl w-full h-[520px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Meet the Pastor ──────────────────────────────────────── */

function Pastor() {
  const pastor = homepage.pastor;

  return (
    <section
      className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden section-lazy border-b border-border/40"
      aria-label="About our Senior Pastor"
    >
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Pastor Image & Fast Stats */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="absolute -inset-4 bg-gradient-gold rounded-2xl opacity-10 blur-xl pointer-events-none" />
            <div className="rounded-2xl overflow-hidden border border-gold/10 p-2 glass-panel shadow-material-3">
              <img
                src={pastor.image}
                alt={`Pastor ${pastor.name}`}
                loading="lazy"
                decoding="async"
                className="rounded-xl w-full h-[580px] object-cover"
              />
            </div>
            {/* Quick Badges list */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl text-center border border-white/55 shadow-material-1">
                <div className="text-gold font-serif text-2xl font-bold">{pastor.stat1_value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold">
                  {pastor.stat1_label}
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center border border-white/55 shadow-material-1">
                <div className="text-gold font-serif text-2xl font-bold">{pastor.stat2_value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold">
                  {pastor.stat2_label}
                </div>
              </div>
            </div>
          </div>

          {/* Pastor Biography */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-gold" />
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                  {pastor.label}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-navy mb-4 font-serif leading-tight">
                Meet Our Pastor,{" "}
                <span className="italic text-gold block sm:inline">{pastor.name}</span>
              </h2>
              <p className="text-sm font-sans tracking-widest uppercase text-muted-foreground font-semibold">
                {pastor.title}
              </p>
            </div>

            <div className="editorial-quote">"{pastor.quote}"</div>

            <div className="space-y-6 text-muted-foreground font-light text-base leading-relaxed">
              <p className="editorial-first-letter">{pastor.bio_intro}</p>

              <div className="editorial-col-2 pt-6 border-t border-border/60">
                <div>
                  <h4 className="font-serif text-lg text-navy mb-3 font-semibold">
                    Global Influence
                  </h4>
                  <p className="text-sm leading-relaxed mb-4">{pastor.global_influence}</p>
                  <p className="text-sm leading-relaxed">{pastor.global_influence_2}</p>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-navy mb-3 font-semibold">
                    Prophetic Grace & Education
                  </h4>
                  <p className="text-sm leading-relaxed mb-4">{pastor.prophetic_grace}</p>
                  <p className="text-sm leading-relaxed">{pastor.education}</p>
                </div>
              </div>
            </div>
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
      className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden border-y border-border/40 section-lazy hidden"
      aria-label="What to expect at MercyLife Church"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Your Visit
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl text-navy mb-6 font-serif">
            What to Expect at Your <span className="italic text-gold">First Visit</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Visiting a new church can feel unfamiliar, so we want you to know exactly what to expect
            when you join us for worship in Dallas, TX. No matter your background or where you are
            on your faith journey, you're welcome here.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="p-10 rounded-2xl glass-card border border-white/50 text-center shadow-material-1 hover:shadow-material-2"
            >
              <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 duration-300">
                <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-navy mb-4">{title}</h3>
              <p className="text-muted-foreground leading-relaxed font-light text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Mission & Vision ─────────────────────────────────────── */

function MissionVision() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastSwipedIndex, setLastSwipedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const visions = homepage.vision;
  const sanctuary = "/uploads/sunctuary.jpg";

  const handleNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setLastSwipedIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % visions.length);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setLastSwipedIndex(null);
    }, 550); // matches keyframe animation duration
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection("prev");
    setLastSwipedIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + visions.length) % visions.length);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setLastSwipedIndex(null);
    }, 550); // matches keyframe animation duration
  };

  return (
    <section
      className="py-24 md:py-32 bg-background relative overflow-hidden section-lazy border-b border-border/40"
      aria-label="Mission and Vision"
    >
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-stretch">
          {/* Left Column: Mission & Framed Vision Image */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-gold/25 shadow-material-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-gold" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold">
                  Our Mission
                </span>
              </div>
              <p className="font-serif text-xl md:text-2xl text-navy italic leading-relaxed font-semibold">
                "{homepage.mission}"
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/40 p-2 bg-white/50 shadow-material-2 relative group flex-grow min-h-[250px] flex items-center">
              <div className="w-full h-full relative rounded-xl overflow-hidden">
                <img
                  src={sanctuary}
                  alt="Worship scene at MercyLife Church"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white font-sans text-xs uppercase tracking-wider font-semibold opacity-90">
                    Worshipping in Spirit & Truth &bull; Dallas, TX
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title & Interactive Swiper Deck */}
          <div className="lg:col-span-7 flex flex-col justify-between p-2">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-gold" />
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                  Our Vision
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl text-navy font-serif mb-4 leading-tight">
                Our Vision for <span className="italic text-gold">the Future</span>
              </h2>
              <p className="text-muted-foreground text-base font-light mb-10 max-w-xl leading-relaxed">
                We believe in raising leaders for global impact and building a church where everyone
                belongs and finds their unique expression.
              </p>
            </div>

            {/* Stacked Cards Deck Container */}
            <div className="relative select-none pb-12">
              <div className="relative w-full h-[240px] md:h-[190px] perspective-[1000px]">
                {visions.map((vision, index) => {
                  let offset = -1;
                  if (index === activeIndex) offset = 0;
                  else if (index === (activeIndex + 1) % visions.length) offset = 1;
                  else if (index === (activeIndex + 2) % visions.length) offset = 2;
                  else if (index === (activeIndex + 3) % visions.length) offset = 3;

                  const isSwiped = index === lastSwipedIndex;
                  let cardStyle: React.CSSProperties = {};
                  let animationClass = "";

                  if (isSwiped) {
                    animationClass =
                      direction === "next" ? "animate-card-back-left" : "animate-card-back-right";
                    cardStyle = {
                      transition: "none",
                    };
                  } else if (offset !== -1) {
                    const targetOffset = isAnimating ? Math.max(0, offset - 1) : offset;
                    const scale = 1 - targetOffset * 0.045;
                    const translateY = targetOffset * 18;
                    const opacity =
                      targetOffset === 3
                        ? isAnimating
                          ? 0.6
                          : 0
                        : targetOffset === 2
                          ? 0.6
                          : targetOffset === 1
                            ? 0.9
                            : 1;

                    cardStyle = {
                      transform: `translate3d(0px, ${translateY}px, 0px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: 40 - offset,
                      pointerEvents: offset === 0 ? "auto" : "none",
                    };
                  } else {
                    cardStyle = {
                      transform: "translate3d(0px, 48px, 0px) scale(0.88)",
                      opacity: 0,
                      zIndex: 0,
                      pointerEvents: "none",
                    };
                  }

                  return (
                    <div
                      key={index}
                      onClick={() => offset === 0 && handleNext()}
                      style={cardStyle}
                      className={`absolute inset-0 p-8 rounded-2xl border border-white/60 bg-white shadow-material-2 flex items-start gap-6 cursor-pointer transform origin-bottom transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${animationClass}`}
                    >
                      <div className="font-serif text-3xl md:text-4xl text-gold font-extrabold select-none">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="text-navy font-sans text-base md:text-lg leading-relaxed font-light mt-1 flex-grow">
                        {vision}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Swiper Controls & Progress Indicator */}
            <div className="mt-6 flex flex-col gap-4">
              {/* Progress Line */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground font-serif tracking-wider font-semibold">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(visions.length).padStart(2, "0")}
                </span>
                <div className="flex-grow h-[3px] bg-muted/40 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${((activeIndex + 1) / visions.length) * 100}%` }}
                    className="h-full bg-gold transition-all duration-300"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-sans font-light tracking-wide">
                  * Tap active card to swipe forward
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={isAnimating}
                    className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center text-navy bg-white hover:bg-navy hover:text-white transition-all disabled:opacity-55 cursor-pointer shadow-material-1 active:scale-95"
                    aria-label="Previous vision"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isAnimating}
                    className="w-10 h-10 rounded-full bg-gradient-gold text-navy flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-55 cursor-pointer shadow-gold"
                    aria-label="Next vision"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services ─────────────────────────────────────────────── */

function Services() {
  const services = settings.services;

  return (
    <section
      id="visit"
      className="py-24 md:py-32 bg-navy text-primary-foreground relative overflow-hidden section-lazy"
      aria-label="Worship service times"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 80%, var(--gold) 0, transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Join Us
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 font-serif">
            Worship Services — <span className="italic text-gold">Friday &amp; Sunday</span>
          </h2>
          <p className="text-primary-foreground/75 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Join us for a worship service in Dallas, TX. Experience God's presence through anointed
            praise, prayer, and teaching that transforms lives.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((s) => (
            <div
              key={s.name}
              className="group relative p-10 rounded-2xl glass-panel-dark border border-white/10 hover:border-gold/30 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold">
                    {s.day}
                  </span>
                </div>
                <h3 className="font-serif text-3xl mb-3 leading-tight">{s.name}</h3>
                <div className="font-serif text-5xl text-gold mb-6 font-semibold tracking-tight">
                  {s.time}
                </div>
              </div>
              <p className="text-primary-foreground/75 font-light text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={DIRECTIONS_URL}
            id="services-get-directions"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] transition-transform font-sans"
            aria-label="Get directions to MercyLife Church Dominion Temple"
          >
            <Navigation className="w-4 h-4" aria-hidden="true" /> Get Directions
          </a>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors font-sans text-sm tracking-wide"
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
      className="py-24 md:py-32 bg-background relative overflow-hidden section-lazy"
      aria-label="Church location and directions"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Location
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl text-navy font-serif mb-4">
            Visit MercyLife Church in <span className="italic text-gold">Dallas, TX</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 text-lg font-light leading-relaxed">
            Conveniently located on Pleasant Valley Lane, our church is easy to find and has ample
            parking for you and your family.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-2 p-10 rounded-2xl glass-panel-dark text-primary-foreground shadow-material-3 flex flex-col border border-white/10 justify-between">
            <div>
              <MapPin className="w-10 h-10 text-gold mb-8" aria-hidden="true" />
              <h3 className="font-serif text-3xl mb-4 leading-tight">
                MercyLife Church Dominion Temple
              </h3>
              <address className="not-italic text-primary-foreground/75 text-lg leading-relaxed mb-8 font-light">
                {settings.address_street}
                <br />
                {settings.address_city}, {settings.address_state} {settings.address_zip}
              </address>
            </div>
            <div className="space-y-4">
              <a
                href={DIRECTIONS_URL}
                id="location-get-directions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] transition-transform font-sans"
                aria-label="Get driving directions to MercyLife Church"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" /> Get Directions
              </a>
              <a
                href={PHONE_HREF}
                id="location-call"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-sans text-sm font-semibold"
                aria-label={`Call MercyLife Church at ${PHONE_DISPLAY}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> Call the Church
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-material-2 min-h-[420px] border border-border/60 p-2 bg-white/40 backdrop-blur-sm">
            <iframe
              title={`MercyLife Church Dominion Temple location — ${settings.address_full}`}
              src={EMBED_URL}
              width="100%"
              height="100%"
              className="rounded-xl"
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
      className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden border-y border-border/40 section-lazy"
      aria-label="Contact MercyLife Church"
    >
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-gold" />
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
            Contact
          </span>
          <span className="w-8 h-[1px] bg-gold" />
        </div>
        <h2 className="text-4xl md:text-5xl text-navy mb-6 font-serif">
          Connect With <span className="italic text-gold">MercyLife Church</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-light">
          Planning your first visit to our Christian church in Dallas, Texas? We'd love to hear from
          you. Whether you have questions about our worship services, need prayer, or simply want to
          learn more, our team is here to help. Call us anytime.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 max-w-2xl mx-auto">
          <a
            href={PHONE_HREF}
            id="contact-call"
            className="group flex-1 inline-flex items-center gap-5 p-8 rounded-2xl glass-panel-dark text-primary-foreground shadow-material-1 hover:shadow-material-2 hover:border-gold/30 transition-all border border-white/10"
            aria-label={`Call MercyLife Church at ${PHONE_DISPLAY}`}
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="text-[10px] tracking-[0.2em] uppercase text-gold font-bold">
                Call Us
              </div>
              <div className="font-serif text-2xl font-bold">{PHONE_DISPLAY}</div>
            </div>
          </a>
          <a
            href={DIRECTIONS_URL}
            id="contact-directions"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 inline-flex items-center gap-5 p-8 rounded-2xl glass-panel-dark text-primary-foreground shadow-material-1 hover:shadow-material-2 hover:border-gold/30 transition-all border border-white/10"
            aria-label="Get directions to MercyLife Church"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="text-[10px] tracking-[0.2em] uppercase text-gold font-bold">
                Visit Us
              </div>
              <div className="font-serif text-2xl font-bold">Get Directions</div>
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
      handle: settings.instagram_handle,
      cta: "Follow Us on Instagram",
      url: INSTAGRAM_URL,
      Icon: Instagram,
      copy: "Daily encouragement, sermon clips, and glimpses of church life at MercyLife Church.",
    },
    {
      name: "YouTube",
      handle: settings.youtube_handle,
      cta: "Watch Messages & Subscribe",
      url: YOUTUBE_URL,
      Icon: Youtube,
      copy: "Full messages, worship moments, and teachings on demand from our Dallas, TX services.",
    },
  ];
  return (
    <section
      className="py-24 md:py-32 bg-background relative overflow-hidden section-lazy"
      aria-label="Social media links"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Social
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl text-navy mb-4 font-serif">Stay Connected Online</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg font-light leading-relaxed">
            Follow us for sermons, updates, encouragement, and church life throughout the week.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {socials.map(({ name, handle, cta, url, Icon, copy }) => (
            <a
              key={name}
              href={url}
              id={`social-${name.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-10 rounded-2xl glass-card border border-white/50 shadow-material-1 hover:shadow-material-2 flex flex-col justify-between"
              aria-label={`${cta} — ${handle}`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center group-hover:bg-gradient-gold transition-all duration-300">
                    <Icon
                      className="w-5 h-5 text-navy group-hover:text-navy transition-colors"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <ArrowRight
                    className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-serif text-2xl text-navy mb-1">{name}</h3>
                <div className="text-xs text-gold font-sans mb-4 tracking-wide uppercase font-semibold">
                  {handle}
                </div>
                <p className="text-muted-foreground font-light text-sm leading-relaxed mb-8">
                  {copy}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-navy font-semibold font-sans text-xs uppercase tracking-wider border-b border-gold/40 pb-0.5 w-fit hover:border-gold transition-colors">
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
      className="py-28 md:py-36 bg-navy text-primary-foreground relative overflow-hidden section-lazy border-t border-white/10"
      aria-label="Future website features"
    >
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="glass-panel-dark border border-white/10 p-12 md:p-16 rounded-3xl shadow-material-3 text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 border-t-2 border-r-2 border-gold/20 rounded-tr-3xl" />
          <div className="absolute left-0 bottom-0 w-24 h-24 border-b-2 border-l-2 border-gold/20 rounded-bl-3xl" />

          <img
            src={logoImg}
            width={72}
            height={72}
            className="mx-auto block mb-8 transition-transform hover:scale-105"
            alt="MercyLife Church logo"
            loading="lazy"
            decoding="async"
          />
          <h2 className="text-3xl md:text-5xl mb-6 font-serif">
            More From MercyLife Church — <span className="text-gold italic">Coming Soon</span>
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/75 leading-relaxed font-sans font-light max-w-2xl mx-auto">
            We're building a richer online experience with sections dedicated to our ministries,
            online giving, and community resources — all designed to support you and help you
            connect deeper.
          </p>
          <p className="text-sm text-gold/80 mt-6 font-sans tracking-wide">
            Until then, we'd love to connect with you in person at our Dallas, TX location or
            through our social channels.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */
// Removed: Footer is now imported from Footer.tsx

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

function HomeEvents() {
  const events = getEvents();
  // Find first featured event, or use the first event as featured fallback
  const featuredEvent = events.find((e) => e.isFeatured) || events[0];
  // Filter out the featured event from the upcoming list so it's not duplicated
  const upcomingEvents = events.filter((e) => e.id !== featuredEvent?.id);

  return (
    <section className="py-24 md:py-32 bg-[#090D16] text-white relative overflow-hidden">
      {/* Editorial Grid lines for aesthetics */}
      <div
        className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-6 max-w-7xl mx-auto"
        aria-hidden="true"
      >
        <div className="w-[1px] bg-white h-full"></div>
        <div className="w-[1px] bg-white h-full hidden sm:block"></div>
        <div className="w-[1px] bg-white h-full hidden md:block"></div>
        <div className="w-[1px] bg-white h-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Featured Event Section */}
        {featuredEvent && (
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3">
                FEATURED EVENT
              </h2>
              <p className="text-sm text-gray-400 font-sans animate-fade-in">
                The moment you don't want to miss.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 backdrop-blur-md hover:border-gold/30 transition-all duration-500 hover:shadow-elegant">
                {featuredEvent.image && (
                  <div className="w-full md:w-[380px] aspect-[16/10] rounded-2xl overflow-hidden shrink-0 border border-white/5">
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 text-left space-y-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-white font-semibold uppercase tracking-wide leading-tight">
                    {featuredEvent.title}
                  </h3>
                  <div className="flex flex-col gap-2 text-xs text-gold font-sans font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold/80" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold/80" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-gold/80" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm font-sans font-light leading-relaxed">
                    {featuredEvent.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <div>
            <div className="relative mb-16 text-center">
              <h3 className="relative z-10 text-3xl md:text-5xl font-serif text-white leading-tight">
                UPCOMING <span className="text-gold italic">EVENTS</span>
              </h3>
              <p className="relative z-10 text-xs text-gray-400 uppercase tracking-widest mt-3">
                Discover what fits your season and join our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((evt) => {
                const { month, day } = parseEventDate(evt.date);
                return (
                  <div
                    key={evt.id}
                    className="group bg-white/[0.02] border border-white/5 p-2 rounded-3xl overflow-hidden hover:border-gold/20 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 shadow-elegant flex flex-col justify-between"
                  >
                    <div>
                      {evt.image ? (
                        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden relative">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/9] w-full rounded-2xl bg-navy-deep/40 flex items-center justify-center">
                          <Calendar className="w-10 h-10 text-gold/30" />
                        </div>
                      )}

                      {/* Card details block */}
                      <div className="p-5 flex gap-4 items-start">
                        {/* Left Side: Date Box */}
                        <div className="flex flex-col items-center justify-center border border-white/10 rounded-xl px-3 py-2 shrink-0 bg-white/[0.02] min-w-[56px]">
                          <span className="text-[10px] text-gray-400 font-sans tracking-wider uppercase font-semibold">
                            {month}
                          </span>
                          <span className="text-2xl text-white font-sans font-bold tracking-tight mt-0.5">
                            {day}
                          </span>
                        </div>

                        {/* Right Side: Title, Time, Location */}
                        <div className="space-y-3 flex-1 text-left">
                          <h4 className="font-serif text-lg text-white font-semibold uppercase tracking-wide group-hover:text-gold transition-colors duration-300 leading-tight">
                            {evt.title}
                          </h4>
                          <div className="space-y-1 font-sans text-[11px] text-gray-400 tracking-wide font-medium">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-gold/70" />
                              <span>{evt.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gold/70" />
                              <span className="line-clamp-1">{evt.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA / Link */}
                    <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-white/5 mt-auto">
                      <a
                        href="/events"
                        className="text-[10px] uppercase tracking-widest text-gold font-sans font-bold group-hover:text-white transition-colors"
                      >
                        View Event Details
                      </a>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gradient-gold group-hover:text-navy transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-navy transition-colors" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-16">
              <a
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-navy font-semibold shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all font-sans"
              >
                View All Events <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function parseEventDate(dateStr: string) {
  const normalized = dateStr.toLowerCase();
  if (normalized.includes("sunday")) {
    return { month: "SUN", day: "WK" };
  }
  if (normalized.includes("friday")) {
    return { month: "FRI", day: "WK" };
  }
  if (normalized.includes("recurring")) {
    return { month: "REC", day: "WK" };
  }

  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return {
      month: months[date.getMonth()],
      day: String(date.getDate()).padStart(2, "0"),
    };
  }

  return { month: "EVT", day: "📅" };
}
