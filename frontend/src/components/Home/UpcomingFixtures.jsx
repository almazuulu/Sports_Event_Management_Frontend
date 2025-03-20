import { useCallback, useEffect, useState } from "react";

import classes from "./UpcomingFixtures.module.css";
import { fetchWithAuth, fetchWithoutAuth } from "../../utils/FetchClient";
import { formatToShortDate, formatToTimeOnly } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/Authentication";

function UpcomingFixtures() {
  const navigate = useNavigate();
  const isAuthorized = isAuthenticated();
  const [upcomingFixtures, setUpcomingFixtures] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickGame = (matchId) => {
    navigate(`fixtures/${matchId}`);
  };

  const fetchUpcomingFixtures = useCallback(async () => {
    try {
      setLoading(true);
      const response = await (isAuthorized
        ? fetchWithAuth("/api/games/games/upcoming/")
        : fetchWithoutAuth("/api/games/games/upcoming/"));

      const data = await response.json();

      if (response.ok) {
        setUpcomingFixtures(data.results);
      }
    } catch (error) {
      console.error("Failed fetching upcoming fixtures", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthorized]);

  useEffect(() => {
    fetchUpcomingFixtures();
  }, [fetchUpcomingFixtures]);

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>📅 Upcoming Matches</h2>
      {loading ? (
        <div className={classes.card}>
          <p className="loadingText">Loading...</p>
        </div>
      ) : upcomingFixtures.length === 0 ? (
        <div className={classes.card}>
          <p className="loadingText">No matches available for this week.</p>
        </div>
      ) : (
        <div className={classes.fixturesList}>
          {upcomingFixtures.map((match) => (
            <div
              key={match.id}
              className={classes.fixtureCard}
              onClick={() => {
                handleClickGame(match.id);
              }}
            >
              <h3 className={classes.teams}>{match.name}</h3>

              <p className={classes.date}>
                {formatToShortDate(match.start_datetime)} -{" "}
                {formatToTimeOnly(match.start_datetime)}
              </p>
              <h3 className={classes.teams}>{match.teams[0]}</h3>
              <p className={classes.venue}>📍 {match.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingFixtures;
