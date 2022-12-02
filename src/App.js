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
import Work_users from "./pages/work_users";
import LazyPageWrapper from "./components/LazyWrapper";
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Customer = lazy(() => import("./pages/custommer"));
const Employee = lazy(() => import("./pages/employee"));
const Order_time = lazy(() => import("./pages/calendar"));
const Custommer_News = lazy(() => import("./pages/custommer"));
const Custommer_Add = lazy(() => import("./pages/custommer/custommerAdd"));
const EmployeeDetail = lazy(() => import("./pages/employee/EmployeeDetail"));
const Test = lazy(() => import("./pages/test"));
const Profile = lazy(() => import("./pages/profile"));
const Custommer_detail = lazy(() =>
  import("./pages/custommer/custommerNews/detail")
);
const Report = lazy(() => import("./pages/report"));
const ServicePage = lazy(() => import("./pages/service"));
const Resource = lazy(() => import("./pages/resource"));
const Bonus = lazy(() => import("./pages/bonus"));
const ServiceDetail = lazy(() => import("./pages/service/ServiceDetail"));
const ServiceForm = lazy(() => import("./pages/service/form"));
const DoctorCreate = lazy(() => import("./pages/employee/create"));

function App() {
  const location = useLocation();
  if (location.pathname !== "/login") {
    authAPI
      .profile()
      .then((data) => localStorage.setItem("user", JSON.stringify(data)));
  }

  return (
    <div className="App">
      {location.pathname == "/login" ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <Header />
          <div className="container">
            <div style={{ marginTop: "50px" }}>
              <Suspense fallback={<PageLoading />}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/calendar" element={<Order_time />} />
                  <Route exact path="/customer" element={<Customer />} />
                  <Route exact path="/employee" element={<Employee />} />
                  <Route
                    exact
                    path="/custommer_news"
                    element={<LazyPageWrapper lazy_path={"./pages/custommer"}/>}
                  />
                  <Route
                    exact
                    path="/employee/detail/:id"
                    element={<EmployeeDetail />}
                    
                  />
                  <Route
                    exact
                    path="/customer/:id"
                    // element={<Custommer_detail />}
                    element={<LazyPageWrapper lazy_path={"./pages/custommer/custommerNews/detail"}/>}

                  />
                  <Route
                    exact
                    path="/customer/create"
                    element={<Custommer_Add />}
                  />
                  <Route exact path="/test" element={<Test />} />
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/report" element={<Report />} />
                  <Route
                    exact
                    path="/services/:id"
                    element={<ServiceDetail />}
                  />
                  <Route
                    exact
                    path="/services/create"
                    element={<ServiceForm />}
                  />
                  <Route exact path="/services" element={<ServicePage />} />
                  <Route exact path="/resource" element={<Resource />} />
                  <Route exact path="/bonus" element={<Bonus />} />
                  <Route exact path="/work_users" element={<Work_users />} />
                  <Route
                    exact
                    path="/employee/create"
                    element={<DoctorCreate />}
                  />
                </Routes>
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
