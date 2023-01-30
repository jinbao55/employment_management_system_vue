/**
* 系统管理 用户管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-select size="small" v-model="formInline.state" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="已锁定" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.name" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.tel" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加用户</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @selection-change="selectChange" :data="userData" highlight-current-row v-loading="loading"
              border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="loginName" label="登录名" width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="name" label="真实姓名" width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="tel" label="手机号" width="120">
      </el-table-column>

      <el-table-column align="center" sortable prop="college" label="学院" min-width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="major" label="专业" min-width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="classNo" label="班级" min-width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="post" label="职务" min-width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="type" label="用户类型" min-width="50">
      </el-table-column>


      <el-table-column align="center" sortable prop="state" label="状态" min-width="50">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state=='1'?nshow:fshow" active-color="#13ce66" inactive-color="#ff4949"
                     @change="editType(scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="resetpwd(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="用户名" prop="loginName">
          <el-input size="small" v-model="editForm.loginName" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-select size="small" v-model="editForm.type" placeholder="请选择" class="userRole">
            <el-option label="学生" value="学生"></el-option>
            <el-option label="教职工" value="学生"></el-option>
            <el-option label="管理员" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input size="small" v-model="editForm.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-select size="small" v-model="editForm.college" placeholder="请选择学院">
            <el-option v-for="type in payway" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业" prop="major">
          <el-input size="small" v-model="editForm.major" placeholder="请输入专业"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classNo">
          <el-input size="small" v-model="editForm.classNo" placeholder="请输入班级如：1901"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="post">
          <el-input size="small" v-model="editForm.post" placeholder="请输入职务，若无则留空"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="editForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存
        </el-button>
      </div>
    </el-dialog>
    <!-- 数据权限 -->
    <el-dialog title="数据权限" :visible.sync="dataAccessshow" width="30%" @click='closeDialog("perm")'>
      <el-tree ref="tree" default-expand-all="" :data="UserDept" :props="defaultProps" :default-checked-keys="checkmenu"
               node-key="id" show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("perm")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="menuPermSave">保存</el-button>
      </div>
    </el-dialog>
    <!-- 所属单位 -->
    <el-dialog title="所属单位" :visible.sync="unitAccessshow" width="30%" @click='closeDialog("unit")'>
      <el-tree ref="tree" default-expand-all="" :data="UserDept" :props="defaultProps" @check-change="handleClick"
               :default-checked-keys="checkmenu" node-key="id" show-checkbox check-strictly>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("unit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="unitPermSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入请求方法
import {
  userList,
  userRegister,
  deleteUser,
  resetPassword

} from '../../api/userUrl'
import Pagination from '../../components/Pagination'
import {userLock} from "../../api/userMG";

export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: '添加用户',
      editFormVisible: false, //控制编辑页面显示与隐藏
      dataAccessshow: false, //控制数据权限显示与隐藏
      unitAccessshow: false, //控制所属单位隐藏与显示
      // 编辑与添加
      editForm: {
        loginName: '',
        name: '',
        password: '',
        type: '',
        tel: '',
        college: '',
        major: '',
        classNo: '',
        post: '',
        token: localStorage.getItem('logintoken')
      },
      // 部门参数
      unitparm: {
        userIds: '',
        deptId: '',
        deptName: ''
      },
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        loginName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        roleId: [{required: true, message: '请选择角色', trigger: 'blur'}],
        tel: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {
            pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
            required: true,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        userEmail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        userSex: [{required: true, message: '请选择性别', trigger: 'blur'}]
      },
      // 删除用户
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      // 重置密码
      resetpsd: {
        id: '',
        token: localStorage.getItem('logintoken')
      },
      // 用户下线
      offline: {
        token: localStorage.getItem('logintoken')
      },
      // 请求数据参数
      formInline: {
        page: 1,
        limit: 10,
        deptId: '',
        name: '',
        tel: '',
        state: ''
      },
      payway: [
        {key: '请选择学院', value: ""},
        {key: '信息工程学院', value: "信息工程学院"},
        {key: '艺术学院', value: "艺术学院"},
        {key: '欧美语言文化学院', value: "欧美语言文化学院"},
        {key: '东南亚语言文化学院', value: "东南亚语言文化学院"},
        {key: '文学院', value: "文学院"},
        {key: '国际经济与贸易学院', value: "国际经济与贸易学院"},
        {key: '工商与公共管理学院', value: "工商与公共管理学院"},
        {key: '会计学院', value: "会计学院"},
        {key: '教育学院', value: "教育学院"},
        {key: '马克思主义学院', value: "马克思主义学院"},
        {key: '高等职业学院', value: "高等职业学院"},
        {key: '致达教育学院', value: "致达教育学院"},
        {key: '东盟法商学院', value: "东盟法商学院"}

      ],
      //用户数据
      userData: [],
      // 数据权限
      UserDept: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 100
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
  watch: {},

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
    // 获取数据方法
    getdata(parameter) {
      this.loading = true

      // 获取用户列表
      userList(parameter).then(res => {
        this.loading = false
        if (res.success == false) {
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          this.userData = res.data
          // 分页赋值
          this.pageparm.currentPage = this.formInline.page
          this.pageparm.pageSize = this.formInline.limit
          this.pageparm.total = res.code
        }
      })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    //搜索事件
    search() {
      this.getdata(this.formInline)
    },
    // 修改type
    editType: function (index, row) {
      this.loading = true
      let parm = {
        state: '',
        id: ''
      }
      parm.id = row.id
      let state = row.state
      if (state == '1') {
        parm.state = '0'
      } else {
        parm.state = '1'
      }
      // 修改状态
      userLock(parm).then(res => {
        this.loading = false
        if (res.success == false) {
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'success',
            message: '状态修改成功'
          })
          this.getdata(this.formInline)
        }
      })
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改用户'
        this.editForm.id = row.id
        this.editForm.loginName = row.loginName
        this.editForm.name = row.name
        this.editForm.type = row.type
        this.editForm.tel = row.tel
        this.editForm.college = row.college
        this.editForm.major = row.major
        this.editForm.classNo = row.classNo
        this.editForm.post = row.post
      } else {
        this.title = '添加用户'
        this.editForm.loginName = ''
        this.editForm.name = ''
        this.editForm.type = ''
        this.editForm.tel = ''
        this.editForm.college = ''
        this.editForm.major = ''
        this.editForm.classNo = ''
        this.editForm.post = ''
      }
    },
    // 添加提交方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          userRegister(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据保存成功！'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
                this.getdata(this.formInline)
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
    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteUser(row.id)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '数据已删除!'
                })
                this.getdata(this.formInline)
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
                this.getdata(this.formInline)
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
    // 重置密码
    resetpwd(index, row) {
      this.resetpsd.id = row.id
      this.$confirm('确定要重置密码吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          resetPassword(this.resetpsd)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '重置为通用密码：123456'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('重置密码失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消重置密码！'
          })
        })
    },

    // 下线用户
    offlineUser(index, row) {
      this.$confirm('确定要让' + row.userName + '用户下线吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userExpireToken(row.userName)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '用户' + row.userName + '强制下线成功！'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('用户下线失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
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

