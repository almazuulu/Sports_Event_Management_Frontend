import classes from "./Hero.module.css";
import hero from "../../assets/images/home-hero-banner.jpg";

function Hero() {
  return (
    <div className={classes.heroContainer}>
      <img className={classes.heroImage} src={hero} alt="Tracks" />
      <div className={classes.overlay}>
        <h1 className={classes.title}>Welcome to the Sport Events Management</h1>
        <p className={classes.subtitle}>
          Stay updated with the latest matches & rankings
        </p>
      </div>
    </div>
  );
}

export default Hero;
