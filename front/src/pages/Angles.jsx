import React from "react";

import Card from "../components/Card";

import anglesJson from "../data/angles.json";

import { Table, Badge, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const monthArr = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

function NestedTable() {
  const expandedRowRender = (event) => {
    const anglesData = anglesJson[event.key];
    const columns = [
      { title: "Січень", dataIndex: "january", key: "january" },
      { title: "Лютий", dataIndex: "february", key: "february" },
      { title: "Березень", dataIndex: "march", key: "march" },
      { title: "Квітень", dataIndex: "april", key: "april" },
      { title: "Травень", dataIndex: "may", key: "may" },
      { title: "Червень", dataIndex: "juny", key: "juny" },
      { title: "Липень", dataIndex: "july", key: "july" },
      { title: "Серпень", dataIndex: "august", key: "august" },
      { title: "Вересень", dataIndex: "september", key: "september" },
      { title: "Жовтень", dataIndex: "october", key: "october" },
      { title: "Листопад", dataIndex: "november", key: "november" },
      { title: "Грудень", dataIndex: "december", key: "december" },
      //   {
      //     title: "Status",
      //     key: "state",
      //     render: () => (
      //       <span>
      //         <Badge status="success" />
      //         Finished
      //       </span>
      //     ),
      //   },
      //   { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      //   {
      //     title: "Action",
      //     dataIndex: "operation",
      //     key: "operation",
      //     render: () => (
      //       <span className="table-operation">
      //         <a>Pause</a>
      //         <a>Stop</a>
      //         <Dropdown overlay={menu}>
      //           <a>
      //             More <DownOutlined />
      //           </a>
      //         </Dropdown>
      //       </span>
      //     ),
      //   },
    ];

    const data = [
      {
        january: anglesData.ps_values[0],
        february: anglesData.ps_values[1],
        march: anglesData.ps_values[2],
        april: anglesData.ps_values[3],
        may: anglesData.ps_values[4],
        juny: anglesData.ps_values[5],
        july: anglesData.ps_values[6],
        august: anglesData.ps_values[7],
        september: anglesData.ps_values[8],
        october: anglesData.ps_values[9],
        november: anglesData.ps_values[10],
        december: anglesData.ps_values[11],
      },
    ];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: "Широта", dataIndex: "lat", key: "lat" },
    {
      title: "Кут",
      dataIndex: "angle",
      key: "angle",
    },
  ];

  const data = anglesJson.map((item, index) => {
    return {
      key: index,
      lat: item.lat,
      angle: item.angle,
    };
  });

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={data}
    />
  );
}

const Angles = () => {
  return <NestedTable />;
};

export default Angles;
