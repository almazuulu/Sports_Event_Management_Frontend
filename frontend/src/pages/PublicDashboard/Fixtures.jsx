import styles from "./Fixtures.module.css";
import Hero from "../../components/Fixtures/Hero";
import UpcomingFixtures from "../../components/Fixtures/UpcomingFixtures";
import FixturesFilter from "../../components/Fixtures/FixturesFilter";
import { fetchWithoutAuth } from "../../utils/FetchClient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AllGames from "../../components/Fixtures/AllGames";

const Fixtures = () => {
  const [games, setGames] = useState([]);
  const [isFetchingGames, setIsFetchingGames] = useState(false);

  const fetchAllGames = async (filters = {}) => {
    try {
      setIsFetchingGames(true);
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/games/games/${queryParams ? `?${queryParams}` : ""}`;
      const response = await fetchWithoutAuth(url);
      const data = await response.json();
      if (!response.ok) return toast.error("Failed to fetch games");
      if (response.ok) {
        setGames(data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingGames(false);
    }
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  return (
    <>
      <Hero />
      <div className={styles.container}>
        {/* <h2 className={styles.heading}>📅 Upcoming Fixtures</h2>
        <UpcomingFixtures /> */}

        {/* <h2 className={styles.heading}>⚽ All Matches</h2> */}
        <FixturesFilter onFilter={fetchAllGames} />
        <AllGames loading={isFetchingGames} games={games} />
      </div>
    </>
  );
};

export default Fixtures;
