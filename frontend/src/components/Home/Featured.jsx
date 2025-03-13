import classes from "./Featured.module.css";

const featuredPlayers = [
  {
    name: "John Doe",
    team: "Lions",
    avatar: "https://placehold.co/400",
    goals: 12,
  },
  {
    name: "Mike Smith",
    team: "Tigers",
    avatar: "https://placehold.co/400",
    goals: 10,
  },
];

function Featured() {
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>🔥 Featured Players</h2>
      <div className={classes.section}>
        <div className={classes.grid}>
          {featuredPlayers.map((player, index) => (
            <div key={index} className={classes.card}>
              <img
                src={player.avatar}
                alt={player.name}
                className={classes.image}
              />
              <div className={classes.content}>
                <h4 className={classes.name}>{player.name}</h4>
                <p className={classes.team}>Team: {player.team}</p>
                <p className={classes.stats}>Goals: {player.goals}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;
