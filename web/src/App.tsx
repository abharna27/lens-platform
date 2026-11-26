import { useQuery } from "@tanstack/react-query";
import { getEntities } from "./lib/api";

function App() {
  const { data: entities, isLoading, error } = useQuery({
    queryKey: ["entities"],
    queryFn: getEntities,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h1>Lens</h1>
      <ul>
        {entities?.map((e) => (
          <li key={e.id}>{e.symbol} — {e.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;