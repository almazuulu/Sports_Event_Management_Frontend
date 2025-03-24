import { useState } from "react";

import classes from "./PlayersFilter.module.css";

function PlayersFilter({ onFilter, teams = [] }) {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("");

  const handleApplyFilter = () => {
    const filters = {};
    if (search) filters.search = search;
    if (team) filters.team = team;

    onFilter(filters);
  };

  const handleClearFilter = () => {
    setSearch("");
    setTeam("");
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
            placeholder="Search by player name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={classes.filter}>
          <label>Team</label>
          <select
            className={classes.select}
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <option value="">All Teams</option>
            {teams.map((status) => (
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

export default PlayersFilter;
