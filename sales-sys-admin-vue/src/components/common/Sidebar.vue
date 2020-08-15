<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">
                                    <i :class="subItem.icon" v-if="subItem.icon"></i>
                                    <span slot="title">{{ subItem.title }}</span>
                                </template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    <i :class="threeItem.icon" v-if="threeItem.icon"></i>
                                    <span slot="title">{{ threeItem.title }}</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                <i :class="subItem.icon" v-if="subItem.icon"></i>
                                <span slot="title">{{ subItem.title }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from './bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: '/page/index',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    title: '系统管理',
                    index: 'system',
                    subs: [
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/system/role',
                            title: '角色管理'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/system/dept',
                            title: '部门管理'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/system/user',
                            title: '用户档案'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-help',
                    title: '基础档案',
                    index: 'basis',
                    subs: [
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/basis/personnel',
                            title: '人员档案'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/basis/category',
                            title: '商品类别'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/basis/materiel',
                            title: '商品档案'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/basis/warehouse',
                            title: '仓库管理'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/basis/clienteleType',
                            title: '客户类别'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/basis/clientele',
                            title: '客户档案'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/basis/customerPrice',
                            title: '产品客户价'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-order',
                    title: '销售管理',
                    index: 'sales',
                    subs: [
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/sales/salesPrice',
                            title: '销售报价'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/sales/salesOrder',
                            title: '销售订单'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/sales/salesShipments',
                            title: '销售发货'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/sales/salesSignBack',
                            title: '销售签回'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/sales/salesReturns',
                            title: '销售退货'
                        }
                    ]
                },
                {
                    icon: 'el-icon-coin',
                    title: '仓库管理',
                    index: 'warehouse',
                    subs: [
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/init',
                            title: '初始化'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/materialStorage',
                            title: '商品入库'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/salesOutbound',
                            title: '销售出库'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/takeStock',
                            title: '盘点'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/returnsStorage',
                            title: '退货入库'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/adjustment',
                            title: '调整'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/scrap',
                            title: '报废'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/standingStock',
                            title: '现存量'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/warehouse/tradingRecord',
                            title: '交易记录'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-data',
                    title: '财务管理',
                    index: 'finance',
                    subs: [
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/finance/accountReceivable',
                            title: '应收款'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/finance/accountPayable',
                            title: '应付款'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/finance/receivableToPayable',
                            title: '应收充应付'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/finance/collection',
                            title: '收款'
                        },
                        {
                            icon: 'el-icon-lx-favorfill',
                            index: '/page/finance/statements',
                            title: '对账单'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
