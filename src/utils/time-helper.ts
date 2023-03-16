export function convertTimeToSeconds(timeString: string): number {
  const timeArr: string[] = timeString.split(':');
  let seconds = 0
  if (timeArr[2]) {
    const secondsArr: string[] = timeArr[2].split(',');
    seconds = parseInt(secondsArr[0], 10) + parseFloat(`0.${secondsArr[1]}`);
  }
  const minutes: number = parseInt(timeArr[1], 10) * 60;
  const hours: number = parseInt(timeArr[0], 10) * 60 * 60;
  const totalSeconds: number = hours + minutes + seconds;

  return parseFloat(totalSeconds.toFixed(3));
}

export function formatTime(seconds: number): string {
  const date = new Date(seconds * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const secondsFormatted = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = (seconds % 1).toFixed(3).slice(2, 5);

  return `${hours}:${minutes}:${secondsFormatted},${milliseconds}`;
}