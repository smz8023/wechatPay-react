import asyncComponent from './asyncImport.js';

export type RouteMeta = {
    auth?: boolean,
};

export type AsyncRoute = {
    path: string,
    component: any,
    exact?: boolean,
    meta?: RouteMeta,
};

const routes: AsyncRoute[] = [

    {
        path: '/success',
        component: asyncComponent(() => import(`../pages/success`)),
    },
    {
        path: '/pay',
        component: asyncComponent(() => import(`../pages/pay`)),
    },
    // 默认地址需放在最后一位
    {
        path: '/',
        component: asyncComponent(() => import(`../pages/home`)),
    },
];

export default routes;
