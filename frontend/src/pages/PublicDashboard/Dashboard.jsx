import classes from "./Dashboard.module.css";

import image1 from "../../../../frontend/src/assets/images/image1.jpg";
import image2 from "../../../../frontend/src/assets/images/image2.jpg";
import image3 from "../../../../frontend/src/assets/images/image3.jpg";

const DUMMY_DATA = [
  { title: "Total Sport Events", count: "12" },
  { title: "Ongoing Events", count: "4" },
  { title: "Completed Events", count: "8" },
  { title: "Upcoming Matches", count: "6" },
];
const DashboardPage = () => {
  const teamData = [
    { teamname: "Thunderbolts", decription: "Local basketball team from Australia", manager: "John", captain: "Michael", status: "Active", playercount: "12", number: "+1234567890"},
    { teamname: "LIV-Club", decription: "Local basketball team from New York", manager: "James", captain: "Mathew", status: "Active", playercount: "22", number: "+12349090909"},
    { teamname: "Team FC", decription: "Local basketball team from New York", manager: "Paul", captain: "Michael", status: "Active", playercount: "12", number: "+124347890"},
    { teamname: "Barcelona", decription: "Local basketball team from Germany", manager: "John", captain: "Paul", status: "Active", playercount: "11", number: "+1234567890"},
    { teamname: "Team-Milan", decription: "Local basketball team from Australia", manager: "Eric", captain: "Michael", status: "Active", playercount: "10", number: "+1454567890"},
  ];
  const gameData = [
    { name: "Thunderbolts", sport_event_name: "Local basketball team from Australia", start_datetime: "John", location: "Michael", status: "Active", teams_count: "12"},
    { name: "Thunderbolts", sport_event_name: "Local basketball team from Australia", start_datetime: "John", location: "Michael", status: "Active", teams_count: "12"},
    { name: "Thunderbolts", sport_event_name: "Local basketball team from Australia", start_datetime: "John", location: "Michael", status: "Active", teams_count: "12"},
    { name: "Thunderbolts", sport_event_name: "Local basketball team from Australia", start_datetime: "John", location: "Michael", status: "Active", teams_count: "12"},
    { name: "Thunderbolts", sport_event_name: "Local basketball team from Australia", start_datetime: "John", location: "Michael", status: "Active", teams_count: "12"},

  ];

  const leagueData = [
    { position: 1, club: "LIV", played: 28, won: 20, drawn: 7, lost: 1, gf: 66, ga: 26, gd: 40, points: 67 },
    { position: 2, club: "ARS", played: 27, won: 15, drawn: 9, lost: 3, gf: 51, ga: 23, gd: 28, points: 54 },
    { position: 3, club: "NFO", played: 27, won: 14, drawn: 6, lost: 7, gf: 44, ga: 33, gd: 11, points: 48 },
    { position: 4, club: "MCI", played: 27, won: 14, drawn: 5, lost: 8, gf: 53, ga: 37, gd: 16, points: 47 },
    { position: 5, club: "CHE", played: 27, won: 13, drawn: 7, lost: 7, gf: 52, ga: 36, gd: 16, points: 46 },
  ];
  return (
  

    <div className={classes.container}>
      {/* Left Sidebar */}
      <div className={classes.sidebar}>
      <div className={classes.championsLeagueCard}>
        <div className={classes.cardHeader}>
         
          <h3>Live Score</h3>
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
          
          <h3>Recent Results</h3>
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
  {/* <h3>🎯 Editor's Choice</h3> */}
  <div className={classes.editorCards}>
    <div className={classes.editorCard}>
      <img src={image1} style={{ width: "405px", height: "220px", borderRadius: "10px" }} alt="Football Match" />
      <p>⚽ Thrilling Premier League Match Ends in Drama!</p>
    </div>
   
    <div className={classes.editorCard}>
      <img src={image2} style={{ width: "405px", height: "220px", borderRadius: "10px" }} alt="Football Match" />
      <p>⚽ Thrilling Premier League Match Ends in Drama!</p>
    </div>
    
    <div className={classes.editorCard}>
      <img src={image3} style={{ width: "405px", height: "220px", borderRadius: "10px" }} alt="Football Match" />
      <p>⚽ Thrilling Premier League Match Ends in Drama!</p>
    </div>
  </div>
</div>



<div className="latestVideos">
      <h3 className="tableTitle"  style={{ color: "black"}}>🏆 Team</h3>
      <div className={classes.tableContainer}>
      <table className={classes.leagueTable}>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Description</th>
            <th>Manager</th>
            <th>Captain</th>
            <th>Status</th>
            <th>Player count</th>
            <th>Contact No</th>
            
          </tr>
        </thead>
        <tbody>
        {teamData.map((team, index) => (
          <tr>
            <td>{team.teamname}</td>
            <td>{team.decription}</td>
              <td>{team.manager}</td>
                <td>{team.captain}</td>
                  <td>{team.status}</td>
                    <td>{team.playercount}</td>
                    <td>{team.number}</td>
            
           
          </tr>
           ))}
         
        </tbody>
        
      </table>
      </div>
    </div>

    <div className="latestVideos">
      <h3 className="tableTitle"  style={{ color: "black"}}>🏆 Game</h3>
      <div className={classes.tableContainer}>
      <table className={classes.leagueTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sport Event </th>
            <th>Date & Time</th>
            <th>Location</th>
            <th>Status</th>
            <th>Count</th>
           
            
          </tr>
        </thead>
        <tbody>
        {gameData.map((team, index) => (
          <tr>
            <td>{team.name}</td>
            <td>{team.sport_event_name}</td>
              <td>{team.start_datetime}</td>
                <td>{team.location}</td>
                  <td>{team.status}</td>
                    <td>{team.teams_count}</td>
                    
            
           
          </tr>
           ))}
         
        </tbody>
        
      </table>
      </div>
    </div>
      </div>
    </div>
  );
};

export default DashboardPage;
