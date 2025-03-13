import styles from "./TeamCard.module.css";

const TeamTable = ({ team = {} }) => {
  return (
    <div className={styles.card}>
      <img
        src={"https://placehold.co/400"}
        alt={team.name}
        className={styles.logo}
      />
      <div className={styles.info}>
        <span className={styles.name}>{team.name}</span>
        <span className={styles.arrow}>➝</span>
      </div>
    </div>
  );
};

export default TeamTable;
