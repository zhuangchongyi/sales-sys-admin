(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-267fa732"],{b8b8:function(e,t,a){"use strict";var l=a("d217"),r=a.n(l);r.a},c674:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var l=a("b775"),r=function(e){return Object(l["a"])({url:"/json/basis/warehouseData.json",method:"get",params:e})}},d217:function(e,t,a){},f55c:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"container"},[a("el-form",{ref:"queryParams",attrs:{model:e.queryParams,inline:!0}},[a("el-form-item",{attrs:{label:"仓库名称",prop:"warehouseName"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入仓库名称",clearable:"",size:"small"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.warehouseName,callback:function(t){e.$set(e.queryParams,"warehouseName",t)},expression:"queryParams.warehouseName"}})],1),a("el-form-item",{attrs:{label:"仓库编码",prop:"warehouseNum"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入仓库编码",clearable:"",size:"small"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.warehouseNum,callback:function(t){e.$set(e.queryParams,"warehouseNum",t)},expression:"queryParams.warehouseNum"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择状态",clearable:"",size:"small"},model:{value:e.queryParams.status,callback:function(t){e.$set(e.queryParams,"status",t)},expression:"queryParams.status"}},e._l(e.statusOptions,(function(e){return a("el-option",{key:e.dictValue,attrs:{label:e.dictLabel,value:e.dictValue}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.handleQuery}},[e._v("搜索")]),a("el-button",{attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:e.resetQuery}},[e._v("重置")])],1)],1),a("div",{staticClass:"handle-box"},[a("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("新增")]),a("el-button",{staticClass:"handle-del mr10",attrs:{type:"success",size:"mini",icon:"el-icon-edit",disabled:e.single},on:{click:e.handleUpdate}},[e._v("修改")]),a("el-button",{staticClass:"handle-del mr10",attrs:{type:"warning",size:"mini",icon:"el-icon-finished",disabled:e.multiple},on:{click:e.handleAudit}},[e._v("审核")]),a("el-button",{staticClass:"handle-del mr10",attrs:{type:"danger",size:"mini",icon:"el-icon-delete",disabled:e.multiple},on:{click:e.handleDelete}},[e._v("删除")]),a("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",size:"mini",icon:"el-icon-printer",disabled:e.single},on:{click:e.handlePrint}},[e._v("打印")])],1),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,"header-cell-class-name":"table-header"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"warehouseId",label:"编号",width:"120",align:"center"}}),a("el-table-column",{attrs:{prop:"warehouseName",label:"对应仓库",align:"center"}}),a("el-table-column",{attrs:{prop:"warehouseNum",label:"来源类型",align:"center"}}),a("el-table-column",{attrs:{prop:"deptName",label:"供应单位",align:"center"}}),a("el-table-column",{attrs:{prop:"deptName",label:"商品名称",align:"center"}}),a("el-table-column",{attrs:{prop:"deptName",label:"规格型号",align:"center"}}),a("el-table-column",{attrs:{prop:"number",label:"数量",align:"center"}}),a("el-table-column",{attrs:{prop:"number",label:"单位",align:"center"}}),a("el-table-column",{attrs:{prop:"number",label:"单价",align:"center"}}),a("el-table-column",{attrs:{prop:"createTime",label:"入库日期",align:"center"}}),a("el-table-column",{attrs:{label:"操作",width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.handleUpdate(t.$index,t.row)}}},[e._v("修改")]),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":e.queryParams.pageIndex,"page-size":e.queryParams.pageSize,total:e.pageTotal},on:{"current-change":e.handlePageChange}})],1)],1),a("el-dialog",{attrs:{title:e.title,visible:e.open,width:"600px","append-to-body":""},on:{"update:visible":function(t){e.open=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"客户名称",prop:"nickName"}},[a("el-input",{attrs:{placeholder:"请输入客户名称"},model:{value:e.form.nickName,callback:function(t){e.$set(e.form,"nickName",t)},expression:"form.nickName"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"归属部门",prop:"deptId"}},[a("treeselect",{attrs:{options:e.deptOptions,"disable-branch-nodes":!0,"show-count":!0,placeholder:"请选择归属部门"},model:{value:e.form.deptId,callback:function(t){e.$set(e.form,"deptId",t)},expression:"form.deptId"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"单位",prop:"phonenumber"}},[a("el-input",{attrs:{placeholder:"请输入单位",maxlength:"11"},model:{value:e.form.phonenumber,callback:function(t){e.$set(e.form,"phonenumber",t)},expression:"form.phonenumber"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"单价",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入单价",maxlength:"50"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"产品名称",prop:"phonenumber"}},[a("el-input",{attrs:{placeholder:"请输入产品名称",maxlength:"11"},model:{value:e.form.phonenumber,callback:function(t){e.$set(e.form,"phonenumber",t)},expression:"form.phonenumber"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"规格型号",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入规格型号",maxlength:"50"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"数量",prop:"phonenumber"}},[a("el-input",{attrs:{placeholder:"请输入数量",maxlength:"11"},model:{value:e.form.phonenumber,callback:function(t){e.$set(e.form,"phonenumber",t)},expression:"form.phonenumber"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"供应单位",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入供应单位",maxlength:"50"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[void 0==e.form.userId?a("el-form-item",{attrs:{label:"仓库名称",prop:"clienteleName"}},[a("el-input",{attrs:{placeholder:"请输入仓库名称"},model:{value:e.form.clienteleName,callback:function(t){e.$set(e.form,"clienteleName",t)},expression:"form.clienteleName"}})],1):e._e()],1),a("el-col",{attrs:{span:12}},[void 0==e.form.userId?a("el-form-item",{attrs:{label:"入库日期",prop:"password"}},[a("el-input",{attrs:{type:"date"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1):e._e()],1)],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")]),a("el-button",{on:{click:e.cancel}},[e._v("取 消")])],1)],1)],1)},r=[],n=a("c674"),s=a("fcb7"),o=a("ca17"),i=a.n(o),c=(a("542c"),{name:"warehouse-salesOutbound",components:{Treeselect:i.a},data:function(){return{queryParams:{pageNum:1,pageSize:10,warehouseName:void 0,warehouseNum:void 0,status:void 0},single:!0,multiple:!0,statusOptions:[{dictValue:"0",dictLabel:"启用"},{dictValue:"1",dictLabel:"禁用"}],deptOptions:void 0,dateRange:[],tableData:[],pageTotal:0,title:"",open:!1,form:{},defaultProps:{children:"children",label:"label"},rules:{warehouseName:[{required:!0,message:"仓库名称不能为空",trigger:"blur"}],warehouseNum:[{required:!0,message:"仓库编码不能为空",trigger:"blur"}],roleSort:[{required:!0,message:"顺序不能为空",trigger:"blur"}]}}},created:function(){this.getList()},methods:{reset:function(){void 0!=this.$refs.menu&&this.$refs.menu.setCheckedKeys([]),this.form={warehouseId:void 0,warehouseName:void 0,warehouseNum:void 0,status:"0",deptIds:[],remark:void 0},this.resetForm("form")},handleQuery:function(){this.queryParams.pageNum=1,this.getList()},resetQuery:function(){this.dateRange=[],this.resetForm("queryParams"),this.handleQuery()},handleSelectionChange:function(e){this.multipleSelection=e,this.single=1!=e.length,this.multiple=!e.length},handlePageChange:function(e){this.$set(this.query,"pageNum",e),this.getData()},getList:function(){var e=this;Object(n["a"])(this.query).then((function(t){console.log(t),e.tableData=t.data,e.pageTotal=t.pageTotal||50}))},getTreeselect:function(){var e=this;Object(s["d"])().then((function(t){console.log(t),e.deptOptions=t.data}))},handleAdd:function(){this.reset(),this.getTreeselect(),this.open=!0,this.title="添加仓库"},handleUpdate:function(e){console.log(e),this.reset(),this.getTreeselect();e.warehouseId||this.ids;this.form=e,this.open=!0,this.title="修改仓库"},handlePrint:function(){this.msgSuccess("打印成功")},handleAudit:function(){this.msgSuccess("操作成功")},handleDelete:function(){this.msgSuccess("操作成功")},saveEdit:function(){this.$message.success("保存")},submitForm:function(){this.$message.success("提交表单")},cancel:function(){this.open=!1,this.reset()}}}),u=c,m=(a("b8b8"),a("2877")),p=Object(m["a"])(u,l,r,!1,null,"50679d9a",null);t["default"]=p.exports},fcb7:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return s})),a.d(t,"d",(function(){return o}));var l=a("b775"),r=function(e){return Object(l["a"])({url:"/json/system/deptData.json",method:"get",params:e})},n=function(e){return Object(l["a"])({url:"/json/system/deptData.json",method:"get",params:e})},s=function(e){return Object(l["a"])({url:"/json/system/deptData.json",method:"get",params:e})},o=function(e){return Object(l["a"])({url:"/json/system/userDept.json",method:"get",params:e})}}}]);