export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scales = { sm: "h-7", md: "h-9", lg: "h-12" };
  return (
    <div className={`flex items-center gap-2 ${scales[size]}`}>
      <svg
        viewBox="0 0 40 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-hidden="true"
      >
        {/* Tank body */}
        <ellipse cx="20" cy="10" rx="16" ry="5" fill="#F7941D" />
        <rect x="4" y="10" width="32" height="28" fill="#F7941D" rx="1" />
        <ellipse cx="20" cy="38" rx="16" ry="5" fill="#c8720e" />
        {/* Ribs */}
        <line
          x1="4"
          y1="19"
          x2="36"
          y2="19"
          stroke="#c8720e"
          strokeWidth="1.5"
        />
        <line
          x1="4"
          y1="28"
          x2="36"
          y2="28"
          stroke="#c8720e"
          strokeWidth="1.5"
        />
        {/* Lid */}
        <ellipse cx="20" cy="10" rx="8" ry="2.5" fill="#002147" />
        {/* Outlet */}
        <rect x="16" y="42" width="8" height="4" rx="1" fill="#002147" />
      </svg>
      <span
        className="font-display font-black tracking-tight text-primary leading-none"
        style={{
          fontSize:
            size === "sm" ? "1.1rem" : size === "md" ? "1.4rem" : "1.8rem",
        }}
      >
        KENT<span className="text-secondary">AINERS</span>
      </span>
    </div>
  );
}
