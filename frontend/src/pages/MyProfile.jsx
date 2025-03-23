import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./MyProfile.module.css";
import { fetchWithAuth } from "../utils/FetchClient";
import UserForm from "../components/UserForm";
import NormalButton from "../components/Button/NormalButton";
import { getUserRole } from "../utils/Authentication";
import ViewButton from "../components/Button/ViewButton";

function MyProfilePage() {
  const role = getUserRole();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [roles, setRoles] = useState([]);

  const handleEdit = () => {
    setIsEdit((prevData) => !prevData);
  };

  const handleUpdateUser = async (formData) => {
    setLoading(true);

    try {
      const response = await fetchWithAuth("/api/users/profile/", {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (!response.ok) toast.error("Failed to update user");

      if (response.ok) {
        handleEdit();
        toast.success("User updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`/api/users/profile`);
      const data = await response.json();
      if (!response.ok) toast.error("Failed to fetch user");
      if (response.ok) {
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRoles = async () => {
    try {
      const response = await fetchWithAuth("/api/users/roles");
      const data = await response.json();

      if (!response.ok) toast.error("Failed to fetch roles!");

      if (response.ok) {
        setRoles(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (role === "admin") {
      fetchUserRoles();
    }
  }, [role]);

  return (
    <div className={classes.container}>
      <div className={classes.topBar}>
        <div className={classes.pageTitle}>
          <h1>My Profile</h1>
        </div>
      </div>

      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <h3>Profile Information</h3>
          <div>
            {isEdit ? (
              <NormalButton onClick={handleEdit}>Cancel</NormalButton>
            ) : (
              <ViewButton onClick={handleEdit}>Edit</ViewButton>
            )}
          </div>
        </div>
        <div className={classes.cardBody}>
          <UserForm
            initialData={userData}
            onSubmit={handleUpdateUser}
            loading={loading}
            allowEdit={isEdit}
            roles={roles}
          />
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;
