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

/**
 * Hero window: a photo (Hawa Mahal) inside the scalloped arch, with two painted
 * jharokha shutters that swing open, close and reopen a couple of times, then settle open
 * (.jharokha-door in globals.css).
 * The shutters sit inside the masked layer so they clip to the arch; each carries its
 * own perspective() in the keyframes because the mask flattens 3D. Under reduced
 * motion the shutters are display:none and the photo simply shows.
 */
export function HawaMahalWindow({ src, alt }: Props) {
  return (
    <div className="jharokha relative aspect-[320/440] w-[220px] flex-none md:w-[320px] drop-shadow-[0_16px_32px_rgba(142,59,44,0.32)]">
      <div
        className="absolute inset-0 bg-maroon"
        style={{ maskImage: MASK, WebkitMaskImage: MASK, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
      >
        {src ? (
          <Image src={src} alt={alt} fill preload sizes="(min-width: 768px) 320px, 220px" className="object-cover" />
        ) : (
          <div role="img" aria-label={alt} className="flex h-full items-center justify-center pt-[25%]">
            <span aria-hidden="true" className="font-display text-[64px] leading-none text-ivory/90 md:text-[92px]">
              LG
            </span>
          </div>
        )}
        <Shutter side="left" />
        <Shutter side="right" />
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

/**
 * One painted shutter, drawn as the left half of the 320×440 arch (the right one is
 * mirrored inside the SVG, since the CSS transform belongs to the animation).
 * Maroon leaf, marigold frame following the scallop, a terracotta jaali panel with an
 * arched top, a plain lower panel with a rosette, and a knob by the meeting edge.
 */
function Shutter({ side }: { side: "left" | "right" }) {
  const jaali = `jaali-${side}`;
  return (
    <div
      aria-hidden="true"
      className={`jharokha-door jharokha-door-${side} pointer-events-none absolute inset-y-0 w-1/2 ${side === "left" ? "left-0" : "right-0"}`}
    >
      <svg viewBox="0 0 160 440" className="block h-full w-full">
        <defs>
          <pattern id={jaali} width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#C2604C" />
            <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="none" stroke="#FFF6EA" strokeOpacity="0.75" strokeWidth="1.4" />
            <circle cx="6" cy="6" r="1.3" fill="#F2B33D" />
          </pattern>
        </defs>
        <g transform={side === "right" ? "matrix(-1 0 0 1 160 0)" : undefined}>
          <rect width="160" height="440" fill="#8E3B2C" />
          {/* Inner frame: the arch inset by ~16px, so it follows the scallop. */}
          <path d={`${ARCH} Z`} transform="translate(16 18) scale(0.9)" fill="none" stroke="#F2B33D" strokeWidth="3" />
          {/* Jaali panel with an arched head. */}
          <path
            d="M32 290 V198 A55 55 0 0 1 142 198 V290 Z"
            fill={`url(#${jaali})`}
            stroke="#FFF6EA"
            strokeWidth="3"
          />
          {/* Lower panel with a small rosette. */}
          <rect x="32" y="308" width="110" height="92" rx="3" fill="#C2604C" stroke="#FFF6EA" strokeWidth="3" />
          <path d="M87 330 L111 354 L87 378 L63 354 Z" fill="none" stroke="#F2B33D" strokeWidth="2.5" />
          <circle cx="87" cy="354" r="6" fill="#F2B33D" />
          {/* Meeting stile and knob. */}
          <path d="M159 0 V440" stroke="#22306B" strokeOpacity="0.55" strokeWidth="2" />
          <circle cx="150" cy="299" r="4.5" fill="#F2B33D" stroke="#22306B" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}
