import React, { useEffect, useState } from "react";
import { Button, Col, Empty, Row } from "antd";
import "./style.css";
import { UserOutlined } from "@ant-design/icons";
import OrderTimeCustommer from "../../components/OrderTimeCustommer";
import CLineChart from "./chart";
import PieChart from "./PieCharts";
import CunstommerNews from "../../components/Customers";
import CountUp from "react-countup";
import { customerAPI, doctorAPI, treatmentTimesAPI, today_orderAPI } from "../../apis";
import Customers from "../../components/Customers";
import TOdayOrderList from "../../components/form/TodayOrderList"

function HomePage() {
  const [todayTimesCount, setTodayTimesCount] = useState(0);
  const [customerdata, setCustomerData] = useState([])
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [adviceCount, setAdviceCount] = useState(0);
  const [orderTimeCustomer, setOrderTImeCustomer] = useState([]);
  const [todayorderdata, setTodayOrderData] = useState([]);

  const fetchData = async () => {
    treatmentTimesAPI.todayTimesCount().then((res) => setTodayTimesCount(res));
    doctorAPI.count().then((res) => setDoctorsCount(res));
    customerAPI.registeredCount().then((res) => setCustomersCount(res));
    customerAPI.adviceCount().then((res) => setAdviceCount(res));
    const res = await customerAPI.list();
    setCustomerData(res)
    const orderTime = await treatmentTimesAPI.future();
    setOrderTImeCustomer(orderTime)
    const todayOrder = await today_orderAPI.list();
    setTodayOrderData(todayOrder)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <Row justify="space-between" style={{ width: "100%" }}>
          <Col span={5}>
            <div className="columns">
              <Row style={{ width: "100%", paddingTop: "10px" }}>
                <Col span={10}>
                  <div className="img_container">
                    <img src="/homePageCol1.png" alt="" />
                  </div>
                </Col>
                <Col span={14}>
                  <p style={{ margin: "0", fontSize: "20px" }}>Өнөөдрийн цаг</p>
                  <p style={{ margin: "0", fontSize: "20px" }}>
                    <CountUp end={todayTimesCount} duration={0.5} />
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={5}>
            <div className="columns">
              <Row style={{ width: "100%", paddingTop: "10px" }}>
                <Col span={10}>
                  <div className="img_container">
                    <img src="/homePageCol2.png" alt="" />
                  </div>
                </Col>
                <Col span={14}>
                  <p style={{ margin: "0", fontSize: "20px" }}>Нийт өвчтөн</p>
                  <p style={{ margin: "0", fontSize: "20px" }}>
                    <CountUp end={customersCount} duration={0.5} />
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={5}>
            <div className="columns">
              <Row style={{ width: "100%", paddingTop: "10px" }}>
                <Col span={10}>
                  <div className="img_container">
                    <img src="/homePageCol3.png" alt="" />
                  </div>
                </Col>
                <Col span={14}>
                  <p style={{ margin: "0", fontSize: "20px" }}>Нийт эмч</p>
                  <p style={{ margin: "0", fontSize: "20px" }}>
                    <CountUp end={doctorsCount} duration={0.5} />
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={5}>
            <div className="columns">
              <Row style={{ width: "100%", paddingTop: "10px" }}>
                <Col span={10}>
                  <div className="img_container">
                    <img src="/homePageCol4.png" alt="" />
                  </div>
                </Col>
                <Col span={14}>
                  <p style={{ margin: "0", fontSize: "20px" }}>
                    Зөвөлгөө авсан
                  </p>
                  <p style={{ margin: "0", fontSize: "20px" }}>
                    <CountUp end={adviceCount} duration={0.5} />
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <div className="ordersCardContaienr">
          <Row justify="space-between" gutter={55}>
            <Col span={8}>
              <p>Цаг захиалсан үйлчлүүлэгч</p>
              <div className="order__time__customer"
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "15px",
                }}
              >
                <div className={orderTimeCustomer?.length > 0 ?"order__time__content":"Not_order__time__content"}>
                  {orderTimeCustomer?.length > 0 ? orderTimeCustomer.map((e) => <OrderTimeCustommer
                    name={`${e?.customer?.first_name} ${e?.customer?.last_name}`}
                    image={e?.customer?.image}
                    time={e?.start_time}
                    bool={true}
                    link={`/customer/${e?.customer?.id}`}
                  />) : <Empty />}

                </div>
              </div>
              <br />
              <p>Эмчилгээ</p>
              <div
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "137px",
                  borderRadius: "15px",
                  padding: "10px"
                }}
              >
                <CLineChart />
              </div>
            </Col>
            <Col span={8}>
              <p>Үйлчлүүлэгч</p>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  height: " 181px",
                  borderRadius: "15px",
                }}
              >
                <Row gutter={30} align="middle">
                  <Col>
                    <div
                      style={{
                        backgroundColor: "#E9F6FE",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <UserOutlined
                        style={{ fontSize: "26px", color: "#7DCAF9" }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <b>10.0k</b>
                    <p>Шинэ үйлчлүүлэгч</p>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <img
                          src="/chart.png"
                          width="15.34px"
                          height="4.76px"
                          alt=""
                        />
                      </Col>
                      <Col>
                        <p style={{ color: "#8C85F0" }}>15%</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row gutter={30} align="middle">
                  <Col>
                    <div
                      style={{
                        backgroundColor: "#FFF6E5",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <UserOutlined
                        style={{ fontSize: "26px", color: "#F9CF81" }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <b>10.0k</b>
                    <p>Хуучин үйлчлүүлэгч</p>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <img
                          src="/chart.png"
                          width="15.34px"
                          height="4.76px"
                          alt=""
                        />
                      </Col>
                      <Col>
                        <p style={{ color: "#8C85F0" }}>15%</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <p>Хүйс</p>
              <div
                style={{
                  height: "320px",
                  backgroundColor: "white",
                  borderRadius: "15px",
                  display: "grid",
                  placeItems: "center"
                }}
              >
                <PieChart />
              </div>
            </Col>
            <Col span={8}>
              <p>Өнөөдөр</p>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  width: "100%",
                  height: "535px",
                  borderRadius: "15px",
                }}
              >
                <div
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "270px",
                    padding: "10px"
                  }}
                >
                  {todayorderdata.length>0? todayorderdata.map((e) =>
                    <TOdayOrderList
                      image={e?.customer?.image}
                      name={`${e?.customer?.first_name} ${e?.customer?.last_name}`}
                      time={e.start_time}
                      doctorName={`${e?.doctor?.first_name} ${e?.doctor?.last_name}`}
                    />):<Empty/>}

                </div>
                <p>03-09 Nov,2021</p>
                <div className="button_container">
                  <Button className="button">
                    S <br />3
                  </Button>
                  <Button className="button">
                    M <br />4
                  </Button>
                  <Button className="button">
                    T <br />5
                  </Button>
                  <Button className="button">
                    W <br />6
                  </Button>
                  <Button className="button">
                    T<br />7
                  </Button>
                  <Button className="button">
                    F<br />8
                  </Button>
                  <Button className="button">
                    S<br />9
                  </Button>
                </div>
                <br />
                <div className="sevenDay">
                  <Row
                    style={{
                      width: "100%",
                      marginLeft: "80px",
                      marginTop: "15px",
                    }}
                  >
                    <Col span={14}>
                      <b>Ирэх 7 хоног</b>
                      <p>2- шинэ захиалга</p>
                    </Col>
                    <Col span={10}>
                      <Button className="sevenDayButton">Харах</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <br />
        <p>Үйлчлүүлэгчдийн мэдээлэл</p>
        <div
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
            <Col span={4}>Status</Col>
            <Col span={4}></Col>
          </Row>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          {customerdata.map((e) => <Customers image={e?.image} name={`${e?.first_name} ${e?.last_name}`} birthday={e.email} gender={e.gender} phone={e.phone} id={e.id} rate={e?.rate} />)}
        </div>
      </div>
    </>
  );
}

export default HomePage;
