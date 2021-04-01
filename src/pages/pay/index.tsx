/*eslint-disable*/
// 支付页面
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import selected from "./images/selected.png";
import wecahtPay from "./images/wecaht_pay.png";

import styles from "./index.module.less";

const Pay = () => {
  const history = useHistory();
  //支付参数
  const [jsPay, setjsPay] = useState({} as any);

  const onBridgeReady = async () => {
    console.log(window.wx);
    /*  // 该注释为收集数据发送后端下单过程 
    //此处为发起订单（下单）需要准备的信息 
    const { paymentProject, student } = this 
    const PaymentInfo = {
      paymentProjectId: paymentProject.paymentProjectId,
      parentUserId: storageUtils.getUser("userInfo").parentUserId,
      studentId: student.studentId,
      transactionMoney: paymentProject.paymentProjectMoney,
      applyPaymentName: paymentProject.paymentProjectName,
      userOpenId: storageUtils.getUser("userInfo").parentUserOpenID,
    }
    // 此处开始向后台发起请求下单
    Toast.loading("加载中...")
    const result = await reqPayOrder(PaymentInfo)
    Toast.hide()
    if (result[0].status === "200") { // 状态200 请求成功
      const data = result[0].data// ====拿到后台返回的订单信息
      */
    // ==== 开始配置信息上述操作1 过程
    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: jsPay.appId, // 必填，公众号的唯一标识
      timestamp: jsPay.timeStamp, // 必填，生成签名的时间戳
      nonceStr: jsPay.nonceStr, // 必填，生成签名的随机串
      signature: jsPay.paySign, // 必填，签名
      jsApiList: ["chooseWXPay"], // 必填，需要使用的JS接口列表
    });
    // ==== 开始处理初始化配置失败是提示信息 上述操作2 过程
    window.wx.error(function (err: any) {
      console.log("初始化失败！");
      console.log(err);
    });
    //=== 此处在 config完成初始化配置之后调用支付函数
    window.wx.ready(() => {
      // 调用支付函数
      window.wx.chooseWXPay({
        // appId: data.appId, // 可不发
        nonceStr: jsPay.nonceStr, // 支付签名随机串，不长于 32 位
        package: jsPay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: jsPay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: jsPay.paySign, // 支付签名
        timestamp: jsPay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        success: function (res: any) {
          // 支付成功后的回调函数
          //alert(res.errorMsg);
          history.replace("/success");
        },
        fail: function (res: any) {
          alert("支付失败");
          alert(res.errMsg);
        },
      });
    });
  };
  return (
    <div className={styles.page}>
      <div className={styles.detail}>
        <div className={styles.time}>支付剩余时间：20:00</div>
        <div className={styles.pirce}>¥ 34.00</div>
        <div className={styles.number}>订单编号：202001201747123</div>
      </div>
      <div className={styles.selectPay}>
        <div className={styles.selectLeft}>
          <img src={wecahtPay} />
          <span>微信支付</span>
        </div>
        <div className={styles.selectRight}>
          <img src={selected} />
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={() => onBridgeReady()}>支付</button>
      </div>
    </div>
  );
};

export default Pay;
