import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";

function NavButton({ path, icon, text }) {
  const { pathname } = useLocation();

  return (
    <Link to={path}>
      <div
        className={`side_menu_nav_button ${
          path === pathname ? "active_side_menu_button" : ""
        }`}
      >
        <img
          className="side_menu_nav_button_icon"
          src={icon}
          width="30px"
          height="30px"
          alt={path}
        />
        <div>{text}</div>
      </div>
    </Link>
  );
}

export default memo(NavButton);
