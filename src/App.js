import React, {
  createContext,
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Navbar from "./Components/navbar";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import { authAPI } from "./apis";
import { Button, Col, Dropdown, Layout, Row } from "antd";
import {
  ArrowDownOutlined,
  BellOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Custommer = lazy(() => import("./pages/custommer"));
const Doctor = lazy(() => import("./pages/doctor"));
const Order_time = lazy(() => import("./pages/calendar"));
const Custommer_News = lazy(() => import("./pages/custommer/custommerNews"));
const Custommer_Add = lazy(() => import("./pages/custommer/custommerAdd"));
const Advice = lazy(() => import("./pages/custommer/advice"));
const DocterDetail = lazy(() => import("./pages/doctor/docterDetail"));
const Test = lazy(() => import("./pages/test"));
const Profile = lazy(() => import("./pages/profile"));

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const location = useLocation();

  const fetchUser = async () => {
    const result = await authAPI.profile();
    setUser(result);
  };

  if (location.pathname !== "/login") {
    fetchUser();
  }

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <div className="App">
      {location.pathname == "/login" ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <div className="main_Container">
            <Row justify="end" style={{ width: "100%" }}>
              <Col span={12}>
                <Row justify="end" gutter={20}>
                  <Col>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "white",
                        display: "flex",
                        placeItems: "center",
                        fontSize: "30px",
                        borderRadius: "50%",
                      }}
                    >
                      <BellOutlined style={{ margin: "auto" }} />
                    </div>
                  </Col>
                  <Col>
                    <Row gutter={20}>
                      <Link to="/profile">
                        <Col>
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "#D9D9D9",
                              display: "flex",
                              placeItems: "center",
                              fontSize: "30px",
                              borderRadius: "50%",
                              backgroundImage: `url(${user?.profile_img})`,
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                          >
                            {/* <img
                              src={user?.profile_img}
                              width="29px"
                              height="29px"
                              style={{ margin: "auto" }}
                            /> */}
                          </div>
                        </Col>
                      </Link>
                      <Col>
                        <b>{`${user.first_name} ${user.last_name}`}</b>
                        <p>{`${
                          user.role === "ADMIN" ? "Админ" : "Ажилчин"
                        }`}</p>
                      </Col>
                      <Col>
                        <Dropdown
                          menu={{ items }}
                          placement="bottomRight"
                          arrow={{ pointAtCenter: true }}
                        >
                          <DownOutlined />
                        </Dropdown>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <b>
                  <p style={{ fontSize: "16px", margin: "0" }}>
                    Сайн байна уу, {user.first_name} {user.last_name}
                  </p>
                </b>
                <p style={{ fontSize: "17px" }}>
                  Өдрийг сайхан өнгөрүүлээрэй, Ажлын амжилт хүсэе
                </p>
              </Col>
            </Row>
            <Suspense fallback={<h1>LOADING</h1>}>
              <div style={{ marginTop: "50px" }}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/calendar" element={<Order_time />} />
                  <Route exact path="/custommer" element={<Custommer />} />
                  <Route exact path="/doctor" element={<Doctor />} />
                  <Route
                    exact
                    path="/custommer_news"
                    element={<Custommer_News />}
                  />
                  <Route
                    exact
                    path="/custommer_add"
                    element={<Custommer_Add />}
                  />
                  <Route exact path="/advice" element={<Advice />} />
                  <Route
                    exact
                    path="/doctor/detail/:id"
                    element={<DocterDetail />}
                  />
                  <Route exact path="/test" element={<Test />} />
                  <Route exact path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
