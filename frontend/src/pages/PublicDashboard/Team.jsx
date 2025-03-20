import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Team.module.css";
import TeamTable from "./TeamCard";
import Hero from "../../components/Teams/Hero";
import TeamsFilter from "../../components/Teams/TeamsFilter";
import { fetchWithAuth, fetchWithoutAuth } from "../../utils/FetchClient";
import { isAuthenticated } from "../../utils/Authentication";

function TeamsPage() {
  const isAuthorized = isAuthenticated();
  const navigate = useNavigate();
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);
  const [data, setTeamdata] = useState([]);

  const fetchAllTeams = useCallback(
    async (filters = {}) => {
      try {
        setIsFetchingTeams(true);
        const queryParams = new URLSearchParams(filters).toString();
        const url = `/api/teams/teams/${queryParams ? `?${queryParams}` : ""}`;
        const response = await (isAuthorized
          ? fetchWithAuth(url)
          : fetchWithoutAuth(url));
        const data = await response.json();
        if (!response.ok) return toast.error("Failed to fetch teams");
        setTeamdata(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingTeams(false);
      }
    },
    [isAuthorized]
  );

  useEffect(() => {
    fetchAllTeams();
  }, [fetchAllTeams]);

  return (
    <>
      <Hero />
      <div className={styles.container}>
        {isFetchingTeams ? (
          <div className={styles.card}>
            <p className="loadingText">Loading...</p>
          </div>
        ) : data.length === 0 ? (
          <div className={styles.card}>
            <p className="loadingText">No teams available at the moment.</p>
          </div>
        ) : (
          <>
            <TeamsFilter onFilter={fetchAllTeams} />
            <section className={styles.teamGrid}>
              {data.map((team) => (
                <div
                  key={team.id}
                  onClick={() => navigate(`${team.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <TeamTable team={team} />
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default TeamsPage;
