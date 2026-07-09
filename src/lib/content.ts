/**
 * Content Loading Utilities
 *
 * Uses Vite's import.meta.glob to load all CMS-managed JSON content
 * at build time. When Decap CMS commits a change to the repo,
 * Netlify rebuilds and these globs pick up the new/updated files.
 */

/* ── Types ─────────────────────────────────────────────────── */

export interface ChurchEvent {
  id: string;
  title: string;
  image?: string;
  category: "Worship" | "Community" | "Youth" | "Special";
  date: string;
  rawDate: string;
  time: string;
  location: string;
  speaker?: string;
  description: string;
  isFeatured?: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  src: string;
  category: string;
  date: string;
  desc: string;
}

export interface SermonNotes {
  outline: string[];
  scriptures: string[];
  reflection: string[];
}

export interface Sermon {
  id: string;
  youtubeId: string;
  title: string;
  preacher: string;
  series: string;
  date: string;
  scripture: string;
  cover: string;
  duration: string;
  notes: SermonNotes;
}

export interface ServiceTime {
  day: string;
  name: string;
  time: string;
  description: string;
}

export interface SiteSettings {
  phone_display: string;
  phone_href: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_full: string;
  instagram_url: string;
  instagram_handle: string;
  youtube_url: string;
  youtube_handle: string;
  services: ServiceTime[];
}

export interface HeroContent {
  location_badge: string;
  schedule_badge: string;
  title_line1: string;
  title_highlight: string;
  title_subtitle: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface AboutContent {
  heading: string;
  heading_highlight: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
}

export interface PastorContent {
  label: string;
  name: string;
  title: string;
  quote: string;
  bio_intro: string;
  global_influence: string;
  global_influence_2: string;
  prophetic_grace: string;
  education: string;
  image: string;
  stat1_value: string;
  stat1_label: string;
  stat2_value: string;
  stat2_label: string;
}

export interface HomepageContent {
  hero: HeroContent;
  about: AboutContent;
  pastor: PastorContent;
  mission: string;
  vision: string[];
}

/* ── Glob Imports (build-time) ─────────────────────────────── */

// Vite eagerly imports all matching JSON files at build time.
// Each module's `default` export is the parsed JSON object.

const eventModules = import.meta.glob<{ default: Record<string, unknown> }>(
  "/content/events/*.json",
  { eager: true }
);

const galleryModules = import.meta.glob<{ default: Record<string, unknown> }>(
  "/content/gallery/*.json",
  { eager: true }
);

const sermonModules = import.meta.glob<{ default: Record<string, unknown> }>(
  "/content/sermons/*.json",
  { eager: true }
);

const settingsModules = import.meta.glob<{ default: SiteSettings }>(
  "/content/settings/general.json",
  { eager: true }
);

const homepageModules = import.meta.glob<{ default: HomepageContent }>(
  "/content/pages/homepage.json",
  { eager: true }
);

/* ── Helper: extract ID from file path ─────────────────────── */

function fileId(path: string): string {
  // "/content/events/friday-power.json" → "friday-power"
  const filename = path.split("/").pop() ?? "";
  return filename.replace(/\.json$/, "");
}

/* ── Public API ────────────────────────────────────────────── */

/**
 * Returns all events, sorted with recurring first, then by rawDate ascending.
 */
export function getEvents(): ChurchEvent[] {
  return Object.entries(eventModules)
    .map(([path, mod]) => {
      const data = (mod as any).default ?? mod;
      return {
        id: `evt-${fileId(path)}`,
        ...data,
      } as ChurchEvent;
    })
    .sort((a, b) => {
      // Recurring events always come first
      if (a.rawDate === "Recurring" && b.rawDate !== "Recurring") return -1;
      if (a.rawDate !== "Recurring" && b.rawDate === "Recurring") return 1;
      if (a.rawDate === "Recurring" && b.rawDate === "Recurring")
        return a.title.localeCompare(b.title);
      // Then sort by date ascending
      return a.rawDate.localeCompare(b.rawDate);
    });
}

/**
 * Returns all gallery images.
 */
export function getGalleryImages(): GalleryImage[] {
  return Object.entries(galleryModules).map(([path, mod]) => {
    const data = (mod as any).default ?? mod;
    return {
      id: `img-${fileId(path)}`,
      ...data,
    } as GalleryImage;
  });
}

/**
 * Returns all sermons, sorted by date descending (newest first).
 */
export function getSermons(): Sermon[] {
  return Object.entries(sermonModules)
    .map(([path, mod]) => {
      const data = (mod as any).default ?? mod;
      return {
        id: `sermon-${fileId(path)}`,
        ...data,
      } as Sermon;
    })
    .sort((a, b) => {
      // Sort by date descending — parse human-readable dates
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (isNaN(dateA) || isNaN(dateB)) return 0;
      return dateB - dateA;
    });
}

/**
 * Returns site settings (contact, social, services).
 */
export function getSiteSettings(): SiteSettings {
  const entries = Object.values(settingsModules);
  if (entries.length > 0) {
    const mod = entries[0];
    return ((mod as any).default ?? mod) as SiteSettings;
  }
  // Fallback defaults
  return {
    phone_display: "(817) 677-1407",
    phone_href: "tel:+18176771407",
    address_street: "3100 Pleasant Valley Ln",
    address_city: "Arlington",
    address_state: "TX",
    address_zip: "76015",
    address_full: "3100 Pleasant Valley Ln, Arlington, TX 76015",
    instagram_url: "https://www.instagram.com/mercylife_dallas",
    instagram_handle: "@mercylife_dallas",
    youtube_url: "https://www.youtube.com/@brianamoatengtv",
    youtube_handle: "@brianamoatengtv",
    services: [],
  };
}

/**
 * Returns homepage content (hero, about, pastor, mission/vision).
 */
export function getHomepageContent(): HomepageContent {
  const entries = Object.values(homepageModules);
  if (entries.length > 0) {
    const mod = entries[0];
    return ((mod as any).default ?? mod) as HomepageContent;
  }
  // Should never happen — fallback
  throw new Error("Homepage content file not found");
}

/* ── Derived Helpers ───────────────────────────────────────── */

/**
 * Builds Google Maps URLs from the site settings address.
 */
export function getMapsUrls(settings: SiteSettings) {
  const query = encodeURIComponent("MercyLife Church " + settings.address_full);
  return {
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${query}`,
    embedUrl: `https://www.google.com/maps?q=${query}&output=embed`,
  };
}
