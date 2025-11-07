import { useEffect, useState } from "react";

export default function TopPlayersTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Django API at the root URL (localhost:8000/)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching from the root URL, as instructed
        const response = await fetch("http://127.0.0.1:8000/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Display user-friendly error
        setError(`Failed to fetch data. Ensure your backend server is running at ${window.location.origin}: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="p-8 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-2 text-gray-600">Loading top players...</p>
    </div>
  );
  
  if (error) return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <p className="font-bold">Error Loading Data</p>
      <p className="text-sm">{error}</p>
    </div>
  );
  
  if (!data || !data.top_merge_sorted || data.top_merge_sorted.length === 0) {
    return <p className="p-4 text-center text-gray-500">No top player data available.</p>;
  }

  const { stat, top_merge_sorted, heap_sort_time, merge_sort_time } = data;
  
  // Decide which sort was faster for display
  const fasterSort = merge_sort_time < heap_sort_time ? 'Merge Sort' : 'Heap Sort';
  const displayList = top_merge_sorted; // Using the merge sorted list for primary display

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        🏀 Top 10 Players by **{stat}**
      </h2>
      
      {/* Sorting Performance Metrics */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-lg shadow-sm">
        <p className="text-sm text-blue-800 font-medium">
          Sorting Performance:
        </p>
        <ul className="list-disc list-inside text-sm text-blue-700 mt-1 space-y-0.5">
          <li>Heap Sort Time: **{heap_sort_time.toFixed(4)}s**</li>
          <li>Merge Sort Time: **{merge_sort_time.toFixed(4)}s** ({fasterSort} was faster)</li>
        </ul>
      </div>

      {/* Main Player Table */}
      <table className="min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">Rank</th>
            <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b text-left">Player</th>
            <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">**{stat}**</th>
            <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">PPG</th>
            <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">RPG</th>
            <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">FG%</th>
            <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">3P%</th>
            <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">FT%</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayList.slice(0, 10).map((player, index) => (
            <tr key={player.Player} className="hover:bg-yellow-50 transition duration-150 ease-in-out">
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800 font-medium border-r">{index + 1}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 font-bold text-left border-r">{player.Player}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600 font-extrabold border-r">{player[stat].toFixed(1)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{player.PPG.toFixed(1)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{player.RPG.toFixed(1)}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{player['FG%'].toFixed(1)}%</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{player['3P%'].toFixed(1)}%</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{player['FT%'].toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}