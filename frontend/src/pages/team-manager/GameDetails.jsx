import { useCallback, useEffect, useState } from "react";

import classes from "./GameDetails.module.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../utils/FetchClient";
import GameDetailsHeader from "../../components/Games/GameDetailsHeader";
import Header from "../../components/Header";
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
      const data = await response.json();

      if (!response.ok) {
        return toast.error("Failed to fetch game data!");
      }

      if (response.ok) {
        setGame(data.results[0]);
      }
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
      const data = await response.json();

      if (!response.ok) {
        return toast.error("Failed to fetch avail players!");
      }

      if (response.ok) {
        setAvailPlayers(data);
      }
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
        <Header enableBack title={"Game Details"} />
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
