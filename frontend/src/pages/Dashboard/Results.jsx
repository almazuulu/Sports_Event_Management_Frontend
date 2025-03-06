import React from "react";
import styles from "./Results.module.css";
const ResultsPage = () => {
    const teams = [
        {
          position: 1,
          club: "LIV",
          logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
          played: 28,
          won: 20,
          drawn: 7,
          lost: 1,
          gf: 66,
          ga: 26,
          gd: 40,
          points: 67,
        },
        {
          position: 2,
          club: "ARS",
          logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
          played: 27,
          won: 15,
          drawn: 9,
          lost: 3,
          gf: 51,
          ga: 23,
          gd: 28,
          points: 54,
        },
        {
          position: 3,
          club: "NFO",
          logo: "https://upload.wikimedia.org/wikipedia/en/1/17/Nottingham_Forest_F.C._logo.svg",
          played: 27,
          won: 14,
          drawn: 6,
          lost: 7,
          gf: 44,
          ga: 33,
          gd: 11,
          points: 48,
        },
      ];
    
      return (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Club</th>
                <th>Played</th>
                <th>Won</th>
                <th>Drawn</th>
                <th>Lost</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={index}>
                  <td className={styles.position}>{team.position}</td>
                  <td>
                    <img src={team.logo} alt={team.club} className={styles.clubLogo} />
                    {team.club}
                  </td>
                  <td>{team.played}</td>
                  <td>{team.won}</td>
                  <td>{team.drawn}</td>
                  <td>{team.lost}</td>
                  <td>{team.gf}</td>
                  <td>{team.ga}</td>
                  <td>{team.gd}</td>
                  <td className={styles.points}>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default ResultsPage;
