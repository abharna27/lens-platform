import { useState } from "react";
import { Watchlist } from "./components/Watchlist";
import { PriceChart } from "./components/PriceChart";

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>("RELIANCE.NS");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <aside
        style={{
          width: "240px",
          borderRight: "1px solid #e4e4e7",
          padding: "1.5rem 1rem",
          backgroundColor: "#fafafa",
        }}
      >
        <h2 style={{ margin: "0 0 1rem 0.5rem", fontSize: "1.1rem" }}>Watchlist</h2>
        <Watchlist selectedSymbol={selectedSymbol} onSelect={setSelectedSymbol} />
      </aside>
      <main style={{ flex: 1, padding: "1.5rem 2rem" }}>
        <PriceChart symbol={selectedSymbol} />
      </main>
    </div>
  );
}

export default App;
