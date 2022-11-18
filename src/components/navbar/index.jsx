import {
  ArrowRightOutlined,
  DownOutlined,
  FormOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useState } from "react";
import { Link, Router, useLocation } from "react-router-dom";
import "./style.css";

function Index() {
  const pathName = useLocation();
  const [customer, setCustommer] = useState(false);

    return (
        <>
            <div className='main_container'>
                <div className='content'>
                    <div className="profile">
                        <Row gutter={10} style={{ width: "100%" }} align="middle">
                            <Col >
                            <div className='navbar__logo'>
                                <img src="logo.png" width="32px" height="41px" alt="" />
                            </div>
                            </Col>
                            <Col >
                                <b style={{ marginTop: "5px" }}> Арьс дасгалжуулагч</b>
                            </Col>
                        </Row>
                    </div>
                    <div className='menu'>
                        <NavLink path={"/"} icon={"dashboard.png"} text={"Дашбоард"} />
                        <NavLink path={"/calendar"} icon={'calendar.png'} text={"Календар"} />
                        <NavLink path={"/report"} icon={'report.png'} text={"Тайлан"} />
                        <NavLink path={"/employee"} icon={'employee.png'} text={"Ажилтан"} />
                        <NavLink path={"/customer"} icon={'custommer.png'} text={"Үйлчлүүлэгч"} />
                        <NavLink path={"/client"} icon={'client.png'} text={"Үйлчилгээ"} />
                        <NavLink path={"/resource"} icon={'resource.png'} text={"Нөөц"} />
                        <NavLink path={"/bonus"} icon={"bonus.png"} text={"Урамшуулал"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index;
