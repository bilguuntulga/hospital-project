import React, { useState } from "react";
import moment from "moment/moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { treatmentTimesAPI } from "../../apis";
import TreatmentTimeForm from "../form/TreatmentTimeForm";
const { confirm } = Modal;

function TimeListItem({
  id,
  customerImage,
  customerName,
  customerPhone,
  doctorImage,
  doctorName,
  doctorPhone,
  startTime,
  endTime,
  refreshTable,
}) {
  const [showModal, setShowModal] = useState(false);

  const remove = async () => {
    confirm({
      title: "Цаг устгах",
      content: (
        <div>
          <div>Эмч: {doctorName}</div>
          <div>Үйлчлүүлэгч: {customerName}</div>
          <div>
            {moment(startTime).format("YYYY/MM/DD HH:mm:ss")}-
            {moment(endTime).format("HH:mm:ss")}
          </div>
          <div>Та энэ цагийг устгах даа итгэлтэй байна уу?</div>
        </div>
      ),
      okText: "Тийм",
      cancelText: "Үгүй",
      onOk: async () => {
        await toast.promise(
          async () => {
            await treatmentTimesAPI.remove(id);
          },
          {
            pending: "Устгаж байна",
            success: "Амжилттай",
            error: "Амжилтгүй",
          }
        );

        await refreshTable();
      },
    });
  };

  return (
    <>
      <div className="time_list_item">
        <div className="profile_wrapper">
          <div className="time_list_item_image_wrapper">
            <img src={customerImage} alt={customerName} />
          </div>
          <div>
            <div className="name">{customerName}</div>
            <div className="phone">{customerPhone}</div>
          </div>
        </div>
        <div className="profile_wrapper">
          <div className="time_list_item_image_wrapper">
            <img src={doctorImage} alt={doctorName} />
          </div>
          <div>
            <div className="name">{doctorName}</div>
            <div className="phone">{doctorPhone}</div>
          </div>
        </div>
        <div className="date_wrapper">
          <div>
            {moment(startTime).format("YYYY/MM/DD HH:mm:ss")}-
            {moment(endTime).format("HH:mm:ss")}
          </div>
          <div className="actions_wrapper">
            <div className="edit_time" onClick={() => setShowModal(true)}>
              <EditOutlined />
            </div>
            <div className="delete_time" onClick={remove}>
              <DeleteOutlined />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showModal}
        title="Цаг засах"
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <TreatmentTimeForm id={id} refreshTable={refreshTable} />
      </Modal>
      <ToastContainer />
    </>
  );
}

export default TimeListItem;
