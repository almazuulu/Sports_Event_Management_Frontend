export function formatToShortDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // "Feb"
    day: "numeric", // "1"
  });
}

export function formatToShortDateTime(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return "Invalid Date";

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short", // "Feb"
    day: "numeric", // "1"
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  });
}
