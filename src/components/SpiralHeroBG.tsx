import * as stylex from "@stylexjs/stylex";

export default function SpiralHeroBG() {
  // This SVG mimics the Figma spiral: 16 rotated, blurred petals with color stops
  return (
    <div {...stylex.props(styles.bgWrap)}>
      <svg
        viewBox="0 0 1200 900"
        width="100%"
        height="100%"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="spiral-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#ffb6ff" stopOpacity="1" />
            <stop offset="60%" stopColor="#6b57ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>
        {[...Array(16)].map((_, i) => (
          <ellipse
            key={i}
            cx={900}
            cy={200}
            rx={350 - i * 10}
            ry={120 + i * 8}
            fill={`url(#spiral-grad)`}
            opacity={0.18 + 0.04 * (i % 3)}
            transform={`rotate(${i * 22.5} 900 200)`}
            filter="url(#blur)"
          />
        ))}
      </svg>
    </div>
  );
}

const styles = stylex.create({
  bgWrap: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100vw",
    height: "min(900px, 60vw)",
    maxWidth: "100vw",
    zIndex: 0,
    pointerEvents: "none",
    overflow: "hidden",
  },
});
