import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import { getBars } from "../lib/api";

type Props = {
  symbol: string | null;
};

export function PriceChart({ symbol }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const { data: bars, isLoading, error } = useQuery({
    queryKey: ["bars", symbol],
    queryFn: () => (symbol ? getBars(symbol, 200) : Promise.resolve([])),
    enabled: Boolean(symbol),
  });

  useEffect(() => {
    if (!chartContainerRef.current || !bars || bars.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: "#18181b" },
        textColor: "#d4d4d8",
      },
      grid: {
        vertLines: { color: "#27272a" },
        horzLines: { color: "#27272a" },
      },
      timeScale: {
        borderColor: "#3f3f46",
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    // Lightweight charts requires sorted unique dates in YYYY-MM-DD or timestamp
    const formattedData = bars
      .map((bar) => ({
        time: bar.ts.slice(0, 10),
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
      }))
      .sort((a, b) => a.time.localeCompare(b.time));

    // Remove any duplicate dates (e.g. if timezones collapse to same date)
    const uniqueData = formattedData.filter(
      (item, index, self) => index === 0 || item.time !== self[index - 1].time
    );

    series.setData(uniqueData);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [bars]);

  if (!symbol) {
    return (
      <div style={{ padding: "2rem", color: "#71717a" }}>
        Select a stock from the watchlist to view its price chart.
      </div>
    );
  }

  if (isLoading) {
    return <p style={{ padding: "1rem" }}>Loading price chart for {symbol}...</p>;
  }

  if (error) {
    return <p style={{ padding: "1rem", color: "#ef4444" }}>Error loading chart data.</p>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>{symbol} — Historical Daily Bars</h2>
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: "400px", borderRadius: "8px", overflow: "hidden" }}
      />
    </div>
  );
}
