import { useState } from "react";

import classes from "./PlayersFilter.module.css";
import { fetchWithAuth, fetchWithoutAuth } from "../../utils/FetchClient";
import { toast } from "react-toastify";
import { isAuthenticated } from "../../utils/Authentication";

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
    <div className={classes.filterContainer}>
      <input
        className={classes.input}
        type="text"
        placeholder="Search player..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

      <button className={classes.button} onClick={handleApplyFilter}>
        Apply Filter
      </button>
      <button className={classes.button} onClick={handleClearFilter}>
        Clear Filter
      </button>
    </div>
  );
}

export default PlayersFilter;
