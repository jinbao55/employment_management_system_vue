<template>
  <div class="login-wrap">

    <h1 class="title9">访企拓岗与就业管理系统</h1>


    <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="loginName">
        <el-input type="text" v-model="ruleForm.loginName" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>


      <!--      登录验证码模块-->

      <el-row>
        <el-col :span="12">
          <el-form-item prop="code">
            <el-input type="text" v-model="ruleForm.code" auto-complete="off" placeholder="点击刷新验证码"
                      @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="code-box">
          <img :src="codeUrl" alt="captcha" ref="captcha" class="codeimg" @click="getcode()">
        </el-col>
      </el-row>



      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
import {getcodeValue, login} from '../api/userMG'

export default {
  name: 'login',
  data() {
    return {
      codeUrl:"http://localhost:8005/user/captcha",
      //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
      ruleForm: {
        //loginName和password默认为空
        loginName: '',
        password: ''
      },
      //rules前端验证
      rules: {
        loginName: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.$message({
      message: '欢迎',
      type: 'success'
    })
    // 获取图形验证码
    this.getcode()
  },
  // 里面的函数只有调用才会执行
  methods: {

    //获取info列表
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.logining = true
        if (valid) {
          login(this.ruleForm)
            .then(
              res => {
                if (res.code === 200) {
                  this.logining = false
                  localStorage.setItem('userdata', JSON.stringify(res.data))
                  localStorage.setItem('token', JSON.stringify(res.msg))
                  this.$store.commit('login', 'true')
                  this.$router.push({path: '/goods/Goods'})
                } else {
                  this.logining = false
                  this.$message.error(res.data)
                  return false
                }
              },
            )
          this.logining = false
        } else {
          // 获取图形验证码
          this.getcode()
          this.$message.error('请输入验证码')
          this.logining = false
          return false
        }
      })

    },
    getcode() {
      this.$refs.captcha.src = 'http://localhost:8005/user/captcha?time=' + Date.now()
    }
  },


}
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-image: url("../assets/img/bga.jpg");
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}

.login-container {
  border-radius: 10px;
  margin: 0px 11% auto auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}



.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}


.title9 {
  margin: 0px 13.5% 40px auto;
  text-align: right;

  color: #505458;
}

.remember {
  margin: 0px 0px 35px 0px;
}

.code-box {
  text-align: right;
}

.codeimg {
  height: 50px;
}
</style>
