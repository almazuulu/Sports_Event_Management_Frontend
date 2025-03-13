import React from "react";
import styles from "./TeamCard.module.css";
 import logo1 from "../../../../frontend/src/assets/images/logo1.jpg"

const TeamTable = ({ team }) => {
  return (
    <div className={styles.card}>
      <img src={logo1} alt={team.name} className={styles.logo} />
      <div className={styles.info}>
        <span className={styles.name}>{team.name}</span>
        <span className={styles.arrow}>➝</span>
      </div>
    </div>
  );
};

export default TeamTable;