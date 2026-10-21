const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/** Eight-petal lotus mark used beside the name in the header. */
export function LotusMark({ size = 40 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 40 40" className="flex-none">
      <g fill="#E7A08C">
        {PETAL_ANGLES.map((a) => (
          <ellipse key={a} cx="20" cy="9" rx="4.5" ry="8" transform={a ? `rotate(${a} 20 20)` : undefined} />
        ))}
      </g>
      <circle cx="20" cy="20" r="6" fill="#F2B33D" />
    </svg>
  );
}

const ROSETTE_ANGLES = [0, 60, 120, 180, 240, 300];

/** Six-petal block-print rosette used on visa tiles. */
export function Rosette({ size = 48 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 40 40" className="flex-none">
      <circle cx="20" cy="20" r="19" fill="#FFF6EA" />
      <g fill="#4A68B0">
        {ROSETTE_ANGLES.map((a) => (
          <ellipse key={a} cx="20" cy="10" rx="3.6" ry="7" transform={a ? `rotate(${a} 20 20)` : undefined} />
        ))}
      </g>
      <circle cx="20" cy="20" r="4.5" fill="#F2B33D" />
    </svg>
  );
}
