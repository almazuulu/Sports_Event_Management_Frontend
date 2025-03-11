import React from "react";
import styles from "./PlayerCard.module.css";
import player1 from "../../../../frontend/src/assets/images/player1.jpg";

const PlayerCard = ({ player }) => {
    console.log("player?",player)
    
  return (
    <div className={styles.playerCard}>
      <div className={styles.playerImage}>
        <img src={player1} alt={player.name} />
      </div>
      <div className={styles.playerInfo}>
        <h3 className={styles.playerName}>{player.first_name} {player.last_name}</h3>
        <p className={styles.playerPosition}>Position - {player.position}</p>
        <p className={styles.playerPosition}>Jersey number - {player.jersey_number}</p>
        
       
      </div>
    </div>
  );
};

export default PlayerCard;
