import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Skeleton, Space } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { memo } from "react";
import { useClickAnyWhere } from "usehooks-ts";

function QuestionsOptions({ name, value, setFieldValue }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    if (value?.options) {
      setOptions(value?.options);
    }
    setLoading(false);
  };

  useClickAnyWhere(() => {
    setFieldValue(name, {
      ...value,
      options: options,
    });
  });

  const onInputChange = (index, value) => {
    options[index] = value;
    setOptions(options);
  };

  const deleteOption = (index) => {
    const temp = [];

    for (let i = 0; i < options.length; i++) {
      if (i != index) {
        temp.push(options[i]);
      }
    }

    setOptions(temp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFieldValue(name, {
      ...value,
      options: options,
    });
  }, [options]);

  if (loading) return <Skeleton paragraph={{ rows: 0 }} />;

  return (
    <div className="questions_options_wrapper">
      <Space wrap>
        {options?.map((option, i) => (
          <Input
            key={option + i}
            defaultValue={option}
            suffix={
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => deleteOption(i)}
              />
            }
            onChange={(e) => onInputChange(i, e?.target?.value)}
          />
        ))}
        <Button onClick={() => setOptions([...options, ""])}>
          Сонгол нэмэх
        </Button>
      </Space>
    </div>
  );
}

export default memo(QuestionsOptions);
