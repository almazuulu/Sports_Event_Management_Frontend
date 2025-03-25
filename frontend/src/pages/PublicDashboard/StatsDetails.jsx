import { useParams } from "react-router-dom";
import styles from "./StatsDetails.module.css";
import React from "react";

const stats = [
    { label: "TEAMS", value: 8 },
    { label: "GAMES PLAYED", value: 28 },
    { label: "TOTAL GOALS", value: 85 },
    { label: "GOALS PER GAME", value: 3.04 }
  ];

  const teams = [
    { rank: 1, name: "Eagles", played: 5, won: 4, drawn: 0, lost: 1, gf: 12, ga: 5, gd: "+7", points: 12, last5: ["W", "W", "L", "W", "W"] },
    { rank: 2, name: "Falcons", played: 5, won: 3, drawn: 1, lost: 1, gf: 10, ga: 6, gd: "+4", points: 10, last5: ["L", "L", "W", "D", "W"] },
    { rank: 3, name: "Tigers", played: 5, won: 3, drawn: 0, lost: 2, gf: 9, ga: 6, gd: "+3", points: 9, last5: ["W", "L", "W", "L", "W"] }
  ];

function StatsDetails() {
//   const { id } = useParams();
//   console.log("id",id)
//   const event = leaderboardData.find((item) => item.id === parseInt(id));
// console.log("leaderboardData",leaderboardData)
// console.log("parseInt(id)",parseInt(id))

//   if (!event) {
//     return <h2>Event Not Found</h2>;
//   }

  return (
    <div className={styles.dashboard}>
    {/* Banner */}
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1>Annual Football Tournament 2025</h1>
        <p>🏆 Ongoing · Jan 15 - Apr 30, 2025 · City Stadium</p>
      </div>
      <button className={styles.eventButton}>⚽ Event Details</button>
    </div>

    {/* Stats Cards */}
    <div className={styles.statsContainer}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.card}>
          <h2>{stat.value}</h2>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>

    {/* League Table */}
    <div className={styles.tableContainer}>
      <h2>League Table</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
            <th>Last 5</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.rank}</td>
              <td>{team.name}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.drawn}</td>
              <td>{team.lost}</td>
              <td>{team.gf}</td>
              <td>{team.ga}</td>
              <td>{team.gd}</td>
              <td>{team.points}</td>
              <td className={styles.lastFive}>
                {team.last5.map((result, i) => (
                  <span key={i} className={styles[result]}>{result}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default StatsDetails;
