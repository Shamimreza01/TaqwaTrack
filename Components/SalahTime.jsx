export default function SalahTime({ time ,nextPrayerTime ,prayerName}) {
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
