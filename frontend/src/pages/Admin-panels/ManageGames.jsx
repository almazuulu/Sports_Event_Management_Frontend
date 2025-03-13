import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./ManageGames.module.css";
import Header from "../../components/Header";
import { fetchWithAuth } from "../../utils/FetchClient";
import CreateButton from "../../components/Button/CreateButton";
import Modal from "../../components/UI/Modal";
import CreateGameForm from "../../components/Games/CreateGameForm";
import AdminGamesTable from "../../components/AdminPanel/AdminGamesTable";
import GamesFilter from "../../components/Games/GamesFilter";

function ManageGamesPage() {
  const [games, setGames] = useState([]);
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
      const data = await response.json();
      if (!response.ok) return toast.error("Failed to fetch games");
      if (response.ok) {
        setGames(data.results);
      }
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
      const data = await response.json();
      if (!response.ok) return toast.error("Failed to fetch sport events");
      if (response.ok) {
        setSportEvents(data.results);
      }
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
        <Header title={"Manage Games"} />
        <div className={classes.card}>
          <section className={classes.sectionButton}>
            <CreateButton onClick={handleCreateNewGame}>
              Create New Game
            </CreateButton>
          </section>
          {isFetchingGames ? (
            <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
          ) : games.length === 0 ? (
            <p style={{ color: "#000", textAlign: "center" }}>
              No games available at the moment.
            </p>
          ) : (
            <>
              <GamesFilter onFilter={fetchAllGames} />
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
