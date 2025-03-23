import { useState } from "react";

import classes from "./AdminScoresTable.module.css";
import CreateButton from "../Button/CreateButton";
import DeleteButton from "../Button/DeleteButton";
import Modal from "../UI/Modal";
import CancelButton from "../Button/CancelButton";
import { fetchWithAuth } from "../../utils/FetchClient";
import { toast } from "react-toastify";

const VERIFICATION_STATUS = {
  unverified: "Unverified",
  pending_verification: "Pending Verification",
  verified: "Verified",
  disputed: "Disputed",
};

function AdminScoresTable({ scores = [], onRefresh, isPending = false }) {
  const [selectedScoreId, setSelectedScoreId] = useState("");
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  const handleVerify = (scoreId) => {
    setSelectedScoreId(scoreId);
    setVerifyModalOpen(true);
  };

  const confirmVerify = async () => {
    try {
      const res = await fetchWithAuth(
        `/api/scores/scores/${selectedScoreId}/verify/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            verified: true,
            verification_status: "verified",
            notes: "Verified after checking with both team captains",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to verify");
      }

      toast.success("Score verified successfully");
      setVerifyModalOpen(false);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <table className="tableContainer">
        <thead>
          <tr>
            <th>GAME</th>
            <th>TEAMS</th>
            <th>SCORE</th>
            {/* <th>DATE</th> */}
            <th>SCOREKEEPER</th>
            <th>STATUS</th>
            {isPending && <th>ACTIONS</th>}
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.id}>
              <td>{score.game_name}</td>
              <td>
                {score.team1_name} vs {score.team2_name}
              </td>
              <td>
                {score.final_score_team1} : {score.final_score_team2}
              </td>
              {/* <td>{score.game_name}</td> */}
              <td>
                {score.scorekeeper.first_name} {score.scorekeeper.last_name}
              </td>
              <td>{VERIFICATION_STATUS[score.verification_status]}</td>
              {isPending && (
                <td>
                  <CreateButton
                    style={{ marginRight: "10px" }}
                    onClick={() => handleVerify(score.id)}
                  >
                    Verify
                  </CreateButton>
                  <DeleteButton>Reject</DeleteButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* VERIFY MODAL */}
      <Modal
        open={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        className={classes.modalContainer}
      >
        <p>Are you sure you want to reject this team?</p>
        <CreateButton style={{ marginRight: "10px" }} onClick={confirmVerify}>
          Yes, verify
        </CreateButton>
        <CancelButton onClick={() => setVerifyModalOpen(false)} />
      </Modal>
    </>
  );
}

export default AdminScoresTable;
