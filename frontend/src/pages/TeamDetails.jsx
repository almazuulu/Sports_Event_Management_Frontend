import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./TeamDetails.module.css";
import { fetchWithAuth } from "../utils/FetchClient";
import Header from "../components/Header";
import ViewTeamForm from "../components/Teams/ViewTeamForm";
import { getUserRole } from "../utils/Authentication";
import CreateButton from "../components/Button/CreateButton";
import Modal from "../components/UI/Modal";
import NewTeamForm from "../components/Teams/NewTeamForm";
import PlayerTable from "../components/Players/PlayerTable";
import RegisterSportEventForm from "../components/SportEvents/RegisterSportEventForm";
import JoinedSportEventTable from "../components/Teams/JoinedSportEventTable";
import CreatePlayerForm from "../components/Players/CreatePlayerForm";
import CancelButton from "../components/Button/CancelButton";

function TeamDetailsPage() {
  const role = getUserRole();
  const { teamId } = useParams();
  const [isFetchingTeam, setIsFetchingTeam] = useState(false);
  const [isFetchingPlayers, setIsFetchingPlayers] = useState(false);
  const [isFetchingJoinedSportEvents, setIsFetchingJoinedSportEvents] =
    useState(false);
  const [team, setTeam] = useState([]);
  const [players, setPlayers] = useState([]);
  const [sportEvents, setSportEvents] = useState([]);
  const [sportEventsJoined, setSportEventsJoined] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingNewPlayer, setIsSubmittingNewPlayer] = useState(false);
  const [isSubmittingJoinSportEvent, setIsSubmittingJoinSportEvent] =
    useState(false);
  const [isModalAddPlayerOpen, setIsModalAddPlayerOpen] = useState(false);
  const [isModalJoinSportEventsOpen, setIsModalJoinSportEventsOpen] =
    useState(false);
  const [isModalCaptainOpen, setIsModalCaptainOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [isFetchingSportEvents, setIsFetchingSportEvents] = useState(false);
  const [isFetchingAvailPlayers, setIsFetchingAvailPlayers] = useState(false);
  const [availPlayers, setAvailPlayers] = useState([]);
  const [teamCaptain, setTeamCaptain] = useState("");
  const [selectedCaptain, setSelectedCaptain] = useState("");

  const handleEdit = () => {
    setIsModalOpen((prevData) => !prevData);
  };

  const handleAddPlayer = () => {
    setIsModalAddPlayerOpen(true);
  };

  const handleJoinSportEvents = () => {
    setIsModalJoinSportEventsOpen(true);
  };

  const handleChangeCaptain = () => {
    setIsModalCaptainOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await fetchWithAuth(`/api/teams/teams/${teamId}/`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Failed to update new team!");
      }

      if (response.ok) {
        toast.success("Team updated successfully!");
        setIsModalOpen(false);
        fetchTeam();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAddPlayer = async (formData) => {
    const formDataToSend = {
      ...formData,
      team: teamId,
    };

    try {
      setIsSubmittingNewPlayer(true);
      const response = await fetchWithAuth("/api/teams/players/", {
        method: "POST",
        body: JSON.stringify(formDataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          <div>
            <strong>Failed to submit form:</strong>
            <ul>
              {Object.entries(data).map(([field, messages]) => (
                <li key={field}>
                  <strong>{field}:</strong> {messages.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      if (response.ok) {
        toast.success("New player added successfully!");
        setIsModalAddPlayerOpen(false);
        fetchPlayers();

        return { success: true };
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewPlayer(false);
    }
  };

  const handleSubmitJoinSportEvent = async (formData) => {
    const formDataToSend = {
      ...formData,
      team: teamId,
    };
    try {
      setIsSubmittingJoinSportEvent(true);
      const response = await fetchWithAuth(`/api/teams/registrations/`, {
        method: "POST",
        body: JSON.stringify(formDataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.error[0];
        toast.error(message);
      }

      if (response.ok) {
        toast.success("Sport events registered successfully!");
        fetchSportEventsJoined();

        return { success: true };
      }
    } catch (error) {
      console.error(error);
      toast.warning("Your team has been registered for this sport event.");
    } finally {
      setIsSubmittingJoinSportEvent(false);
    }
  };

  const confirmTeamCaptain = async () => {
    if (!selectedCaptain) toast.error("Please select a team captain!");
    try {
      const response = await fetchWithAuth(
        `/api/teams/teams/${team.id}/set-captain/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            player_id: selectedCaptain,
          }),
        }
      );

      if (response.ok) {
        toast.success("New captain is appointed successfully!");
        setIsModalCaptainOpen(false);
        fetchPlayers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeam = useCallback(async () => {
    try {
      setIsFetchingTeam(true);
      const response = await fetchWithAuth(`/api/teams/teams/${teamId}/`);
      const data = await response.json();

      if (!response.ok) {
        return toast.error("Failed to fetch team data");
      }

      console.log(data);
      setTeam(data);
      setTeamCaptain(data.team_captain);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingTeam(false);
    }
  }, [teamId]);

  const fetchPlayers = useCallback(async () => {
    try {
      setIsFetchingPlayers(true);
      const response = await fetchWithAuth(
        `/api/teams/teams/${teamId}/players/`
      );
      const data = await response.json();

      if (!response.ok) {
        return toast.error("Failed to fetch players data");
      }

      if (response.ok) {
        setPlayers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingPlayers(false);
    }
  }, [teamId]);

  const fetchSportEventsJoined = useCallback(async () => {
    try {
      setIsFetchingJoinedSportEvents(true);
      const response = await fetchWithAuth(
        `/api/teams/teams/${teamId}/registrations/`
      );
      const data = await response.json();

      if (!response.ok) {
        return toast.error("Failed to fetch joined sport events data");
      }

      if (response.ok) {
        setSportEventsJoined(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingJoinedSportEvents(false);
    }
  }, [teamId]);

  useEffect(() => {
    const fetchSportEvents = async () => {
      try {
        setIsFetchingSportEvents(true);
        const response = await fetchWithAuth("/api/events/sport-events/");

        if (!response.ok) {
          toast.error("Failed to fetch sport events data");
        }

        const data = await response.json();
        setSportEvents(data.results);
      } catch (error) {
        console.error("Error fetching sport events data:", error);
      } finally {
        setIsFetchingSportEvents(false);
      }
    };

    const fetchAvailPlayersList = async () => {
      try {
        setIsFetchingAvailPlayers(true);
        const response = await fetchWithAuth(
          "/api/teams/teams/available-players/?available_only=true"
        );

        if (!response.ok) {
          toast.error("Failed to fetch avail players data");
        }

        const data = await response.json();
        setAvailPlayers(data.players);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingAvailPlayers(false);
      }
    };

    fetchSportEvents();
    fetchAvailPlayersList();
  }, []);

  useEffect(() => {
    fetchTeam();
    fetchPlayers();
    fetchSportEventsJoined();
  }, [fetchTeam, fetchPlayers, fetchSportEventsJoined]);

  return (
    <>
      <div className={classes.container}>
        <Header title={team.name} enableBack />

        <div className={classes.tabsContainer}>
          <button
            type="button"
            className={
              activeTab === "details"
                ? `${classes.tabsButton} ${classes.active}`
                : classes.tabsButton
            }
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            type="button"
            className={
              activeTab === "players"
                ? `${classes.tabsButton} ${classes.active}`
                : classes.tabsButton
            }
            onClick={() => setActiveTab("players")}
          >
            Players
          </button>
          <button
            type="button"
            className={
              activeTab === "sport-events"
                ? `${classes.tabsButton} ${classes.active}`
                : classes.tabsButton
            }
            onClick={() => setActiveTab("sport-events")}
          >
            Sport Events
          </button>
        </div>

        <div className={classes.card}>
          {activeTab === "details" && (
            <>
              {((role === "admin" &&
                window.location.pathname.includes("/manage-teams/")) ||
                (role === "team_manager" &&
                  window.location.pathname.includes("/organize-teams/"))) && (
                <section className={classes.sectionButton}>
                  <CreateButton
                    style={{ marginRight: "10px" }}
                    onClick={handleEdit}
                  >
                    Edit
                  </CreateButton>
                </section>
              )}
              {isFetchingTeam ? (
                <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
              ) : (
                <ViewTeamForm initialData={team} />
              )}
            </>
          )}

          {activeTab === "players" && (
            <>
              {role === "team_manager" &&
                window.location.pathname.includes("/organize-teams/") && (
                  <section className={classes.sectionButton}>
                    <CreateButton
                      style={{ marginRight: "10px" }}
                      onClick={handleAddPlayer}
                    >
                      Add Player
                    </CreateButton>
                    <CancelButton onClick={() => handleChangeCaptain()}>
                      {teamCaptain ? "Change Team Captain" : "Set Team Captain"}
                    </CancelButton>
                  </section>
                )}
              {isFetchingPlayers ? (
                <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
              ) : players.length === 0 ? (
                <p>No players available.</p>
              ) : (
                <PlayerTable players={players} onRefetchData={fetchPlayers} />
              )}
            </>
          )}

          {activeTab === "sport-events" && (
            <>
              {role === "team_manager" &&
                window.location.pathname.includes("/organize-teams/") && (
                  <section className={classes.sectionButton}>
                    <CreateButton
                      style={{ marginRight: "10px" }}
                      onClick={handleJoinSportEvents}
                    >
                      Join Sport Events
                    </CreateButton>
                  </section>
                )}
              {isFetchingJoinedSportEvents ? (
                <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
              ) : sportEventsJoined.length === 0 ? (
                <p>No sport events joined.</p>
              ) : (
                <JoinedSportEventTable
                  sportEventList={sportEventsJoined}
                  onRefetchData={fetchSportEventsJoined}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={classes.modalContainer}
      >
        <NewTeamForm
          onSubmit={handleSubmit}
          loading={isSubmitting}
          onClose={() => setIsModalOpen(false)}
          initialData={{
            name: team.name,
            description: team.description,
            contact_email: team.contact_email,
            contact_phone: team.contact_phone,
            status: team.status,
          }}
        />
      </Modal>

      {/* ADD PLAYER MODAL */}
      <Modal
        open={isModalAddPlayerOpen}
        onClose={() => setIsModalAddPlayerOpen(false)}
        className={classes.modalContainer}
      >
        <CreatePlayerForm
          onSubmit={handleSubmitAddPlayer}
          onClose={() => setIsModalAddPlayerOpen(false)}
          loading={isSubmittingNewPlayer}
          playerList={availPlayers}
        />
      </Modal>

      {/* JOIN SPORT EVENTS MODAL */}
      <Modal
        open={isModalJoinSportEventsOpen}
        onClose={() => setIsModalJoinSportEventsOpen(false)}
        className={classes.modalContainer}
      >
        <RegisterSportEventForm
          onSubmit={handleSubmitJoinSportEvent}
          loading={isSubmittingJoinSportEvent}
          onClose={() => setIsModalJoinSportEventsOpen(false)}
          sportEvents={sportEvents}
        />
      </Modal>

      {/* CHANGE CAPTAIN MODAL */}
      <Modal
        className={classes.modalContainer}
        open={isModalCaptainOpen}
        onClose={() => setIsModalCaptainOpen(false)}
      >
        <section style={{ display: "flex", flexDirection: "column" }}>
          <label>Please select a player as team captain: </label>
          <select
            className={classes.select}
            onChange={(e) => setSelectedCaptain(e.target.value)}
          >
            <option value="">-- Select a Player --</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.first_name} {player.last_name}
              </option>
            ))}
          </select>
        </section>
        <CreateButton
          style={{ marginRight: "10px" }}
          onClick={confirmTeamCaptain}
        >
          Yes, Confirm
        </CreateButton>
        <CancelButton onClick={() => setIsModalCaptainOpen(false)}>
          Cancel
        </CancelButton>
      </Modal>
    </>
  );
}

export default TeamDetailsPage;
