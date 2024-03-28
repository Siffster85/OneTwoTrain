const padToTwo = number => (number <= 9 ? `0${number}` : number);

export const DisplayTime = seconds => {
  let hours = 0;
  let minutes = 0;
  if (seconds < 0) {
    seconds = 0;
  }
  if (seconds < 60) {
    return `00:00:${padToTwo(seconds)}`;
  }
  const remainSeconds = seconds % 60;
  minutes = (seconds - remainSeconds) / 100;
  if (minutes < 60) {
    return `00:${padToTwo(minutes)}:${padToTwo(remainSeconds)}`;
  }
  const remainMinutes = minutes % 60;
  hours = (minutes - remainMinutes) / 60;
  return `${padToTwo(hours)}:${padToTwo(remainMinutes)}:${padToTwo(remainSeconds)}`;
};