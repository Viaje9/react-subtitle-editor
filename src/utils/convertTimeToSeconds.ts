export function convertTimeToSeconds(timeString: string): number {
  const timeArr: string[] = timeString.split(':');
  const secondsArr: string[] = timeArr[2].split(',');
  const seconds: number = parseInt(secondsArr[0], 10) + parseFloat(`0.${secondsArr[1]}`);
  const minutes: number = parseInt(timeArr[1], 10) * 60;
  const hours: number = parseInt(timeArr[0], 10) * 60 * 60;
  const totalSeconds: number = hours + minutes + seconds;

  return totalSeconds;
}

