import classes from "./CountCard.module.css";

function CountCard({ label, count }) {
  return (
    <div className={classes.card}>
      <h3>{label}</h3>
      <p>{count}</p>
    </div>
  );
}

export default CountCard;
