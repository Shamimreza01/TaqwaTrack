import React from 'react'

export default function SalahTimeShimmer() {
  return (
    <div className="mainContentContainer">
    <div className="mainContent">
      <div className="img"></div>

      <div className="mainInfo">
        <div className="sunriseDisplay">
          Sunrise : <span className="sunrise">Loading...</span>
        </div>
        <div className="sunsetDisplay">
          Sunset : <span className="sunset">Loading...</span>
        </div>
        <div className="firstLightDisplay">
          Suhoor : <span className="firstLight">Loading... </span>
        </div>
        <div className="dhuhrDisplay">
          Dhuhr : <span className="dhuhr">Loading...</span>
        </div>
        <div className="ishaDisplay">
          Isha : <span className="isha">Loading...</span>
        </div>
        <div className="dayLengthDisplay">
          Day length : <span className="dayLength">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  )
}
