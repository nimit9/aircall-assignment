/**
 * Format a Date object as a localized string with day, month, and year.
 * @param date - The Date object to be formatted.
 * @returns A string representation of the formatted date.
 */
export const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

/**
 * Format a Date object as a localized string with hour and minute.
 * @param date - The Date object to be formatted.
 * @returns A string representation of the formatted time.
 */
export const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Assuming the input string is in UTC
    });
};

/**
 * Convert a call duration in seconds to a formatted string (hours, minutes, seconds).
 * @param duration - The duration of the call in seconds.
 * @returns A string representation of the formatted call duration.
 */
