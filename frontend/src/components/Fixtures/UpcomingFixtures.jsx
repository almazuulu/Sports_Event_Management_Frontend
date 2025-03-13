import { useEffect, useState } from "react";
import { fetchWithoutAuth } from "../../utils/FetchClient";

import classes from "./UpcomingFixtures.module.css";
import { formatToShortDateTime } from "../../utils/helpers";

function UpcomingFixtures() {
  const [upcomingFixtures, setUpcomingFixtures] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <>
      {loading ? (
        <p className="loadingText">Loading...</p>
      ) : (
        upcomingFixtures.map((match) => (
          <div key={match.id} className={`${classes.matchCard}`}>
            <p className={classes.dateTime}>
              {formatToShortDateTime(match.start_datetime)}
            </p>
            <h3 className={classes.teams}>{match.teams[0]}</h3>
            <p className={classes.venue}>📍 {match.location}</p>
          </div>
        ))
      )}
    </>
  );
}

export default UpcomingFixtures;
