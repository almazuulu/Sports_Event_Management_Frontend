import classes from "./AllGames.module.css";
import { formatToShortDate, formatToTimeOnly } from "../../utils/helpers";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AllGames({ loading, games = [] }) {
  const navigate = useNavigate(); // Initialize navigation
  const handleRowClick = (fixtureId) => {
    console.log("?>>",fixtureId)
    navigate(`/fixtures/${fixtureId}`); // Navigate to player details page
};

  return (
    <>
      {loading ? (
        <p className="loadingText">Loading...</p>
      ) : games.length === 0 ? (
        <p className={classes.fallbackText}>No matches at the moment</p>
      ) : (
        games.map((match) => (
          <div
            key={match.id}  onClick={() => handleRowClick(match.id)}
            className={`${classes.matchCard} ${
              match.status === "ongoing" ? classes.liveMatch : ""
            }`}
          >
            <div className={classes.match}>
              <div className={classes.team}>
                <span>{match.name}</span>
              </div>
            </div>
            <p className={classes.dateTime}>
              {formatToShortDate(match.start_datetime)} -{" "}
              {formatToTimeOnly(match.start_datetime)}
            </p>
            <div className={classes.match}>
              <div className={classes.team}>
                {/* <img
                src={match.logo1}
                alt={match.team1}
                className={classes.logo}
              /> */}
                <span>{match.teams[0].team_name}</span>
              </div>
              <span className={classes.vs}>VS</span>
              <div className={classes.team}>
                {/* <img
                src={match.logo2}
                alt={match.team2}
                className={classes.logo}
              /> */}
                <span>{match.teams[0].team_name}</span>
              </div>
            </div>
            <p className={classes.venue}>📍 {match.location}</p>
            <p
              className={`${classes.status} ${
                match.status === "ongoing" ? classes.liveStatus : ""
              }`}
            >
              {match.status === "ongoing" ? "🔴 Live" : match.status}
            </p>
          </div>
        ))
      )}
    </>
  );
}

export default AllGames;
