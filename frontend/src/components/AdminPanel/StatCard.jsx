import classes from "./StatCard.module.css";

function StatCard({ icon, value, label }) {
  return (
    <div className={classes.statCard}>
      <div className={classes.statIcon}>{icon}</div>
      <div className={classes.statValue}>{value}</div>
      <div className={classes.statLabel}>{label}</div>
    </div>
  );
}

export default StatCard;
