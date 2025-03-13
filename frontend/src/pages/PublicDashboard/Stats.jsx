import styles from "./Stats.module.css";
import Hero from "../../components/Stats/Hero";

const teamStats = [
  {
    id: 1,
    team: "Lions",
    logo: "https://placehold.co/400",
    wins: 12,
    goals: 34,
    conceded: 10,
  },
  {
    id: 2,
    team: "Tigers",
    logo: "https://placehold.co/400",
    wins: 10,
    goals: 28,
    conceded: 15,
  },
  {
    id: 3,
    team: "Eagles",
    logo: "https://placehold.co/400",
    wins: 9,
    goals: 25,
    conceded: 18,
  },
];

const playerStats = [
  {
    id: 1,
    player: "John Smith",
    team: "Lions",
    logo: "https://placehold.co/400",
    goals: 15,
    assists: 7,
    yellowCards: 2,
  },
  {
    id: 2,
    player: "David Jones",
    team: "Tigers",
    logo: "https://placehold.co/400",
    goals: 12,
    assists: 5,
    yellowCards: 1,
  },
  {
    id: 3,
    player: "Mike Brown",
    team: "Eagles",
    logo: "https://placehold.co/400",
    goals: 10,
    assists: 8,
    yellowCards: 3,
  },
];
function StatsPage() {
  return (
    <>
      <Hero />
      <div className={styles.container}>
        {/* Team Stats */}
        <h2 className={styles.heading}>🏆 Team Statistics</h2>
        <div className={styles.statsGrid}>
          {teamStats.map((team) => (
            <div key={team.id} className={styles.statCard}>
              <img src={team.logo} alt={team.team} className={styles.logo} />
              <h3>{team.team}</h3>
              <p>✅ Wins: {team.wins}</p>
              <p>⚽ Goals: {team.goals}</p>
              <p>🛑 Goals Conceded: {team.conceded}</p>
            </div>
          ))}
        </div>
        <br />
        {/* Player Stats */}
        <h2 className={styles.heading}>👤 Player Statistics</h2>
        <div className={styles.statsGrid}>
          {playerStats.map((player) => (
            <div key={player.id} className={styles.statCard}>
              <img
                src={player.logo}
                alt={player.team}
                className={styles.logo}
              />
              <h3>
                {player.player} ({player.team})
              </h3>
              <p>⚽ Goals: {player.goals}</p>
              <p>🎯 Assists: {player.assists}</p>
              <p>🟨 Yellow Cards: {player.yellowCards}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StatsPage;
