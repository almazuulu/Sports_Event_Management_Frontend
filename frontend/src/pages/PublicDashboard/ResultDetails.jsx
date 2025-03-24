import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./ResultDetails.module.css";
import { fetchWithoutAuth } from "../../utils/FetchClient";
import NormalButton from "../../components/Button/NormalButton";
import { formatToShortDate, formatToTimeOnly } from "../../utils/helpers";

function ResultDetailsPage() {
  const { scoreId } = useParams();
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState({});
  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await fetchWithoutAuth(`/api/scores/scores/${scoreId}/`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const score = await res.json();
        setScoreData(score);

        const gameId = score.game;
        if (!gameId) return;

        const gameRes = await fetchWithoutAuth(`/api/games/games/${gameId}`);
        if (!gameRes.ok) {
          throw new Error(`Failed to fetch game`);
        }

        const game = await gameRes.json();
        setGameData(game);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [scoreId]);

  if (loading) return <p className="loadingText">Loading...</p>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.container}>
      <NormalButton onClick={() => navigate("..")}>
        Back to Results
      </NormalButton>
      <div className={classes.featuredGame}>
        <div className={classes.featuredHeader}>
          <div className={classes.featuredTitle}>Result Details</div>
        </div>
        <div className={classes.featuredBody}>
          <div className={classes.featuredGameInfo}>
            <div className={classes.gameMeta}>
              <div className={classes.gameTitle}>{scoreData.game_name}</div>
              <div className={classes.gameSubtitle}>
                {gameData.sport_event_name}
              </div>
            </div>
            <div className={classes.gameTime}>
              <div>{formatToShortDate(gameData.start_datetime)} |&nbsp;</div>
              <div>
                {formatToTimeOnly(gameData.start_datetime)} -{" "}
                {formatToTimeOnly(gameData.end_datetime)} |&nbsp;
              </div>
              <div>{gameData.location}</div>
            </div>
            <div className={classes.teamsDisplay}>
              <div className={classes.teamDisplay}>
                <div className={classes.teamLogo}>
                  {scoreData.team1_name?.charAt(0)}
                </div>
                <div className={classes.teamName}>{scoreData.team1_name}</div>
                {/* <div className={classes.teamInfo}>Home • 4W 1L 0D</div> */}
              </div>
              <div className={classes.scoreDisplay}>
                <div className={classes.scoreRow}>
                  <div className={classes.score}>2</div>
                  <div className={classes.scoreDivider}>:</div>
                  <div className={classes.score}>0</div>
                </div>
              </div>
              <div className={classes.teamDisplay}>
                <div className={classes.teamLogo}>
                  {scoreData.team2_name?.charAt(0)}
                </div>
                <div className={classes.teamName}>{scoreData.team2_name}</div>
                {/* <div className={classes.teamInfo}>Home • 4W 1L 0D</div> */}
              </div>
            </div>
          </div>
          <div className={classes.recentEvents}>
            <div className={classes.sectionTitle}>Scoring Events</div>
            <ul className={classes.eventList}>
              {scoreData?.score_details?.map((score) => (
                <li key={score.id} className={classes.eventItem}>
                  <span className={classes.eventMinute}>{score.minute}'</span>
                  <span className={classes.eventTeam}>{score.team_name}</span>
                  <div className={classes.eventInfo}>
                    <div className={classes.eventPlayer}>
                      {score.player_name}
                    </div>
                    <div className={classes.eventDetail}>
                      {score.description}
                    </div>
                  </div>
                  <span className={classes.eventType}>{score.event_type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultDetailsPage;
