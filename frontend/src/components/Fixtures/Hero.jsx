import classes from "./Hero.module.css";
import hero from "../../assets/images/fixtures-hero.jpg";

function Hero() {
  return (
    <div className={classes.heroContainer}>
      <img className={classes.heroImage} src={hero} alt="Calendar" />
      <div className={classes.overlay}>
        <h1 className={classes.title}>Upcoming Fixtures & Match Schedule</h1>
        <p className={classes.subtitle}>
          Stay updated with the latest match schedules, live game updates, and
          team fixtures. Don’t miss out on the action!
        </p>
      </div>
    </div>
  );
}

export default Hero;
