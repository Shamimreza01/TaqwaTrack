import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
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

export default function AlQuranLoad() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { edition } = useParams();
  const quranMeta = {
    'bn.bengali': { textType: 'textBangla', name: "আল-কোরআন বাংলা " },
    'en.yusufali': { textType: 'textEnglish', name: "Al-Quran English Translation" },
    'quran-uthmani': { textType: 'textArabic', name: "Al-Quran Arabic Non-Arab" },
  };
  console.log(edition);
  const meta = quranMeta[edition];
  const textType = meta?.textType;
  const name = meta?.name;

  const loadQuran = async () => {
     try {
       const db = await openIndexedDB();
       const storedData = await db.get("quranData", 1);
       if (storedData) {
         setSurahs(storedData.data);
         setIsLoading(false);
         console.log(storedData.data);
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
            {selectedSurah.number} {selectedSurah.englishName}{" "}
            {selectedSurah.name}
          </div>
          <button className="backbutton" onClick={() => setSelectedSurah(null)}>
            <i className="fa-solid fa-circle-left"></i> Go To Surah List
          </button>
          <ul className="ayahContainer">
            {selectedSurah.ayahs.map((ayah) => (
              <li key={ayah.number} className="ayahList" style={{ fontSize: textType === 'textArabic' ? '30px' : '12px' }}>
                {ayah.numberInSurah}. {ayah[textType]}
                {ayah.sajda && <span>Sajda</span>}
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
