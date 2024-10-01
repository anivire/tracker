const formatTrackerTime = (
  totalSeconds: number,
  isFormatted: boolean = false
) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const padTime = (time: number) => time.toString().padStart(2, '0');
  if (isFormatted && totalSeconds < 60) {
    return `${totalSeconds} sec`;
  }
  if (hours > 0) {
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  }
  return `${padTime(minutes)}:${padTime(seconds)}`;
};

export default formatTrackerTime;
