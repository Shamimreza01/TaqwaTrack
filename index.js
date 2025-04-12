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

//service worker reg
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register(new URL('./serviceWorker.js', import.meta.url))
          .then((reg) => {
              console.log('Service Worker registered successfully:', reg);
          })
          .catch((err) => {
              console.error('Service Worker registration failed:', err);
          });
  });
}


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
            path:'/quran/:edition',
            element:<AlQuranLoad />
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
            path:'/:dataName',
            element: <DuaLoad/>
          }
        ]
      }
    ]
  );
  const rootElement=document.querySelector("#root");
  
  const root=createRoot(rootElement);
  root.render(<RouterProvider router={router} />);