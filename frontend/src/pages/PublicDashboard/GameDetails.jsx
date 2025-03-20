import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./GameDetails.module.css";
import GameInforCard from "../../components/Games/GameInforCard";
import TeamsGameCard from "../../components/Games/TeamsGameCard";
import GameScore from "../../components/Games/GameScore";
import { fetchWithAuth, fetchWithoutAuth } from "../../utils/FetchClient";
import ViewButton from "../../components/Button/ViewButton";
import NormalButton from "../../components/Button/NormalButton";

const GameDetails = () => {
  const navigate = useNavigate()
  const { fixtureId } = useParams();
  const [gameDetails, setGamedetails] = useState(null);
  const [gameScore, setGameScore] = useState({});
  const [scoringEvents, setScoringEvents] = useState([]);
  const [error, setError] = useState(null);
  const [teamAway, setTeamAway] = useState({});
  const [teamHome, setTeamHome] = useState({});

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetchWithoutAuth(
          `/api/games/games/${fixtureId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGamedetails(data);
        if (data.teams) {
          const home =
            data.teams.find((team) => team.designation === "Home") || null;
          const away =
            data.teams.find((team) => team.designation === "Away") || null;
          setTeamHome(home);
          setTeamAway(away);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGameDetails();
  }, [fixtureId]);

  useEffect(() => {
    const fetchGameScore = async () => {
      try {
        const res = await fetchWithAuth(`/api/scores/scores?game=${fixtureId}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setGameScore(data.results[0]);
        setScoringEvents(data.results[0]?.score_details);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGameScore();
  }, [fixtureId]);

  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!gameDetails) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2>{gameDetails.name}</h2>
        <NormalButton onClick={() => navigate('..')}>Back to Fixtures</NormalButton>
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
