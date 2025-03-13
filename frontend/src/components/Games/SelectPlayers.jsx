import { useState } from "react";
import { toast } from "react-toastify";

import classes from "./SelectPlayers.module.css";
import ViewButton from "../Button/ViewButton";
import Modal from "../UI/Modal";
import CancelButton from "../Button/CancelButton";
import CreateButton from "../Button/CreateButton";
import { fetchWithAuth } from "../../utils/FetchClient";

function SelectPlayers({ players = [], game_team_id }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedCaptain, setSelectedCaptain] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCaptainChange = (playerId) => {
    setSelectedCaptain(playerId);
    setSelectedPlayers((prevSelected) =>
      prevSelected.map((p) =>
        p.player === playerId
          ? { ...p, is_captain_for_game: true }
          : { ...p, is_captain_for_game: false }
      )
    );
  };

  const handlePlayerSelection = (player) => {
    setSelectedPlayers((prevSelected) => {
      const existingPlayer = prevSelected.find((p) => p.player === player.id);
      if (existingPlayer) {
        return prevSelected.filter((p) => p.player !== player.id);
      } else {
        return [
          ...prevSelected,
          {
            game_team: game_team_id,
            player: player.id,
            is_captain_for_game: selectedCaptain === player.id,
            position: player.position,
            notes: "Starting player",
          },
        ];
      }
    });
  };

  const handleSubmitPlayers = () => {
    if (selectedCaptain === "") {
      toast.warning("Please select a captain to submit");
      return;
    }
    setIsSubmitModalOpen(true);
  };

  const confirmSubmitPlayers = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetchWithAuth(
        "/api/games/game-players/bulk-create/",
        {
          method: "POST",
          body: JSON.stringify(selectedPlayers),
        }
      );

      if (!response.ok) {
        toast.error(`Failed to submit selected players!`);
      }

      if (response.ok) {
        toast.success("Selected players submitted successfully!");
        setSelectedPlayers([]);
        setIsSubmitModalOpen(false)
        setSelectedCaptain('')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <p>Select Players for This Game</p>
        </div>
        <div>
          <table>
            <thead>
              <th></th>
              <th>PLAYER</th>
              <th>JERSEY #</th>
              <th>POSITON</th>
              <th>TEAM CAPTAIN</th>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handlePlayerSelection(player)}
                      checked={selectedPlayers.some(
                        (p) => p.player === player.id
                      )}
                    />
                  </td>
                  <td>
                    {player.first_name} {player.last_name}
                  </td>
                  <td>{player.jersey_number}</td>
                  <td>{player.position}</td>
                  <td>
                    <input
                      type="radio"
                      name="teamCaptain"
                      value={player.id}
                      onChange={() => handleCaptainChange(player.id)}
                      checked={selectedCaptain === player.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={classes.actionButton}>
          <ViewButton onClick={handleSubmitPlayers}>
            Submit Selected Players
          </ViewButton>
        </div>
      </div>

      <Modal
        className={classes.modalContainer}
        open={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      >
        <p>Are you sure you want to submit?</p>
        <CreateButton
          style={{ marginRight: "10px" }}
          onClick={confirmSubmitPlayers}
        >
          Yes, Submit
        </CreateButton>
        <CancelButton onClick={() => setIsSubmitModalOpen(false)}>
          Cancel
        </CancelButton>
      </Modal>
    </>
  );
}

export default SelectPlayers;
