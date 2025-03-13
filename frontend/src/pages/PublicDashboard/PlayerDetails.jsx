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

    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!player) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.playerProfile}>
            {/* Banner with Player Name */}
            <div className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <h1 className={styles.playerName}>
                    {player.first_name} <span className={styles.highlight}>{player.last_name}</span>
                </h1>
                <img src={defaultImage} alt="Player" className={styles.playerImg} />
            </div>

            {/* Personal Details Section */}
            <div className={styles.detailsContainer}>
                <h2 className={styles.sectionTitle}>Personal Details</h2>
                <ul className={styles.detailsList}>
                    <li><i className="fas fa-user"></i> <strong>Name: &nbsp; &nbsp; {player.first_name} {player.last_name}</strong></li>
                    <li><i className="fas fa-calendar"></i> <strong>Date of Birth: &nbsp; &nbsp; {player.date_of_birth}</strong></li>
                    <li><i className="fas fa-tshirt"></i> <strong>Jersey Number: &nbsp; &nbsp;{player.jersey_number}</strong></li>
                    <li><i className="fas fa-flag"></i> <strong>Email:&nbsp; &nbsp; {player.user_email}</strong></li>
                </ul>
            </div>

            {/* Playing Career Section */}
            <div className={styles.detailsContainer}>
                <h2 className={styles.sectionTitle}>Playing Career</h2>
                <table className={styles.statsTable}>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Position</th>
                            <th>Joined Date</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{player.team_name}</td>
                            <td>{player.position}</td>
                            <td>{player.joined_date}</td>
                           
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayerProfile;
