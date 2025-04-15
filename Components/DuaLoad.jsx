import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import AlQuranLoadShimmer from "./AlQuranLoadShimmer";
import { fs } from "fs";

export default function DuaLoad() {
  const [duas, setDuas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { dataName } = useParams();
  const duaMeta = {
    FortyRabbanaDua: { id: 1, name: "৪০ রাব্বানা দোয়া" },
    FortyMotivationalAyah: { id: 2, name: "৪০টি মোটিভেশনাল আয়াত" },
    AfterSalahDua: { id: 3, name: "সালাত পরবর্তী দোয়া" },
  };
  console.log(dataName);
  const meta = duaMeta[dataName];
  const id = meta?.id;
  const name = meta?.name;

  // Read

  const openIndexedDB = () => {
    const openRequest = indexedDB.open("DuaDB", 1);

    openRequest.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("duas")) {
        const store = db.createObjectStore("duas", { keyPath: "id" });
        store.createIndex("id", "id", { unique: true });
      }
    };

    openRequest.onsuccess = async (e) => {
      const db = e.target.result;
    
      // Open a read transaction to get local data
      const readTransaction = db.transaction(["duas"], "readonly");
      const store = readTransaction.objectStore("duas");
      const duaRequest = store.get(id);
    
      duaRequest.onsuccess = async (e) => {
        const localData = e.target.result?.data;
    
        // If offline, just use local data
        if (!navigator.onLine) {
          console.log("Offline — using local data");
          setDuas(localData);
          setIsLoading(false);
          return;
        }
    
        try {
          const response = await fetch(`https://api-taqwatrack.onrender.com/${dataName}`);
          const apiData = await response.json();
    
          const isSame = JSON.stringify(localData) === JSON.stringify(apiData);
    
          if (!isSame) {
            // Now open a NEW transaction to write
            const writeTransaction = db.transaction(["duas"], "readwrite");
            const writeStore = writeTransaction.objectStore("duas");
            writeStore.put({ id: id, data: apiData });
    
            console.log("Updated data in IndexedDB");
            setDuas(apiData);
          } else {
            console.log("No changes — using local data");
            setDuas(localData);
          }
        } catch (err) {
          console.error("API fetch error:", err);
          setDuas(localData); // Fallback to local
        }
    
        setIsLoading(false);
      };
    };
    

    openRequest.onerror = (e) => {
      console.error("Error opening IndexedDB", e);
    };
  };

  useEffect(() => {
    if (dataName) {
      openIndexedDB();
    } else {
      console.error("dataName is required");
    }
  }, [dataName]);

  return isLoading ? (
    <AlQuranLoadShimmer name={name} />
  ) : (
    <div className="banglaQuranContainer">
      <div className="surahInfo">{name}</div>
      <button className="backbutton" onClick={() => history.back()}>
        <i className="fa-solid fa-circle-left"></i> Go To DuaList
      </button>
      <ul className="ayahContainer">
        {duas && Array.isArray(duas) ? (
          duas.map((dua) => (
            <li
              key={crypto.randomUUID()}
              style={{ marginBottom: "10px" }}
              className="ayahList"
            >
              <div className="ayahArabic">{dua.arabic}</div>
              <div className="ayahBengali">
                {dua.dua_number || dua.ayah_number}
                {".  "}
                {dua.bangla_pronunciation}
              </div>
              <div style={{ fontSize: "12px" }}>{dua.bangla_translation}</div>
              <div style={{ fontSize: "8px", textAlign: "right" }}>
                {dua.audio_link && navigator.onLine && (
                  <audio controls>
                    <source src={dua.audio_link} type="audio/mpeg" />
                  </audio>
                )}{" "}
                {dua.reference}
              </div>
            </li>
          ))
        ) : (
          <div>No duas found.</div>
        )}
      </ul>
    </div>
  );
}
