import React, { memo } from "react";
import NavButton from "./NavButton";

function SideMenu() {
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
          text={"Календар"}
        />
        <NavButton path={"/report"} icon={"/report.png"} text={"Тайлан"} />
        <NavButton path={"/employee"} icon={"/employee.png"} text={"Ажилтан"} />
        <NavButton
          path={"/customer"}
          icon={"/custommer.png"}
          text={"Үйлчлүүлэгч"}
        />
        <NavButton path={"/client"} icon={"/client.png"} text={"Үйлчилгээ"} />
        <NavButton path={"/resource"} icon={"/resource.png"} text={"Нөөц"} />
        <NavButton path={"/bonus"} icon={"/bonus.png"} text={"Урамшуулал"} />
      </div>
    </div>
  );
}

export default memo(SideMenu);
