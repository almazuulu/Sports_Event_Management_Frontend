import classes from "./Hero.module.css";
import hero from "../../assets/images/results-hero.jpg";

function Hero() {
  return (
    <div className={classes.heroContainer}>
      <img className={classes.heroImage} src={hero} alt="Basketball net" />
      <div className={classes.overlay}>
        <h1 className={classes.title}>Match Results</h1>
        <p className={classes.subtitle}>Check out the latest game results!</p>
      </div>
    </div>
  );
}

export default Hero;
