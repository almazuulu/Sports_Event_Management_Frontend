import { useState } from "react";

import classes from "./EventFilter.module.css";
import { EVENTS_STATUS } from "../../constant";

function EventFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const handleApplyFilter = () => {
    const filters = {};
    if (search) filters.search = search;
    if (location) filters.location = location;
    if (status) filters.status = status;

    onFilter(filters);
  };

  const handleClearFilter = () => {
    setLocation("");
    setStatus("");
    setSearch("");
    onFilter({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <div className={classes.filter}>
          <label>Search</label>
          <input
            className={classes.input}
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={classes.filter}>
          <label>Location</label>
          <input
            className={classes.input}
            type="text"
            placeholder="Search by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className={classes.filter}>
          <label>Status</label>
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
        </div>

        <button className={classes.button} onClick={handleApplyFilter}>
          Apply Filter
        </button>
        <button className={classes.button} onClick={handleClearFilter}>
          Clear Filter
        </button>
      </div>
    </div>
  );
}

export default EventFilter;
