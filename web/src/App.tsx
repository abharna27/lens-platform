import { useState } from "react";
import { Watchlist } from "./components/watchlist";

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  return (
    <div style={{ display: "flex" }}>
      <Watchlist selectedSymbol={selectedSymbol} onSelect={setSelectedSymbol} />
      <div>
        {selectedSymbol ? `Selected: ${selectedSymbol}` : "Pick a symbol"}
      </div>
    </div>
  );
}

export default App; 