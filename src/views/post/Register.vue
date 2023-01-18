/**
 * 访问企拓岗 企业招聘
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>就业登记</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-select size="small" v-model="formInline.college" placeholder="请选择学院">
          <el-option v-for="type in payway" :label="type.key" :value="type.value" :key="type.value"></el-option>
        </el-select>
        <el-select size="small" v-model="formInline.graduationYear" placeholder="请选择毕业时间">
          <el-option v-for="type in dateType" :label="type.key" :value="type.value" :key="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select size="small" v-model="formInline.workType" placeholder="请选择公司类型">
          <el-option v-for="type in workType" :label="type.key" :value="type.value" :key="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="formInline.major" placeholder="输入专业"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="formInline.workCities" placeholder="输入工作城市"></el-input>
      </el-form-item>

      <el-form-item>

      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">登记</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="index" width="60">
      </el-table-column>
      <el-table-column sortable prop="name" label="姓名" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="college" label="就读学院" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="major" label="就读专业" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="graduationYear" label="毕业时间" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="employmentCompany" label="就业公司" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="jobs" label="就业岗位" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="workType" label="公司类型" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="workCities" label="工作城市" width="190" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="pay" label="大致薪酬" width="100" show-overflow-tooltip>
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
        <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="sno">
          <el-input size="small" v-model="editForm.sno" auto-complete="off" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="就读学院" prop="college">
          <el-select size="small" v-model="editForm.graduationYear" placeholder="请选择企业类型" class="userRole">
            <el-option v-for="type in payway" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="就读专业" prop="college">
            <el-input size="small" v-model="editForm.major" auto-complete="off" placeholder="请输入就读专业"></el-input>
          </el-form-item>
        <el-form-item label="毕业时间" prop="graduationYear">
          <el-select size="small" v-model="editForm.graduationYear" placeholder="请选择企业类型" class="userRole">
            <el-option v-for="type in dateType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="是否就业" prop="isWork">
            <el-select size="small" v-model="editForm.isWork" placeholder="是否就业" class="userRole">
              <el-option v-for="type in iswork" :label="type.key" :value="type.value" :key="type.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="就业公司" prop="employmentCompany">
          <el-input size="small" v-model="editForm.employmentCompany" auto-complete="off" placeholder="请输入就业公司"></el-input>
        </el-form-item>
          <el-form-item label="就业岗位" prop="jobs">
            <el-input size="small" v-model="editForm.jobs" auto-complete="off" placeholder="请输入招聘人数"></el-input>
          </el-form-item>
        <el-form-item label="公司类型" prop="workType">
          <el-select size="small" v-model="editForm.workType" placeholder="请选择企业类型" class="userRole">
            <el-option v-for="state in workType" :label="state.key" :value="state.value" :key="state.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="大致薪酬" prop="pay">
          <el-input size="small" v-model="editForm.pay" auto-complete="off" placeholder="请输入大致薪酬"></el-input>
        </el-form-item>
        <el-form-item label="工作城市" prop="workCities">
          <el-input size="small" v-model="editForm.workCities" auto-complete="off" placeholder="请输入工作城市"></el-input>
        </el-form-item>
        </el-col>
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
  RegisterDelete
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
        { key: '请选择学院', value: "" },
        { key: '信息工程学院', value: "信息工程学院" },
        { key: '艺术学院', value: "艺术学院" },
        { key: '欧美语言文化学院', value: "欧美语言文化学院" },
        { key: '东南亚语言文化学院', value: "东南亚语言文化学院" },
        { key: '文学院', value: "文学院" },
        { key: '国际经济与贸易学院', value: "国际经济与贸易学院" },
        { key: '工商与公共管理学院', value: "工商与公共管理学院" },
        { key: '会计学院', value: "会计学院" },
        { key: '教育学院', value: "教育学院" },
        { key: '马克思主义学院', value: "马克思主义学院" },
        { key: '高等职业学院', value: "高等职业学院" },
        { key: '致达教育学院', value: "致达教育学院" },
        { key: '东盟法商学院', value: "东盟法商学院" }

      ],
      iswork:[
        { key: '是', value: "是" },
        { key: '否', value: "否" }
      ],
      editForm: {
        name:'',
        sno:'',
        college:'',
        major:'',
        graduationYear:'',
        isWork:'',
        employmentCompany:'',
        jobs:'',
        workType:'',
        pay:'',
        workCities:'',
        token: localStorage.getItem('logintoken')
      },
      formInline: {
        page: 1,
        limit: 10,
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
      RegisterGetPageList(parameter)
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
        this.editForm.sno = row.sno
        this.editForm.college = row.college
        this.editForm.graduationYear = row.graduationYear
        this.editForm.isWork = row.isWork
        this.editForm.employmentCompany = row.employmentCompany
        this.editForm.jobs = row.jobs
        this.editForm.workType = row.workType
        this.editForm.pay = row.pay
        this.editForm.workCities = row.workCities
        this.editForm.major=row.major
      } else {
        this.title = '添加'
        this.editForm.id = ''
        this.editForm.name = ''
        this.editForm.sno = ''
        this.editForm.college = ''
        this.editForm.graduationYear = ''
        this.editForm.isWork = ''
        this.editForm.employmentCompany = ''
        this.editForm.jobs = ''
        this.editForm.workType = ''
        this.editForm.pay = ''
        this.editForm.workCities = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          RegisterEditSave(this.editForm)
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
          RegisterDelete(row.id)
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


