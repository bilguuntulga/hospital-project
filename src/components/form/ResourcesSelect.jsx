import React, { useEffect, useState } from "react";
import { Field, FieldArray } from "formik";
import { resourceAPI } from "../../apis";
import { Button, Col, Input, Row, Select, Skeleton } from "antd";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

function ResourcesSelect({ values, name }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await resourceAPI.list();
    setResources(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSelectResource = async (value, resourceId, name, setFieldValue) => {
    await setFieldValue(name, {
      ...value,
      resource: resourceId,
    });
  };

  const onQuantityChnage = (value, quantity, name, setFieldValue) => {
    setFieldValue(name, {
      ...value,
      quantity,
    });
  };

  const validate = (value) => {
    if (!value?.resource || !value.quantity) {
      return "Заавал бөглөнө үү";
    }

    if (value?.quantity <= 0) {
      return "Нөөц 0-ээс их байна";
    }

    return;
  };

  if (loading) return <Skeleton paragraph={{ rows: 0 }} />;

  return (
    <FieldArray name={name}>
      {(arrayHelpers) => (
        <>
          {values[name] && values[name]?.length > 0
            ? values[name]?.map((resource, i) => (
                <Field name={`${name}.${i}`}>
                  {({ field: { value, name }, form: { setFieldValue } }) => (
                    <>
                      <Row gutter={20} style={{ marginBottom: "1rem" }}>
                        <Col span={11}>
                          <Select
                            onChange={(resourceId) =>
                              onSelectResource(
                                value,
                                resourceId,
                                name,
                                setFieldValue
                              )
                            }
                            defaultValue={value?.resource}
                          >
                            {resources.map((e, i) => (
                              <Select.Option key={i} value={e?.id}>
                                {e?.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Col>
                        <Col span={11}>
                          <Input
                            type="number"
                            defaultValue={value?.quantity}
                            onChange={(e) =>
                              onQuantityChnage(
                                value,
                                +e?.target?.value,
                                name,
                                setFieldValue
                              )
                            }
                          />
                        </Col>
                        <Col span={2}>
                          <Button
                            icon={<CloseOutlined />}
                            onClick={() => arrayHelpers.remove(i)}
                            className="delete__button"
                          />
                        </Col>
                      </Row>
                    </>
                  )}
                </Field>
              ))
            : null}
          <Button
            onClick={() =>
              arrayHelpers.push({
                resource: "",
                quantity: 0,
              })
            }
            block
            icon={<PlusOutlined />}
          >
            Нөөц нэмэх
          </Button>
        </>
      )}
    </FieldArray>
  );
}

export default ResourcesSelect;
