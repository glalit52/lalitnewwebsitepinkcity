const CHHATRI_X = [90, 240, 390, 1050, 1200, 1350];

/**
 * Hawa Mahal + chhatri skyline. The viewBox is cropped with "slice", so on a
 * phone (130px tall) only the palace centre shows — matching the mobile comp.
 */
export function JaipurSkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 200"
      preserveAspectRatio="xMidYMax slice"
      className={`block h-[130px] w-full md:h-[200px] ${className}`}
    >
      <defs>
        <pattern id="hawa-windows" width="18" height="26" patternUnits="userSpaceOnUse">
          <path d="M4 26 V13 A5 5 0 0 1 14 13 V26 Z" fill="#E7A08C" opacity=".6" />
        </pattern>
        <g id="chhatri">
          <rect x="-1.5" y="62" width="3" height="14" fill="#22306B" />
          <circle cx="0" cy="62" r="3.5" fill="#22306B" />
          <path d="M-28 112 Q-28 82 0 76 Q28 82 28 112 Z" fill="#22306B" />
          <rect x="-34" y="112" width="68" height="8" fill="#22306B" />
          <rect x="-26" y="120" width="52" height="32" fill="#22306B" />
          <path d="M-20 152 V134 A8 8 0 0 1 -4 134 V152 Z M4 152 V134 A8 8 0 0 1 20 134 V152 Z" fill="#E7A08C" />
        </g>
      </defs>
      <rect x="0" y="150" width="1440" height="50" fill="#22306B" />
      {CHHATRI_X.map((x) => (
        <use key={x} href="#chhatri" x={x} className="hidden md:inline" />
      ))}
      <g fill="#22306B">
        <rect x="500" y="104" width="440" height="50" />
        <rect x="560" y="70" width="320" height="36" />
        <rect x="620" y="44" width="200" height="28" />
        <rect x="670" y="24" width="100" height="22" />
        <path d="M501 104 Q501 86 515 82 Q529 86 529 104 Z M911 104 Q911 86 925 82 Q939 86 939 104 Z M563 70 Q563 54 575 51 Q587 54 587 70 Z M853 70 Q853 54 865 51 Q877 54 877 70 Z M624 44 Q624 30 635 26 Q646 30 646 44 Z M794 44 Q794 30 805 26 Q816 30 816 44 Z M706 24 Q706 6 720 2 Q734 6 734 24 Z M682 24 Q682 14 690 12 Q698 14 698 24 Z M742 24 Q742 14 750 12 Q758 14 758 24 Z" />
      </g>
      <g fill="url(#hawa-windows)">
        <rect x="512" y="110" width="416" height="40" />
        <rect x="572" y="76" width="296" height="26" />
        <rect x="630" y="48" width="180" height="22" />
      </g>
    </svg>
  );
}
