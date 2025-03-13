import styles from "./GameDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameDetails = () => {
    const { fixtureId } = useParams();
    const [gameDetails, setGamedetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/games/games/${fixtureId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setGamedetails(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchGameDetails();
    }, [fixtureId]);

    const formatDate = (isoString) => {
        if (!isoString) return "N/A";
        return new Date(isoString).toISOString().split("T")[0]; // Extract YYYY-MM-DD
    };

    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!gameDetails) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            {/* 🎯 Banner */}
            <div className={styles.banner}>
                <h1>⚽ Match Details</h1>
            </div>

            {/* 📜 Match Info Card */}
            <div className={styles.matchCard}>
                {/* 🕒 Match Date & Status */}
                <div className={styles.matchHeader}>
                    <span className={styles.matchDate}>
                        📅 {formatDate(gameDetails.start_datetime)} - {formatDate(gameDetails.end_datetime)}
                    </span>
                    <span className={styles.matchStatus}>
                        🔴 {gameDetails.status}
                    </span>
                </div>

                {/* 🏆 Game Details */}
                <div className={styles.gameInfo}>
                    <h2>{gameDetails.name}</h2>
                    <p className={styles.sportEvent}>🏅 Sport Event: <strong>{gameDetails.sport_event_name}</strong></p>
                    <p className={styles.sportEvent}>📜 Details: <strong>{gameDetails.description}</strong></p>
                    <p className={styles.sportEvent}>🎯 Score Keeper: <strong>{gameDetails.scorekeeper_name}</strong></p>
                    <p className={styles.sportEvent}>🏆 Team: <strong>{gameDetails?.teams[0]?.team_name}</strong></p>

                </div>

                {/* 🏟️ Venue Section */}
                <div className={styles.venue}>
                    <p>🏟️ Venue: <strong>{gameDetails.location}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
