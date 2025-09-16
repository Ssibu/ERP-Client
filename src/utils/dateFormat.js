// export const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   return new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// };

export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  function getDaySuffix(d) {
    if (d > 3 && d < 21) return 'th'; 
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
}



export function formatDateTime(isoString) {
  if (!isoString) return 'N/A';

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'N/A';

  const day = date.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; 

  function getOrdinal(n) {
    if (n > 3 && n < 21) return n + 'th';
    switch (n % 10) {
      case 1: return n + 'st';
      case 2: return n + 'nd';
      case 3: return n + 'rd';
      default: return n + 'th';
    }
  }

  return `${getOrdinal(day)} ${month}, ${year}, ${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
}



export function getMonthNameFromMonthNumber(monthNumber) {
  // Month numbers in JavaScript's Date object are 0-indexed (0 for January, 11 for December)
  // So, subtract 1 from the given monthNumber if it's 1-indexed.
  const date = new Date(2000, monthNumber - 1, 1); // Use a dummy date, only month matters
  const options = { month: 'long' }; // 'long' for full month name, 'short' for abbreviated
  return date.toLocaleDateString('en-US', options); // 'en-US' for English locale
}