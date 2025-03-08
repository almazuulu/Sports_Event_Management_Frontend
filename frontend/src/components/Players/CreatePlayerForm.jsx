import React, { useState } from "react";

import classes from "./CreatePlayerForm.module.css";
import { CgCloseO } from "react-icons/cg";

function CreatePlayerForm({ onSubmit, loading, onClose }) {
  const [formData, setFormData] = useState({
    userID: "",
    jersey_number: "",
    position: "",
    date_of_birth: "",
    joined_date: "",
  });

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
          userID: "",
          jersey_number: "",
          position: "",
          date_of_birth: "",
          joined_date: "",
        });

        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setFormData({
      userID: "",
      jersey_number: "",
      position: "",
      date_of_birth: "",
      joined_date: "",
    });

    onClose();
  };

  return (
    <section className={classes.formContainer}>
      <CgCloseO className={classes.closeIcon} onClick={handleClose} />
      <h1 className={classes.formHeader}>Add Player</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label}>
            User ID <span>*</span>
          </label>
          {/* TODO SELECT */}
          {/* <select>
          </select> */}
        </div>

        <div>
          <label className={classes.label}>
            Jersey Number <span>*</span>
          </label>
          <input
            className={classes.input}
            type="text"
            name="jersey_number"
            value={formData.jersey_number}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div>
          <label className={classes.label}>Position</label>
          <input
            className={classes.input}
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div>
          <label className={classes.label}>
            Date of Birth <span>*</span>
          </label>
          <input
            className={classes.input}
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div>
          <label className={classes.label}>
            Joined Date <span>*</span>
          </label>
          <input
            className={classes.input}
            type="date"
            name="joined_date"
            value={formData.joined_date}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <button type="submit" className={classes.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

export default CreatePlayerForm;
