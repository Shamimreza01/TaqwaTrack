import React, { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import useCustomFunction from "../Hooks/useCustomFunction";
import { getAllTime, getLocationName } from "../utils/api.js";
import { Outlet } from "react-router";
import MenuProvider from "../Context/MenuContext";

export default function App() {
  return (
    <div>
      <MenuProvider>
        <Outlet />
        <BottomNav />
      </MenuProvider>
      {/* The list of Quran 
      1.English translation => edition='en.yusufali' 
      2.Bangla Translation => edition='bn.bengali'
      3.Arabic for non-arab => edition='quran-uthmani'
      4.Audio => edition='
      
      */}
      {/* <AlQuranLoad edition="bn.bengali" name="Bangla Translation" />
      <ItemCardContainer/> */}
    </div>
  );
}
