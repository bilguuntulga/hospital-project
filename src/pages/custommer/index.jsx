import { Button, Col, Input, Pagination, Row, Skeleton, Space } from 'antd'
import Customers from '../../components/Customers'
import React, { memo, useEffect, useRef, useState } from 'react'
import { customerAPI } from '../../apis'
import PageLoading from '../../components/PageLoading'
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { Select } from 'formik-antd'

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
    const res = await customerAPI.search({
      name: values,
      email: values,
      phone: values
    })
    setCustomerData(res)
    setLoading(false);
  }

  const onPaginationChange = async (page, pageSize) => {
    console.log("PAGE", page);
    console.log("PAGE SIZE", pageSize);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='customer__container'>
      <Space direction='vertical' style={{ width: "100%" }}>
        <Row justify="space-between">
          <Col>
            <div className="search__container">
              <Input ref={nameRef} placeholder='Хайх' suffix={<img src='search_icon.png'
                onClick={() => onSearch(nameRef?.current?.input?.value.toString().trim())} />} />
            </div>
          </Col>
          <Col>
            <Link to="create"><Button icon={<PlusOutlined />} >Нэмэх</Button></Link>
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
        {loading ? <Skeleton /> : customerdata.map((e) =>
          <Customers image={e?.image}
            id={e.id}
            name={`${e?.first_name} ${e?.last_name}`}
            birthday={e.email}
            gender={e.gender}
            phone={e.phone}
            rate={e?.rate}
          />)}
        <Pagination defaultCurrent={1} total={100} onChange={onPaginationChange} showSizeChanger={false} />
      </Space>
    </div>
  )
}

export default memo(Customer__Page)