import { Outlet, NavLink } from "react-router-dom";
import classes from "./Dashboard.module.css";
import Card from "../../components/Card";
import Table from "../../components/Table";
import EventCard from "../../components/EventCard";
import styles from "../Dashboard/Dashboard.module.css";
import { FaHome, FaFutbol, FaUsers, FaTrophy, FaEnvelope } from "react-icons/fa";
import Subnavbar from "../Dashboard/Subnavbar";
import ResultsPage from "../Dashboard/Results";
const DUMMY_DATA = [
  { title: "Total Sport Events", count: "12" },
  { title: "Ongoing Events", count: "4" },
  { title: "Completed Events", count: "8" },
  { title: "Upcoming Matches", count: "6" },
];

const DashboardPage = () => {
  return (
    <div>
      <Subnavbar/>
      <div className={styles.contentArea}>
        <ResultsPage/>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
