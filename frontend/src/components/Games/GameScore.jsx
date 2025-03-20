import { useNavigate, useParams } from "react-router-dom";

import classes from "./GameScore.module.css";
import CreateButton from "../Button/CreateButton";
import { fetchWithAuth } from "../../utils/FetchClient";
import { getUserInfo, getUserRole } from "../../utils/Authentication";
import { toast } from "react-toastify";
import ViewButton from "../Button/ViewButton";

const getStatusName = (status) => {
  const statusMap = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return statusMap[status] || "Unknown Status";
};

function GameScore({ gameScore, onRefetchData }) {
  const userInfo = getUserInfo();
  const role = getUserRole();
  const { gameId } = useParams();
  const navigate = useNavigate();

  const createNewScoreHandler = async () => {
    try {
      const res = await fetchWithAuth("/api/scores/scores/", {
        method: "POST",
        body: JSON.stringify({
          game: gameId,
          status: "in_progress",
          scorekeeper: userInfo.id,
        }),
      });

      if (!res.ok) return toast.error("Failed to create new game score!");

      toast.success("New game score created for this game.");
      onRefetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (!gameScore) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <p className={classes.title}>Game Score</p>
          {role === "scorekeeper" && gameScore?.status === "in_progress" && (
            <div>
              <CreateButton onClick={createNewScoreHandler}>
                Create a game score
              </CreateButton>
            </div>
          )}
        </div>
        <p className="loadingText">No game score created for this match yet.</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p className={classes.title}>Game Score</p>
        {role === "scorekeeper" && gameScore?.status === "in_progress" && (
          <div>
            <ViewButton
              onClick={() => navigate(`game-scores/${gameScore?.id}`)}
            >
              Update Score
            </ViewButton>
          </div>
        )}
      </div>

      <div className={classes.grid}>
        <div className={classes.teamOne}>
          <p className={classes.title}>{gameScore?.team1_name || "N/A"}</p>
          <p className={classes.score}>{gameScore?.final_score_team1 ?? "-"}</p>
        </div>
        <div className={classes.gameStatus}>
          <p className={classes.label}>Status</p>
          <p className={classes.status}>
            {getStatusName(gameScore?.status) || "Unknown"}
          </p>
        </div>
        <div className={classes.teamTwo}>
          <p className={classes.title}>{gameScore?.team2_name || "N/A"}</p>
          <p className={classes.score}>{gameScore?.final_score_team2 ?? "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default GameScore;
