import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./ManageUsers.module.css";
import UserTable from "../../components/UserTable";
import { fetchWithAuth } from "../../utils/FetchClient";
import Modal from "../../components/UI/Modal";
import CreateUserForm from "../../components/CreateUserForm";
import CreateButton from "../../components/Button/CreateButton";
import UsersFilter from "../../components/AdminPanel/UsersFilter";
import CountCard from "../../components/AdminPanel/CountCard";

function ManageUsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [roles, setRoles] = useState([]);

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleSubmitNewUser = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await fetchWithAuth("/api/users/", {
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
        toast.success("New user created successfully!");
        setIsModalOpen(false);
        fetchUsersData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUsersData = async (filters = {}) => {
    try {
      setIsFetching(true);
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/users/${queryParams ? `?${queryParams}` : ""}`;
      const response = await fetchWithAuth(url);

      const res = await fetchWithAuth('/api/users/')

      if (!response.ok) {
        throw new Error("Netwrk error!");
      }

      const data = await response.json();
      setUsers(data.results);

      const dataCount = await res.json();
      setUsersCount(dataCount.results)
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchUserRoles = async () => {
    try {
      const response = await fetchWithAuth("/api/users/roles");

      if (!response.ok) {
        throw new Error("Failed to fetch roles!");
      }

      const data = await response.json();
      setRoles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsersData();
    fetchUserRoles();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topBar}>
          <div className={classes.pageTitle}>
            <h1>User Management</h1>
          </div>
          <div>
            <CreateButton onClick={handleCreateNew}>
              Create New User
            </CreateButton>
          </div>
        </div>
        <div className={classes.statsCards}>
          <CountCard label={"Admins"} count={usersCount.filter(user => user.role === 'admin').length}/>
          <CountCard label={"Team Managers"} count={usersCount.filter(user => user.role === 'team_manager').length}/>
          <CountCard label={"Players"} count={usersCount.filter(user => user.role === 'player').length}/>
          <CountCard label={"Scorekeepers"} count={usersCount.filter(user => user.role === 'scorekeeper').length}/>
          <CountCard label={"Public Users"} count={usersCount.filter(user => user.role === 'public').length}/>
        </div>
        <UsersFilter onFilter={fetchUsersData} />
        <div className={classes.card}>
          {isFetching ? (
            <p style={{ color: "#000", textAlign: "center" }}>Loading...</p>
          ) : (
            <UserTable
              userList={users}
              onRefetchData={fetchUsersData}
              roles={roles}
            />
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={classes.modalContainer}
      >
        <CreateUserForm
          onSubmit={handleSubmitNewUser}
          loading={isSubmitting}
          onClose={() => setIsModalOpen(false)}
          roles={roles}
        />
      </Modal>
    </>
  );
}

export default ManageUsersPage;
