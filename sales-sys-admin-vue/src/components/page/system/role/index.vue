<template>
    <div>
        <div class="container">
            <el-form :model="queryParams" ref="queryParams" :inline="true">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="queryParams.roleName" placeholder="请输入角色名称" clearable size="small" style="width: 200px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="权限编码" prop="roleKey">
                    <el-input v-model="queryParams.roleKey" placeholder="请输入权限编码" clearable size="small" style="width: 200px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="queryParams.status" placeholder="角色状态" clearable size="small" style="width: 200px">
                        <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="dateRange"
                        size="small"
                        style="width: 240px"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="handle-box">
                <el-button type="primary" size="mini" icon="el-icon-plus" class="handle-del mr10" @click="addRoleHandle">新增</el-button>
                <el-button type="success" size="mini" icon="el-icon-edit" class="handle-del mr10" :disabled="single" @click="editRoleHandle">修改</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" class="handle-del mr10" @click="delRoleHandle">删除</el-button>
            </div>
            <el-table :data="tableData" class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="roleId" label="角色编号" width="120" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="roleKey" label="权限编码" align="center"></el-table-column>
                <el-table-column label="角色状态" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="editRoleHandle(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="delRoleHandle(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="queryParams.pageIndex"
                    :page-size="queryParams.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        
        <!-- 添加或修改角色配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="角色名称" prop="roleName"><el-input v-model="form.roleName" placeholder="请输入角色名称" /></el-form-item>
                <el-form-item label="权限编码" prop="roleKey"><el-input v-model="form.roleKey" placeholder="请输入权限编码" /></el-form-item>
                <!-- <el-form-item label="角色顺序" prop="roleSort"><el-input-number v-model="form.roleSort" controls-position="right" :min="0" /></el-form-item> -->
                <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                        <el-radio v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictValue">{{ dict.dictLabel }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="菜单权限">
                    <el-tree :data="menuOptions" show-checkbox ref="menu" node-key="id" empty-text="加载中，请稍后" :props="defaultProps"></el-tree>
                </el-form-item> -->
                <el-form-item label="备注"><el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input></el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { roleData,getRole } from '@/api/system/role.js';
export default {
    name: 'system-role',
    data() {
        return {
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                roleName: undefined,
                roleKey: undefined,
                status: undefined
            },
            // 非单个禁用
            single: true,
            // 状态数据字典
            statusOptions: [{ dictValue: '0', dictLabel: '启用'}, { dictValue: '1', dictLabel: '禁用' }],
            // 日期范围
            dateRange: [],
            tableData: [],
            pageTotal: 0,
            //表单参数
            title: '',
            open: false,
            form: {},
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            // 表单校验
            rules: {
                roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
                roleKey: [{ required: true, message: '权限编码不能为空', trigger: 'blur' }],
                roleSort: [{ required: true, message: '角色顺序不能为空', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        // 表单重置
        reset() {
            if (this.$refs.menu != undefined) {
                this.$refs.menu.setCheckedKeys([]);
            }
            this.form = {
                roleId: undefined,
                roleName: undefined,
                roleKey: undefined,
                roleSort: 0,
                status: '0',
                menuIds: [],
                deptIds: [],
                remark: undefined
            };
            this.resetForm('form');
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.dateRange = [];
            this.resetForm('queryParams');
            this.handleQuery();
        },
        // 多选操作
        handleSelectionChange(selection) {
            this.multipleSelection = selection;
            this.single = selection.length != 1;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageNum', val);
            this.getData();
        },
        /** 查询角色列表 */
        getList() {
            roleData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        /** 查询菜单树结构 */
        getMenuTreeselect() {
            this.$message.success('查询菜单树结构');
            // menuTreeselect().then(response => {
            //     this.menuOptions = response.data;
            // });
        },
        /** 添加按钮操作 */
        addRoleHandle() {
            this.reset();
            // this.getMenuTreeselect();
            this.open = true;
            this.title = '添加角色';
        },
        /** 修改按钮操作 */
        editRoleHandle(row) {
            console.log(row)
            this.reset();
            const roleId = row.roleId || this.ids;
            // const roleMenu = this.getRoleMenuTreeselect(roleId);
            getRole(roleId).then(response => {
                console.log(response.list[0])
                this.form = response.list[0];
                this.form = row;
                this.open = true;
            //     this.$nextTick(() => {
            //         roleMenu.then(res => {
            //             this.$refs.menu.setCheckedKeys(res.checkedKeys);
            //         });
            //     });
                this.title = '修改角色';
            });
        },
        /** 删除按钮操作 */
        delRoleHandle() {
            this.$message.success('删除角色');
        },
        saveEdit() {
            this.$message.success('保存');
        },
        submitForm() {
            this.$message.success('提交表单');
        },
        cancel() {
            this.open = false;
            this.reset();
        }
    }
};
</script>

<style scoped>
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