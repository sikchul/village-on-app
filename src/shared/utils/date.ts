export const formatDateToKorean = (dateString: string): string => {
  const date = new Date(dateString);
  const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = koreanDate.getUTCFullYear();
  const month = koreanDate.getUTCMonth() + 1;
  const day = koreanDate.getUTCDate();
  const hours = koreanDate.getUTCHours();
  const minutes = koreanDate.getUTCMinutes();
  const seconds = koreanDate.getUTCSeconds();

  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

  const formattedHours = displayHours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
