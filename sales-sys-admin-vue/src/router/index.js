import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    // base: '/sales-sys',//添加前缀
    routes: [{
            path: '/',
            redirect: '/page/index'
        },
        {
            path: '/',
            component: () => import('@/components/common/Home.vue'),
            children: [{
                    path: '/page/index',
                    component: () => import('@/components/page/Dashboard.vue'),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/page/messageTabs',
                    component: () => import('@/components/page/messageTabs.vue'),
                    meta: {
                        title: '消息中心'
                    }
                },
                {
                    path: '/page/404',
                    component: () => import( /* webpackChunkName: "404" */ '@/components/page/404.vue'),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/page/403',
                    component: () => import( /* webpackChunkName: "403" */ '@/components/page/403.vue'),
                    meta: {
                        title: '403'
                    }
                },
                {
                    path: '/page/500',
                    component: () => import( /* webpackChunkName: "500" */ '@/components/page/500.vue'),
                    meta: {
                        title: '500'
                    }
                },
                {
                    path: '/page/Icon',
                    component: () => import('@/components/page/Icon.vue'),
                    meta: {
                        title: 'Icon'
                    }
                },
            ]
        },
        {
            path: '/',
            component: () => import('@/components/common/Home.vue'),
            children: [{
                    path: '/page/system/role',
                    component: () => import('@/components/page/system/role/index.vue'),
                    meta: {
                        title: '角色管理'
                    }
                },
                {
                    path: '/page/system/dept',
                    component: () => import('@/components/page/system/dept/index.vue'),
                    meta: {
                        title: '部门管理'
                    }
                },
                {
                    path: '/page/system/user',
                    component: () => import('@/components/page/system/user/index.vue'),
                    meta: {
                        title: '用户档案'
                    }
                },
                {
                    path: '/page/basis/personnel',
                    component: () => import('@/components/page/basis/personnel/index.vue'),
                    meta: {
                        title: '人员档案'
                    }
                },
                {
                    path: '/page/basis/materiel',
                    component: () => import('@/components/page/basis/materiel/index.vue'),
                    meta: {
                        title: '商品档案'
                    }
                },
                {
                    path: '/page/basis/category',
                    component: () => import('@/components/page/basis/category/index.vue'),
                    meta: {
                        title: '商品类别'
                    }
                },
                {
                    path: '/page/basis/warehouse',
                    component: () => import('@/components/page/basis/warehouse/index.vue'),
                    meta: {
                        title: '仓库管理'
                    }
                },
                {
                    path: '/page/basis/clientele',
                    component: () => import('@/components/page/basis/clientele/index.vue'),
                    meta: {
                        title: '客户档案'
                    }
                },
                {
                    path: '/page/basis/clienteleType',
                    component: () => import('@/components/page/basis/clienteleType/index.vue'),
                    meta: {
                        title: '客户类别'
                    },
                },
                {
                    path: '/page/basis/customerPrice',
                    component: () => import('@/components/page/basis/customerPrice/index.vue'),
                    meta: {
                        title: '产品客户价'
                    },
                },
                {
                    path: '/page/sales/salesPrice',
                    component: () => import('@/components/page/sales/salesPrice/index.vue'),
                    meta: {
                        title: '销售报价'
                    }
                },
                {
                    path: '/page/sales/salesOrder',
                    component: () => import('@/components/page/sales/salesOrder/index.vue'),
                    meta: {
                        title: '销售订单'
                    }
                },
                {
                    path: '/page/sales/salesShipments',
                    component: () => import('@/components/page/sales/salesShipments/index.vue'),
                    meta: {
                        title: '销售发货'
                    }
                },
                {
                    path: '/page/sales/salesSignBack',
                    component: () => import('@/components/page/sales/salesSignBack/index.vue'),
                    meta: {
                        title: '销售签回'
                    }
                },
                {
                    path: '/page/sales/salesReturns',
                    component: () => import('@/components/page/sales/salesReturns/index.vue'),
                    meta: {
                        title: '销售退货'
                    }
                },
                {
                    path: '/page/warehouse/init',
                    component: () => import('@/components/page/warehouse/init/index.vue'),
                    meta: {
                        title: '初始化'
                    }
                },
                {
                    path: '/page/warehouse/materialStorage',
                    component: () => import('@/components/page/warehouse/materialStorage/index.vue'),
                    meta: {
                        title: '商品入库'
                    }
                },
                {
                    path: '/page/warehouse/salesOutbound',
                    component: () => import('@/components/page/warehouse/salesOutbound/index.vue'),
                    meta: {
                        title: '销售出库'
                    }
                },
                {
                    path: '/page/warehouse/takeStock',
                    component: () => import('@/components/page/warehouse/takeStock/index.vue'),
                    meta: {
                        title: '盘点'
                    }
                },
                {
                    path: '/page/warehouse/returnsStorage',
                    component: () => import('@/components/page/warehouse/returnsStorage/index.vue'),
                    meta: {
                        title: '退货入库'
                    }
                },
                {
                    path: '/page/warehouse/adjustment',
                    component: () => import('@/components/page/warehouse/adjustment/index.vue'),
                    meta: {
                        title: '退货入库'
                    }
                },
                {
                    path: '/page/warehouse/scrap',
                    component: () => import('@/components/page/warehouse/scrap/index.vue'),
                    meta: {
                        title: '调整'
                    }
                },
                {
                    path: '/page/warehouse/standingStock',
                    component: () => import('@/components/page/warehouse/standingStock/index.vue'),
                    meta: {
                        title: '现存量'
                    }
                },
                {
                    path: '/page/warehouse/tradingRecord',
                    component: () => import('@/components/page/warehouse/tradingRecord/index.vue'),
                    meta: {
                        title: '交易记录'
                    }
                },
                {
                    path: '/page/finance/accountReceivable',
                    component: () => import('@/components/page/finance/accountReceivable/index.vue'),
                    meta: {
                        title: '应收款'
                    }
                },
                {
                    path: '/page/finance/accountPayable',
                    component: () => import('@/components/page/finance/accountPayable/index.vue'),
                    meta: {
                        title: '应付款'
                    }
                },
                {
                    path: '/page/finance/receivableToPayable',
                    component: () => import('@/components/page/finance/receivableToPayable/index.vue'),
                    meta: {
                        title: '应收充应付'
                    }
                },
                {
                    path: '/page/finance/collection',
                    component: () => import('@/components/page/finance/collection/index.vue'),
                    meta: {
                        title: '收款'
                    }
                },
                {
                    path: '/page/finance/statements',
                    component: () => import('@/components/page/finance/statements/index.vue'),
                    meta: {
                        title: '对账单'
                    }
                },
            ]
        },
        {
            path: '/page/login',
            component: () => import('@/components/page/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/page/404',
            meta: {
                title: '404'
            }
        }
    ]
});
