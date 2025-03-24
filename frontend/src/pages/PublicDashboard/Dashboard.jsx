import classes from "./Dashboard.module.css";

import UpcomingFixtures from "../../components/Home/UpcomingFixtures";
import Leaderboard from "../../components/Home/Leaderboard";
import RecentMatches from "../../components/Home/RecentMatches";
import Featured from "../../components/Home/Featured";
import NewsHighlights from "../../components/Home/NewsHighlights ";
import Hero from "../../components/Home/Hero";

const DashboardPage = () => {
  return (
    <>
      <Hero />
      <div className={classes.content}>
        <UpcomingFixtures />
        <div className={classes.mainContainer}>
          <div className={classes.leftContainer}>
            <RecentMatches />
            <Leaderboard />
            <Featured />
          </div>
          <div className={classes.rightContainer}>
            <NewsHighlights />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
