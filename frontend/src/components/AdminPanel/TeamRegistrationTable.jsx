import { useState } from "react";
import { toast } from "react-toastify";

import classes from "./TeamRegistrationTable.module.css";
import { formatToShortDate } from "../../utils/helpers";
import StatusChip from "../StatusChip";
import CreateButton from "../Button/CreateButton";
import DeleteButton from "../Button/DeleteButton";
import Modal from "../UI/Modal";
import CancelButton from "../Button/CancelButton";
import { fetchWithAuth } from "../../utils/FetchClient";

function TeamRegistrationTable({
  teamRegList = [],
  onRefetchData,
  isPending = false,
}) {
  const [teamRegId, setTeamRegId] = useState("");
  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);

  const approveButtonHandler = (regId) => {
    setTeamRegId(regId);
    setIsModalApproveOpen(true);
  };

  const rejectButtonHandler = (regId) => {
    setTeamRegId(regId);
    setIsModalRejectOpen(true);
  };

  const approveHandler = async (status) => {
    try {
      const res = await fetchWithAuth(
        `/api/teams/registrations/${teamRegId}/`,
        {
          method: "PUT",
          body: JSON.stringify({
            status: status,
            notes: "",
          }),
        }
      );

      if (!res.ok) return toast.error(`Failed to ${status} team registration!`);
      if (res.ok) {
        toast.success(`Team registration ${status}!`);
        onRefetchData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      status === "approved"
        ? setIsModalApproveOpen(false)
        : setIsModalRejectOpen(false);
    }
  };

  return (
    <>
      <table className="tableContainer">
        <thead>
          <tr>
            <th>Team</th>
            <th>Sport Event</th>
            <th>Registration Date</th>
            {!isPending && <th>Approval</th>}
            <th>Notes</th>
            <th>Status</th>
            {isPending && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {teamRegList.map((data) => (
            <tr key={data.id}>
              <td>{data.team_name}</td>
              <td>{data.sport_event_name}</td>
              <td>{formatToShortDate(data.registration_date)}</td>
              {!isPending && (
                <td>
                  <p style={{ fontSize: "14px" }}>
                    Name: {data.approved_by_name}
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Date: {formatToShortDate(data.approval_date)}
                  </p>
                </td>
              )}
              <td>{data.notes}</td>
              <td style={{ width: "200px" }}>
                <StatusChip status={data.status} />
              </td>
              {isPending && (
                <td>
                  <CreateButton
                    style={{ marginRight: "10px" }}
                    onClick={() => approveButtonHandler(data.id)}
                  >
                    Approve
                  </CreateButton>
                  <DeleteButton onClick={() => rejectButtonHandler(data.id)}>
                    Reject
                  </DeleteButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* APPROVE MODAL */}
      <Modal
        open={isModalApproveOpen}
        onClose={() => setIsModalApproveOpen(false)}
        className={classes.modalContainer}
      >
        <p>Are you sure you want to aprprove this team?</p>
        <CreateButton
          style={{ marginRight: "10px" }}
          onClick={() => approveHandler("approved")}
        >
          Yes
        </CreateButton>
        <CancelButton onClick={() => setIsModalApproveOpen(false)} />
      </Modal>

      {/* REJECT MODAL */}
      <Modal
        open={isModalRejectOpen}
        onClose={() => setIsModalRejectOpen(false)}
        className={classes.modalContainer}
      >
        <p>Are you sure you want to reject this team?</p>
        <CreateButton
          style={{ marginRight: "10px" }}
          onClick={() => approveHandler("rejected")}
        >
          Yes
        </CreateButton>
        <CancelButton onClick={() => setIsModalRejectOpen(false)} />
      </Modal>
    </>
  );
}

export default TeamRegistrationTable;
