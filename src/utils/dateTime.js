/**
 * Format a date for display (e.g., "Jan 1, 2023")
 * @param {string|Date} dateTime - The date to format
 * @returns {string} The formatted date
 */
export function formatDate(dateTime) {
    if (!dateTime) return '';
    
    const date = new Date(dateTime);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

/**
 * Format a time for display (e.g., "1:30 PM")
 * @param {string|Date} dateTime - The date/time to format
 * @returns {string} The formatted time
 */
export function formatTime(dateTime) {
  if (!dateTime) return '';
  
  const date = new Date(dateTime);
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return date.toLocaleTimeString(undefined, options);
}

/**
 * Format a date and time for display (e.g., "Jan 1, 2023 at 1:30 PM")
 * @param {string|Date} dateTime - The date/time to format
 * @returns {string} The formatted date and time
 */
export function formatDateTime(dateTime) {
  if (!dateTime) return '';
  
  const date = new Date(dateTime);
  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  
  return `${date.toLocaleDateString(undefined, dateOptions)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
}

/**
 * Parse a datetime string into a Date object
 * @param {string} dateTimeStr - The date/time string to parse
 * @returns {Date} The parsed Date object
 */
export function parseDateTime(dateTimeStr) {
  return new Date(dateTimeStr);
}

/**
 * Format an hour for display (e.g., "1 PM")
 * @param {number} hour - The hour to format (0-23)
 * @returns {string} The formatted hour
 */
export function formatHour(hour) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour} ${period}`;
}

/**
 * Format a date range for display (e.g., "Jan 1 - 7, 2023")
 * @param {Date} startDate - The start date
 * @param {number} days - The number of days in the range
 * @returns {string} The formatted date range
 */
export function formatDateRange(startDate, days) {
  const start = new Date(startDate);
  const end = addDays(start, days);
  
  const startMonth = start.toLocaleDateString(undefined, { month: 'short' });
  const endMonth = end.toLocaleDateString(undefined, { month: 'short' });
  
  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
  } else {
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${start.getFullYear()}`;
  }
}

/**
 * Get the start of the week for a given date
 * @param {Date} date - The date to get the start of the week for
 * @returns {Date} The start of the week
 */
export function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
}

/**
 * Add days to a date
 * @param {Date} date - The date to add days to
 * @param {number} days - The number of days to add
 * @returns {Date} The new date
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Check if a date is today
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is today
 */
export function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}