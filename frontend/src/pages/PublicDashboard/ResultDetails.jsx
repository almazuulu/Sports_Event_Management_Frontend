import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./ResultDetails.module.css";
import { fetchWithAuth } from "../../utils/FetchClient";
import NormalButton from "../../components/Button/NormalButton";

function ResultDetailsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/api/scores/scores/${resultId}/`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const dataa = await res.json();
        setData(dataa);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [resultId]);

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
              <div className={classes.gameTitle}>{data.game_name}</div>
              {/* <div className={classes.gameSubtitle}>
                Annual Sports Tournament 2025
              </div> */}
            </div>
            {/* <div className={classes.gameTime}>
              <div>March 10, 2025 |&nbsp;</div>
              <div>14:00 - 16:00 |&nbsp;</div>
              <div>Main Stadium</div>
            </div> */}
            <div className={classes.teamsDisplay}>
              <div className={classes.teamDisplay}>
                <div className={classes.teamLogo}>
                  {data.team1_name?.charAt(0)}
                </div>
                <div className={classes.teamName}>{data.team1_name}</div>
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
                  {data.team2_name?.charAt(0)}
                </div>
                <div className={classes.teamName}>{data.team2_name}</div>
                {/* <div className={classes.teamInfo}>Home • 4W 1L 0D</div> */}
              </div>
            </div>
          </div>
          <div className={classes.recentEvents}>
            <div className={classes.sectionTitle}>Scoring Events</div>
            <ul className={classes.eventList}>
              {data?.score_details?.map((score) => (
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
