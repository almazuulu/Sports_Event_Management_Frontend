import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./Fixtures.module.css";
import Hero from "../../components/Fixtures/Hero";
import FixturesFilter from "../../components/Fixtures/FixturesFilter";
import { fetchWithAuth, fetchWithoutAuth } from "../../utils/FetchClient";
import AllGames from "../../components/Fixtures/AllGames";
import { isAuthenticated } from "../../utils/Authentication";

const Fixtures = () => {
  const isAuthorized = isAuthenticated();
  const [games, setGames] = useState([]);
  const [isFetchingGames, setIsFetchingGames] = useState(false);

  const fetchAllGames = useCallback(
    async (filters = {}) => {
      try {
        setIsFetchingGames(true);
        const queryParams = new URLSearchParams(filters).toString();
        const url = `/api/games/games/${queryParams ? `?${queryParams}` : ""}`;
        const response = await (isAuthorized
          ? fetchWithAuth(url)
          : fetchWithoutAuth(url));
        const data = await response.json();

        if (!response.ok) {
          return toast.error("Failed to fetch games");
        }

        const sortedGames = data.results.sort(
          (a, b) => new Date(a.start_datetime) - new Date(b.start_datetime)
        );
        setGames(sortedGames);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingGames(false);
      }
    },
    [isAuthorized]
  );

  useEffect(() => {
    fetchAllGames();
  }, [fetchAllGames]);

  return (
    <>
      <Hero />
      <div className={styles.container}>
        {games.length > 0 && <FixturesFilter onFilter={fetchAllGames} />}
        {isFetchingGames ? (
          <div className={styles.card}>
            <p className="loadingText">Loading...</p>
          </div>
        ) : games.length === 0 ? (
          <div className={styles.card}>
            <p className="loadingText">No matches at the moment.</p>
          </div>
        ) : (
          <>
            <AllGames games={games} />
          </>
        )}
      </div>
    </>
  );
};

export default Fixtures;
