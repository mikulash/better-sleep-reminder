export const getNiceTime = (date: Date) => {
  return date
    .toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })
    .slice(0, -3); //remove seconds to be able to compare strings
};
