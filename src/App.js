import React from "react";
import Countdown from "./Countdown";

function App() {
  const event1Date = new Date("2025-02-14T16:00:00"); // Feb 14, 2025, 16:00
  const event2Date = new Date("2025-05-01T00:00:00"); // May 1, 2025, 00:00

  return (
    <div className="App">
      <h1>Mammas Nedräknare</h1>
      {/* Countdown to specific dates */}
      <Countdown
        targetDate={event1Date}
        title="Nedräkning till 14.2.2025 kl. 16:00"
      />
      <Countdown targetDate={event2Date} title="Nedräkning till 1.5.2025" />

      {/* Countdown excluding weekends, holidays, and week 52 */}
      <Countdown
        targetDate={event1Date}
        title="Arbetsdagar kvar"
        excludeWeekends={true}
      />

      {/* Daily countdown from 8:00 AM to 3:00 PM on non-excluded days */}
      <Countdown title="Kvar av denna arbetsdag (8-15)" dailyCountdown={true} />
    </div>
  );
}

export default App;
