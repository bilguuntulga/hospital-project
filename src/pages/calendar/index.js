import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Card, Modal, Skeleton, TimePicker, Form, Input, DatePicker, Row, Col, Select, message, Popover } from "antd";
import * as yup from "yup";
import { doctorAPI, plannedtreadmentAPI, treatmentTimesAPI } from "../../apis";
import { ClearOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SaveOutlined, SearchOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import PageLoading from "../../components/PageLoading";
import Timeable from "../../components/Timeable"
// import Calendar from "../../components/Calendar";
// import Timeable from "../../components/Timeable";
import * as moment from "moment";
import useFetch from "../../hooks/useFetch";
import { Divider } from "rc-menu";
import { SelectDoctorForm } from "../../components/form/SelectDoctor";
import CalendarForm from "./form";
import { useNavigate } from "react-router-dom";

const model = {
  customer_phone: "",
  time: [],
  doctor: "",
};

const validationSchema = yup.object().shape({
  customer_phone: yup
    .string()
    .min(8, "8 оронтой байна")
    .max(8, "8 оронтой байна")
    .required("Утасны дугаар оруулна уу"),
  time: yup.array().required("Цаг оруулна уу"),
  doctor: yup.string().required("Эмч сонгон уу"),
});

const getFilterDate = (date) => {
  const start_date = date ? date : new Date();
  start_date.setDate(start_date.getDate() - start_date.getDay() + 1);
  const end_date = new Date(start_date);
  end_date.setDate(start_date.getDate() + 6);
  return {
    start_date,
    end_date
  }
}
const inivalues = {
  ...getFilterDate(),
  doctor_id: null,
  customer_search: null,
};
const CalendarApp = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = React.useState(inivalues);

  const [calendar_values, calendar_loading, _, reload_calendar_values] = useFetch(treatmentTimesAPI.list, filter)([]);

  const onSubmitSearch = async (values) => {
    setFilter({
      ...getFilterDate(values?.date_between.toDate()),
      doctor_id:values.doctor_id,
      customer_search:values.customer_search,
    });
  }

  const [formAction, setFormAction] = React.useState(null);

  return (
    <React.StrictMode>
      <div className="calendar_page">
        <Card title={"Календарь"} extra={[
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button icon={<PlusOutlined />} onClick={() => setFormAction(["create"])} type="primary" >
              Нэмэх
            </Button>,
            <div style={{ width: 24 }}></div>,
            <Button style={{ background: "white !important" }} onClick={() => reload_calendar_values()} icon={<ReloadOutlined />} type="ghost" />
          </div>
        ]}>
          <Form form={form} initialValues={{
            date_between: moment(filter.start_date),
            doctor_id: filter.doctor_id,
            customer_search: filter.customer_search,
          }} layout="vertical" onFinish={onSubmitSearch} >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12} xl={6}>
                <Form.Item label="Эмч" name="doctor_id">
                  <SelectDoctorForm value={form.getFieldValue("doctor_id")} onChange={e => {
                    form.setFieldValue("doctor_id",e);
                  }} name="doctor_id" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12} xl={6}>
                <Form.Item label="Хэрэглэгч хайлт" name="customer_search">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12} xl={6}>

                <Form.Item label="Огноо" rules={[{ required: true, "message": "Та заавал бөглөнө үү" }]} required requiredMark name="date_between">
                  <DatePicker.WeekPicker onChange={(e, dateString) => {
                    console.log({ e, dateString });
                  }} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12} xl={6}>
                <Form.Item label=" " >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button icon={<SearchOutlined />} htmlType="submit">
                      Хайх
                    </Button>
                    <div style={{ width: 16 }}>
                    </div>

                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Timeable
            start_date={filter.start_date}
            nodeClick={(date) => {

              if (date < Date.now()) {
                message.error("Уучлаарай өнгөрсөн цаг дээр мэдээлэл оруулах боломжгүй", 2);
                return;
              }

              let start_time = new Date(date);
              let end_time = new Date(date);

              end_time.setHours(end_time.getHours() + 1);

              setFormAction(["create", {
                date: date,
                between_time: [start_time, end_time,],
              }]);
            }}
            loading={calendar_loading}
            // click={(item) => {
            //   setFormAction(["update", {
            //     id: item?.id,
            //     date: item.start_date,
            //     between_time: [item.start_date, item.end_date,],
            //     doctor: item?.doctor?.id,
            //     customer_phone: item?.customer?.phone
            //   }]);

            // }}
            render={(item) => <CalendarMetaCard item={item} onEdit={() => setFormAction(["update", {
              id: item?.id,
              date: item.start_date,
              between_time: [item.start_date, item.end_date,],
              doctor: item?.doctor?.id,
              customer_phone: item?.customer?.phone
            }])} />}
            workingTime={{ start: "09:00", end: "20:00" }}
            items={(calendar_values.map(e => {
              return {
                ...e,
                start_date: e.start_time,
                end_date: e.end_time,
                content: <div>Orgil Emch</div>,
                onClick: () => {
                  alert("asd")
                }
              }
            }))}
          />
        </Card>
      </div>
      <Modal onCancel={() => setFormAction(null)} open={!!formAction} footer={null} title={formAction && formAction[0] === "create" ? "Үүсгэх" : "Засварлах"}>
        <CalendarForm action={formAction} onRemove={() => {
          setFormAction(null);
          reload_calendar_values();
        }}
          onSubmit={() => {
            setFormAction(null);
            reload_calendar_values();
          }}
        />
      </Modal>
    </React.StrictMode>
  );
};

const CalendarMetaCard = ({ item,onEdit }) => {
  const history = useNavigate();
  return <Popover trigger={"hover"} title="Үйлдэл" content={
    <div>
      <div>
        <Button block type="ghost" onClick={() => history(`/customer/${item?.customer?.id}`)}>
        Харилцагчийн дэлгэрэнгүй
        </Button>
      </div>
      <div style={{ height: 16 }}>

      </div>
      <div>
        <Button onClick={onEdit} block type="ghost" icon={<EditOutlined />}>
          Засварлах
        </Button>
      </div>
    </div>
  }>
    <div className="time-able-item ant-card-hoverable">
      <div className="avatar">
        <img src={item?.doctor?.profile_img} width={36} height={36} />
        <div className="avatar-meta">
          <div className="title">
            {
              item?.doctor?.first_name
            }
          </div>
          <div className="desc">
            {
              item?.doctor?.role
            }
          </div>
        </div>
      </div>
          
      <div className="avatar">
        <div className="avatar-meta">
          
          <div className="title">
            {
              item?.doctor?.first_name
            }
          </div>
          <div className="desc">
            {
              item?.customer?.phone
            }
          </div>
        </div>
      </div>
      <div className="item-tag ">
        {
          `${moment(new Date(item?.start_date)).format("HH:mm")} - ${moment(new Date(item?.end_date)).format("HH:mm")}`
        }
      </div>
    </div>

  </Popover>
}

export default CalendarApp;
