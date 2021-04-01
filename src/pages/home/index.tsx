/*eslint-disable*/
// 首页
import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

import vip1_nameplate from "./images/vip1_nameplate.png";
import vip2_nameplate from "./images/vip2_nameplate.png";
import vip1 from "./images/vip1.png";
import vip2 from "./images/vip2.png";

const isVip = false;
import styles from "./index.module.less";
import classNames from "classnames";

const Home = () => {
  const history = useHistory();
  const tabs = ["金卡", "白金卡"];
  const [tabIndex, setTabIndex] = useState(0);
  const [list, setList] = useState([] as any);
  const [itemIndex, setItemIndex] = useState(0);
  useEffect(() => {
    setList([
      {
        id: 1,
        name: "24",
        unit: "小时",
        promotionPrice: "10",
        originalPrice: "14",
      },
      {
        id: 2,
        name: "1",
        unit: "个月",
        promotionPrice: "20",
        originalPrice: "28",
      },
      {
        id: 3,
        name: "3",
        unit: "个月",
        promotionPrice: "50",
        originalPrice: "70",
      },
      {
        id: 4,
        name: "1",
        unit: "年",
        promotionPrice: "100",
        originalPrice: "140",
      },
    ]);
  }, []);
  //const params = useMemo(() => list[itemIndex], [itemIndex]);
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
            <img
              src="https://dss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/37.jpg?2"
              className={styles.avatr}
            />
            <img className={styles.vipLogo} src={vip1} />
            <span>暂无开通会员</span>
          </div>
        </div>
        {/* 详情 */}
        <div className={styles.detail}>
          <div className={styles.detailContent}>{/* 富文本 */}</div>
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
          <button onClick={() => history.push("/pay?id=xxx")}>
            {isVip ? "立即续费" : "开通"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
