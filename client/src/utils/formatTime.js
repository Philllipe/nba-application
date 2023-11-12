export default function formatTime(timestamp) {
  if (timestamp === "Final") {
    return timestamp;
  }

  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  let formattedHours = hours % 12;
  if (formattedHours === 0) {
    formattedHours = 12;
  }

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
