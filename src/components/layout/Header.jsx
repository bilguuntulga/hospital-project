import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Popover } from "antd";
import React, { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { authAPI, treatmentTimesAPI } from "../../apis";
import NotiItem from "../NotiItem";

function Header() {
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [newNotiCount, setNewNotiCount] = useState(0);
  const audioPlayer = useRef();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
  };

  const items = [
    user?.role == "ADMIN"
      ? {
          key: "1",
          label: (
            <Link to="work_users">
              <div>Ажилчид</div>
            </Link>
          ),
        }
      : null,
    user?.role == "ADMIN"
      ? {
          key: "2",
          label: (
            <Link to="questions">
              <div>Асуулт</div>
            </Link>
          ),
        }
      : null,
    {
      key: "3",
      label: <div onClick={logout}>Гарах</div>,
    },
  ];

  const fetchData = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      user = await authAPI.profile();
      setUser(user);
    } else {
      setUser(user);
    }
  };

  const fetchNotifications = async () => {
    const res = await treatmentTimesAPI.notifications();
    setNotifications(res);
    const count = res?.filter((e) => e?.seen == false).length;
    setNewNotiCount(count);
  };

  useEffect(() => {
    fetchData();
    fetchNotifications();
  }, []);

  useEffect(() => {
    const newSocket = io("http://172.104.185.229:64536");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const handleMessage = async () => {
    await fetchNotifications();
    audioPlayer.current.play();
  };

  socket?.on("notification", handleMessage);

  const notifiContent = (
    <div>
      {notifications.map((e) => (
        <NotiItem
          key={e?.id}
          id={e?.id}
          image={e?.customer?.image ?? "/images/profile_img.jpg"}
          name={`${e?.customer?.first_name ?? "Овог"} ${
            e?.customer?.last_name ?? "Нэр"
          }`}
          phone={e?.customer?.phone}
          startTime={e?.start_time}
          seen={e?.seen}
          refreshNotis={fetchNotifications}
        />
      ))}
    </div>
  );

  return (
    <div className="header_wrapper">
      <audio ref={audioPlayer} src={"/sounds/notification.mp3"} />
      <div className="header_content">
        <Popover content={notifiContent} trigger="click" placement="bottom">
          <Badge count={newNotiCount}>
            <img
              className="notification_icon"
              src="/images/bell.png"
              alt="notification"
              onClick={fetchNotifications}
            />
          </Badge>
        </Popover>
        <div className="profile_wrapper">
          <Link to="/profile">
            <div className="profile_image_wrapper">
              <img src={user?.profile_img ?? ""} alt="Profile" />
            </div>
          </Link>
          <div className="name_role_wrapper">
            <div className="username">{`${user?.first_name ?? "Овог"} ${
              user?.last_name ?? "Нэр"
            }`}</div>
            <div className="user_role">{`${
              user?.role === "ADMIN" ? "Админ" : "Ажилтан"
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
    </div>
  );
}

export default memo(Header);
