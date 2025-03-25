import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./Components/App";
import Home from "./Components/Home";
import ItemCardContainer from "./Components/ItemCardContainer";
import AlQuranLoad from "./Components/AlQuranLoad";
import UnderConstruction from "./Components/UnderConstruction";
import FullQuranLoad from "./Components/FullQuranLoad";
import DuaCardContainer from "./Components/DuaCardContainer";
import DuaLoad from "./Components/DuaLoad";



const router=createBrowserRouter(
    [
      {
        path:"/",
        element:<App />,
        errorElement:<UnderConstruction/>,
        children:[
          {
            path:'/',
            element:<Home/>
            
          },
          {
            path:'/Quran',
            element:<ItemCardContainer/>
          },
          {
            path:'/quran/bangla',
            element:<AlQuranLoad edition="bn.bengali" name="আল-কোরআন বাংলা" />
          },{
            path:'/quran/english',
            element:<AlQuranLoad edition="en.yusufali" name="English Translation" />
          },
          {
            path:'/quran/arabic',
            element:<AlQuranLoad edition="quran-uthmani" name="Arabic Non-Arab" />
          },
          {
            path:'/quran/fullQuran',
            element:<FullQuranLoad edition="quran-uthmani" name="আল-কোরআন আরবি বাংলা ও অডিও" />
          },
          {
            path:'/learn-dua',
            element:<DuaCardContainer/>
          },
          {
            path:'/learn-dua/FortyRabbanaDua',
            element: <DuaLoad name="৪০ রাব্বানা দোয়া" dataName='FortyRabbanaDua' id={1}/>
          },
          {
            path:'/learn-dua/FortyMotivationalAyah',
            element:<DuaLoad name="40 motivational Ayah" dataName={'FortyMotivationalAyah'} id={2} />
          },
          {
            path:'/learn-dua/AfterSalahDua',
            element:<DuaLoad name="সালাত পরবর্তী দোয়া" dataName={'AfterSalahDua'} id={3} />
          }

        ]
      }
    ]
  );
  const rootElement=document.querySelector("#root");
  
  const root=createRoot(rootElement);
  root.render(<RouterProvider router={router} />);