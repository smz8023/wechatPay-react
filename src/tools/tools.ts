export function addZero(num: number | string): string {
    return Number(num) < 10 ? '0' + Number(num) : String(num);
}

/**
 * @description 格式化时间
 * @param value 时间
 * @param pattern 格式化的模式
 */
export function formatDate(value: number | string, pattern = 'YYYY-MM-DD hh:mm:ss') {
    if (!value) {
        return '';
    }
    let val = value;
    if (typeof val === 'string') {
        val = val.replace(/-/g, '/');
    }
    const date = new Date(val);
    const chinese = ['一', '二', '三', '四', '五', '六', '日'];
    let model = pattern;
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const week: any = String(date.getDay());
    const day = String(date.getDate());
    const hour = String(date.getHours());
    const minute = String(date.getMinutes());
    const second = String(date.getSeconds());
    const time = String(date.getTime());
    if (model === 'time' || model === 'Time') {
        return time;
    }
    model = model.replace(/YYYY/, year);
    model = model.replace(/YY/, (String(year)).slice(2));
    model = model.replace(/MM/, addZero(month));
    model = model.replace(/M/, month);
    model = model.replace(/[wW]+/, '星期' + chinese[week]);
    model = model.replace(/DD/, addZero(day));
    model = model.replace(/D/, day);
    model = model.replace(/hh/, addZero(hour));
    model = model.replace(/h/, hour);
    model = model.replace(/mm/, addZero(minute));
    model = model.replace(/m/, minute);
    model = model.replace(/ss/, addZero(second));
    model = model.replace(/s/, second);
    return model;
}

type toYuanFunc = (num: number, fixedLen?: number) => string
export const toYuan: toYuanFunc = (num, fixedLen = 2) => {
    const yuan = isNaN(num) ? '0.00' : num.toFixed(fixedLen);
    return yuan[0] === '-' ? `-￥${yuan.substring(1)}` : `￥${yuan}`;
};

/**
 * @description 防抖函数
 * @param {function} func 执行函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 立即执行
 * @return {function} 防抖控制函数
 */
export const debounce = <T>(func: T, wait: number, immediate?: boolean): T => {
    let timer: any = null;

    const cb: any = (...args: any[]) => {
        if (immediate && !timer) {
            (func as any)(...args);
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            (func as any)(...args);
            timer = null;
        }, wait);
    };

    return cb;
};

/**
 * @description 解析 url 参数
 * @param {string} queryStr 参数字符串
 * @return {object} 结果对象
 */
export const parseQuery = (queryStr = '') => {
    const maps: { [key: string]: string } = {};
    const list = queryStr.split('&');
    for (const item of list) {
        if (item.includes('=')) {
            const data = item.split('=');
            maps[data[0]] = data[1];
        }
    }
    return maps;
};

/**
 * @description 生成多行省略的 CSS，由于写在 CSS 中会有毛病，只能这样来了
 * @param {number} line 参数字符串
 * @return {object} 结果对象
 */
export const multipleText = (line = 2) => {
    const style: React.CSSProperties = {
        wordBreak: 'break-all',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: line,
        WebkitBoxOrient: 'vertical',
    };
    return style;
};

export const toggleList = <T>(list: T[], item: T) => {
    let mockList = [...list];
    if (mockList.includes(item)) {
        mockList = mockList.filter(it => it !== item);
    } else {
        mockList.push(item);
    }
    return mockList;
};

/**
 * 钱的正则
 * @param obj
 */
export function moneyExchange(obj: any) {
    let modal: string = obj;
    const reg = new RegExp('([0]*)([1-9]+[0-9]+)', 'g');
    modal = modal.replace(/[^\d.]/g, ''); // 清除'数字'和'.'以外的字符
    modal = modal.replace(reg, '$2');
    modal = modal.replace(/^\./g, ''); // 验证第一个字符是数字
    modal = modal.replace(/\.{2,}/g, '.'); // 只保留第一个, 清除多余的
    modal = modal.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    modal = modal.replace(/^(\d-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
    return modal;
}
