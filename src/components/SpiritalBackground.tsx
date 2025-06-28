import * as stylex from "@stylexjs/stylex";
import bgUrl from "../assets/Spirital-03.svg";

export default function SpiritalBackground() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <img src={bgUrl} alt="" aria-hidden="true" {...stylex.props(styles.bg)} />
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    position: "absolute",
    inset: 0,
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: 0,
    overflow: "hidden",
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.5,
  },
});
