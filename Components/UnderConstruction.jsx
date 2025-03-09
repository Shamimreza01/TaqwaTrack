import React from "react";
import { Link } from "react-router";

export default function UnderConstruction() {
  return (
    <div className="construction-container">
      <h1>🚧 Page Under Construction 🚧</h1>
      <p>Good things take time... Even Jannah wasn't built in a day! 😅</p>
      
      <div className="funny-text">
        <p>"And be patient, for indeed, Allah does not allow the reward of those who do good to be lost." (Quran 11:115) 📖</p>
        <p>We are working hard, Insha'Allah it will be ready soon! 🛠️</p>
      </div>
      
      <Link to="/" className="home-button">Return to Safety 🏡</Link>
    </div>
  );
}
