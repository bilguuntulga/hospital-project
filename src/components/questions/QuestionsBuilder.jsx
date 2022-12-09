import { SaveOutlined } from "@ant-design/icons";
import { message, Skeleton } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { anythingAPI, questionsAPI } from "../../apis";
import { convertToHex } from "../../utils/functions";

function QuestionsBuilder({ id, customer_id }) {
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState();
  const [questionsValue, setQuestionsValue] = useState();

  const fetchData = async () => {
    setLoading(true);
    const res = await questionsAPI.get(id);

    if (res) {
      let tempInitial = {};
      res?.questions?.forEach((q) => {
        tempInitial[`q${convertToHex(q?.label)}`] = "";
      });

      setInitialValues(tempInitial);
    }

    if (customer_id) {
      try {
        const res = await anythingAPI.findCustomerQuestions(id, customer_id);
        if (res) {
          setQuestionsValue(res);
          setInitialValues(res?.any);
        }
      } catch (error) {}
    }

    setQuestions(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (customer_id) {
        if (questionsValue) {
          await anythingAPI.update({
            id: questionsValue?.id,
            any: {
              ...values,
              question_id: id,
              customer_id,
            },
          });
        } else {
          await anythingAPI.create({
            any: {
              ...values,
              question_id: id,
              customer_id,
            },
          });
        }
      } else {
        await anythingAPI.create({
          any: {
            ...values,
            question_id: id,
          },
        });
      }

      message.success("Амжилттай");
    } catch (error) {
      message.error("Амжилтгүй");
    }
  };

  if (loading) return <Skeleton />;

  return (
    <div>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        <Form layout="vertical">
          {customer_id ? null : (
            <Form.Item label="Утас" name="customer_phone">
              <Input name="customer_phone" />
            </Form.Item>
          )}
          {questions?.questions?.map((question) => (
            <Form.Item
              label={question?.label}
              name={`q${convertToHex(question?.label)}`}
            >
              <Input name={`q${convertToHex(question?.label)}`} />
            </Form.Item>
          ))}
          <SubmitButton icon={<SaveOutlined />}>Хадаглаж</SubmitButton>
        </Form>
      </Formik>
    </div>
  );
}

export default memo(QuestionsBuilder);
