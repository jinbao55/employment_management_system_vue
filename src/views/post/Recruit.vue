/**
 * 访问企拓岗 企业招聘
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>企业招聘</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.company" placeholder="输入企业名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select size="small" v-model="formInline.type" placeholder="企业类型">
          <el-option v-for="type in payType" :label="type.key" :value="type.value" :key="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.place" placeholder="输入地点"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="index" width="60">
      </el-table-column>
      <el-table-column sortable prop="theme" label="招聘主题" width="230" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="date" label="发布日期" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="company" label="招聘企业" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="scale" label="企业规模" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="type" label="企业类型" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="industry" label="所属行业" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="place" label="工作地点" width="70" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="mail" label="企业邮箱" width="190" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="number" label="招聘人数" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="state" label="状态" width="60" show-overflow-tooltip>
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
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog('editForm')">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="招聘主题" prop="theme">
          <el-input size="small" v-model="editForm.theme" auto-complete="off" placeholder="请输入招聘主题"></el-input>
        </el-form-item>
        <el-form-item label="招聘企业" prop="company">
          <el-input size="small" v-model="editForm.company" auto-complete="off" placeholder="请输入招聘企业"></el-input>
        </el-form-item>
        <el-form-item label="企业规模" prop="scale">
          <el-input size="small" v-model="editForm.scale" auto-complete="off" placeholder="请输入企业规模人数"></el-input>
        </el-form-item>
        <el-form-item label="企业类型" prop="type">
          <el-select size="small" v-model="editForm.type" placeholder="请选择企业类型" class="userRole">
            <el-option v-for="type in payType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业" prop="industry">
          <el-input size="small" v-model="editForm.industry" auto-complete="off" placeholder="请输入企业所属行业"></el-input>
        </el-form-item>
        <el-form-item label="工作地点" prop="place">
          <el-input size="small" v-model="editForm.place" auto-complete="off" placeholder="请输入地点"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱" prop="mail">
          <el-input size="small" v-model="editForm.mail" auto-complete="off" placeholder="请输入企业邮箱"></el-input>
        </el-form-item>
        <el-form-item label="招聘人数" prop="number">
          <el-input size="small" v-model="editForm.number" auto-complete="off" placeholder="请输入招聘人数"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select size="small" v-model="editForm.state" placeholder="请选择企业类型" class="userRole">
            <el-option v-for="state in stateType" :label="state.key" :value="state.value" :key="state.value"></el-option>
          </el-select>
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
  RecruitGetPageList,
  RecruiteditSave,
  Recruitdelete
} from '../../api/postUrl'
import Pagination from '../../components/Pagination'
export default {
  inject:['reload'],//  此处引入在app中定义的reload方法
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      payType: [
        { key: '请选择企业类型', value: '' },
        { key: '国有企业', value: '国有企业' },
        { key: '民营企业', value: '民营企业' },
        { key: '外资企业', value: '外资企业' },
        { key: '政府单位', value: '政府单位' },
        { key: '事业单位', value: '事业单位' },
        { key: '其他', value: '其他' }
      ],
      stateType: [
        { key: '请选择状态', value: '' },
        { key: '有效', value: '有效' },
        { key: '过期', value: '过期' }
      ],
      editForm: {
        id: '',
        theme: '',
        company: '',
        statetype: '',
        scale: '',
        type: '',
        industry: '',
        place: '',
        mail: '',
        number: '',
        state: '',
        date: '',
        token: localStorage.getItem('logintoken')
      },
      formInline: {
        page: 1,
        limit: 10,
        name: '',
        type:'',
        partner: '',
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
      RecruitGetPageList(parameter)
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
        this.editForm.id = row.id
        this.editForm.name = row.name
        this.editForm.type = row.type
        this.editForm.scale = row.scale
        this.editForm.industry = row.industry
        this.editForm.place = row.place
        this.editForm.cooperation = row.cooperation
        this.editForm.theme = row.theme
        this.editForm.company = row.company
        this.editForm.mail = row.mail
        this.editForm.number = row.number
        this.editForm.state = row.state
        this.editForm.date = row.date


      } else {
        this.title = '添加'
        this.editForm.id =''
        this.editForm.name = ''
        this.editForm.type = ''
        this.editForm.scale = ''
        this.editForm.industry = ''
        this.editForm.place = ''
        this.editForm.cooperation = ''
        this.editForm.theme = ''
        this.editForm.company = ''
        this.editForm.mail = ''
        this.editForm.number = ''
        this.editForm.state = ''
        this.editForm.date = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          RecruiteditSave(this.editForm)
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
          Recruitdelete(row.id)
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


