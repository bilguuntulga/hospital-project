import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'
import { doctorAPI } from '../../apis'
import { Button, Col, Row } from 'antd'
const DocterDetail = () => {
    const { id } = useParams();
    const [detaildata, setDetailData] = useState({})
    const [buttonclick, setButtonClick] = useState("")

    const fetchData = async () => {
        const res = await doctorAPI.detail(id);
        setDetailData(res)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className='header' style={{ width: "100%", height: "115px" }}>
                <p className='name'><b>{detaildata.name}</b></p>
            </div>
            <div style={{ backgroundColor: "white", width: "100%", height: "772px", borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px", margin: "0", padding: "0" }}>
                <div className='image_Container'>
                    <img src={detaildata?.profile_img} width="132px" height="120px" alt="" />
                </div>
                <p style={{ marginLeft: "220px", fontSize: "26px", padding: "0", margin: "0" }}>{detaildata?.role}</p>
                <div style={{marginTop:"50px",width:"100%",display:"grid" ,placeItems:"center"}} >
                    <Row>  n   
                        <Col>
                            <Button className='detailBUtton'>Эмчийн намтар</Button>
                        </Col>
                        <Col>
                            <Button className='detailBUtton'>Эмчийн намтар</Button>
                        </Col>
                        <Col>
                            <Button className='detailBUtton'>Эмчийн намтар</Button>
                        </Col>
                        <Col>
                            <Button className='detailBUtton'>Эмчийн намтар</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default DocterDetail