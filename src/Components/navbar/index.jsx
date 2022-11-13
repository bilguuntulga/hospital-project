import React, { useState } from 'react'
import { Link, Router, useLocation } from 'react-router-dom'
import './style.css'

function Index() {
    const pathName = useLocation();
    return (
        <>
            <div className='main_container'>
                <div className='content'>
                    <div className="profile">
                        <img src="ninja.png" width="50px" height="50px" alt="" />
                    </div>
                    <div className='profile_text'>
                        <p className='profile_name'><b>Beck</b></p>
                        <p className='profile_type'><b>ADMIN</b></p>
                    </div>
                    <div className='menu'>
                        <Link to="/" >
                            <div className={pathName.pathname == '/' ? "action_home" : ""}>
                                <img src="dashboard.png" width="30px" height="30px" alt="" />
                            </div>
                        </Link>
                        <Link to="/registration">
                            <div className={pathName.pathname == '/custommer' ? "action_custommer" : ""}>
                                <img src="custommer.png" width="30px" height="30px" alt="" />
                            </div>
                        </Link>
                        <Link to="advice">
                            <div className={pathName.pathname == '/advice' ? "action_advice" : ""}>
                                <img src="advice.png" width="30px" height="30px" alt="" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index