import React, { useEffect, useState } from "react";
import Header from "./Header";
import CurrentTime from "./CurrentTime";
import SalahTime from "./SalahTime";
import SandITime from "./SandITime";
import BottomNav from "./BottomNav";
import useCustomFunction from "../Hooks/useCustomFunction";
import { getAllTime, getLocationName } from "../utils/api.js";

export default function App() {
  const { getGeolocation } = useCustomFunction();
  const [locationName, setLocationName] = useState("");
  const [time, setTime] = useState({});
  const [coords, setCoords] = useState(null);

  const fetchLocationAndTime = async (latitude, longitude) => {
    const [timeData, name] = await Promise.all([
      getAllTime(latitude, longitude),
      getLocationName(latitude, longitude),
    ]);

    setTime(timeData);
    setLocationName(name);
    localStorage.setItem("locationName", JSON.stringify(name));
    localStorage.setItem("timeData", JSON.stringify(timeData));
  };

  useEffect(() => {
    const loadInitialData = async () => {
      if (
        localStorage.getItem("position") &&
        localStorage.getItem("locationName") &&
        localStorage.getItem("timeData")
      ) {
        const { latitude, longitude } = JSON.parse(
          localStorage.getItem("position")
        );
        setCoords({ latitude, longitude });

        let date = new Date();
        let d = date.getDate().toString().padStart(2, "0");
        let m = (date.getMonth() + 1).toString().padStart(2, "0");
        let y = date.getFullYear();
        let formattedDate = `${y}-${m}-${d}`;

        const storedTimeData = JSON.parse(localStorage.getItem("timeData"));
        // Compare the date stored in timeData to the current date
        if (formattedDate === storedTimeData?.date) {
          setTime(storedTimeData);
        } else {
          const newTime = await getAllTime(latitude, longitude); // `getAllTime` doesn't need `Promise.all`
          setTime(newTime);
          localStorage.setItem("timeData", JSON.stringify(newTime));
        }
        setLocationName(JSON.parse(localStorage.getItem("locationName")));
        console.log("Using data from localStorage");
      } else {
        const pos = await getGeolocation();
        setCoords(pos);
        fetchLocationAndTime(pos.latitude, pos.longitude);
        console.log("Fetching data from API");
      }
    };

    loadInitialData();
  }, []);

  return (
    <div>
      <Header
        location={locationName}
        getGeolocation={getGeolocation}
        fetchLocationAndTime={fetchLocationAndTime}
      />
      <CurrentTime />
      <SalahTime time={time} />
      <SandITime time={time} />
      <BottomNav />
    </div>
  );
}
