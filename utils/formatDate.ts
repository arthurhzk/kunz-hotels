import { formatDistance, subDays } from "date-fns";

export const formatDate = (date: Date): string => {
  const today = new Date();
  return formatDistance(subDays(today, 3), new Date());
};
