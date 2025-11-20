export default function PriceCalculate(futureDateStr, price) {
  // Validate the futureDateStr format using a regular expression
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(futureDateStr)) {
    throw new Error("Invalid date format. Expected 'yyyy-mm-dd'.");
  }

  // Parse the date components
  const [year, month, day] = futureDateStr.split("-").map(Number);

  // JavaScript Date months are 0-indexed (0 = January, 11 = December)
  const firstMinute = new Date(year, month - 1, day, 0, 1, 0, 0);

  // Check if the parsed date is valid
  if (isNaN(firstMinute.getTime())) {
    throw new Error("Invalid date provided.");
  }

  const now = new Date();

  // Ensure the future date is indeed in the future
  if (firstMinute <= now) {
    throw new Error("The provided date is not in the future.");
  }

  // Calculate the difference in milliseconds
  const diffMs = firstMinute - now;

  // Convert milliseconds to hours
  const diffHours = diffMs / (1000 * 60 * 60);

  // Determine the price adjustment based on the time difference
  if (diffHours <= 48) {
    // Within 48 hours: Price remains the same
    return price;
  } else if (diffHours > 48 && diffHours <= 168) {
    // Between 48 and 168 hours: Reduce price by 10,000
    return price - 10000;
  } else {
    // Beyond 168 hours: Reduce price by 20,000
    return price - 20000;
  }
}

function formatDate(date) {
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  return `${day} ${month}`;
}

export function priceDates(futureDateStr) {
  // Validate the futureDateStr format using a regular expression
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(futureDateStr)) {
    throw new Error("Invalid date format. Expected 'yyyy-mm-dd'.");
  }

  // Parse the date components
  const [year, month, day] = futureDateStr.split("-").map(Number);

  // JavaScript Date months are 0-indexed (0 = January, 11 = December)
  const firstMinute = new Date(year, month - 1, day, 0, 1, 0, 0);

  // Check if the parsed date is valid
  if (isNaN(firstMinute.getTime())) {
    throw new Error("Invalid date provided.");
  }

  // Calculate time intervals in milliseconds
  const ms48Hours = 48 * 60 * 60 * 1000; // 48 hours
  const ms168Hours = 168 * 60 * 60 * 1000; // 168 hours
  const msOneDay = 24 * 60 * 60 * 1000; // 24 hours

  // Calculate the two specific dates
  const date48HoursBefore = new Date(
    firstMinute.getTime() - ms48Hours - msOneDay
  );
  const date168HoursBefore = new Date(
    firstMinute.getTime() - ms168Hours - msOneDay
  );

  // Format the dates into 'DD MMM'
  const formattedDate48 = formatDate(date48HoursBefore);
  const formattedDate168 = formatDate(date168HoursBefore);

  return [formattedDate168, formattedDate48];
}
