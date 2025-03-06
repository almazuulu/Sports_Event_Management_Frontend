import { useEffect, useRef, useState } from "react";

import classes from "./NewTeamForm.module.css";

// icons
import { CgCloseO } from "react-icons/cg";
import { toast } from "react-toastify";

function NewTeamForm({ initialData, onSubmit, loading, onClose }) {
  const [formData, setFormData] = useState({
    logo: null,
    name: "",
    description: "",
    contact_email: "",
    contact_phone: "",
  });
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        logo: file,
      }));
    }
  };

  const handleClose = () => {
    setFormData({
      logo: null,
      name: "",
      description: "",
      contact_email: "",
      contact_phone: "",
    });
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
    // setPreviewImage(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await onSubmit(formData);

      if (res.success) {
        setFormData({
          logo: null,
          name: "",
          description: "",
          contact_email: "",
          contact_phone: "",
        });
      }

      if (!res.success) {
        const message = Object.values(res.data)[0];
        toast.error(message);
      }
    } catch (error) {
      console.error("Error Response:", error);
    }

    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
    // setPreviewImage(null);
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  return (
    <section className={classes.formContainer}>
      <CgCloseO className={classes.closeIcon} onClick={handleClose} />
      <h1 className={classes.formHeader}>
        {initialData ? "Update Team" : "Create New Team"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* <div className={classes.imageGroup}>
          <label className={classes.label}>Team Logo</label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Team Logo"
              className={classes.logoPreview}
              width="100"
              height="100"
            />
          )}
          <input
            className={classes.input}
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </div> */}

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
          <label className={classes.label}>
            Description <span>*</span>
          </label>
          <input
            className={classes.input}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            // required
            autoComplete="off"
          />
        </div>

        <div>
          <label className={classes.label}>
            Contact Email <span>*</span>
          </label>
          <input
            className={classes.input}
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div>
          <label className={classes.label}>
            Contact Phone <span>*</span>
          </label>
          <input
            className={classes.input}
            type="text"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            // required
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

export default NewTeamForm;
