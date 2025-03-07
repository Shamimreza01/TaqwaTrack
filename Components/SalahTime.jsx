import SalahTimeShimmer from "./SalahTimeShimmer";

export default function SalahTime({ time }) {
  if (!time.sunrise) return <SalahTimeShimmer />;
  let totalSize = 0;

  for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
          let itemSize = (localStorage.getItem(key).length + key.length) * 2; // Each character is 2 bytes
          totalSize += itemSize;
      }
  }
  
  console.log(`Total localStorage size: ${(totalSize / 1024).toFixed(2)} KB`);

  
  return (
    <div className="mainContentContainer">
    <div className="mainContent">
      <div className="img">
      </div>

      <div className="mainInfo">
        <div className="sunriseDisplay">
          Sunrise : <span className="sunrise">{time.sunrise}</span>
        </div>
        <div className="sunsetDisplay">
          Sunset : <span className="sunset">{time.sunset}</span>
        </div>
        <div className="firstLightDisplay">
          Suhoor : <span className="firstLight">{time.first_light} </span>
        </div>
        <div className="dhuhrDisplay">
          Dhuhr : <span className="dhuhr">{time.solar_noon}</span>
        </div>
        <div className="ishaDisplay">
          Isha : <span className="isha">{time.last_light}</span>
        </div>
        <div className="dayLengthDisplay">
          Day length : <span className="dayLength">{time.day_length}</span>
        </div>
      </div>
    </div>
  </div>
  );
}
