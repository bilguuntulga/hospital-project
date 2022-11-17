import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { Col, Dropdown, Row } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../../apis";

function Header() {
  const [user, setUser] = useState({});

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  const fetchData = async () => {
    const res = await authAPI.profile();
    setUser(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Row justify="end" style={{ width: "100%" }}>
        <Col span={12}>
          <Row justify="end" gutter={20}>
            <Col>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "white",
                  display: "flex",
                  placeItems: "center",
                  fontSize: "30px",
                  borderRadius: "50%",
                }}
              >
                <BellOutlined style={{ margin: "auto" }} />
              </div>
            </Col>
            <Col>
              <Row gutter={20}>
                <Link to="/profile">
                  <Col>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        placeItems: "center",
                        fontSize: "30px",
                        borderRadius: "50%",
                        backgroundImage: `url(${user?.profile_img})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </Col>
                </Link>
                <Col>
                  <b>{`${user.first_name} ${user.last_name}`}</b>
                  <p>{`${user.role === "ADMIN" ? "Админ" : "Ажилчин"}`}</p>
                </Col>
                <Col>
                  <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}
                  >
                    <DownOutlined />
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <b>
            <p style={{ fontSize: "16px", margin: "0" }}>
              Сайн байна уу, {user.first_name} {user.last_name}
            </p>
          </b>
          <p style={{ fontSize: "17px" }}>
            Өдрийг сайхан өнгөрүүлээрэй, Ажлын амжилт хүсэе
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default memo(Header);
