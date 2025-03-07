import { useState } from "react";

import classes from "./EventFilter.module.css";
import { EVENTS_STATUS } from "../../constant";

function EventFilter({ onFilter }) {
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const handleApplyFilter = () => {
    const filters = {};
    if (location) filters.location = location;
    if (status) filters.status = status;

    onFilter(filters);
  };

  const handleClearFilter = () => {
    setLocation("");
    setStatus("");
    onFilter({}); // Fetch all events with no filters
  };

  return (
    <div className={classes.filterContainer}>
      <input
        className={classes.input}
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select
        className={classes.select}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        {EVENTS_STATUS.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>

      <button className={classes.button} onClick={handleApplyFilter}>
        Apply Filter
      </button>
      <button className={classes.button} onClick={handleClearFilter}>
        Clear Filter
      </button>
    </div>
  );
}

export default EventFilter;
