import { formatToShortDate } from "../../utils/helpers";
import StatusChip from "../StatusChip";

function JoinedSportEventTable({ sportEventList = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Sport Event Name</th>
          <th>Registration Date</th>
          <th>Approval</th>
          <th>Notes</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sportEventList.map((data, index) => (
          <tr key={data.id}>
            <td>{index + 1}</td>
            <td>{data.sport_event_name}</td>
            <td>{formatToShortDate(data.registration_date)}</td>
            <td>
              {data.approved_by_name && (
                <>
                  <p style={{ fontSize: "14px" }}>
                    Name: {data.approved_by_name}
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Date: {formatToShortDate(data.approval_date)}
                  </p>
                </>
              )}
              {!data.approved_by_name && <p>N/A</p>}
            </td>
            <td>{data.notes}</td>
            <td style={{ width: "200px" }}>
              <StatusChip status={data.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JoinedSportEventTable;
