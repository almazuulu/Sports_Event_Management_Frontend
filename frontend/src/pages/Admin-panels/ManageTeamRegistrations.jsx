import { useEffect, useState } from "react";

import classes from "./ManageTeamRegistrations.module.css";
import Header from "../../components/Header";
import { fetchWithAuth } from "../../utils/FetchClient";
import { toast } from "react-toastify";
import TeamRegistrationTable from "../../components/AdminPanel/TeamRegistrationTable";

function ManageTeamRegistrationsPage() {
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
      const data = await res.json();

      if (!res.ok) return toast.error("Failed to fetch team registration!");
      if (res.ok) {
        const pending = data.results.filter(
          (item) => item.status === "pending"
        );
        const rejected = data.results.filter(
          (item) => item.status === "rejected"
        );
        const approved = data.results.filter(
          (item) => item.status === "approved"
        );

        setTeamRegPending(pending);
        setTeamRegRejected(rejected);
        setTeamRegApproved(approved);
      }
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
        <Header title={"Manage Registrations"} />

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

        <div className={classes.card}>
          {activeTab === "pending" && (
            <>
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
            </>
          )}
          {activeTab === "approved" && (
            <>
              {teamRegApproved.length === 0 ? (
                <p>No approved registration at the moment.</p>
              ) : (
                <TeamRegistrationTable teamRegList={teamRegApproved} />
              )}
            </>
          )}
          {activeTab === "rejected" && (
            <>
              {teamRegRejected.length === 0 ? (
                <p>No rejected registration at the moment.</p>
              ) : (
                <TeamRegistrationTable teamRegList={teamRegRejected} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageTeamRegistrationsPage;
