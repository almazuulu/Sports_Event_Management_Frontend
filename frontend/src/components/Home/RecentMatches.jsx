import classes from "./RecentMatches.module.css";

const recentMatches = [
  {
    date: "Mar 10, 2025",
    team1: "Lions",
    score1: 2,
    team2: "Tigers",
    score2: 1,
    venue: "National Stadium",
  },
  {
    date: "Mar 11, 2025",
    team1: "Eagles",
    score1: 3,
    team2: "Wolves",
    score2: 3,
    venue: "Arena Park",
  },
  {
    date: "Mar 12, 2025",
    team1: "Sharks",
    score1: 0,
    team2: "Panthers",
    score2: 2,
    venue: "City Ground",
  },
];

function RecentMatches() {
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>📊 Recent Match Results</h2>
      <div className={classes.matchList}>
        {recentMatches.map((match, index) => (
          <div key={index} className={classes.matchCard}>
            <p className={classes.date}>{match.date}</p>
            <div className={classes.teams}>
              <span className={classes.team}>{match.team1}</span>
              <span className={classes.score}>
                {match.score1} - {match.score2}
              </span>
              <span className={classes.team}>{match.team2}</span>
            </div>
            <p className={classes.venue}>📍 {match.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentMatches;
