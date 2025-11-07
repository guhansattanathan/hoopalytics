import { useEffect, useState } from "react";
import StatSelector from "./StatSelector";
import styled from 'styled-components';

const Loader = () => {
    return (
        <StyledWrapper>
            <div className="container">
                <div className="ball">
                    <div className="inner">
                        <div className="line" />
                        <div className="line line--two" />
                        <div className="oval" />
                        <div className="oval oval--two" />
                    </div>
                </div>
                <div className="shadow" />
            </div>
            <p className="mt-8 text-lg font-medium text-gray-600">Loading top players...</p>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 250px; /* Ensure space for the animation */
    padding: 2rem;

    @keyframes rotateBall {
        0% { transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); }
        50% { transform: rotateY(360deg) rotateX(360deg) rotateZ(0deg); }
        100% { transform: rotateY(720deg) rotateX(720deg) rotateZ(360deg); }
    }

    @keyframes bounceBall {
        0% { transform: translateY(-70px) scale(1, 1); }
        15% { transform: translateY(-56px) scale(1, 1); }
        45% { transform: translateY(70px) scale(1, 1); }
        50% { transform: translateY(73.5px) scale(1, 0.92); }
        55% { transform: translateY(70px) scale(1, 0.95); }
        85% { transform: translateY(-56px) scale(1, 1); }
        95% { transform: translateY(-70px) scale(1, 1); }
        100% { transform: translateY(-70px) scale(1, 1); }
    }

    .ball {
        animation-name: bounceBall;
        animation-duration: 1.2s;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        border-radius: 50%;
        height: 60px;
        position: relative;
        transform: translateY(-70px);
        transform-style: preserve-3d;
        width: 60px;
        z-index: 1;
    }

    .ball::before {
        background: radial-gradient(circle at 36px 20px, #ff8c16, #b35100); /* Orange/Basketball color */
        border: 2px solid #333333;
        border-radius: 50%;
        content: "";
        height: calc(100% + 6px);
        left: -6px;
        position: absolute;
        top: -3px;
        transform: translateZ(1vmin);
        width: calc(100% + 6px);
    }

    .ball .inner {
        animation-name: rotateBall;
        animation-duration: 25s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        border-radius: 50%;
        height: 100%;
        position: absolute;
        transform-style: preserve-3d;
        width: 100%;
    }

    /* Styles for the lines and ovals to create the basketball seam effect */
    .ball .line::before,
    .ball .line::after {
        border: 2px solid #333333;
        border-radius: 50%;
        content: "";
        height: 99%;
        position: absolute;
        width: 99%;
    }

    .ball .line::before { transform: rotate3d(0, 0, 0, 0); }
    .ball .line::after { transform: rotate3d(1, 0, 0, 90deg); }
    .ball .line--two::before { transform: rotate3d(0, 0, 0, 2deg); }
    .ball .line--two::after { transform: rotate3d(1, 0, 0, 88deg); }

    .ball .oval::before,
    .ball .oval::after {
        border-top: 4px solid #333333;
        border-radius: 50%;
        content: "";
        height: 99%;
        position: absolute;
        width: 99%;
    }

    .ball .oval::before { transform: rotate3d(1, 0, 0, 45deg) translate3d(0, 0, 6px); }
    .ball .oval::after { transform: rotate3d(1, 0, 0, -45deg) translate3d(0, 0, -6px); }
    .ball .oval--two::before { transform: rotate3d(1, 0, 0, 135deg) translate3d(0, 0, -6px); }
    .ball .oval--two::after { transform: rotate3d(1, 0, 0, -135deg) translate3d(0, 0, 6px); }

    @keyframes bounceShadow {
        0% { filter: blur(3px); opacity: 0.6; transform: translateY(73px) scale(0.5, 0.5); }
        45% { filter: blur(1px); opacity: 0.9; transform: translateY(73px) scale(1, 1); }
        55% { filter: blur(1px); opacity: 0.9; transform: translateY(73px) scale(1, 1); }
        100% { filter: blur(3px); opacity: 0.6; transform: translateY(73px) scale(0.5, 0.5); }
    }

    .shadow {
        animation-name: bounceShadow;
        animation-duration: 1.2s;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        background: black;
        filter: blur(2px);
        border-radius: 50%;
        height: 6px;
        transform: translateY(73px);
        width: 54px;
    }
`;

export default function TopPlayersTable() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStat, setSelectedStat] = useState('PPG'); 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `http://127.0.0.1:8000/?stat=${selectedStat}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                
                setError(`Failed to fetch data. Ensure your backend server is running and CORS is configured: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedStat]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[300px]">
            <Loader />
        </div>
    );
    
    if (error) return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-7xl mx-auto mt-4">
            <p className="font-bold">Error Loading Data</p>
            <p className="text-sm">{error}</p>
        </div>
    );
    
    if (!data || !data.top_merge_sorted || data.top_merge_sorted.length === 0) {
        return <p className="p-4 text-center text-gray-500">No top player data available.</p>;
    }

    const { stat, top_merge_sorted, heap_sort_time, merge_sort_time } = data;
    
    const fasterSort = merge_sort_time < heap_sort_time ? 'Merge Sort' : 'Heap Sort';
    const displayList = top_merge_sorted; 

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">

            <StatSelector 
                selectedStat={selectedStat} 
                onStatChange={setSelectedStat} 
            />

            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
                🏀 Top 10 Players by {stat}
            </h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-lg shadow-sm">
                <p className="text-sm text-blue-800 font-medium">
                    Sorting Performance:
                </p>
                <ul className="list-disc list-inside text-sm text-blue-700 mt-1 space-y-0.5">
                    <li>Heap Sort Time: {heap_sort_time.toFixed(4)}s</li>
                    <li>Merge Sort Time: {merge_sort_time.toFixed(4)}s ({fasterSort} was faster)</li>
                </ul>
            </div>

            <table className="min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">Rank</th>
                        <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b text-left">Player</th>
                        <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">{stat}</th>
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
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600 font-extrabold border-r">{player[stat]?.toFixed(1) || '0.0'}</td>
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