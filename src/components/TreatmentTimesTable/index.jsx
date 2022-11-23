import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { treatmentTimesAPI } from "../../apis";
import TimeListItem from "./TimeListItem";

function TreatmentTimesTable({ refreshRef }) {
  const [loading, setLoading] = useState(true);
  const [times, setTimes] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await treatmentTimesAPI.future();
    setTimes(res);
    setLoading(false);
  };

  useEffect(() => {
    refreshRef.current = fetchData;
    fetchData();
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="treatment_times_table">
      <div className="treatment_times_table_header">
        <div className="header_title">Хэрэглэгч</div>
        <div className="header_title">Эмч</div>
        <div className="header_title">Цаг</div>
      </div>
      <div className="times_list_wrapper">
        {times.map((time, i) => (
          <TimeListItem
            key={time?.id ?? i}
            id={time.id}
            customerImage={time?.customer?.image}
            customerName={`${time?.customer?.first_name} ${time?.customer?.last_name}`}
            customerPhone={time?.customer?.phone}
            doctorImage={time?.doctor?.profile_img}
            doctorName={`${time?.doctor?.first_name} ${time?.doctor?.last_name}`}
            doctorPhone={time?.doctor?.phone}
            startTime={time?.start_time}
            endTime={time?.end_time}
            refreshTable={fetchData}
          />
        ))}
      </div>
    </div>
  );
}

export default TreatmentTimesTable;
