import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/navbar"
import 'antd/dist/antd.css';
import './style.css'
import { authAPI } from "./apis";
import { Button, Col, Dropdown, Row } from "antd";
import { ArrowDownOutlined, BellOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const Custommer = lazy(() => import("./pages/custommer"))
const Doctor = lazy(() => import("./pages/doctor"))
const Order_time = lazy(() => import("./pages/calendar"))
const Custommer_News = lazy(()=>import("./pages/custommer/custommerNews"))
const Custommer_Add = lazy(()=>import("./pages/custommer/custommerAdd"))
const Advice = lazy(()=>import("./pages/custommer/advice"))

function App() {
  const location = useLocation();
  if (location.pathname !== "/login") {
    authAPI.profile();
  }
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <div className="App">
      {
        location.pathname == "/login" ?
          <Login /> :
          <>
            <Navbar />
            <div className="main_Container">
              <Row justify="end" style={{ width: "100%" }}>

                <Col span={12}>
                  <Row justify="end" gutter={20}>
                    <Col>
                      <div style={{ width: "50px", height: "50px", backgroundColor: "white", display: "flex", placeItems: "center", fontSize: "30px", borderRadius: "50%" }}>
                        <BellOutlined style={{ margin: "auto" }} />
                      </div>
                    </Col>
                    <Col>
                      <Row gutter={20}>
                        <Col>
                          <div style={{ width: "50px", height: "50px", backgroundColor: "#D9D9D9", display: "flex", placeItems: "center", fontSize: "30px", borderRadius: "50%" }}>
                            <img src="ninja.png" width="29px" height="29px" style={{ margin: "auto" }} />
                          </div>
                        </Col>
                        <Col>
                          <b>Арьс дасгалжуулагч</b>
                          <p>Захирал</p>
                        </Col>
                        <Col>
                          <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                            <DownOutlined />
                          </Dropdown></Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b><p style={{ fontSize: "16px", margin: "0" }}>Сайн байна уу, *************</p></b>
                  <p style={{ fontSize: "17px" }}>Өдрийг сайхан өнгөрүүлээрэй, Ажлын амжилт хүсэе </p>
                </Col>
              </Row>
              <Suspense fallback={<h1>LOADING</h1>}>
                <div style={{ marginTop: "50px" }}>
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/calendar" element={<Order_time />} />
                    <Route exact path="/custommer" element={<Custommer />} />
                    <Route exact path="/doctor" element={<Doctor />} />
                    <Route exact path="/custommer_news" element={<Custommer_News />} />
                    <Route exact path="/custommer_add" element={<Custommer_Add />} />
                    <Route exact path="/advice" element={<Advice />} />
                  </Routes>
                </div>
              </Suspense>
            </div>
          </>
      }

    </div>
  );
}

export default App;
