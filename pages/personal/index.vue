<template>
  <view class="mine-container">
    <view style="padding: 20px; font: 600 20px 'Plus Jakarta Sans';">简介</view>
		<view class="mine-info">
			<image v-if="avatar" :src="userInfo.pic?userInfo.pic:avatar" class="cus-avatar cu-avatar xl round" mode="widthFix">
			</image>
			<view style="margin-top: 20px; font: 600 20px 'Plus Jakarta Sans';">{{userInfo.username}}</view>
			<view style="margin-top: 10px; font: 400 14px 'Plus Jakarta Sans';color: #848FAC;">{{userInfo.nickName}}</view>
		</view>
		<view class="title">我的账户</view>
		<view class="menu-list">
		  <view class="list-cell list-cell-arrow" @click="handleToEditInfo">
		    <view class="menu-item-box">
		      <view class="iconfont icon-user menu-icon"></view>
		      <view>详细资料</view>
		    </view>
		  </view>
		  <view class="list-cell list-cell-arrow" @click="handleToPoint">
		    <view class="menu-item-box">
		      <view class="iconfont icon-aixin menu-icon"></view>
		      <view>积分记录</view>
		    </view>
		  </view>
		</view>
		<view class="my-botton-box" @click="handleLogout">
			<button class="cu-btn bg-grey lg my-botton">
				退出登录
				<text class="my-botton-icon cuIcon-pullup"></text>
			</button>
		</view>
  </view>
</template>

<script>
	import { getUserProfile } from '@/api/personal/user'
  export default {
    data() {
      return {
				name: this.$store.state.user.name,
				userInfo:{
					id: '',
					username: '',
					nickName:'',
					email:'',
					pic:''
				},
      }
    },
		computed: {
		  avatar() {
		    return this.$store.state.user.avatar
		  },
		},
		onShow() {
		  getUserProfile({username:this.name}).then(res => {
		 	 let user = res.data
			 this.userInfo.pic = user.pic
		 	 this.userInfo.username = user.username
		 	 this.userInfo.nickName = user.nickName
		 	 this.userInfo.email = user.email
		 	 this.userInfo.id = user.id
		  })
		},
    methods: {
			handleToEditInfo() {
			  this.$tab.navigateTo('/pages/personal/info/index')
			},
			handleToPoint() {
			  this.$tab.navigateTo('/pages/personal/point/index')
			},
			handleLogout() {
			  this.$modal.confirm('确定注销并退出系统吗？').then(() => {
			    this.$store.dispatch('LogOut',this.userInfo.id).then(() => {
			      this.$tab.reLaunch('/pages/index')
			    })
			  })
			}
    }
  }
</script>

<style lang="scss">
	page {
	  box-sizing: border-box;
	  background-color: #fafbfe;
	  min-height: 100%;
	}
  .mine-container {
		.mine-info {
			padding: 0px 20px 20px 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cus-avatar {
				width: 100px;
				height: 100px;
			}
		}
		.title {
			margin-top: 10px;
			padding-left: 30px;
			padding-top: 15px;
			height: 50px;
			background-color: #EFF3FA;
			font: 400 16px 'Plus Jakarta Sans';
			color: #848FAC;
		}
		.menu-list {
			margin-top: 0;
			.list-cell {
				padding: 20px 15px;
				background-color: transparent;
				font: 600 16px 'Plus Jakarta Sans';
			}
			.menu-item-box .menu-icon {
				margin-right: 20px;
				color: #192252;
			}
		}
		.my-botton-box {
			margin: auto;
			margin-top: 40px;
			margin-bottom: 40px;
			width: 90%;
			.my-botton {
				height: 50px;
				width: 100%;
				background-color: #8C94A1;
				font: 600 16px 'Plus Jakarta Sans';
			}
			.my-botton-icon {
				margin-left: 10px;
			}
		}
	}
</style>
