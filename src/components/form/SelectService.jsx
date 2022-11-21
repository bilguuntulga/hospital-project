import { Select } from 'formik-antd'
import React, { memo, useEffect, useState } from 'react'
import { servicesAPI } from '../../apis';

function SelectService({ name, multi = false }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const res = await servicesAPI.list();
        setData(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Select name={name} loading={loading} mode={multi ? "multiple" : ""}>
            {
                data.map((e, i) => <Select.Option key={i} value={e?.id}>{e?.name}</Select.Option>)
            }
        </Select>
    )
}

export default memo(SelectService)