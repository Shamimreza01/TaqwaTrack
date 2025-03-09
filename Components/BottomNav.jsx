import React from "react";
import { NavLink } from "react-router";

export default function BottomNav() {
  return (
    <div className="bottomNavBarContainer">
      <NavLink to="/" className="button">
      <i class="fa-solid fa-house"></i>
        <span> Home </span>
      </NavLink>
      <NavLink to="/quran" className="button">
      <i className="fa-solid fa-book-open"></i>
        <span>Quran</span>
      </NavLink>
      <NavLink to="/learn-dua" className="button">
        <i className="fa-solid fa-hands-praying"></i>
        <span>Dua</span>
      </NavLink>
      <NavLink to="/daily-dua" className="button">
        <i className="fa-solid fa-star"></i>
        <span>Daily</span>
      </NavLink>
      <NavLink to="/menu" className="button">
        <i className="fa-solid fa-bars"></i>
        <span>Menu</span>
      </NavLink>
    </div>
  );
}
