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
      <div className="main_container">
        <div className="content">
          <div className="profile">
            <Row style={{ width: "100%" }} align="middle">
              <Col>
                <img src="logo.png" width="50px" height="50px" alt="" />
              </Col>
              <Col>
                <b style={{ marginTop: "5px" }}>Арьс дасгалжуулагч</b>
              </Col>
            </Row>
          </div>
          <div className="menu">
            <Link to="/">
              <div
                className={
                  pathName.pathname == "/" ? "action__dashboard" : "simple"
                }
              >
                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                  <Col span={8}>
                    <img
                      src="dashboard.png"
                      width="30px"
                      height="30px"
                      alt=""
                    />
                  </Col>
                  <Col span={16}>Нүүр хуудас</Col>
                  <Col>
                    <div></div>
                  </Col>
                </Row>
              </div>
            </Link>
            <Link to="/calendar">
              <div
                className={
                  pathName.pathname == "/calendar"
                    ? "action_orde_time"
                    : "simple"
                }
              >
                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                  <Col span={8}>
                    <img
                      src="calendar.png"
                      alt="calendar"
                      className="Icon"
                      style={{ fontSize: "30px", color: "black" }}
                    />
                  </Col>
                  <Col span={16}>Календар</Col>
                </Row>
              </div>
            </Link>
            <Link to="/report">
              <div
                className={
                  pathName.pathname == "/report" ? "action_orde_time" : "simple"
                }
              >
                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                  <Col span={8}>
                    <img
                      src="report.png"
                      alt="calendar"
                      className="Icon"
                      style={{ fontSize: "30px", color: "black" }}
                    />
                  </Col>
                  <Col span={16}>Тайлан</Col>
                </Row>
              </div>
            </Link>
            <Link to="/employee">
              <div
                className={
                  pathName.pathname == "/employee"
                    ? "action_orde_time"
                    : "simple"
                }
              >
                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                  <Col span={8}>
                    <img
                      src="employee.png"
                      alt="calendar"
                      className="Icon"
                      style={{ fontSize: "30px", color: "black" }}
                    />
                  </Col>
                  <Col span={16}>Ажилтан</Col>
                </Row>
              </div>
            </Link>
            <Link to="/customer">
              <div
                className={
                  pathName.pathname == "/customer" ||
                  pathName.pathname == "/custommer_add" ||
                  pathName.pathname == "/advice"
                    ? "action_registration"
                    : "simple"
                }
                onClick={() => setCustommer(!customer)}
              >
                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                  <Col span={8}>
                    <img
                      src="custommer.png"
                      width="30px"
                      height="30px"
                      alt=""
                    />
                  </Col>
                  <Col span={12}>Үйлчлүүлэгч</Col>
                  <Col span={4}>
                    {customer ? <RightOutlined /> : <DownOutlined />}
                  </Col>
                </Row>
              </div>
              <div
                className={`customers_submenu ${
                  customer ? "show_customer_submenu" : ""
                }`}
              >
                <Link to="/custommer_news">
                  <p>Үйлчлүүлэгчдийн мэдээлэл</p>
                </Link>
                <Link to="/custommer_add">
                  <p>Үйлчлүүлэгч нэмэх</p>
                </Link>
                <Link to="/advice">
                  <p>Зөвөлгөө</p>
                </Link>
              </div>
            </Link>
            <Link to="/resource">
              <div
                className={
                  pathName.pathname == "/resource" ? "action_advice" : "simple"
                }
              >
                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                  <Col span={8}>
                    <img src="resource.png" width="30px" height="30px" alt="" />
                  </Col>
                  <Col span={16}>Нөөц</Col>
                </Row>
              </div>
            </Link>
            <Link to="/bonus">
              <div
                className={
                  pathName.pathname == "/bonus" ? "action_advice" : "simple"
                }
              >
                <Row gutter={20} justify="center" style={{ width: "100%" }}>
                  <Col span={8}>
                    <img src="bonus.png" width="30px" height="30px" alt="" />
                  </Col>
                  <Col span={16}>Эмч </Col>
                </Row>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
