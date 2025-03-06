import React from "react";
import styles from "./Dashboard.module.css";
import { FaHome, FaFutbol, FaUsers, FaTrophy, FaEnvelope } from "react-icons/fa";


const Dashboard = () => {
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>🏆 Premier Dashboard</div>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}><FaHome /> Home</li>
          <li className={styles.navItem}><FaFutbol /> Matches</li>
          <li className={styles.navItem}><FaUsers /> Teams</li>
          <li className={styles.navItem}><FaTrophy /> Standings</li>
          <li className={styles.navItem}><FaEnvelope /> Contact</li>
        </ul>
      </nav>
      <div className={styles.subNavbar}>
  <ul className={styles.subNavLinks}>
    <li className={`${styles.subNavItem} active`}>Fixtures</li>
    <li className={styles.subNavItem}>Results</li>
    <li className={styles.subNavItem}>Tables</li>
    <li className={styles.subNavItem}>Transfers</li>
    <li className={styles.subNavItem}>Stats</li>
  </ul>
</div>
      {/* Main Content */}
      <main className={styles.mainContent}>
        <h2>Welcome to the Premier Dashboard</h2>
        <p>This is where your main content will go.</p>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
