<template>
	<view class="index-container">
		<image class="bg-img" src="@/static/images/bg.png" ></image>
		<view class="content">
			<view class="head-title">首页</view>
			<view class="card-list-box">
				<view class="my-card">
					<image class="my-card-bg-img" src="@/static/images/index/index-bg1.png" ></image>
				  <view class="card-title">重要文献论述活动</view>
					<view class="card-content">在此查看领导人在会议中的重要论述，并且通过点击中间的几处空缺部分补全此论述，补充完成获得积分。</view>
				  <view @click="toAnswerPage(1)" class="my-button-box">
						<button class="cu-btn my-button">
							<text style="margin-right: 10px;" class="cuIcon-focus"></text>
							去获取积分
						</button>
					</view>
				</view>
				
				<view class="my-card">
					<image class="my-card-bg-img" src="@/static/images/index/index-bg2.png" ></image>
				  <view class="card-title">重要历史时刻推测</view>
					<view class="card-content">提供几个不同的历史事件，然后通过选择正确的时间来匹配，匹配正确获得积分。</view>
				  <view @click="toAnswerPage(2)" class="my-button-box">
						<button class="cu-btn my-button">
							<text style="margin-right: 10px;" class="cuIcon-focus"></text>
							去获取积分
						</button>
					</view>
				</view>
				
				<view class="my-card">
					<image class="my-card-bg-img" src="@/static/images/index/index-bg3.png" ></image>
				  <view class="card-title">经典历史事件图片辨析</view>
					<view class="card-content">放著名历史事件地址图片，然后选择相应发生的历史事件，选择正确获得积分。</view>
				  <view @click="toAnswerPage(3)" class="my-button-box">
						<button class="cu-btn my-button">
							<text style="margin-right: 10px;" class="cuIcon-focus"></text>
							去获取积分
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getQuestionList} from '@/api/exersis/qusetion.js'
	import {startOrEnd} from '@/api/exersis/qusetion.js'
	export default {
		data() {
		  return {
				userId: this.$store.state.user.userId,
				name: this.$store.state.user.name,
		  }
		},
		computed: {
		  avatar() {
		    return this.$store.state.user.avatar
		  },
		},
		methods: {
			toAnswerPage(type){
				let param0 = {
					type: type
				}
				getQuestionList(param0).then(res => {
					if(res.data.status == 0) {
						let param = {
							userId: this.userId,
							type: type,
							status: 0
						}
						startOrEnd(param).then(res => {
							this.$tab.navigateTo("/pages/exersise/index?type=" + type);
						})
					}else {
						this.$tab.navigateTo("/pages/exersise/finish");
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
	page {
	}
	.index-container {
		position: relative;
		width: 100%;
		min-height: calc(100vh - 50px);
		background-color: #E05A5A;
		overflow: hidden; /* 防止滚动条出现 */
		.bg-img{
			position: absolute;
			top: 246px;
			left: 50%;
			width: 600px;
			height: 600px;
			transform: translateX(-50%);
			object-fit: cover; /* 确保图像覆盖 */
		} 
		.content {
			padding: 0 10px;
			.head-title {
				padding: 30px 0;
				color: #ffffff;
				font: 600 24px 'Plus Jakarta Sans';
				text-align: center;
			}
			.card-list-box {
				padding:0 15px;
				.my-card {
					position: relative;
					margin-bottom: 15px;
					.my-card-bg-img {
						width: 100%;
						height: 232px;
					}
					.card-title {
						position: absolute;
						top: 20px;
						right: 30px;
						font-size: 20px;
						color: #ffffff;
					}
					.card-content {
						position: absolute;
						top: 10px;
						padding: 60px;
						color: #ffffff;
						font:400 12px 'Rubik';
						line-height: 20px;
					}
					.my-button-box {
						position: absolute;
						bottom: 40px;
						width: 100%;
						display: flex;
						justify-content: center;
						.my-button {
							height: 44px;
							width: 132px;
							border-radius: 20px;
							background-color: #ffffff;
							color: #EBB6B6;
						}
					}
				}
			}
		}
	}
</style>