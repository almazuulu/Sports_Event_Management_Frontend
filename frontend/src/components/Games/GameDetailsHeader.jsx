import classes from "./GameDetailsHeader.module.css";
import { formatToShortDateTime } from "../../utils/helpers";

function GameDetailsHeader({ game = {} }) {
  return (
    <div className={classes.container}>
      <section className={classes.content}>
        <p className={classes.label}>
          Game: <span>{game.game_name}</span>
        </p>
      </section>
      <section className={classes.content}>
        <p className={classes.label}>
          Team Designation: <span>{game.designation_display}</span>
        </p>
      </section>
      <section className={classes.content}>
        <p className={classes.label}>
          Date: <span>{formatToShortDateTime(game.game_start_datetime)}</span>
        </p>
      </section>
      <section className={classes.content}>
        <p className={classes.label}>
          Location: <span>{game.game_location}</span>
        </p>
      </section>
    </div>
  );
}

export default GameDetailsHeader;
