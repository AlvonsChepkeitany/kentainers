export default function WaterTankSvg({
  className = "",
}: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shadow */}
      <ellipse cx="100" cy="228" rx="55" ry="10" fill="rgba(0,33,71,0.12)" />
      {/* Body */}
      <rect x="30" y="50" width="140" height="165" rx="4" fill="#002147" />
      {/* Ribs */}
      {[80, 108, 136, 164].map((y) => (
        <rect
          key={y}
          x="30"
          y={y}
          width="140"
          height="6"
          rx="2"
          fill="#001633"
        />
      ))}
      {/* Top cap */}
      <ellipse cx="100" cy="50" rx="70" ry="16" fill="#003580" />
      <ellipse cx="100" cy="50" rx="50" ry="11" fill="#002147" />
      {/* Lid */}
      <ellipse cx="100" cy="40" rx="28" ry="7" fill="#001020" />
      <rect x="86" y="30" width="28" height="12" rx="3" fill="#001020" />
      {/* Bottom edge */}
      <ellipse cx="100" cy="215" rx="70" ry="8" fill="#001633" />
      {/* Outlet pipe */}
      <rect x="86" y="213" width="28" height="10" rx="2" fill="#444" />
      <rect x="90" y="222" width="20" height="5" rx="1" fill="#333" />
      {/* Highlight */}
      <rect
        x="36"
        y="70"
        width="8"
        height="120"
        rx="4"
        fill="rgba(255,255,255,0.07)"
      />
    </svg>
  );
}
