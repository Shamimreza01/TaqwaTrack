import React, { useEffect, useState } from "react";
import Header from "./Header";
import CurrentTime from "./CurrentTime";
import SalahTime from "./SalahTime";
import SandITime from "./SandITime";
import BottomNav from "./BottomNav";
import useCustomFunction from "../Hooks/useCustomFunction";
import { getLocationName } from "../utils/api.js";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import moment from "moment-timezone";

export default function Home() {
  // State declarations
  const { getGeolocation } = useCustomFunction();
  const [locationName, setLocationName] = useState("");
  const [time, setTime] = useState({});
  const [coords, setCoords] = useState(null);
  const [nextPrayerTime, setNextPrayerTime] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null); // New state for prayer times
  const [localTimeZone, setLocalTimeZone] = useState(""); // New state for time zone
  const [prayerName,setPrayerName]=useState('');

  // Function to format prayer times
  const formatTime = (date, timeZone) => {
    return moment(date).tz(timeZone).format("hh:mm A");
  };

  // Function to calculate all prayer times based on coordinates
  const getAllTime = (latitude, longitude) => {
    const coordinates = new Coordinates(latitude, longitude);
    const date = new Date();
    const params = CalculationMethod.UmmAlQura();
    params.adjustments.maghrib = 2;
    const prayerTimes = new PrayerTimes(coordinates, date, params);
    const localTimeZone = moment.tz.guess();

    const results = {
      suhoor: formatTime(prayerTimes.fajr - 3, localTimeZone),
      fajr: formatTime(prayerTimes.fajr, localTimeZone),
      sunrise: formatTime(prayerTimes.sunrise, localTimeZone),
      dhuhr: formatTime(prayerTimes.dhuhr, localTimeZone),
      asr: formatTime(prayerTimes.asr, localTimeZone),
      maghrib: formatTime(prayerTimes.maghrib, localTimeZone),
      isha: formatTime(prayerTimes.isha, localTimeZone),
      timeZone: localTimeZone,
    };
    return { prayerTimes, localTimeZone, results };
  };

  // Function to get the next prayer time and set it
  const getNextPrayerTime = (prayerTimes, localTimeZone) => {
    const nextPrayer = prayerTimes.nextPrayer();
    setPrayerName(nextPrayer);
    const now = moment.tz(localTimeZone);
    const nextPrayerMoment = moment(prayerTimes[nextPrayer]).tz(localTimeZone);
    const duration = moment.duration(nextPrayerMoment.diff(now));
    const countdown = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
    return {countdown,nextPrayer};
  };

  // useEffect hook to load initial data and set interval
  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem("position") && localStorage.getItem("locationName")) {
        const { latitude, longitude } = JSON.parse(localStorage.getItem("position"));
        setCoords({ latitude, longitude });
        const { prayerTimes, localTimeZone, results } = getAllTime(latitude, longitude);
        setTime(results);
        setLocationName(JSON.parse(localStorage.getItem("locationName")));
        setPrayerTimes(prayerTimes);
        setLocalTimeZone(localTimeZone);
      } else {
        const pos = await getGeolocation();
        setCoords(pos);
        fetchLocationAndTime(pos.latitude, pos.longitude);
        console.log("Fetching data from API");
      }
    };

    loadData();
  }, []); // Run once when the component mounts

  useEffect(() => {
    // Only set the interval if prayerTimes and localTimeZone are available
    if (prayerTimes && localTimeZone) {
      const interval = setInterval(() => {
        const {countdown,nextPrayer} = getNextPrayerTime(prayerTimes, localTimeZone);
        setNextPrayerTime(countdown);
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [prayerTimes, localTimeZone]); // Re-run this effect when prayerTimes or localTimeZone changes

  // Function to fetch location name and prayer times
  const fetchLocationAndTime = async (latitude, longitude) => {
    const { prayerTimes, localTimeZone, results } = getAllTime(latitude, longitude);
    const name = await getLocationName(latitude, longitude);
    setTime(results);
    setLocationName(name);
    setNextPrayerTime(""); // Reset countdown when new location is fetched
    localStorage.setItem("locationName", JSON.stringify(name));
    setPrayerTimes(prayerTimes); // Save prayerTimes to state
    setLocalTimeZone(localTimeZone); // Save time zone to state
  };

  return (
    <div>
      <Header
        location={locationName}
        getGeolocation={getGeolocation}
        fetchLocationAndTime={fetchLocationAndTime}
      />
      <CurrentTime />
      <SalahTime time={time} nextPrayerTime={nextPrayerTime} prayerName={prayerName} />
      <SandITime time={time} />
      <BottomNav />
    </div>
  );
}
