import { Button, Col, Row } from 'antd'
import React, { useState, useEffect } from 'react'
import Doctors from '../../Components/doctors'
import { doctorAPI } from '../../apis';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const DoctorPage = () => {
  const [doctersdata, setDoctersData] = useState([])
  const location = useLocation();

  const fetchData = async () => {
    const res = await doctorAPI.get();
    setDoctersData(res)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col>
          <b><p style={{ fontSize: "24px" }}>Эмч нар</p></b>
        </Col>
        <Col>
          <Button style={{ width: "168px", height: "59px", backgroundColor: "#7B80FF", borderRadius: "10px", color: "white", border: "none" }}>Нэмэх</Button>
        </Col>
      </Row>
      <br />
      <br />
      <Row justify="space-between">
        {doctersdata.map((e) =>
          <Link to={`detail/${e.id}`}>
              <Col span={6}>
                <Doctors image={e?.profile_img} name={e?.name} type={e?.role} />
              </Col>
          </Link>
        )}

      </Row>
    </>
  )
}

export default DoctorPage