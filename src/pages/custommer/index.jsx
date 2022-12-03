import {
  Button,
  Col,
  Input,
  Pagination,
  Row,
  Skeleton,
  Space,
  Select,
  Table,
  PageHeader,
  Image,
} from "antd";
import Customers from "../../components/Customers";
import React, { memo, useEffect, useRef, useState } from "react";
import { customerAPI, paginationAPI } from "../../apis";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import RoundedImage from "../../components/RoundedImage";

const CustomerPage = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [rate, setRate] = useState("ALL");
  const [gender, setGenter] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const nameRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    setLoading(false);
  };

  const paginationOnChange = async (page, pageSize) => {
    setPageSize(pageSize);
    setPage(page);
  };

  const onSearch = async (values) => {
    setLoading(true);
    const res = await customerAPI.search({
      name: values,
      email: values,
      phone: values,
    });
    setCustomers(res);
    setLoading(false);
  };

  const columns = [
    {
      render: (_, row) => <RoundedImage image={row?.image} size={40} />,
    },
    {
      title: "Нэр",
      render: (_, row) => (
        <>
          {row?.first_name} {row?.last_name}
        </>
      ),
    },
    {
      title: "Хүйс",
      render: (_, row) => (row.gender == "MALE" ? "Эрэгтэй" : "Эмэгтэй"),
    },
    {
      title: "Утасны дугаар",
      dataIndex: "phone",
    },
    {
      title: "Үнэлгээ",
      render: (_, row) => (
        <div
          className={row.rate == "GOOD" ? "good" : "bad"}
          style={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            border: "none",
          }}
        />
      ),
    },
    {
      title: "",
      render: (_, row) => (
        <Link to={`/customer/${row?.id}`}>
          <Button>Дэлгэрэнгүй</Button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    paginationAPI
      .list({
        rate: rate,
        gender: gender,
        type: type,
        page: page,
        page_size: pageSize,
      })
      .then((res) => {
        setTotal(res?.meta?.total);
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [rate, type, gender, page, pageSize]);

  return (
    <div className="customer__container">
      <Space direction="vertical" style={{ width: "100%" }}>
        <PageHeader
          title={
            <div className="search__container">
              <Row align="middle" justify="center" gutter={[30, 30]}>
                <Col xl={7} lg={8}>
                  <Input
                    ref={nameRef}
                    placeholder="Хайх"
                    suffix={
                      <img
                        src="search_icon.png"
                        onClick={() =>
                          onSearch(
                            nameRef?.current?.input?.value.toString().trim()
                          )
                        }
                      />
                    }
                  />
                </Col>
                <Col xl={5} lg={8}>
                  <div className="select___conataienr">
                    <div>Үнэлгээ: </div>
                    <div>
                      <Select
                        style={{ width: "100px" }}
                        onChange={setRate}
                        defaultValue="ALL"
                      >
                        <Select.Option value="GOOD">Сайн</Select.Option>
                        <Select.Option value="BAD">Муу</Select.Option>
                        <Select.Option value="ALL">Бүгд</Select.Option>
                      </Select>
                    </div>
                  </div>
                </Col>
                <Col xl={5} lg={8}>
                  <div className="select___conataienr">
                    <div>Хүйс: </div>
                    <Select
                      style={{ width: "100px" }}
                      onChange={setGenter}
                      defaultValue="ALL"
                    >
                      <Select.Option value="MALE">Эрэгтэй</Select.Option>
                      <Select.Option value="FEMALE">Эмэгтэй</Select.Option>
                      <Select.Option value="ALL">Бүгд</Select.Option>
                    </Select>
                  </div>
                </Col>
                <Col xl={5} lg={8}>
                  <div className="select___conataienr">
                    <div>Төрөл: </div>
                    <Select
                      style={{ width: "100px" }}
                      onChange={setType}
                      defaultValue="ALL"
                    >
                      <Select.Option value="REGISTERED">
                        Бүртгэлтэй
                      </Select.Option>
                      <Select.Option value="ADVICE"> Зөвөлгөө</Select.Option>
                      <Select.Option value="ALL">Бүгд</Select.Option>
                    </Select>
                  </div>
                </Col>
              </Row>
            </div>
          }
          extra={
            <Link to="create">
              <Button icon={<PlusOutlined />}>Нэмэх</Button>
            </Link>
          }
        />
        {/* <div
          style={{
            width: "100%",
            height: "69px",
            backgroundColor: "#D6ECFD",
            borderRadius: "15px",
            padding: "20px",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Row style={{ width: "100%" }} align="middle" justify="space-between">
            <Col span={4}>Үйлчлүүлэгчийн нэр</Col>
            <Col span={4}>И-мэйл</Col>
            <Col span={4}>Хүйс</Col>
            <Col span={4}>Утасны дугаар</Col>
            <Col span={4}>Үнэлгээ</Col>
            <Col span={4}></Col>
          </Row>
        </div> */}
        {/* {loading ? (
          <Skeleton />
        ) : (
          customers.map((e) => (
            <Customers
              image={e?.image}
              id={e.id}
              name={`${e?.first_name} ${e?.last_name}`}
              birthday={e.email}
              gender={e.gender}
              phone={e.phone}
              rate={e?.rate}
            />
          ))
        )} */}
        <Table
          columns={columns}
          dataSource={customers}
          pagination={false}
          loading={loading}
        />
        <Row justify="end">
          <Col span={24}>
            <Pagination
              onChange={paginationOnChange}
              total={total}
              pageSize={pageSize}
              current={page}
              pageSizeOptions={[10, 20, 30]}
            />
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default memo(CustomerPage);
