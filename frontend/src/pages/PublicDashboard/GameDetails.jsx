import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./GameDetails.module.css";
import GameInforCard from "../../components/Games/GameInforCard";
import TeamsGameCard from "../../components/Games/TeamsGameCard";
import GameScore from "../../components/Games/GameScore";
import { fetchWithoutAuth } from "../../utils/FetchClient";
import ViewButton from "../../components/Button/ViewButton";
import NormalButton from "../../components/Button/NormalButton";

const GameDetails = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [gameDetails, setGamedetails] = useState(null);
  const [gameScore, setGameScore] = useState({});
  const [scoringEvents, setScoringEvents] = useState([]);
  const [error, setError] = useState(null);
  const [teamAway, setTeamAway] = useState({});
  const [teamHome, setTeamHome] = useState({});

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const [gameRes, scoreRes] = await Promise.all([
          fetchWithoutAuth(`/api/games/games/${gameId}`),
          fetchWithoutAuth(`/api/scores/scores/public/?game=${gameId}`),
        ]);

        if (!gameRes.ok || !scoreRes.ok) {
          throw new Error("Network response was not ok");
        }

        const gameData = await gameRes.json();
        const scoreData = await scoreRes.json();

        setGamedetails(gameData);

        if (gameData.teams?.length) {
          setTeamHome(
            gameData.teams.find((team) => team.designation === "Home") || null
          );
          setTeamAway(
            gameData.teams.find((team) => team.designation === "Away") || null
          );
        }

        const gameScore = scoreData.results?.[0] || null;
        setGameScore(gameScore);
        setScoringEvents(gameScore?.score_details || []);
      } catch (error) {
        setError(error.message);
      }
    };

    if (gameId) fetchGameData();
  }, [gameId]);

  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!gameDetails) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2>{gameDetails.name}</h2>
        <NormalButton onClick={() => navigate("..")}>
          Back to Fixtures
        </NormalButton>
      </div>
      <GameInforCard game={gameDetails} />

      {gameDetails.teams && (
        <div className={styles.teamsGameSection}>
          <TeamsGameCard team={teamHome} />
          <TeamsGameCard team={teamAway} />
        </div>
      )}

      {/* <GameScore gameScore={gameScore} /> */}

      {/* Scoring Events */}
      {/* <div className={styles.scoringEvents}>
        <h2>Scoring Events</h2>
        {!scoringEvents && (
          <p className="loadingText">No scoring events at the moment.</p>
        )}

        {scoringEvents && (
          <table className={styles.scoringTable}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Quarter</th>
                <th>Team</th>
                <th>Player</th>
                <th>Points</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {scoringEvents?.map((score) => (
                <tr key={score.id}>
                  <td>{score.minute}'</td>
                  <td>{score.period}</td>
                  <td>{score.team_name}</td>
                  <td>{score.player_name}</td>
                  <td>{score.points}</td>
                  <td>{score.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
    </div>
  );
};

export default GameDetails;
