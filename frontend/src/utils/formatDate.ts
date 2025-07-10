export const formatDate = (date: Date | null) => {
  if (!date) return "No due date";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};