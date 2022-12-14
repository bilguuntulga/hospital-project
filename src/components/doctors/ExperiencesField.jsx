import {
  ArrowLeftOutlined,
  CloseOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Button, Input, PageHeader } from "antd";
import { Field, FieldArray } from "formik";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

function ExperiencesField({ name, values }) {
  return (
    <>
      <div className="experiences_field_wrapper">
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <div className="space_elements">
              {values[name] && values[name].length > 0
                ? values[name]?.map((e, index) => {
                    return (
                      <div key={index} className="experience_wrapper">
                        <Field name={`${name}.${index}`}>
                          {({
                            field: { name: field_name, value: field_value },
                            form: { setFieldValue },
                          }) => (
                            <div className="inputs_wrapper">
                              <Input
                                style={{ width: "100%" }}
                                defaultValue={field_value.date}
                                placeholder="Он"
                                onChange={(e) => {
                                  field_value.date = e.target.value;
                                  setFieldValue(field_name, field_value);
                                }}
                              />
                              <Input
                                style={{ width: "100%" }}
                                defaultValue={field_value.desc}
                                placeholder="Хаана"
                                onChange={(e) => {
                                  field_value.desc = e.target.value;
                                  setFieldValue(field_name, field_value);
                                }}
                              />
                              <Input
                                style={{ width: "100%" }}
                                defaultValue={field_value.role}
                                placeholder="Мэргэжил"
                                onChange={(e) => {
                                  console.log(e);
                                  field_value.role = e.target.value;
                                  setFieldValue(field_name, field_value);
                                }}
                              />
                            </div>
                          )}
                        </Field>
                        <Button
                          onClick={() => arrayHelpers.remove(index)}
                          color="danger"
                        >
                          <CloseOutlined />
                        </Button>
                      </div>
                    );
                  })
                : ""}
              <Button
                onClick={() =>
                  arrayHelpers.push({
                    date: "",
                    desc: "",
                    role: "",
                  })
                }
                icon={<FolderAddOutlined />}
              >
                Туршлага нэмэх
              </Button>
            </div>
          )}
        />
      </div>
    </>
  );
}

export default memo(ExperiencesField);
