import { useNavigate } from "react-router-dom";

import classes from "./AllGames.module.css";
import { formatToShortDate, formatToTimeOnly } from "../../utils/helpers";
import StatusChip from "../StatusChip";

function AllGames({ games = [] }) {
  const navigate = useNavigate();
  const handleClickGame = (fixtureId) => {
    navigate(`${fixtureId}`);
  };

  return (
    <>
      {games.map((match) => (
        <div
          key={match.id}
          className={`${classes.matchCard} ${
            match.status === "ongoing" ? classes.liveMatch : ""
          }`}
        >
          <div className={classes.header}>
            <div className={classes.matchName}>{match?.name}</div>
            <div className={classes.dateTime}>
              {formatToShortDate(match.start_datetime)} -{" "}
              {formatToTimeOnly(match.start_datetime)}
            </div>
          </div>
          {match?.teams?.length >= 2 ? (
            <>
              <div className={classes.match}>
                <div className={classes.team}>
                  <img
                    src={"https://placehold.co/400"}
                    alt={match.team1}
                    className={classes.logo}
                  />
                  <span>{match?.teams[0].team_name}</span>
                </div>
                <span className={classes.vs}>VS</span>
                <div className={classes.team}>
                  <img
                    src={"https://placehold.co/400"}
                    alt={match.team2}
                    className={classes.logo}
                  />
                  <span>{match?.teams[1].team_name}</span>
                </div>
              </div>
              <p className={classes.venue}>📍 {match.location}</p>
            </>
          ) : (
            <p>Teams data unavailable.</p>
          )}
          <div className={classes.statusContainer}>
            <div
              className={`${classes.status} ${
                match.status === "ongoing" ? classes.liveStatus : ""
              }`}
            >
              {match.status === "ongoing" ? (
                "🔴 Live"
              ) : (
                <StatusChip status={match.status} />
              )}
            </div>
            <div
              onClick={() => handleClickGame(match.id)}
              className={classes.viewDetails}
            >
              View Details
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AllGames;
