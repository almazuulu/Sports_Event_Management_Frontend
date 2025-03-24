import { useEffect, useState } from "react";

import classes from "./ManageTeams.module.css";
import TeamTable from "../../components/Teams/TeamTable";
import { fetchWithAuth } from "../../utils/FetchClient";
import TeamsFilter from "../../components/Teams/TeamsFilter";
import CountCard from "../../components/AdminPanel/CountCard";

function ManageTeamsPage() {
  const [teams, setTeams] = useState([]);
  const [teamsCount, setTeamsCount] = useState([]);
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);

  const fetchAllTeams = async (filters = {}) => {
    try {
      setIsFetchingTeams(true);
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/teams/teams/${queryParams ? `?${queryParams}` : ""}`;
      const response = await fetchWithAuth(url);

      if (!response.ok) {
        throw new Error("Netwrk error!");
      }
      const data = await response.json();
      setTeams(data.results);

      const res = await fetchWithAuth("/api/teams/teams/");
      const resData = await res.json();
      setTeamsCount(resData.results);
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
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>Team Management</h1>
          </div>
        </div>
        <div className={classes.statsCards}>
          {/* <CountCard label={"Total Teams"} count={teamsCount.length} /> */}
          <CountCard
            label={"Active Teams"}
            count={teamsCount.filter((team) => team.status === "active").length}
          />
          <CountCard
            label={"Inactive Teams"}
            count={
              teamsCount.filter((team) => team.status === "inactive").length
            }
          />
          <CountCard
            label={"Suspended Teams"}
            count={
              teamsCount.filter((team) => team.status === "suspended").length
            }
          />
        </div>
        <TeamsFilter onFilter={fetchAllTeams} />
        <div className={classes.card}>
          {isFetchingTeams ? (
            <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
          ) : teams.length === 0 ? (
            <p style={{ color: "#000", textAlign: "center" }}>
              No teams available at the moment.
            </p>
          ) : (
            <>
              <TeamTable teams={teams} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageTeamsPage;
