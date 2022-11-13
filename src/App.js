import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/navbar"
import 'antd/dist/antd.css';
import './style.css'
import { authAPI } from "./apis";
const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const Registration = lazy(() => import("./pages/registration"))
const Advice = lazy(() => import("./pages/advice"))

function App() {
  const location = useLocation();
  if(location.pathname !== "/login"){
    authAPI.profile();
  }

  return (
    <div className="App">
      {
        location.pathname == "/login" ?
          <Login /> :
          <>
            <Navbar />
            <div className="main_Container">
              <p style={{ fontSize: "20px", margin: "0" }}>Logo</p>
              <p style={{ fontSize: "17px" }}>Saran Hospital</p>
              <Suspense fallback={<h1>LOADING</h1>}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/registration" element={<Registration />} />
                  <Route exact path="/" element={<Advice />} />
                </Routes>
              </Suspense>
            </div>
          </>
      }

    </div>
  );
}

export default App;
