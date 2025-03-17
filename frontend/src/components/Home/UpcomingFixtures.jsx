import { useEffect, useState } from "react";

import classes from "./UpcomingFixtures.module.css";
import { fetchWithoutAuth } from "../../utils/FetchClient";
import { formatToShortDate, formatToTimeOnly } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

function UpcomingFixtures() {
  const navigate = useNavigate();
  const [upcomingFixtures, setUpcomingFixtures] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickGame = (matchId) => {
    navigate(`/fixtures/${matchId}`);
  };

  const fetchUpcomingFixtures = async () => {
    try {
      setLoading(true);
      const response = await fetchWithoutAuth("/api/games/games/upcoming/");
      const data = await response.json();

      if (response.ok) {
        setUpcomingFixtures(data.results);
      }
    } catch (error) {
      console.error("Failed fetching upcoming fixtures", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingFixtures();
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>📅 Upcoming Fixtures</h2>
      <div className={classes.fixturesList}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          upcomingFixtures.map((match) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default UpcomingFixtures;
