import React, { memo, useEffect, useRef, useState } from "react";
import { Card, Modal, Skeleton, TimePicker } from "antd";
import { Field, Formik } from "formik";
import { Form, Input, Select, SubmitButton } from "formik-antd";
import * as yup from "yup";
import { doctorAPI, treatmentTimesAPI } from "../../apis";
import { SaveOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import PageLoading from "../../components/PageLoading";
import moment from "moment";
import Calendar from "../../components/Calendar";

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

const CalendarApp = () => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialValues, setInitialValues] = useState(model);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const timesTableRef = useRef();

  const onSubmit = async (values, { resetForm }) => {
    await toast.promise(
      async () => {
        await treatmentTimesAPI.create({
          customer_phone: values?.customer_phone?.trim(),
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

    resetForm();
    setModalVisible(false);
    timesTableRef.current();
  };

  const onTimePickerChange = async (value, name, setFieldValue) => {
    setFieldValue("doctor", "");

    const formStartTime = new Date(value[0]);
    const formEndTime = new Date(value[1]);

    const start_time = new Date(selectedDate);
    start_time.setHours(formStartTime.getHours());
    start_time.setMinutes(formStartTime.getMinutes());
    start_time.setSeconds(0);

    const end_time = new Date(selectedDate);
    end_time.setHours(formEndTime.getHours());
    end_time.setMinutes(formEndTime.getMinutes());
    end_time.setSeconds(0);

    setFieldValue(name, [start_time, end_time]);

    setDoctorsLoading(true);
    const res = await doctorAPI.findAvailable({
      start_time,
      end_time,
    });
    setDoctors(res);
    setDoctorsLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <PageLoading />;

  return (
    <div className="calendar_page">
      <Card title="Календарь">
        <Calendar />
        <ToastContainer />
      </Card>
    </div>
  );
};

export default memo(CalendarApp);
