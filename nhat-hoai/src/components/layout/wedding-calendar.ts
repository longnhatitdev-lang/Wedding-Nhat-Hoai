export const weekdayLabels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"] as const;
const weekdayNames = ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"] as const;

export function getWeddingCalendar(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return null;
  const [, yearPart, monthPart, dayPart] = match;
  const year = Number(yearPart), month = Number(monthPart), day = Number(dayPart);
  if (year < 100 || month < 1 || month > 12) return null;
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (day < 1 || day > days) return null;
  const offset = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return { year, month, day, days, offset, weekday, weekdayIndex: (weekday + 6) % 7 };
}

/** Update the calendar and date display after a side or admin date changes. */
export function renderWeddingDate(date: string, time: string) {
  const data = getWeddingCalendar(date);
  if (!data) return;
  const { year, month, day, weekday } = data;
  const pad = (value: number) => String(value).padStart(2, "0");
  window.dispatchEvent(new CustomEvent("wedding-date-change", { detail: date }));
  const countdown = document.querySelector<HTMLElement>(".countdown-card");
  if (countdown && /^([01]\d|2[0-3]):[0-5]\d$/.test(time)) countdown.dataset.weddingDate = `${date}T${time}`;
  const dayTime = document.querySelector(".thu-gio");
  if (dayTime?.children[0]) dayTime.children[0].textContent = weekdayNames[weekday];
  if (dayTime?.children[1] && /^([01]\d|2[0-3]):[0-5]\d$/.test(time)) dayTime.children[1].textContent = time.replace(":", " giờ ");
  const dateElement = document.querySelector(".ngay");
  if (dateElement?.children[0]) dateElement.children[0].textContent = pad(day);
  const monthYear = dateElement?.querySelectorAll(".thang span");
  if (monthYear?.[0]) monthYear[0].textContent = `Tháng ${month}`;
  if (monthYear?.[1]) monthYear[1].textContent = String(year);
}
