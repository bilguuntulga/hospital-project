import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar"
import 'antd/dist/antd.css';
import './style.css'
const Home = lazy(() => import("./pages/home"))
const Custommer = lazy(() => import("./pages/customer"))
const Advice = lazy(() => import("./pages/advice"))

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main_Container">
        <p style={{ fontSize: "20px", margin: "0" }}>Logo</p>
        <p style={{ fontSize: "17px" }}>Saran Hospital</p>
        <Suspense fallback={<h1>LOADING</h1>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
