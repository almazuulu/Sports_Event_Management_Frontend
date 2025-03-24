import { useState } from "react";
import { toast } from "react-toastify";

import classes from "./GameInforCard.module.css";
import StatusChip from "../StatusChip";
import { formatToShortDateTime, formatToTimeOnly } from "../../utils/helpers";
import Modal from "../UI/Modal";
import { fetchWithAuth } from "../../utils/FetchClient";
import CreateButton from "../Button/CreateButton";
import { getUserInfo, getUserRole, isAuthenticated } from "../../utils/Authentication";
import NormalButton from "../Button/NormalButton";

function GameInforCard({ game = {}, onRefetchData }) {
  const userInfo = getUserInfo()
  const [isUpdateStatus, setIsUpdateStatus] = useState(false);
  const [isSubmittingStatus, setIsSubmittingStatus] = useState(false);

  const startGameHandler = () => {
    setIsUpdateStatus(true);
  };

  const confirmStart = async () => {
    try {
      setIsSubmittingStatus(true);
      const response = await fetchWithAuth(
        `/api/games/games/${game.id}/update-status/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "ongoing",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.status[0]);
      }

      if (response.ok) {
        setIsUpdateStatus(false);
        toast.success("This game is started!");
        onRefetchData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingStatus(false);
    }
  };
  return (
    <>
      <div className={classes.container}>
        <section className={classes.content}>
          <div>
            <p className={classes.label}>Sport Event</p>
            <p>{game.sport_event_name}</p>
          </div>
          <div>
            <p className={classes.label}>Date & Time</p>
            <p>
              {formatToShortDateTime(game.start_datetime)} -{" "}
              {formatToTimeOnly(game.end_datetime)}
            </p>
          </div>
          <div>
            <p className={classes.label}>Venue</p>
            <p>{game.location}</p>
          </div>
        </section>
        <section className={classes.content}>
          <div>
            <p className={classes.label}>Status</p>
            <StatusChip status={game?.status} />
          </div>
          <div>
            <p className={classes.label}>Scorekeeper</p>
            <p>{game.scorekeeper_name ?? "N/A"}</p>
          </div>
          <div>
            <p className={classes.label}>Created At</p>
            <p>{formatToShortDateTime(game.created_at)}</p>
          </div>
        </section>
        <section className={classes.content}>
          <div>
            <p className={classes.label}>Description</p>
            <p>{game.description}</p>
          </div>
          {userInfo && userInfo.role === "scorekeeper" && game?.status === "ongoing" && (
            <div>
              <p className={classes.label}>Actions</p>
              <div>
                <CreateButton
                  onClick={startGameHandler}
                  disabled={game?.status !== "ongoing"}
                >
                  Start Game
                </CreateButton>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* UPDATE GAME STATUS MODAL */}
      <Modal
        open={isUpdateStatus}
        onClose={() => setIsUpdateStatus(false)}
        className={classes.modalContainer}
      >
        <p>Are you sure you want to start this game?</p>
        <CreateButton style={{ marginRight: "10px" }} onClick={confirmStart}>
          Yes, Start
        </CreateButton>
        <NormalButton onClick={() => setIsUpdateStatus(false)}>
          Cancel
        </NormalButton>
      </Modal>
    </>
  );
}

export default GameInforCard;
