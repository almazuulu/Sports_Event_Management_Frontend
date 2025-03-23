import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./ManageEvents.module.css";
import CreateButton from "../../components/Button/CreateButton";
import EventTable from "../../components/EventTable";
import Modal from "../../components/UI/Modal";
import CreateEventForm from "../../components/CreateEventForm";
import { fetchWithAuth } from "../../utils/FetchClient";
import EventFilter from "../../components/Events/EventFilter";
import CountCard from "../../components/AdminPanel/CountCard";

function ManageEventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [eventCount, setEventCount] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleSubmitNewEvent = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await fetchWithAuth("/api/events/events/", {
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
        setIsModalOpen(false);
        fetchEventsData();

        return { success: true, data };
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchEventsData = async (filters = {}) => {
    try {
      setIsFetching(true);
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/events/events/${queryParams ? `?${queryParams}` : ""}`;
      const response = await fetchWithAuth(url);

      if (!response.ok) {
        throw new Error("Network error");
      }

      const data = await response.json();
      setEventList(data.results);

      const res = await fetchWithAuth("/api/events/events/");
      const resData = await res.json();
      setEventCount(resData.results);
    } catch (error) {
      console.error("Error fetching events data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>Event Management</h1>
          </div>
          <div>
            <CreateButton onClick={handleCreateNew}>
              Create New Event
            </CreateButton>
          </div>
        </div>

        <div className={classes.statsCards}>
          {/* <CountCard label={"Total Events"} count={eventCount.length} /> */}
          <CountCard
            label={"Ongoing"}
            count={eventCount.filter((ev) => ev.status === "active").length}
          />
          <CountCard
            label={"Finished"}
            count={eventCount.filter((ev) => ev.status === "completed").length}
          />
          <CountCard
            label={"Cancelled"}
            count={eventCount.filter((ev) => ev.status === "cancelled").length}
          />
          <CountCard
            label={"Drafted"}
            count={eventCount.filter((ev) => ev.status === "draft").length}
          />
          <CountCard
            label={"Open for Registration"}
            count={
              eventCount.filter((ev) => ev.status === "registration").length
            }
          />
        </div>

        <EventFilter onFilter={fetchEventsData} />

        <div className={classes.card}>
          {isFetching ? (
            <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
          ) : eventList.length === 0 ? (
            <p style={{ color: "#000", textAlign: "center" }}>
              No events available at the moment.
            </p>
          ) : (
            <EventTable eventList={eventList} onRefetchData={fetchEventsData} />
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={classes.modalContainer}
      >
        <CreateEventForm
          onSubmit={handleSubmitNewEvent}
          loading={isSubmitting}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default ManageEventsPage;
