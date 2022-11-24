import React, { memo, useEffect, useState } from 'react'
import Service from "../../components/service"
import { servicesAPI } from '../../apis'
import { Button, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import PageLoading from '../../components/PageLoading'
import { PlusOutlined } from '@ant-design/icons'
import DoctorCard from '../../components/doctors/DoctorCard'


const ServicePage = () => {
  const [servicedata, setServiceData] = useState([])
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const fetchData = async () => {
    setLoading(true);
    const res = await servicesAPI.list();
    const user_res = JSON.parse(localStorage.getItem("user"))
    setUser(user_res)
    setServiceData(res)
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [])

  if (loading) return <PageLoading />


  return (
    <div className='service'>
      <Row justify="end">
        <Col>
          {
            user?.role == "ADMIN" ? <Link to="create"><Button icon={<PlusOutlined />}>Нэмэх</Button></Link> : ""
          }

        </Col>
      </Row>
      <br />
      <div className='services_wrapper'>
        {
          // servicedata.map((e, i) => <Link to={`${e.id}`}><Service name={e?.name} image={e?.images[0]} desc={e?.desc} type={e?.type} price={e?.price} service={e?.service} /></Link>)
        }
        {
          servicedata.map((e) => <DoctorCard image={e?.images[0]} name={e?.name} url={e.id} role={e.price} />)
        }
      </div>

    </div>
  )
}

export default memo(ServicePage)