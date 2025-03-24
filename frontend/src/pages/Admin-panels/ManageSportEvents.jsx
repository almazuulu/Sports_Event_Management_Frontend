import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./ManageSportEvents.module.css";
import CreateButton from "../../components/Button/CreateButton";
import SportEventTable from "../../components/SportEvents/SportEventTable";
import Modal from "../../components/UI/Modal";
import SportEventForm from "../../components/SportEvents/SportEventForm";
import { fetchWithAuth } from "../../utils/FetchClient";
import SportEventsFilter from "../../components/SportEvents/SportEventsFilter";
import CountCard from "../../components/AdminPanel/CountCard";

function ManageSportEventsPage() {
  const [sportEventList, setSportEventList] = useState([]);
  const [seCount, setSeCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventList, setEventList] = useState([]);

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleSubmitNewSportEvent = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await fetchWithAuth("/api/events/sport-events/", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          <div>
            <strong>Failed to submit form:</strong>
            <ul>
              {Object.entries(data).map(([field, messages]) => (
                <li key={field}>
                  <strong>{field}:</strong> {messages.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      if (response.ok) {
        toast.success("New event created successfully!");
        fetchSportEvents();
        setIsModalOpen(false);

        return { success: true, data };
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchSportEvents = async (filters = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/events/sport-events/${
        queryParams ? `?${queryParams}` : ""
      }`;
      const response = await fetchWithAuth(url);

      if (!response.ok) {
        toast.error("Failed to fetch data");
      }

      const data = await response.json();
      setSportEventList(data.results);

      const res = await fetchWithAuth("/api/events/sport-events/");
      const resData = await res.json();
      setSeCount(resData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsList = async () => {
    try {
      const response = await fetchWithAuth("/api/events/events/");

      const data = await response.json();

      if (!response.ok) toast.error("Failed to fetch events!");

      if (response.ok) {
        setEventList(data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEventsList();
    fetchSportEvents();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>Sport Events Management</h1>
          </div>
          <div>
            <CreateButton onClick={handleCreateNew}>
              Create New Sport Event
            </CreateButton>
          </div>
        </div>

        <div className={classes.statsCards}>
          {/* <CountCard label={"Total Sport Events"} count={seCount.length} /> */}
          <CountCard
            label={"Ongoing"}
            count={seCount.filter((se) => se.status === "ongoing").length}
          />
          <CountCard
            label={"Scheduled"}
            count={seCount.filter((se) => se.status === "scheduled").length}
          />
          <CountCard
            label={"Completed"}
            count={seCount.filter((se) => se.status === "completed").length}
          />
          <CountCard
            label={"Cancelled"}
            count={seCount.filter((se) => se.status === "cancelled").length}
          />
          <CountCard
            label={"Open for Registration"}
            count={seCount.filter((se) => se.status === "registration").length}
          />
        </div>

        <SportEventsFilter onFilter={fetchSportEvents} />

        <div className={classes.card}>
          {loading ? (
            <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
          ) : sportEventList.length === 0 ? (
            <p style={{ color: "#000", textAlign: "center" }}>
              No sport events available at the moment.
            </p>
          ) : (
            <SportEventTable
              sportEventList={sportEventList}
              onRefetchData={fetchSportEvents}
            />
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={classes.modalContainer}
      >
        <SportEventForm
          onSubmit={handleSubmitNewSportEvent}
          loading={isSubmitting}
          onClose={() => setIsModalOpen(false)}
          eventList={eventList}
        />
      </Modal>
    </>
  );
}

export default ManageSportEventsPage;
