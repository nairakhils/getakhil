export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}

export function getCurrentTimeInEasternTime(): Date {
  // Create a date object with the current UTC time
  const now = new Date();

  // Convert the UTC time to Eastern Time
  const offsetEastern = -4; // Eastern Daylight Time (UTC-4), adjust based on Daylight Saving Time
  now.setHours(now.getUTCHours() + offsetEastern);

  return now;
}

export function formatTimeForEasternTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // This will format the time in 12-hour format with AM/PM
    timeZone: "America/New_York",
  };

  let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  // Append the time zone abbreviation. You can automate this with libraries like `moment-timezone`.
  // For simplicity, here I'm just appending "ET", but do remember that Eastern Time switches between EST and EDT.
  formattedTime += " ET";

  return formattedTime;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}