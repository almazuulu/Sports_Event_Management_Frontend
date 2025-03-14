import { useEffect, useState } from "react";

import classes from "./MyAssignments.module.css";
import { fetchWithAuth } from "../../utils/FetchClient";
import Header from "../../components/Header";
import ViewButton from "../../components/Button/ViewButton";
import LoadingScreen from "../../components/UI/LoadingScreen";

function MyAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setAssignments(data.results);
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
                <th>ACTION</th>
              </tr>
              <tbody>
                {assignments.map((game) => (
                  <tr key={game.id}>
                    <td>{game.game_name}</td>
                    <td>
                      {game.team1_name} vs {game.team2_name}
                    </td>
                    <td>
                      <ViewButton>View</ViewButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </thead>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyAssignmentsPage;
