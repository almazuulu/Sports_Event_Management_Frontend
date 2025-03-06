import React, { useEffect, useState } from "react";

import classes from "./ManageTeams.module.css";
import Header from "../../components/Header";
import LoadingScreen from "../../components/UI/LoadingScreen";
import TeamTable from "../../components/Teams/TeamTable";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../utils/FetchClient";

function ManageTeamsPage() {
  const [teams, setTeams] = useState([]);
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);

  const fetchAllTeams = async () => {
    try {
      setIsFetchingTeams(true);
      const response = await fetchWithAuth("/api/teams/teams/");
      const data = await response.json();
      if (!response.ok) return toast.error("Failed to fetch teams");
      if (response.ok) {
        console.log(data);
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

  if (isFetchingTeams) return <LoadingScreen />;

  return (
    <>
      <div className={classes.container}>
        <Header title={"Manage Teams"} />
        <div className={classes.card}>
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
