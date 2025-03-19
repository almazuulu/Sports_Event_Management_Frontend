import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./ManageGamesDetails.module.css";
import { fetchWithAuth } from "../../utils/FetchClient";
import Header from "../../components/Header";
import GameInforCard from "../../components/Games/GameInforCard";
import ViewButton from "../../components/Button/ViewButton";
import Modal from "../../components/UI/Modal";
import EditGameForm from "../../components/Games/EditGameForm";
import TeamsGameCard from "../../components/Games/TeamsGameCard";
import AssignTeamForm from "../../components/Games/AssignTeamForm";
import { getUserRole } from "../../utils/Authentication";
import GameScore from "../../components/Games/GameScore";

function ManageGamesDetailsPage() {
  const role = getUserRole();
  const { gameId } = useParams();
  const [game, setGame] = useState({});
  const [availTeams, setAvailTeams] = useState([]);
  const [isFetchingGame, setIsFetchingGame] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSubmitEdit, setIsSubmitEdit] = useState(false);
  const [teamAway, setTeamAway] = useState({});
  const [teamHome, setTeamHome] = useState({});
  const [gameScore, setGameScore] = useState({});

  const editGameHandler = () => {
    setIsEditModalOpen(true);
  };

  const assignTeamHandler = () => {
    setIsAssignModalOpen(true);
  };

  const submitEditHandler = async (formData) => {
    try {
      setIsSubmitEdit(true);
      const response = await fetchWithAuth(`/api/games/games/${gameId}/`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Failed to edit game!");
      }

      if (response.ok) {
        toast.success("Game edited successfully!");
        setIsEditModalOpen(false);
        fetchGameDetails();
        return { success: true };
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitEdit(false);
    }
  };

  const submitAssignTeamHandler = async (formData) => {
    const formToSubmit = { ...formData, game: gameId };
    try {
      setIsSubmitEdit(true);
      const response = await fetchWithAuth(`/api/games/game-teams/`, {
        method: "POST",
        body: JSON.stringify(formToSubmit),
      });

      if (!response.ok) {
        toast.error("Failed to asign a team!");
      }

      if (response.ok) {
        toast.success("Team assigned successfully!");
        setIsAssignModalOpen(false);
        fetchGameDetails();
        return { success: true };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGameDetails = useCallback(async () => {
    try {
      setIsFetchingGame(true);
      const response = await fetchWithAuth(`/api/games/games/${gameId}/`);
      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to fetch game details!");
        return;
      }

      setGame(data);
      if (data.teams) {
        const home =
          data.teams.find((team) => team.designation === "Home") || null;
        const away =
          data.teams.find((team) => team.designation === "Away") || null;
        setTeamHome(home);
        setTeamAway(away);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingGame(false);
    }
  }, [gameId]);

  const fetchAvailTeams = useCallback(async () => {
    if (!game.sport_event) return;

    try {
      const response = await fetchWithAuth(
        `/api/teams/registrations/?sport_event=${game.sport_event}&status=approved`
      );
      const data = await response.json();

      if (response.ok) {
        setAvailTeams(data.results);
      }
    } catch (error) {
      console.error(error);
    }
  }, [game.sport_event]);

  const fetchGameScore = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`/api/scores/scores?game=${gameId}`);
      const data = await res.json();
      setGameScore(data.results[0]);
    } catch (error) {
      console.error(error);
    }
  }, [gameId]);

  useEffect(() => {
    fetchAvailTeams();
    fetchGameDetails();
    fetchGameScore();
  }, [fetchGameDetails, fetchAvailTeams, fetchGameScore]);

  return (
    <>
      <div className={classes.container}>
        <Header title={game.name} enableBack />
        {isFetchingGame ? (
          <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
        ) : (
          <div className={classes.content}>
            {role === "admin" && (
              <section className={classes.actions}>
                <ViewButton onClick={editGameHandler}>Edit Game</ViewButton>
              </section>
            )}
            {/* GAME INFO CARD */}
            <GameInforCard game={game} onRefetchData={fetchGameDetails} />

            {/* TEAMS SECTION */}
            {game?.teams?.length < 2 && (
              <section className={classes.actions}>
                <ViewButton onClick={assignTeamHandler}>
                  Assign Teams to Game
                </ViewButton>
              </section>
            )}
            {game.teams && (
              <div className={classes.teamsGameSection}>
                <TeamsGameCard
                  team={teamHome}
                  onRefetchData={fetchGameDetails}
                />
                <TeamsGameCard
                  team={teamAway}
                  onRefetchData={fetchGameDetails}
                />
              </div>
            )}

            {/* SCORE SECTION */}
            <GameScore gameScore={gameScore} onRefetchData={fetchGameScore}/>
          </div>
        )}
      </div>

      {/* EDIT GAME MODAL */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        className={classes.modalContainer}
      >
        <EditGameForm
          initialData={game}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={submitEditHandler}
          loading={isSubmitEdit}
        />
      </Modal>

      {/* ASSIGN TEAM TO GAME MODAL */}
      <Modal
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        className={classes.modalContainer}
      >
        <AssignTeamForm
          onClose={() => setIsAssignModalOpen(false)}
          availTeams={availTeams}
          onSubmit={submitAssignTeamHandler}
        />
      </Modal>
    </>
  );
}

export default ManageGamesDetailsPage;
