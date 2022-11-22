import { Button, Col, Input, Row, Space } from 'antd'
import Customers from '../../components/Customers'
import React, { useEffect, useRef, useState } from 'react'
import { customerAPI } from '../../apis'
import PageLoading from '../../components/PageLoading'

const Customer__Page = () => {
  const [customerdata, setCustomerData] = useState([])
  const [loading, setLoading] = useState(true);
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    const res = await customerAPI.list()
    setCustomerData(res)
    setLoading(false);
  }

  const onSearch = async (values) => {
    setLoading(true);
    const res = await customerAPI.search(values)
    setCustomerData(res)
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) return <PageLoading />

  return (
    <div className='customer__container'>
      <p style={{ fontSize: "20px" }}><b>Registration</b></p>
      <Space direction='vertical' style={{ width: "100%" }}>
        <Row justify="space-between">
          <Col>
            <div className="search__container">
              <Input ref={nameRef} placeholder='Нэр' suffix={<img src='search_icon.png'
                onClick={() => onSearch({
                  name: nameRef?.current?.input?.value.toString().trim()
                })} />} />
              <Input ref={phoneRef} placeholder='Утас' suffix={<img src='search_icon.png'
                onClick={() => onSearch({
                  phone: phoneRef?.current?.input?.value.toString().trim()
                })}
              />} />
              <Input ref={emailRef} placeholder='И-мэйл' suffix={<img src='search_icon.png'
                onClick={() => onSearch({
                  email: emailRef?.current?.input?.value.toString().trim()
                })}
              />} />
            </div>
          </Col>
          <Col>
            <Button>Нэмэх</Button>
          </Col>
        </Row>
        <div
          style={{
            width: "100%",
            height: "69px",
            backgroundColor: "#D6ECFD",
            borderRadius: "15px",
            padding: "20px",
            display: "grid",
            placeItems: "center",
          }}
        >

          <Row style={{ width: "100%" }} align="middle" justify="space-between">
            <Col span={4}>Үйлчлүүлэгчийн нэр</Col>
            <Col span={4}>И-мэйл</Col>
            <Col span={4}>Хүйс</Col>
            <Col span={4}>Утасны дугаар</Col>
            <Col span={4}>Status</Col>
            <Col span={4}></Col>
          </Row>
        </div>
        {customerdata.map((e) => <Customers image={e?.image} name={`${e?.first_name} ${e?.last_name}`} birthday={e.email} gender={e.gender} phone={e.phone} id={e.id} color={e?.rate} />)}

      </Space>
    </div>
  )
}

export default Customer__Page