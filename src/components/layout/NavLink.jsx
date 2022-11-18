import { Col, Row } from 'antd'
import React, { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

function NavLink({ path, icon, text }) {
    const pathname = useLocation();

    return (
        <Link to={path} >
            <div className="simple">
                <Row gutter={17} justify="center" style={{ width: "100%" }}>
                    <Col span={8}>
                        <img src={icon} width="30px" height="30px" alt={path} />
                    </Col>
                    <Col span={14}>
                        {text}
                    </Col>
                    <Col span={2}>
                        <div className={pathname.pathname == path ? "dahsboard__navbar__effect" : ""} />
                    </Col>
                </Row>
            </div>
        </Link>
    )
}

export default memo(NavLink)