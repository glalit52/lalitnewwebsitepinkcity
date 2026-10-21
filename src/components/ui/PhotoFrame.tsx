import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** Path under /public. When absent, the frame shows its decorative fill. */
  src?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  /** Content shown inside the frame when there is no photo. */
  fallback?: ReactNode;
};

/**
 * A shaped image slot. The frame's shape, border and colour come from
 * `className`; the photo (when provided) fills it with object-fit: cover.
 */
export function PhotoFrame({ src, alt, className = "", style, sizes = "(min-width: 768px) 33vw, 100vw", priority, fallback }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  );
}
