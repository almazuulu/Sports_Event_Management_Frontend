import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Players.module.css";
import player1 from "../../../../frontend/src/assets/images/player1.jpg";

const PlayerList = () => {
    const [players, setPlayersdata] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigation

    const fetchAllPlayers = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/teams/players/");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            setPlayersdata(jsonData.results);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchAllPlayers();
    }, []);

    // Function to handle row click
    const handleRowClick = (playerId) => {
        navigate(`/players/${playerId}`); // Navigate to player details page
    };

    return (
        <div className={styles.container}>
            {/* Banner Section */}
            <div className={styles.banner}>
                <h1>⚽ Players</h1>
            </div>

            {/* Players Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Player</th>
                            <th>Team</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr
                                key={player.id}
                                onClick={() => handleRowClick(player.id)} // Handle click
                                className={styles.clickableRow} // Add a class for styling
                            >
                                <td><img src={player1} className={styles.playerImage} alt="Player" /></td>
                                <td className={styles.playerContainer}>
                                    &nbsp; &nbsp;
                                    <span className={styles.playerName}>{player.first_name} {player.last_name}</span>
                                </td>
                                <td>{player.team_name}</td>
                                <td>{player.jersey_number} {player.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayerList;
