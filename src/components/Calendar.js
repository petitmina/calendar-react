import React, { useState } from "react";
import "./Calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState([]);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    const event = events.find((event) => event.date === formatDate);
    setEventText(event ? event.text : "");
  };


  const handleEventSave = () => {
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      const updatedEvents = [...events];
      const existingEventIndex = events.findIndex((event) => event.date === formattedDate);
      
      if (existingEventIndex !== -1) {
        updatedEvents[existingEventIndex] = { date: formattedDate, text: eventText };
      } else {
        updatedEvents.push({ date: formattedDate, text: eventText });
      }

      setEvents(updatedEvents);
      setSelectedDate(null);
    }
  };

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const daysInMonth = [];
  for (
    let date = firstDayOfMonth;
    date <= lastDayOfMonth;
    date.setDate(date.getDate() + 1)
  ) {
    daysInMonth.push(new Date(date));
  }

  const renderDays = () => {
    return daysInMonth.map((day, index) => (
      <div
        key={index}
        className="calendar-day"
        onClick={() => handleDayClick(day)}
      >
        {day.getDate()}
      </div>
    ));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>이전 달</button>
        <h2>
          {currentMonth} {currentYear}
        </h2>
        <button onClick={handleNextMonth}>다음 달</button>
      </div>
      <div className="calendar-grid">{renderDays()}</div>
      {selectedDate && (
        <div className="event-container">
          <h3>
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{" "}
            {selectedDate.getDate()}일 이벤트:
          </h3>
          {/* <p>{events[selectedDate.toISOString().split("T")[0]]}</p> */}

          <textarea
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            placeholder="내용을 입력하세요"
          />

          <button onClick={handleEventSave}>저장</button>
        </div>
      )}
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.date}: {event.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
