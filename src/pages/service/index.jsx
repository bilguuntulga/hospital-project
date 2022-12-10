import React, { memo, useEffect, useState } from "react";
import Service from "../../components/service";
import { servicesAPI } from "../../apis";
import { Button, Col, Empty, Row, Tabs } from "antd";
import { Link } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import { PlusOutlined } from "@ant-design/icons";
import DoctorCard from "../../components/doctors/DoctorCard";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [basicservice, setBasicService] = useState([]);
  const [additionalservice, setAdditionalService] = useState([]);
  const [packageservice, setPackageSservice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const fetchData = async () => {
    setLoading(true);
    servicesAPI.getPackage().then((res) => setPackageSservice(res));
    servicesAPI.getBasics().then((res) => setBasicService(res));
    servicesAPI.getAdditional().then((res) => setAdditionalService(res));

    const res = await servicesAPI.list();
    setServices(res);

    const user_res = JSON.parse(localStorage.getItem("user"));
    setUser(user_res);
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
      <Tabs centered>
        <Tabs.TabPane tab="Бүгд" key={1}>
          <div className="services_wrapper">
            {services.length > 0 ? (
              services?.map((e, i) => (
                <DoctorCard
                  key={e + i}
                  image={e?.images[0]}
                  name={e?.name}
                  url={user?.role == "ADMIN" ? e.id : null}
                  role={e.price}
                />
              ))
            ) : (
              <Empty style={{ margin: "auto" }} />
            )}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Багц" key={4}>
          <div className="services_wrapper">
            {packageservice.length > 0 ? (
              packageservice?.map((e, i) => (
                <DoctorCard
                  key={e + i}
                  image={e?.images[0]}
                  name={e?.name}
                  url={user?.role == "ADMIN" ? e.id : null}
                  role={e.price}
                />
              ))
            ) : (
              <Empty style={{ margin: "auto" }} />
            )}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Үндсэн" key={2}>
          <div className="services_wrapper">
            {basicservice.length > 0 ? (
              basicservice?.map((e, i) => (
                <DoctorCard
                  key={e + i}
                  image={e?.images[0]}
                  name={e?.name}
                  url={user?.role == "ADMIN" ? e.id : null}
                  role={e.price}
                />
              ))
            ) : (
              <Empty style={{ margin: "auto" }} />
            )}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Нэмэлт" key={3}>
          <div className="services_wrapper">
            {additionalservice.length > 0 ? (
              additionalservice?.map((e, i) => (
                <DoctorCard
                  key={e + i}
                  image={e?.images[0]}
                  name={e?.name}
                  url={user?.role == "ADMIN" ? e.id : null}
                  role={e.price}
                />
              ))
            ) : (
              <Empty style={{ margin: "auto" }} />
            )}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default memo(ServicePage);
