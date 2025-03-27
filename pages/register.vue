<template>
  <view id="register-page">
  	<view class="logo-box"></view>
  	<view class="header-box">
  		<view class="title">注册</view>
  		<view class="subhead">创建您的账户</view>
  	</view>
  	
    <view class="login-form">
      <view class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="registerForm.username" placeholder="请输入用户名">
      </view>
      <view class="form-group" style="margin-top: 30px;">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="registerForm.password" placeholder="请输入密码">
      </view>
  		<view style="margin-top: 10px;">
  			<text style="font: 600 12px 'Plus Jakarta Sans';color: #848FAC;">注意：通过注册，您同意条款和条件以及隐私政策。</text>
  		</view>
  		<view class="button-box">
  			<button class="cus-button-primary" @click="handleRegister">注册</button>
  		</view>
    </view>
		
		<view class="toLogin-box">
			<text style="font: 400 12px 'Plus Jakarta Sans';color: #848FAC;">已经有一个账户？</text>
			<text style="margin-left: 20px; font: 600 12px 'Plus Jakarta Sans';color: #2540A8;" @click="handleUserLogin">登录</text>
		</view>
		<u-toast ref="uToast" />
  </view>
	
</template>

<script>
  import { register } from '@/api/login'

  export default {
    data() {
      return {
        globalConfig: getApp().globalData.config,
        registerForm: {
          username: "",
          password: "",
          // confirmPassword: "",
          type: 'uni'
        }
      }
    },
    created() {
    },
    methods: {
      // 用户登录
      handleUserLogin() {
        this.$tab.navigateTo(`/pages/login`)
      },
      // 注册方法
      async handleRegister() {
        if (this.registerForm.username === "") {
          this.$modal.msgError("请输入您的账号")
        } else if (this.registerForm.password === "") {
          this.$modal.msgError("请输入您的密码")
        // } else if (this.registerForm.confirmPassword === "") {
        //   this.$modal.msgError("请再次输入您的密码")
        // } else if (this.registerForm.password !== this.registerForm.confirmPassword) {
        //   this.$modal.msgError("两次输入的密码不一致")
        } else {
          this.$modal.loading("注册中，请耐心等待...")
          this.register()
        }
      },
      // 用户注册
      async register() {
        register(this.registerForm).then(res => {
          this.$modal.closeLoading()
          uni.showModal({
          	title: "系统提示",
          	content: "恭喜你，您的账号 " + this.registerForm.username + " 注册成功！",
          	success: function (res) {
          		if (res.confirm) {
                uni.redirectTo({ url: `/pages/login` });
          		}
          	}
          })
        }).catch(() => {
        })
      },
      // 注册成功后，处理函数
      registerSuccess(result) {
        // 设置用户信息
        this.$store.dispatch('GetInfo').then(res => {
          this.$tab.reLaunch('/pages/index')
        })
      }
    }
  }
</script>

<style lang="scss">
page {
	position: relative;
	height: 100%;
	background-color: #fafbfe;
}
#register-page {
  padding: 0 28px;
	.logo-box{
		position: absolute;
		top: -40px;
		right: 0;
		width: 200px;
		height: 200px;
		background: url(@/static/images/Logo.png) 100% 100%/cover;
	}
	.header-box {
		padding-top: 60px;
		.title {
			font: 600 24px 'Plus Jakarta Sans';
		}
		.subhead {
			margin-top: 15px;
			font: 400 14px 'Plus Jakarta Sans';
			color: #848FAC;
		}
	}
	.login-form{
		margin-top: 40px;
		label{
			font: 600 16px 'Plus Jakarta Sans';
		}
		input {
			box-sizing: border-box;
			margin-top: 15px;
			padding-left: 15px;
			height: 52px;
			width: 100%;
			border: 1.5px solid #DFE8F6;
			border-radius: 8px;
			font: 500 12px 'Plus Jakarta Sans';
			color: #848FAC;
		}
		.cus-button-primary {
			margin-top: 130px;
			padding-top: 15px;
			height: 52px;
			background-color: #4078E0;
			color: #ffffff;
			font: 600 16px 'Plus Jakarta Sans';
		}
	}
	.uni-input-placeholder {
		font: 500 12px 'Plus Jakarta Sans';
		color: #848FAC;
	}
	.toLogin-box {
		margin-top: 20px;
		width: 100%;
		text-align: center;
	}
}


</style>
