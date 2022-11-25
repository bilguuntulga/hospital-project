import { Skeleton } from "antd";
import { Select } from "formik-antd";
import React, { memo, useEffect, useState } from "react";
import { doctorAPI } from "../../apis";

function SelectDoctor({ name, multi = false }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const res = await doctorAPI.list();
        setData(res);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Skeleton paragraph={{ rows: 0 }} />

    return (
        <Select name={name} mode={multi ? "multiple" : ""} showSearch={true}>
            {data.map((e, i) => (
                <Select.Option key={i} value={e?.id}>
                    {`${e?.first_name} ${e?.last_name}`}
                </Select.Option>
            ))}
        </Select>
    );
}

export default memo(SelectDoctor);
