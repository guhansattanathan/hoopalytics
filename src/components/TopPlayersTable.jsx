import { useEffect, useState } from "react";

export default function TopPlayersTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/"); // Adjust if using /api/top-players/
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading top players...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  const { stat, top_heap_sorted, top_merge_sorted, heap_sort_time, merge_sort_time } = data;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Top 10 Players by {stat}</h2>
      <p className="mb-2">
        Heap sort time: {heap_sort_time}s | Merge sort time: {merge_sort_time}s
      </p>

      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-3 py-1">Rank</th>
            <th className="border border-gray-300 px-3 py-1">Player</th>
            <th className="border border-gray-300 px-3 py-1">{stat} (Heap Sort)</th>
            <th className="border border-gray-300 px-3 py-1">{stat} (Merge Sort)</th>
          </tr>
        </thead>
        <tbody>
          {top_heap_sorted.map((player, index) => (
            <tr key={player.Player} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-3 py-1">{index + 1}</td>
              <td className="border border-gray-300 px-3 py-1">{player.Player}</td>
              <td className="border border-gray-300 px-3 py-1">{player[stat]}</td>
              <td className="border border-gray-300 px-3 py-1">
                {top_merge_sorted[index][stat]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
