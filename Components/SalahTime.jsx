import { useEffect } from "react";

export default function SalahTime({ time ,nextPrayerTime ,prayerName}) {
  useEffect(() => {
    if (nextPrayerTime === "0h 12m 40s") {
      const adhan = new Audio('/Azan.mp3');
      adhan.play().catch(error => console.log("Playback prevented:", error));
    
    }
  }, [nextPrayerTime]);
  return (
    <div className="mainContentContainer">
    <div className="mainContent">
      <div className="img">
      </div>

      <div className="mainInfo">
        <div className="sunriseDisplay">
          Fajr : <span className="sunrise">{time.fajr}</span>
        </div>
        <div className="sunsetDisplay">
          Sunrise : <span className="sunset">{time.sunrise}</span>
        </div>
        <div className="firstLightDisplay">
          Dhuhr : <span className="firstLight">{time.dhuhr} </span>
        </div>
        <div className="dhuhrDisplay">
          Asr : <span className="dhuhr">{time.asr}</span>
        </div>
        <div className="ishaDisplay">
          Magrib : <span className="isha">{time.maghrib}</span>
        </div>
        <div className="dayLengthDisplay">
          Isha : <span className="dayLength">{time.isha}</span>
        </div>
        <div className="dayLengthDisplay">
          Next: <span className="dayLength">{prayerName} {nextPrayerTime}</span>
        </div>
      </div>
    </div>
  </div>
  );
}
