import { useState } from "react";
import React from "react";

export default function AlQuranLoadShimmer({name}) {
   const [selectedSurah, setSelectedSurah] = useState(null);
  return (
    <div className="banglaQuranContainer" >
      {selectedSurah ? (
        <>
          <div className="surahInfo shimmer"></div>
          <button className="backbutton ">
            <i className="fa-solid fa-circle-left"></i> Go To SurahList
          </button>
          <ul className="ayahContainer">
            {Array.from(Array(30).keys()).map((ele, index) => (
              <li key={index} className="ayahList shimmer"></li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className="quranMainHeader ">{`📖 Al-Quran : ${name}`}</h2>
          <ul>
            {Array.from(Array(30).keys()).map((ele, index) => (
              <li
                className="surahList shimmer"
                key={index}
              >
             
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
