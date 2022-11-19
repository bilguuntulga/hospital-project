import {
  ArrowRightOutlined,
  DownOutlined,
  FormOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useState } from "react";
import { Link, Router, useLocation } from "react-router-dom";
import NavButton from "../layout/NavButton";
import "./style.css";

function Index() {
  const pathName = useLocation();
  const [customer, setCustommer] = useState(false);

  return (
    <>
      <div className="main_container">
        <div className="content">
          <div className="profile">
            <Row gutter={10} style={{ width: "100%" }} align="middle">
              <Col>
                <div className="navbar__logo">
                  <img src="/logo.png" width="32px" height="41px" alt="" />
                </div>
              </Col>
              <Col>
                <b style={{ marginTop: "5px" }}> Арьс дасгалжуулагч</b>
              </Col>
            </Row>
          </div>
          <div className="menu">
            <NavButton path={"/"} icon={"/dashboard.png"} text={"Дашбоард"} />
            <NavButton
              path={"/calendar"}
              icon={"/calendar.png"}
              text={"Календар"}
            />
            <NavButton path={"/report"} icon={"/report.png"} text={"Тайлан"} />
            <NavButton
              path={"/employee"}
              icon={"/employee.png"}
              text={"Ажилтан"}
            />
            <NavButton
              path={"/customer"}
              icon={"/custommer.png"}
              text={"Үйлчлүүлэгч"}
            />
            <NavButton
              path={"/client"}
              icon={"/client.png"}
              text={"Үйлчилгээ"}
            />
            <NavButton
              path={"/resource"}
              icon={"/resource.png"}
              text={"Нөөц"}
            />
            <NavButton
              path={"/bonus"}
              icon={"/bonus.png"}
              text={"Урамшуулал"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
