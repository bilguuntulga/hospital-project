import { Col, Row } from 'antd'
import React from 'react'

function advice({ name, phone }) {
    return (
        <div>
            <div style={{ backgroundColor: "white", width: "100%", height: "76px",fontSize:"16px",borderRadius:"15px",paddingLeft:"20px",paddingTop:"10px",color:"gray" }}>
                <Row align="middle" style={{marginTop:"15px"}}>
                    <Col span={12}>
                        {name}
                    </Col>
                    <Col span={12}>
                        {phone}
                    </Col>
                </Row>
            </div>
        </div>

    )
}

export default advice