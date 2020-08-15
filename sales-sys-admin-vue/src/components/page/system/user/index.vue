<template>
    <div class="container">
        <el-row :gutter="20">
            <!--部门数据-->
            <el-col :span="4" :xs="24">
                <div class="head-container">
                    <el-input v-model="deptName" placeholder="请输入部门名称" clearable size="small" prefix-icon="el-icon-search" style="margin-bottom: 20px" />
                </div>
                <div class="head-container">
                    <el-tree
                        :data="deptOptions"
                        :props="defaultProps"
                        :expand-on-click-node="false"
                        :filter-node-method="filterNode"
                        ref="tree"
                        default-expand-all
                        @node-click="handleNodeClick"
                    />
                </div>
            </el-col>
            <!--用户数据-->
            <el-col :span="20" :xs="24">
                <el-form :model="queryParams" ref="queryParams" :inline="true">
                    <el-form-item label="用户编码" prop="userNum">
                        <el-input v-model="queryParams.userNum" placeholder="请输入用户编码" clearable size="small" style="width: 200px" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item label="用户名称" prop="userName">
                        <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable size="small" style="width: 200px" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="queryParams.status" placeholder="用户状态" clearable size="small" style="width: 200px">
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
                    <el-button type="danger" size="mini" icon="el-icon-delete" class="handle-del mr10" @click="delRoleHandle">删除</el-button>
                </div>
                <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="用户编号" align="center" prop="userId" />
                    <el-table-column label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true" />
                    <el-table-column label="用户昵称" align="center" prop="nickName" :show-overflow-tooltip="true" />
                    <el-table-column label="部门" align="center" prop="dept.deptName" :show-overflow-tooltip="true" />
                    <el-table-column label="手机号码" align="center" prop="phonenumber" width="120" />
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" prop="createTime" width="160"></el-table-column>
                    <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                            <el-button v-if="scope.row.userId !== 1" size="mini" type="text" icon="el-icon-delete" @click="delRoleHandle(scope.row)">删除</el-button>
                            <el-button size="mini" type="text" icon="el-icon-key" @click="handleStatusChange(scope.row)">重置</el-button>
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
            </el-col>
        </el-row>
        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户昵称" prop="nickName"><el-input v-model="form.nickName" placeholder="请输入用户昵称" /></el-form-item>
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
                        <el-form-item label="邮箱" prop="email"><el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" /></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="用户名称" prop="userName">
                            <el-input v-model="form.userName" placeholder="请输入用户名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
                            <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="系统用户" prop="password">
                            <el-radio-group v-model="form.status">
                                <el-radio v-for="dict in isUserOptions" :key="dict.dictValue" :label="dict.dictValue">{{ dict.dictLabel }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户性别">
                            <el-select v-model="form.sex" placeholder="请选择">
                                <el-option v-for="dict in sexOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.status">
                                <el-radio v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictValue">{{ dict.dictLabel }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <!-- <el-row>
                    <el-col :span="12">
                        <el-form-item label="岗位">
                            <el-select v-model="form.postIds" multiple placeholder="请选择">
                                <el-option v-for="item in postOptions" :key="item.postId" :label="item.postName" :value="item.postId" :disabled="item.status == 1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色">
                            <el-select v-model="form.roleIds" multiple placeholder="请选择">
                                <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId" :disabled="item.status == 1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> -->
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
import { listUser } from '@/api/system/user.js';
import { treeselect } from '@/api/system/dept.js';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
    name: 'system-user',
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
            userList: [],
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
                userName: undefined,
                phonenumber: undefined,
                status: undefined,
                deptId: undefined
            },
            // 表单校验
            rules: {
                userName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
                nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
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
            listUser(this.query).then(res => {
                console.log(res);
                this.userList = res.rows;
                this.pageTotal = res.total || 50;
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
                userName: undefined,
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
        // 用户状态修改
        handleStatusChange(row) {
            let text = row.status === '0' ? '启用' : '停用';
            this.$confirm('确认要' + text + ' "' + row.userName + '" 用户吗?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(function() {
                // return changeUserStatus(row.userId, row.status);
                this.msgSuccess('修改成功');
            })
            .then(() => {
                this.msgSuccess(text + '成功');
            })
            .catch(function() {
                row.status = row.status === '0' ? '1' : '0';
            });
        },
        delRoleHandle() {
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
.el-table--mini, .el-table--small, .el-table__expand-icon{
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
