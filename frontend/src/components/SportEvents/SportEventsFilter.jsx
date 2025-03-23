import { useState } from "react";

import classes from "./SportEventsFilter.module.css";
import { SPORT_EVENTS_STATUS, SPORTS_TYPE_OPTIONS } from "../../constant";

function SportEventsFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [sportType, setSportType] = useState("");
  const [status, setStatus] = useState("");

  const handleApplyFilter = () => {
    const filters = {};
    if (search) filters.search = search;
    if (sportType) filters.sport_type = sportType;
    if (status) filters.status = status;

    onFilter(filters);
  };

  const handleClearFilter = () => {
    setSearch("");
    setSportType("");
    setStatus("");
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
          <label>Sport Type</label>
          <select
            className={classes.select}
            value={sportType}
            onChange={(e) => setSportType(e.target.value)}
          >
            <option value="">All Sport Type</option>
            {SPORTS_TYPE_OPTIONS.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.filter}>
          <label>Status</label>
          <select
            className={classes.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            {SPORT_EVENTS_STATUS.map((status) => (
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

export default SportEventsFilter;
