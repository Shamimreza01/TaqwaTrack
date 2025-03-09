import React from "react";
import AlQuranCard from "./AlQuran";
import AlQuran1 from "../Assets/AlQuran.jpg";
import AlQuran2 from '../Assets/AlQuran2.jpg'
import AlQuran3 from '../Assets/AlQuran3.jpg'

export default function ItemCardContainer() {
  return (
    <>
      <div className="AlquranCollectionHeader"> All Quran Collection </div>
      <div className="itemCardContainer">
        <AlQuranCard
          edition={"bangla"}
          name={"Al-Quran Bangla Translation"}
          AlQuranImage={AlQuran1}
        />
        <AlQuranCard
          edition={"english"}
          name={"Al-Quran English Translation"}
          AlQuranImage={AlQuran2}
        />
        <AlQuranCard
          edition={"arabic"}
          name={"Al-Quran Arabic Non-Arab"}
          AlQuranImage={AlQuran3}
        />
      </div>
    </>
  );
}
