import { Button, Col, Modal, PageHeader, Row, Badge, Empty } from "antd";
import React, { memo, useEffect, useState } from "react";
import { createSearchParams, Link } from "react-router-dom";
import { resourceAPI } from "../../apis";
import Doctors from "../../components/doctors";
import DoctorCard from "../../components/doctors/DoctorCard";
import PageLoading from "../../components/PageLoading";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import UploadImage from "../../components/form/UploadImage";
import { toast } from "react-toastify";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;

const model = {
  image: "",
  name: "",
  quantity: 0,
};
const validationSchema = yup.object().shape({
  image: yup.string().required("Заавал бөглөнө үү."),
  name: yup.string().required("Заавал бөглөнө үү."),
  quantity: yup.number().required("Заавал бөглөнө үү."),
});

const ResourcePage = () => {
  const [user, setUser] = useState({});
  const [resources, setResources] = useState([]);
  const [oneresourceData, setOneResourceData] = useState(model);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    setLoading(true);
    const res = await resourceAPI.list();
    setResources(res);
    setLoading(false);
  };
  const onSubmit = async (values) => {
    delete values.created_by;
    delete values.updated_by;
    toast.promise(
      async () => {
        if (values.id) await resourceAPI.update(values);
        else await resourceAPI.create(values);

        await fetchData();
        setIsModalOpen(false);
      },
      {
        pending: "Хадаглаж байна",
        error: "Амжилтгүй",
        success: "Амжилттай",
      }
    );
  };

  const showDeleteConfirm = async (id) => {
    confirm({
      title: `${oneresourceData?.name} нөөцийг устгахдаа итгэлтэй байна уу?`,
      icon: <ExclamationCircleFilled />,
      okText: "Тийм",
      okType: "danger",
      cancelText: "Үгүй",
      onOk: async () => {
        toast.promise(
          async () => {
            await resourceAPI.remove(id);
            setOneResourceData(model);
            setIsModalOpen(false);
            await fetchData();
          },
          {
            pending: "Хадаглаж байна",
            error: "Амжилтгүй",
            success: "Амжилттай",
          }
        );
      },
    });
  };

  const onCreate = async () => {
    setOneResourceData(model);
    setIsModalOpen(true);
  };
  const showModal = async (id) => {
    const oneRes = await resourceAPI.get(id);
    setOneResourceData(oneRes);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <PageLoading />;

  const quantityColor = (quantity) => {
    if (quantity < 15) {
      return "#d9635b";
    } else if (quantity > 15 && quantity < 20) {
      return "#15a5b3";
    } else if (quantity > 20) {
      return "#47d6ab";
    }
  };

  return (
    <div className="resource">
      <PageHeader
        extra={
          user?.role == "ADMIN" ? (
            <Button onClick={onCreate} icon={<PlusOutlined />}>
              Нэмэх
            </Button>
          ) : null
        }
      />
      <div className="resource_wrapper">
        {resources.length > 0 ? (
          resources?.map((e) => (
            <div
              key={e?.id}
              onClick={() => (user?.role == "ADMIN" ? showModal(e.id) : null)}
            >
              <Badge.Ribbon
                text={`${e?.quantity} ширхэг`}
                color={quantityColor(e?.quantity)}
              >
                <DoctorCard image={e?.image} name={e?.name} />
              </Badge.Ribbon>
            </div>
          ))
        ) : (
          <Empty style={{ margin: "auto" }} />
        )}
      </div>
      <Modal
        title={`${
          oneresourceData?.name == "" ? "Нөөц нэмэх" : oneresourceData?.name
        }`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Formik
          onSubmit={onSubmit}
          initialValues={oneresourceData}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form layout="vertical">
            <Row justify="center">
              <Col>
                <Form.Item name="image">
                  <UploadImage name="image" width="500px" height="auto" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="name" label="Нэр">
              <Input name="name" />
            </Form.Item>
            <Form.Item name="quantity" label="Тоо ширхэг">
              <Input name="quantity" type="number" />
            </Form.Item>
            <Button block icon={<SaveOutlined />} htmlType="submit">
              Хадаглах
            </Button>
          </Form>
        </Formik>
        <br />
        {oneresourceData?.id ? (
          <Button
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(oneresourceData.id)}
            style={{ width: "100%" }}
          >
            Устгах
          </Button>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default memo(ResourcePage);
