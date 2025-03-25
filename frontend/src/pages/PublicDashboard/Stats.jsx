import { useNavigate } from "react-router-dom";
import styles from "./Stats.module.css";
import Hero from "../../components/Stats/Hero";
import React, { useState } from "react";

const leaderboardData = [
  {
    id: 1,
    sport: "Football",
    status: "Final results",
    name: "Annual Football Tournament 2025",
    teams: 8,
    updated: "Mar 15, 2025",
    type: "final",
  },
  {
    id: 2,
    sport: "Basketball",
    status: "In progress",
    name: "Summer Basketball League 2025",
    teams: 12,
    updated: "Mar 18, 2025",
    type: "live",
  },
  {
    id: 3,
    sport: "Volleyball",
    status: "Final results",
    name: "City Volleyball Championship 2025",
    teams: 6,
    updated: "Mar 10, 2025",
    type: "final",
  },
];

function StatsPage() {
  const [selectedTab, setSelectedTab] = useState("All Leaderboards");
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <div className={styles.container}>
        {/* Search & Filter */}
        <div className={styles.searchFilter}>
          <input type="text" placeholder="🔍 Search events..." className={styles.searchBox} />
          <select className={styles.filter}>
            <option>All Sport Types</option>
          </select>
          <select className={styles.filter}>
            <option>All Statuses</option>
          </select>
          <select className={styles.filter}>
            <option>Latest Updated</option>
          </select>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {["All Leaderboards", "Final Results", "In Progress"].map((tab) => (
            <button
              key={tab}
              className={selectedTab === tab ? styles.activeTab : styles.tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Leaderboard Cards */}
        <div className={styles.cards}>
          {leaderboardData.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.header}>
                <span className={styles.sport}>{item.sport}</span>
                <span className={styles.status}>{item.status}</span>
              </div>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.teams}>🏆 {item.teams} Teams participating</p>
              <p className={styles.updated}>📅 Updated: {item.updated}</p>
              <div className={styles.footer}>
                <span className={item.type === "final" ? styles.final : styles.live}>
                  {item.type === "final" ? " Final" : "Live"}
                </span>
                <button
                  className={styles.button}
                  onClick={() => navigate(`/leader-board/${item.id}`)}
                >
                  View Standings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StatsPage;
