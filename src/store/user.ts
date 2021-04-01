import { observable } from 'mobx';

const mockUser = {
    nickname: '',
    phone: '17706019911',
};

export const observableValue = {
    userInfo: (sessionStorage.getItem('userInfo') || mockUser) as any,

    get isLogin() {
        return !!this.userInfo.nickname;
    },

    get isMember() {
        return this.userInfo.isMember;
    },
};

const counterStore = observable(observableValue);

export default counterStore;
