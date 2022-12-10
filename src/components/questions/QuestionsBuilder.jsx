import { SaveOutlined } from "@ant-design/icons";
import { Image, message, Skeleton } from "antd";
import { Formik } from "formik";
import { Form, Input, Radio, SubmitButton } from "formik-antd";
import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { anythingAPI, questionsAPI } from "../../apis";
import { convertToHex } from "../../utils/functions";
import { QuestionType } from "./QuestionsForm";

export function QuestionTypeConverter(question) {
  switch (question?.type) {
    case QuestionType.Text:
      return (
        <Form.Item
          label={question?.label}
          name={`q${convertToHex(question?.label)}`}
        >
          <Input name={`q${convertToHex(question?.label)}`} />
        </Form.Item>
      );
    case QuestionType.Radio:
      return (
        <Form.Item
          label={question?.label}
          name={`q${convertToHex(question?.label)}`}
        >
          <Radio.Group name={`q${convertToHex(question?.label)}`}>
            {question?.options?.map((option) => (
              <Radio value={`o${convertToHex(option)}`}>{option}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      );
    case QuestionType.Image:
      return (
        <div>
          <p>{question?.label}</p>
          <Image src={question?.data} height={200} />
          <Form.Item name={`q${convertToHex(question?.label)}`}>
            <Radio.Group name={`q${convertToHex(question?.label)}`}>
              {question?.options?.map((option) => (
                <Radio value={`o${convertToHex(option)}`}>{option}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </div>
      );
    default:
      return null;
  }
}

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
    <div className="questions_builder_wrapper">
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        <Form layout="vertical">
          <div className="questions_builder_wrapper_questions">
            {customer_id ? null : (
              <Form.Item label="Утас" name="customer_phone">
                <Input name="customer_phone" />
              </Form.Item>
            )}
            {questions?.questions?.map((question) =>
              QuestionTypeConverter(question)
            )}
          </div>
          <SubmitButton icon={<SaveOutlined />}>Хадаглаж</SubmitButton>
        </Form>
      </Formik>
    </div>
  );
}

export default memo(QuestionsBuilder);
