import { Button, Card, Form, Modal, Select, Switch, TimePicker } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { doctorAPI } from "../apis";
import DoctorWorkingHours from "./DoctorWorkingHours";

function WorkingHoursTable({ id, workingHours }) {
  const [showModal, setShowModal] = useState(false);
  const [isRest, setIsRest] = useState(false);

  const onFinish = (values) => {
    if (values.rest) {
      workingHours?.forEach((e) => {
        if (values.day.some((x) => x == e.id)) {
          e.start_time = null;
          e.end_time = null;
        }
      });
    } else {
      const start_time = moment(values.time[0]).format("hh:mm:ss");
      const end_time = moment(values.time[1]).format("hh:mm:ss");
      workingHours?.forEach((e) => {
        if (values.day.some((x) => x == e.id)) {
          e.start_time = start_time;
          e.end_time = end_time;
        }
      });
    }

    toast.promise(
      async () => {
        await doctorAPI.update({
          id,
          working_hours: workingHours,
        });
        setShowModal(false);
      },
      {
        pending: "Илгээж байна",
        success: "Амжилттай",
        error: "Амжилтгүй",
      }
    );
  };

  return (
    <>
      <Card
        title="Цагийн хуваарь:"
        style={{ width: "620px", borderColor: "black", borderRadius: "15px" }}
        extra={
          <Button
            style={{
              width: "100px",
              color: "white",
              height: "29px",
              backgroundColor: "#434AFE",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => setShowModal(true)}
          >
            Засах
          </Button>
        }
      >
        {workingHours.map((e) => (
          <>
            <DoctorWorkingHours
              day={dayTranslater(e?.day)}
              endDate={e?.end_time}
              startDate={e?.start_time}
            />
          </>
        ))}
        <ToastContainer />
        <Modal
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
          title="Ажлын хувиар засах"
        >
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              name="day"
              label="Өдөр сонгох"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
            >
              <Select mode="multiple">
                {workingHours?.map((e, i) => (
                  <Select.Option key={i} value={e.id}>
                    {dayTranslater(e.day)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="rest" label="Амралтын өдөр">
              <Switch name="rest" onClick={() => setIsRest(!isRest)} />
            </Form.Item>
            {!isRest ? (
              <Form.Item
                name={"time"}
                label="Цаг сонгох"
                rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              >
                <TimePicker.RangePicker name={"time"} format="hh:mm" />
              </Form.Item>
            ) : null}
            <Button htmlType="submit">Хадаглах</Button>
          </Form>
        </Modal>
      </Card>
    </>
  );
}

export const dayTranslater = (day) =>
  ({
    monday: "Даваа",
    tuesday: "Мягмар",
    wednesday: "Лхавга",
    thursday: "Пүрэв",
    friday: "Баасан",
    saturday: "Бямба",
    sunday: "Ням",
  }[`${day}`]);

export default WorkingHoursTable;
