import React from "react";
import styles from "./Results.module.css";

const MatchResults = () => {
  const results = [
    {
      date: "March 10, 2025",
      time: "19:00",
      team1: { name: "Manchester United", score: 2 },
      team2: { name: "Chelsea", score: 1 },
      status: "Finished",
    },
    {
      date: "March 12, 2025",
      time: "21:00",
      team1: { name: "Liverpool", score: 1 },
      team2: { name: "Manchester City", score: 3 },
      status: "Finished",
    },
  ];

  return (
    <div className={styles.resultsContainer}>
    <h2 className={styles.title}>Match Results</h2>
    {results.map((match, index) => (
      <div key={index} className={styles.matchCard}>
        <div className={styles.matchHeader}>
          <span>{match.date} | {match.time}</span>
          <span className={styles.matchStatus}>{match.status}</span>
        </div>
        <div className={styles.matchDetails}>
          {/* Team 1 */}
          <div className={`${styles.team} ${match.team1.score > match.team2.score ? styles.winner : styles.loser}`}>
            {/* <img src={match.team1.logo} alt={match.team1.name} /> */}
            <span className={styles.teamName}>{match.team1.name}</span>
          </div>
          
          {/* Match Score */}
          <div className={styles.matchScore}>
            <span>{match.team1.score}</span>
            <span>-</span>
            <span>{match.team2.score}</span>
          </div>

          {/* Team 2 */}
          <div className={`${styles.team} ${match.team2.score > match.team1.score ? styles.winner : styles.loser}`}>
            {/* <img src={match.team2.logo} alt={match.team2.name} /> */}
            <span className={styles.teamName}>{match.team2.name}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

export default MatchResults;
