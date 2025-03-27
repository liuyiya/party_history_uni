<template>
  <view id="login-page">
		<view class="logo-box"></view>
		<view class="header-box">
			<view class="title">登录</view>
			<view class="subhead">请登录您的账户</view>
		</view>
		
    <view class="login-form">
      <view class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="loginForm.username" placeholder="请输入用户名">
      </view>
      <view class="form-group" style="margin-top: 30px;">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="loginForm.password" placeholder="请输入密码">
      </view>
			<view style="margin-top: 10px;">
				<text style="font: 400 12px 'Plus Jakarta Sans';color: #848FAC;">没有账号？</text>
				<text style="margin-left: 20px; font: 600 12px 'Plus Jakarta Sans';color: #2540A8;" @click="handleUserRegister">注册</text>
			</view>
			<view class="button-box">
				<button class="cus-button-primary" @click="handleLogin">登录</button>
			</view>
    </view>
  </view>
</template>

<script>

  export default {
    data() {
      return {
        // 用户注册开关
        register: true,
        globalConfig: getApp().globalData.config,
        loginForm: {
          username: "root",
          password: "123456",
					type: 'uni',
          code: "",
          uuid: ''
        }
      }
    },
    created() {
      // this.getCode()
    },
    methods: {
      // 用户注册
      handleUserRegister() {
        this.$tab.redirectTo(`/pages/register`)
      },
      // 隐私协议
      handlePrivacy() {
        let site = this.globalConfig.appInfo.agreements[0]
        this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      },
      // 用户协议
      handleUserAgrement() {
        let site = this.globalConfig.appInfo.agreements[1]
        this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      },
      // 登录方法
      async handleLogin() {
        if (this.loginForm.username === "") {
          this.$modal.msgError("请输入您的账号")
        } else if (this.loginForm.password === "") {
          this.$modal.msgError("请输入您的密码")
        } else {
          this.$modal.loading("登录中，请耐心等待...")
          this.pwdLogin()
        }
      },
      // 密码登录
      async pwdLogin() {
        this.$store.dispatch('Login', this.loginForm).then(() => {
          this.$modal.closeLoading()
          this.loginSuccess()
        }).catch(() => {
        })
      },
      // 登录成功后，处理函数
      loginSuccess(result) {
        // 设置用户信息
        this.$store.dispatch('GetInfo',this.loginForm).then(res => {
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
#login-page {
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
}

</style>
