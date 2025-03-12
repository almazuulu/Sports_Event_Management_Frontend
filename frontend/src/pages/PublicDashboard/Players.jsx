import React from "react";
import styles from "./Players.module.css";
import player1 from "../../../../frontend/src/assets/images/player1.jpg";

const players = [
  {
    name: "Max Aarons",
    position: "Defender",
    nationality: "England",
    image: "https://via.placeholder.com/40", // Replace with actual image URL
    flag: "🇬🇧",
  },
  {
    name: "Zach Abbott",
    position: "Defender",
    nationality: "England",
    image: "https://via.placeholder.com/40",
    flag: "🇬🇧",
  },
  {
    name: "Tyler Adams",
    position: "Midfielder",
    nationality: "United States",
    image: "https://via.placeholder.com/40",
    flag: "🇺🇸",
  },
];

const PlayerList = () => {
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
            <th>Player</th>
            <th>Position</th>
            <th>Nationality</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>
                <img src={player1} alt={player.name} className={styles.playerImage} />
                &nbsp; &nbsp;
                {player.name}
              </td>
              <td>{player.position}</td>
              <td>{player.flag} {player.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default PlayerList;
