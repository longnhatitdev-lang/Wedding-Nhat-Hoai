"use client";

import { useEffect, useState } from "react";
import { getWeddingCalendar, weekdayLabels } from "./wedding-calendar";
import { sides } from "./wedding-data";

export function WeddingCalendar({ date }: { date: string }) {
  const [currentDate, setCurrentDate] = useState(date);
  useEffect(() => {
    function update(event: Event) {
      const nextDate = (event as CustomEvent<string>).detail;
      if (getWeddingCalendar(nextDate)) setCurrentDate(nextDate);
    }
    window.addEventListener("wedding-date-change", update);
    return () => window.removeEventListener("wedding-date-change", update);
  }, []);

  const calendar = getWeddingCalendar(currentDate) ?? getWeddingCalendar(sides.trai.date)!;
  return <div className="calendar-card" data-month={String(calendar.month).padStart(2, "0")} data-year={calendar.year} data-wedding-day={String(calendar.day).padStart(2, "0")}>
    <div className="calendar-header">
      <span className="month">Tháng {calendar.month}</span>
      <span className="year">{calendar.year}</span>
    </div>
    <div className="calendar-grid">
      {weekdayLabels.map((label, index) => <span key={label} className={`day-name${index === calendar.weekdayIndex ? " wedding-day" : ""}`}>{label}</span>)}
      {Array.from({ length: calendar.offset }, (_, index) => <span key={`empty-${index}`} className="day-item empty" aria-hidden="true" />)}
      {Array.from({ length: calendar.days }, (_, index) => <span key={index + 1} className={`day-item${index + 1 === calendar.day ? " wedding-day" : ""}`}>{index + 1}</span>)}
    </div>
  </div>;
}
