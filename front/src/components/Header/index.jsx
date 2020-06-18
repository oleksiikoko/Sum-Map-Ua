import React, { useState } from "react";
import { Menu, Button } from "antd";
import { useHistory } from "react-router-dom";

import PublicIcon from "@material-ui/icons/Public";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppsIcon from "@material-ui/icons/Apps";
import StorageIcon from "@material-ui/icons/Storage";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";

import "./Header.css";

const { SubMenu } = Menu;

const Header = () => {
  const history = useHistory();
  const [current, setCurrent] = useState(
    window.location.pathname.replace("/", "")
  );

  const handleClick = (e) => {
    console.log(e);
    if (!e.key) {
      logOut(e);
      return;
    }
    setCurrent(e.key);
    history.push(`/${e.key}`);
  };

  const logOut = (event) => {
    window.localStorage["token"] = undefined;
    history.push("/signin");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="map" icon={<PublicIcon />}>
        Карта
      </Menu.Item>

      <SubMenu icon={<StorageIcon />} title="Дані">
        <Menu.Item key="regions">Обасті</Menu.Item>
        <Menu.Item key="angles">Кути</Menu.Item>
        <Menu.Item key="markers">Маркери</Menu.Item>
      </SubMenu>
      <Menu.Item key="stations" icon={<AppsIcon />}>
        Геліостанції
      </Menu.Item>
      <Menu.Item key="sun-panel" icon={<SettingsBrightnessIcon />}>
        Сонячні панелі
      </Menu.Item>
      <Menu.Item key="account" icon={<AccountCircleIcon />}>
        Особистий кабінет
      </Menu.Item>
      <Button className="exit-button" key="logOut">
        Вихід
      </Button>
    </Menu>
  );
};

export default Header;
