(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04d330b7"],{"1f55":function(e,t,a){},a56c:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"container"},[a("el-form",{ref:"queryParams",attrs:{model:e.queryParams,inline:!0}},[a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入角色名称",clearable:"",size:"small"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.roleName,callback:function(t){e.$set(e.queryParams,"roleName",t)},expression:"queryParams.roleName"}})],1),a("el-form-item",{attrs:{label:"权限编码",prop:"roleKey"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入权限编码",clearable:"",size:"small"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.roleKey,callback:function(t){e.$set(e.queryParams,"roleKey",t)},expression:"queryParams.roleKey"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"角色状态",clearable:"",size:"small"},model:{value:e.queryParams.status,callback:function(t){e.$set(e.queryParams,"status",t)},expression:"queryParams.status"}},e._l(e.statusOptions,(function(e){return a("el-option",{key:e.dictValue,attrs:{label:e.dictLabel,value:e.dictValue}})})),1)],1),a("el-form-item",{attrs:{label:"创建时间"}},[a("el-date-picker",{staticStyle:{width:"240px"},attrs:{size:"small","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dateRange,callback:function(t){e.dateRange=t},expression:"dateRange"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.handleQuery}},[e._v("搜索")]),a("el-button",{attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:e.resetQuery}},[e._v("重置")])],1)],1),a("div",{staticClass:"handle-box"},[a("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:e.addRoleHandle}},[e._v("新增")]),a("el-button",{staticClass:"handle-del mr10",attrs:{type:"success",size:"mini",icon:"el-icon-edit",disabled:e.single},on:{click:e.editRoleHandle}},[e._v("修改")]),a("el-button",{staticClass:"handle-del mr10",attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:e.delRoleHandle}},[e._v("删除")])],1),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,"header-cell-class-name":"table-header"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"roleId",label:"角色编号",width:"120",align:"center"}}),a("el-table-column",{attrs:{prop:"roleName",label:"角色名称",align:"center"}}),a("el-table-column",{attrs:{prop:"roleKey",label:"权限编码",align:"center"}}),a("el-table-column",{attrs:{label:"角色状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-value":"0","inactive-value":"1"},on:{change:function(a){return e.handleStatusChange(t.row)}},model:{value:t.row.status,callback:function(a){e.$set(t.row,"status",a)},expression:"scope.row.status"}})]}}])}),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",align:"center"}}),a("el-table-column",{attrs:{label:"操作",width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.editRoleHandle(t.$index,t.row)}}},[e._v("修改")]),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.delRoleHandle(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":e.queryParams.pageIndex,"page-size":e.queryParams.pageSize,total:e.pageTotal},on:{"current-change":e.handlePageChange}})],1)],1),a("el-dialog",{attrs:{title:e.title,visible:e.open,width:"500px","append-to-body":""},on:{"update:visible":function(t){e.open=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{placeholder:"请输入角色名称"},model:{value:e.form.roleName,callback:function(t){e.$set(e.form,"roleName",t)},expression:"form.roleName"}})],1),a("el-form-item",{attrs:{label:"权限编码",prop:"roleKey"}},[a("el-input",{attrs:{placeholder:"请输入权限编码"},model:{value:e.form.roleKey,callback:function(t){e.$set(e.form,"roleKey",t)},expression:"form.roleKey"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-radio-group",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},e._l(e.statusOptions,(function(t){return a("el-radio",{key:t.dictValue,attrs:{label:t.dictValue}},[e._v(e._s(t.dictLabel))])})),1)],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")]),a("el-button",{on:{click:e.cancel}},[e._v("取 消")])],1)],1)],1)},r=[],s=a("b775"),n=function(e){return Object(s["a"])({url:"/json/system/roleData.json",method:"get",params:e})},o=function(e){return Object(s["a"])({url:"/json/system/roleData.json",method:"get",params:e})},i={name:"system-role",data:function(){return{queryParams:{pageNum:1,pageSize:10,roleName:void 0,roleKey:void 0,status:void 0},single:!0,statusOptions:[{dictValue:"0",dictLabel:"启用"},{dictValue:"1",dictLabel:"禁用"}],dateRange:[],tableData:[],pageTotal:0,title:"",open:!1,form:{},defaultProps:{children:"children",label:"label"},rules:{roleName:[{required:!0,message:"角色名称不能为空",trigger:"blur"}],roleKey:[{required:!0,message:"权限编码不能为空",trigger:"blur"}],roleSort:[{required:!0,message:"角色顺序不能为空",trigger:"blur"}]}}},created:function(){this.getList()},methods:{reset:function(){void 0!=this.$refs.menu&&this.$refs.menu.setCheckedKeys([]),this.form={roleId:void 0,roleName:void 0,roleKey:void 0,roleSort:0,status:"0",menuIds:[],deptIds:[],remark:void 0},this.resetForm("form")},handleQuery:function(){this.queryParams.pageNum=1,this.getList()},resetQuery:function(){this.dateRange=[],this.resetForm("queryParams"),this.handleQuery()},handleSelectionChange:function(e){this.multipleSelection=e,this.single=1!=e.length},handlePageChange:function(e){this.$set(this.query,"pageNum",e),this.getData()},getList:function(){var e=this;n(this.query).then((function(t){console.log(t),e.tableData=t.data,e.pageTotal=t.pageTotal||50}))},getMenuTreeselect:function(){this.$message.success("查询菜单树结构")},addRoleHandle:function(){this.reset(),this.open=!0,this.title="添加角色"},editRoleHandle:function(e){var t=this;console.log(e),this.reset();var a=e.roleId||this.ids;o(a).then((function(a){console.log(a.list[0]),t.form=a.list[0],t.form=e,t.open=!0,t.title="修改角色"}))},delRoleHandle:function(){this.$message.success("删除角色")},saveEdit:function(){this.$message.success("保存")},submitForm:function(){this.$message.success("提交表单")},cancel:function(){this.open=!1,this.reset()}}},c=i,u=(a("d82d"),a("2877")),d=Object(u["a"])(c,l,r,!1,null,"21091094",null);t["default"]=d.exports},d82d:function(e,t,a){"use strict";var l=a("1f55"),r=a.n(l);r.a}}]);