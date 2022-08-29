import {MyTime} from './database';

export const getNiceTime = (date: Date) => {
  return date
    .toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })
    .slice(0, -3); //remove seconds to be able to compare strings
};

export const timeStringToHoursAndMinutes = (timeString: string): MyTime => {
  const [hours, minutes] = timeString.split(':');
  return {hours: parseInt(hours), minutes: parseInt(minutes)};
};
