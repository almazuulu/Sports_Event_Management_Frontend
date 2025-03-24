import { useEffect, useState } from "react";

import styles from "./Results.module.css";
import Hero from "../../components/Results/Hero";
import { isAuthenticated } from "../../utils/Authentication";
import { fetchWithAuth, fetchWithoutAuth } from "../../utils/FetchClient";
import ResultCard from "../../components/Results/ResultCard";

const MatchResults = () => {
  const isAuthorized = isAuthenticated();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await (isAuthorized
          ? fetchWithAuth("/api/scores/scores/public/")
          : fetchWithoutAuth("/api/scores/scores/public/"));

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setData(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [isAuthorized]);

  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <Hero />
      <div className={styles.container}>
        <div className={styles.resultsList}>
          {loading ? (
            <p className="loadingText">Loading...</p>
          ) : data.length > 0 ? (
            data.map((match) => <ResultCard key={match.id} match={match} />)
          ) : (
            <p className={styles.noResults}>No results found!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchResults;
