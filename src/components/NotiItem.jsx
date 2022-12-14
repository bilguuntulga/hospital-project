import React, { useState } from "react";
import moment from "moment/moment";
import { treatmentTimesAPI } from "../apis";
import { Card, Col, Descriptions, Modal, Row } from "antd";
import { genderTranslator } from "../utils/functions";

function NotiItem({ id, image, name, phone, startTime, seen, refreshNotis }) {
  const [time, setTime] = useState({});
  const [showModal, setShowModal] = useState(false);

  const getNotification = async () => {
    const res = await treatmentTimesAPI.getNotification(id);
    setTime(res);
    refreshNotis();
    setShowModal(true);
  };

  return (
    <>
      <div
        className={`notification_item ${seen ? "notification_item_seen" : ""}`}
        onClick={getNotification}
      >
        <div className="notification_item_image_wrapper">
          <img src={image} alt={name} />
        </div>
        <div className="notification_item_customer_info">
          <div className="notification_item_customer_info_name">{name}</div>
          <div className="notification_item_customer_info_phone">{phone}</div>
        </div>
      </div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div className="notification_detail_wrapper">
          <Card
            title={
              <Row justify={"space-between"}>
                <Col span={12}>Үйлчлүүлэгч</Col>
                <Col span={12}>Эмч</Col>
              </Row>
            }
          >
            <div className="notification_detail_wrapper_customer_doctor">
              <div className="notification_detail_wrapper_profile_wrapper">
                <div className="notification_detail_wrapper_profile_wrapper_image_wrapper">
                  <img
                    src={time?.customer?.image ?? "/images/profile_img.jpg"}
                    alt={`${time?.customer?.first_name} ${time?.customer?.last_name}`}
                  />
                </div>
                <div>
                  <div>{`${time?.customer?.first_name} ${time?.customer?.last_name}`}</div>
                  <div>
                    {time?.customer?.phone}{" "}
                    {genderTranslator(time?.customer?.gender)}
                  </div>
                </div>
              </div>
              <div className="notification_detail_wrapper_profile_wrapper">
                <div className="notification_detail_wrapper_profile_wrapper_image_wrapper">
                  <img
                    src={time?.doctor?.profile_img ?? "/images/profile_img.jpg"}
                    alt={`${time?.doctor?.first_name} ${time?.doctor?.last_name}`}
                  />
                </div>
                <div>
                  <div>{`${time?.doctor?.first_name} ${time?.doctor?.last_name}`}</div>
                  <div>{time?.doctor?.phone}</div>
                </div>
              </div>
            </div>
          </Card>
          <br />
          <Descriptions bordered layout="vertical">
            <Descriptions.Item label="Эхлэх цаг">
              {moment(time?.start_time).format("YYYY/MM/DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Дуусах цаг">
              {moment(time?.end_time).format("YYYY/MM/DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
    </>
  );
}

export default NotiItem;
