import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import AlQuranLoadShimmer from "./AlQuranLoadShimmer";

async function openIndexedDB() {
  return openDB("quranDB", 1, {
    upgrade(db) {
      const store = db.createObjectStore("quranData", { keyPath: "id" });
      store.createIndex("by_id", "id");
    },
  });
}

export default function FullQuranLoad({ name = "Al-Quran" }) {
  const [surahs, setSurahs] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadQuran = async () => {
    try {
      const db = await openIndexedDB();
      const storedData = await db.get("quranData", 1);
      if (storedData) {
        setSurahs(storedData.data);
        setIsLoading(false);
        console.log("i am from indexDB");
      } else {
        const responses = await fetch(
          "https://api-taqwatrack.onrender.com/QuranArBnEnAudio"
        )
          .then((res) => res.json())
          .catch((err) => null);

        await db.put("quranData", { id: 1, data: responses });

        setSurahs(responses);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching Quran data:", error);
    }
  };

  useEffect(() => {
    loadQuran();
  }, [name]);

  return isLoading ? (
    <AlQuranLoadShimmer name={name} />
  ) : (
    <div className="banglaQuranContainer">
      {selectedSurah ? (
        <>
          <div className="surahInfo">
            {selectedSurah.number}. {selectedSurah.englishName} (
            {selectedSurah.name})
          </div>
          <button className="backbutton" onClick={() => setSelectedSurah(null)}>
            <i className="fa-solid fa-circle-left"></i> Go To Surah List
          </button>
          <ul className="ayahContainer">
            {selectedSurah.ayahs.map((ayah) => (
              <li key={ayah.number} className="ayahList">
                <div className="ayahArabic">
                  {ayah.textArabic}
                  {ayah.sajda && <span>Sajda</span>}
                  <span className="ayahNumberInSurah">
                    ({ayah.numberInSurah})
                  </span>
                </div>
                <div className="ayahBengali">{ayah.textBangla}</div>
                <div>
                  {ayah.audioLink && (
                    <audio controls>
                      <source src={ayah.audioLink} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
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
