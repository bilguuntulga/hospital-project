import React, {
  createContext,
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Navbar from "./components/navbar";
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
import Header from "./components/layout/Header";
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
const Custommer_detail = lazy(() => import("./pages/custommer/custommerNews/detail"))

function App() {
  const location = useLocation();
  if (location.pathname !== "/login") {
    authAPI.profile();
  }

  return (
    <div className="App">
      {location.pathname == "/login" ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <div className="main_Container">
            <Header />
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
                  <Route
                    exact
                    path="/custommer_news/custommer_detail/:id"
                    element={<Custommer_detail />}
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
