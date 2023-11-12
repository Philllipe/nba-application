import React, { useState } from "react";

export default function PlayerTable({
  players,
  homeTeam,
  homeName,
  awayTeam,
  awayName,
}) {
  function splitPlayers(players) {
    const teams = {};
    players.forEach((player) => {
      if (!teams[player.team]) {
        teams[player.team] = [];
      }
      teams[player.team].push(player);
    });
    return teams;
  }

  const [currentTeam, setCurrentTeam] = useState(homeTeam);

  const teams = splitPlayers(players);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        {/* Switch Teaams button */}
        <div className="-mt-4 -ml-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="mt-4 ml-4">
            <button
              onClick={() => setCurrentTeam(homeTeam)}
              className={`${
                currentTeam === homeTeam
                  ? "bg-indigo-900 text-white"
                  : "text-gray-300"
              } inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium`}
            >
              {homeName}
            </button>
            <button
              onClick={() => setCurrentTeam(awayTeam)}
              className={`${
                currentTeam === awayTeam
                  ? "bg-indigo-900 text-white"
                  : "text-gray-300"
              } inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium`}
            >
              {awayName}
            </button>
          </div>
        </div>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                    Player
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Points
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Assists
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Rebounds
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Steals
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Blocks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {teams[currentTeam].map((players) => (
                  <tr key={players.id}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-bold text-black sm:pl-0">
                      {players.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black">
                      {players.position}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black">
                      {players.points}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black">
                      {players.assists}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black">
                      {players.rebounds}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black">
                      {players.steals}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-black">
                      {players.blocks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
