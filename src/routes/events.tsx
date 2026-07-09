import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Clock, ArrowRight, Share2, Sparkles } from "lucide-react";
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
  const featuredEvents = EVENTS_DATA.filter((evt) => evt.isFeatured);

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Check out this upcoming event at MercyLife Church: ${title}`,
          url: window.location.href,
        })
        .catch(console.error);
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
              backgroundImage:
                "radial-gradient(circle at 80% 20%, var(--gold) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-6 max-w-7xl mx-auto"
            aria-hidden="true"
          >
            <div className="w-[1px] bg-white h-full"></div>
            <div className="w-[1px] bg-white h-full"></div>
            <div className="w-[1px] bg-white h-full"></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-6 text-center animate-fade-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                Calendar
              </span>
              <span className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif mb-6 leading-tight">
              Upcoming <span className="italic text-gold">Events</span>
            </h1>
            <p className="text-primary-foreground/75 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Find where you fit in. Connect with our community through our weekly services,
              conferences, and community outreaches in the Dallas–Fort Worth metroplex.
            </p>
          </div>
        </section>

        {/* Featured Events (Editorial Columns) */}
        {featuredEvents.length > 0 && (
          <section className="py-20 bg-background" aria-label="Featured events">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-12">
                <span className="w-8 h-[1px] bg-gold" />
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                  Highlights
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {featuredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="relative rounded-2xl glass-panel border border-gold/10 shadow-material-2 flex flex-col justify-between overflow-hidden group hover:border-gold/30 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
                  >
                    <div>
                      {evt.image ? (
                        <div className="aspect-[16/10] w-full overflow-hidden relative">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] w-full bg-navy/40 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-gold/30" />
                        </div>
                      )}

                      <div className="p-6 md:p-8 space-y-4">
                        {evt.speaker && (
                          <span className="inline-block bg-gold/10 text-gold border border-gold/30 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-sans font-bold">
                            Ministering: {evt.speaker}
                          </span>
                        )}

                        <h3 className="font-serif text-2xl text-navy leading-tight group-hover:text-gold transition-colors duration-300">
                          {evt.title}
                        </h3>

                        <div className="space-y-2 font-sans text-xs text-muted-foreground font-semibold uppercase tracking-wider">
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

                        <p className="text-muted-foreground font-light text-sm leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 pt-0 border-t border-border/40 flex items-center justify-between mt-auto">
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

        {/* All Events */}
        <section
          className="py-20 bg-secondary/20 border-t border-border/40"
          aria-label="Church event directory"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-b border-border/60 pb-8 mb-12">
              <h2 className="text-3xl font-serif text-navy">All Events</h2>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                Browse our upcoming services, special assemblies, and activities.
              </p>
            </div>

            {/* Event Cards Grid */}
            {EVENTS_DATA.length === 0 ? (
              <div className="text-center py-20 glass-panel rounded-2xl p-12 border border-border">
                <Sparkles className="w-10 h-10 text-gold/60 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-navy mb-2">No Events Found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto font-light text-sm">
                  We don't have any events listed right now. Please check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {EVENTS_DATA.map((evt) => (
                  <div
                    key={evt.id}
                    className="relative rounded-2xl glass-card border border-white/50 shadow-material-1 flex flex-col justify-between overflow-hidden group hover:border-gold/30 hover:shadow-material-2 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div>
                      {evt.image ? (
                        <div className="aspect-[16/10] w-full overflow-hidden relative border-b border-border/20">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] w-full bg-navy/5 flex items-center justify-center border-b border-border/20">
                          <Calendar className="w-10 h-10 text-gold/30" />
                        </div>
                      )}

                      <div className="p-6 space-y-4">
                        {evt.speaker && (
                          <span className="inline-block bg-gold/10 text-gold border border-gold/30 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-sans font-bold">
                            Ministering: {evt.speaker}
                          </span>
                        )}

                        <h3 className="font-serif text-xl text-navy leading-tight group-hover:text-gold transition-colors duration-300">
                          {evt.title}
                        </h3>

                        <div className="space-y-2 font-sans text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gold/80" />
                            <span>{evt.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gold/80" />
                            <span>{evt.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-gold/80" />
                            <span>{evt.location}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground font-light text-sm leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-border/40 flex items-center justify-between mt-auto">
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
