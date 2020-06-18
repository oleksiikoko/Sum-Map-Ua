import React from "react";

import { Table, Tag, Space } from "antd";

const columns = [
  {
    title: "Власник",
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "Широта",
    dataIndex: "lat",
    key: "lat",
  },
  {
    title: "Довгота",
    dataIndex: "lng",
    key: "lng",
  },
  {
    title: "Система",
    dataIndex: "system",
    key: "system",
  },
  {
    title: "Тип",
    dataIndex: "systemType",
    key: "systemType",
  },
  {
    title: "Код регіону",
    dataIndex: "region_iso",
    key: "region_iso",
  },
  ,
];

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

const MarkersTable = ({ data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default MarkersTable;
