import classes from "./Hero.module.css";
import hero from "../../assets/images/players-hero.jpg";

function Hero() {
  return (
    <div className={classes.heroContainer}>
      <img className={classes.heroImage} src={hero} alt="A group of players" />
      <div className={classes.overlay}>
        <h1 className={classes.title}>Meet the Players</h1>
        <p className={classes.subtitle}>
          Explore top players, their stats, and key contributions to their
          teams!
        </p>
      </div>
    </div>
  );
}

export default Hero;
