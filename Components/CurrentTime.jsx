import { useEffect, useState } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState({});
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate({
        date: now.getDate(),
        month: monthNames[now.getMonth()],
        year: now.getFullYear()
      });
    };

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(intervalId);
  }, []);
  
  
  return (
    <div className="currentDateTimeContainer">
      <div className="currentDateTime">
        <div className="dateTime">
          <div className="currentTimeContainer">
            <span className="currentTime">{currentTime} <br /> {`${currentDate.date}-${currentDate.month}-${currentDate.year}`}</span>{" "}
          </div>
          <div className="englishDate"> </div>
          <div className="arabicDate"> </div>
        </div>
      </div>
    </div>
  );
}
