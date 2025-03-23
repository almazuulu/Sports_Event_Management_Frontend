import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./MyTeams.module.css";
import Header from "../components/Header";
import CreateButton from "../components/Button/CreateButton";
import { fetchWithAuth } from "../utils/FetchClient";
import LoadingScreen from "../components/UI/LoadingScreen";
import Modal from "../components/UI/Modal";
import NewTeamForm from "../components/Teams/NewTeamForm";
import TeamTableManager from "../components/Teams/TeamTableManager";
import CountCard from "../components/AdminPanel/CountCard";

function MyTeamsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await fetchWithAuth("/api/teams/teams/", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, data };
      }

      if (response.ok) {
        toast.success("New team created successfully!");
        fetchMyTeams();
        setIsModalOpen(false);

        return { success: true, data };
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchMyTeams = async () => {
    try {
      setIsFetchingTeams(true);
      const response = await fetchWithAuth("/api/teams/teams/by-manager/");
      const data = await response.json();
      if (!response.ok) return toast.error("Failed to fetch teams");
      if (response.ok) {
        setTeams(data[0].teams);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingTeams(false);
    }
  };

  useEffect(() => {
    fetchMyTeams();
  }, []);

  if (isFetchingTeams) return <LoadingScreen />;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>Team Management Dashboard</h1>
          </div>
        </div>

        <div className={classes.statsCards}>
          <CountCard label={"Total Teams"} count={teams.length} />
        </div>

        <div className={classes.card}>
          <div className={classes.cardHeader}>
            <h3>My Teams</h3>
            <div>
              <CreateButton onClick={handleCreateNew}>
                Create New Team
              </CreateButton>
            </div>
          </div>
          <div className={classes.cardBody}>
            {teams.length === 0 ? (
              <p className="loadingText">No teams found. Please create a new team to begin managing.</p>
            ) : (
              <TeamTableManager teams={teams} />
            )}
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={classes.modalContainer}
      >
        <NewTeamForm
          onSubmit={handleSubmit}
          loading={isSubmitting}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default MyTeamsPage;
