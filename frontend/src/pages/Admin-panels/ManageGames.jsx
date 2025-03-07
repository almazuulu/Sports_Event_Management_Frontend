import { useEffect, useState } from "react";

import classes from "./ManageGames.module.css";
import Header from "../../components/Header";
import { fetchWithAuth } from "../../utils/FetchClient";
import { toast } from "react-toastify";
import CreateButton from "../../components/Button/CreateButton";
import LoadingScreen from "../../components/UI/LoadingScreen";
import Modal from "../../components/UI/Modal";
import CreateGameForm from "../../components/Games/CreateGameForm";

function ManageGamesPage() {
  const [games, setGames] = useState([]);
  const [sportEvents, setSportEvents] = useState([]);
  const [scorekeeper, setScorekeeper] = useState([]);
  const [isFetchingGames, setIsFetchingGames] = useState(false);
  const [isFetchingSportEvents, setIsFetchingSportEvents] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleSubmitNewEvent = async (formData) => {
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

  const fetchAllGames = async () => {
    try {
      setIsFetchingGames(true);
      const response = await fetchWithAuth("/api/games/games/");
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

  if (isFetchingGames) return <LoadingScreen />;

  return (
    <>
      <div className={classes.container}>
        <Header title={"Manage Games"} />
        <div className={classes.card}>
          <section className={classes.sectionButton}>
            <CreateButton onClick={handleCreateNew}>
              Create New Game
            </CreateButton>
          </section>
          {games.length === 0 && (
            <p style={{ color: "#000", textAlign: "center" }}>
              No games available at the moment.
            </p>
          )}
          {/* {games.length > 0 && <TeamTable teams={teams} />} */}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={classes.modalContainer}
      >
        <CreateGameForm
          onSubmit={handleSubmitNewEvent}
          loading={isSubmitting}
          onClose={() => setIsModalOpen(false)}
          sportEventList={sportEvents}
        />
      </Modal>
    </>
  );
}

export default ManageGamesPage;
