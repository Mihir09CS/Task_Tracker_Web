import { format, formatDistanceToNow, isBefore, isToday, startOfDay } from "date-fns";

export function formatDate(dateString) {
  if (!dateString) return "";
  try {
    return format(new Date(dateString), "MMM dd, yyyy");
  } catch (error) {
    return "";
  }
}

export function formatRelative(dateString) {
  if (!dateString) return "";
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch (error) {
    return "";
  }
}

export function isOverdue(dateString) {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    const now = new Date();
    // Overdue if the date is strictly before now
    return isBefore(date, now) && !isToday(date);
  } catch (error) {
    return false;
  }
}

export function isDueToday(dateString) {
  if (!dateString) return false;
  try {
    return isToday(new Date(dateString));
  } catch (error) {
    return false;
  }
}
