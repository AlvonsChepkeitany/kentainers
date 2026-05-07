export default function SepticTankSvg({
  className = "",
}: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 180"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shadow */}
      <ellipse cx="120" cy="168" rx="85" ry="10" fill="rgba(0,0,0,0.12)" />
      {/* Main tank body – horizontal cylinder */}
      <ellipse cx="190" cy="110" rx="30" ry="50" fill="#4a4a5a" />
      <rect x="50" y="60" width="140" height="100" fill="#5a5a6e" />
      <ellipse cx="50" cy="110" rx="30" ry="50" fill="#6a6a7e" />
      {/* Tank face highlight */}
      <ellipse cx="50" cy="110" rx="22" ry="37" fill="#7a7a8e" />
      {/* Belly stripe */}
      <rect
        x="50"
        y="105"
        width="140"
        height="10"
        rx="0"
        fill="rgba(0,0,0,0.08)"
      />
      {/* Access hatches on top */}
      <ellipse cx="85" cy="62" rx="18" ry="7" fill="#3a3a4a" />
      <ellipse cx="85" cy="60" rx="14" ry="5" fill="#2a2a3a" />
      <ellipse cx="150" cy="62" rx="18" ry="7" fill="#3a3a4a" />
      <ellipse cx="150" cy="60" rx="14" ry="5" fill="#2a2a3a" />
      {/* Inlet pipe left */}
      <rect x="10" y="104" width="40" height="12" rx="3" fill="#444" />
      {/* Outlet pipe right */}
      <rect x="190" y="104" width="40" height="12" rx="3" fill="#3a3a4a" />
      {/* Highlight */}
      <ellipse cx="50" cy="80" rx="10" ry="20" fill="rgba(255,255,255,0.08)" />
    </svg>
  );
}
