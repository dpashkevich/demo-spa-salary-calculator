import SalaryCalculatorPage from "./SalaryCalculatorPage";
import SpiritalBackground from "./components/SpiritalBackground";

function App() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <SpiritalBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SalaryCalculatorPage />
      </div>
    </div>
  );
}

export default App;
