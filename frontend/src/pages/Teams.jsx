import { useEffect, useState } from "react";

import styles from "./Teams.module.css";
import Header from "../components/Header";
import TeamTable from "../components/Teams/TeamTable";
import { fetchWithAuth } from "../utils/FetchClient";
import { toast } from "react-toastify";
import LoadingScreen from "../components/UI/LoadingScreen";


function TeamsPage() {


  const [isFetchingTeams, setIsFetchingTeams] = useState(false);
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const fetchAllTeams = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/teams/teams/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData.results);
    } catch (error) {
      setError(error.message);
    } finally {
     
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
        <h1>Teams</h1>
      </header>

      {/* Team Cards Grid */}
      <section className={styles.teamGrid}>
        {data.map((team) => (
         
          <TeamTable key={team.id} team={team} />
        ))}
      </section>
    </div>
  );
}

export default TeamsPage;
