import { useNavigate } from "react-router-dom";

import TeamStatusChip from "./TeamStatusChip";
import ViewButton from "../Button/ViewButton";
import DeleteButton from "../Button/DeleteButton";

function TeamTableManager({ teams = [] }) {
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
              <th style={{ textAlign: "left" }}>Team Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.team_id}>
                <td style={{ width: "100px" }}>{index + 1}</td>
                <td style={{ textAlign: "left" }}>{team.team_name}</td>
                <td style={{ width: "100px" }}>
                  <TeamStatusChip status={team.status} />
                </td>
                <td style={{ width: "200px" }}>
                  <ViewButton
                    style={{ marginRight: "10px" }}
                    onClick={() => handleView(team.team_id)}
                  >
                    View
                  </ViewButton>
                  <DeleteButton onClick={() => handleView(team.team_id)}>
                    Delete
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TeamTableManager;
