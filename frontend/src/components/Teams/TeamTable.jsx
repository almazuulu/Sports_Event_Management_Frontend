import React from "react";
import { useNavigate } from "react-router-dom";

import TeamStatusChip from "./TeamStatusChip";
import ViewButton from "../Button/ViewButton";

function TeamTable({ teams = [], onRefetchData }) {
  const navigate = useNavigate();

  const handleView = (teamId) => {
    navigate(`${teamId}`);
  };

  return (
    <>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Team Name</th>
              <th>Team Captain</th>
              <th>Team Manager</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td>{team.name}</td>
                <td>{team.team_captain ?? "N/A"}</td>
                <td>
                  {team.manager.first_name} {team.manager.last_name}
                </td>
                <td style={{ textAlign: "left" }}>
                  <p>Email: {team.contact_email}</p>
                  <p>Phone: {team.contact_phone}</p>
                </td>
                <td>
                  <TeamStatusChip status={team.status} />
                </td>
                <td>
                  <ViewButton onClick={() => handleView(team.id)}>
                    View
                  </ViewButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TeamTable;
