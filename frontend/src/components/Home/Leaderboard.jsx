import React from 'react'

import classes from './Leaderboard.module.css'

const teams = [
    { rank: 1, name: "Lions", points: 45, wins: 15 },
    { rank: 2, name: "Tigers", points: 40, wins: 13 },
    { rank: 3, name: "Eagles", points: 38, wins: 12 },
    { rank: 4, name: "Wolves", points: 36, wins: 11 },
    { rank: 5, name: "Panthers", points: 32, wins: 10 },
  ];

function Leaderboard() {
  return (
    <div className={classes.container}>
    <h2 className={classes.heading}>🏆 Leaderboard Rankings</h2>
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Wins</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, index) => (
          <tr key={index}>
            <td>#{team.rank}</td>
            <td>{team.name}</td>
            <td>{team.wins}</td>
            <td>{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Leaderboard