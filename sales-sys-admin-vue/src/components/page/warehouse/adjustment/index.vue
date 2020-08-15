<template>
    <div class="container">
        <el-form :model="queryParams" ref="queryParams" :inline="true">
            <el-form-item label="仓库编码" prop="clienteleNum">
                <el-input v-model="queryParams.clienteleNum" placeholder="请输入仓库编码" clearable size="small" style="width: 200px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="仓库名称" prop="clienteleName">
                <el-input v-model="queryParams.clienteleName" placeholder="请输入仓库名称" clearable size="small" style="width: 200px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="状态" clearable size="small" style="width: 200px">
                    <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="handle-box">
            <el-button type="primary" size="mini" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="success" size="mini" icon="el-icon-edit" class="handle-del mr10" :disabled="single" @click="handleUpdate">修改</el-button>
            <!-- <el-button type="warning" size="mini" icon="el-icon-finished" class="handle-del mr10" :disabled="multiple" @click="handleAudit">审核</el-button> -->
            <el-button type="danger" size="mini" icon="el-icon-delete" class="handle-del mr10" @click="handleDelete" :disabled="multiple">删除</el-button>
            <!-- <el-button type="primary" size="mini" icon="el-icon-printer" class="handle-del mr10" @click="handlePrint" :disabled="single">打印</el-button> -->
        </div>
        <el-table v-loading="loading" :data="clienteleList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="仓库编号" align="center" prop="clienteleId" />
            <el-table-column label="仓库名称" align="center" prop="clienteleName" :show-overflow-tooltip="true"   />
            <el-table-column label="所属类别" align="center" prop="clienteleTypeName" :show-overflow-tooltip="true"   />
            <el-table-column prop="linkman" label="仓库联系人" align="center" ></el-table-column>
            <el-table-column prop="deptName" label="报价部门" align="center"  ></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" ></el-table-column>
            <el-table-column label="操作" align="center"  class-name="small-padding fixed-width" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" style="color:#fd5656" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="queryParams.pageNum"
                :page-size="queryParams.pageSize"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="nickName"><el-input v-model="form.nickName" placeholder="请输入客户名称" /></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归属部门" prop="deptId">
                            <treeselect v-model="form.deptId" :options="deptOptions" :disable-branch-nodes="true" :show-count="true" placeholder="请选择归属部门" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" prop="phonenumber"><el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" /></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单价" prop="email"><el-input v-model="form.email" placeholder="请输入单价" maxlength="50" /></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="仓库名称" prop="clienteleName">
                            <el-input v-model="form.clienteleName" placeholder="请输入仓库名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="联系方式" prop="password">
                            <el-input v-model="form.password" placeholder="请输入联系方式" type="password" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"><el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input></el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listData, treeselect } from '@/api/basis/clientele.js';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
    name: 'warehouse-adjustment',
    components: { Treeselect },
    data() {
        return {
            // 遮罩层
            loading: true,
            // 是否显示弹出层
            open: false,
            // 弹窗标题
            title: '',
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            //用户数据
            clienteleList: [],
            //总条数
            pageTotal: 0,
            // 部门树选项
            deptOptions: undefined,
            //性别选项框
            sexOptions: [],
            //角色选项框
            roleOptions: [],
            //岗位选项框
            postOptions: [],
            // 部门名称
            deptName: undefined,
            //表单参数
            form: {},
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            // 状态数据字典
            statusOptions: [{ dictValue: '0', dictLabel: '启用' }, { dictValue: '1', dictLabel: '禁用' }],
            //是否为系统用户
            isUserOptions: [{ dictValue: '0', dictLabel: '是' }, { dictValue: '1', dictLabel: '否' }],
            // 查询参数
            queryParams: {
                address: '',
                name: '',
                pageNum: 1,
                pageSize: 10,
                clienteleName: undefined,
                phonenumber: undefined,
                status: undefined,
                deptId: undefined
            },
            // 表单校验
            rules: {
                clienteleName: [{ required: true, message: '仓库名称不能为空', trigger: 'blur' }],
                nickName: [{ required: true, message: '客户名称不能为空', trigger: 'blur' }],
                deptId: [{ required: true, message: '归属部门不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }],
                email: [
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    {
                        type: 'email',
                        message: "'请输入正确的邮箱地址",
                        trigger: ['blur', 'change']
                    }
                ],
                phonenumber: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    {
                        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                        message: '请输入正确的手机号码',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    created() {
        this.getList();
        this.getTreeselect();
    },
    watch: {
        // 根据名称筛选部门树
        deptName(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        getList() {
            listData(this.query).then(res => {
                console.log(res);
                this.clienteleList = res.data;
                this.pageTotal = res.pageTotal || 50;
                this.loading = false;
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.queryParams, 'pageNum', val);
            this.getList();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.userId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 查询部门下拉树结构 */
        getTreeselect() {
            treeselect().then(response => {
                console.log(response);
                this.deptOptions = response.data;
            });
        },
        // 节点单击事件
        handleNodeClick(data) {
            this.queryParams.deptId = data.id;
            this.getList();
        },
        // 筛选节点
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                userId: undefined,
                deptId: undefined,
                clienteleName: undefined,
                nickName: undefined,
                password: undefined,
                phonenumber: undefined,
                email: undefined,
                sex: undefined,
                status: '0',
                remark: undefined,
                postIds: [],
                roleIds: []
            };
            this.resetForm('form');
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.page = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.dateRange = [];
            this.resetForm('queryForm');
            this.handleQuery();
        },
        handlePrint() {
            this.msgSuccess('打印成功');
        },
        handleAudit() {
            this.msgSuccess('操作成功');
        },
        handleDelete() {
            this.msgSuccess('操作成功');
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.getTreeselect();
            // getUser().then(response => {
            //     this.postOptions = response.posts;
            //     this.roleOptions = response.roles;
            this.open = true;
            this.title = '添加用户';
            //     this.form.password = this.initPassword;
            // });
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            this.getTreeselect();
            const userId = row.userId || this.ids;
            // getUser(userId).then(response => {
            //     this.form = response.data;
            //     this.postOptions = response.posts;
            //     this.roleOptions = response.roles;
            //     this.form.postIds = response.postIds;
            //     this.form.roleIds = response.roleIds;
            this.open = true;
            this.title = '修改用户';
            //     this.form.password = '';
            // });
        },
        /** 提交按钮 */
        submitForm: function() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    if (this.form.userId != undefined) {
                        // updateUser(this.form).then(response => {
                        //     if (response.code === 200) {
                        //         this.msgSuccess('修改成功');
                        //         this.open = false;
                        //         this.getList();
                        //     }
                        // });
                    } else {
                        // addUser(this.form).then(response => {
                        //     if (response.code === 200) {
                        //         this.msgSuccess('新增成功');
                        //         this.open = false;
                        //         this.getList();
                        //     }
                        // });
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.el-table--mini,
.el-table--small,
.el-table__expand-icon {
    font-size: 14px;
}
.el-form .el-form-item__label {
    font-weight: bold;
}

.handle-box {
    margin-bottom: 8px;
}

.table {
    width: 100%;
    font-size: 14px;
}
</style>
