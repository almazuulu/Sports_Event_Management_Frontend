import styles from "./TeamsGame.module.css";

const TeamsGame = ({ player = {} }) => {
  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>Games</h2>

      <div className={styles.matchCard}>
        <div className={styles.matchHeader}>
          {/* <span>{match.date} | {match.time}</span> */}
          <span className={styles.matchStatus}>Game: {player.game_name}</span>
        </div>
        <div className={styles.matchDetails}>
          {/* Team 1 */}
          <div className={`${styles.team}`}>
            {/* <img src={match.team1.logo} alt={match.team1.name} /> */}
            <span className={styles.teamName}>
              Designation : {player.designation_display}
            </span>
            <span className={styles.teamName}>
              Players Count :{player.selected_players_count}
            </span>
          </div>

          {/* Match Score */}
          <div className={styles.matchScore}>
            <span>Team : {player.team_name}</span>
          </div>

          {/* Team 2 */}
        </div>
      </div>
    </div>
  );
};

export default TeamsGame;
