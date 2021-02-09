import React from "react";

interface TeamsProps {
  sortedData: any;
  setSortBy: any;
}

const Teams = ({ sortedData, setSortBy }: TeamsProps) => {
  return (
    <div>
      <table className="teams__container">
        <thead>
          <tr>
            <th onClick={() => setSortBy("name")}>Name</th>
            <th>Logo</th>
            <th onClick={() => setSortBy("wins")}>Wins</th>
            <th onClick={() => setSortBy("losses")}>Losses</th>
            <th onClick={() => setSortBy("elo")}>Elo Rating</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((team) => (
            <tr key={team.name} className="teams__row">
              <td className="teams__item">{team.name}</td>
              <td className="teams__item">
                <img src={team.logo} alt="" height="50" width="50" />
              </td>
              <td className="teams__item">{team.wins}</td>
              <td className="teams__item">{team.losses}</td>
              <td className="teams__item">{team.elo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;
