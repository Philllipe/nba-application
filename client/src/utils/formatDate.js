export default function formatDate(date) {
  const dateString = date;
  const dateObject = new Date(dateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return formattedDate;
}
