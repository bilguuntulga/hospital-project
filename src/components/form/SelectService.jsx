import { Skeleton } from "antd";
import { Select } from "formik-antd";
import React, { memo, useEffect, useState } from "react";
import { servicesAPI } from "../../apis";

function SelectService({ name, multi = false, type }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    var res;

    switch (type?.toLowerCase()) {
      case "basic":
        res = await servicesAPI.getBasics();
        break;
      case "additional":
        res = await servicesAPI.getAdditional();
        break;
      default:
        res = await servicesAPI.list();
        break;
    }

    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Skeleton paragraph={{ rows: 0 }} />;

  return (
    <Select name={name} mode={multi ? "multiple" : ""} showSearch>
      {data?.map((e, i) => (
        <Select.Option key={e + i} value={e?.id}>
          {e?.name}
        </Select.Option>
      ))}
    </Select>
  );
}

export default memo(SelectService);
