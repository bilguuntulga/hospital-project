import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Image,
  Row,
  Table,
  Modal,
  Col,
  message,
  Divider,
  Tooltip,
  PageHeader,
  Space,
} from "antd";
import { Formik } from "formik";
import { Form, Input, Select } from "formik-antd";
import React, { memo, useEffect, useState } from "react";
import { usersAPI } from "../../apis";
import * as yup from "yup";
import ProfileImageUpload from "../../components/form/ProfileImageUpload";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
const { confirm } = Modal;

const model = {
  first_name: "",
  last_name: "",
  role: "",
  phone: "",
  profile_img: "",
  email: "",
  username: "",
  password: "",
};

function Work_user_page() {
  const [userlist, setUserList] = useState();
  const [oneuserdata, setOneUserData] = useState(model);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const showModal = async (id) => {
    const oneRes = await usersAPI.get(id);
    setOneUserData(oneRes);
    setIsModalOpen(true);
  };
  const showDeleteConfirm = async (id) => {
    const res = await usersAPI.get(id);
    confirm({
      title: `${res?.first_name}${res?.last_name} ажилтныг устгахдаа итгэлтэй байна уу ??`,
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      okText: "Тийм",
      okType: "danger",
      cancelText: "Үгүй",
      onOk: async () => {
        toast.promise(
          async () => {
            await usersAPI.remove(id);
            await fetchData();
          },
          {
            pending: "Хадаглаж байна",
            error: "Амжилтгүй",
            success: "Амжилттай",
          }
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("Заавал бөглөнө үү."),
    last_name: yup.string().required("Заавал бөглөнө үү."),
    role: yup.string().required("Заавал бөглөнө үү."),
    phone: yup.string().required("Заавал бөглөнө үү."),
    profile_img: yup.string().required("Заавал бөглөнө үү."),
    email: yup.string().email().required("Заавал бөглөнө үү."),
    username: yup.string().required("Заавал бөглөнө үү."),
    password: yup.string().optional(),
  });

  const onSubmit = async (values) => {
    if (!values.password) delete values.password;
    delete values.created_by;
    delete values.updated_by;
    toast.promise(
      async () => {
        if (values.id) await usersAPI.update(values);
        else await usersAPI.create(values);

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

  const onCreate = async () => {
    setOneUserData(model);
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await usersAPI.list();
    setUserList(res);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Зураг",
      render: (_, row) => (
        <>
          <Image src={row?.profile_img} width="50px" height="50px" />
        </>
      ),
      key: "phone",
    },
    {
      title: "Нэр",
      render: (_, row) => `${row?.first_name} ${row?.last_name}`,
    },
    {
      title: "Утас",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "И-мэйл",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Үйлдэл",
      render: (_, row) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(row.id)} />
          <Button
            icon={<DeleteOutlined onClick={() => showDeleteConfirm(row.id)} />}
          />
        </Space>
      ),
    },
  ];

  if (loading) return <PageLoading />;

  return (
    <>
      <PageHeader
        title="Ажилтан"
        extra={
          <Button onClick={onCreate} icon={<FileAddOutlined />}>
            Нэмэх
          </Button>
        }
      />
      <Table columns={columns} dataSource={userlist} />
      <Modal
        title={`${
          oneuserdata?.first_name == ""
            ? "Хэрэглэгч нэмэх"
            : oneuserdata?.first_name
        } ${oneuserdata?.last_name}  Засварлах`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Formik
          onSubmit={onSubmit}
          initialValues={oneuserdata}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form layout="vertical">
            <Row justify="center">
              <Col>
                <Form.Item label="" name="profile_img">
                  <ProfileImageUpload name="profile_img" />
                </Form.Item>
              </Col>
            </Row>
            <Divider>Ерөнхий мэлээлэл</Divider>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Овог" name="first_name">
                  <Input name="first_name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Нэр" name="last_name">
                  <Input name="last_name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Утас" name="phone">
                  <Input name="phone" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="И-мэйл" name="email">
                  <Input name="email" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="ҮҮрэг" name="role">
              <Select name="role">
                <Select.Option value="WORKER">Ажилчин</Select.Option>
                <Select.Option value="ADMIN">Админ</Select.Option>
              </Select>
            </Form.Item>
            <Divider>Нэвтрэх мэлээлэл</Divider>
            <Form.Item label="Нэвтэрэх нэр" name="username">
              <Input name="username" />
            </Form.Item>
            <Form.Item label="Нууц үг" name="password">
              <Tooltip title="Бөглөхгүй байж болно.">
                <Input.Password name="password" />
              </Tooltip>
            </Form.Item>
            <Button
              style={{ width: "100%" }}
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              Хадаглаж
            </Button>
          </Form>
        </Formik>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default memo(Work_user_page);
