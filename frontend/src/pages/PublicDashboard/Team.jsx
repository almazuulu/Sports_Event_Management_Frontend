import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Team.module.css";
import TeamTable from "./TeamCard";
import Hero from "../../components/Teams/Hero";
import TeamsFilter from "../../components/Teams/TeamsFilter";
import { fetchWithoutAuth } from "../../utils/FetchClient";
import { toast } from "react-toastify";

function TeamsPage() {
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);
  const [data, setTeamdata] = useState([]);
  const navigate = useNavigate();

  const fetchAllTeams = async (filters = {}) => {
    try {
      setIsFetchingTeams(true);
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/teams/teams/${queryParams ? `?${queryParams}` : ""}`;
      const response = await fetchWithoutAuth(url);
      const data = await response.json();
      if (!response.ok) return toast.error("Failed to fetch teams");
      setTeamdata(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingTeams(false);
    }
  };

  useEffect(() => {
    fetchAllTeams();
  }, []);

  return (
    <>
      <Hero />
      <div className={styles.container}>
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
      </div>
    </>
  );
}

export default TeamsPage;
