export default function SilageSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shadow */}
      <ellipse cx="120" cy="190" rx="90" ry="9" fill="rgba(0,0,0,0.12)" />
      {/* Main body */}
      <rect x="20" y="70" width="200" height="110" rx="6" fill="#1a5c2e" />
      {/* Lid / top */}
      <rect x="15" y="58" width="210" height="18" rx="4" fill="#145224" />
      {/* Ribs vertical */}
      {[60, 100, 140, 180].map((x) => (
        <rect
          key={x}
          x={x}
          y="70"
          width="8"
          height="110"
          rx="2"
          fill="rgba(0,0,0,0.12)"
        />
      ))}
      {/* Horizontal rib */}
      <rect
        x="20"
        y="128"
        width="200"
        height="6"
        rx="2"
        fill="rgba(0,0,0,0.1)"
      />
      {/* Front face – perspective */}
      <polygon points="220,70 240,55 240,165 220,180" fill="#0f3d1f" />
      {/* Top right perspective */}
      <polygon points="15,58 225,58 240,45 0,45" fill="#1e6635" />
      {/* Access door */}
      <rect x="90" y="140" width="60" height="38" rx="3" fill="#0f3d1f" />
      <rect x="93" y="143" width="54" height="32" rx="2" fill="#145224" />
      {/* Door handle */}
      <rect x="117" y="157" width="6" height="10" rx="2" fill="#F7941D" />
      {/* Highlight */}
      <rect
        x="26"
        y="76"
        width="10"
        height="98"
        rx="5"
        fill="rgba(255,255,255,0.07)"
      />
    </svg>
  );
}
