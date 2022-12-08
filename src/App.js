import React, { Suspense } from "react";
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
import ServiceDetail from "./pages/service/ServiceDetail";
import EmployeeDetail from "./pages/employee/EmployeeDetail";
import CustomerDetail from "./pages/custommer/custommerNews/detail";
import Home from "./pages/home";
import Login from "./pages/login";
import Customer from "./pages/custommer";
import Employee from "./pages/employee";
import Order_time from "./pages/calendar";
import Custommer_News from "./pages/custommer";
import Custommer_Add from "./pages/custommer/custommerAdd";
import Profile from "./pages/profile";
import ServicePage from "./pages/service";
import Resource from "./pages/resource";
import Bonus from "./pages/bonus";
import ServiceForm from "./pages/service/form";
import DoctorCreate from "./pages/employee/create";
import Advice from "./pages/advice";
import QuestionsPage from "./pages/questions";
import CreateQuestions from "./pages/questions/create";
import UpdateQuestions from "./pages/questions/update";

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
                  <Route exact path="/customer/advice" element={<Advice />} />
                  <Route exact path="/employee" element={<Employee />} />
                  <Route
                    exact
                    path="/custommer_news"
                    element={<Custommer_News />}
                  />
                  <Route
                    path="/employee/detail/:id"
                    element={<EmployeeDetail />}
                  />
                  <Route path="/customer/:id" element={<CustomerDetail />} />
                  <Route
                    exact
                    path="/customer/create"
                    element={<Custommer_Add />}
                  />
                  <Route exact path="/profile" element={<Profile />} />
                  <Route path="/services/:id" element={<ServiceDetail />} />
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
                  <Route path="/questions" element={<QuestionsPage />} />
                  <Route
                    path="/questions/create"
                    element={<CreateQuestions />}
                  />
                  <Route path="/questions/:id" element={<UpdateQuestions />} />
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
