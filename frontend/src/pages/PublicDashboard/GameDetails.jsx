import styles from "./GameDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatToShortDateTime } from "../../utils/helpers";

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

    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!gameDetails) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.dashboard}>
            {/* Game Info */}
            <div className={styles.gameInfo}>
                <h2>{gameDetails.name}</h2>
                <p><strong>Sport Event:&nbsp;</strong>{gameDetails.sport_event_name}</p>
                <p><strong>Date & Time:&nbsp;</strong> {formatToShortDateTime(gameDetails.end_datetime)}</p>
                <p><strong>Location:&nbsp;</strong>{gameDetails.location}</p>
                <p><strong>Status:&nbsp;</strong> <span className={styles.status}>{gameDetails.status}</span></p>
                <p><strong>Scorekeeper:&nbsp;</strong>{gameDetails.scorekeeper_name}</p>
                <p><strong>Created:&nbsp;</strong>{formatToShortDateTime(gameDetails.created_at)}</p>
            </div>



            {/* Team Lists */}
            <div className={styles.teams}>
                <div className={styles.team}>
                
                    <h3>Team A:&nbsp; {gameDetails.teams[0].team_name} </h3>
               
                    <table>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Jersey #</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gameDetails.teams[0].players.map((item) => (
                             
                                <tr>
                                   <td>{item.name}</td>
                                    <td>{item.jersey_number}</td>
                                    <td>{item.position}</td>
                                  
                                  
                                </tr>
                             
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.team}>
                
                    <h3>Team B:&nbsp; {gameDetails.teams[1].team_name} </h3>
              
                    <table>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Jersey #</th>
                                <th>Position</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                        {gameDetails.teams[1].players.map((item) => (
                            
                                <tr>
                                   <td>{item.name}</td>
                                    <td>{item.jersey_number}</td>
                                    <td>{item.position}</td>
                                  
                                  
                                </tr>
                              
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Game Score */}
            <div className={styles.gameScore}>
                <h3>Game Score</h3>
                <div className={styles.scores}>
                    <div  style={{ color: "red" }}>
                        <h4>Thunderbolts</h4>
                        <h2>78</h2>
                    </div>
                    <div className={styles.status}>
                        <p>3rd Quarter</p>
                        <p>Time: 6:45</p>
                    </div>
                    <div  style={{ color: "green" }}>
                        <h4>Phoenix Flames</h4>
                        <h2>72</h2>
                    </div>
                </div>
            </div>

            {/* Scoring Events */}
            <div className={styles.scoringEvents}>
    <h2>Recent Scoring Events</h2>
    <table className={styles.scoringTable}>
        <thead>
            <tr>
                <th>Time</th>
                <th>Quarter</th>
                <th>Team</th>
                <th>Player</th>
                <th>Points</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>7:15</td>
                <td>3rd</td>
                <td>Thunderbolts</td>
                <td>John Smith</td>
                <td>3</td>
                <td>Three-pointer from left wing</td>
            </tr>
            <tr>
                <td>8:30</td>
                <td>3rd</td>
                <td>Phoenix Flames</td>
                <td>Michael Johnson</td>
                <td>2</td>
                <td>Layup after fast break</td>
            </tr>
            <tr>
                <td>9:45</td>
                <td>3rd</td>
                <td>Thunderbolts</td>
                <td>David Williams</td>
                <td>2</td>
                <td>Jump shot from the free throw line</td>
            </tr>
        </tbody>
    </table>
</div>

        </div>
    );
};

export default GameDetails;
