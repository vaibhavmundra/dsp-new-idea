export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const differenceInTime = now - date;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    return "Today";
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else {
    return `${differenceInDays} days ago`;
  }
}
