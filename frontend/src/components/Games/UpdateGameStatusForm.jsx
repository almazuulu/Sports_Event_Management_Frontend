import React, { useState } from "react";

import classes from "./UpdateGameStatusForm.module.css";

// icons
import { CgCloseO } from "react-icons/cg";
import { GAMES_STATUS_OPTIONS } from "../../constant";

function UpdateGameStatusForm({ loading, onSubmit, onClose }) {
  const [status, setStatus] = useState("");

  const handleClose = () => {
    setStatus("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(status);
  };

  return (
    <section className={classes.formContainer}>
      <CgCloseO className={classes.closeIcon} onClick={handleClose} />
      <h1 className={classes.formHeader}>Update Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label}>
            New Status <span>*</span>
          </label>
          <select
            name="sport_event"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={classes.select}
          >
            <option value={""} disabled>
              Please select a new status
            </option>
            {GAMES_STATUS_OPTIONS.map((sk) => (
              <option key={sk.id} value={sk.id}>
                {sk.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={classes.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

export default UpdateGameStatusForm;
