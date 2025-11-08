const stats = [
  { value: 'PPG', label: 'Points Per Game (PPG)' },
  { value: 'APG', label: 'Assists Per Game (APG)' },
  { value: 'RPG', label: 'Rebounds Per Game (RPG)' },
  { value: 'STL', label: 'Steals Per Game (STL)' },
  { value: 'BLK', label: 'Blocks Per Game (BLK)' },
  { value: '+/-', label: 'Plus/Minus (+/-)' },
];

export default function StatSelector({ selectedStat, onStatChange }) {
  const handleChange = (event) => {
    onStatChange(event.target.value); 
  };

  return (
    <div className="mb-6 flex items-center space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm">
      <label htmlFor="stat-select" className="text-lg font-medium text-gray-700">
        Sort by Statistic:
      </label>
      <select
        id="stat-select"
        value={selectedStat}
        onChange={handleChange}
        className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
      >
        {stats.map((stat) => (
          <option key={stat.value} value={stat.value}>
            {stat.label}
          </option>
        ))}
      </select>
    </div>
  );
}