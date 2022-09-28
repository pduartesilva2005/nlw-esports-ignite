export function convertHourStringToMinutes(hourString: string) {
  const [hour, minutes] = hourString.split(':').map(Number);

  const minutesAccount = hour * 60 + minutes;

  return minutes;
}