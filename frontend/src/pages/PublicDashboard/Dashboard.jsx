import classes from "./Dashboard.module.css";


const DUMMY_DATA = [
  { title: "Total Sport Events", count: "12" },
  { title: "Ongoing Events", count: "4" },
  { title: "Completed Events", count: "8" },
  { title: "Upcoming Matches", count: "6" },
];
const DashboardPage = () => {
  return (
    // <div className={classes.dashboard}>
    //   <div className={classes.cardsContainer}>
       
    //   </div>

    
    // </div>

    <div className={classes.container}>
      {/* Left Sidebar */}
      <div className={classes.sidebar}>
      <div className={classes.championsLeagueCard}>
        <div className={classes.cardHeader}>
          <img
            src="/champions-league-logo.png"
            alt="Champions League"
            className={classes.logo}
          />
          <h3>Champions League</h3>
        </div>
        <p className={classes.subText}>All times shown are your local time</p>

        <div className={classes.matchDate}>Wednesday 5 March</div>
        <div className={classes.match}>
          <span className={classes.team}>BRU</span>
          <span className={classes.score}>
            <span className={classes.scoreBox}>1 - 3</span>
          </span>
          <span className={classes.team}>AVL</span>
        </div>
        <div className={classes.match}>
          <span className={classes.team}>PSV</span>
          <span className={classes.score}>
            <span className={classes.scoreBox}>1 - 7</span>
          </span>
          <span className={classes.team}>ARS</span>
        </div>

        <div className={classes.matchDate}>Thursday 6 March</div>
        <div className={classes.match}>
          <span className={classes.team}>PSG</span>
          <span className={classes.score}>
            <span className={classes.scoreBox}>0 - 1</span>
          </span>
          <span className={classes.team}>LIV</span>
        </div>

        {/* <button className={classes.viewAll}>View All Fixtures</button> */}
      </div>

      <div className={classes.matchCard}>
        <div className={classes.matchcardHeader}>
          <img
            src="/champions-league-logo.png"
            alt="Champions League"
            className={classes.logo}
          />
          <h3>Champions League</h3>
        </div>
        <p className={classes.matchsubText}>All times shown are your local time</p>

        <div className={classes.matchDate}>Wednesday 5 March</div>
        <div className={classes.match}>
          <span className={classes.team}>BRU</span>
          <span className={classes.score}>
            <span className={classes.scoreBox}>1 - 3</span>
          </span>
          <span className={classes.team}>AVL</span>
        </div>
        <div className={classes.match}>
          <span className={classes.team}>PSV</span>
          <span className={classes.score}>
            <span className={classes.scoreBox}>1 - 7</span>
          </span>
          <span className={classes.team}>ARS</span>
        </div>

        <div className={classes.matchDate}>Thursday 6 March</div>
        <div className={classes.match}>
          <span className={classes.team}>PSG</span>
          <span className={classes.score}>
            <span className={classes.scoreBox}>0 - 1</span>
          </span>
          <span className={classes.team}>LIV</span>
        </div>

        {/* <button className={classes.viewAll}>View All Fixtures</button> */}
      </div>
      </div>

      {/* Right Content */}
      <div className={classes.content}>
        {/* <div className={classes.featured}>
          <img src="https://via.placeholder.com/800x400" alt="Match" />
          <h2>🔥 What we learned from PSG 0-1 Liverpool</h2>
          <p>🔍 Analysis: Liverpool secures victory in a tight Champions League battle.</p>
        </div> */}

<div className={classes.editorChoice}>
  <h3>🎯 Editor's Choice</h3>
  <div className={classes.editorCards}>
    
    
  </div>
</div>


        <div className={classes.latestVideos}>
          <h3>🎥 Latest Videos</h3>
          <div className={classes.video}>
            <img src="https://via.placeholder.com/300x150" alt="video" />
            <p>🔥 Watch: When Premier League goalkeepers GO ROGUE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
