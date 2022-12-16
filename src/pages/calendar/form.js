import { DatePicker, Form, Input } from "formik-antd";
import SelectDoctor from "../../components/form/SelectDoctor";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Col,TimePicker, Divider, Row, Modal, message } from "antd";
import { DeleteOutlined, ExclamationCircleFilled, SaveOutlined } from "@ant-design/icons";
import React from "react";
import moment from "moment";
import { treatmentTimesAPI } from "../../apis";
import { getAPIErrors } from "../../utils/functions";

const Schema = yup.object().shape({
  date: yup.date().nullable(false).required("Заавал бөглөнө үү"),
  between_time: yup.array(
    yup.date().nullable(false).required("Заавал бөглөнө үү")
  ),
  doctor: yup.string().nullable(false).required("Заавал бөглөнө үү"),
  customer_phone: yup.string().nullable(false).required("Заавал бөглөнө үү"),
});

const initValues = {
  date: new Date(),
  between_time: [],
  doctor: null,
  customer_phone: "",
}
export default function CalendarForm({ action, onRemove: _onRemove, onSubmit: _onSubmit }) {

  const [formData, setFormData] = React.useState({
    ...initValues,
  });

  const onRemove = () => {
    Modal.confirm({
      title: 'Өгөгдөл устгах',
      icon: <ExclamationCircleFilled />,
      content: 'Та энэ цаг устгахыг хүсэж байна уу',
      async onOk() {
        try{
          await treatmentTimesAPI.remove(action[1]?.id);
        }catch(err) {
          getAPIErrors(err);
        }
        _onRemove();
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  function disabledDate(current) {
    return current && current < moment().startOf('day');
  }
  const onSubmit = async (values, formik) => {

    const start_time = new Date(values.between_time[0]);
    const end_time = new Date(values.between_time[1]);
    const date = new Date(values.date);
    start_time.setFullYear(date.getFullYear(),date.getMonth(),date.getDate())
    end_time.setFullYear(date.getFullYear(),date.getMonth(),date.getDate())
    

    let temp_values = {
      doctor: values.doctor,
      customer_phone: values.customer_phone,
      end_time,
      start_time,
    }
    console.log(values,temp_values);
    try {
      if(action[0] === "create") {
        await treatmentTimesAPI.create(temp_values);
      } else {
        await treatmentTimesAPI.update({
          id:values.id,
          ...temp_values
        });
      }
      if(_onSubmit) _onSubmit();
    } catch (err) {
      // todo errors 
      getAPIErrors(err);
    }
  }


  React.useEffect(() => {
    let tempInitValues = {
      ...initValues
    }
    if (action) {
      tempInitValues = {
        ...tempInitValues,
        ...(action[1] || {})
      }
    }
    setFormData(tempInitValues);
  }, [action])

  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={Schema}
        onSubmit={onSubmit}
        initialValues={formData}
      >
       {({ isSubmitting,values,setFieldValue }) => (
          <Form layout="vertical">
            <Form.Item label="Огноо" name="date">
              <DatePicker disabledDate={disabledDate} name="date" />
            </Form.Item>
            <Form.Item label="Цаг" name="between_time">
              <TimePicker.RangePicker
                value={values.between_time && values.between_time.length > 0 ?[moment(new Date(values.between_time[0])),moment(new Date(values.between_time[1])),] :[]}

              onChange={e => {
                if(e) {
                  setFieldValue("between_time",[e[0].toDate().toJSON(),e[1].toDate().toJSON()]);
                } else {
                  setFieldValue("between_time",[]);
                }
              }} name="between_time" />
            </Form.Item>
            <Form.Item label="Эмч" name="doctor">
              <SelectDoctor  name="doctor" />
            </Form.Item>
            <Form.Item name="customer_phone" label="Хэрэглэгчийн утасны дугаар">
              <Input name="customer_phone" />
            </Form.Item>
            <Divider />
            <Row gutter={[8]}>
              {
                action[0] === "update" ? (
                  [
                    <Col xs={12}>
                    <Button onClick={onRemove} size="large" type="danger" block disabled={isSubmitting} icon={<DeleteOutlined />}>
                      Устгах
                    </Button>
                  </Col>,
                  <Col xs={12}>
                    <Button size="large" loading={isSubmitting} block type="primary" icon={<SaveOutlined />} htmlType="submit">
                      Хадгалах
                    </Button>
                  </Col>
                  ]
                ) : (
                  <Col xs={24}>
                    <Button size="large" block type="primary" icon={<SaveOutlined />} htmlType="submit">
                      Хадгалах
                    </Button>
                  </Col>
                )
              }

            </Row> 
          </Form>
        )}
      </Formik>
    </div>
  )
}
