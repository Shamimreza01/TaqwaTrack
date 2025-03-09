import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./Components/App";
import Home from "./Components/Home";
import ItemCardContainer from "./Components/ItemCardContainer";
import AlQuranLoad from "./Components/AlQuranLoad";
import UnderConstruction from "./Components/UnderConstruction";

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
            element:<AlQuranLoad edition="bn.bengali" name="Bangla Translation" />
          },{
            path:'/quran/english',
            element:<AlQuranLoad edition="en.yusufali" name="English Translation" />
          },
          {
            path:'/quran/arabic',
            element:<AlQuranLoad edition="quran-uthmani" name="Arabic Non-Arab" />
          }
        ]
      }
    ]
  );
  const rootElement=document.querySelector("#root");
  
  const root=createRoot(rootElement);
  root.render(<RouterProvider router={router} />);