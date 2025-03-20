import { useEffect, useState } from "react";

import classes from "./MyAssignments.module.css";
import { fetchWithAuth } from "../../utils/FetchClient";
import Header from "../../components/Header";
import ViewButton from "../../components/Button/ViewButton";
import { formatToShortDateTime } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className={classes.container}>
      <Header title={"My Assignments"} />
      {loading ? (
        <div className={classes.card}>
          <p>Loading...</p>
        </div>
      ) : assignments.length === 0 ? (
        <div className={classes.card}>
          <p>No assignments available.</p>
        </div>
      ) : (
        <div className={classes.card}>
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
        </div>
      )}
    </div>
  );
}

export default MyAssignmentsPage;
