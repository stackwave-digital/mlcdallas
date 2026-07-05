import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { getGalleryImages } from "@/lib/content";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Church Gallery — MercyLife Church Dominion Temple" },
      {
        name: "description",
        content:
          "Explore photos of worship, fellowship, and events at MercyLife Church Dominion Temple in Dallas, TX. Experience our community in action.",
      },
      { property: "og:title", content: "Church Gallery — MercyLife Church Dominion Temple" },
      {
        property: "og:description",
        content:
          "Explore photos of worship, fellowship, and events at MercyLife Church Dominion Temple in Dallas, TX. Experience our community in action.",
      },
    ],
  }),
  component: Gallery,
});

/* ── Load CMS Content ──────────────────────────────────────── */

const GALLERY_IMAGES = getGalleryImages();
const CATEGORIES = ["All", ...Array.from(new Set(GALLERY_IMAGES.map((img) => img.category)))];

/* ── Component ─────────────────────────────────────────────── */

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images based on selected tab
  const filteredImages = GALLERY_IMAGES.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      let nextIndex = direction === "next" ? lightboxIndex + 1 : lightboxIndex - 1;

      if (nextIndex >= filteredImages.length) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = filteredImages.length - 1;
      }
      setLightboxIndex(nextIndex);
    },
    [lightboxIndex, filteredImages.length]
  );

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") {
        navigateLightbox("next");
      } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev");
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, navigateLightbox]);

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
                "radial-gradient(circle at 20% 30%, var(--gold) 0%, transparent 40%)",
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
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Moments</span>
              <span className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-serif mb-6 leading-tight">
              Church <span className="text-gold italic">Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/75 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              Take a visual tour of MercyLife Church Dominion Temple. Experience the warmth of our
              community, the power of our worship services, and the beauty of our fellowship.
            </p>
          </div>
        </section>

        {/* Featured Highlights Carousel */}
        <section className="py-20 bg-secondary/20 border-b border-border/40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-navy font-serif">Featured Moments</h2>
              <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Highlighted snapshots of our church life</p>
            </div>

            <div className="relative px-1 sm:px-10">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {GALLERY_IMAGES.slice(0, 3).map((img, idx) => (
                    <CarouselItem key={img.id}>
                      <div className="overflow-hidden rounded-2xl border border-border shadow-material-2 bg-white flex flex-col md:flex-row items-stretch">
                        <div className="md:w-3/5 relative">
                          <AspectRatio ratio={16 / 10}>
                            <img
                              src={img.src}
                              alt={img.title}
                              className="object-cover w-full h-full hover:scale-[1.02] transition-transform duration-700"
                            />
                          </AspectRatio>
                        </div>
                        <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-between glass-panel-dark text-primary-foreground relative">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider text-gold/90">
                              <span className="flex items-center gap-1 font-serif">
                                <Tag className="w-3.5 h-3.5" /> {img.category}
                              </span>
                              <span>&bull;</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" /> {img.date}
                              </span>
                            </div>
                            <h3 className="text-3xl font-serif leading-tight">{img.title}</h3>
                            <p className="text-primary-foreground/75 text-sm font-light leading-relaxed">
                              {img.desc}
                            </p>
                          </div>
                          <button
                            onClick={() => openLightbox(idx)}
                            className="mt-8 inline-flex items-center justify-center gap-2 text-navy bg-gradient-gold hover:scale-[1.02] active:scale-[0.98] font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full w-fit transition-all cursor-pointer shadow-gold"
                          >
                            <ZoomIn className="w-4 h-4" /> View Fullscreen
                          </button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:inline-flex -left-4 md:-left-12 border border-navy/20 bg-white/80 backdrop-blur-sm text-navy hover:bg-navy hover:text-white cursor-pointer" />
                <CarouselNext className="hidden sm:inline-flex -right-4 md:-right-12 border border-navy/20 bg-white/80 backdrop-blur-sm text-navy hover:bg-navy hover:text-white cursor-pointer" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Gallery Grid & Filter Section */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-border/60 pb-6">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? "bg-navy text-primary-foreground shadow-material-1"
                    : "bg-white/70 border border-border text-muted-foreground hover:border-gold/30 hover:text-navy"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed border-border p-12">
              <p className="text-muted-foreground text-lg">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {filteredImages.map((img, index) => (
                <div
                  key={img.id}
                  onClick={() => openLightbox(index)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 shadow-material-1 hover:shadow-material-2 hover:-translate-y-1 bg-white p-2 transition-all duration-500"
                >
                  <div className="rounded-xl overflow-hidden relative">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={img.src}
                        alt={img.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </AspectRatio>
                    {/* Subtle Gradient Backplate Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                        <span className="inline-block bg-gold text-navy font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {img.category}
                        </span>
                        <h4 className="font-serif text-xl text-primary-foreground leading-tight">{img.title}</h4>
                        <p className="text-primary-foreground/75 text-xs line-clamp-2 leading-relaxed font-light">{img.desc}</p>
                        <div className="flex items-center gap-1.5 text-gold text-xs font-semibold pt-1 uppercase tracking-wider">
                          <ZoomIn className="w-3.5 h-3.5" /> Enlarge Photo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Lightbox Modal Dialog */}
      {lightboxIndex !== null && (
        <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
          <DialogContent className="max-w-5xl bg-navy/90 backdrop-blur-md border border-white/10 p-2 sm:p-6 overflow-hidden flex flex-col justify-center items-center shadow-2xl rounded-2xl w-[95vw] sm:w-full">
            <div className="relative w-full flex flex-col justify-center items-center max-h-[85vh]">
              {/* Media Display Container */}
              <div className="relative w-full flex items-center justify-center bg-black/40 rounded-xl overflow-hidden min-h-[300px] md:min-h-[500px]">
                <img
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain select-none"
                />

                {/* Left/Right Navigation inside Dialog */}
                {filteredImages.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateLightbox("prev");
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy/60 hover:bg-gold hover:text-navy text-primary-foreground border-gold/30 rounded-full h-11 w-11 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateLightbox("next");
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy/60 hover:bg-gold hover:text-navy text-primary-foreground border-gold/30 rounded-full h-11 w-11 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </div>

              {/* Photo Meta and Description at bottom of Dialog */}
              <div className="w-full text-primary-foreground text-left p-4 space-y-2 mt-2 bg-navy-deep/50 rounded-xl border border-gold/10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gold/80">
                  <span className="bg-gold/10 text-gold border border-gold/30 px-2 py-0.5 rounded-md font-serif font-semibold">
                    {filteredImages[lightboxIndex].category}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {filteredImages[lightboxIndex].date}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-primary-foreground">
                  {filteredImages[lightboxIndex].title}
                </h3>
                <p className="text-primary-foreground/75 text-sm sm:text-base leading-relaxed">
                  {filteredImages[lightboxIndex].desc}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
