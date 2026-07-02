import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Calendar, Tag, ArrowLeft } from "lucide-react";
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

import worshipExperience from "@/assets/worship_experience.jpg";
import youthFellowship from "@/assets/youth_fellowship.png";
import churchArchitecture from "@/assets/church_architecture.png";
import pbAndMinisters from "@/assets/pb-and-ministers.jpeg";
import communityWelcome from "@/assets/community-welcome.jpeg";
import communityWelcome1 from "@/assets/community-welcome-1.jpg";
import heroWorship from "@/assets/hero-worship.jpg";

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
      { property: "og:image", content: worshipExperience },
    ],
  }),
  component: Gallery,
});

/* ── Data ──────────────────────────────────────────────────── */

const CATEGORIES = ["All", "Worship", "Community", "Sanctuary"];

const GALLERY_IMAGES = [
  {
    id: "img1",
    src: worshipExperience,
    title: "Vibrant Friday Night Worship",
    category: "Worship",
    date: "June 2026",
    desc: "Our congregation gathering for a powerful night of praise and worship in the presence of God.",
  },
  {
    id: "img2",
    src: youthFellowship,
    title: "Youth Fellowship & Coffee",
    category: "Community",
    date: "May 2026",
    desc: "A warm afternoon fellowship with our youth ministry team, sharing stories and growing together.",
  },
  {
    id: "img3",
    src: churchArchitecture,
    title: "The Main Sanctuary",
    category: "Sanctuary",
    date: "April 2026",
    desc: "The peaceful architecture of the Dominion Temple sanctuary before the start of Sunday service.",
  },
  {
    id: "img4",
    src: pbAndMinisters,
    title: "Leadership & Ministers",
    category: "Community",
    date: "May 2026",
    desc: "Our pastoral leadership team and ministers greeting the congregation during a special event.",
  },
  {
    id: "img5",
    src: communityWelcome,
    title: "Sunday Morning Fellowship",
    category: "Community",
    date: "April 2026",
    desc: "Welcoming faces in our foyer, sharing smiles before the service starts.",
  },
  {
    id: "img6",
    src: communityWelcome1,
    title: "Community Growth Groups",
    category: "Community",
    date: "March 2026",
    desc: "Members of our small groups connecting and discussing the Word in Arlington.",
  },
  {
    id: "img7",
    src: heroWorship,
    title: "Praise & Adoration",
    category: "Worship",
    date: "February 2026",
    desc: "Passionate worship leaders leading the congregation during Sunday Morning Service.",
  },
];

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
        <section className="bg-navy text-primary-foreground py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, var(--gold) 0%, transparent 40%)",
            }}
          />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
            <span className="gold-rule mx-auto" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif">
              Church <span className="text-gold italic">Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed font-sans">
              Take a visual tour of MercyLife Church Dominion Temple. Experience the warmth of our
              community, the power of our worship services, and the beauty of our fellowship.
            </p>
          </div>
        </section>

        {/* Featured Highlights Carousel */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl text-navy">Featured Moments</h2>
              <p className="text-muted-foreground mt-2">Highlighted snapshots of our church life</p>
            </div>

            <div className="relative px-1 sm:px-10">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {GALLERY_IMAGES.slice(0, 3).map((img, idx) => (
                    <CarouselItem key={img.id}>
                      <div className="overflow-hidden rounded-2xl border border-border shadow-elegant bg-card flex flex-col md:flex-row items-stretch">
                        <div className="md:w-3/5 relative">
                          <AspectRatio ratio={16 / 10}>
                            <img
                              src={img.src}
                              alt={img.title}
                              className="object-cover w-full h-full hover:scale-102 transition-transform duration-700"
                            />
                          </AspectRatio>
                        </div>
                        <div className="md:w-2/5 p-8 flex flex-col justify-between bg-navy text-primary-foreground">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-xs text-gold/80">
                              <span className="flex items-center gap-1 font-serif">
                                <Tag className="w-3.5 h-3.5" /> {img.category}
                              </span>
                              <span>&bull;</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" /> {img.date}
                              </span>
                            </div>
                            <h3 className="text-3xl font-serif">{img.title}</h3>
                            <p className="text-primary-foreground/70 text-sm leading-relaxed">
                              {img.desc}
                            </p>
                          </div>
                          <button
                            onClick={() => openLightbox(idx)}
                            className="mt-6 inline-flex items-center gap-2 text-gold hover:text-primary-foreground font-medium text-sm transition-colors border border-gold/40 hover:border-gold px-4 py-2 rounded-full w-fit cursor-pointer"
                          >
                            <ZoomIn className="w-4 h-4" /> View Fullscreen
                          </button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:inline-flex -left-4 md:-left-12 border-navy text-navy hover:bg-navy hover:text-primary-foreground cursor-pointer" />
                <CarouselNext className="hidden sm:inline-flex -right-4 md:-right-12 border-navy text-navy hover:bg-navy hover:text-primary-foreground cursor-pointer" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Gallery Grid & Filter Section */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-border pb-6">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? "bg-navy text-primary-foreground shadow-elegant"
                    : "bg-secondary text-navy hover:bg-navy/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground text-lg">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredImages.map((img, index) => (
                <div
                  key={img.id}
                  onClick={() => openLightbox(index)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border shadow-md hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 bg-card"
                >
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={img.src}
                      alt={img.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </AspectRatio>
                  {/* Subtle Gradient Backplate Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                      <span className="inline-block bg-gold text-navy font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {img.category}
                      </span>
                      <h4 className="font-serif text-xl text-primary-foreground">{img.title}</h4>
                      <p className="text-primary-foreground/80 text-xs line-clamp-2">{img.desc}</p>
                      <div className="flex items-center gap-1.5 text-gold text-xs font-semibold pt-1">
                        <ZoomIn className="w-3.5 h-3.5" /> Enlarge Photo
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
          <DialogContent className="max-w-5xl bg-navy/95 border-gold/30 p-2 sm:p-6 overflow-hidden flex flex-col justify-center items-center shadow-2xl rounded-2xl w-[95vw] sm:w-full">
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
