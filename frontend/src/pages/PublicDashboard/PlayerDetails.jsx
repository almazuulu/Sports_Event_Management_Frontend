import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Playerdetails.module.css";
import defaultImage from "../../../../frontend/src/assets/images/player1.jpg";

const PlayerProfile = () => {
    const { playerId } = useParams();
    const [player, setPlayerdata] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/teams/players/${playerId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setPlayerdata(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPlayerDetails();
    }, [playerId]);

    useEffect(() => {
    }, [player]);  // Logs when `player` is updated

    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!player) return <div className={styles.loading}>Loading...</div>;

    return (
        
        <div className={styles.playerProfile}>
            <div className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <img src={defaultImage} alt="Player" className={styles.playerImg} />
            </div>

            <div className={styles.detailsContainer}>
                <h2 className={styles.sectionTitle}>Personal Details</h2>
                <div className={styles.detailsGrid}>
                    <div className={styles.detailCard}>
                        <p><strong>Name:</strong> {player.first_name} {player.last_name}</p>
                    </div>
                    <div className={styles.detailCard}>
                        <p><strong>Date of Birth:</strong> {player.date_of_birth}</p>
                    </div>
                    <div className={styles.detailCard}>
                        <p><strong>Jersey number:</strong> {player.jersey_number}</p>
                    </div>
                </div>
            </div>

            <div className={styles.detailsContainer}>
                <h2 className={styles.sectionTitle}>Playing Career</h2>
                <table className={styles.statsTable}>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>position</th>
                            <th>Joined date</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                            <tr>
                                <td>{player.team_name}</td>
                                <td>{player.position}</td>
                                <td>{player.joined_date}</td>
                                <td>{player.user_email}</td>
                            </tr>
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayerProfile;
