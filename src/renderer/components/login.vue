<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin } from '../api/api'
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        account: 'admin',
        checkPass: '123456'
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 (ev) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true
          var loginParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          }
          requestLogin(loginParams)
            .then((data) => {
              this.logining = false
              let msg = data.msg
              let code = data.code
              let user = data.obj
              if (code !== '200') {
                this.$message({
                  message: msg,
                  type: 'error'
                })
              } else {
                sessionStorage.setItem('user', JSON.stringify(user))
                this.$router.push({ path: '/company' })
              }
            })
            .catch(res => {
              this.$message({
                message: '登录失败',
                type: 'error'
              })
              this.logining = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 20px auto;
  width: 280px;
  padding: 35px 35px 15px 35px;
  background: rgb(245, 251, 253);
  border: 1px solid #e2f3f7;
  box-shadow: 0 0 5px #cac6c6;
}
.login-container .title {
    margin: 0px auto 20px auto;
    text-align: center;
    color: #000000;
  }
.login-container .remember {
    margin: 0px 0px 20px 0px;
  }
</style>