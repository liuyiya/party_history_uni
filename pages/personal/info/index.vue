<template>
	<view class="info-container">
		<view class="avatar-box">
			<image v-if="avatar" :src="userInfo.pic?userInfo.pic : avatar" class="cus-avatar cu-avatar xl round" mode="widthFix">
			</image>
			<view class="camera-box" @click="updataAvatar"></view>
		</view>
		<view class="list-box">
			<view class="list-item">
				<view class="list-item-title">用户名</view>
				<view class="my-input-box"><input v-model="userInfo.username"  class="my-input" placeholder="请输入全名"/></view>
			</view>
			<view class="list-item">
				<view class="list-item-title">昵称</view>
				<view class="my-input-box"><input v-model="userInfo.nickName" class="my-input" placeholder="请输入用户名"/></view>
			</view>
			<view class="list-item">
				<view class="list-item-title">电子邮件</view>
				<view class="my-input-box"><input v-model="userInfo.email" class="my-input" placeholder="请输入电子邮件"/></view>
			</view>
<!-- 			<view class="list-item">
				<view class="list-item-title">生物</view>
				<view class="my-input-box"><input class="my-input" placeholder="请输入生物"/></view>
			</view> -->
		</view>
		<view class="my-botton-box" @click="updataUserInfo">
			<button class="cu-btn bg-grey lg my-botton">
				保存更改
			</button>
		</view>
	</view>
</template>

<script>
	import { getUserProfile,updateUserProfile } from '@/api/personal/user'
	import config from '@/config'
	 
	export default {
		data() {
		  return {
				name: this.$store.state.user.name,
				userInfo:{
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
		onLoad() {
			 getUserProfile({username:this.name}).then(res => {
				 let user = res.data
				 this.userInfo.username = user.username
				 this.userInfo.nickName = user.nickName
				 this.userInfo.email = user.email
				 this.userInfo.pic = user.pic
			 })
		},
		methods: {
			updataAvatar() {
				var _this = this
				uni.chooseImage({
					success: function (res) {
						 // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: `${config.baseUrl}/oss/upload`,
							filePath: tempFilePaths[0],
							name: 'file',
							success: (imgData) => {
								let responseData = JSON.parse(imgData.data);
								_this.userInfo.pic = responseData.data.url
							}
						})
					},
				})
			},
			updataUserInfo() {
				this.$modal.loading("保存中，请耐心等待...")
				updateUserProfile(this.userInfo).then(res => {
					this.$modal.closeLoading()
					console.log('res',res)
					this.$modal.msgSuccess("保存成功！");
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
	.info-container {
		.avatar-box{
			position: relative;
			display: flex;
			justify-content: center;
			padding: 50px 0;
			.cus-avatar {
				width: 100px;
				height: 100px;
			}
			.camera-box {
				cursor: pointer;
				position: absolute;
				bottom: 30px;
				width: 48px;
				height: 48px;
				background: url(@/static/images/personal/camera.png) 100% 100%/cover;
			}
		}
		.list-box{
			padding: 0 20px 20px 20px;
			.list-item{
				margin-bottom: 20px;
				.list-item-title{
					font: 600 16px 'Plus Jakarta Sans';
				}
				.my-input-box {
					margin-top: 15px;
					.my-input {
						padding-left: 20px;
						height: 52px;
						font: 500 12px 'Plus Jakarta Sans';
						border: 1.5px solid #DFE8F6;
						border-radius: 8px;
					}
					.uni-input-placeholder {
						font: 500 12px 'Plus Jakarta Sans';
					}
				}
			}
		}
		.my-botton-box {
			margin: auto;
			padding-bottom: 40px;
			width: 90%;
			.my-botton {
				height: 52px;
				width: 100%;
				background-color: #4078E0;
				font: 600 16px 'Plus Jakarta Sans';
			}
			.my-botton-icon {
				margin-left: 10px;
			}
		}
	}
</style>