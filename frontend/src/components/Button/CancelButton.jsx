import styles from "./CancelButton.module.css";

function CancelButton({ children, ...props }) {
  return (
    <button type="button" className={styles.cancelButton} {...props}>
      {children || "Cancel"}
    </button>
  );
}

export default CancelButton;
