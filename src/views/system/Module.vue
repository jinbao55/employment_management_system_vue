/**
* 访问企拓岗 企业招聘
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-button size="max" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
    </el-form>
    <!--列表-->

    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="index" width="60">
      </el-table-column>
      <el-table-column sortable prop="menuid" label="菜单ID" width="90" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="icon" label="icon" width="300" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="menuname" label="页面名称" width="170" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="hasThird" label="存在三层" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="url" label="路径" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="parentId" label="父级id" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="sort" label="排序" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="isCrux" label="是否关键" width="100" show-overflow-tooltip>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="170">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="40%" @click="closeDialog('editForm')">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
          <el-form-item label="菜单ID" prop="menuid">
            <el-input size="small" v-model="editForm.menuid" auto-complete="off" placeholder="请输入menuid"></el-input>
          </el-form-item>
          <el-form-item label="icon" prop="icon">
            <el-input size="small" v-model="editForm.icon" auto-complete="off" placeholder="请输入学号"></el-input>
          </el-form-item>
        <el-form-item label="页面名称" prop="menuname">
          <el-input size="small" v-model="editForm.menuname" auto-complete="off" placeholder="请输入就读专业"></el-input>
        </el-form-item>
          <el-form-item label="存在三层" prop="hasThird">
            <el-select size="small" v-model="editForm.hasThird" placeholder="请选择企业类型" class="userRole">
              <el-option v-for="type in payway" :label="type.key" :value="type.value" :key="type.value"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="路径" prop="url">
          <el-input size="small" v-model="editForm.url" auto-complete="off" placeholder="请输入就读专业"></el-input>
        </el-form-item>
        <el-form-item label="父级ID" prop="parentId">
          <el-input size="small" v-model="editForm.parentId" auto-complete="off" placeholder="请输入就读专业"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input size="small" v-model="editForm.sort" auto-complete="off" placeholder="请输入就读专业"></el-input>
        </el-form-item>
        <el-form-item label="是否关键" prop="isCrux">
          <el-input size="small" v-model="editForm.isCrux" auto-complete="off" placeholder="请输入就读专业"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog('editForm')">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  RegisterGetPageList,
  RegisterEditSave,
  RegisterDelete, getMenuPageList, MenuEditSave, MenuDelete
} from '../../api/statisticsUrl'
import Pagination from '../../components/Pagination'
export default {
  inject:['reload'],//  此处引入在app中定义的reload方法
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      workType: [
        { key: '请选择企业类型', value: '' },
        { key: '国有企业', value: '国有企业' },
        { key: '民营企业', value: '民营企业' },
        { key: '外资企业', value: '外资企业' },
        { key: '政府单位', value: '政府单位' },
        { key: '事业单位', value: '事业单位' },
        { key: '考研', value: '考研' },
        { key: '其他', value: '其他' }
      ],
      dateType: [
        { key: '请选择毕业时间', value: '' },
        { key: '2023', value: 2023 },
        { key: '2022', value: 2022 },
        { key: '2021', value: 2021 },
        { key: '2020', value: 2020 },
        { key: '2019', value: 2019 },
        { key: '2018', value: 2018 },
        { key: '2017', value: 2017 },
        { key: '2016', value: 2016 },
        { key: '2015', value: 2015 },
        { key: '2014', value: 2014 },
      ],
      payway: [
        { key: '', value: "" },
        { key: 'N', value: "N" }
      ],
      iswork:[
        { key: '是', value: "是" },
        { key: '否', value: "否" }
      ],
      editForm: {
        menuid:'',
        icon:'',
        menuname:'',
        hasThird:'',
        url:'',
        parentId:'',
        sort:'',
        isCrux:''
      },
      formInline: {
        page: 1,
        limit: 20,
        college: '',
        workType:'',
        major: '',
        workCities: '',
        graduationYear:'',
        token: localStorage.getItem('logintoken')
      },
      // 删除部门
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表
    getdata(parameter) {
      this.loading = true
      /***
       * 调用接口
       */
      getMenuPageList(parameter)
        .then(res => {
          this.loading = false
          if (res.success == false) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.listData = res.data
            // 分页赋值
            this.pageparm.currentPage = this.formInline.page
            this.pageparm.pageSize = this.formInline.limit
            this.pageparm.total = res.code
          }
          if(res.code==505){
            this.$message.error('请重新登陆')
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('菜单加载失败，请稍后再试！')
        })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.menuid = row.menuid
        this.editForm.icon = row.icon
        this.editForm.menuname = row.menuname
        this.editForm.hasThird = row.hasThird
        this.editForm.url = row.url
        this.editForm.parentId = row.parentId
        this.editForm.sort = row.sort
        this.editForm.isCrux = row.isCrux
      } else {
        this.title = '添加'
        this.editForm.menuid = ''
        this.editForm.icon = ''
        this.editForm.menuname = ''
        this.editForm.hasThird = ''
        this.editForm.url = ''
        this.editForm.parentId = ''
        this.editForm.sort = ''
        this.editForm.isCrux = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          MenuEditSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
                //保存成后刷新当前页
                this.reload();
              } else {
                this.$message({
                  type: 'success',
                  message: res.msg
                })
                //保存成后刷新当前页
                this.reload();
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除公司
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          MenuDelete(row.menuid)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'success',
                  message: res.msg
                })
                //保存成后刷新当前页
                this.reload();
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog(formName) {
      this.editFormVisible = false
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>


