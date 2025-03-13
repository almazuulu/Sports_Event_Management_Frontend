import { useState } from "react";

import classes from "./TeamsGameCard.module.css";
import CancelButton from "../Button/CancelButton";
import DeleteButton from "../Button/DeleteButton";
import ViewButton from "../Button/ViewButton";
import Modal from "../UI/Modal";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../utils/FetchClient";

function TeamsGameCard({ team = {}, onRefetchData }) {
  const { players } = team;
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const handleDeletePlayer = (playerId) => {
    setIsDeleting(true);
    setSelectedPlayer(playerId);
  };

  const confirmDeletePlayer = async () => {
    try {
      setIsDeleting(true);
      const response = await fetchWithAuth(
        `/api/games/game-players/${selectedPlayer}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        toast.error(`Failed to delete selected player!`);
      }

      if (response.ok) {
        toast.success("Selected player deleted successfully!");
        setIsDeleting(false);
        onRefetchData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div>
          <p className={classes.teamLabel}>
            {team.designation}: {team.team_name}
          </p>
        </div>
        {players.length === 0 ? (
          <p>No players added to this team yet.</p>
        ) : (
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>PLAYER</th>
                  <th>JERSEY</th>
                  <th>POSITION</th>
                  <th>CAPTAIN</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.player}>
                    <td>{player.name}</td>
                    <td>{player.jersey_number}</td>
                    <td>{player.position}</td>
                    <td>
                      {player.is_captain_for_game === true ? "Yes" : "No"}
                    </td>
                    <td>
                      <ViewButton style={{ marginRight: "10px" }}>
                        View
                      </ViewButton>
                      <DeleteButton
                        onClick={() => handleDeletePlayer(player.id)}
                      >
                        Remove
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DELETE PLAYER */}
      <Modal
        className={classes.modalContainer}
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      >
        <p>Are you sure you want to delete this player?</p>
        <DeleteButton
          style={{ marginRight: "10px" }}
          onClick={confirmDeletePlayer}
        >
          Yes, Delete
        </DeleteButton>
        <CancelButton onClick={() => setIsDeleting(false)}>Cancel</CancelButton>
      </Modal>
    </>
  );
}

export default TeamsGameCard;
