import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Clock, ArrowRight, Tag, Share2, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { getEvents, getSiteSettings, getMapsUrls } from "@/lib/content";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Events — MercyLife Church Dominion Temple" },
      {
        name: "description",
        content:
          "Join us for upcoming worship services, youth conferences, community outreaches, and special events at MercyLife Church Dominion Temple in Dallas, TX.",
      },
      { property: "og:title", content: "Upcoming Events — MercyLife Church Dominion Temple" },
      {
        property: "og:description",
        content:
          "Join us for upcoming worship services, youth conferences, community outreaches, and special events at MercyLife Church Dominion Temple in Dallas, TX.",
      },
    ],
  }),
  component: EventsPage,
});

/* ── Load CMS Content ──────────────────────────────────────── */

const EVENTS_DATA = getEvents();
const settings = getSiteSettings();
const { directionsUrl: DIRECTIONS_URL } = getMapsUrls(settings);

/* ── Main Component ────────────────────────────────────────── */

function EventsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const categories = ["All", "Worship", "Special", "Community", "Youth"];

  const filteredEvents = EVENTS_DATA.filter(
    (evt) => activeTab === "All" || evt.category === activeTab
  );

  const featuredEvents = EVENTS_DATA.filter((evt) => evt.isFeatured);

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this upcoming event at MercyLife Church: ${title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-grow pt-24">
        {/* Banner Section */}
        <section className="relative py-24 md:py-32 bg-navy text-primary-foreground overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 80% 20%, var(--gold) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-6 max-w-7xl mx-auto" aria-hidden="true">
            <div className="w-[1px] bg-white h-full"></div>
            <div className="w-[1px] bg-white h-full"></div>
            <div className="w-[1px] bg-white h-full"></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-6 text-center animate-fade-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Calendar</span>
              <span className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif mb-6 leading-tight">
              Upcoming <span className="italic text-gold">Events</span>
            </h1>
            <p className="text-primary-foreground/75 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Find where you fit in. Connect with our community through our weekly services, conferences, and community outreaches in the Dallas–Fort Worth metroplex.
            </p>
          </div>
        </section>

        {/* Featured Events (Editorial Columns) */}
        {featuredEvents.length > 0 && (
          <section className="py-20 bg-background" aria-label="Featured events">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-12">
                <span className="w-8 h-[1px] bg-gold" />
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Highlights</span>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {featuredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="relative rounded-2xl glass-panel p-8 md:p-10 border border-gold/10 shadow-material-2 flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="absolute right-0 top-0 w-16 h-16 pointer-events-none overflow-hidden" aria-hidden="true">
                      <div className="absolute bg-gold/15 rotate-45 text-[8px] font-sans font-bold text-gold py-1 text-center w-24 -right-6 top-4 uppercase tracking-widest shadow-sm">
                        Featured
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Tag className="w-3.5 h-3.5 text-gold" />
                        <span className="text-[10px] uppercase tracking-wider text-gold font-bold">{evt.category}</span>
                      </div>

                      <h3 className="font-serif text-3xl text-navy mb-4 leading-tight group-hover:text-gold transition-colors duration-300">
                        {evt.title}
                      </h3>
                      
                      <div className="space-y-2 mb-6 font-sans text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gold/80" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gold/80" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold/80" />
                          <span>{evt.location}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground font-light text-sm leading-relaxed mb-8">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-border/40 flex items-center justify-between mt-auto">
                      <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-navy hover:text-gold transition-colors"
                      >
                        Plan to Attend <ArrowRight className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleShare(evt.title)}
                        className="p-2 rounded-full hover:bg-navy/5 text-muted-foreground hover:text-navy transition-all"
                        aria-label={`Share ${evt.title}`}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filters & All Events */}
        <section className="py-20 bg-secondary/20 border-t border-border/40" aria-label="Church event directory">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-border/60 pb-8 mb-12">
              <div className="text-left">
                <h2 className="text-3xl font-serif text-navy">All Events</h2>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Filter upcoming assemblies by ministry category</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                      activeTab === cat
                        ? "bg-navy text-primary-foreground shadow-material-1"
                        : "bg-white/70 border border-border text-muted-foreground hover:border-gold/30 hover:text-navy"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Event List */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20 glass-panel rounded-2xl p-12 border border-border">
                <Sparkles className="w-10 h-10 text-gold/60 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-navy mb-2">No Events Found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto font-light text-sm">
                  We don't have any events listed under this category right now. Please check back later or view all events.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-8 rounded-2xl glass-card border border-white/50 shadow-material-1 hover:shadow-material-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-navy/5 text-gold border border-gold/20">
                          {evt.category}
                        </span>
                        {evt.speaker && (
                          <span className="text-[10px] text-muted-foreground italic">
                            Ministering: {evt.speaker}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-2xl text-navy leading-tight">{evt.title}</h3>
                      
                      <p className="text-muted-foreground font-light text-sm max-w-3xl leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-stretch lg:items-center gap-4 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-border/40">
                      <div className="font-sans text-xs space-y-1.5 md:w-44 text-muted-foreground uppercase tracking-wider font-semibold">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gold" />
                          <span>{evt.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end sm:justify-start">
                        <a
                          href={DIRECTIONS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-navy text-primary-foreground font-semibold text-xs shadow-material-1 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider"
                        >
                          Directions
                        </a>
                        <button
                          onClick={() => handleShare(evt.title)}
                          className="p-3 rounded-full border border-border bg-white text-muted-foreground hover:text-navy hover:border-gold/40 hover:shadow-material-1 transition-all"
                          aria-label={`Share ${evt.title}`}
                        >
                          <Share2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
