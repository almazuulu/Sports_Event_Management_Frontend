import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./MyAssignments.module.css";
import { fetchWithAuth } from "../../utils/FetchClient";
import ViewButton from "../../components/Button/ViewButton";
import { formatToShortDateTime } from "../../utils/helpers";
import CountCard from "../../components/AdminPanel/CountCard";
import LoadingScreen from "../../components/UI/LoadingScreen";

function MyAssignmentsPage() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetchWithAuth(
          "/api/scores/scores/my-assignments/"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <LoadingScreen />;

  return (
    <div className={classes.container}>
      <div className={classes.topBar}>
        <div className={classes.pageTitle}>
          <h1>Assignment Management Dashboard</h1>
        </div>
      </div>

      <div className={classes.statsCards}>
        <CountCard label={"Total Assignments"} count={assignments.length} />
        <CountCard
          label={"Scheduled"}
          count={
            assignments.filter((data) => data.status === "scheduled").length
          }
        />
        <CountCard
          label={"Completed"}
          count={
            assignments.filter((data) => data.status === "completed").length
          }
        />
      </div>

      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <h3>My Assignments</h3>
        </div>
        <div className={classes.cardBody}>
          {assignments.length === 0 ? (
            <p>No assignments available.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>GAME</th>
                  <th>TEAMS</th>
                  <th>DATE & TIME</th>
                  <th>LOCATION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((game) => (
                  <tr key={game.game_id}>
                    <td>{game.name}</td>
                    <td>
                      {game?.teams[0]?.team_name} vs {game?.teams[1]?.team_name}
                    </td>
                    <td>{formatToShortDateTime(game.start_datetime)}</td>
                    <td>{game.location}</td>
                    <td>
                      <ViewButton
                        onClick={() => navigate(`games/${game.game_id}`)}
                      >
                        View
                      </ViewButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAssignmentsPage;
