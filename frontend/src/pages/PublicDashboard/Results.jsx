import { useState } from "react";
import Hero from "../../components/Results/Hero";
import styles from "./Results.module.css";

const resultsData = [
  {
    id: 1,
    date: "2025-03-12",
    team1: "Lions",
    logo1: "https://placehold.co/400",
    score1: 3,
    team2: "Tigers",
    logo2: "https://placehold.co/400",
    score2: 1,
    venue: "Arena Park",
  },
  {
    id: 2,
    date: "2025-03-11",
    team1: "Eagles",
    logo1: "https://placehold.co/400",
    score1: 2,
    team2: "Wolves",
    logo2: "https://placehold.co/400",
    score2: 2,
    venue: "City Stadium",
  },
  {
    id: 3,
    date: "2025-03-10",
    team1: "Panthers",
    logo1: "https://placehold.co/400",
    score1: 0,
    team2: "Sharks",
    logo2: "https://placehold.co/400",
    score2: 1,
    venue: "National Stadium",
  },
];

const MatchResults = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const filteredResults = selectedDate
    ? resultsData.filter((match) => match.date === selectedDate)
    : resultsData;
  return (
    <>
      <Hero />
      <div className={styles.container}>
        <div className={styles.resultsList}>
          {filteredResults.length > 0 ? (
            filteredResults.map((match) => (
              <div key={match.id} className={styles.matchCard}>
                <p className={styles.date}>{match.date}</p>
                <div className={styles.match}>
                  <div className={styles.team}>
                    <img
                      src={match.logo1}
                      alt={match.team1}
                      className={styles.logo}
                    />
                    <span
                      className={
                        match.score1 > match.score2 ? styles.winner : ""
                      }
                    >
                      {match.team1}
                    </span>
                  </div>
                  <span className={styles.score}>
                    {match.score1} - {match.score2}
                  </span>
                  <div className={styles.team}>
                    <img
                      src={match.logo2}
                      alt={match.team2}
                      className={styles.logo}
                    />
                    <span
                      className={
                        match.score2 > match.score1 ? styles.winner : ""
                      }
                    >
                      {match.team2}
                    </span>
                  </div>
                </div>
                <p className={styles.venue}>📍 {match.venue}</p>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>
              No results found for the selected date.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchResults;
