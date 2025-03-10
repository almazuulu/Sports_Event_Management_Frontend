import React from "react";
import StatusChip from "../../components/StatusChip";
import { formatToShortDateTime } from "../../utils/helpers";

function AdminGamesTable({ gamesList = [] }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Game Name</th>
            <th>Location</th>
            <th>Start Date & Time</th>
            <th>Sport Event Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {gamesList.map((game, index) => (
            <tr key={game.id}>
              <td>{index + 1}</td>
              <td>{game.name}</td>
              <td>{game.location}</td>
              <td>{formatToShortDateTime(game.start_datetime)}</td>
              <td>{game.sport_event_name}</td>
              <td>
                <StatusChip status={game.status} />
              </td>
              <td>Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminGamesTable;
