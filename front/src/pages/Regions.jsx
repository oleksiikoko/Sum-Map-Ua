import React from "react";

import Card from "../components/Card";

import regionsJson from "../data/regions.json";

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
    const regionData = regionsJson[event.key];
    const columns = [
      { title: "Місяць", dataIndex: "month", key: "month" },
      { title: "S", dataIndex: "s", key: "s" },
      { title: "D", dataIndex: "d", key: "d" },
      { title: "S+D", dataIndex: "sd", key: "sd" },
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

    const data = [];
    for (let i = 0; i < 12; ++i) {
      data.push({
        key: i,
        month: monthArr[i],
        s: regionData.s_values[i],
        d: regionData.d_values[i],
        sd: regionData.s_values[i] + regionData.d_values[i],
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: "Область", dataIndex: "region", key: "region" },
    {
      title: "S: Надходження прямої сонячної радіації за рік",
      dataIndex: "total_s",
      key: "total_s",
    },
    {
      title: "D: Надходження розсіяної сонячної радіації за рік",
      dataIndex: "total_d",
      key: "total_d",
    },
    {
      title: "S+D: Сумарна радіація за рік",
      dataIndex: "total_sd",
      key: "total_sd",
    },
  ];

  const data = regionsJson.map((item, index) => {
    return {
      key: index,
      region: item.region_name,
      total_s: item.s_values[12],
      total_d: item.d_values[12],
      total_sd: item.s_values[12] + item.d_values[12],
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

const Regions = () => {
  return <NestedTable />;
};

export default Regions;
