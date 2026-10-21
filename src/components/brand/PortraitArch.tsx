import Image from "next/image";

// Scalloped Rajput arch (desktop comp: 320×440; the phone comp is the same shape at 220×300).
const ARCH =
  "M0 440 V190 A40 40 0 0 1 34 140 A40 40 0 0 1 90 92 A46 46 0 0 1 160 52 A46 46 0 0 1 230 92 A40 40 0 0 1 286 140 A40 40 0 0 1 320 190 V440";
const OUTER =
  "M-14 440 V186 A50 50 0 0 1 24 128 A50 50 0 0 1 84 78 A56 56 0 0 1 160 36 A56 56 0 0 1 236 78 A50 50 0 0 1 296 128 A50 50 0 0 1 334 186 V440";

const MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 440' preserveAspectRatio='none'><path d='${ARCH} Z'/></svg>`,
)}")`;

type Props = { src?: string; alt: string };

export function PortraitArch({ src, alt }: Props) {
  return (
    <div className="relative aspect-[320/440] w-[220px] flex-none md:w-[320px]">
      <div
        className="absolute inset-0 bg-maroon"
        style={{ maskImage: MASK, WebkitMaskImage: MASK, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
      >
        {src ? (
          <Image src={src} alt={alt} fill priority sizes="(min-width: 768px) 320px, 220px" className="object-cover" />
        ) : (
          <div role="img" aria-label={alt} className="flex h-full items-center justify-center pt-[25%]">
            <span aria-hidden="true" className="font-display text-[64px] leading-none text-ivory/90 md:text-[92px]">
              LG
            </span>
          </div>
        )}
      </div>
      <svg aria-hidden="true" viewBox="0 0 320 440" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <path d={ARCH} fill="none" stroke="#FFF6EA" strokeWidth="8" />
        <path d={OUTER} fill="none" stroke="#22306B" strokeWidth="3" className="hidden md:inline" />
        <path d="M160 36 V14" stroke="#22306B" strokeWidth="3" className="hidden md:inline" />
        <path d="M160 52 V28" stroke="#22306B" strokeWidth="4" className="md:hidden" />
        <circle cx="160" cy="10" r="6" fill="#F2B33D" stroke="#22306B" strokeWidth="2" className="hidden md:inline" />
        <circle cx="160" cy="23" r="7" fill="#F2B33D" stroke="#22306B" strokeWidth="3" className="md:hidden" />
      </svg>
    </div>
  );
}
