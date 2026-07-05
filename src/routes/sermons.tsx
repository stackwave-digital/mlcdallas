import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Search, Calendar, User, BookOpen, Clock, ArrowRight, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getSermons, type Sermon } from "@/lib/content";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Sermon Archives — MercyLife Church Dominion Temple" },
      {
        name: "description",
        content:
          "Watch recent messages, study scripture, and download sermon notes from MercyLife Church Dominion Temple in Dallas, TX. Grow your faith.",
      },
      { property: "og:title", content: "Sermon Archives — MercyLife Church Dominion Temple" },
      {
        property: "og:description",
        content:
          "Watch recent messages, study scripture, and download sermon notes from MercyLife Church Dominion Temple in Dallas, TX. Grow your faith.",
      },
    ],
  }),
  component: Sermons,
});

/* ── Load CMS Content ──────────────────────────────────────── */

const SERMONS_DATA = getSermons();

/* ── Component ─────────────────────────────────────────────── */

function Sermons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSeries, setActiveSeries] = useState("All");
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  // Performance-focused state to handle lazy loading of the featured YouTube video iframe
  const [featuredPlayTriggered, setFeaturedPlayTriggered] = useState(false);

  const featuredSermon = SERMONS_DATA[0];

  // Extract unique series names
  const seriesCategories = ["All", ...Array.from(new Set(SERMONS_DATA.map((s) => s.series)))];

  // Filter sermons
  const filteredSermons = SERMONS_DATA.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.scripture.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeries = activeSeries === "All" || sermon.series === activeSeries;

    return matchesSearch && matchesSeries;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main id="main-content" className="flex-grow pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="bg-navy text-primary-foreground py-24 md:py-32 relative overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 30%, var(--gold) 0%, transparent 40%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-6 max-w-7xl mx-auto" aria-hidden="true">
            <div className="w-[1px] bg-white h-full"></div>
            <div className="w-[1px] bg-white h-full"></div>
            <div className="w-[1px] bg-white h-full"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6 animate-fade-up">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Teachings</span>
              <span className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif mb-6 leading-tight">
              Sermon <span className="text-gold italic">Archives</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/75 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              Watch recent messages, study sermon notes, and dive deep into scripture. Access
              transformative teachings from Friday Worship and Sunday Services.
            </p>
          </div>
        </section>

        {/* Featured Sermon Section */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-left mb-12 flex items-center gap-4">
            <span className="bg-gold/15 text-navy font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border border-gold/30">
              Latest Message
            </span>
            <span className="h-[1px] bg-border/60 flex-grow" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Lazy Loaded Video Player */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-material-2 border border-border bg-black relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center group">
              {!featuredPlayTriggered ? (
                <>
                  <img
                    src={featuredSermon.cover}
                    alt={featuredSermon.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                  />
                  <div className="absolute inset-0 bg-navy/40 backdrop-blur-[1px] group-hover:bg-navy/35 transition-colors" />
                  <button
                    onClick={() => setFeaturedPlayTriggered(true)}
                    className="relative z-10 w-20 h-20 rounded-full bg-gradient-gold text-navy flex items-center justify-center shadow-gold transition-all duration-300 hover:scale-110 cursor-pointer"
                    aria-label={`Play sermon titled ${featuredSermon.title}`}
                  >
                    <Play className="w-8 h-8 fill-navy ml-1" />
                  </button>
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-primary-foreground bg-navy/85 px-3.5 py-1.5 rounded-full border border-gold/25 backdrop-blur-sm">
                    <Clock className="w-3.5 h-3.5 text-gold" /> {featuredSermon.duration}
                  </div>
                </>
              ) : (
                <iframe
                  title={featuredSermon.title}
                  src={`https://www.youtube.com/embed/${featuredSermon.youtubeId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Featured Details and Notes Accordion */}
            <div className="lg:col-span-5 flex flex-col justify-between p-8 md:p-10 rounded-2xl glass-card border border-white/50 shadow-material-2">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold uppercase tracking-wider font-sans">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" /> {featuredSermon.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1.5 text-navy font-serif">
                      <BookOpen className="w-3.5 h-3.5 text-gold" /> {featuredSermon.scripture}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-navy leading-snug">
                    {featuredSermon.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans font-medium">
                    <User className="w-4 h-4 text-gold" />
                    <span>Preacher: </span>
                    <span className="font-semibold text-foreground">
                      {featuredSermon.preacher}
                    </span>
                  </div>
                </div>

                {/* Sermon Notes Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="outline" className="border-gold/20">
                    <AccordionTrigger className="font-serif text-lg text-navy hover:text-gold cursor-pointer">
                      Sermon Outline
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm space-y-2 leading-relaxed font-light">
                      <ul className="list-disc pl-5 space-y-1.5">
                        {featuredSermon.notes.outline.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="scriptures" className="border-gold/20">
                    <AccordionTrigger className="font-serif text-lg text-navy hover:text-gold cursor-pointer">
                      Key Scriptures
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm space-y-3 leading-relaxed font-light">
                      {featuredSermon.notes.scriptures.map((scripture, idx) => (
                        <p key={idx} className="italic border-l-2 border-gold pl-3">
                          {scripture}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="reflection" className="border-gold/20">
                    <AccordionTrigger className="font-serif text-lg text-navy hover:text-gold cursor-pointer">
                      Discussion &amp; Reflection
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm space-y-2 leading-relaxed font-light">
                      <ol className="list-decimal pl-5 space-y-1.5">
                        {featuredSermon.notes.reflection.map((question, idx) => (
                          <li key={idx}>{question}</li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mt-10 pt-6 border-t border-border/60 flex items-center justify-between">
                <a
                  href={`https://www.youtube.com/watch?v=${featuredSermon.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-navy hover:text-gold font-semibold text-xs tracking-wider uppercase font-sans transition-colors cursor-pointer"
                >
                  Watch on YouTube <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    navigator.share?.({
                      title: featuredSermon.title,
                      url: window.location.href,
                    }).catch(() => {});
                  }}
                  className="p-2 text-muted-foreground hover:text-navy hover:bg-navy/5 rounded-full transition-all cursor-pointer"
                  aria-label="Share this sermon"
                >
                  <Share2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar Section */}
        <section className="bg-secondary/20 py-10 border-y border-border/40">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Series Filter Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {seriesCategories.map((series) => (
                <button
                  key={series}
                  onClick={() => setActiveSeries(series)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    activeSeries === series
                      ? "bg-navy text-primary-foreground shadow-material-1"
                      : "bg-white/70 border border-border text-muted-foreground hover:border-gold/30 hover:text-navy"
                  }`}
                >
                  {series}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4.5 h-4.5" />
              <Input
                type="text"
                placeholder="Search by title, preacher, scripture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white/70 border-border/60 focus-visible:ring-gold font-sans text-sm rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Sermons Archive Grid */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          {filteredSermons.length === 0 ? (
            <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed border-border p-12">
              <p className="text-muted-foreground text-lg">No sermons match your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSermons.map((sermon) => (
                <article
                  key={sermon.id}
                  onClick={() => setActiveSermon(sermon)}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-border/60 bg-white p-2 shadow-material-1 hover:shadow-material-2 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative overflow-hidden rounded-xl">
                      <AspectRatio ratio={16 / 10}>
                        <img
                          src={sermon.cover}
                          alt={sermon.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/35 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-gold text-navy flex items-center justify-center shadow-gold scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Play className="w-6 h-6 fill-navy ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-primary-foreground bg-navy/85 px-3 py-1 rounded-full border border-gold/20 font-semibold backdrop-blur-sm">
                        <Clock className="w-3.5 h-3.5 text-gold" /> {sermon.duration}
                      </div>
                      <span className="absolute top-3 right-3 bg-gold text-navy font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm">
                        {sermon.series}
                      </span>
                    </div>

                    {/* Content Description */}
                    <div className="p-6 space-y-3.5 text-left">
                      <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gold" /> {sermon.date}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 font-semibold text-navy font-serif">
                          <BookOpen className="w-3.5 h-3.5 text-gold" /> {sermon.scripture}
                        </span>
                      </div>
                      <h4 className="font-serif text-2xl text-navy group-hover:text-gold transition-colors line-clamp-2 leading-tight">
                        {sermon.title}
                      </h4>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-2">
                        {sermon.notes.outline[0]}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-navy">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-gold" /> {sermon.preacher}
                    </span>
                    <span className="text-gold flex items-center gap-1 group-hover:underline">
                      Watch &amp; Notes <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Lightbox / Sermon Player Modal Dialog */}
      {activeSermon && (
        <Dialog open={activeSermon !== null} onOpenChange={(open) => !open && setActiveSermon(null)}>
          <DialogContent className="max-w-4xl bg-navy/90 backdrop-blur-md border border-white/10 p-2 sm:p-6 overflow-y-auto max-h-[92vh] flex flex-col justify-start items-center shadow-2xl rounded-2xl w-[95vw]">
            <div className="w-full flex flex-col justify-start gap-4">
              <DialogTitle className="sr-only">{activeSermon.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Sermon details for {activeSermon.title} by {activeSermon.preacher}.
              </DialogDescription>
              {/* Responsive Video Container */}
              <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video border border-gold/25 shadow-lg min-h-[200px]">
                <iframe
                  title={activeSermon.title}
                  src={`https://www.youtube.com/embed/${activeSermon.youtubeId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Sermon Header Meta Info */}
              <div className="w-full text-left p-4 space-y-4 bg-navy-deep/50 rounded-xl border border-gold/10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gold/80">
                    <span className="bg-gold/15 text-gold border border-gold/25 px-2.5 py-0.5 rounded font-serif font-bold">
                      {activeSermon.series}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {activeSermon.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {activeSermon.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl text-primary-foreground leading-tight">
                    {activeSermon.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/75">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-gold" /> {activeSermon.preacher}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-gold font-serif">
                      <BookOpen className="w-4 h-4" /> {activeSermon.scripture}
                    </span>
                  </div>
                </div>

                {/* Sermon Accordion Study Notes Inside Modal */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="modal-outline" className="border-gold/20">
                    <AccordionTrigger className="font-serif text-lg text-primary-foreground hover:text-gold py-3 cursor-pointer">
                      Sermon Outline
                    </AccordionTrigger>
                    <AccordionContent className="text-primary-foreground/75 text-sm space-y-2 leading-relaxed">
                      <ul className="list-disc pl-5 space-y-2">
                        {activeSermon.notes.outline.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="modal-scriptures" className="border-gold/20">
                    <AccordionTrigger className="font-serif text-lg text-primary-foreground hover:text-gold py-3 cursor-pointer">
                      Key Scriptures
                    </AccordionTrigger>
                    <AccordionContent className="text-primary-foreground/75 text-sm space-y-3 leading-relaxed">
                      {activeSermon.notes.scriptures.map((scripture, idx) => (
                        <p key={idx} className="italic border-l-2 border-gold pl-3">
                          {scripture}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="modal-reflection" className="border-gold/20">
                    <AccordionTrigger className="font-serif text-lg text-primary-foreground hover:text-gold py-3 cursor-pointer">
                      Discussion &amp; Reflection Questions
                    </AccordionTrigger>
                    <AccordionContent className="text-primary-foreground/75 text-sm space-y-2 leading-relaxed">
                      <ol className="list-decimal pl-5 space-y-2">
                        {activeSermon.notes.reflection.map((question, idx) => (
                          <li key={idx}>{question}</li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
