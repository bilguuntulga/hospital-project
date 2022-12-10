import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  SaveOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Input as AntInput,
  message,
  Select as AntSelect,
  Skeleton,
  Space,
  Tooltip,
} from "antd";
import { Field, FieldArray, Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { questionsAPI } from "../../apis";
import QuestionsImage from "./QuestionsImage";
import QuestionsOptions from "./QuestionsOptions";

const model = {
  title: "",
  questions: [],
};

export const QuestionType = {
  Text: "TEXT",
  Radio: "RADIO",
  Image: "IMAGE",
};

function QuestionsForm({ id }) {
  const [initialValues, setInitialValues] = useState(model);
  const [loading, setLoading] = useState(id ? true : false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const questions = await questionsAPI.get(id);
    if (questions) {
      delete questions?.created_by;
      delete questions?.updated_by;
      setInitialValues(questions);
    } else {
      navigate(-1);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  const onSubmit = async (values) => {
    try {
      if (id) {
        await questionsAPI.update({
          id,
          ...values,
        });
      } else {
        await questionsAPI.create(values);
      }

      message.success("Амжилттай");
      navigate(-1);
    } catch (error) {
      message.error("Амжилтгүй");
    }
  };

  if (loading) return <Skeleton />;

  return (
    <div className="questions_from_wrapper">
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        {({ values }) => (
          <Form layout="vertical">
            <Form.Item name="title" label="Гарчиг">
              <Input name="title" />
            </Form.Item>
            <Form.Item name="questions" label="Асуултууд">
              <FieldArray name="questions">
                {(arrayHelpers) => (
                  <div className="questions_list_wrapper">
                    {values?.questions?.map((question, index) => (
                      <div key={question + index}>
                        {index != 0 ? <Divider /> : null}
                        <Field name={`questions.${index}`}>
                          {({ field: { value }, form: { setFieldValue } }) => (
                            <div className="questions_list_item">
                              <div>
                                <Space>
                                  <AntInput
                                    defaultValue={value?.label}
                                    onChange={(e) =>
                                      setFieldValue(`questions.${index}`, {
                                        ...value,
                                        label: e?.target?.value,
                                      })
                                    }
                                  />
                                  <AntSelect
                                    defaultValue={value?.type}
                                    onChange={(selectedValue) =>
                                      setFieldValue(`questions.${index}`, {
                                        ...value,
                                        type: selectedValue,
                                      })
                                    }
                                  >
                                    <AntSelect.Option value={QuestionType.Text}>
                                      Текст
                                    </AntSelect.Option>
                                    <AntSelect.Option
                                      value={QuestionType.Radio}
                                    >
                                      Сонголт
                                    </AntSelect.Option>
                                    <AntSelect.Option
                                      value={QuestionType.Image}
                                    >
                                      Зураг
                                    </AntSelect.Option>
                                  </AntSelect>
                                  <Tooltip title="Дээр шинэ асуулт үүсгэх">
                                    <Button
                                      icon={<PlusOutlined />}
                                      onClick={() =>
                                        arrayHelpers.insert(index, {
                                          label: "",
                                          type: QuestionType.Text,
                                        })
                                      }
                                    />
                                  </Tooltip>
                                  <Tooltip title="Энэ асуултыг устгах">
                                    <Button
                                      icon={<DeleteOutlined />}
                                      onClick={() => arrayHelpers.remove(index)}
                                    />
                                  </Tooltip>
                                </Space>
                                {value?.type == QuestionType.Image ? (
                                  <QuestionsImage
                                    name={`questions.${index}`}
                                    value={value}
                                    setFieldValue={setFieldValue}
                                  />
                                ) : null}
                                {value?.type != QuestionType.Text ? (
                                  <QuestionsOptions
                                    name={`questions.${index}`}
                                    value={value}
                                    setFieldValue={setFieldValue}
                                  />
                                ) : null}
                              </div>
                              <div>
                                <Space direction="vertical">
                                  <Button
                                    icon={<UpOutlined />}
                                    disabled={index <= 0}
                                    onClick={() =>
                                      arrayHelpers.move(index, index - 1)
                                    }
                                  />
                                  <Button
                                    icon={<DownOutlined />}
                                    disabled={
                                      index >= values?.questions?.length - 1
                                    }
                                    onClick={() =>
                                      arrayHelpers.move(index, index + 1)
                                    }
                                  />
                                </Space>
                              </div>
                            </div>
                          )}
                        </Field>
                      </div>
                    ))}
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() =>
                        arrayHelpers.push({
                          label: "",
                          type: QuestionType.Text,
                        })
                      }
                    >
                      Асуулт нэмэх
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Form.Item>
            <SubmitButton icon={<SaveOutlined />}>Хадаглах</SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default memo(QuestionsForm);
