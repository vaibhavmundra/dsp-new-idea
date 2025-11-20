export function formattedDate(date) {
  const f = new Intl.DateTimeFormat("en-in", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const f_date = f.format(new Date(date));
  return f_date;
}

export function formattedDateLong(date) {
  const options = {
    weekday: "long", // e.g., "Wednesday"
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const f = new Intl.DateTimeFormat("en-in", options);
  return f.format(new Date(date));
}

export function convertTo12Hour(time24) {
  if (typeof time24 !== 'string') throw new Error('time24 must be a string');

  // Normalize & validate
  const match = time24.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) throw new Error('Invalid time format, expected HH:MM');

  let [ , hhStr, mm ] = match;
  let hour24 = parseInt(hhStr, 10);
  if (hour24 < 0 || hour24 > 23) throw new Error('Hour out of range (0-23)');
  if (parseInt(mm,10) > 59) throw new Error('Minute out of range (0-59)');

  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;

  const resultWithSuffix = `${hour12}:${mm}${suffix}`;
  return resultWithSuffix;
}