import { useQuery } from "@tanstack/react-query";
import { getEntities } from "../lib/api";

type Props = {
    selectedSymbol: string | null;
    onSelect: (symbol: string) => void;
};

export function Watchlist({ selectedSymbol, onSelect }: Props) {
    const { data: entities, isLoading, error } = useQuery({
        queryKey: ["entities"],
        queryFn: getEntities,
    });

    if (isLoading) return <p>Loading watchlist...</p>;
    if (error) return <p>Error loading watchlist</p>;

    return (
        <ul>
            {entities?.map((e) => (
                <li key={e.id}>
                    <button
                        onClick={() => onSelect(e.symbol)}
                        style={{ fontWeight: e.symbol === selectedSymbol ? "bold" : "normal" }}
                    >
                        {e.symbol}
                    </button>
                </li>
            ))}
        </ul>
    );
}