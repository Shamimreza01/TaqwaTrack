import { useEffect, useState } from "react";
import moment from 'moment-timezone';

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState({});
  const localTimeZone = moment.tz.guess(); 

  useEffect(() => {
    const updateDateTime = () => {
      const now = moment().tz(localTimeZone); 

      setCurrentTime(now.format("hh:mm:ss A")); 
      setCurrentDate({
        date: now.date(),
        month: now.format("MMMM"), 
        year: now.year(),
      });
    };

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(intervalId);
  }, [localTimeZone]);

  return (
    <div className="currentDateTimeContainer">
      <div className="currentDateTime">
        <div className="dateTime">
          <div className="currentTimeContainer">
            <span className="currentTime">{currentTime} <br /> {currentDate.date ? `${currentDate.date}-${currentDate.month}-${currentDate.year}` : `Loading.......`}</span>{" "}
          </div>
          <div className="englishDate"> </div>
          <div className="arabicDate"> </div>
        </div>
      </div>
    </div>
  );
}
