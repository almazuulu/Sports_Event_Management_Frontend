import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./ManageTeamRegistrations.module.css";
import { fetchWithAuth } from "../../utils/FetchClient";
import TeamRegistrationTable from "../../components/AdminPanel/TeamRegistrationTable";
import CountCard from "../../components/AdminPanel/CountCard";

function ManageTeamRegistrationsPage() {
  const [teamReg, setTeamReg] = useState([]);
  const [teamRegPending, setTeamRegPending] = useState([]);
  const [teamRegApproved, setTeamRegApproved] = useState([]);
  const [teamRegRejected, setTeamRegRejected] = useState([]);
  const [isFetchingTeamReg, setIsFetchingTeamReg] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  const tabs = ["pending", "approved", "rejected"];

  const fetchRegistration = async () => {
    try {
      setIsFetchingTeamReg(true);
      const res = await fetchWithAuth("/api/teams/registrations/");

      if (!res.ok) return toast.error("Failed to fetch team registration!");

      const data = await res.json();
      const pending = data.results.filter((item) => item.status === "pending");
      const rejected = data.results.filter(
        (item) => item.status === "rejected"
      );
      const approved = data.results.filter(
        (item) => item.status === "approved"
      );

      setTeamReg(data.results);
      setTeamRegPending(pending);
      setTeamRegRejected(rejected);
      setTeamRegApproved(approved);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetchingTeamReg(false);
    }
  };

  useEffect(() => {
    fetchRegistration();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>Team Registrations</h1>
          </div>
        </div>

        <div className={classes.statsCards}>
          <CountCard label={"Total Teams Registered"} count={teamReg.length} />
          <CountCard label={"Pending Approval"} count={teamRegPending.length} />
          <CountCard label={"Approved"} count={teamRegApproved.length} />
          <CountCard label={"Rejected"} count={teamRegRejected.length} />
        </div>

        <div className={classes.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${classes.tabsButton} ${
                activeTab === tab ? classes.active : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "pending" && (
          <div className={classes.card}>
            <div className={classes.cardHeader}>
              <h3>Pending Approval</h3>
            </div>
            <div className={classes.cardBody}>
              {isFetchingTeamReg ? (
                <p className="loadingText">Loading...</p>
              ) : teamRegPending.length === 0 ? (
                <p className="loadingText">
                  No pending registration at the moment.
                </p>
              ) : (
                <TeamRegistrationTable
                  teamRegList={teamRegPending}
                  onRefetchData={fetchRegistration}
                  isPending
                />
              )}
            </div>
          </div>
        )}

        {activeTab === "approved" && (
          <div className={classes.card}>
            <div className={classes.cardHeader}>
              <h3>Approved</h3>
            </div>
            <div className={classes.cardBody}>
              {teamRegApproved.length === 0 ? (
                <p>No approved registration at the moment.</p>
              ) : (
                <TeamRegistrationTable teamRegList={teamRegApproved} />
              )}
            </div>
          </div>
        )}

        {activeTab === "rejected" && (
          <div className={classes.card}>
            <div className={classes.cardHeader}>
              <h3>Rejected</h3>
            </div>
            <div className={classes.cardBody}>
              {teamRegRejected.length === 0 ? (
                <p>No rejected registration at the moment.</p>
              ) : (
                <TeamRegistrationTable teamRegList={teamRegRejected} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ManageTeamRegistrationsPage;
