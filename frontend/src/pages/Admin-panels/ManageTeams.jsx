import { useEffect, useState } from "react";

import classes from "./ManageTeams.module.css";
import Header from "../../components/Header";
import TeamTable from "../../components/Teams/TeamTable";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../utils/FetchClient";
import TeamsFilter from "../../components/Teams/TeamsFilter";

function ManageTeamsPage() {
  const [teams, setTeams] = useState([]);
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);

  const fetchAllTeams = async (filters = {}) => {
    try {
      setIsFetchingTeams(true);
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/teams/teams/${queryParams ? `?${queryParams}` : ""}`;
      const response = await fetchWithAuth(url);
      const data = await response.json();
      if (!response.ok) return toast.error("Failed to fetch teams");
      if (response.ok) {
        setTeams(data.results);
      }
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
      <div className={classes.container}>
        <Header title={"Manage Teams"} />
        <div className={classes.card}>
          <TeamsFilter onFilter={fetchAllTeams} />
          {teams.length === 0 && (
            <p style={{ color: "#000", textAlign: "center" }}>
              No teams available at the moment.
            </p>
          )}
          {teams.length > 0 && <TeamTable teams={teams} />}
        </div>
      </div>
    </>
  );
}

export default ManageTeamsPage;
