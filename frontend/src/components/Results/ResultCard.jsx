import { useNavigate } from "react-router-dom";

import classes from "./ResultCard.module.css";
import StatusChip from "../StatusChip";

function ResultCard({ match = {} }) {
  const navigate = useNavigate();
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <div className={classes.matchName}>
          {match.sport_name} - {match.game_name}
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.team}>
          <img
            src={"https://placehold.co/400"}
            alt={match.team1_name}
            className={classes.logo}
          />
          <span>{match.team1_name}</span>
        </div>
        <div className={classes.scoreDisplay}>
          <div className={classes.score}>
            <span>{match.final_score_team1}</span>
            <span className={classes.scoreDivider}>:</span>
            <span>{match.final_score_team2}</span>
          </div>
        </div>
        <div className={classes.team}>
          <img
            src={"https://placehold.co/400"}
            alt={match.team2_name}
            className={classes.logo}
          />
          <span>{match.team2_name}</span>
        </div>
      </div>
      <div className={classes.footer}>
        <span>
          <StatusChip status={match.status_display} />
        </span>
        <div onClick={() => navigate(match.id)} className={classes.viewDetails}>
          View Details
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
