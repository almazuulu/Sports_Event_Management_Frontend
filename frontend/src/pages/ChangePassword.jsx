import { useState } from "react";
import { toast } from "react-toastify";

import classes from "./ChangePassword.module.css";
import { fetchWithAuth } from "../utils/FetchClient";
import NormalButton from "../components/Button/NormalButton";
import ViewButton from "../components/Button/ViewButton";

function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit((prevData) => !prevData);
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
      setLoading(true);
      const response = await fetchWithAuth("/api/users/change-password/", {
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
        handleEdit();
        toast.success("Pasword changed successfully!");
        setFormData({
          old_password: "",
          new_password: "",
          new_password_confirm: "",
        });
      }
    } catch (error) {
      console.error("Error changing password!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.topBar}>
        <div className={classes.pageTitle}>
          <h1>Change Password</h1>
        </div>
      </div>
      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <h3>Change My Password</h3>
          <div>
            {isEdit ? (
              <NormalButton onClick={handleEdit}>Cancel</NormalButton>
            ) : (
              <ViewButton onClick={handleEdit}>Change Password</ViewButton>
            )}
          </div>
        </div>
        <div className={classes.cardBody}>
          <div className={classes.formContainer}>
            <form onSubmit={handleSubmit}>
              <div>
                <label className={classes.label}>
                  Old Password <span>*</span>
                </label>
                <input
                  type="password"
                  name="old_password"
                  value={formData.old_password}
                  onChange={handleChange}
                  className={classes.input}
                  disabled={!isEdit}
                />
              </div>

              <div>
                <label className={classes.label}>
                  New Password <span>*</span>
                </label>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className={classes.input}
                  disabled={!isEdit}
                />
              </div>

              <div>
                <label className={classes.label}>
                  New Password Confirm <span>*</span>
                </label>
                <input
                  type="password"
                  name="new_password_confirm"
                  value={formData.new_password_confirm}
                  onChange={handleChange}
                  className={classes.input}
                  disabled={!isEdit}
                />
              </div>

              {isEdit && (
                <button
                  type="submit"
                  className={classes.button}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Change Password"}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
