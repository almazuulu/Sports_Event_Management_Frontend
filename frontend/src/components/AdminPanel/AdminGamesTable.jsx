import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./AdminGamesTable.module.css";
import ViewButton from "../Button/ViewButton";
import StatusChip from "../StatusChip";
import { formatToShortDateTime } from "../../utils/helpers";
import { fetchWithAuth } from "../../utils/FetchClient";
import DeleteButton from "../Button/DeleteButton";
import CancelButton from "../Button/CancelButton";
import Modal from "../UI/Modal";

function AdminGamesTable({ gamesList = [], onRefetch }) {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");
  const [isDeletingGame, setIsDeletingGame] = useState(false);

  const handleDeleteGame = (gameId) => {
    setIsDeletingGame(true);
    setGameId(gameId);
  };

  const confirmDeleteGame = async () => {
    try {
      setIsDeletingGame(true);
      const response = await fetchWithAuth(`/api/games/games/${gameId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Game deleted successfully!");
        onRefetch();
      }
    } catch (error) {
      console.error("Error deleting game:", error);
    } finally {
      setIsDeletingGame(false);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>GAME NAME</th>
            <th>SPORT EVENT</th>
            {/* <th>TEAMS</th> */}
            <th>DATE & TIME</th>
            <th>VENUE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {gamesList.map((game) => (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td>{game.sport_event_name}</td>
              {/* <td>
                {game.teams[1].team_name} vs {game.teams[0].team_name}
              </td> */}
              <td>{formatToShortDateTime(game.start_datetime)}</td>
              <td>{game.location}</td>
              <td>
                <StatusChip status={game.status} />
              </td>
              <td>
                <ViewButton
                  style={{ marginRight: "10px" }}
                  onClick={() => navigate(`${game.id}`)}
                >
                  View
                </ViewButton>
                <DeleteButton onClick={() => handleDeleteGame(game.id)}>
                  Delete
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DELETE GAME MODAL */}
      <Modal
        className={classes.modalContainer}
        open={isDeletingGame}
        onClose={() => setIsDeletingGame(false)}
      >
        <p>Are you sure you want to delete this game?</p>
        <DeleteButton
          style={{ marginRight: "10px" }}
          onClick={confirmDeleteGame}
        >
          Yes, Delete
        </DeleteButton>
        <CancelButton onClick={() => setIsDeletingGame(false)}>
          Cancel
        </CancelButton>
      </Modal>
    </>
  );
}

export default AdminGamesTable;
