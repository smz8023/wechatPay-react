/*eslint-disable*/
// 首页
import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { get } from "~/request";

import vip1_nameplate from "./images/vip1_nameplate.png";
import vip2_nameplate from "./images/vip2_nameplate.png";
import vip1 from "./images/vip1.png";
import vip2 from "./images/vip2.png";

import { formatDate } from "~/tools/tools";
import styles from "./index.module.less";
import classNames from "classnames";

const Home = () => {
  const history = useHistory();
  const location = history.location;

  const tabs = ["金卡", "白金卡"];
  const [tabIndex, setTabIndex] = useState(0);
  const [detail, setDetail] = useState([] as any);
  const [userInfo, setUserInfo] = useState({} as any);
  const [itemIndex, setItemIndex] = useState(0);
  const [userRole, setUserRole] = useState({ role: 1, roleDate: 0 } as any);
  // 获取用户信息
  const getUserInfo = async () => {
    const { data } = await get(`/wxuser/getUserDetails`);
    setUserInfo(data);
  };

  // 查询用户角色
  const getUserRole = async () => {
    const { data } = await get(`/wxuser/getUserRole`);
    if (data && data.role) {
      localStorage.setItem("userRole", data.role);
    }
    setUserRole(data);
  };
  const list = useMemo(() => {
    const item: any = detail ? detail[tabIndex + 1] : {};
    setItemIndex(0);
    if (item) {
      return [
        {
          id: 1,
          name: "24",
          unit: "小时",
          promotionPrice: item.salePrice,
          originalPrice: item.marketPrice,
        },
        {
          id: 2,
          name: "1",
          unit: "个月",
          promotionPrice: item.monthSalePrice,
          originalPrice: item.monthMarketPrice,
        },
        {
          id: 3,
          name: "3",
          unit: "个月",
          promotionPrice: item.quarterSalePrice,
          originalPrice: item.quarterMarketPrice,
        },
        {
          id: 4,
          name: "1",
          unit: "年",
          promotionPrice: item.yearSalePrice,
          originalPrice: item.yearMarketPrice,
        },
      ];
    } else {
      return [];
    }
  }, [detail, tabIndex]);
  //查询内容
  const queryForWpRoles = async () => {
    const data = await get(`/wxRole/queryForWpRoles`);
    setDetail(data);
  };

  useEffect(() => {
    localStorage.setItem("token", location.search.slice(7));
    getUserInfo();
    getUserRole();
    queryForWpRoles();
  }, []);
  const [jsPay, setjsPay] = useState({} as any);
  const token = localStorage.getItem("token");
  console.log(userRole);
  const onBridgeReady = async () => {
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
    if (token) {
      await get(
        `/pay/buildOrder?price=${list[itemIndex].promotionPrice}&roleId=${userRole.role}`
      ).then((res: any) => {
        console.log(res);
        setjsPay(res);

        // ==== 开始配置信息上述操作1 过程
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timeStamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.paySign, // 必填，签名
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
            appId: res.appId, // 可不发
            nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
            package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.paySign, // 支付签名
            timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            success: function (res: any) {
              // 支付成功后的回调函数
              //alert(res.errorMsg);
              if (res.errMsg === "chooseWXPay:ok") {
                history.replace("/success");
              }
            },
            fail: function (res: any) {
              alert("支付失败");
              alert(res.errMsg);
            },
          });
        });
      });
    } else {
      alert("请退出后重新登录！");
    }
  };
  //const params = useMemo(() => list[tabIndex], [tabIndex]);
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* tab */}
        {tabs.length > 0 && (
          <div className={styles.tabs}>
            {tabs.length > 0 &&
              tabs.map((item: any, index) => (
                <div
                  className={tabIndex === index ? styles.active : styles.tab}
                  onClick={() => {
                    setTabIndex(index);
                  }}
                  key={`${item}${index}`}
                >
                  <div className={styles.tabTitle}>{item}</div>
                </div>
              ))}
          </div>
        )}
        <div className={styles.nameplate}>
          <div className={styles.nameplateTop}>
            <img src={tabIndex === 0 ? vip1_nameplate : vip2_nameplate} />
          </div>
          <div className={styles.nameplateBottom}>
            <div
              className={styles.avatr}
              style={{
                width: `${(0.36 * 100) / 70}rem`,
                height: `${(0.36 * 100) / 70}rem`,
              }}
            >
              <div className={styles.avatrBorder}>
                {userInfo && userInfo.headFrameUrl && (
                  <img src={userInfo.headFrameUrl} />
                )}
              </div>
              <div className={styles.avatrImg}>
                {userInfo && userInfo.headimg && <img src={userInfo.headimg} />}
              </div>
            </div>
            {userRole && userRole.role === 1 && <span>暂无开通会员</span>}
            {userRole && userRole.role === 2 && (
              <img className={styles.vipLogo} src={vip1} />
            )}
            {userRole && userRole.role === 3 && (
              <img className={styles.vipLogo} src={vip2} />
            )}
            {userRole && userRole.roleDate > 0 && (
              <span className={styles.vipDate}>
                到期时间：
                {formatDate(userRole.roleDate, "YYYY-MM-DD")}
              </span>
            )}
          </div>
        </div>
        {/* 详情 */}
        <div className={styles.detail}>
          <div className={styles.detailContent}>
            <div className={styles.goldtitle}>
              {tabIndex === 0 ? "金卡用户专享权益" : "白金卡用户专享超级权益"}
            </div>
            {tabIndex === 0 && detail && detail.length > 0 && (
              <ul className={styles.detailContent}>
                <li className={styles.detailItem}>
                  每天<span>{detail[tabIndex + 1].skipNum}次心动</span>
                  ，3倍推荐人数, 让你遇见更多有缘的Ta
                </li>
                <li className={styles.detailItem}>
                  每天{detail[tabIndex + 1].superBeckoningNum}次“
                  <span>超级心动</span>”，给有缘的Ta直接打招呼
                </li>
                <li className={styles.detailItem}>
                  每天{detail[tabIndex + 1].onlineMatching}次“
                  <span>在线匹配</span>”
                </li>
                <li className={styles.detailItem}>
                  每天{detail[tabIndex + 1].privateLetter}次“<span>私信</span>
                  ”机会（仅对动态广场用户使用）
                </li>
                <li className={styles.detailItem}>
                  ·<span>点错反悔</span>：手滑点错“X”，一键找回上一个Ta
                </li>
                <li className={styles.detailItem}>精准筛选</li>
                <li className={styles.detailItem}>
                  专属<span>头像框</span>，展示你的独特魅力
                </li>
                <li className={styles.detailItem}>
                  <span>隐私匹配</span>，让聊天更安心
                  <div>（选择让谁看到我/隐藏年龄/屏蔽对方超级心动）</div>
                </li>
              </ul>
            )}
            {tabIndex === 1 && detail && detail.length > 0 && (
              <div className={styles.detailContentw}>
                <img src={detail[tabIndex + 1].detail} />
              </div>
            )}
          </div>
          <div className={styles.vipPrice}>
            {list.length > 0 &&
              list.map((item: any, index: number) => (
                <div
                  className={classNames(
                    styles.item,
                    index === itemIndex ? styles.itemActive : null
                  )}
                  key={item.id}
                  onClick={() => setItemIndex(index)}
                >
                  <div className={styles.time}>
                    <span>{item.name}</span>
                    {item.unit}
                  </div>
                  <div className={styles.promotionPrice}>
                    ￥{item.promotionPrice}
                  </div>
                  <div className={styles.originalPrice}>
                    {item.originalPrice}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.btn}>
          <button
            onClick={
              () => onBridgeReady()

              // history.push(`/pay?price=${list[itemIndex].promotionPrice}`)
            }
          >
            {userRole && userRole.role > 1 ? "立即续费" : "开通"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
