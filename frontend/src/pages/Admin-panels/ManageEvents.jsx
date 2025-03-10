import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./ManageEvents.module.css";
import Header from "../../components/Header";
import CreateButton from "../../components/Button/CreateButton";
import EventTable from "../../components/EventTable";
import Modal from "../../components/UI/Modal";
import CreateEventForm from "../../components/CreateEventForm";
import { fetchWithAuth } from "../../utils/FetchClient";
import EventFilter from "../../components/Events/EventFilter";

function ManageEventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventList, setEventList] = useState([]);
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

      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to fetch events data");
      }

      if (response.ok) {
        setEventList(data.results);
      }
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
        <Header title={"Manage Events"} />
        <div className={classes.card}>
          <section className={classes.sectionButton}>
            <CreateButton onClick={handleCreateNew}>
              Create New Event
            </CreateButton>
          </section>
          <EventFilter onFilter={fetchEventsData} />
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
