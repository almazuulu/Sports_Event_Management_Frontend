import { useState } from "react";

import classes from "./CreateGameForm.module.css";

// icons
import { CgCloseO } from "react-icons/cg";

function CreateGameForm({
  initialData = null,
  onSubmit,
  onClose,
  loading,
  sportEventList = [],
  scorekeeperList = [],
}) {
  const [formData, setFormData] = useState({
    sport_event: "",
    name: "",
    description: "",
    location: "",
    start_datetime: "",
    end_datetime: "",
    scorekeeper: "",
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
          sport_event: "",
          name: "",
          description: "",
          location: "",
          start_datetime: "",
          end_datetime: "",
          scorekeeper: "",
        });
      }
    } catch (error) {
      console.error("Error Response:", error);
    }
  };

  return (
    <section className={classes.formContainer}>
      <CgCloseO className={classes.closeIcon} onClick={onClose} />
      <h1 className={classes.formHeader}>
        {initialData ? "Update Game" : "Create New Game"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label}>
            Sport Event <span>*</span>
          </label>
          <select
            name="sport_event"
            value={formData.sport_event}
            onChange={handleChange}
            className={classes.select}
          >
            <option value={""} disabled>
              Please select an sport event
            </option>
            {sportEventList.map((se) => (
              <option key={se.id} value={se.id}>
                {se.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={classes.label}>
            Name <span>*</span>
          </label>
          <input
            className={classes.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div>
          <label className={classes.label}>Description</label>
          <input
            className={classes.input}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div>
          <label className={classes.label}>
            Location <span>*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={classes.input}
            required
            autoComplete="off"
          />
        </div>

        <div className={classes.dateInputWrapper}>
          <section>
            <label className={classes.label}>
              Start Date & Time <span>*</span>
            </label>
            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className={classes.input}
              required
            />
          </section>
          <section>
            <label className={classes.label}>
              End Date & Time <span>*</span>
            </label>
            <input
              type="datetime-local"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className={classes.input}
              required
            />
          </section>
        </div>

        <div>
          <label className={classes.label}>Scorekeeper</label>
          <select
            name="sport_event"
            value={formData.sport_event}
            onChange={handleChange}
            className={classes.select}
          >
            <option value={""} disabled>
              Please select a scorekeeper
            </option>
            {scorekeeperList.map((sk) => (
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

export default CreateGameForm;
