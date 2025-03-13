import { useEffect, useState } from "react";

import classes from "./CreateGameForm.module.css";

// icons
import { CgCloseO } from "react-icons/cg";
import { fetchWithAuth } from "../../utils/FetchClient";
import { toast } from "react-toastify";

function CreateGameForm({ onSubmit, onClose, loading, sportEventList = [] }) {
  const [formData, setFormData] = useState({
    sport_event: "",
    name: "",
    description: "",
    location: "",
    start_datetime: "",
    end_datetime: "",
    scorekeeper: "",
  });

  const [scorekeeperList, setScorekeeperList] = useState([]);

  const handleClose = () => {
    setFormData({
      sport_event: "",
      name: "",
      description: "",
      location: "",
      start_datetime: "",
      end_datetime: "",
      scorekeeper: "",
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

  useEffect(() => {
    if (!formData.start_datetime || !formData.end_datetime) return;

    const startDateTime = new Date(formData.start_datetime);
    const endDateTime = new Date(formData.end_datetime);

    const gameDate = startDateTime.toISOString().split("T")[0]; // YYYY-MM-DD
    const startTime = startDateTime.toTimeString().slice(0, 5); // HH:MM
    const endTime = endDateTime.toTimeString().slice(0, 5); // HH:MM

    const fetchScorekeepers = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/games/scorekeepers/?game_date=${gameDate}&start_time=${startTime}&end_time=${endTime}`
        );
        const data = await response.json();
        if (!response.ok) return toast.error("Failed to fetch scorekeepers");
        if (response.ok) {
          setScorekeeperList(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchScorekeepers();
  }, [formData.start_datetime, formData.end_datetime]);

  return (
    <section className={classes.formContainer}>
      <CgCloseO className={classes.closeIcon} onClick={handleClose} />
      <h1 className={classes.formHeader}>Create New Game</h1>
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
              name="start_datetime"
              value={formData.start_datetime}
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
              name="end_datetime"
              value={formData.end_datetime}
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
                {sk.full_name}
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
