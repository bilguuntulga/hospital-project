import React, { memo, useEffect, useState } from "react";
import Service from "../../components/service";
import { servicesAPI } from "../../apis";
import { Button, Col, Empty, Row } from "antd";
import { Link } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import { PlusOutlined } from "@ant-design/icons";
import DoctorCard from "../../components/doctors/DoctorCard";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const fetchData = async () => {
    setLoading(true);
    const res = await servicesAPI.list();
    const user_res = JSON.parse(localStorage.getItem("user"));
    setUser(user_res);
    setServices(res);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <PageLoading />;

  return (
    <div className="service">
      <Row justify="end">
        <Col>
          {user?.role == "ADMIN" ? (
            <Link to="create">
              <Button icon={<PlusOutlined />}>Нэмэх</Button>
            </Link>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <br />
      <div className="services_wrapper">
        {services.length > 0 ? (
          services.map((e) => (
            <DoctorCard
              image={e?.images[0]}
              name={e?.name}
              url={e.id}
              role={e.price}
            />
          ))
        ) : (
          <Empty style={{ margin: "auto" }} />
        )}
      </div>
    </div>
  );
};

export default memo(ServicePage);
