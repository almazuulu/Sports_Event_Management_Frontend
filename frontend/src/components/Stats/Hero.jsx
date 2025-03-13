import classes from "./Hero.module.css";
import hero from "../../assets/images/stats-hero.jpg";

function Hero() {
  return (
    <div className={classes.heroContainer}>
      <img className={classes.heroImage} src={hero} alt="Basketball net" />
      <div className={classes.overlay}>
        <h1 className={classes.title}>Team & Player Statistics</h1>
        <p className={classes.subtitle}>
          Explore top performers, goal counts, assists, and team rankings based
          on match performance!
        </p>
      </div>
    </div>
  );
}

export default Hero;
