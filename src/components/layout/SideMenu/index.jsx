import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavButton from "./NavButton";
import { authAPI } from "../../../apis";

function SideMenu() {
  const [user, setUser] = useState({});

  const fetchData = async () => {
    let user = await authAPI.profile();
    setUser(user);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="side_menu_wrapper">
      <div className="logo_wrapper">
        <div className="logo_border">
          <img src="/logo.png" alt="LOGO" />
        </div>
        <div> Арьс дасгалжуулагч</div>
      </div>
      <div className="nav_buttons_wrapper">
        <NavButton path={"/"} icon={"/dashboard.png"} text={"Дашбоард"} />
        <NavButton
          path={"/calendar"}
          icon={"/calendar.png"}
          text={"Календарь"}
        />
        {user?.role == "ADMIN" ? (
          <NavButton
            path={"/employee"}
            icon={"/employee.png"}
            text={"Ажилтан"}
          />
        ) : null}

        <NavButton
          path={"/customer"}
          icon={"/custommer.png"}
          text={"Үйлчлүүлэгч"}
        />
        <NavButton path={"/services"} icon={"/client.png"} text={"Үйлчилгээ"} />
        <NavButton path={"/resource"} icon={"/resource.png"} text={"Нөөц"} />
        <NavButton path={"/bonus"} icon={"/bonus.png"} text={"Урамшуулал"} />
      </div>
    </div>
  );
}

export default memo(SideMenu);
