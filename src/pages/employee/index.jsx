import { Button, Col, Empty, Row } from "antd";
import React, { useState, useEffect } from "react";
import { doctorAPI } from "../../apis";
import PageLoading from "../../components/PageLoading";
import DoctorCard from "../../components/doctors/DoctorCard";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const DoctorPage = () => {
  const [doctors, setDocters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await doctorAPI.list();
    setDocters(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <PageLoading />;

  return (
    <div className="employee_page_container">
      <Row justify="space-between">
        <Col>
          <b>
            <p style={{ fontSize: "24px" }}>Ажилчид</p>
          </b>
        </Col>
        <Col>
          <Link to="create">
            <Button icon={<PlusOutlined />}>Нэмэх</Button>
          </Link>
        </Col>
      </Row>
      <div className="employee_list_wrapper">
        {doctors?.length > 0 ? (
          doctors?.map((e, i) => (
            <DoctorCard
              key={e + i}
              image={e?.profile_img}
              name={`${e?.first_name} ${e?.last_name}`}
              role={e?.role}
              url={`detail/${e?.id}`}
            />
          ))
        ) : (
          <Empty style={{ margin: "auto" }} />
        )}
      </div>
    </div>
  );
};

export default DoctorPage;
