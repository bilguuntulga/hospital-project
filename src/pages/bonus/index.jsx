import React, { useEffect, useState } from 'react'
import { Table, Modal, PageHeader, Card, Button, message, Tabs } from 'antd'
import { SubmitButton, Input, Select, Form } from 'formik-antd'
import { Formik, Formiki } from 'formik'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { bonusAPI } from '../../apis'
import { useNavigate } from 'react-router-dom'
import *as yup from "yup"
import { toast } from 'react-toastify'
const { confirm } = Modal



const Bonus__Page = () => {
  const [bonuslist, setBonusList] = useState([]);
  const [onebonus, setOneBonus] = useState(model)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Navigate } = useNavigate()

  const columns = [
    {
      title: "Үнэ",
      dataIndex: "condition",
      key: "condition"
    },
    {
      title: "Төрөл",
      render: (_, row) => row?.type == "PRICE" ? "Мөнгөөр" : "Хувиар",
      key: "type"
    },
    {
      title: "Хямдрал",
      render: (_, row) => row?.type == "PRICE" ? `${row?.discount} ₮` : `${row?.discount} %`,
      ket: "discount"
    },
    {
      title: "Үйлдэл",
      render: (_, row) => <><Button icon={<EditOutlined onClick={() => showModal(row?.id)} />} /> <Button icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(row.id)} danger /></>
    }
  ]

  const showModal = (id) => {
    bonusAPI.get(id).then((res) => setOneBonus(res));
    setIsModalOpen(true);
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
        message.success("Амжилттай")
      }
      else {

        await bonusAPI.create(values);
        message.success("Амжилттай")
      }
      await fetchData();
      setIsModalOpen(false)
    } catch (error) {
      message.error("Амжилтгүй")
    }

  };
  const showDeleteConfirm = async (id) => {
    confirm({
      title: `Хямдралыг устгахдаа итгэлтэй байна уу?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Тийм',
      okType: 'danger',
      cancelText: 'Үгүй',
      onOk: async () => {
        try {
          await bonusAPI.remove(id);
          setOneBonus(model);
          setIsModalOpen(false);
          message.success("Амжилттай")
          await fetchData();

        } catch (error) {
          message.error(error)
        }

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  const onCreate = () => {
    setOneBonus(model)
    setIsModalOpen(true)
  }

  const fetchData = async () => {
    const res = await bonusAPI.list();
    setBonusList(res)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <PageHeader title={<ArrowLeftOutlined onClick={() => Navigate(-1)} />} />
      <Card title="Урамшуулал" extra={<Button onClick={() => onCreate()} icon={<PlusOutlined />}>нэмэх</Button>}>
        <Tabs>
          <Tabs.TabPane tab="Хямдрал" key="1">
            <Table columns={columns} dataSource={bonuslist} />
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
              <Formik initialValues={onebonus} validationSchema={validationSchema} enableReinitialize onSubmit={onSubmit}>
                <Form layout='vertical'>
                  <Form.Item name="type" label="Төрөл">
                    <Select name='type'>
                      <Select.Option value="PRICE">
                        Мөнгөөр
                      </Select.Option>
                      <Select.Option value="PERCENT">
                        Хувиар
                      </Select.Option>
                    </Select>
                  </Form.Item >
                  <Form.Item name="discount" label="Хямдрал">
                    <Input type='number' name='discount' />
                  </Form.Item>
                  <Form.Item name="condition" label="Үнэ">
                    <Input type='number' name='condition' />
                  </Form.Item>
                  <SubmitButton icon={<SaveOutlined />} block>Хадаглаж</SubmitButton>
                </Form>
              </Formik>
            </Modal>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Хөнгөлөлт авсан үйлчлүүлэгчид " key={2}>

          </Tabs.TabPane>
        </Tabs>

      </Card>
    </>
  )
}

const model = {
  type: "",
  discount: "",
  condition: ""
}

const validationSchema = yup.object().shape({
  type: yup.string().required("Заавал бөглөнө үү."),
  discount: yup.string().required("Заавал бөглөнө үү."),
  condition: yup.string().required("Заавал бөглөнө үү."),
})

export default Bonus__Page