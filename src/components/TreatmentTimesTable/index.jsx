import { Col, Row, Skeleton } from "antd";
import { Formik } from "formik";
import { DatePicker, Form, Input, SubmitButton } from "formik-antd";
import React, { useEffect, useState } from "react";
import { treatmentTimesAPI } from "../../apis";
import TimeListItem from "./TimeListItem";
import SelectDoctor from "../form/SelectDoctor";
import { SearchOutlined } from "@ant-design/icons";

const searchModel = {
  date: [],
  phone_number: "",
  doctor: "",
};

function TreatmentTimesTable({ refreshRef }) {
  const [loading, setLoading] = useState(true);
  const [times, setTimes] = useState([]);

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await treatmentTimesAPI.search({
      ...values,
      start_date: values.date[0],
      end_date: values.date[1],
      page: 1,
      page_size: 25,
    });
    setTimes(res.data);
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await treatmentTimesAPI.future();
    setTimes(res);
    setLoading(false);
  };

  useEffect(() => {
    refreshRef.current = fetchData;
    fetchData();
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="treatment_times_table">
      <Formik onSubmit={onSubmit} initialValues={searchModel}>
        <Form layout="vertical">
          <Row justify="space-between" align="middle">
            <Col span={7}>
              <Form.Item name="date" label="Он, Сар, Өдөр">
                <DatePicker.RangePicker name="date" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="customer_phone" label="Үйлчлүүлэгчийн утас">
                <Input name="customer_phone" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="doctor" label="Эмч">
                <SelectDoctor name="doctor" />
              </Form.Item>
            </Col>
            <Col>
              <SubmitButton icon={<SearchOutlined />}>Хайх</SubmitButton>
            </Col>
          </Row>
        </Form>
      </Formik>
      <div className="treatment_times_table_header">
        <div className="header_title">Хэрэглэгч</div>
        <div className="header_title">Эмч</div>
        <div className="header_title">Цаг</div>
      </div>
      <div className="times_list_wrapper">
        {times.map((time, i) => (
          <TimeListItem
            key={time?.id ?? i}
            id={time.id}
            customerImage={time?.customer?.image}
            customerName={`${time?.customer?.first_name} ${time?.customer?.last_name}`}
            customerPhone={time?.customer?.phone}
            doctorImage={time?.doctor?.profile_img}
            doctorName={`${time?.doctor?.first_name} ${time?.doctor?.last_name}`}
            doctorPhone={time?.doctor?.phone}
            startTime={time?.start_time}
            endTime={time?.end_time}
            refreshTable={fetchData}
          />
        ))}
      </div>
    </div>
  );
}

export default TreatmentTimesTable;
