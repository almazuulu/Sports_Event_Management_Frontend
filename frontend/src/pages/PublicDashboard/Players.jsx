import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Players.module.css";
import player1 from "../../assets/images/player1.jpg";
import { fetchWithAuth, fetchWithoutAuth } from "../../utils/FetchClient";
import Hero from "../../components/Players/Hero";
import { isAuthenticated } from "../../utils/Authentication";
import PlayersFilter from "../../components/Players/PlayersFilter";

const PlayerList = () => {
  const isAuthorized = isAuthenticated();
  const navigate = useNavigate();
  const [players, setPlayersdata] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isFetchingPlayers, setIsFetchingPlayers] = useState(false);

  const fetchAllPlayers = useCallback(
    async (filters = {}) => {
      try {
        setIsFetchingPlayers(true);
        const queryParams = new URLSearchParams(filters).toString();
        const url = `/api/teams/players/${
          queryParams ? `?${queryParams}` : ""
        }`;
        const response = await (isAuthorized
          ? fetchWithAuth(url)
          : fetchWithoutAuth(url));
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setPlayersdata(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingPlayers(false);
      }
    },
    [isAuthorized]
  );

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const url = `/api/teams/teams/`;
        const response = await (isAuthorized
          ? fetchWithAuth(url)
          : fetchWithoutAuth(url));
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setTeams(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllTeams();
  }, [isAuthorized]);

  useEffect(() => {
    fetchAllPlayers();
  }, [fetchAllPlayers]);

  const handleRowClick = (playerId) => {
    navigate(`${playerId}`);
  };

  return (
    <>
      <Hero />
      <div className={styles.container}>
        <PlayersFilter onFilter={fetchAllPlayers} teams={teams} />
        {isFetchingPlayers ? (
          <p className="loadingText">Loading...</p>
        ) : players.length === 0 ? (
          <div className={styles.card}>
            <p className="loadingText">No players available at the moment.</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Jersey #</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr
                    key={player.id}
                    onClick={() => handleRowClick(player.id)}
                    className={styles.clickableRow}
                  >
                    <td>
                      <img
                        src={player1}
                        className={styles.playerImage}
                        alt="Player"
                      />
                    </td>
                    <td className={styles.playerContainer}>
                      &nbsp; &nbsp;
                      <span className={styles.playerName}>
                        {player.first_name} {player.last_name}
                      </span>
                    </td>
                    <td>{player.team_name}</td>
                    <td>{player.jersey_number}</td>
                    <td>{player.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayerList;
