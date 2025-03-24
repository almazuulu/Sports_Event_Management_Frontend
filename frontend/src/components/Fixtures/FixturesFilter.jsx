import { useState } from "react";

import classes from "./FixturesFilter.module.css";
import { GAMES_STATUS_OPTIONS } from "../../constant";

function FixturesFilter({ onFilter }) {
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
    <div className={classes.container}>
      <div className={classes.filters}>
        <div className={classes.filter}>
          <label>Search</label>
          <input
            className={classes.input}
            type="text"
            placeholder="Search game..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            {GAMES_STATUS_OPTIONS.map((status) => (
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

export default FixturesFilter;
