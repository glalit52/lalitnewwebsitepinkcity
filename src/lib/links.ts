/**
 * External links are configured through environment variables so they can be
 * changed without touching code. Anything not configured (or not a valid
 * http(s) URL) resolves to `null`, and the UI hides or replaces the control
 * rather than rendering a link that goes nowhere.
 */
export function safeExternalUrl(value: string | undefined | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const siteUrl =
  safeExternalUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://lalitnewwebsitepinkcity.vercel.app");

export const siteDomain = (() => {
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return "lalitnewwebsitepinkcity.vercel.app";
  }
})();

// `||`, not `??`: a blank `NEXT_PUBLIC_CONTACT_EMAIL=` must fall back too.
export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "lalit@sensegrass.com";

export const externalLinks = {
  email: `mailto:${contactEmail}`,
  topmate: safeExternalUrl(process.env.NEXT_PUBLIC_TOPMATE_URL),
  book: safeExternalUrl(process.env.NEXT_PUBLIC_BOOK_URL),
  bookSample: safeExternalUrl(process.env.NEXT_PUBLIC_BOOK_SAMPLE_URL),
  linkedin: safeExternalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  instagram: safeExternalUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  x: safeExternalUrl(process.env.NEXT_PUBLIC_X_URL),
  facebook: safeExternalUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  whatsapp: safeExternalUrl(process.env.NEXT_PUBLIC_WHATSAPP_URL),
  youtube: safeExternalUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
} as const;

export type SocialId = "email" | "facebook" | "x" | "whatsapp" | "instagram" | "youtube" | "linkedin" | "topmate";
export type SocialLink = { id: SocialId; name: string; url: string };

/**
 * Contact channels in footer order — email first, then the social profiles
 * from the brief (Facebook, X/Twitter, WhatsApp, Instagram, YouTube).
 * Unconfigured ones are skipped.
 */
export function getSocialLinks(): SocialLink[] {
  const all: Array<{ id: SocialId; name: string; url: string | null }> = [
    { id: "email", name: "Email", url: externalLinks.email },
    { id: "facebook", name: "Facebook", url: externalLinks.facebook },
    { id: "x", name: "X (Twitter)", url: externalLinks.x },
    { id: "whatsapp", name: "WhatsApp", url: externalLinks.whatsapp },
    { id: "instagram", name: "Instagram", url: externalLinks.instagram },
    { id: "youtube", name: "YouTube", url: externalLinks.youtube },
    { id: "linkedin", name: "LinkedIn", url: externalLinks.linkedin },
    { id: "topmate", name: "Topmate", url: externalLinks.topmate },
  ];
  return all.filter((s): s is SocialLink => s.url !== null);
}
