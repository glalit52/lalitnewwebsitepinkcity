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
  safeExternalUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://lalitgautam.com";

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "lalit@sensegrass.com";

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
} as const;

export type SocialLink = { name: string; url: string };

/** Social profiles and contact channels; unconfigured ones are skipped. */
export function getSocialLinks(): SocialLink[] {
  const all: Array<{ name: string; url: string | null }> = [
    { name: "Email", url: externalLinks.email },
    { name: "LinkedIn", url: externalLinks.linkedin },
    { name: "Instagram", url: externalLinks.instagram },
    { name: "X", url: externalLinks.x },
    { name: "Facebook", url: externalLinks.facebook },
    { name: "Topmate", url: externalLinks.topmate },
    { name: "WhatsApp", url: externalLinks.whatsapp },
  ];
  return all.filter((s): s is SocialLink => s.url !== null);
}
