import React, { Component, memo } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { doctorAPI, treatmentTimesAPI } from "../apis";
import {
  Col,
  message,
  Modal,
  PageHeader,
  Row,
  Select as Antd__Select,
} from "antd";
import { Formik } from "formik";
import { Form, Input, Select, SubmitButton } from "formik-antd";
import * as yup from "yup";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { TreatmentTimesErrorConverter } from "../apis/treatment-times";
const { confirm } = Modal;

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

class Event {
  constructor(id, start, end, text, backColor = "#6aa84f") {
    this.id = id;
    this.start = start;
    this.end = end;
    this.text = text;
    this.backColor = backColor;
  }
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      time: {},
      showCreateModal: false,
      showUpdateModal: false,
      doctors: [],
      startTime: "",
      endTime: "",
      updateTime: { ...this.model },
      calendarProps: {
        viewType: "Week",
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        timeFormat: "Clock24Hours",
        locale: "en-us",
        onTimeRangeSelected: async (args) => {
          const dp = this.calendar;
          dp.clearSelection();

          const now = new Date();
          const startTime = new Date(args.start);

          if (now > startTime) return;

          await this.getDoctors(args.start, args.end);

          this.setState((prevState) => ({
            ...prevState,
            showCreateModal: true,
            startTime: new Date(args.start).toISOString(),
            endTime: new Date(args.end).toISOString(),
          }));
        },
        eventDeleteHandling: "Update",
        onEventClick: async (args) => {
          const time = await treatmentTimesAPI.get(args?.e?.data?.id);
          await this.getDoctors(time.start_time, time.end_time);

          this.setState((prevState) => ({
            ...prevState,
            time,
            showUpdateModal: true,
            updateTime: {
              id: time?.id,
              customer_phone: time?.customer?.phone,
              doctor: `${time?.doctor?.first_name} ${time?.doctor?.last_name}`,
              start_time: time?.start_time,
              end_time: time?.end_time,
            },
          }));
        },
        onEventDelete: async (args) => {
          const time = await treatmentTimesAPI.get(args?.e?.data?.id);

          if (new Date(time?.end_time) > new Date()) {
            this.deleteTime(args?.e?.data?.id);
          } else {
            message.warning("Өнгөрсөн цагийг устгах боломжгүй");
            this.fetchData();
          }
        },
        onEventResize: async (args) => {
          const time = await treatmentTimesAPI.get(args?.e?.data?.id);
          const data = {
            id: args?.e?.data?.id,
            start_time: new Date(args?.newStart),
            end_time: new Date(args?.newEnd),
            doctor: time?.doctor?.id,
          };
          this.updateTime(data);
        },
        onEventMove: async (args) => {
          const time = await treatmentTimesAPI.get(args?.e?.data?.id);
          const data = {
            id: args?.e?.data?.id,
            start_time: new Date(args?.newStart),
            end_time: new Date(args?.newEnd),
            doctor: time?.doctor?.id,
          };
          this.updateTime(data);
        },
      },
    };
  }

  model = {
    customer_phone: "",
    doctor: "",
  };

  validationSchema = yup.object().shape({
    customer_phone: yup
      .string()
      .min(8, "8 оронтой байна")
      .max(8, "8 оронтой байна")
      .required("Утасны дугаар оруулна уу"),
    doctor: yup.string().required("Эмч сонгон уу"),
  });

  get calendar() {
    return this.calendarRef.current.control;
  }

  async getDoctors(start, end) {
    const startTime = new Date(start).toISOString();
    const endTime = new Date(end).toISOString();

    const doctors = await doctorAPI.findAvailable({
      start_time: startTime,
      end_time: endTime,
    });

    this.setState((preState) => ({
      ...preState,
      doctors: doctors,
    }));
  }

  async deleteTime(id) {
    try {
      confirm({
        title: "Устгах",
        content: "Та устгах даа итгэлтэй байна уу?",
        okText: "Тийм",
        okType:"danger",
        cancelText: "Үгүй",
        onOk: async () => {
          await treatmentTimesAPI.remove(id);
          message.success("Амжилттай");
          this.fetchData();
        },
        onCancel: async () => {
          this.fetchData();
        },
      });
    } catch (error) {
      message.error(error?.message);
    }
  }

  async fetchData() {
    const times = await treatmentTimesAPI.list();

    let events = [];

    times.forEach((time) => {
      const start = new Date(time?.start_time);
      start.setHours(start.getHours() + 8);
      const end = new Date(time?.end_time);
      end.setHours(end.getHours() + 8);

      const text = `${time?.customer?.phone}`;
      events.push(new Event(time?.id, start, end, text, time?.doctor?.color));
    });

    const startDate = new Date();
    this.calendar.height = 600;

    this.calendar.update({ startDate, events });
  }

  componentDidMount() {
    DayPilot.Locale.register(
      new DayPilot.Locale("en-us", {
        dayNames: [
          "Ням",
          "Даваа",
          "Мягмар",
          "Лхавга",
          "Пүрэв",
          "Баасан",
          "Бямба",
        ],
        dayNamesShort: ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],
        monthNames: [
          "1 сар",
          "2 сар",
          "3 сар",
          "4 сар",
          "5 сар",
          "6 сар",
          "7 сар",
          "8 сар",
          "9 сар",
          "10 сар",
          "11 сар",
          "12 сар",
        ],
        monthNamesShort: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
        timePattern: "hh:mm:ss",
        datePattern: "yyyy/MM/dd",
        dateTimePattern: "yyyy/MM/dd hh:mm:ss",
        timeFormat: "Clock24Hours",
        weekStarts: 1,
        timezone: 8,
      })
    );

    this.fetchData();
  }

  async createTime(values) {
    values.start_time = this.state.startTime;
    values.end_time = this.state.endTime;

    try {
      await treatmentTimesAPI.create(values);
      await this.fetchData();
      message.success("Амжилттай");
    } catch (error) {
      console.log(error);
      message.error("Амжилтгүй");
    }

    this.setState((prevState) => ({
      ...prevState,
      showCreateModal: false,
    }));
  }

  async updateTime(values) {
    if (values?.doctor?.includes(" ")) {
      delete values.doctor;
    }

    try {
      await treatmentTimesAPI.update(values);
      message.success("Амжилттай");
    } catch (error) {
      message.error(
        TreatmentTimesErrorConverter(error?.message) ?? "Амжилтгүй"
      );
    }

    await this.fetchData();
    this.setState((prevState) => ({
      ...prevState,
      showUpdateModal: false,
    }));
  }

  render() {
    return (
      <div>
        <div className="day__pilot__navigation">
          <DayPilotNavigator
            selectMode={this.state.calendarProps.viewType}
            showMonths={3}
            skipMonths={1}
            startDate={new Date()}
            selectionDay={new Date()}
            orientation="Horizontal"
            onTimeRangeSelected={(args) => {
              this.calendar.update({
                startDate: args.day,
              });
            }}
          />
        </div>
        <PageHeader
          extra={
            <Antd__Select
              style={{ width: "100px" }}
              defaultValue={this.state.calendarProps.viewType}
              onChange={(value) =>
                this.setState((prevState) => ({
                  ...prevState,
                  calendarProps: {
                    ...this.state.calendarProps,
                    viewType: value,
                  },
                }))
              }
            >
              <Antd__Select.Option value="Day">1 хоног</Antd__Select.Option>
              <Antd__Select.Option value="Week">7 хоног</Antd__Select.Option>
            </Antd__Select>
          }
        />
        <div style={styles.main}>
          <DayPilotCalendar
            {...this.state.calendarProps}
            ref={this.calendarRef}
          />
        </div>
        <Modal
          open={this.state.showCreateModal}
          title="Цаг нэмэх"
          onCancel={() =>
            this.setState((preState) => ({
              ...preState,
              showCreateModal: false,
            }))
          }
          footer={false}
        >
          <Formik
            onSubmit={(values, { resetForm }) => {
              this.createTime(values);
              resetForm();
            }}
            initialValues={this.model}
            validationSchema={this.validationSchema}
          >
            <Form layout="vertical">
              <Form.Item
                name="customer_phone"
                label="Үйлчлүүлэгчийн утасны дугаар"
              >
                <Input name="customer_phone" />
              </Form.Item>
              <Form.Item name="doctor" label="Эмч">
                <Select name="doctor">
                  {this.state.doctors.map((doctor) => (
                    <Select.Option
                      value={doctor?.id}
                    >{`${doctor?.first_name} ${doctor?.last_name}`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <SubmitButton icon={<SaveOutlined />} block>
                Хадгалах
              </SubmitButton>
            </Form>
          </Formik>
        </Modal>
        <Modal
          open={this.state.showUpdateModal}
          onCancel={() =>
            this.setState((preState) => ({
              ...preState,
              showUpdateModal: false,
            }))
          }
          footer={null}
        >
          <Formik
            validationSchema={this.validationSchema}
            initialValues={this.state.updateTime}
            enableReinitialize
            onSubmit={(values) => this.updateTime(values)}
          >
            <Form layout="vertical">
              <Form.Item
                name="customer_phone"
                label="Үйлчлүүлэгчийн утасны дугаар"
              >
                <Input name="customer_phone" />
              </Form.Item>
              <Form.Item name="doctor" label="Эмч">
                <Select name="doctor">
                  {this.state.doctors.map((doctor) => (
                    <Select.Option
                      value={doctor?.id}
                    >{`${doctor?.first_name} ${doctor?.last_name}`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <SubmitButton icon={<SaveOutlined />} block>
                Хадгалах
              </SubmitButton>
            </Form>
          </Formik>
        </Modal>
      </div>
    );
  }
}

export default memo(Calendar);
