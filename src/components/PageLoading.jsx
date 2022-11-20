import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

function PageLoading() {
  return (
    <div className="page_loading_container">
      <Spin
        indicator={<LoadingOutlined spin style={{ fontSize: "2.5rem" }} />}
      />
    </div>
  );
}

export default PageLoading;
