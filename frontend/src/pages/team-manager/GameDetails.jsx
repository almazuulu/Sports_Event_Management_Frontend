import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./GameDetails.module.css";
import { fetchWithAuth } from "../../utils/FetchClient";
import GameDetailsHeader from "../../components/Games/GameDetailsHeader";
import SelectPlayers from "../../components/Games/SelectPlayers";

function GameDetailsPage() {
  const { teamId, gameId } = useParams();
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [game, setGame] = useState({});
  const [availPlayers, setAvailPlayers] = useState([]);

  const fetchGameDetails = useCallback(async () => {
    try {
      setIsFetchingDetails(true);
      const response = await fetchWithAuth(
        `/api/games/game-teams/?game=${gameId}&team=${teamId}`
      );

      if (!response.ok) {
        return toast.error("Failed to fetch game data!");
      }

      const data = await response.json();
      setGame(data.results[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingDetails(false);
    }
  }, [teamId, gameId]);

  const fetchAvailPlayers = useCallback(async () => {
    try {
      const response = await fetchWithAuth(
        `/api/teams/teams/${teamId}/players/`
      );

      if (!response.ok) {
        return toast.error("Failed to fetch avail players!");
      }

      const data = await response.json();
      setAvailPlayers(data);
    } catch (error) {
      console.error(error);
    }
  }, [teamId]);

  useEffect(() => {
    fetchGameDetails();
    fetchAvailPlayers();
  }, [fetchGameDetails, fetchAvailPlayers]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>Game Details</h1>
          </div>
        </div>

        {isFetchingDetails ? (
          <p className="loadingText">Loading...</p>
        ) : (
          <>
            <GameDetailsHeader game={game} />
            <SelectPlayers players={availPlayers} game_team_id={game.id} />
          </>
        )}
      </div>
    </>
  );
}

export default GameDetailsPage;
