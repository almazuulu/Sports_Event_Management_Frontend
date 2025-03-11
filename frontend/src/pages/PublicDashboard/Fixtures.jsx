import React from "react";
import styles from "./Fixtures.module.css";
import team1Logo from "../../../../frontend/src/assets/images/image1.jpg";
import team2Logo from "../../../../frontend/src/assets/images/image1.jpg";
import team3Logo from "../../../../frontend/src/assets/images/image1.jpg";
import team4Logo from "../../../../frontend/src/assets/images/image1.jpg";

const Fixtures = () => {
  const matches = [
    {
      date: "March 15, 2025",
      time: "18:30",
      team1: { name: "Team A", logo: team1Logo },
      team2: { name: "Team B", logo: team2Logo },
      status: "Upcoming",
      score: null,
    },
    {
      date: "March 16, 2025",
      time: "20:00",
      team1: { name: "Team C", logo: team3Logo },
      team2: { name: "Team D", logo: team4Logo },
      status: "Live",
      score: "1 - 1",
    },
    {
      date: "March 17, 2025",
      time: "22:00",
      team1: { name: "Team A", logo: team1Logo },
      team2: { name: "Team C", logo: team3Logo },
      status: "Finished",
      score: "2 - 1",
    },
  ];

  return (
    <div className={styles.fixturesContainer}>
      <h2 className={styles.title}>Premier League Fixtures</h2>
      {matches.map((match, index) => (
        <div key={index} className={styles.matchCard}>
          <div className={styles.matchHeader}>
            <span>{match.date} | {match.time}</span>
            <span className={`${styles.status} ${styles[match.status.toLowerCase()]}`}>
              {match.status}
            </span>
          </div>
          <div className={styles.matchDetails}>
            <div className={styles.team}>
              <img src={match.team1.logo} alt={match.team1.name} />
              <span>{match.team1.name}</span>
            </div>
            <div className={styles.matchScore}>
              {match.status === "Upcoming" ? <span>VS</span> : <span>{match.score}</span>}
            </div>
            <div className={styles.team}>
              <img src={match.team2.logo} alt={match.team2.name} />
              <span>{match.team2.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fixtures;
