export type GalleryItem = {
  id: string;
  src: string;
  feature?: boolean;
  badge?: "oc" | "fanart";
};

export type WebItem = {
  id: string;
  src: string;
  badgeKey: string;
  wide?: boolean;
};

export const images = {
  heroCover: "/images/hero-cover.jpg",
  closingCard: "/images/closing-card.jpg",
  fashionSketches: "/images/fashion-sketches.jpg",
} as const;

export const illustrationItems: GalleryItem[] = [
  { id: "oc1", src: "/images/oc-1.jpg", feature: true, badge: "oc" },
  { id: "oc2", src: "/images/oc-2.jpg", badge: "oc" },
  { id: "oc3", src: "/images/oc-3.jpg", badge: "oc" },
  { id: "oc4", src: "/images/oc-4.jpg", feature: true, badge: "oc" },
  { id: "mirko", src: "/images/mirko-fanart.jpg", feature: true, badge: "fanart" },
];

export const merchItems: GalleryItem[] = [
  { id: "merch1", src: "/images/merch-1.jpg" },
  { id: "merch2", src: "/images/merch-2.jpg" },
];

export const brandingItems: GalleryItem[] = [
  { id: "logo", src: "/images/montaraz-logo.jpg" },
  { id: "conceptos", src: "/images/montaraz-conceptos.jpg" },
  { id: "social", src: "/images/montaraz-social.jpg" },
  { id: "fashionBook", src: "/images/fashion-book.jpg" },
  { id: "flyer", src: "/images/flyer.jpg", feature: true },
  { id: "fashionBookInterior", src: "/images/fashion-book-interior.jpg" },
];

export const webItems: WebItem[] = [
  { id: "laptop", src: "/images/fisiokids-laptop.jpg", badgeKey: "mockup", wide: true },
  { id: "home", src: "/images/fisiokids-home.jpg", badgeKey: "home" },
  { id: "hero", src: "/images/fisiokids-hero.jpg", badgeKey: "hero" },
  { id: "services", src: "/images/fisiokids-services.jpg", badgeKey: "services" },
  { id: "team", src: "/images/fisiokids-team.jpg", badgeKey: "team" },
  { id: "contact", src: "/images/fisiokids-contact.jpg", badgeKey: "contact" },
  { id: "footer", src: "/images/fisiokids-footer.jpg", badgeKey: "footer" },
];

export const skills = [
  { key: "digitalIllustration", width: "92%" },
  { key: "brandIdentity", width: "85%" },
  { key: "characterDesign", width: "90%" },
  { key: "webDesign", width: "75%" },
  { key: "fashionDesign", width: "78%" },
] as const;
