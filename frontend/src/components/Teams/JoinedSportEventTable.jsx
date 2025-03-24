import { useState } from "react";
import { toast } from "react-toastify";

import classes from "./JoinedSportEventTable.module.css";
import { formatToShortDate } from "../../utils/helpers";
import DeleteButton from "../Button/DeleteButton";
import StatusChip from "../StatusChip";
import Modal from "../UI/Modal";
import CancelButton from "../Button/CancelButton";
import { fetchWithAuth } from "../../utils/FetchClient";
import { getUserRole } from "../../utils/Authentication";

function JoinedSportEventTable({ sportEventList = [], onRefetchData }) {
  const role = getUserRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [regId, setRegId] = useState("");

  const handleDelete = (eventId) => {
    setIsModalOpen(true);
    setRegId(eventId);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetchWithAuth(
        `/api/teams/registrations/${regId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) toast.error("Failed to cancel registration!");

      if (response.ok) {
        toast.success("Registration cancelled successfully!");
        onRefetchData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Sport Event Name</th>
            <th>Registration Date</th>
            <th>Approval</th>
            <th>Notes</th>
            <th>Status</th>
            {role === "team_manager" && <th>Action</th>}
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
              {role === "team_manager" && (
                <td>
                  {data.status === "pending" && (
                    <DeleteButton onClick={() => handleDelete(data.id)}>
                      Delete
                    </DeleteButton>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* CANCEL SPORT EVENT REGISTRATION */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={classes.modalContainer}
      >
        <p>Are you sure you want to cancel registration?</p>
        <DeleteButton style={{ marginRight: "10px" }} onClick={confirmDelete}>
          Yes, Cancel
        </DeleteButton>
        <CancelButton onClick={() => setIsModalOpen(false)}>No</CancelButton>
      </Modal>
    </>
  );
}

export default JoinedSportEventTable;
