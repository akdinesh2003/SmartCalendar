import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
};

export const isToday = (date: Date): boolean => {
  return format(new Date(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
};
