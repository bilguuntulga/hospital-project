import React, { useEffect, useState } from "react";
import { Calendar, Card, Col, Modal, Row, Skeleton, TimePicker } from "antd";
import { Field, Formik } from "formik";
import { Form, Input, Select, SubmitButton } from "formik-antd";
import * as yup from "yup";
import { doctorAPI, treatmentTimesAPI } from "../../apis";
import { SaveOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import PageLoading from "../../components/PageLoading";
import TreatmentTimesTable from "../../components/TreatmentTimesTable";

const model = {
  customer_phone: "",
  time: [],
  doctor: "",
};

const validationSchema = yup.object().shape({
  customer_phone: yup
    .string()
    .min(8, "Бага даа 8 оронтой байна")
    .required("Утасны дугаар оруулна уу"),
  time: yup.array().required("Цаг оруулна уу"),
  doctor: yup.string().required("Эмч сонгон уу"),
});

const CalendarApp = () => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialValues, setInitialValues] = useState(model);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [times, setTimes] = useState([]);

  const onSelect = (value) => {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    const date = new Date(value);

    if (date < now) return;

    setSelectedDate(date);
    setModalVisible(true);
  };

  const onSubmit = async (values) => {
    console.log(values);
    toast.promise(
      async () => {
        await treatmentTimesAPI.create({
          customer_phone: values?.customer_phone.trim(),
          doctor: values?.doctor,
          start_time: values?.time[0],
          end_time: values?.time[1],
        });
        setModalVisible(false);
      },
      {
        pending: "Хадгалж байна",
        error: "Амжилтгүй",
        success: "Амжилттай",
      }
    );
  };

  const onChange = async (values) => {
    if (values.time[0] && values.time[1]) {
      const formStartTime = new Date(values.time[0]);
      const formEndTime = new Date(values.time[1]);

      const start_time = new Date(selectedDate);
      start_time.setHours(formStartTime.getHours());
      start_time.setMinutes(formStartTime.getMinutes());
      start_time.setSeconds(0);

      const end_time = new Date(selectedDate);
      end_time.setHours(formEndTime.getHours());
      end_time.setMinutes(formEndTime.getMinutes());
      end_time.setSeconds(0);

      setDoctorsLoading(true);
      const res = await doctorAPI.findAvailable({
        start_time,
        end_time,
      });
      setDoctors(res);
      setDoctorsLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await treatmentTimesAPI.future();
    setTimes(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <PageLoading />;

  return (
    <div className="calendar_page">
      <Card title="Календар">
        <Modal
          title="Цаг захиалах"
          open={modalVisible}
          footer={null}
          onCancel={() => setModalVisible(false)}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form layout="vertical">
                <Form.Item
                  name="customer_phone"
                  label="Хэрэглэгчийн утасны дугаар"
                >
                  <Input name="customer_phone" />
                </Form.Item>
                <Form.Item
                  name="time"
                  onClick={() => {
                    setFieldValue("doctor", "");
                    onChange(values);
                  }}
                >
                  <Field name="time">
                    {({ field: { name, value }, form: { setFieldValue } }) => (
                      <TimePicker.RangePicker
                        onChange={(e) => setFieldValue(name, e)}
                        format="HH:mm"
                      />
                    )}
                  </Field>
                </Form.Item>
                <Form.Item name="doctor">
                  {doctorsLoading ? (
                    <Skeleton paragraph={{ rows: 0 }} />
                  ) : (
                    <Select name="doctor">
                      {doctors.map((doctor) => (
                        <Select.Option
                          value={doctor?.id}
                        >{`${doctor?.first_name} ${doctor?.last_name}`}</Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <SubmitButton block icon={<SaveOutlined />}>
                  Хадаглах
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </Modal>
        <Calendar onSelect={onSelect} />
        <ToastContainer />
      </Card>
      <Card title="Цагууд">
        <TreatmentTimesTable />
      </Card>
    </div>
  );
};

export default CalendarApp;
