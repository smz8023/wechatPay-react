import React from 'react';

/**
 * @description 异步导入函数组件，实在不知道怎么写 ts 的类型，就用 js 了
 * @param {function} importFunc 异步导入函数 import(...)
 */
const asyncComponent = (importFunc) => {
    return class asyncCom extends React.Component {
        constructor() {
            super();
            this.state = {
                component: null,
            };
        }

        componentDidMount() {
            importFunc().then(cmp => {
                this.setState({ component: cmp.default });
            });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    };
};

export default asyncComponent;
