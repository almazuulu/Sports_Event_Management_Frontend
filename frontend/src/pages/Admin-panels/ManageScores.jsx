import { useEffect, useState } from "react";

import classes from "./ManageScores.module.css";
import CountCard from "../../components/AdminPanel/CountCard";
import { fetchWithAuth } from "../../utils/FetchClient";
import AdminScoresTable from "../../components/Scores/AdminScoresTable";

function ManageScoresPage() {
  const [scoresData, setScoresData] = useState([]);
  const [pendingScoresData, setPendingScoresData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchScores = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/api/scores/scores/");
      if (!res.ok) {
        throw new Error("Failed to fetch scores");
      }

      const data = await res.json();
      const pendingData = data.results.filter(
        (score) => score.verification_status === "pending_verification"
      );
      setScoresData(data.results);
      setPendingScoresData(pendingData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>Score Management</h1>
          </div>
        </div>

        <div className={classes.statsCards}>
          <CountCard
            label={"Verified Scores"}
            count={
              scoresData.filter(
                (score) => score.verification_status === "verified"
              ).length
            }
          />
          <CountCard
            label={"Pending Verification"}
            count={
              scoresData.filter(
                (score) => score.verification_status === "pending_verification"
              ).length
            }
          />
        </div>

        <div className={classes.card}>
          <div className={classes.cardHeader}>
            <h3>Scores Pending Verification</h3>
          </div>
          <div className={classes.cardBody}>
            {loading ? (
              <p className="loadingText">Loading...</p>
            ) : pendingScoresData.length === 0 ? (
              <p className="loadingText">No pending scores at the moment.</p>
            ) : (
              <AdminScoresTable
                scores={pendingScoresData}
                onRefresh={fetchScores}
                isPending
              />
            )}
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.cardHeader}>
            <h3>All Scores</h3>
          </div>
          <div className={classes.cardBody}>
            {loading ? (
              <p className="loadingText">Loading...</p>
            ) : scoresData.length === 0 ? (
              <p className="loadingText">No scores at the moment.</p>
            ) : (
              <AdminScoresTable scores={scoresData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageScoresPage;
