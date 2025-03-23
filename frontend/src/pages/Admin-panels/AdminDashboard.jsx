import { useEffect, useState } from "react";

import classes from "./AdminDashboard.module.css";
import StatCard from "../../components/AdminPanel/StatCard";
import { fetchWithAuth } from "../../utils/FetchClient";

// icons
import { FaUsers } from "react-icons/fa";
import {
  MdEvent,
  MdOutlineSportsSoccer,
  MdOutlineEventSeat,
} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import LoadingScreen from "../../components/UI/LoadingScreen";

function AdminDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [sportEventCount, setSportEventCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [upcomingMatchesCount, setUpcomingMatchesCount] = useState(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [userRes, eventRes, teamRes, matchRes, sportEventRes] =
          await Promise.all([
            fetchWithAuth("/api/users/"),
            fetchWithAuth("/api/events/events/"),
            fetchWithAuth("/api/teams/teams/"),
            fetchWithAuth("/api/games/games/upcoming/"),
            fetchWithAuth("/api/events/sport-events/"),
          ]);

        if (!userRes.ok || !eventRes.ok || !teamRes.ok || !matchRes.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await userRes.json();
        const eventData = await eventRes.json();
        const teamData = await teamRes.json();
        const matchData = await matchRes.json();
        const sportEventData = await sportEventRes.json();

        setUserCount(userData.count);
        setEventCount(eventData.count);
        setTeamCount(teamData.count);
        setUpcomingMatchesCount(matchData.count);
        setSportEventCount(sportEventData.count);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <LoadingScreen />;

  return (
    <div className={classes.container}>
      {/* TOP BAR */}
      <div className={classes.topBar}>
        <div className={classes.pageTitle}>
          <h1>Sport Events Management Dashboard</h1>
        </div>
      </div>

      {/* STATS CARD */}
      <div className={classes.statsCards}>
        <StatCard icon={<FaUsers />} value={userCount} label={"Total Users"} />
        <StatCard
          icon={<FaPeopleGroup />}
          value={teamCount}
          label={"Total Teams"}
        />
        <StatCard
          icon={<MdEvent />}
          value={eventCount}
          label={"Total Events"}
        />
        <StatCard
          icon={<MdOutlineEventSeat />}
          value={sportEventCount}
          label={"Total Sport Events"}
        />
        <StatCard
          icon={<MdOutlineSportsSoccer />}
          value={upcomingMatchesCount}
          label={"Upcoming Matches"}
        />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
