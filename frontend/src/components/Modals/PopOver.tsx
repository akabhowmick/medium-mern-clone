import { Popover } from "antd";
import React from "react";

const PopOver = ({ hide }) => {
  return (
    <Popover content={<a onClick={hide}>Close</a>} title="Title" trigger="click">
    </Popover>
  );
};

export default PopOver;
