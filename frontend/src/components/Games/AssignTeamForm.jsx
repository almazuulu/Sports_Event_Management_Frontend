import { useState } from "react";

import classes from "./AssignTeamForm.module.css";

// icons
import { CgCloseO } from "react-icons/cg";

function AssignTeamForm({ onClose, onSubmit, availTeams = [], loading }) {
  const [formData, setFormData] = useState({
    team: "",
    designation: "team_a",
  });

  const handleClose = () => {
    setFormData({
      team: "",
      designation: "",
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await onSubmit(formData);

      if (res.success) {
        setFormData({
          team: "",
          designation: "team_a",
        });
      }
    } catch (error) {
      console.error("Error Response:", error);
    }
  };

  return (
    <section className={classes.formContainer}>
      <CgCloseO className={classes.closeIcon} onClick={handleClose} />
      <h1 className={classes.formHeader}>Update Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label}>Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className={classes.select}
          >
            <option value="home">Home</option>
            <option value="away">Away</option>
          </select>
        </div>
        <div>
          <label className={classes.label}>Select Team</label>
          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            className={classes.select}
          >
            <option value={""} disabled>
              Please select a team
            </option>
            {availTeams.map((team) => (
              <option key={team.team} value={team.team}>
                {team.team_name}
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

export default AssignTeamForm;
