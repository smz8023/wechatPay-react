/*eslint-disable*/
// 支付成功页面
import React, { useState } from "react";

import successIcon from "./images/success.png";

import styles from "./index.module.less";

const Success = () => {
  return (
    <div className={styles.page}>
      <img src={successIcon} />
      <span>支付成功</span>
    </div>
  );
};

export default Success;
