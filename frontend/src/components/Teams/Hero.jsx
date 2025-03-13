import classes from "./Hero.module.css";
import hero from "../../assets/images/teams-hero.jpg";

function Hero() {
  return (
    <div className={classes.heroContainer}>
      <img className={classes.heroImage} src={hero} alt="Football field" />
      <div className={classes.overlay}>
        <h1 className={classes.title}>Meet the Teams</h1>
        <p className={classes.subtitle}>
          Explore all the teams, their squads, and key statistics in the
          tournament!
        </p>
      </div>
    </div>
  );
}

export default Hero;
