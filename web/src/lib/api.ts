const API_BASE = "http://localhost:8000";

export type Entity = {
  id: number;
  symbol: string;
  name: string;
};

export type MarketBar = {
  ts: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export function getEntities(): Promise<Entity[]> {
  return fetch(`${API_BASE}/api/v1/entities`).then(handleResponse<Entity[]>);
}

export function getBars(symbol: string, limit = 200): Promise<MarketBar[]> {
  return fetch(`${API_BASE}/api/v1/entities/${symbol}/bars?limit=${limit}`).then(
    handleResponse<MarketBar[]>
  );
}