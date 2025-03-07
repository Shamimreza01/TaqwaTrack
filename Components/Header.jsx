import React, { useState } from "react";

export default function Header({ location, getGeolocation,fetchLocationAndTime}) {
  const [loading, setLoading] = useState(false);

  const fetchLocation = async () => {
    setLoading(true);
    const location=await getGeolocation();
    await fetchLocationAndTime(location.latitude,location.longitude);
    setLoading(false);
  };

  return (
    <div className="search">
      <div className="locationDisplay">
        <marquee scrollamount="3">
          <div className="locationText">
            {loading ? "Fetching location..." : location}
          </div>
        </marquee>
      </div>
      <div className="location" onClick={fetchLocation}>
        <i className="fa-solid fa-location-crosshairs"></i>
      </div>
    </div>
  );
}