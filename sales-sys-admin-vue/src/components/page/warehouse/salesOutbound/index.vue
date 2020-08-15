<template>
    <div>
        <div class="container">
            <el-form :model="queryParams" ref="queryParams" :inline="true">
                <el-form-item label="仓库名称" prop="warehouseName">
                    <el-input v-model="queryParams.warehouseName" placeholder="请输入仓库名称" clearable size="small" style="width: 200px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="仓库编码" prop="warehouseNum">
                    <el-input v-model="queryParams.warehouseNum" placeholder="请输入仓库编码" clearable size="small" style="width: 200px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="queryParams.status" placeholder="选择状态" clearable size="small" style="width: 200px">
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
                <el-button type="warning" size="mini" icon="el-icon-finished" class="handle-del mr10" :disabled="multiple" @click="handleAudit">审核</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" class="handle-del mr10" @click="handleDelete" :disabled="multiple">删除</el-button>
                <el-button type="primary" size="mini" icon="el-icon-printer" class="handle-del mr10" @click="handlePrint" :disabled="single">打印</el-button>
            </div>
            <el-table :data="tableData" class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="warehouseId" label="编号" width="120" align="center"></el-table-column>
                <el-table-column prop="warehouseName" label="对应仓库" align="center"></el-table-column>
                <el-table-column prop="warehouseNum" label="来源类型" align="center"></el-table-column>
                <el-table-column prop="deptName" label="供应单位" align="center"></el-table-column>
                <el-table-column prop="deptName" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="deptName" label="规格型号" align="center"></el-table-column>
                <el-table-column prop="number" label="数量" align="center"></el-table-column>
                <el-table-column prop="number" label="单位" align="center"></el-table-column>
                <el-table-column prop="number" label="单价" align="center"></el-table-column>
                <!-- <el-table-column prop="deptNum" label="部门编码" align="center"></el-table-column> -->
                <el-table-column prop="createTime" label="入库日期" align="center"></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

        <!-- 添加或修改配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
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
                        <el-form-item label="单位" prop="phonenumber"><el-input v-model="form.phonenumber" placeholder="请输入单位" maxlength="11" /></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单价" prop="email"><el-input v-model="form.email" placeholder="请输入单价" maxlength="50" /></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="产品名称" prop="phonenumber"><el-input v-model="form.phonenumber" placeholder="请输入产品名称" maxlength="11" /></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="规格型号" prop="email"><el-input v-model="form.email" placeholder="请输入规格型号" maxlength="50" /></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="数量" prop="phonenumber"><el-input v-model="form.phonenumber" placeholder="请输入数量" maxlength="11" /></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="供应单位" prop="email"><el-input v-model="form.email" placeholder="请输入供应单位" maxlength="50" /></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="仓库名称" prop="clienteleName">
                            <el-input v-model="form.clienteleName" placeholder="请输入仓库名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="入库日期" prop="password"><el-input v-model="form.password" type="date" /></el-form-item>
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
import { listData, getWarehouse } from '@/api/basis/warehouse.js';
import { treeselect } from '@/api/system/dept.js';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
    name: 'warehouse-salesOutbound',
    components: { Treeselect },
    data() {
        return {
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                warehouseName: undefined,
                warehouseNum: undefined,
                status: undefined
            },
            // 非单个禁用
            single: true,
            //非多个禁用
            multiple: true,
            // 状态数据字典
            statusOptions: [{ dictValue: '0', dictLabel: '启用' }, { dictValue: '1', dictLabel: '禁用' }],
            //归属部门
            deptOptions: undefined,
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
                warehouseName: [{ required: true, message: '仓库名称不能为空', trigger: 'blur' }],
                warehouseNum: [{ required: true, message: '仓库编码不能为空', trigger: 'blur' }],
                roleSort: [{ required: true, message: '顺序不能为空', trigger: 'blur' }]
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
                warehouseId: undefined,
                warehouseName: undefined,
                warehouseNum: undefined,
                status: '0',
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
            this.multiple = !selection.length;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageNum', val);
            this.getData();
        },
        /** 查询列表 */
        getList() {
            listData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        /** 查询部门下拉树结构 */
        getTreeselect() {
            treeselect().then(response => {
                console.log(response);
                this.deptOptions = response.data;
            });
        },
        /** 添加按钮操作 */
        handleAdd() {
            this.reset();
            this.getTreeselect();
            this.open = true;
            this.title = '添加仓库';
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            console.log(row);
            this.reset();
            this.getTreeselect();
            const warehouseId = row.warehouseId || this.ids;
            // const roleMenu = this.getWarehouseMenuTreeselect(warehouseId);
            // getWarehouse(warehouseId).then(response => {
            //     console.log(response)
            this.form = row;
            this.open = true;
            //     this.$nextTick(() => {
            //         roleMenu.then(res => {
            //             this.$refs.menu.setCheckedKeys(res.checkedKeys);
            //         });
            //     });
            this.title = '修改仓库';
            // });
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
