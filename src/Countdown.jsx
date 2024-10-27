import React, { useState, useEffect } from "react";

const Countdown = ({
  targetDate,
  title,
  excludeWeekends = false,
  dailyCountdown = false,
}) => {
  const holidays = ["12-06", "01-06", "01-01"];

  const isExcludedDate = (date) => {
    const monthDay = date.toISOString().slice(5, 10);
    const day = date.getDay();

    if (day === 0 || day === 6) return true;
    if (holidays.includes(monthDay)) return true;

    const yearStart = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor(
      (date - yearStart) / (1000 * 60 * 60 * 24) + 1
    );
    const weekNumber = Math.ceil(dayOfYear / 7);

    return weekNumber === 52;
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = +new Date(targetDate) - +now;
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const calculateWeekdayTimeLeft = () => {
    let currentDate = new Date();
    let daysLeft = 0;

    while (currentDate < targetDate) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (!isExcludedDate(currentDate)) daysLeft++;
    }

    return {
      days: Math.floor(daysLeft),
      hours: (daysLeft * 24) % 24,
      minutes: (daysLeft * 24 * 60) % 60,
      seconds: (daysLeft * 24 * 60 * 60) % 60,
    };
  };

  const calculateDailyCountdown = () => {
    const now = new Date();
    const startTime = new Date(now);
    startTime.setHours(8, 0, 0, 0);
    const endTime = new Date(now);
    endTime.setHours(15, 0, 0, 0);

    if (isExcludedDate(now) || now < startTime || now >= endTime) return null;

    const difference = endTime - now;
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const getTimeLeft = () => {
    if (dailyCountdown) return calculateDailyCountdown();
    if (excludeWeekends) return calculateWeekdayTimeLeft();
    return calculateTimeLeft();
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate, excludeWeekends, dailyCountdown]);

  return (
    <div className={`countdown ${!timeLeft ? "inactive" : ""}`}>
      <h2>{title}</h2>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && timeLeft ? (
        <h1>
          {timeLeft.days ? `${timeLeft.days}d ` : ""}
          {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </h1>
      ) : isVisible ? (
        <h1>
          Klockan är inte mellan 8 och 15! Kom ihåg o skriva upp övertid om du
          gör sånt!
        </h1>
      ) : null}
    </div>
  );
};

export default Countdown;
