import { useState } from "react";

import classes from "./UsersFilter.module.css";

function UsersFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const handleApplyFilter = () => {
    const filters = {};
    if (search) filters.search = search;
    if (role) filters.role = role;

    onFilter(filters);
  };

  const handleClearFilter = () => {
    setSearch("");
    setRole("");
    onFilter({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <div className={classes.filter}>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="admin">Administrator</option>
            <option value="team_manager">Team Manager</option>
            <option value="player">Player</option>
            <option value="scorekeeper">Scorekeeper</option>
            <option value="public">Public User</option>
          </select>
        </div>
        <div className={classes.filter}>
          <label>Search</label>
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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

export default UsersFilter;
