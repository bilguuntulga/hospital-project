import { Field, FieldArray } from "formik";
import React, { memo } from "react";

function ExperiencesField({ name, values }) {
  return (
    <div className="experiences_field_wrapper">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div className="space_elements">
            {values[name] && values[name].length > 0 ? (
              values[name].map((e, index) => {
                return (
                  <div key={index} className="experience_wrapper">
                    <Field name={`${name}.${index}`}>
                      {({
                        field: { name: field_name, value: field_value },
                        form: { setFieldValue },
                      }) => (
                        <div className="inputs_wrapper">
                          <input
                            defaultValue={field_value.date}
                            placeholder="Он"
                            onChange={(e) => {
                              field_value.date = e.target.value;
                              setFieldValue(field_name, field_value);
                              console.log(field_value);
                            }}
                          />
                          <input
                            defaultValue={field_value.desc}
                            placeholder="Хаана"
                            onChange={(e) => {
                              field_value.desc = e.target.value;
                              setFieldValue(field_name, field_value);
                              console.log(field_value);
                            }}
                          />
                          <input
                            defaultValue={field_value.role}
                            placeholder="Мэргэжил"
                            onChange={(e) => {
                              field_value.role = e.target.value;
                              setFieldValue(field_name, field_value);
                              console.log(field_value);
                            }}
                          />
                        </div>
                      )}
                    </Field>
                    <button
                      className="experience_action_button bg-green text-white rounded-full"
                      type="button"
                      onClick={() =>
                        arrayHelpers.insert(index, {
                          date: "",
                          desc: "",
                          role: "",
                        })
                      }
                    >
                      +
                    </button>
                    <button
                      className="experience_action_button bg-red text-white rounded-full"
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                  </div>
                );
              })
            ) : (
              <button
                type="button"
                onClick={() =>
                  arrayHelpers.push({
                    date: "",
                    desc: "",
                    role: "",
                  })
                }
              >
                Туршлага нэмэх
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default memo(ExperiencesField);
