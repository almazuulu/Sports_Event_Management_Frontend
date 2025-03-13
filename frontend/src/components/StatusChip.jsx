const STATUS_STYLES = {
  active: {
    background: "linear-gradient(to right, #4CAF50, #66BB6A)",
    border: "1px solid #388E3C",
  },
  ongoing: {
    background: "linear-gradient(to right, #4CAF50, #66BB6A)",
    border: "1px solid #388E3C",
  },
  registration: {
    background: "linear-gradient(to right, #FF9800, #FFB74D)",
    border: "1px solid #E65100",
  },
  completed: {
    background: "linear-gradient(to right, #2196F3, #64B5F6)",
    border: "1px solid #1976D2",
  },
  cancelled: {
    background: "linear-gradient(to right, #E53935, #EF5350)",
    border: "1px solid #B71C1C",
  },
  draft: {
    background: "linear-gradient(to right, #9E9E9E, #BDBDBD)",
    border: "1px solid #616161",
  },
  approved: {
    background: "linear-gradient(to right, #4CAF50, #66BB6A)",
    border: "1px solid #388E3C",
  },
  rejected: {
    background: "linear-gradient(to right, #E53935, #EF5350)",
    border: "1px solid #B71C1C",
  },
  default: {
    background: "linear-gradient(to right, #9E9E9E, #BDBDBD)",
    border: "1px solid #616161",
  },
};

const StatusChip = ({ status }) => {
  // Get the appropriate style or fallback to default
  const normalizedStatus =
    typeof status === "string" ? status.toLowerCase() : "default";
  const style = STATUS_STYLES[normalizedStatus] || STATUS_STYLES.default;

  const displayText =
    normalizedStatus !== "default"
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : "Unknown";

  return (
    <span
      style={{
        ...style,
        padding: "6px 14px",
        borderRadius: "20px",
        fontWeight: "600",
        fontSize: "0.9rem",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "120px", // Ensures uniform width
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      {displayText}
    </span>
  );
};

export default StatusChip;
