import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Team.module.css";
import TeamTable from "./TeamCard";
import LoadingScreen from "../../components/UI/LoadingScreen";

function TeamsPage() {
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);
  const [data, setTeamdata] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const fetchAllTeams = async () => {
    try {
      setIsFetchingTeams(true);
      const response = await fetch("http://127.0.0.1:8000/api/teams/teams/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setTeamdata(jsonData.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetchingTeams(false);
    }
  };

  useEffect(() => {
    fetchAllTeams();
  }, []);

  if (isFetchingTeams) return <LoadingScreen />;

  return (
    <div className={styles.container}>
      {/* Banner Section */}
      <header className={styles.banner}>
        <h1>🏆 Teams</h1>
      </header>

      {/* Team Cards Grid */}
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
  );
}

export default TeamsPage;
