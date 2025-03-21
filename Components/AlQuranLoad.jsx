import React, { useState, useEffect } from "react";
import AlQuranLoadShimmer from "./AlQuranLoadShimmer";

export default function AlQuranLoad({
  edition = "quran-uthmani",
  name = "Only Arabic",
}) {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    async function loadQuran() {
      try {
        let response = await fetch(
          `https://api.alquran.cloud/v1/quran/${edition}`
        );
        let data = await response.json();
        setSurahs(data.data.surahs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Quran data:", error);
      }
    }
    loadQuran();
  }, []);

  return isLoading ? (
    <AlQuranLoadShimmer name={name} />
  ) : (
    <div className="banglaQuranContainer">
      {selectedSurah ? (
        <>
          <div className="surahInfo">
            {selectedSurah.number} {selectedSurah.englishName}{" "}
            {selectedSurah.name}
          </div>
          <button className="backbutton" onClick={() => setSelectedSurah(null)}>
            <i className="fa-solid fa-circle-left"></i> Go To Surah List
          </button>
          <ul className="ayahContainer">
            {selectedSurah.ayahs.map((ayah) => (
              <li key={ayah.number} className="ayahList">
                {ayah.numberInSurah}. {ayah.text}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className="quranMainHeader">{`📖 Al-Quran : ${name}`}</h2>
          <ul>
            {surahs.map((surah) => (
              <li
                className="surahList"
                key={surah.number}
                onClick={() => setSelectedSurah(surah)}
              >
                {surah.number}. {surah.englishName} - {surah.name}
              </li>
            ))}
          </ul>
          
        </>
      )}
    </div>
  );
}
