import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../../apis";

function Header() {
  const [user, setUser] = useState({});

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

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
        <Link to="work_users"><div>Ажилчид</div></Link>

      ),
    },
    {
      key: "3",
      label: <div onClick={logout}>Гарах</div>,
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
    <div className="header_wrapper">
      <div className="header_content">
        <img className="notification_icon" src="/images/bell.png" alt="notification" />
        <div className="profile_wrapper">
          <Link to="/profile">
            <div className="profile_image_wrapper">
              <img src={user.profile_img ?? ""} alt="Profile" />
            </div>
          </Link>
          <div className="name_role_wrapper">
            <div className="username">{`${user.first_name ?? "Овог"} ${user.last_name ?? "Нэр"
              }`}</div>
            <div className="user_role">{`${user.role === "ADMIN" ? "Админ" : "Ажилчин"
              }`}</div>
          </div>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <DownOutlined />
          </Dropdown>
        </div>
      </div>
      {/* <Row>
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
      </Row> */}
    </div>
  );
}

export default memo(Header);
