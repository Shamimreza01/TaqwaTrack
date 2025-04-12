import React from "react";
import AlQuranCard from "./AlQuran";
import AlQuran1 from "../Assets/AlQuran1.jpg";
import AlQuran2 from "../Assets/AlQuran2.jpg";
import AlQuran3 from "../Assets/AlQuran3.jpg";

export default function ItemCardContainer() {
  return (
    <>
      <div className="AlquranCollectionHeader"> All Quran Collection </div>
      
      <div className="itemCardContainer">
      <AlQuranCard
        edition={"fullQuran"}
        name="আল-কোরআন আরবি বাংলা ও অডিও"
        AlQuranImage={AlQuran1}
      />
        <AlQuranCard
          edition={"bn.bengali"}
          name={"আল-কোরআন বাংলা "}
          AlQuranImage={AlQuran1}
        />
        <AlQuranCard
          edition={"en.yusufali"}
          name={"Al-Quran English Translation"}
          AlQuranImage={AlQuran2}
        />
        <AlQuranCard
          edition={"quran-uthmani"}
          name={"Al-Quran Arabic Non-Arab"}
          AlQuranImage={AlQuran3}
        />
      </div>
    </>
  );
}
