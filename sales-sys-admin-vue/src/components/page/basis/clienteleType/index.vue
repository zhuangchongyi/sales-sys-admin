<template>
    <div>
        <div class="container">
            <el-form :inline="true">
                <el-form-item label="客户类别名称">
                    <el-input v-model="queryParams.deptName" placeholder="请输入客户类别名称" clearable size="small" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="客户类别编码">
                    <el-input v-model="queryParams.deptNum" placeholder="请输入客户类别编码" clearable size="small" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="queryParams.status" placeholder="客户类别状态" clearable size="small">
                        <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    <el-button class="filter-item" type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>

            <el-table style="width: 100%" v-loading="loading" :data="deptList" row-key="deptId" default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="deptName" label="客户类别名称" width="260"></el-table-column>
                <el-table-column prop="deptNum" label="客户类别编码" width="200"></el-table-column>
                <el-table-column prop="status" label="状态" width="100" :formatter="statusFormat"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" width="200"></el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                        <el-button size="mini" type="text" icon="el-icon-plus" @click="handleAdd(scope.row)">新增</el-button>
                        <el-button v-if="scope.row.parentId != 0" size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加或修改客户类别对话框 -->
            <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-row>
                        <el-col :span="24" v-if="form.parentId !== 0">
                            <el-form-item label="上级类别" prop="parentId">
                                <treeselect v-model="form.parentId" :options="deptOptions" :normalizer="normalizer" placeholder="选择上级客户类别" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类别名称" prop="deptName"><el-input v-model="form.deptName" placeholder="请输入客户类别名称" /></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类别编码" prop="deptNum"><el-input v-model="form.deptNum" placeholder="请输入客户类别名称" /></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类别状态">
                                <el-radio-group v-model="form.status">
                                    <el-radio v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictValue">{{ dict.dictLabel }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { listDept, getDept, listDeptExcludeChild } from '@/api/basis/clienteleType.js';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    name: 'basis-clientele-type',
    components: { Treeselect },
    data() {
        return {
            // 遮罩层
            loading: true,
            // 表格树数据
            deptList: [],
            // 客户类别树选项
            deptOptions: [],
            // 弹出层标题
            title: '',
            // 是否显示弹出层
            open: false,
            // 状态数据字典
            statusOptions: [{ dictValue: '0', dictLabel: '启用' }, { dictValue: '1', dictLabel: '禁用' }],
            // 查询参数
            queryParams: {
                deptName: undefined,
                deptNum: undefined,
                status: undefined
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                parentId: [{ required: true, message: '上级客户类别不能为空', trigger: 'blur' }],
                deptName: [{ required: true, message: '客户类别名称不能为空', trigger: 'blur' }],
                deptNum: [{ required: true, message: '菜单顺序不能为空', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            listDept(this.queryParams).then(res => {
                console.log(res);
                this.deptList = this.handleTree(res.data, 'deptId');
                this.loading = false;
            });
        },
        // 表单重置
        reset() {
            this.form = {
                deptId: undefined,
                parentId: undefined,
                deptName: undefined,
                deptNum: undefined,
                status: '0'
            };
            this.resetForm('form');
        },
        // 字典状态字典翻译
        statusFormat(row, column) {
            return this.selectDictLabel(this.statusOptions, row.status);
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        handleQuery() {
            this.getList();
        },
        /** 转换客户类别数据结构 */
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
            }
            return {
                id: node.deptId,
                label: node.deptName,
                children: node.children
            };
        },
        /** 新增按钮操作 */
        handleAdd(row) {
            this.reset();
            if (row != undefined) {
                this.form.parentId = row.deptId;
            }
            this.open = true;
            this.title = '添加客户类别';
            listDept().then(response => {
                this.deptOptions = this.handleTree(response.data, 'deptId');
            });
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            getDept(row.deptId).then(response => {
                this.form = row;
                this.open = true;
                this.title = '修改客户类别';
            });
            listDeptExcludeChild(row.deptId).then(response => {
                this.deptOptions = this.handleTree(response.data, 'deptId');
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            this.$confirm('是否确认删除名称为"' + row.deptName + '"的数据项?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(function() {
                // return delDept(row.deptId);
                return true;
            })
            .then(() => {
                this.getList();
                this.msgSuccess('删除成功');
            })
            .catch(function() {});
        },
        /** 提交按钮 */
        submitForm: function() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    if (this.form.deptId != undefined) {
                        // updateDept(this.form).then(response => {
                        //   if (response.code === 200) {
                        //     this.msgSuccess("修改成功");
                        //     this.open = false;
                        //     this.getList();
                        //   }
                        // });
                    } else {
                        // addDept(this.form).then(response => {
                        //   if (response.code === 200) {
                        //     this.msgSuccess("新增成功");
                        //     this.open = false;
                        //     this.getList();
                        //   }
                        // });
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.el-form .el-form-item__label {
    font-weight: bold;
}
.el-table--small {
    font-size: 14px;
}
.handle-box {
    margin-bottom: 8px;
}
.table {
    width: 100%;
    font-size: 14px;
}
</style>
