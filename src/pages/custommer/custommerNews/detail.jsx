import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { customerAPI } from '../../../apis';

const Detail = () => {
  const [customerdetail, setCustomerDetail] = useState({});

  const fetechData = async () => {
    const res = await customerAPI.get(id)
    setCustomerDetail(res)
  }
  useEffect(() => {
    fetechData()
  }, [])



  const { id } = useParams();
  return (
    <div style={{ backgroundColor: "white", width: "100%", borderRadius: "47px" }}>
      <p>Үйлчлүүлэгчийн мэдээлэu</p>
      <Row>
        <Col>
        <div>
          
        </div>
        </Col>
      </Row>
    </div>
  )
}

export default Detail