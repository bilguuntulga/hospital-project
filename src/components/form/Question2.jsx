import { Formik, validateYupSchema } from "formik";
import { Form, Radio, SubmitButton } from "formik-antd";
import React, { memo, useEffect, useState } from "react";
import * as yup from "yup";
import { Row, Col, message, Card } from "antd";
import { Input } from "formik-antd";
import QuestionCard from "./QuestionCard";
import { anythingAPI } from "../../apis";
import { ImportOutlined, SaveOutlined } from "@ant-design/icons";

const model = {
  phone: "",
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q6: "",
  q7: "",
  q8: "",
  q9: "",
  q10: "",
};

const validationSchema = yup.object().shape({
  phone: yup.string().optional(),
  q1: yup.string().optional(),
  q2: yup.string().optional(),
  q3: yup.string().optional(),
  q4: yup.string().optional(),
  q5: yup.string().optional(),
  q6: yup.string().optional(),
  q7: yup.string().optional(),
  q8: yup.string().optional(),
  q9: yup.string().optional(),
  q10: yup.string().optional(),
});
const validationSchema_phone = yup.object().shape({
  phone: yup.string().required("Заавал бөглөнө үү"),
  q1: yup.string().optional(),
  q2: yup.string().optional(),
  q3: yup.string().optional(),
  q4: yup.string().optional(),
  q5: yup.string().optional(),
  q6: yup.string().optional(),
  q7: yup.string().optional(),
  q8: yup.string().optional(),
  q9: yup.string().optional(),
  q10: yup.string().optional(),
});

function Question2({ id }) {
  const [questiontwo, setQuestionTwo] = useState();
  const [initialValues, setInitialValues] = useState(model);

  const onSubmit = async (values) => {
    try {
      if (!questiontwo) {
        if (id) {
          await anythingAPI.create({
            any: {
              customer_id: id,
              type: "q2",
              ...values,
            },
          });
        } else {
          await anythingAPI.create({
            any: {
              customer_phone: values?.phone,
              type: "q2",
              ...values,
            },
          });
        }
      } else {
        await anythingAPI.update({
          id: questiontwo?.id,
          any: {
            ...values,
          },
        });
      }

      message.success("Амжилттай");
    } catch (error) {
      message.error("Амжилтгүй");
    }
  };

  const fetchData = async () => {
    const res = await anythingAPI.getQ2(id);
    if (res) {
      setQuestionTwo(res);
      setInitialValues(res?.any);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={id ? validationSchema : validationSchema_phone}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form layout="vertical">
        {id ? null : (
          <Row justify="center">
            <Col span={12}>
              <Card>
                <Form.Item name="phone" label="Утас">
                  <Input name="phone" placeholder="Утас"/>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        )}
        <br />
        <Row gutter={100} justify="center">
          <Col>
            <QuestionCard
              name="q1"
              image="/images/q2/1.jpg"
              button1="Нүх"
              button2="Нүд"
              button3="Үхэл"
              button4="Нүүр"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q2"
              image="/images/q2/2.jpg"
              button1="Дуссан цай"
              button2="Шээс"
              button3="Галт уулын хайлмаг"
              button4="Хуванцар хэсгүүд"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q3"
              image="/images/q2/3.jpg"
              button1="Зугаг"
              button2="Харь гарагийн  амьтан"
              button3="Цацсан будаг"
              button4="Жимстэй зайрмаг"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q4"
              image="/images/q2/4.jpg"
              button1="Теннисийн бөмбөг"
              button2="Хөлбөмбөгийн талбай"
              button3="Чихэр"
              button4="Эм тан"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q5"
              image="/images/q2/5.jpg"
              button1="Будаг сумны мөр"
              button2="Гавлын яс"
              button3="Хайлсан M&M"
              button4="Өлсөглөн жаран хөлт"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q6"
              image="/images/q2/6.jpg"
              button1="Шарсан өндөг"
              button2="Манго жимс"
              button3="Жаран хөлт"
              button4="Галийн бөл"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q7"
              image="/images/q2/7.jpg"
              button1="Вен диаграм"
              button2="Тархины хэсэг"
              button3="Зайрмаг"
              button4="Далайн мөгөөрс"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q8"
              image="/images/q2/8.jpg"
              button1="Бохь"
              button2="Жимс"
              button3="Нохой"
              button4="Диснейн баатар"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q9"
              image="/images/q2/9.jpg"
              button1="Цус"
              button2="Нар"
              button3="Хүний эс"
              button4="Шавьж"
            />
          </Col>
          <Col>
            <QuestionCard
              name="q10"
              image="/images/q2/10.jpg"
              button1="Дуссан бэх"
              button2="Нулимас"
              button3="Абстракт урлаг"
              button4="Нян"
            />
          </Col>
        </Row>
        <SubmitButton block icon={<SaveOutlined />}>
          Хадаглах
        </SubmitButton>
      </Form>
    </Formik>
  );
}

export default memo(Question2);
