import { Button, Col, Input, Pagination, Row, Skeleton, Space, Select } from 'antd'
import Customers from '../../components/Customers'
import React, { memo, useEffect, useRef, useState } from 'react'
import { customerAPI, paginationAPI } from '../../apis'
import PageLoading from '../../components/PageLoading'
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'

const CustomerPage = () => {
  const [customerdata, setCustomerData] = useState([])
  const [loading, setLoading] = useState(true);
  const [adviceData, setAdviceData] = useState([]);
  const [paginationdata, setpaginationData] = useState([])
  const [rate, setRate] = useState("ALL");
  const [gender, setGenter] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const nameRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    const res = await customerAPI.registered();
    const advice = await customerAPI.advice();
    setAdviceData(advice)
    setCustomerData(res)
    setLoading(false);
  }

  const paginationOnChange = async (page, pageSize) => {
    setPageSize(pageSize)
    setPage(page)
    console.log("PAGE ", page);
    console.log("PAGE SIZE", pageSize);
  }
  const checkCustomers = async (text) => {
    console.log(text);

    switch (text) {
      case 1:
        return loading ? <Skeleton /> : customerdata.map((e) =>
          <Customers image={e?.image}
            id={e.id}
            name={`${e?.first_name} ${e?.last_name}`}
            birthday={e.email}
            gender={e.gender}
            phone={e.phone}
            rate={e?.rate}
          />)
      case 2:
        return loading ? <Skeleton /> : adviceData.map((e) =>
          <Customers image={e?.image}
            id={e.id}
            name={`${e?.first_name} ${e?.last_name}`}
            birthday={e.email}
            gender={e.gender}
            phone={e.phone}
            rate={e?.rate}
          />)
      case 3:
        return;
    }
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

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    paginationAPI.list({
      rate: rate,
      gender: gender,
      type: type,
      page: page,
      page_size: pageSize
    }).then((res) => {
      setTotal(res?.meta?.total);
      setpaginationData(res.data)
    });
  }, [rate, type, gender, page, pageSize]);

  return (
    <div className='customer__container'>
      <Space direction='vertical' style={{ width: "100%" }}>
        <Row align="middle" justify="space-between">
          <div className="search__container">
            <Col>
              <Input ref={nameRef} placeholder='Хайх' suffix={<img src='search_icon.png'
                onClick={() => onSearch(nameRef?.current?.input?.value.toString().trim())} />} />
            </Col>
            <Col>
              <div className='select___conataienr'>
                <div>Статус: </div>
                <div>
                  <Select style={{ width: "100px" }} onChange={setRate} defaultValue="ALL">
                    <Select.Option value="GOOD">Сайн</Select.Option>
                    <Select.Option value="BAD">Муу</Select.Option>
                    <Select.Option value="ALL">Бүгд</Select.Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col>
              <div className='select___conataienr'>
                <div>Хүйс: </div>
                <Select style={{ width: "100px" }} onChange={setGenter} defaultValue="ALL">
                  <Select.Option value="MALE">Эрэгтэй</Select.Option>
                  <Select.Option value="FEMALE">Эмэгтэй</Select.Option>
                  <Select.Option value="ALL">Бүгд</Select.Option>
                </Select>
              </div>
            </Col>
            <Col>
              <div className='select___conataienr'>
                <div>Төрөл: </div>
                <Select style={{ width: "100px" }} onChange={setType} defaultValue="ALL">
                  <Select.Option value="REGISTERED">Бүртгэлтэй</Select.Option>
                  <Select.Option value="ADVICE"> Зөвөлгөө</Select.Option>
                  <Select.Option value="ALL">Бүгд</Select.Option>
                </Select>
              </div>
            </Col>
          </div>
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
        {paginationdata.map((e) => <Customers image={e?.image}
          id={e.id}
          name={`${e?.first_name} ${e?.last_name}`}
          birthday={e.email}
          gender={e.gender}
          phone={e.phone}
          rate={e?.rate}
        />)}
        <Row justify="end">
          <Col span={24}>
            <Pagination onChange={paginationOnChange} total={total} pageSize={pageSize} current={page} pageSizeOptions={[10, 20, 30]} />
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default memo(CustomerPage)