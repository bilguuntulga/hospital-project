import { SaveOutlined } from "@ant-design/icons";
import { Skeleton, TimePicker } from "antd";
import { Formik } from "formik";
import { DatePicker, Form, Input, Select, SubmitButton } from "formik-antd";
import React, { memo, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { doctorAPI, treatmentTimesAPI } from "../../apis";
import * as yup from "yup";
import moment from "moment/moment";

const model = {
  customer_phone: "",
  date: null,
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

function TreatmentTimeForm({ id = "", refreshTable }) {
  const [initialValues, setInitialValues] = useState(model);
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const onSubmit = async (values) => {
    await toast.promise(
      async () => {
        if (id) {
          await treatmentTimesAPI.update(values);
        } else
          await treatmentTimesAPI.create({
            customer_phone: values?.customer_phone,
            doctor: values?.doctor,
            start_time: values?.time[0],
            end_time: values?.time[1],
          });
      },
      {
        pending: "Хадгалж байна",
        error: "Амжилтгүй",
        success: "Амжилттай",
      }
    );

    refreshTable();
  };

  const onRangePickerChange = async (value, setFieldValue, values) => {
    if (!values.date) return;

    setDoctorsLoading(true);
    setFieldValue("doctor", "");

    const startTime = new Date(values.date);
    const newStartTime = new Date(value[0]);
    startTime.setHours(newStartTime.getHours());
    startTime.setMinutes(newStartTime.getMinutes());
    startTime.setSeconds(0);

    const endTime = new Date(values.date);
    const newEndTime = new Date(value[1]);
    endTime.setHours(newEndTime.getHours());
    endTime.setMinutes(newEndTime.getMinutes());
    endTime.setSeconds(0);

    const res = await doctorAPI.findAvailable({
      start_time: startTime,
      end_time: endTime,
    });

    setFieldValue("start_time", startTime);
    setFieldValue("end_time", endTime);

    setDoctors(res);
    setDoctorsLoading(false);
  };

  const fetchData = async () => {
    if (id) {
      setLoading(true);
      const res = await treatmentTimesAPI.get(id);
      const doctorsRes = await doctorAPI.list();
      setDoctors(doctorsRes);
      res.customer_phone = res?.customer?.phone;
      const doctor = res.doctor;
      delete res.doctor;
      delete res.created_by;
      delete res.updated_by;
      delete res.customer;
      delete res.updated_at;
      delete res.created_at;
      delete res.start_time;
      delete res.end_time;
      res.doctor = doctor?.id;
      const startTime = moment(res.start_time);
      const endTIme = moment(res.end_time);
      res.time = [startTime, endTIme];
      setInitialValues(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form layout="vertical">
            <Form.Item
              name="customer_phone"
              label="Үйлчлүүлэгчийн утасны дугаар"
            >
              <Input name="customer_phone" />
            </Form.Item>
            <Form.Item name="date" label="Өдөр">
              <DatePicker name="date" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="time" label="Цаг">
              <TimePicker.RangePicker
                defaultPickerValue={values.time}
                name="time"
                onChange={(e) => onRangePickerChange(e, setFieldValue, values)}
                style={{ width: "100%" }}
                format="HH:mm"
              />
            </Form.Item>
            <Form.Item name="doctor" label="Эмч">
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
      <ToastContainer />
    </div>
  );
}

export default memo(TreatmentTimeForm);
