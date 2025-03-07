import { useState } from "react";

import classes from "./TeamsFilter.module.css";
import { TEAM_STATUS_OPTIONS } from "../../constant";

function TeamsFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleApplyFilter = () => {
    const filters = {};
    if (search) filters.search = search;
    if (status) filters.status = status;

    onFilter(filters);
  };

  const handleClearFilter = () => {
    setSearch("");
    setStatus("");
    onFilter({});
  };

  return (
    <div className={classes.filterContainer}>
      <input
        className={classes.input}
        type="text"
        placeholder="Search team name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className={classes.select}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        {TEAM_STATUS_OPTIONS.map((status) => (
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

export default TeamsFilter;
