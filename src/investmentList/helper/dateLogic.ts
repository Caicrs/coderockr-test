export default function millisecondsConverter(t: number) {
  let year, month, day, hour, minute, second;

  second = Math.floor(t / 1000);
  minute = Math.floor(second / 60);
  second = second % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24) + 1;
  hour = hour % 24;
  month = Math.floor(day / 30);
  day = day % 30;
  year = Math.floor(month / 12);
  month = month % 12;
  if (year > 0) {
    month = year * 12 + month;
  }

  return { year, month, day };
}
