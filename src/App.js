import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/SideMenu";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import "./styles/main.scss";
import { authAPI } from "./apis";
import Header from "./components/layout/Header";
import PageLoading from "./components/PageLoading";
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Customer = lazy(() => import("./pages/custommer"));
const Employee = lazy(() => import("./pages/employee"));
const Order_time = lazy(() => import("./pages/calendar"));
const Custommer_News = lazy(() => import("./pages/custommer"));
const Custommer_Add = lazy(() => import("./pages/custommer/custommerAdd"));
const Advice = lazy(() => import("./pages/custommer/advice"));
const EmployeeDetail = lazy(() => import("./pages/employee/EmployeeDetail"));
const Test = lazy(() => import("./pages/test"));
const Profile = lazy(() => import("./pages/profile"));
const Custommer_detail = lazy(() =>
  import("./pages/custommer/custommerNews/detail")
);
const Report = lazy(() => import("./pages/report"));
const Client = lazy(() => import("./pages/client"));
const Resource = lazy(() => import("./pages/resource"));
const Bonus = lazy(() => import("./pages/bonus"));

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
            <Suspense fallback={<PageLoading />}>
              <div style={{ marginTop: "50px" }}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/calendar" element={<Order_time />} />
                  <Route exact path="/customer" element={<Custommer_Add />} />
                  <Route exact path="/employee" element={<Employee />} />
                  <Route
                    exact
                    path="/custommer_news"
                    element={<Custommer_News />}
                  />
                  <Route exact path="/advice" element={<Advice />} />
                  <Route
                    exact
                    path="/employee/detail/:id"
                    element={<EmployeeDetail />}
                  />
                  <Route
                    exact
                    path="/custommer_news/custommer_detail/:id"
                    element={<Custommer_detail />}
                  />
                  <Route exact path="/test" element={<Test />} />
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/report" element={<Report />} />
                  <Route exact path="/client" element={<Client />} />
                  <Route exact path="/resource" element={<Resource />} />
                  <Route exact path="/bonus" element={<Bonus />} />
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
