import { useNavigate } from "react-router-dom";

import { formatToShortDateTime } from "../../utils/helpers";
import ViewButton from "../Button/ViewButton";
import { getUserRole } from "../../utils/Authentication";

function GameTable({ games = [] }) {
  const role = getUserRole();
  const navigate = useNavigate();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>GAME NAME</th>
            <th>TEAM DESIGNATION</th>
            <th>SPORT EVENT NAME</th>
            <th>DATE & TIME</th>
            <th>LOCATION</th>
            {role === "team_manager" && <th>ACTION</th>}
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.game}>
              <td>{game.game_name}</td>
              <td>{game.designation_display}</td>
              <td>{game.sport_event_name}</td>
              <td>{formatToShortDateTime(game.game_start_datetime)}</td>
              <td>{game.game_location}</td>
              {role === "team_manager" && (
                <td>
                  <ViewButton onClick={() => navigate(`games/${game.game}`)}>
                    View
                  </ViewButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GameTable;
