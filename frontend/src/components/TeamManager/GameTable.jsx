import { useNavigate } from "react-router-dom";
import { formatToShortDateTime } from "../../utils/helpers";
import ViewButton from "../Button/ViewButton";

function GameTable({ games = [] }) {
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
            <th>ACTION</th>
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
              <td>
                <ViewButton onClick={() => navigate(`games/${game.game}`)}>
                  View
                </ViewButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GameTable;
