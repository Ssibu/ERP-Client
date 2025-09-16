// /**
//  * Calculates the total number of calendar days between two dates, inclusive.
//  * This function is designed to be timezone-safe by normalizing all dates to UTC midnight.
//  *
//  * @param {Date | undefined | null} startDate - The start date of the range.
//  * @param {Date | undefined | null} endDate - The end date of the range.
//  * @returns {number} The total number of calendar days.
//  */
// export const calculateCalendarDays = (startDate, endDate) => {
//     // 1. Guard against null or undefined inputs.
//     if (!startDate || !endDate) {
//         return 0;
//     }

//     // 2. Create new Date objects to avoid mutating the original state from the component.
//     const start = new Date(startDate);
//     const end = new Date(endDate);
    
//     // 3. Normalize both dates to UTC midnight. This is the most critical step to
//     //    prevent off-by-one errors caused by browser timezones or daylight saving time.
//     start.setUTCHours(0, 0, 0, 0);
//     end.setUTCHours(0, 0, 0, 0);

//     // 4. Guard against invalid date ranges.
//     if (start > end) {
//         return 0;
//     }

//     // 5. Calculate the difference in milliseconds, convert to days, and add 1 to make the range inclusive.
//     //    (e.g., selecting Aug 15th to Aug 15th should be 1 day, not 0).
//     const diffTime = end.getTime() - start.getTime();
//     const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

//     return diffDays;
// };

export 
const calculateCalendarDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(0, 0, 0, 0);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) return 0;
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
};