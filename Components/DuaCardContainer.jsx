import React from "react";
import DuaCard from "./DuaCard";
import rabbnaDua from "../Assets/rabbanaDua.png";
import motivationalDua from '../Assets/motivationalDua.jpg'
import afterSalahDua from '../Assets/afterSalahDua.png'


export default function DuaCardContainer() {
  return (
    <>
      <div className="DuaCollectionHeader">Dua Collection </div>
      
      <div className="DuaCardContainer">
      <DuaCard
        edition={'FortyRabbanaDua'}
        name="৪০ রাব্বানা দোয়া"
        DuaCardImage={rabbnaDua}
      />
      <DuaCard
        edition={'AfterSalahDua'}
        name="সালাত পরবর্তী দোয়া"
        DuaCardImage={afterSalahDua}
      />
      <DuaCard
        edition={'FortyMotivationalAyah'}
        name="40 Motivational ayah with Bangla"
        DuaCardImage={motivationalDua}
      />
        
      </div>
    </>
  );
}
