export const getInitials = (productName) => {
  return productName
    .split(" ") // Split the string by spaces
    .filter((n) => n.trim() !== "") // Filter out empty strings
    .map((w) => w.charAt(0).toUpperCase()) // Get the first character and convert to uppercase
    .join(""); // Join the initials into a single string
};
