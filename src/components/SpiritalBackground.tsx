import * as stylex from "@stylexjs/stylex";

// SVG asset URLs from Figma export (replace with your asset URLs as needed)
const svgLayers = [
  "http://localhost:3845/assets/1be06065dfbc84d262afef78aeec789eab86ef98.svg",
  "http://localhost:3845/assets/524cc6f9dd0b258e50d5eb61db2b0215af6a07e1.svg",
  "http://localhost:3845/assets/f175fd818bffaa0ddbbcc59143300e3f7451c22d.svg",
  "http://localhost:3845/assets/dc2f6ea66a5ee4e6b55b46cdb1ca33fa4276d01d.svg",
  "http://localhost:3845/assets/0f00150abde28a321a6ee1ed1c4e055c4545f450.svg",
  "http://localhost:3845/assets/0973a11e7f115345acaf81a91b8c958668c90184.svg",
  "http://localhost:3845/assets/7bd1d25eddac4e4c49af5eac5c71d527ef01ed6d.svg",
  "http://localhost:3845/assets/75568707a7175ed487fbd6f2a73c7f5d160f5b7b.svg",
  "http://localhost:3845/assets/68fe31690903609d31fe7d66f34fdb4807e71a75.svg",
  "http://localhost:3845/assets/68235fe32d4b94c872e7f45f9996b94ffcd4b09f.svg",
  "http://localhost:3845/assets/805ece56767dfa834a5608cea9703cbd659fa649.svg",
  "http://localhost:3845/assets/1b621180c1970f0c635df1cac83b0019b9cbc107.svg",
  "http://localhost:3845/assets/0af1b7022aaf59b804a9dbe1f1eb88dce422d2d3.svg",
  "http://localhost:3845/assets/d61b1aaa581f2440ca04a4ab90b6eb66695709c3.svg",
  "http://localhost:3845/assets/f9b19d2fdaa95a9e4d79f3ace572505bfe35ab59.svg",
  "http://localhost:3845/assets/08a56a47e725f9d3a18a444be2c51a59c2750437.svg",
];

export default function SpiritalBackground() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      {svgLayers.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          {...stylex.props(styles.layer)}
        />
      ))}
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
  layer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.5,
  },
});
