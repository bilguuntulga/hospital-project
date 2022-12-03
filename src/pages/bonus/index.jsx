import React, { memo, useEffect, useState } from "react";
import {
  Table,
  Modal,
  PageHeader,
  Card,
  Button,
  message,
  Skeleton,
  Space,
  Image,
} from "antd";
import { SubmitButton, Input, Select, Form } from "formik-antd";
import { Formik } from "formik";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { bonusAPI } from "../../apis";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
const { confirm } = Modal;

const model = {
  type: "PRICE",
  discount: 0,
  condition: 0,
};

const validationSchema = yup.object().shape({
  type: yup.string().required("Заавал бөглөнө үү."),
  discount: yup.string().required("Заавал бөглөнө үү."),
  condition: yup.string().required("Заавал бөглөнө үү."),
});

const BonusPage = () => {
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [bonuslist, setBonusList] = useState([]);
  const [onebonus, setOneBonus] = useState(model);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomersModalOpen, setIsCustomersModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const userRole = JSON.parse(localStorage.getItem("user"))?.role;

  const bonusColumns = [
    {
      title: "Нөхцөл",
      dataIndex: "condition",
      key: "condition",
      render: (_, row) => `${row?.condition}₮`,
    },
    {
      title: "Төрөл",
      render: (_, row) => (row?.type == "PRICE" ? "Мөнгөөр" : "Хувиар"),
      key: "type",
    },
    {
      title: "Хямдрал",
      render: (_, row) =>
        row?.type == "PRICE" ? `${row?.discount}₮` : `${row?.discount}%`,
      ket: "discount",
    },
    {
      render: (_, row) => (
        <Space>
          <Button
            icon={<UserOutlined />}
            onClick={() => showCustomersModal(row?.id)}
          />
          {userRole == "ADMIN" ? (
            <>
              <Button
                icon={<EditOutlined onClick={() => showUpdateModal(row?.id)} />}
              />
              <Button
                icon={<DeleteOutlined />}
                className="delete__button"
                onClick={() => showDeleteConfirm(row.id)}
                danger
              />
            </>
          ) : null}
        </Space>
      ),
    },
  ];

  const customersColumns = [
    {
      title: "Зураг",
      render: (_, row) => <Image src={row?.image} height={50} />,
    },
    {
      title: "Нэр",
      render: (_, row) => `${row?.first_name} ${row?.last_name}`,
    },
    {
      render: (_, row) => (
        <Link to={`/customer/${row?.id}`}>
          <Button icon={<EyeOutlined />} />
        </Link>
      ),
    },
  ];

  const showUpdateModal = async (id) => {
    setIsModalOpen(true);
    setFormLoading(true);
    const bonus = await bonusAPI.get(id);
    setOneBonus(bonus);
    setFormLoading(false);
  };

  const showCustomersModal = async (id) => {
    setCustomersLoading(true);
    setIsCustomersModalOpen(true);
    const res = await bonusAPI.findCustomers(id);
    setCustomers(res);
    setCustomersLoading(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values) => {
    delete values.created_by;
    delete values.updated_by;
    try {
      if (values.id) {
        await bonusAPI.update(values);
        message.success("Амжилттай");
      } else {
        await bonusAPI.create(values);
        message.success("Амжилттай");
      }
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      message.error("Амжилтгүй");
    }
  };

  const showDeleteConfirm = async (id) => {
    confirm({
      title: `Устгах даа итгэлтэй байна уу?`,
      icon: <ExclamationCircleFilled />,
      okText: "Тийм",
      okType: "danger",
      cancelText: "Үгүй",
      onOk: async () => {
        try {
          await bonusAPI.remove(id);
          setOneBonus(model);
          setIsModalOpen(false);
          await fetchData();
          message.success("Амжилттай");
        } catch (error) {
          console.log(error);
          message.error("Амжилтгүй");
        }
      },
    });
  };

  const onCreate = () => {
    setOneBonus(model);
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await bonusAPI.list();
    setBonusList(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageHeader title={<ArrowLeftOutlined onClick={() => navigate(-1)} />} />
      <Card
        title="Урамшуулал"
        extra={
          userRole == "ADMIN" ? (
            <Button onClick={() => onCreate()} icon={<PlusOutlined />}>
              Нэмэх
            </Button>
          ) : null
        }
      >
        <Table
          columns={bonusColumns}
          dataSource={bonuslist}
          loading={loading}
          pagination={false}
        />
        <Modal
          title="Урамшуулал"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          {formLoading ? (
            <Skeleton />
          ) : (
            <Formik
              initialValues={onebonus}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={onSubmit}
            >
              <Form layout="vertical">
                <Form.Item name="type" label="Төрөл">
                  <Select name="type" loading={formLoading}>
                    <Select.Option value="PRICE">Мөнгөөр</Select.Option>
                    <Select.Option value="PERCENT">Хувиар</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="discount" label="Хямдрал">
                  <Input type="number" name="discount" />
                </Form.Item>
                <Form.Item name="condition" label="Үнэ">
                  <Input type="number" name="condition" />
                </Form.Item>
                <SubmitButton icon={<SaveOutlined />} block>
                  Хадаглаж
                </SubmitButton>
              </Form>
            </Formik>
          )}
        </Modal>
        <Modal
          title="Үйлчлүүлэгчид"
          open={isCustomersModalOpen}
          onOk={() => setIsCustomersModalOpen(false)}
          onCancel={() => setIsCustomersModalOpen(false)}
          footer={null}
        >
          <Table
            columns={customersColumns}
            dataSource={customers}
            loading={customersLoading}
            pagination={false}
          />
        </Modal>
      </Card>
    </>
  );
};

export default memo(BonusPage);
