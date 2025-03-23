import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./ManageGames.module.css";
import { fetchWithAuth } from "../../utils/FetchClient";
import CreateButton from "../../components/Button/CreateButton";
import Modal from "../../components/UI/Modal";
import CreateGameForm from "../../components/Games/CreateGameForm";
import AdminGamesTable from "../../components/AdminPanel/AdminGamesTable";
import GamesFilter from "../../components/Games/GamesFilter";
import CountCard from "../../components/AdminPanel/CountCard";

function ManageGamesPage() {
  const [games, setGames] = useState([]);
  const [gamesCount, setGamesCount] = useState([]);
  const [sportEvents, setSportEvents] = useState([]);
  const [isFetchingGames, setIsFetchingGames] = useState(false);
  const [isFetchingSportEvents, setIsFetchingSportEvents] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateNewGame = () => {
    setIsModalOpen(true);
  };

  const handleSubmitNewGame = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await fetchWithAuth("/api/games/games/", {
        method: "POST",
        body: JSON.stringify(formData),
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
        toast.success("New game created successfully!");
        setIsModalOpen(false);
        fetchAllGames();

        return { success: true, data };
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchAllGames = async (filters = {}) => {
    try {
      setIsFetchingGames(true);
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/games/games/${queryParams ? `?${queryParams}` : ""}`;
      const response = await fetchWithAuth(url);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const data = await response.json();
      setGames(data.results);

      const res = await fetchWithAuth("/api/games/games/");
      const resData = await res.json();
      setGamesCount(resData.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingGames(false);
    }
  };

  const fetchSportEvents = async () => {
    try {
      setIsFetchingSportEvents(true);
      const response = await fetchWithAuth("/api/events/sport-events/");
      if (!response.ok) {
        throw new Error("Failed to fetch sport events");
      }

      const data = await response.json();
      setSportEvents(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingSportEvents(false);
    }
  };

  useEffect(() => {
    fetchAllGames();
    fetchSportEvents();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>Match Management</h1>
          </div>
          <div>
            <CreateButton onClick={handleCreateNewGame}>
              Create New Match
            </CreateButton>
          </div>
        </div>

        <div className={classes.statsCards}>
          <CountCard
            label={"Ongoing"}
            count={
              gamesCount.filter((game) => game.status === "ongoing").length
            }
          />
          <CountCard
            label={"Scheduled"}
            count={
              gamesCount.filter((game) => game.status === "scheduled").length
            }
          />
          <CountCard
            label={"Completed"}
            count={
              gamesCount.filter((game) => game.status === "completed").length
            }
          />
          <CountCard
            label={"Cancelled"}
            count={
              gamesCount.filter((game) => game.status === "cancelled").length
            }
          />
        </div>

        <GamesFilter onFilter={fetchAllGames} />
        
        <div className={classes.card}>
          {isFetchingGames ? (
            <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
          ) : games.length === 0 ? (
            <p style={{ color: "#000", textAlign: "center" }}>
              No games available at the moment.
            </p>
          ) : (
            <>
              <AdminGamesTable gamesList={games} onRefetch={fetchAllGames} />
            </>
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={classes.modalContainer}
      >
        <CreateGameForm
          onSubmit={handleSubmitNewGame}
          loading={isSubmitting}
          onClose={() => setIsModalOpen(false)}
          sportEventList={sportEvents}
        />
      </Modal>
    </>
  );
}

export default ManageGamesPage;
